import { useState } from 'react';
import { shortenUrl as shortenUrlService } from '../services/urlService';

export const useShortenUrl = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const shorten = async (url: string, customAlias?: string, password?: string, expiresAt?: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await shortenUrlService({ url, customAlias, password, expiresAt });
      setResult(response);
    } catch (err: any) {
      setError(err.message || 'Failed to shorten URL');
    } finally {
      setIsLoading(false);
    }
  };

  return { shorten, isLoading, error, result };
};
