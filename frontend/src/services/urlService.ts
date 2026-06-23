import type { ShortenUrlRequest, ShortenUrlResponse } from '../types/url';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const API_URL = `${API_BASE}/api`;

export const shortenUrl = async (data: ShortenUrlRequest): Promise<ShortenUrlResponse> => {
  const response = await fetch(`${API_URL}/links/shorten`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
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
    shortUrl: `${API_BASE}/${result.link.alias}`,
    qrCode: result.qrCode,
  };
};

export const getHistory = async () => {
  const response = await fetch(`${API_URL}/links/history`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error ${response.status}: ${errorText || 'Failed to fetch history'}`);
  }

  return await response.json();
};

export const deleteLink = async (id: number) => {
  const response = await fetch(`${API_URL}/links/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error ${response.status}: ${errorText || 'Failed to delete link'}`);
  }

  return await response.json();
};


