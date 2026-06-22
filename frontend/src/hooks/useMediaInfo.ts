import { useState } from 'react';
import { fetchMediaInfo } from '../services/mediaService';
import type { MediaInfo, MediaRequest } from '../types/media';

export const useMediaInfo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<MediaInfo | null>(null);

  const execute = async (request: MediaRequest) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const response = await fetchMediaInfo(request);
      setData(response);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch media information');
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error, data, reset: () => setData(null) };
};
