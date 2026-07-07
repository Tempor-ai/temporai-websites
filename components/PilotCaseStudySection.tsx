"use client";

import { motion } from "motion/react";
import { Target } from "lucide-react";
import SectionHeading from "./shared/SectionHeading";

const caseStudies = [
  {
    name: "DR HIRO",
    tag: "DeFi copilot",
    description:
      "A 6-agent AI copilot for DeFi portfolio execution — turning investing intent into continuous, controlled, on-chain action with a full audit trail.",
  },
  {
    name: "0Gora",
    tag: "Verifiable RAG",
    description:
      "A verifiable RAG chatbot — knowledge you (and your AI agents) can actually trust — shipped and live in production.",
  },
  {
    name: "NodeAI",
    tag: "Agent framework",
    description:
      "An agent framework for teams that need to build their own agents, not just use someone else's — with A2A/MCP support out of the box.",
  },
];

export function PilotCaseStudySection() {
  return (
    <motion.section
      id="pilot-case-study"
      className="relative h-full w-full overflow-hidden py-20 scroll-mt-20"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true }}
    >
      <motion.div
        className="absolute right-[-120px] top-[-20%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle_at_center,#4A90C2_20%,transparent_50%)] opacity-10 blur-3xl pointer-events-none z-[-1]"
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
          tag="Proof of Work"
          title="A few things I've built"
          subTitle="Production systems, not slideware."
        />

        <div className="mt-16 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map((project, index) => (
              <motion.div
                key={project.name}
                className="group relative p-8 rounded-xl border border-[#22303F]/10 bg-white/70 shadow-sm hover:border-[#4A90C2]/35 transition-all duration-300 hover:bg-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="opacity-0 group-hover:opacity-100 transition duration-300 absolute inset-0 h-full w-full bg-gradient-to-br from-[#4A90C2]/[0.05] to-transparent pointer-events-none rounded-xl" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-[#4A90C2]/12 flex items-center justify-center mb-6">
                    <Target className="w-6 h-6 text-[#4A90C2]" />
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-[#22303F]">
                      {project.name}
                    </h3>
                    <span className="text-xs font-medium text-[#4A90C2] bg-[#4A90C2]/10 px-3 py-1 rounded-full">
                      {project.tag}
                    </span>
                  </div>

                  <p className="text-sm text-secondary-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
