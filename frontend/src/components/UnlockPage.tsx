import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Lock, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';

export function UnlockPage() {
  const { alias } = useParams<{ alias: string }>();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:8080/api/links/${alias}/unlock`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        const data = await response.json();
        window.location.href = data.originalUrl;
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Incorrect password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 relative overflow-hidden">
      
      {/* Decorative Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full max-h-[800px] bg-gradient-to-tr from-gray-100 to-gray-50 rounded-full blur-3xl -z-10 opacity-70"></div>
      
      <div className="w-full max-w-md animate-fade-in-up">
        
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-[#111] flex items-center justify-center mb-6 shadow-lg shadow-black/10">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#111] mb-3">Protected Link</h1>
          <p className="text-muted-foreground text-base">
            This link requires a password to view its destination. Please enter it below.
          </p>
        </div>

        <Card className="w-full bg-[#F4F7F4] border border-black/5 rounded-[2rem] shadow-sm overflow-hidden">
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Lock className="w-5 h-5" />
                </div>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter link password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-12 pr-12 h-14 text-base bg-white border-0 focus-visible:ring-1 focus-visible:ring-black/20 rounded-xl shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[#111] transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              
              {error && (
                <div className="bg-red-50 text-red-600 text-sm font-medium p-3 rounded-xl border border-red-100 text-center">
                  {error}
                </div>
              )}
              
              <Button 
                type="submit" 
                disabled={isLoading}
                className="h-14 w-full bg-[#111] hover:bg-black text-white text-base font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                {isLoading ? <LoadingSpinner /> : (
                  <>
                    Unlock Destination <ArrowRight className="w-5 h-5 ml-1" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        
      </div>
    </div>
  );
}
