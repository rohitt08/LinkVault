import { Link } from 'react-router-dom';
import { ArrowRight, FolderHeart } from 'lucide-react';
import { Button } from './ui/button';

export function CallToAction() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 mt-12 mb-24 relative z-10">
      <div className="bg-[#111] rounded-[2.5rem] p-8 md:p-14 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden group">
        
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-blue-600/30 opacity-50 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[80px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />

        {/* Content */}
        <div className="flex-1 space-y-6 relative z-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 border border-white/10 shadow-inner mb-2 md:mx-0 mx-auto">
            <FolderHeart className="w-7 h-7 text-white" />
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Never Lose a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary">Link Again</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-xl font-medium leading-relaxed md:mx-0 mx-auto">
              Log in to automatically save your shortened URLs and media extractions. Access your full history securely from any device, anytime.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="relative z-10 shrink-0 w-full md:w-auto">
          <Link to="/login" className="block w-full md:w-auto">
            <Button className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white rounded-full px-10 py-8 text-xl font-bold shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] transition-all duration-300 hover:scale-[1.02] group-hover:shadow-[0_0_60px_-15px_rgba(79,70,229,0.7)]">
              Log in to save history
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
