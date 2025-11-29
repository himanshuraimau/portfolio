/**
 * Server Actions for fetching ImageKit photos
 * This uses ImageKit SDK to list files from your portfolio-photography folder
 */

'use server'

import ImageKit from 'imagekit';
import { IMAGEKIT_URL, PHOTOGRAPHY_FOLDER, processPhoto, type ImageKitPhoto, type ProcessedPhoto } from '@/lib/imagekit';

/**
 * Initialize ImageKit instance
 * Note: You need to set these environment variables:
 * - IMAGEKIT_PUBLIC_KEY
 * - IMAGEKIT_PRIVATE_KEY
 * - IMAGEKIT_URL_ENDPOINT
 */
function getImageKitInstance() {
  // For now, we'll work without authentication (public folder)
  // In production, add these to your .env.local:
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY || '';
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY || '';
  const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT || IMAGEKIT_URL;

  if (publicKey && privateKey) {
    return new ImageKit({
      publicKey,
      privateKey,
      urlEndpoint,
    });
  }

  return null;
}

/**
 * Fetch all photos from ImageKit portfolio-photography folder
 */
export async function fetchPhotosFromImageKit(): Promise<ProcessedPhoto[]> {
  try {
    const imagekit = getImageKitInstance();

    if (!imagekit) {
      console.warn('ImageKit not configured, using direct URLs');
      // Fallback: try to use direct URLs
      return fetchPhotosDirectly();
    }

    // List files from the folder
    const files = await imagekit.listFiles({
      path: PHOTOGRAPHY_FOLDER,
      searchQuery: 'type="image"',
    });

    if (!files || files.length === 0) {
      console.warn('No images found in ImageKit folder');
      return fetchPhotosDirectly();
    }

    // Process files manually to avoid TypeScript issues
    const processedPhotos: ProcessedPhoto[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i] as unknown as Record<string, unknown>;
      
      // Only process actual files (not folders)
      if (file.type === 'file' && file.fileId) {
        const photo: ImageKitPhoto = {
          fileId: String(file.fileId || ''),
          name: String(file.name || ''),
          filePath: String(file.filePath || ''),
          url: String(file.url || ''),
          thumbnailUrl: String(file.thumbnailUrl || file.url || ''),
          width: Number(file.width) || 1920,
          height: Number(file.height) || 1280,
          size: Number(file.size) || 0,
          fileType: String(file.fileType || 'image/jpeg'),
          createdAt: String(file.createdAt || new Date().toISOString()),
        };
        
        processedPhotos.push(processPhoto(photo, i));
      }
    }

    return processedPhotos;

  } catch (error) {
    console.error('Error fetching from ImageKit:', error);
    // Fallback to direct URLs
    return fetchPhotosDirectly();
  }
}

/**
 * Fallback: Fetch photos using direct ImageKit URLs
 * This works for public folders without authentication
 */
async function fetchPhotosDirectly(): Promise<ProcessedPhoto[]> {
  try {
    const imageNames = await getImageNamesFromFolder();
    
    // Validate each image URL in parallel
    const validationPromises = imageNames.map(async (name, index) => {
      const filePath = `/${PHOTOGRAPHY_FOLDER}/${name}`;
      const url = `${IMAGEKIT_URL}${filePath}`;
      
      // Check if image exists
      const isValid = await isImageAccessible(url);
      
      if (!isValid) {
        return null; // Skip invalid images
      }
      
      // Extract potential dimensions from filename or use defaults
      const dimensions = extractDimensionsFromName(name);
      
      return processPhoto({
        fileId: `photo-${index}`,
        name,
        filePath,
        url,
        thumbnailUrl: `${url}?tr=w-400`,
        width: dimensions.width,
        height: dimensions.height,
        size: 0,
        fileType: 'image/jpeg',
        createdAt: new Date(2023, index, 15).toISOString(),
      }, index);
    });

    const photos = await Promise.all(validationPromises);
    
    // Filter out null values (invalid images) and return only valid photos
    return photos.filter((photo): photo is ProcessedPhoto => photo !== null);

  } catch (error) {
    console.error('Error in direct fetch:', error);
    return [];
  }
}

/**
 * Get list of image names from the folder
 * In production, this should come from ImageKit API
 * For now, we'll return a default list that you can customize
 */
async function getImageNamesFromFolder(): Promise<string[]> {
  // Generate photo names based on your ImageKit naming pattern
  const photoCount = 50; // Total number to try
  
  const photos: string[] = [];
  for (let i = 1; i <= photoCount; i++) {
    const photoNumber = i.toString().padStart(3, '0');
    photos.push(`photo_${photoNumber}.jpg`);
  }
  
  return photos;
}

/**
 * Check if an image URL is accessible
 */
async function isImageAccessible(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Try to extract dimensions from filename
 * Format: image-1920x1080.jpg or image_landscape.jpg
 */
function extractDimensionsFromName(filename: string): { width: number; height: number } {
  // Check for WxH pattern
  const dimensionMatch = filename.match(/(\d+)x(\d+)/);
  if (dimensionMatch) {
    return {
      width: parseInt(dimensionMatch[1]),
      height: parseInt(dimensionMatch[2]),
    };
  }

  // Check for orientation hints
  if (filename.includes('portrait') || filename.includes('tall')) {
    return { width: 1920, height: 2880 }; // 2:3 portrait
  }

  if (filename.includes('landscape') || filename.includes('wide')) {
    return { width: 2560, height: 1440 }; // 16:9 landscape
  }

  if (filename.includes('square')) {
    return { width: 2000, height: 2000 }; // 1:1 square
  }

  // Default to landscape
  return { width: 1920, height: 1280 }; // 3:2 default
}
