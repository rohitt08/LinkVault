import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'bg-transparent py-6'}`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-baseline font-extrabold text-3xl tracking-tighter cursor-pointer select-none">
          <span className="text-[#111]">Link</span>
          <span className="text-primary">Vault</span>
          <span className="text-primary text-4xl leading-none ml-0.5">.</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost" className="bg-white/80 backdrop-blur-sm rounded-full px-8 py-2.5 font-bold text-black shadow-sm border border-black/5 transition-all duration-300 hover:text-primary hover:-translate-y-0.5 hover:shadow-md">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
