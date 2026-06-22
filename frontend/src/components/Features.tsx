import { Zap, ShieldCheck, Sparkles } from 'lucide-react';

export function Features() {
  const features = [
    {
      title: 'Clean Design',
      description: 'An ad-free, minimal interface designed strictly for simplicity. No clutter, just the tools you need.',
      icon: <Sparkles className="w-7 h-7 text-primary" />
    },
    {
      title: 'Lightning Fast',
      description: 'Instant URL shortening and media extraction powered by highly optimized, modern web technologies.',
      icon: <Zap className="w-7 h-7 text-primary" />
    },
    {
      title: 'Secure & Private',
      description: 'We respect your privacy. No invasive tracking scripts, no sketchy redirects, and enterprise-grade security.',
      icon: <ShieldCheck className="w-7 h-7 text-primary" />
    }
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 mt-16 mb-8 relative z-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#111] mb-4">Why Choose LinkVault?</h2>
        <p className="text-muted-foreground font-medium max-w-2xl mx-auto">Built from the ground up to provide the best user experience without any compromises.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="group relative bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 hover:border-primary/20 hover:shadow-[0_8px_30px_-4px_rgba(79,70,229,0.15)] hover:-translate-y-1 transition-all duration-500 flex flex-col items-start text-left overflow-hidden">
            {/* Background Watermark Icon */}
            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-[0.03] transition-all duration-700 scale-150 transform translate-x-4 -translate-y-4 pointer-events-none text-primary">
              {feature.icon}
            </div>
            
            <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center mb-8 shadow-sm border border-primary/10 group-hover:scale-110 group-hover:bg-primary/10 transition-transform duration-500">
              {feature.icon}
            </div>
            <h3 className="text-xl font-extrabold text-[#111] mb-3">{feature.title}</h3>
            <p className="text-muted-foreground font-medium leading-relaxed relative z-10">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
