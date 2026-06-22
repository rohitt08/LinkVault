import { Card, CardContent, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Download } from 'lucide-react';
import type { MediaInfo } from '../types/media';

interface MediaCardProps {
  data: MediaInfo;
}

export function MediaCard({ data }: MediaCardProps) {
  return (
    <Card className="w-full mt-4 bg-muted/30 border-primary/20 shadow-md overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 max-h-[300px] overflow-hidden bg-black flex items-center justify-center">
            <img 
              src={data.thumbnailUrl} 
              alt={data.title} 
              className="w-full h-full object-cover object-center" 
            />
          </div>
          <div className="md:w-2/3 p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-xl line-clamp-2">{data.title}</CardTitle>
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full font-medium">
                  {data.platform}
                </span>
              </div>
              <p className="text-sm font-medium text-muted-foreground mb-4">
                by {data.author}
              </p>
              {data.description && (
                <p className="text-sm text-foreground/80 line-clamp-3 mb-4">
                  {data.description}
                </p>
              )}
            </div>
            
            {data.downloadUrl && (
              <Button 
                onClick={() => window.open(data.downloadUrl, '_blank')}
                className="w-full md:w-auto mt-4 self-end flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Media
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
