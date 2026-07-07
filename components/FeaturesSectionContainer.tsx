"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Target, Eye, Shield, CheckCircle } from "lucide-react";
import SectionHeading from "./shared/SectionHeading";

const features = [
  {
    title: "Outcome‑based engagements",
    description: "Outcome‑based planning, not hourly micromanagement.",
    icon: <Target />,
  },
  {
    title: "Explainable by design",
    description: "Clear rationale; documented decisions for verification.",
    icon: <Eye />,
  },
  {
    title: "Human‑in‑the‑loop delivery",
    description:
      "Confirm before anything ships; scope and budget caps enforce the plan.",
    icon: <Shield />,
  },
  {
    title: "Proven execution path",
    description:
      "Built on real production systems — a DeFi copilot, a verifiable RAG platform, and an agent framework.",
    icon: <CheckCircle />,
  },
];

export function FeaturesSectionContainer() {
  return (
    <motion.div
      id="features"
      viewport={{ once: true, amount: 0.2 }} // triggers a bit earlier, smoother feel
      initial={{ opacity: 0, y: 40 }} // subtle slide-in instead of scale pop
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }} // smoother cubic-bezier
      className="relative h-full w-full page-container scroll-mt-20"
    >
      <SectionHeading
        tag="Why We're Different"
        title="Why Temporai Solutions?"
        subTitle="Four pillars that make AI‑assisted delivery practical."
      />
      <div className="absolute bottom-0 -z-10 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4c668a2e_1px,transparent_1px),linear-gradient(to_bottom,#4c668a0a_1px,transparent_1px)] [background-size:6rem_4rem]"></div>
      <motion.div
        className="absolute left-[-120px] top-[-20%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle_at_center,#6CB2E3_40%,transparent_50%)] opacity-[0.15] blur-3xl pointer-events-none z-[-1]"
        animate={{
          y: [0, -10, 10, -6, 3, 0],
          x: [0, 4, -4, 2, -2, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div className="grid my-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </motion.div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col py-10 relative group/feature bg-white/70 shadow-sm border border-[#22303F]/10 rounded-xl hover:border-[#4A90C2]/35 transition-all duration-300 hover:bg-white",
        "lg:border-r lg:border-b lg:rounded-none",
        index === 0 && "lg:border-l",
        index === 3 && "lg:border-r-0",
        index >= 2 && "lg:border-b-0"
      )}
    >
      <div className="opacity-0 group-hover/feature:opacity-100 transition duration-300 absolute inset-0 h-full w-full bg-gradient-to-br from-[#4A90C2]/[0.05] to-transparent pointer-events-none rounded-xl lg:rounded-none" />

      <div className="mb-6 relative z-10 px-8 text-[#4A90C2]">{icon}</div>

      <div className="text-xl font-bold mb-4 relative z-10 px-8">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-[#B9CBE0] group-hover/feature:bg-[#4A90C2] transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-[#22303F] group-hover/feature:text-[#4A90C2]">
          {title}
        </span>
      </div>

      <p className="text-sm text-secondary-foreground leading-relaxed relative z-10 px-8">
        {description}
      </p>
    </div>
  );
};
