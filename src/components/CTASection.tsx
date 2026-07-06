'use client';

import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <section id="get-started" className="relative w-full py-20 md:py-24 bg-tem-dark-1 overflow-hidden">
      {/* Soft glow behind heading - matching How It Works section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-r from-tem-accent/15 via-tem-accent-soft/10 to-tem-accent-deep/20 blur-3xl rounded-full opacity-50 pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8">
        <motion.div
          className="flex flex-col items-center text-center space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Ready to operate with{' '}
            <span className="text-tem-accent">autonomous agents</span>?
          </h2>

          {/* Subtext */}
          <p className="text-tem-neutral-muted text-base sm:text-lg leading-relaxed max-w-[600px]">
            Connect your capital, define your strategy, and let autonomous agents execute within clear guardrails with a single audit trail you can trust.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <motion.button
              className="px-8 py-4 bg-tem-accent text-tem-dark-1 font-semibold rounded-full shadow-tem-glow hover:bg-tem-accent-soft hover:scale-[1.03] transition-all duration-200 whitespace-nowrap"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started
            </motion.button>
            <motion.button
              className="px-8 py-4 border border-tem-dark-3 bg-tem-dark-2 text-tem-neutral-light font-semibold rounded-full hover:bg-tem-dark-3 hover:border-tem-accent/40 transition-all duration-200 whitespace-nowrap"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Schedule a Demo
            </motion.button>
          </div>

          {/* Compliance reassurance */}
          <p className="text-xs sm:text-sm text-tem-neutral-muted pt-2">
            No custody. You approve every transaction.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

