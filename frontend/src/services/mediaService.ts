import type { MediaInfo, MediaRequest } from '../types/media';

// Mock service for now
export const fetchMediaInfo = async (data: MediaRequest): Promise<MediaInfo> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!data.url.startsWith('http')) {
        reject(new Error('Invalid media URL.'));
      }
      resolve({
        title: 'Amazing Sample Video',
        author: 'Content Creator',
        thumbnailUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=80',
        description: 'This is a sample description of the media fetched from the URL.',
        downloadUrl: 'https://example.com/download.mp4',
        platform: 'YouTube',
      });
    }, 1500);
  });
};
