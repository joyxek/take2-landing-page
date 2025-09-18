import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import NumbersStack from '@/components/NumbersStack';
import HowItWorks from '@/components/HowItWorks';
import StickyTimeline from '@/components/StickyTimeline';
import ComparisonSection from '@/components/ComparisonSection/ComparisonSection';
import ImageCarousel from '@/components/ImageCarousel';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. How It Works Section */}
      <HowItWorks />

      {/* 3. How dating apps work vs Take2 (Time to Date) */}
      <StickyTimeline />

      {/* 4. Comparison Section (Take2 vs Dating Apps) */}
      <div className="relative z-10">
        <ComparisonSection />
      </div>

      {/* 5. Image Carousel */}
      <ImageCarousel />

      {/* 6. Numbers Stack (400+/3/2024 + CTA) */}
      <NumbersStack />

      {/* 7. Footer */}
      <Footer />
    </main>
  );
}
