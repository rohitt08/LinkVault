export interface ShortenUrlRequest {
  url: string;
  customAlias?: string;
  password?: string;
  expiresAt?: string;
}

export interface ShortenUrlResponse {
  shortUrl: string;
  originalUrl: string;
  qrCode?: string;
}
