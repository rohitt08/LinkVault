import { Settings2, Lock, Clock } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative w-full pt-32 pb-12 md:pt-40 md:pb-12 flex flex-col items-center text-center overflow-hidden mesh-gradient">
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex flex-col items-center space-y-8 animate-fade-in-up">

          <div className="space-y-6 max-w-[850px] relative">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl leading-[1.1] text-[#111]">
              Simplify All <br />
              <span className="inline-block bg-primary text-white px-6 py-2 mt-2 transform -rotate-1 shadow-xl shadow-primary/20 rounded-2xl">
                Your Links
              </span>
            </h1>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl pt-4 font-medium leading-relaxed">
              Shorten, secure, and manage all your URLs in one seamless experience.
            </p>

            {/* Showcasing Details */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 pt-12">
              <div className="flex items-center gap-2 text-sm md:text-base font-semibold text-[#111] bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-black/5 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Settings2 className="w-3.5 h-3.5 text-primary" />
                </div>
                Custom Links
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base font-semibold text-[#111] bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-black/5 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Lock className="w-3.5 h-3.5 text-primary" />
                </div>
                Password Protection
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base font-semibold text-[#111] bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-black/5 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                </div>
                Expiration Control
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
