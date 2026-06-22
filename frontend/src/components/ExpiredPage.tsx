import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { AlertCircle } from 'lucide-react';

export function ExpiredPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md bg-white border border-black/5 shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Link Expired</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-gray-600">
          <p>
            The link you are trying to access has expired and is no longer available.
          </p>
          <div className="mt-8">
            <a 
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-[#111] hover:bg-black transition-colors"
            >
              Go to Homepage
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
