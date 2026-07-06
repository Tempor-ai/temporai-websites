'use client';

import Spline from '@splinetool/react-spline/next';
import Navbar from '@/components/Navbar';
import RotatingTypewriterWord from '@/components/RotatingTypewriterWord';
import PartnersMarquee from '@/components/PartnersMarquee';
import OldVsNewSection from '@/components/OldVsNewSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import RoadmapSection from '@/components/RoadmapSection';
import RoadmapFaqBridge from '@/components/RoadmapFaqBridge';
import FaqSection from '@/components/sections/FaqSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Spline animation */}
        <div className="absolute inset-0 scale-110 -right-[20%] translate-y-[5%]">
          <Spline
            scene="https://prod.spline.design/IW-pbXHHPHyAO216/scene.splinecode" 
          />
        </div>
        
        {/* Hero Content - Left Side */}
        <div className="absolute left-[8%] md:left-[10%] top-1/2 -translate-y-1/2 z-50 max-w-xl">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              <div className="block">
                Building <RotatingTypewriterWord
                  words={[
                    { text: 'Agentic', colorClass: 'text-tem-accent' },
                    { text: 'Intelligent', colorClass: 'text-tem-accent-deep' },
                    { text: 'Autonomous', colorClass: 'text-tem-accent' },
                    { text: 'Institutional', colorClass: 'text-tem-accent-deep' },
                    { text: 'Optimized', colorClass: 'text-tem-accent' },
                    { text: 'Customized', colorClass: 'text-tem-accent-deep' },
                    { text: 'Intent-Based', colorClass: 'text-tem-accent' },
                    { text: 'Data-Driven', colorClass: 'text-tem-accent-deep' },
                    { text: 'Risk-Aware', colorClass: 'text-tem-accent' },
                    { text: 'Seamless', colorClass: 'text-tem-accent-deep' },
                    { text: 'UX-Friendly', colorClass: 'text-tem-accent' },
                    { text: 'Cross-Chain', colorClass: 'text-tem-accent-deep' },
                    { text: 'High-Reasoning', colorClass: 'text-tem-accent' },
                    { text: 'Multi-Agent', colorClass: 'text-tem-accent-deep' },
                  ]}
                  typeSpeed={100}
                  deleteSpeed={60}
                  holdDelay={1800}
                  pauseBetweenWords={300}
                />
              </div>
              <div className="block mt-2">
                DeFi Investing Copilots
              </div>
            </h1>
            <p className="text-white/80 text-sm md:text-base">
              Transform portfolio intent into continuous, controlled execution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button className="px-6 py-3 bg-tem-accent text-tem-dark-1 font-semibold rounded-lg shadow-tem-glow hover:bg-tem-accent-soft transition-colors duration-200">
                Get Started
              </button>
              <button className="px-6 py-3 border-2 border-tem-accent text-tem-accent font-semibold rounded-lg hover:bg-tem-accent/10 transition-colors duration-200">
                How it Works
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Marquee */}
      <PartnersMarquee />

      {/* Problem / Solution Section */}
      <OldVsNewSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Roadmap Section */}
      <RoadmapSection />

      {/* Roadmap → FAQ Bridge */}
      <RoadmapFaqBridge />

      {/* FAQ Section */}
      <FaqSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </main>
  );
}

