import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { register } from '../services/authService';

export function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      await register(fullName, email, password);
      navigate('/login', { state: { message: 'Successfully Registered. Please log in to continue.' } });
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12">
      {/* Back to Home Link */}
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-muted-foreground hover:text-[#111] transition-colors font-semibold">
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      {/* Main Sign Up Card */}
      <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_8px_30px_-4px_rgba(0,0,0,0.05)] border border-black/5 animate-fade-in-up mt-8">
        
        {/* Logo */}
        <div className="flex items-baseline justify-center font-extrabold text-3xl tracking-tighter select-none mb-8">
          <span className="text-[#111]">Link</span>
          <span className="text-primary">Vault</span>
          <span className="text-primary text-4xl leading-none ml-0.5">.</span>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#111] mb-2">Create an Account</h1>
          <p className="text-muted-foreground font-medium leading-relaxed">Join LinkVault to start saving and managing your links securely.</p>
        </div>

        <form className="space-y-5" onSubmit={handleSignUp}>
          {error && <div className="text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-lg text-center">{error}</div>}
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#111] ml-1">Full Name</label>
            <Input 
              type="text" 
              placeholder="Your name" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="h-14 bg-[#F4F7F4] border-0 rounded-xl focus-visible:ring-primary/20 focus-visible:ring-offset-0 px-4 shadow-inner"
              required 
            />
          </div>
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
            <p className="text-xs text-muted-foreground ml-1 pt-1 font-medium">Must be at least 8 characters.</p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#111] ml-1">Confirm Password</label>
            <div className="relative">
              <Input 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="••••••••" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-14 bg-[#F4F7F4] border-0 rounded-xl focus-visible:ring-primary/20 focus-visible:ring-offset-0 px-4 pr-12 shadow-inner"
                required 
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[#111] transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <p className="text-xs text-muted-foreground ml-1 pt-1 font-medium">Passwords must match.</p>
          </div>

          <div className="flex items-center px-1 pt-1">
            <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground cursor-pointer select-none">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20 cursor-pointer" />
              Remember me
            </label>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-xl text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 mt-6">
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm font-medium text-muted-foreground">
          Already have an account? <Link to="/login" className="text-primary hover:underline font-bold">Log in</Link>
        </div>
      </div>
    </div>
  );
}
