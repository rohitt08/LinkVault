import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { User, LogOut, History, ChevronDown } from 'lucide-react';
import { getCurrentUser, logout } from '../services/authService';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(getCurrentUser());
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate('/login');
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'bg-transparent py-6'}`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-baseline font-extrabold text-3xl tracking-tighter cursor-pointer select-none">
          <span className="text-[#111]">Link</span>
          <span className="text-primary">Vault</span>
          <span className="text-primary text-4xl leading-none ml-0.5">.</span>
        </Link>

        <div className="flex items-center gap-4 relative">
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full pl-2 pr-4 py-1.5 font-bold text-black shadow-sm border border-black/5 hover:text-primary transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <User className="w-5 h-5" />
                </div>
                {user.fullName || 'Profile'}
                <ChevronDown className="w-4 h-4 text-muted-foreground ml-1" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-black/5 py-2 animate-fade-in-up">
                  <Link to="/history" className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-[#111] hover:bg-gray-50 transition-colors">
                    <History className="w-4 h-4 text-primary" />
                    History
                  </Link>
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-destructive hover:bg-destructive/5 transition-colors text-left">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <Button variant="ghost" className="bg-white/80 backdrop-blur-sm rounded-full px-8 py-2.5 font-bold text-black shadow-sm border border-black/5 transition-all duration-300 hover:text-primary hover:-translate-y-0.5 hover:shadow-md">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
