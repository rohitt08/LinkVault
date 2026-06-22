export function Footer() {
  return (
    <div className="w-full mt-auto">
      {/* Floating links above footer */}
      <div className="flex justify-center mb-8 relative z-10">
        <div className="bg-white px-8 py-3 rounded-full shadow-md border border-black/5 flex gap-8 text-sm font-bold text-black">
          <a href="#" className="transition-colors hover:text-primary hover:-translate-y-0.5 inline-block duration-300">Privacy Policy</a>
          <a href="#" className="transition-colors hover:text-primary hover:-translate-y-0.5 inline-block duration-300">Terms of Service</a>
        </div>
      </div>
      
      {/* Actual footer */}
      <footer className="w-full border-t bg-muted/10 py-8">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground font-medium">
            &copy; {new Date().getFullYear()} LinkVault. Built with React & Vite.
          </p>
        </div>
      </footer>
    </div>
  );
}
