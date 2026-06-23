import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { login } from '../services/authService';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMsg(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setIsLoading(true);
    try {
      await login(email, password);
      setSuccessMsg('Login Successful.');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Invalid login credentials');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12 relative">
      
      {/* Success Toast */}
      {successMsg && (
        <div className="fixed top-6 right-6 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg font-bold animate-fade-in-up z-50 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          {successMsg}
        </div>
      )}
      {/* Back to Home Link */}
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-muted-foreground hover:text-[#111] transition-colors font-semibold">
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_8px_30px_-4px_rgba(0,0,0,0.05)] border border-black/5 animate-fade-in-up">
        
        {/* Logo */}
        <div className="flex items-baseline justify-center font-extrabold text-3xl tracking-tighter select-none mb-8">
          <span className="text-[#111]">Link</span>
          <span className="text-primary">Vault</span>
          <span className="text-primary text-4xl leading-none ml-0.5">.</span>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#111] mb-2">Welcome Back</h1>
          <p className="text-muted-foreground font-medium leading-relaxed">Log in to securely access your saved links and media history.</p>
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>
          {error && <div className="text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-lg text-center">{error}</div>}
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#111] ml-1">Email Address</label>
            <Input 
              type="email" 
              placeholder="Your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 bg-[#F4F7F4] border-0 rounded-xl focus-visible:ring-primary/20 focus-visible:ring-offset-0 px-4 shadow-inner"
              required 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#111] ml-1">Password</label>
            <div className="relative">
              <Input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-14 bg-[#F4F7F4] border-0 rounded-xl focus-visible:ring-primary/20 focus-visible:ring-offset-0 px-4 pr-12 shadow-inner"
                required 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[#111] transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <div className="flex justify-between items-center px-1 pt-2">
              <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground cursor-pointer select-none">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20 cursor-pointer" />
                Remember me
              </label>
              <a href="#" className="text-sm font-semibold text-primary hover:underline">Forgot password?</a>
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-xl text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 mt-6">
            {isLoading ? 'Logging in...' : 'Log In'}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm font-medium text-muted-foreground">
          Don't have an account? <Link to="/signup" className="text-primary hover:underline font-bold">Sign up for free</Link>
        </div>
      </div>
    </div>
  );
}
