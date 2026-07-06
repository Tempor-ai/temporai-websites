'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface StepProps {
  index: number;
  title: string;
  body: string;
}

function Step({ index, title, body }: StepProps) {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-tem-accent/20 border border-tem-accent/40 flex items-center justify-center">
        <span className="text-tem-accent text-sm font-semibold">{index}</span>
      </div>
      <div className="flex-1">
        <h3 className="text-white font-semibold text-lg mb-1">{title}</h3>
        <p className="text-tem-neutral-muted text-sm leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  trigger?: boolean;
}

function AnimatedNumber({ value, prefix = '', suffix = '', decimals = 0, duration = 3000, trigger = false }: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!trigger || hasAnimated) return;

    const startTime = Date.now();
    const startValue = 0;
    const endValue = value;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValue + (endValue - startValue) * easeOutQuart;
      
      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(endValue);
        setHasAnimated(true);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration, trigger, hasAnimated]);

  const formatValue = (val: number) => {
    if (decimals === 0) {
      return Math.floor(val).toLocaleString();
    }
    return val.toFixed(decimals);
  };

  return (
    <span>
      {prefix}
      {formatValue(displayValue)}
      {suffix}
    </span>
  );
}

export default function HowItWorksSection() {
  const [isInView, setIsInView] = useState(false);

  return (
    <section id="how-it-works" className="relative w-full py-16 lg:py-24 bg-tem-dark-1 overflow-hidden">
      {/* Soft glow behind cards */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-r from-tem-accent/15 via-tem-accent-soft/10 to-tem-accent-deep/20 blur-3xl rounded-full opacity-50" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-16 items-start">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            {/* Eyebrow */}
            <p className="text-xs font-semibold tracking-[0.2em] text-tem-accent uppercase">
              HOW TEMPORA WORKS
            </p>
            
            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Agentic automation, wrapped in a single dashboard.
            </h2>
            
            {/* Description */}
            <p className="text-lg text-tem-neutral-muted leading-relaxed">
              Connect your capital, define your strategy, and let autonomous agents execute within clear guardrails—with a single audit trail you can trust.
            </p>
            
            {/* Steps */}
            <div className="space-y-6 pt-4">
              <Step
                index={1}
                title="Plan"
                body="Use natural language intents to build customized portfolio plans. Our agents explain the plan, you confirm or modify."
              />
              <Step
                index={2}
                title="Execute"
                body="Autonomous agents initiate trades, rebalance allocations, and execute strategies within your predefined risk parameters."
              />
              <Step
                index={3}
                title="Monitor & Explain"
                body="All actions are monitored, logged, explainable, and exportable in real time."
              />
            </div>
          </div>
          
          {/* Right Column - 3D Dashboard Visual */}
          <motion.div 
            className="relative h-[800px] lg:h-[900px]"
            onViewportEnter={() => setIsInView(true)}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div 
              className="relative w-full h-full"
              style={{ perspective: '1400px' }}
            >
              {/* Transactions Screen - Behind Everything */}
              <motion.div
                className="absolute top-8 right-[-20%] w-[95%] max-w-[600px] rounded-[32px] bg-tem-dark-2 border border-tem-accent/40 p-8 shadow-xl shadow-black/60"
                style={{
                  transform: 'rotateY(-18deg) rotateX(8deg) translateZ(-100px)',
                  transformStyle: 'preserve-3d',
                }}
                initial={{ opacity: 0, scale: 0.9, y: 30, rotateY: -15, rotateX: 5 }}
                whileInView={{ 
                  opacity: 1, 
                  scale: 1,
                  y: 0,
                  rotateY: -18,
                  rotateX: 8
                }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 1.2, 
                  delay: 0.2,
                  ease: "easeOut"
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <p className="text-tem-accent text-base font-semibold">Recent Transactions</p>
                  <div className="px-3 py-1 rounded-full bg-tem-accent/20 border border-tem-accent/40">
                    <span className="text-tem-accent text-xs font-medium">Live</span>
                  </div>
                </div>
                <div className="space-y-3 mb-6 max-h-[400px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  <div className="bg-tem-dark-3/50 rounded-lg p-4 border-l-2 border-tem-accent">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-tem-neutral-light text-sm font-medium mb-1">Rebalance</p>
                        <p className="text-tem-neutral-muted text-xs">USDC → DAI</p>
                      </div>
                      <div className="text-right">
                        <p className="text-tem-accent text-sm font-semibold">+$35,000</p>
                        <p className="text-tem-neutral-muted text-xs">2 min ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-tem-dark-3/50 rounded-lg p-4 border-l-2 border-tem-accent-soft">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-tem-neutral-light text-sm font-medium mb-1">Yield Harvest</p>
                        <p className="text-tem-neutral-muted text-xs">Compound USDC</p>
                      </div>
                      <div className="text-right">
                        <p className="text-tem-accent-soft text-sm font-semibold">+56.3 USDC</p>
                        <p className="text-tem-neutral-muted text-xs">15 min ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-tem-dark-3/50 rounded-lg p-4 border-l-2 border-tem-accent-deep">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-tem-neutral-light text-sm font-medium mb-1">Risk Adjustment</p>
                        <p className="text-tem-neutral-muted text-xs">ETH reduction</p>
                      </div>
                      <div className="text-right">
                        <p className="text-tem-accent-deep text-sm font-semibold">-8%</p>
                        <p className="text-tem-neutral-muted text-xs">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-tem-dark-3/50 rounded-lg p-4 border-l-2 border-tem-accent">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-tem-neutral-light text-sm font-medium mb-1">Deposit</p>
                        <p className="text-tem-neutral-muted text-xs">USDC vault</p>
                      </div>
                      <div className="text-right">
                        <p className="text-tem-accent text-sm font-semibold">+$125,000</p>
                        <p className="text-tem-neutral-muted text-xs">3 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-tem-dark-3/50 rounded-lg p-4 border-l-2 border-tem-accent-soft">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-tem-neutral-light text-sm font-medium mb-1">Swap</p>
                        <p className="text-tem-neutral-muted text-xs">DAI → USDC</p>
                      </div>
                      <div className="text-right">
                        <p className="text-tem-accent-soft text-sm font-semibold">+$42,500</p>
                        <p className="text-tem-neutral-muted text-xs">5 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-tem-dark-3">
                  <button className="w-full px-6 py-3 border border-tem-dark-3 text-tem-neutral-muted text-sm font-semibold rounded-full hover:border-tem-dark-2 hover:text-tem-neutral-light transition-colors">
                    View All Transactions
                  </button>
                </div>
              </motion.div>

              {/* New Dashboard Card - Front */}
              <motion.div
                className="absolute top-24 left-[5%] w-[95%] max-w-[900px] rounded-[32px] bg-tem-dark-2 border border-tem-accent/40 p-6 shadow-2xl shadow-black/70"
                style={{
                  transform: 'rotateY(-20deg) rotateX(12deg) translateZ(80px)',
                  transformStyle: 'preserve-3d',
                }}
                initial={{ opacity: 0, scale: 0.9, y: 30, rotateY: -15, rotateX: 8 }}
                whileInView={{ 
                  opacity: 1, 
                  scale: 1,
                  y: 0,
                  rotateY: -20,
                  rotateX: 12
                }}
                viewport={{ once: true, margin: "-100px" }}
                animate={{
                  boxShadow: isInView ? [
                    '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(19,199,196,0.45)',
                    '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 50px rgba(19,199,196,0.55)',
                    '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(19,199,196,0.45)',
                  ] : '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(19,199,196,0.45)'
                }}
                transition={{ 
                  opacity: { duration: 1.2, ease: "easeOut" },
                  scale: { duration: 1.2, ease: "easeOut" },
                  y: { duration: 1.2, ease: "easeOut" },
                  rotateY: { duration: 1.2, ease: "easeOut" },
                  rotateX: { duration: 1.2, ease: "easeOut" },
                  boxShadow: { 
                    duration: 4,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }
                }}
              >
                <div className="grid grid-cols-3 gap-4 h-full">
                  {/* Left 2/3 Content */}
                  <div className="col-span-2 space-y-4">
                    {/* Key Indicators */}
                    <div className="grid grid-cols-3 gap-3">
                      <motion.div 
                        className="bg-tem-dark-3/50 rounded-xl p-4 border border-tem-dark-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        <p className="text-tem-neutral-muted text-xs mb-1">Total Portfolio</p>
                        <p className="text-white text-xl font-bold">
                          <AnimatedNumber value={7.8} prefix="$" suffix="M" decimals={1} trigger={isInView} />
                        </p>
                      </motion.div>
                      <motion.div 
                        className="bg-tem-dark-3/50 rounded-xl p-4 border border-tem-dark-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <p className="text-tem-neutral-muted text-xs mb-1">24H Change</p>
                        <p className="text-tem-accent text-xl font-bold">
                          <AnimatedNumber value={2.4} prefix="+" suffix="%" decimals={1} trigger={isInView} />
                        </p>
                      </motion.div>
                      <motion.div 
                        className="bg-tem-dark-3/50 rounded-xl p-4 border border-tem-dark-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        <p className="text-tem-neutral-muted text-xs mb-1">APY</p>
                        <p className="text-tem-accent-soft text-xl font-bold">
                          <AnimatedNumber value={4.3} suffix="%" decimals={1} trigger={isInView} />
                        </p>
                      </motion.div>
                    </div>
                    
                    {/* Charts Row */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Donut Chart Section */}
                      <motion.div 
                        className="bg-tem-dark-3/30 rounded-xl p-4 border border-tem-dark-3"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        <p className="text-tem-neutral-muted text-xs mb-3 font-medium">Portfolio Allocation</p>
                        <div className="flex flex-col items-center gap-3">
                          {/* Animated Donut Chart */}
                          <div className="relative w-28 h-28">
                            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                              <circle cx="50" cy="50" r="40" fill="none" stroke="#1C3244" strokeWidth="8" />
                              <circle 
                                cx="50" 
                                cy="50" 
                                r="40" 
                                fill="none" 
                                stroke="#13C7C4" 
                                strokeWidth="8" 
                                strokeDasharray="113 251.2" 
                                strokeDashoffset="251.2"
                                strokeLinecap="round"
                              >
                                <animate
                                  attributeName="stroke-dashoffset"
                                  from="251.2"
                                  to="138.16"
                                  dur="2.5s"
                                  fill="freeze"
                                />
                              </circle>
                              <circle 
                                cx="50" 
                                cy="50" 
                                r="40" 
                                fill="none" 
                                stroke="#55D5D1" 
                                strokeWidth="8" 
                                strokeDasharray="75.36 251.2" 
                                strokeDashoffset="251.2"
                                strokeLinecap="round"
                              >
                                <animate
                                  attributeName="stroke-dashoffset"
                                  from="251.2"
                                  to="175.84"
                                  dur="2.5s"
                                  begin="0.3s"
                                  fill="freeze"
                                />
                              </circle>
                              <circle 
                                cx="50" 
                                cy="50" 
                                r="40" 
                                fill="none" 
                                stroke="#267B87" 
                                strokeWidth="8" 
                                strokeDasharray="62.8 251.2" 
                                strokeDashoffset="251.2"
                                strokeLinecap="round"
                              >
                                <animate
                                  attributeName="stroke-dashoffset"
                                  from="251.2"
                                  to="188.4"
                                  dur="2.5s"
                                  begin="0.6s"
                                  fill="freeze"
                                />
                              </circle>
                            </svg>
                          </div>
                          {/* Asset List - Bottom */}
                          <div className="w-full space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-tem-accent" />
                                <span className="text-tem-neutral-light text-xs">USDC</span>
                              </div>
                              <span className="text-tem-neutral-muted text-xs">45%</span>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-tem-accent-soft" />
                                <span className="text-tem-neutral-light text-xs">DAI</span>
                              </div>
                              <span className="text-tem-neutral-muted text-xs">30%</span>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-tem-accent-deep" />
                                <span className="text-tem-neutral-light text-xs">ETH</span>
                              </div>
                              <span className="text-tem-neutral-muted text-xs">25%</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                      
                      {/* Line Graph */}
                      <motion.div 
                        className="bg-tem-dark-3/30 rounded-xl p-4 border border-tem-dark-3"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                      >
                        <p className="text-tem-neutral-muted text-xs mb-3 font-medium">Performance</p>
                        <div className="h-40 relative">
                          {/* Animated Line Graph */}
                          <svg viewBox="0 0 200 120" className="w-full h-full" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#13C7C4" stopOpacity="0.5" />
                                <stop offset="50%" stopColor="#55D5D1" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#13C7C4" stopOpacity="0" />
                              </linearGradient>
                              <filter id="glow">
                                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                                <feMerge>
                                  <feMergeNode in="coloredBlur"/>
                                  <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                              </filter>
                            </defs>
                            {/* Grid lines */}
                            <line x1="0" y1="100" x2="200" y2="100" stroke="#1C3244" strokeWidth="1" opacity="0.5" />
                            <line x1="0" y1="80" x2="200" y2="80" stroke="#1C3244" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.3" />
                            <line x1="0" y1="60" x2="200" y2="60" stroke="#1C3244" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.3" />
                            <line x1="0" y1="40" x2="200" y2="40" stroke="#1C3244" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.3" />
                            <line x1="0" y1="20" x2="200" y2="20" stroke="#1C3244" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.3" />
                            {/* Animated Area fill */}
                            <polygon
                              points="0,100 0,90 25,82 50,78 75,70 100,65 125,58 150,52 175,48 200,42 200,100"
                              fill="url(#lineGradient)"
                              opacity="0"
                            >
                              <animate
                                attributeName="opacity"
                                from="0"
                                to="1"
                                dur="1.5s"
                                begin="0.5s"
                                fill="freeze"
                              />
                            </polygon>
                            {/* Animated Main line */}
                            <polyline
                              points="0,90 25,82 50,78 75,70 100,65 125,58 150,52 175,48 200,42"
                              fill="none"
                              stroke="#13C7C4"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              filter="url(#glow)"
                              strokeDasharray="300"
                              strokeDashoffset="300"
                            >
                              <animate
                                attributeName="stroke-dashoffset"
                                from="300"
                                to="0"
                                dur="3s"
                                begin="0.5s"
                                fill="freeze"
                              />
                            </polyline>
                            {/* Animated Data points */}
                            <circle cx="0" cy="90" r="3" fill="#13C7C4" opacity="0">
                              <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="2.5s" fill="freeze" />
                            </circle>
                            <circle cx="50" cy="78" r="3" fill="#55D5D1" opacity="0">
                              <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="2.7s" fill="freeze" />
                            </circle>
                            <circle cx="100" cy="65" r="3" fill="#13C7C4" opacity="0">
                              <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="2.9s" fill="freeze" />
                            </circle>
                            <circle cx="150" cy="52" r="3" fill="#55D5D1" opacity="0">
                              <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="3.1s" fill="freeze" />
                            </circle>
                            <circle cx="200" cy="42" r="3" fill="#13C7C4" opacity="0">
                              <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="3.3s" fill="freeze" />
                            </circle>
                          </svg>
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Activity Feed */}
                    <motion.div 
                      className="bg-tem-dark-3/30 rounded-xl p-4 border border-tem-dark-3"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      <p className="text-tem-neutral-muted text-xs mb-3 font-medium">Recent Activity</p>
                      <div className="space-y-2 max-h-32 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <motion.div 
                          className="flex items-start gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.4, delay: 0.8 }}
                        >
                          <motion.div 
                            className="w-1.5 h-1.5 rounded-full bg-tem-accent mt-1.5 flex-shrink-0"
                            animate={{ 
                              scale: [1, 1.3, 1],
                              opacity: [1, 0.7, 1]
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 3
                            }}
                          />
                          <div className="flex-1">
                            <p className="text-tem-neutral-light text-xs">Rebalanced USDC → DAI</p>
                            <p className="text-tem-neutral-muted text-[10px]">2 minutes ago</p>
                          </div>
                        </motion.div>
                        <motion.div 
                          className="flex items-start gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.4, delay: 0.9 }}
                        >
                          <motion.div 
                            className="w-1.5 h-1.5 rounded-full bg-tem-accent-soft mt-1.5 flex-shrink-0"
                            animate={{ 
                              scale: [1, 1.3, 1],
                              opacity: [1, 0.7, 1]
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 3,
                              delay: 0.5
                            }}
                          />
                          <div className="flex-1">
                            <p className="text-tem-neutral-light text-xs">Yield harvested from Compound</p>
                            <p className="text-tem-neutral-muted text-[10px]">15 minutes ago</p>
                          </div>
                        </motion.div>
                        <motion.div 
                          className="flex items-start gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.4, delay: 1.0 }}
                        >
                          <motion.div 
                            className="w-1.5 h-1.5 rounded-full bg-tem-accent-deep mt-1.5 flex-shrink-0"
                            animate={{ 
                              scale: [1, 1.3, 1],
                              opacity: [1, 0.7, 1]
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 3,
                              delay: 1
                            }}
                          />
                          <div className="flex-1">
                            <p className="text-tem-neutral-light text-xs">Risk adjustment executed</p>
                            <p className="text-tem-neutral-muted text-[10px]">1 hour ago</p>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Right 1/3 - Actions & Chat */}
                  <motion.div 
                    className="col-span-1 space-y-4"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    {/* +New Action Button */}
                    <motion.button 
                      className="w-full px-4 py-3 bg-tem-accent text-tem-dark-1 text-sm font-semibold rounded-lg hover:bg-tem-accent-soft transition-colors shadow-lg shadow-tem-accent/20"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      + New Action
                    </motion.button>
                    
                    {/* Chat Window */}
                    <motion.div 
                      className="bg-tem-dark-3/50 rounded-xl p-4 border border-tem-dark-3 h-[calc(100%-80px)] flex flex-col"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      <p className="text-tem-accent text-xs font-semibold mb-3">AI Agent</p>
                      <div className="flex-1 space-y-2 overflow-y-auto mb-3">
                        <motion.div 
                          className="bg-tem-dark-2 rounded-lg p-2.5"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.4, delay: 1.0 }}
                        >
                          <p className="text-tem-neutral-light text-xs leading-relaxed">
                            Suggested rebalance: Move 12% USDC → DAI for +0.24% APY boost.
                          </p>
                        </motion.div>
                        <motion.div 
                          className="bg-tem-dark-2 rounded-lg p-2.5"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.4, delay: 1.2 }}
                        >
                          <p className="text-tem-neutral-light text-xs leading-relaxed">
                            Risk impact: Minimal. Exposure stays within bands.
                          </p>
                        </motion.div>
                      </div>
                      <button className="w-full px-3 py-1.5 bg-tem-accent text-tem-dark-1 text-xs font-semibold rounded-lg hover:bg-tem-accent-soft transition-colors">
                        Execute
                      </button>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Rebalance Modal - In Front */}
              {/* <motion.div
                className="absolute top-[50%] left-[35%] w-[55%] max-w-[240px] rounded-xl bg-tem-dark-2 border-2 border-tem-accent/60 p-3 shadow-2xl shadow-black/80"
                style={{
                  transform: 'rotateY(-16deg) rotateX(12deg) translateZ(200px)',
                  transformStyle: 'preserve-3d',
                }}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {/* Modal Header */}
                {/* <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white text-sm font-semibold">Rebalance</h3>
                  <button className="w-5 h-5 rounded-full bg-tem-dark-3/50 border border-tem-dark-3 flex items-center justify-center hover:bg-tem-dark-3 transition-colors">
                    <span className="text-tem-neutral-muted text-xs leading-none">×</span>
                  </button>
                </div>
                
                {/* Current Allocation - Compact */}
                {/* <div className="mb-2">
                  <div className="flex items-center gap-3 text-[10px]">
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-tem-accent" />
                      <span className="text-tem-neutral-light">USDC 45%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-tem-accent-soft" />
                      <span className="text-tem-neutral-light">DAI 30%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-tem-accent-deep" />
                      <span className="text-tem-neutral-light">ETH 25%</span>
                    </div>
                  </div>
                </div>
                
                {/* Rebalance Form - Compact */}
                {/* <div className="mb-2">
                  <div className="space-y-1">
                    <div>
                      <div className="flex items-center justify-between mb-0.5">
                        <label className="text-tem-neutral-light text-[9px]">USDC</label>
                        <span className="text-tem-accent text-[9px] font-medium">42%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value="42" 
                        className="w-full h-1 bg-tem-dark-3 rounded-lg appearance-none cursor-pointer accent-tem-accent"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-0.5">
                        <label className="text-tem-neutral-light text-[9px]">DAI</label>
                        <span className="text-tem-accent-soft text-[9px] font-medium">33%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value="33" 
                        className="w-full h-1 bg-tem-dark-3 rounded-lg appearance-none cursor-pointer accent-tem-accent-soft"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-0.5">
                        <label className="text-tem-neutral-light text-[9px]">ETH</label>
                        <span className="text-tem-accent-deep text-[9px] font-medium">25%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value="25" 
                        className="w-full h-1 bg-tem-dark-3 rounded-lg appearance-none cursor-pointer accent-tem-accent-deep"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Estimated Impact - Compact */}
                {/* <div className="bg-tem-accent/10 rounded-lg p-2 border border-tem-accent/30 mb-2">
                  <div className="flex items-center gap-1.5 text-[9px]">
                    <span className="text-tem-accent font-semibold">+0.24% APY</span>
                    <span className="text-tem-neutral-muted">•</span>
                    <span className="text-tem-neutral-light">Low Risk</span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                {/* <div className="flex gap-1.5">
                  <button className="flex-1 px-2 py-1.5 bg-tem-accent text-tem-dark-1 text-[10px] font-semibold rounded-lg hover:bg-tem-accent-soft transition-colors shadow-lg shadow-tem-accent/20">
                    Execute
                  </button>
                  <button className="px-2 py-1.5 border border-tem-dark-3 text-tem-neutral-muted text-[10px] font-semibold rounded-lg hover:border-tem-dark-2 hover:text-tem-neutral-light transition-colors">
                    Cancel
                  </button>
                </div>
              </motion.div> */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
