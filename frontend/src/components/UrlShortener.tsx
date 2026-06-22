import React, { useState } from 'react';
import { useShortenUrl } from '../hooks/useShortenUrl';
import { ShortUrlCard } from './ShortUrlCard';
import { LoadingSpinner } from './LoadingSpinner';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Link2, RefreshCw, Settings2, Lock, Clock, Eye, EyeOff } from 'lucide-react';

export function UrlShortener() {
  const [url, setUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [password, setPassword] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { shorten, isLoading, error, result } = useShortenUrl();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    await shorten(url, alias, password, expiresAt);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 mt-4 relative z-10 px-4">
      
      <div className="text-center md:text-left mb-2 pl-2">
        <h2 className="text-2xl font-extrabold tracking-tight text-[#111] mb-2">Shorten Your Links</h2>
        <p className="text-muted-foreground text-sm font-medium">Turn clunky, long URLs into sleek, shareable links instantly.</p>
      </div>

      {/* Main Input Container matching new aesthetic */}
      <div className="bg-white/60 backdrop-blur-xl p-4 md:p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-0 rounded-2xl shadow-sm border border-black/5 overflow-hidden bg-white hover:shadow-md transition-shadow">
            <div className="relative flex-1">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Link2 className="h-5 w-5" />
              </div>
              <Input
                id="url"
                type="url"
                placeholder="Paste long url to shorten it"
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
                  <RefreshCw className="h-4 w-4" />
                  Shorten
                </>
              )}
            </Button>
          </div>

          {/* Advanced Options Toggle */}
          <div className="flex items-center justify-end mt-1">
            <button 
              type="button" 
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-sm font-bold text-primary hover:text-indigo-800 flex items-center gap-1.5 transition-colors bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-full"
            >
              <Settings2 className="w-4 h-4" />
              {showAdvanced ? 'Hide Advanced Options' : 'Advanced Options'}
            </button>
          </div>

          {/* Advanced Options Panel */}
          {showAdvanced && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 animate-fade-in-up">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Settings2 className="h-4 w-4" />
                </div>
                <Input
                  id="alias"
                  type="text"
                  placeholder="Custom Link (optional)"
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                  className="w-full h-12 pl-11 bg-white border border-black/5 focus-visible:ring-2 focus-visible:ring-primary/30 rounded-xl transition-shadow"
                />
              </div>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Lock className="h-4 w-4" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password (optional)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 pl-11 pr-11 bg-white border border-black/5 focus-visible:ring-2 focus-visible:ring-primary/30 rounded-xl transition-shadow"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground z-10">
                  <Clock className="h-4 w-4" />
                </div>
                <Input
                  id="expiresAt"
                  type="datetime-local"
                  value={expiresAt}
                  min={new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16)}
                  max={new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000 + 31536000000).toISOString().slice(0, 16)}
                  onChange={(e) => setExpiresAt(e.target.value)}
                  className={`w-full h-12 pl-11 bg-white border border-black/5 focus-visible:ring-2 focus-visible:ring-primary/30 rounded-xl transition-shadow ${!expiresAt ? 'text-transparent md:text-muted-foreground' : 'text-[#111]'}`}
                />
                {!expiresAt && (
                  <div className="absolute left-11 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none bg-white pr-4 text-sm whitespace-nowrap">
                    Expiration date (optional)
                  </div>
                )}
              </div>
            </div>
          )}
        </form>
        {error && <p className="text-sm text-destructive font-medium mt-3 ml-2">{error}</p>}
      </div>

      {/* Result Card */}
      {result && (
        <div className="animate-fade-in-up mt-8">
          <ShortUrlCard data={result} />
        </div>
      )}
    </div>
  );
}
