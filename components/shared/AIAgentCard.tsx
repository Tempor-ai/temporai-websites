"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, Variants } from "motion/react";
interface AIAgentCardProps {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: React.ComponentType<{ className?: string }>;
  index: number;
  isLast: boolean;
}

const childVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
};

export function AIAgentCard({
  title,
  subtitle,
  description,
  features,
  icon: Icon,
}: AIAgentCardProps) {
  return (
    <motion.div
      variants={childVariants}
      className="w-full  max-w-[280px] lg:max-w-[350px] animate-rotate-border  transition-all ease-out rounded-lg bg-conic/[from_var(--border-angle)] from-black via-accent/80 to-black from-80% via-90% to-100% p-px shadow-secondary shadow-md relative  "
    >
      <div className="p-8 rounded-lg size-full bg-black  overflow-hidden group">
        <div className="absolute size-full inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content */}
        <div className="relative z-10 space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20">
                <Icon className="w-6 h-6 text-accent" />
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xl font-bold text-white group-hover:text-accent transition-colors duration-300">
                {title}
              </h4>
              <p className="text-sm text-accent font-medium">{subtitle}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm leading-relaxed">{description}</p>

          {/* Features */}
          <div className="space-y-3 mb-2">
            <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Key Features
            </h5>
            <div className="space-y-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span className="text-sm text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
