import { NextResponse } from 'next/server';
import { IMAGEKIT_URL, processPhoto, type ImageKitPhoto } from '@/lib/imagekit';

/**
 * API Route to fetch images from ImageKit
 * 
 * Note: For production, you should use ImageKit's API with proper authentication.
 * This is a simplified version that works with public folders.
 */

// Fallback mock data if ImageKit API is not configured
const FALLBACK_PHOTOS: ImageKitPhoto[] = [
  {
    fileId: '1',
    name: 'mountain-landscape.jpg',
    filePath: `/portfolio-photography/mountain-landscape.jpg`,
    url: `${IMAGEKIT_URL}/portfolio-photography/mountain-landscape.jpg`,
    thumbnailUrl: `${IMAGEKIT_URL}/portfolio-photography/tr:w-400/mountain-landscape.jpg`,
    width: 1920,
    height: 2560,
    size: 2048000,
    fileType: 'image/jpeg',
    createdAt: '2023-01-15T10:00:00Z',
  },
  {
    fileId: '2',
    name: 'urban-architecture.jpg',
    filePath: `/portfolio-photography/urban-architecture.jpg`,
    url: `${IMAGEKIT_URL}/portfolio-photography/urban-architecture.jpg`,
    thumbnailUrl: `${IMAGEKIT_URL}/portfolio-photography/tr:w-400/urban-architecture.jpg`,
    width: 1920,
    height: 1920,
    size: 1536000,
    fileType: 'image/jpeg',
    createdAt: '2023-02-22T10:00:00Z',
  },
  {
    fileId: '3',
    name: 'forest-path.jpg',
    filePath: `/portfolio-photography/forest-path.jpg`,
    url: `${IMAGEKIT_URL}/portfolio-photography/forest-path.jpg`,
    thumbnailUrl: `${IMAGEKIT_URL}/portfolio-photography/tr:w-400/forest-path.jpg`,
    width: 2560,
    height: 1440,
    size: 2304000,
    fileType: 'image/jpeg',
    createdAt: '2023-03-01T10:00:00Z',
  },
  {
    fileId: '4',
    name: 'camera-lens.jpg',
    filePath: `/portfolio-photography/camera-lens.jpg`,
    url: `${IMAGEKIT_URL}/portfolio-photography/camera-lens.jpg`,
    thumbnailUrl: `${IMAGEKIT_URL}/portfolio-photography/tr:w-400/camera-lens.jpg`,
    width: 2000,
    height: 2000,
    size: 2560000,
    fileType: 'image/jpeg',
    createdAt: '2023-04-12T10:00:00Z',
  },
  {
    fileId: '5',
    name: 'workspace-setup.jpg',
    filePath: `/portfolio-photography/workspace-setup.jpg`,
    url: `${IMAGEKIT_URL}/portfolio-photography/workspace-setup.jpg`,
    thumbnailUrl: `${IMAGEKIT_URL}/portfolio-photography/tr:w-400/workspace-setup.jpg`,
    width: 1920,
    height: 1280,
    size: 1536000,
    fileType: 'image/jpeg',
    createdAt: '2023-05-05T10:00:00Z',
  },
  {
    fileId: '6',
    name: 'server-room.jpg',
    filePath: `/portfolio-photography/server-room.jpg`,
    url: `${IMAGEKIT_URL}/portfolio-photography/server-room.jpg`,
    thumbnailUrl: `${IMAGEKIT_URL}/portfolio-photography/tr:w-400/server-room.jpg`,
    width: 1920,
    height: 1280,
    size: 1536000,
    fileType: 'image/jpeg',
    createdAt: '2023-06-18T10:00:00Z',
  },
  {
    fileId: '7',
    name: 'circuit-board.jpg',
    filePath: `/portfolio-photography/circuit-board.jpg`,
    url: `${IMAGEKIT_URL}/portfolio-photography/circuit-board.jpg`,
    thumbnailUrl: `${IMAGEKIT_URL}/portfolio-photography/tr:w-400/circuit-board.jpg`,
    width: 2560,
    height: 1440,
    size: 2304000,
    fileType: 'image/jpeg',
    createdAt: '2023-07-01T10:00:00Z',
  },
  {
    fileId: '8',
    name: 'sunset-valley.jpg',
    filePath: `/portfolio-photography/sunset-valley.jpg`,
    url: `${IMAGEKIT_URL}/portfolio-photography/sunset-valley.jpg`,
    thumbnailUrl: `${IMAGEKIT_URL}/portfolio-photography/tr:w-400/sunset-valley.jpg`,
    width: 1920,
    height: 2880,
    size: 2560000,
    fileType: 'image/jpeg',
    createdAt: '2023-08-10T10:00:00Z',
  },
];

export async function GET() {
  try {
    // For production with ImageKit API:
    // const response = await fetch(
    //   `https://api.imagekit.io/v1/files?path=${PHOTOGRAPHY_FOLDER}`,
    //   {
    //     headers: {
    //       'Authorization': `Basic ${Buffer.from(process.env.IMAGEKIT_PRIVATE_KEY + ':').toString('base64')}`,
    //     },
    //   }
    // );
    
    // For now, we'll use fallback data and you can manually list your images
    // or set up ImageKit API authentication
    
    const photos = FALLBACK_PHOTOS;
    
    // Process photos with smart sizing
    const processedPhotos = photos.map((photo, index) => processPhoto(photo, index));
    
    return NextResponse.json({
      success: true,
      photos: processedPhotos,
      count: processedPhotos.length,
    });
    
  } catch (error) {
    console.error('Error fetching photos:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch photos',
        photos: [],
      },
      { status: 500 }
    );
  }
}
