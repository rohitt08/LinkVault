export interface MediaInfo {
  title: string;
  author: string;
  thumbnailUrl: string;
  description?: string;
  downloadUrl?: string;
  platform: string;
}

export interface MediaRequest {
  url: string;
}
