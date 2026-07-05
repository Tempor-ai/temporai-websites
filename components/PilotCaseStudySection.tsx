"use client";

import { motion } from "motion/react";
import { Target, Clock, CheckCircle, FileText } from "lucide-react";
import SectionHeading from "./shared/SectionHeading";

const highlights = [
  {
    icon: Clock,
    title: "Plan time < 5 seconds",
    description: "Lightning-fast portfolio planning and analysis",
  },
  {
    icon: CheckCircle,
    title: "≥3 rationale bullets + alternatives",
    description: "Comprehensive decision-making transparency",
  },
  {
    icon: FileText,
    title: "End‑to‑end log captured",
    description: "Complete audit trail of plan, confirm, intent",
  },
];

export function PilotCaseStudySection() {
  return (
    <motion.section
      id="pilot-case-study"
      className="relative h-full w-full overflow-hidden bg-black py-20 scroll-mt-20"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(136,136,136,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(136,136,136,0.1)_1px,transparent_1px)] opacity-20 [background-size:6rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,transparent_70%,#000_110%)]" />

      <motion.div
        className="absolute right-[-120px] top-[-20%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle_at_center,#3B82F6_20%,transparent_50%)] opacity-10 blur-3xl pointer-events-none z-[-1]"
        animate={{
          y: [0, -5, 5, -3, 2, 0],
          x: [0, 2, -2, 1, -1, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="page-container">
        <SectionHeading
          tag="Pilot Case Study"
          title="From goal to execution—explainable at every step"
          subTitle="A realistic DR HIRO co‑pilot run."
        />

        <div className="mt-16 max-w-6xl mx-auto">
          {/* Scenario Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-black border border-white/10 rounded-xl p-8 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-[#3B82F6]" />
                </div>
                <h3 className="text-2xl font-bold text-white">Scenario</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#3B82F6] mt-2" />
                  <p className="text-sm text-secondary-foreground leading-relaxed">
                    <strong className="text-white">Goal (PLI):</strong> 75%
                    liquid / 25% vaults; 25% per‑protocol cap.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#3B82F6] mt-2" />
                  <p className="text-sm text-secondary-foreground leading-relaxed">
                    DR HIRO produced a deterministic plan with rationale and
                    alternatives, logged confirmation, then executed.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Highlights Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              Highlights
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {highlights.map((highlight) => (
                <motion.div
                  key={highlight.title}
                  className="group relative p-6 rounded-xl border border-white/10 bg-black/50 hover:border-white/20 transition-all duration-300 hover:bg-white/5"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="opacity-0 group-hover:opacity-100 transition duration-300 absolute inset-0 h-full w-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-xl" />

                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-300">
                      <highlight.icon className="w-8 h-8 text-[#3B82F6]" />
                    </div>

                    <h4 className="text-lg font-bold text-white mb-3 group-hover:text-[#3B82F6] transition-colors duration-300">
                      {highlight.title}
                    </h4>

                    <p className="text-sm text-secondary-foreground leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
