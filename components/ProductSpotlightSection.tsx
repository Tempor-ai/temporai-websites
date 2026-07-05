"use client";

import { motion, Variants } from "motion/react";
import { cn } from "@/lib/utils";
import { Target, Shield, Eye, FileText, AlertCircle } from "lucide-react";
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
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const featureVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

const features = [
  {
    icon: Target,
    title: "Outcome‑based engagements, not hourly toggles",
    description:
      "Set high-level goals instead of micromanaging individual tasks or tickets",
  },
  {
    icon: Shield,
    title: "Scoped budget and timeline caps",
    description:
      "Clear guardrails on scope, budget, and timeline agreed before work starts",
  },
  {
    icon: Eye,
    title: "Explainable plans with rationale and alternatives",
    description:
      "Clear reasoning behind every decision with alternative options presented",
  },
  {
    icon: FileText,
    title: "Documented handoff of plan, decisions, and delivery",
    description:
      "Complete transparency with a clear record of every step taken",
  },
];

export function ProductSpotlightSection() {
  return (
    <motion.section
      id="product-spotlight"
      className="relative h-full w-full overflow-hidden bg-black py-20 scroll-mt-20"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
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
          tag="Product Spotlight"
          title="Temporai Solutions — AI Dev Shop"
          subTitle="Plan + confirm; then I ship it."
        />

        <div className="mt-16 max-w-5xl mx-auto">
          {/* Key Features Section */}
          <motion.div variants={featureVariants} className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              Key features
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={featureVariants}
                  className="group relative"
                >
                  <div className="relative p-6 rounded-xl border border-white/10 bg-black/50 hover:border-white/20 transition-all duration-300 hover:bg-white/5">
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/1 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10 flex items-start space-x-4">
                      {/* Icon */}
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#3B82F6] to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-[#3B82F6] transition-colors duration-300">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-secondary-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Note Section */}
          <motion.div variants={featureVariants} className="relative">
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center mt-0.5">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-amber-200 mb-2">
                    Note: Nothing ships without your review
                  </h4>
                  <p className="text-sm text-amber-100/80 leading-relaxed">
                    Every deliverable is reviewed and approved by you before
                    it goes live.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
