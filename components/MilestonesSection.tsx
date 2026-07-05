"use client";

import { motion } from "motion/react";
import { Calendar, Users, DollarSign, Rocket, Building } from "lucide-react";
import SectionHeading from "./shared/SectionHeading";

const milestones = [
  {
    phase: "Alpha",
    period: "Oct–Nov",
    description: "Telegram/Discord mini‑app; targeted users; free",
    icon: Calendar,
    status: "upcoming",
  },
  {
    phase: "Beta",
    period: "Nov–Jan",
    description: "broader sign‑ups; confirm‑flow polish; audit stability",
    icon: Users,
    status: "upcoming",
  },
  {
    phase: "First release",
    period: "Feb–Apr",
    description: "begin monetization; initial revenue/traction",
    icon: DollarSign,
    status: "upcoming",
  },
  {
    phase: "Pilots",
    period: "early 2026",
    description: "expanded cohorts/partners",
    icon: Rocket,
    status: "upcoming",
  },
  {
    phase: "Commercialization",
    period: "Q2 2026",
    description: "broadened channels and paid tiers",
    icon: Building,
    status: "upcoming",
  },
];

export function MilestonesSection() {
  return (
    <motion.section
      id="milestones"
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
          tag="MILESTONES (Investors)"
          title="Milestones (Investors)"
          subTitle="Our roadmap to commercialization and growth."
        />

        <div className="mt-16 max-w-5xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#3B82F6] via-[#60A5FA] to-transparent opacity-40" />

            {/* Milestones */}
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.phase}
                  className="relative flex items-start space-x-6 group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Timeline Dot */}
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                      <milestone.icon className="w-6 h-6 text-[#3B82F6]" />
                    </div>
                  </div>

                  {/* Milestone Content */}
                  <div className="flex-1 min-w-0">
                    <div className="bg-black border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300 hover:bg-white/5 group-hover:scale-[1.01]">
                      <div className="opacity-0 group-hover:opacity-100 transition duration-300 absolute inset-0 h-full w-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-xl" />

                      <div className="relative z-10">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-white group-hover:text-[#3B82F6] transition-colors duration-300">
                            {milestone.phase}
                          </h3>
                          <span className="text-sm font-medium text-[#3B82F6] bg-[#3B82F6]/10 px-3 py-1 rounded-full">
                            {milestone.period}
                          </span>
                        </div>
                        <p className="text-sm text-secondary-foreground leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
