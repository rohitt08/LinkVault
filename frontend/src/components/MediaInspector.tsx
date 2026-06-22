import React, { useState } from 'react';
import { useMediaInfo } from '../hooks/useMediaInfo';
import { MediaCard } from './MediaCard';
import { LoadingSpinner } from './LoadingSpinner';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search } from 'lucide-react';

export function MediaInspector() {
  const [url, setUrl] = useState('');
  const { execute: inspect, loading: isLoading, error, data: result } = useMediaInfo();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    await inspect({ url });
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 relative z-10 px-4 mt-12 mb-24">
      
      <div className="text-center md:text-left mb-2 pl-2">
        <h2 className="text-2xl font-extrabold tracking-tight text-[#111] mb-2">Inspect Media URLs</h2>
        <p className="text-muted-foreground text-sm font-medium">Extract high-quality assets, thumbnails, and direct download links from public media.</p>
      </div>

      {/* Main Input Container matching new aesthetic */}
      <div className="bg-white/60 backdrop-blur-xl p-4 md:p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-0 rounded-2xl shadow-sm border border-black/5 overflow-hidden bg-white hover:shadow-md transition-shadow">
          <div className="relative flex-1">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Search className="h-5 w-5" />
            </div>
            <Input
              id="media-url"
              type="url"
              placeholder="Paste public media URL to inspect..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="w-full h-14 pl-12 pr-4 bg-white border-0 focus-visible:ring-0 text-base rounded-none"
            />
          </div>
          <Button 
            type="submit" 
            disabled={isLoading} 
            className="h-14 px-8 text-base font-semibold bg-[#222] hover:bg-black text-white rounded-none flex items-center gap-2 shadow-inner"
          >
            {isLoading ? <LoadingSpinner /> : (
              <>
                <Search className="h-4 w-4" />
                Inspect
              </>
            )}
          </Button>
        </form>
        {error && <p className="text-sm text-destructive font-medium mt-3 ml-2">{error}</p>}
      </div>

      {result && (
        <div className="animate-fade-in-up mt-8">
          <MediaCard data={result} />
        </div>
      )}
    </div>
  );
}
