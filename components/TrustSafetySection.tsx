"use client";

import { motion } from "motion/react";
import { Shield, Eye, Server } from "lucide-react";
import SectionHeading from "./shared/SectionHeading";

const features = [
  {
    title: "Safety & controls",
    items: [
      "Human sign‑off before anything ships",
      "Scope, budget, and timeline caps agreed up front",
      "No runaway engagements — changes in scope are called out and re‑confirmed",
      "Pre‑ship checklist: does it meet the goal, is it documented, is it handed off cleanly",
    ],
    icon: Shield,
  },
  {
    title: "Observability",
    items: [
      "Full record of decisions, inputs, and outputs",
      "Regular progress updates, not a black box",
    ],
    icon: Eye,
  },
  {
    title: "What's next",
    items: [
      "Expanding into more industries as the practice grows",
      "Self‑hosted / privacy‑first options for teams that need them",
    ],
    icon: Server,
  },
];

export function TrustSafetySection() {
  return (
    <motion.section
      id="trust-safety"
      className="relative h-full w-full overflow-hidden bg-black py-20 scroll-mt-20"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(136,136,136,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(136,136,136,0.1)_1px,transparent_1px)] opacity-20 [background-size:6rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,transparent_70%,#000_110%)]" />

      <motion.div
        className="absolute left-[-120px] top-[-20%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle_at_center,#3B82F6_20%,transparent_50%)] opacity-10 blur-3xl pointer-events-none z-[-1]"
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
          tag="HOW I WORK"
          title="Clear scope, clear communication, no surprises"
          subTitle="Transparency and safer delivery from day one."
        />

        <div className="grid my-8 grid-cols-1 md:grid-cols-3 relative z-10 py-10 max-w-6xl mx-auto">
          {features.map((feature) => (
            <Feature key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

const Feature = ({
  title,
  items,
  icon: Icon,
}: {
  title: string;
  items: string[];
  icon: React.ComponentType<{ className?: string }>;
}) => {
  return (
    <div className="flex flex-col py-10 relative group/feature bg-black border border-white/10 rounded-xl hover:border-white/20 transition-all duration-300 hover:bg-white/5">
      <div className="opacity-0 group-hover/feature:opacity-100 transition duration-300 absolute inset-0 h-full w-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-xl" />

      <div className="mb-6 relative z-10 px-8 text-[#3B82F6]">
        <Icon className="w-6 h-6" />
      </div>

      <div className="text-xl font-bold mb-6 relative z-10 px-8">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-[#3B82F6] transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-white group-hover/feature:text-[#3B82F6]">
          {title}
        </span>
      </div>

      <div className="space-y-3 relative z-10 px-8">
        {items.map((item, itemIndex) => (
          <div key={itemIndex} className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#3B82F6] mt-2" />
            <p className="text-sm text-secondary-foreground leading-relaxed">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
