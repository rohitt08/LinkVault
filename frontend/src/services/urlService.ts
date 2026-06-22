import type { ShortenUrlRequest, ShortenUrlResponse } from '../types/url';

const API_URL = 'http://localhost:8080/api';

export const shortenUrl = async (data: ShortenUrlRequest): Promise<ShortenUrlResponse> => {
  const response = await fetch(`${API_URL}/links/shorten`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      originalUrl: data.url,
      customAlias: data.customAlias,
      password: data.password,
      expiresAt: data.expiresAt ? new Date(data.expiresAt).toISOString() : undefined,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    try {
        const errorJson = JSON.parse(errorText);
        throw new Error(errorJson.message || 'Failed to shorten URL');
    } catch {
        throw new Error(errorText || 'Failed to shorten URL');
    }
  }

  const result = await response.json();
  return {
    originalUrl: result.link.originalUrl,
    shortUrl: `http://localhost:8080/${result.link.alias}`,
    qrCode: result.qrCode,
  };
};
