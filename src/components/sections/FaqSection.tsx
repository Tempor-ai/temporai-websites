'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AngularBackdrop from '../ui/AngularBackdrop';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'How transparent are agent decisions?',
    answer: 'Every action includes an explainable decision trail, exportable audit logs, and real-time visibility into execution logic.',
  },
  {
    question: 'Who is Tempora Labs built for?',
    answer: 'Tempora Labs is built for funds, DAOs, fintechs, and eventually retail clients seeking way to simplify yield generations. Our platform is designed for teams managing stablecoin portfolios who want DeFi yield exposure without running manual operations, fragmented tooling, or around-the-clock monitoring.',
  },
  {
    question: 'Is Tempora non-custodial?',
    answer: 'Yes. Tempora is non-custodial by design. You retain full control of funds at all times. Tempora&apos;s agents interact with on-chain protocols via permissioned execution, without taking custody of assets.',
  },
  {
    question: 'How do you manage risk and control autonomous execution?',
    answer: 'All execution is policy-driven and fully constrained. Users define risk bands, allocation limits, protocol exposure, and execution rules upfront. Agents operate strictly within these boundaries, and every action is monitored, logged, and explainable.',
  },
  {
    question: 'How is Tempora different from yield dashboards or DeFi aggregators?',
    answer: 'Dashboards show data. Tempora executes. Instead of requiring manual monitoring and intervention, Tempora uses autonomous agents to allocate, rebalance, and manage stablecoin positions in real time — all within predefined risk constraints and governance rules.',
  },
];

function AccordionItem({ item, isOpen, onToggle, index }: { item: FAQItem; isOpen: boolean; onToggle: () => void; index: number }) {
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <motion.div 
      className={`${index === 0 ? 'mb-0' : 'mb-4'} last:mb-0 relative group`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      style={{ willChange: 'auto' }}
    >
      {/* Card container with solid background to stand out from decorative background */}
      <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-slate-200/80 shadow-sm shadow-slate-200/40 overflow-hidden transition-all duration-200 group-hover:shadow-md group-hover:border-tem-accent/30">
        {/* Left accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-tem-accent/0 via-tem-accent/0 to-tem-accent/0 group-hover:from-tem-accent/60 group-hover:via-tem-accent/40 group-hover:to-tem-accent/60 transition-all duration-300 rounded-l-xl"></div>
        
        <button
          onClick={onToggle}
          className="w-full py-5 pl-6 pr-4 flex items-center justify-between text-left transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-tem-accent/50 focus:ring-offset-2 rounded-xl"
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${index}`}
        >
          <span className={`font-semibold text-base text-slate-900 pr-8 flex-1 transition-colors duration-200 ${isOpen ? 'text-tem-dark-1' : 'group-hover:text-tem-accent'}`}>
            {item.question}
          </span>
          <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 group-hover:bg-tem-accent/15 transition-colors duration-200 border border-slate-200/60">
            <svg
              className={`w-5 h-5 text-slate-700 group-hover:text-tem-accent transition-all duration-300 ${isOpen ? 'rotate-45 text-tem-accent' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id={`faq-answer-${index}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { 
                duration: 0.25, 
                ease: [0.4, 0, 0.2, 1]
              }}
              className="overflow-hidden"
              style={{ 
                willChange: 'height, opacity',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            >
              <div 
                className="pb-6 pl-6 pr-4 pt-2 text-sm text-slate-700 leading-relaxed border-t border-slate-200/60"
                dangerouslySetInnerHTML={{ __html: item.answer }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [backgroundHeight, setBackgroundHeight] = useState<number | null>(null);

  // Capture initial section height for stable background reference
  useEffect(() => {
    if (sectionRef.current) {
      const height = sectionRef.current.offsetHeight;
      setBackgroundHeight(height);
    }
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-[#f7fff9] overflow-hidden"
    >
      {/* Background Layer - Fixed height based on initial render, independent of content expansion */}
      <div 
        className="pointer-events-none absolute top-0 left-0 right-0 z-0 overflow-hidden"
        style={{ 
          willChange: 'transform',
          transform: 'translateZ(0)',
          // Use captured initial height or fallback to 100vh for stability
          height: backgroundHeight ? `${backgroundHeight}px` : '100vh',
          // Prevent background from resizing when content expands
          minHeight: backgroundHeight ? `${backgroundHeight}px` : '100vh',
        }}
        aria-hidden="true"
      >
        {/* Animated aurora background - fixed size, centered in stable container */}
        <div 
          className="absolute"
          style={{
            // Center in background container (not dependent on container height)
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) translateZ(0)',
            // Fixed dimensions prevent distortion
            width: '180vw',
            height: '130vh',
            minWidth: '180vw',
            minHeight: '130vh',
            background: `
              radial-gradient(circle at 40% 20%, #d4f4ee 0%, #c9eee5 40%, transparent 70%),
              radial-gradient(circle at 70% 70%, #daf96c 0%, #c9eee5 40%, transparent 80%)
            `,
            filter: 'blur(60px)',
            animation: 'nm-aurora-shift 24s ease-in-out infinite',
            willChange: 'transform',
          }}
        />
        
        {/* Angular backdrop geometry - fixed to stable background container */}
        <div 
          className="absolute inset-0" 
          style={{ 
            transform: 'translateZ(0)', 
            willChange: 'auto',
          }}
        >
          <AngularBackdrop />
        </div>
      </div>

      {/* Content Layer - Flows naturally, creates new stacking context */}
      <div 
        className="relative z-10 py-8 sm:py-12 lg:py-16" 
        style={{ 
          isolation: 'isolate',
          // Ensure content creates its own layout context
          position: 'relative',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid lg:grid-cols-[38%_62%] gap-8 lg:gap-16">
            {/* Left Column - Headline, CTA */}
            <div className="relative pt-4">
              {/* Subtle accent line */}
              <div className="absolute top-0 left-0 w-16 h-1 bg-gradient-to-r from-tem-accent to-transparent rounded-full mb-6"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  <span className="bg-gradient-to-r from-tem-dark-1 via-tem-accent to-tem-dark-1 bg-clip-text text-transparent">
                    Frequently Asked Questions
                  </span>
                </h2>
                <p className="text-base md:text-lg text-tem-neutral-muted mb-8 leading-relaxed">
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  Get answers to common questions about Tempora's autonomous treasury infrastructure, risk management, and integration capabilities.
                </p>
                <button className="px-6 py-3 bg-tem-accent-deep text-white font-semibold rounded-lg hover:bg-tem-accent-deep/90 transition-colors duration-200">
                  Contact Us
                </button>
              </div>
            </div>

            {/* Right Column - Accordion */}
            <div className="relative">
              <div className="space-y-0 -mt-0">
                {faqData.map((item, index) => (
                  <AccordionItem
                    key={index}
                    item={item}
                    isOpen={openIndex === index}
                    onToggle={() => toggleFAQ(index)}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

