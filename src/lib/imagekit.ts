/**
 * ImageKit utilities for portfolio photography
 */

export const IMAGEKIT_URL = process.env.IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/9t22jol3s';
export const PHOTOGRAPHY_FOLDER = 'Portfolio-Photography';

export interface ImageKitPhoto {
  fileId: string;
  name: string;
  filePath: string;
  url: string;
  thumbnailUrl: string;
  width: number;
  height: number;
  size: number;
  fileType: string;
  createdAt: string;
}

export interface ProcessedPhoto {
  id: string;
  src: string;
  alt: string;
  date: string;
  className: string;
  width: number;
  height: number;
}

/**
 * Generate ImageKit URL with transformations
 */
export function getImageKitUrl(
  filePath: string,
  transformations?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: string;
  }
): string {
  const baseUrl = `${IMAGEKIT_URL}${filePath}`;
  
  if (!transformations) {
    return baseUrl;
  }

  const params: string[] = [];
  
  if (transformations.width) params.push(`w-${transformations.width}`);
  if (transformations.height) params.push(`h-${transformations.height}`);
  if (transformations.quality) params.push(`q-${transformations.quality}`);
  if (transformations.format) params.push(`f-${transformations.format}`);
  
  if (params.length === 0) {
    return baseUrl;
  }
  
  const transformation = `tr:${params.join(',')}`;
  return `${baseUrl}?${transformation}`;
}

/**
 * Determine grid className based on image dimensions and aspect ratio
 */
export function determineGridClass(
  width: number,
  height: number,
  index: number
): string {
  const aspectRatio = width / height;
  
  // Calculate if image is landscape, portrait, or square
  const isLandscape = aspectRatio > 1.3;
  const isPortrait = aspectRatio < 0.75;
  const isSquare = aspectRatio >= 0.75 && aspectRatio <= 1.3;
  
  // Create a pattern for variety
  // Every 5th image could be big, distribute others intelligently
  const isBigSpot = (index % 5) === 4;
  const isWideSpot = (index % 3) === 0 && !isBigSpot;
  const isTallSpot = (index % 4) === 2 && !isBigSpot;
  
  // Smart sizing logic
  if (isBigSpot && (isSquare || isLandscape)) {
    return 'md:col-span-2 md:row-span-2'; // Big
  }
  
  if (isLandscape && isWideSpot) {
    return 'md:col-span-2'; // Wide
  }
  
  if (isPortrait && isTallSpot) {
    return 'md:row-span-2'; // Tall
  }
  
  if (isPortrait) {
    return 'md:row-span-2'; // Tall portraits
  }
  
  if (isLandscape) {
    return 'md:col-span-2'; // Wide landscapes
  }
  
  return ''; // Square - single cell
}

/**
 * Format date from ISO string to display format
 */
export function formatPhotoDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const year = date.getFullYear().toString().slice(-2);
  return `${day} ${month} ${year}`;
}

/**
 * Generate alt text from filename
 */
export function generateAltText(filename: string): string {
  // Remove extension and replace hyphens/underscores with spaces
  return filename
    .replace(/\.[^/.]+$/, '')
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Process raw ImageKit photo data into display format
 */
export function processPhoto(
  photo: ImageKitPhoto,
  index: number
): ProcessedPhoto {
  return {
    id: photo.fileId,
    src: photo.url,
    alt: generateAltText(photo.name),
    date: formatPhotoDate(photo.createdAt),
    className: determineGridClass(photo.width, photo.height, index),
    width: photo.width,
    height: photo.height,
  };
}
