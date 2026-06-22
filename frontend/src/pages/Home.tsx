import { HeroSection } from '../components/HeroSection';
import { UrlShortener } from '../components/UrlShortener';
import { MediaInspector } from '../components/MediaInspector';
import { Features } from '../components/Features';
import { CallToAction } from '../components/CallToAction';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 w-full flex flex-col items-center">
        <HeroSection />
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-16 items-center">
          <UrlShortener />
          {/* <MediaInspector /> is commented or removed if not needed, but keep it if user wants it */}
          <MediaInspector />
        </div>
        <Features />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
