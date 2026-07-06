"use client";

import { motion, Variants } from "motion/react";
import { MessageSquare, Brain, CheckCircle, Zap } from "lucide-react";
import SectionHeading from "./shared/SectionHeading";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 100 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

const steps = [
  {
    number: "1",
    title: "Tell your goal",
    description:
      "Current bottlenecks, what \"AI‑native\" would mean for your team, constraints and priorities.",
    icon: MessageSquare,
  },
  {
    number: "2",
    title: "Plan",
    description:
      "I propose a scoped roadmap with rationale, sensible alternatives, and a realistic timeline.",
    icon: Brain,
  },
  {
    number: "3",
    title: "Confirm",
    description:
      "Approve or adjust; scope and budget are agreed before anything gets built.",
    icon: CheckCircle,
  },
  {
    number: "4",
    title: "Execute",
    description:
      "I build and ship the agents/automation; you receive a clear handoff report.",
    icon: Zap,
  },
];

export function HowItWorksSection() {
  return (
    <motion.section
      id="how-it-works"
      className="relative h-full w-full overflow-hidden bg-black py-20 scroll-mt-20"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(136,136,136,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(136,136,136,0.05)_1px,transparent_1px)] opacity-10 [background-size:6rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,transparent_70%,#000_110%)]" />

      <div className="page-container">
        <SectionHeading
          tag="How it works"
          title="A four‑step flow for safety and clarity"
          subTitle="Tell goal. Plan. Confirm. Execute. Every step is logged."
        />

        <div className="relative mt-16 max-w-6xl mx-auto">
          {/* Connecting Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -translate-y-1/2 z-0" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={stepVariants}
                className="relative group"
              >
                {/* Step Card */}
                <div className="relative h-full p-8 rounded-2xl border border-white/20 bg-black/80 hover:border-white/30 transition-all duration-300 hover:bg-white/5">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mb-6 mt-4">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-white/20">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connecting Arrow (Desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-20">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Mobile Connecting Lines */}
          <div className="lg:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-white/20 opacity-40" />
        </div>
      </div>
    </motion.section>
  );
}
