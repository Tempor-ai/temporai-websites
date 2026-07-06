'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function RoadmapSection() {
  const [milestonesAnimated, setMilestonesAnimated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for section fade-in
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Intersection Observer for milestones animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !milestonesAnimated) {
            setMilestonesAnimated(true);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-50px 0px -50px 0px'
      }
    );

    const milestonesSection = document.getElementById('roadmap');
    if (milestonesSection) {
      observer.observe(milestonesSection);
    }

    return () => observer.disconnect();
  }, [milestonesAnimated]);

  const milestones = [
    {
      number: 1,
      title: 'Alpha',
      status: '2026 Q1',
      description: 'MVP1: Basic Portfolio allocation, execution, and withdrawals with web dashboard v1.',
      items: [
        'Limited to 3-5 Pilot Partners',
        'Focusing primarily on Base',
        'Implement gasless transactions and enhance data layer',
      ],
      nodeClasses: 'bg-gradient-to-br from-tem-accent to-tem-accent-soft',
      dotClasses: 'bg-tem-accent',
      statusClasses: 'text-tem-accent bg-tem-accent/10',
      itemDotClasses: 'bg-tem-accent/60',
      shadowClasses: 'group-hover:shadow-tem-accent/25',
    },
    {
      number: 2,
      title: 'Beta',
      status: 'Q2 2026',
      description: 'MVP2: Advanced portfolio rebalancing with expanded asset support.',
      items: [
        'Limited to 5 B2B pilot partners',
        'Multi-strategy stablecoin yield rebalancing',
        'Policy-based allocation and risk constraints',
        'Production-grade monitoring and alerting',
      ],
      nodeClasses: 'bg-gradient-to-br from-tem-accent-soft to-tem-accent',
      dotClasses: 'bg-tem-accent-soft',
      statusClasses: 'text-tem-accent-soft bg-tem-accent-soft/10',
      itemDotClasses: 'bg-tem-accent-soft/60',
      shadowClasses: 'group-hover:shadow-tem-accent-soft/25',
    },
    {
      number: 3,
      title: 'Beta (Expanded)',
      status: 'Q3 2026',
      description: 'MVP2: Production-grade risk management and execution hardening.',
      items: [
        'Higher stablecoin limits with enforced risk bands',
        'Onchain cost optimization and execution efficiency',
        'Refined dashboard UX',
        'Enhanced logging and reporting',
      ],
      nodeClasses: 'bg-gradient-to-br from-tem-accent-deep to-tem-accent-soft',
      dotClasses: 'bg-tem-accent-deep',
      statusClasses: 'text-tem-accent-deep bg-tem-accent-deep/10',
      itemDotClasses: 'bg-tem-accent-deep/60',
      shadowClasses: 'group-hover:shadow-tem-accent-deep/25',
    },
    {
      number: 4,
      title: 'Launch',
      status: 'Q4 2026',
      description: 'Full Platform: Web2 -> Web3 Intent translations, full feature list, retail access.',
      items: [
        'Public retail user signup',
        'Full Polished and customizable web dashboard',
        'Enhance Transaction logging and record keeping',
        'Faster Agent response times. Cheaper compute costs.',
      ],
      nodeClasses: 'bg-gradient-to-br from-tem-accent-deep to-tem-accent',
      dotClasses: 'bg-tem-accent-deep',
      statusClasses: 'text-tem-accent-deep bg-tem-accent-deep/10',
      itemDotClasses: 'bg-tem-accent-deep/60',
      shadowClasses: 'group-hover:shadow-tem-accent-deep/25',
    },
  ];

  return (
    <section 
      ref={sectionRef}
      id="roadmap" 
      className={`relative py-20 lg:py-24 bg-gradient-to-b from-tem-cream-50 via-tem-cream-100 to-tem-grey-50 overflow-hidden transition-all duration-1000 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Animated aurora background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div 
          className="absolute top-1/2 left-[-40%] right-[-40%] -translate-y-1/2 w-[180%] h-[130%] will-change-transform"
          style={{
            background: `
              radial-gradient(circle at 40% 20%, #d4f4ee 0%, #c9eee5 40%, transparent 70%),
              radial-gradient(circle at 70% 70%, #daf96c 0%, #c9eee5 40%, transparent 80%)
            `,
            filter: 'blur(60px)',
            animation: 'nm-aurora-shift 24s ease-in-out infinite',
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden'
          }}
        />
      </div>

      {/* Mesh lines - Inline SVG */}
      <div className="pointer-events-none absolute top-1/2 left-0 right-0 -translate-y-1/2 z-[1] overflow-hidden h-[130%] will-change-contents">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 720"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
          <defs>
            <linearGradient id="nm-gridline-roadmap" x1="0%" x2="100%">
              <stop offset="0%" stopColor="#8DA7B3" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#8DA7B3" stopOpacity="0.1" />
            </linearGradient>
            <filter id="circle-glow-roadmap">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {/* Horizontal arcs */}
          <g stroke="url(#nm-gridline-roadmap)" fill="none" strokeWidth="2">
            <path id="path-h1-roadmap" d="M-100 220 Q 720 80 1540 220" />
            <path id="path-h2-roadmap" d="M-100 300 Q 720 150 1540 300" />
            <path id="path-h3-roadmap" d="M-100 380 Q 720 230 1540 380" />
            <path id="path-h4-roadmap" d="M-100 460 Q 720 310 1540 460" />
            <path id="path-h5-roadmap" d="M-100 540 Q 720 390 1540 540" />
          </g>
          {/* Vertical meridians */}
          <g stroke="url(#nm-gridline-roadmap)" fill="none" strokeWidth="2">
            <path id="path-v1-roadmap" d="M720 40 C 360 40 220 340 720 680" />
            <path id="path-v2-roadmap" d="M720 40 C 500 40 360 340 720 680" />
            <path id="path-v3-roadmap" d="M720 40 C 940 40 1080 340 720 680" />
            <path id="path-v4-roadmap" d="M720 40 C 1080 40 1220 340 720 680" />
          </g>
          {/* Animated diamonds along paths - reduced count for better performance */}
          <g style={{ transform: 'translate3d(0, 0, 0)' }}>
            {/* Horizontal diamonds - path h1 */}
            <polygon points="0,-4 4,0 0,4 -4,0" fill="#8DA7B3" opacity="0.6" filter="url(#circle-glow-roadmap)">
              <animateMotion dur="18s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" keyTimes="0; 0.5; 1">
                <mpath href="#path-h1-roadmap" />
              </animateMotion>
            </polygon>
            {/* Horizontal diamonds - path h2 */}
            <polygon points="0,-4 4,0 0,4 -4,0" fill="#8DA7B3" opacity="0.6" filter="url(#circle-glow-roadmap)">
              <animateMotion dur="18s" repeatCount="indefinite" begin="2s" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" keyTimes="0; 0.5; 1">
                <mpath href="#path-h2-roadmap" />
              </animateMotion>
            </polygon>
            {/* Horizontal diamonds - path h3 */}
            <polygon points="0,-4 4,0 0,4 -4,0" fill="#8DA7B3" opacity="0.6" filter="url(#circle-glow-roadmap)">
              <animateMotion dur="18s" repeatCount="indefinite" begin="4s" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" keyTimes="0; 0.5; 1">
                <mpath href="#path-h3-roadmap" />
              </animateMotion>
            </polygon>
            {/* Horizontal diamonds - path h4 */}
            <polygon points="0,-4 4,0 0,4 -4,0" fill="#8DA7B3" opacity="0.6" filter="url(#circle-glow-roadmap)">
              <animateMotion dur="18s" repeatCount="indefinite" begin="6s" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" keyTimes="0; 0.5; 1">
                <mpath href="#path-h4-roadmap" />
              </animateMotion>
            </polygon>
            {/* Vertical diamonds - path v1 */}
            <polygon points="0,-4 4,0 0,4 -4,0" fill="#8DA7B3" opacity="0.6" filter="url(#circle-glow-roadmap)">
              <animateMotion dur="22s" repeatCount="indefinite" begin="1s" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" keyTimes="0; 0.5; 1">
                <mpath href="#path-v1-roadmap" />
              </animateMotion>
            </polygon>
            {/* Vertical diamonds - path v2 */}
            <polygon points="0,-4 4,0 0,4 -4,0" fill="#8DA7B3" opacity="0.6" filter="url(#circle-glow-roadmap)">
              <animateMotion dur="22s" repeatCount="indefinite" begin="3s" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" keyTimes="0; 0.5; 1">
                <mpath href="#path-v2-roadmap" />
              </animateMotion>
            </polygon>
            {/* Vertical diamonds - path v3 */}
            <polygon points="0,-4 4,0 0,4 -4,0" fill="#8DA7B3" opacity="0.6" filter="url(#circle-glow-roadmap)">
              <animateMotion dur="22s" repeatCount="indefinite" begin="5s" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" keyTimes="0; 0.5; 1">
                <mpath href="#path-v3-roadmap" />
              </animateMotion>
            </polygon>
          </g>
        </svg>
      </div>

      {/* Veil for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-tem-cream-50/30 via-tem-cream-100/20 to-tem-grey-50/30 z-[2]" />

      <div className="relative z-[3] max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block border border-tem-accent/40 px-4 py-2 rounded-lg text-xs font-medium tracking-wider uppercase text-tem-accent mb-4 bg-tem-accent/10">
              Roadmap
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-tem-dark-1">
              <span className="bg-gradient-to-r from-tem-dark-1 via-tem-accent to-tem-dark-1 bg-clip-text text-transparent">
                Our Journey To Launch
              </span>
            </h2>
          </div>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative pt-8 lg:pt-0">
          {/* Desktop Timeline Line - positioned at top where dots will be */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-tem-accent/30 to-transparent"></div>
          <motion.div 
            className="hidden lg:block absolute top-8 left-0 h-0.5 bg-gradient-to-r from-tem-accent via-tem-accent-soft to-tem-accent-deep"
            initial={{ width: '0%' }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          ></motion.div>
          
          {/* Mobile Timeline Line */}
          <div className="lg:hidden absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-tem-accent/30 to-transparent transform -translate-x-1/2"></div>
          <motion.div 
            className="lg:hidden absolute left-1/2 top-0 w-0.5 bg-gradient-to-b from-tem-accent via-tem-accent-soft to-tem-accent-deep transform -translate-x-1/2"
            initial={{ height: '0%' }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          ></motion.div>

          {/* Milestones Grid */}
          <div className="grid lg:grid-cols-4 gap-8 lg:gap-4">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.number}
                className="group relative flex flex-col items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
              >
                {/* Milestone Node - positioned to align with timeline at top-8 */}
                <div className={`${milestone.nodeClasses} border-4 border-tem-cream-50 shadow-xl group-hover:shadow-2xl ${milestone.shadowClasses} transition-all duration-300 w-16 h-16 rounded-full flex items-center justify-center relative z-10 mb-6 lg:mb-0 lg:absolute lg:top-8 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2`}>
                  <div className="w-full h-full bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{milestone.number}</span>
                  </div>
                </div>

                {/* Milestone Content - positioned below node */}
                <motion.div 
                  className="milestone-content bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-tem-grey-100/50 w-full lg:mt-16"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center mb-3 flex-wrap gap-2">
                    <div className={`w-3 h-3 ${milestone.dotClasses} rounded-full`}></div>
                    <h3 className="text-xl font-bold text-tem-dark-1">{milestone.title}</h3>
                    <span className={`ml-auto text-sm font-semibold ${milestone.statusClasses} px-3 py-1 rounded-full`}>
                      {milestone.status}
                    </span>
                  </div>
                  <p className="text-tem-neutral-muted text-sm leading-relaxed mb-4">
                    {milestone.description.includes(': ') ? (
                      <>
                        <strong className="text-tem-dark-1">{milestone.description.split(': ')[0]}: </strong>
                        {milestone.description.split(': ').slice(1).join(': ')}
                      </>
                    ) : (
                      milestone.description
                    )}
                  </p>
                  <div className="space-y-2 text-xs text-tem-neutral-muted">
                    {milestone.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start">
                        <span className={`w-1.5 h-1.5 ${milestone.itemDotClasses} rounded-full mt-2 mr-2 flex-shrink-0`}></span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

