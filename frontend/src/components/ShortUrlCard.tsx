import { Card, CardContent } from './ui/card';
import { CopyButton } from './CopyButton';
import type { ShortenUrlResponse } from '../types/url';
import { Link2, ArrowRight, Download } from 'lucide-react';

interface ShortUrlCardProps {
  data: ShortenUrlResponse;
}

export function ShortUrlCard({ data }: ShortUrlCardProps) {
  return (
    <Card className="w-full mt-6 bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden">
      <CardContent className="p-4 md:p-6 flex flex-col gap-4 relative">
        
        {/* Decorative corner glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

        {/* Header */}
        <div className="flex items-center gap-3 pl-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#111] text-white">
            <Link2 className="w-4 h-4" />
          </div>
          <h3 className="text-xl font-bold tracking-tight text-[#111]">
            Your short link is ready!
          </h3>
        </div>

        {/* Short URL Section */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between p-2 pl-4 md:pl-6 bg-white rounded-xl md:rounded-2xl border border-black/5 shadow-sm gap-4 transition-colors hover:border-black/10">
          <a 
            href={data.shortUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 text-lg font-semibold text-[#111] hover:underline truncate py-2"
          >
            {data.shortUrl}
          </a>
          <div className="shrink-0 pb-2 md:pb-0 md:pr-2">
            <CopyButton text={data.shortUrl} />
          </div>
        </div>

        {/* Original URL Section */}
        <div className="flex items-start gap-2 text-sm text-muted-foreground bg-white/50 p-4 rounded-xl border border-black/5">
          <ArrowRight className="w-4 h-4 mt-0.5 shrink-0" />
          <div className="flex-1 overflow-hidden">
            <p className="font-semibold text-[#111] mb-1 text-xs uppercase tracking-wider">Original Destination</p>
            <a 
              href={data.originalUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="truncate block hover:text-[#111] transition-colors"
              title={data.originalUrl}
            >
              {data.originalUrl}
            </a>
          </div>
        </div>

        {/* QR Code Section */}
        {data.qrCode && (
          <div className="flex flex-col items-center gap-3 pt-4 border-t border-black/5">
            <p className="font-semibold text-[#111] text-xs uppercase tracking-wider">Scan QR Code</p>
            <div className="p-2 bg-white rounded-xl shadow-sm border border-black/5">
              <img src={data.qrCode} alt="QR Code for short link" className="w-32 h-32" />
            </div>
            <a 
              href={data.qrCode} 
              download={`qrcode-${data.shortUrl.split('/').pop()}.png`}
              className="mt-2 flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#111] hover:bg-black rounded-xl transition-colors"
            >
              <Download className="w-4 h-4" />
              Download PNG
            </a>
          </div>
        )}

      </CardContent>
    </Card>
  );
}
