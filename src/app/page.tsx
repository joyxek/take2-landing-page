import Header from '@/components/Header';
import Hero from '@/components/Hero';
import NumbersStack from '@/components/NumbersStack';
import HowItWorks from '@/components/HowItWorks';
import TimelineAnimation from '@/components/TimelineAnimation';
import ComparisonSection from '@/components/ComparisonSection/ComparisonSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. How It Works Section */}
      <HowItWorks />

      {/* 3. Timeline Animation (Time to Date) */}
      <TimelineAnimation />

      {/* 4. Comparison Section (Take2 vs Dating Apps) */}
      <div className="relative z-10">
        <ComparisonSection />
      </div>

      {/* 5. Numbers Stack (400+/3/2024 + CTA) */}
      <NumbersStack />

      {/* 6. Footer */}
      <Footer />
    </main>
  );
}
