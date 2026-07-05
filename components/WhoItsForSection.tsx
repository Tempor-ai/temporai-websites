"use client";

import { motion } from "motion/react";
import { Zap, Building2, Landmark } from "lucide-react";
import SectionHeading from "./shared/SectionHeading";

const userGroups = [
  {
    title: "Web3 & crypto companies",
    subtitle: "Technical teams",
    description:
      "Your protocol is technical. Your ops don't have to be manual — agents for trading, DeFi, and protocol operations.",
    icon: Zap,
  },
  {
    title: "Traditional companies",
    subtitle: "Not AI-native yet",
    description:
      "AI-native isn't just for tech companies — practical automation and workflow AI without needing a research team.",
    icon: Building2,
  },
  {
    title: "DC & policy-adjacent orgs",
    subtitle: "Credibility-first",
    description:
      "Serious problems need credible AI partners — measured engagement, clear scoping, security-conscious delivery.",
    icon: Landmark,
  },
];

export function WhoItsForSection() {
  return (
    <motion.section
      id="who-its-for"
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
          tag="WHO IT'S FOR"
          title="Who it's for"
          subTitle="Designed for web3 teams and traditional companies alike."
        />

        <div className="mt-16 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {userGroups.map((group, index) => (
              <motion.div
                key={group.title}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-black border border-white/10 rounded-xl p-8 hover:border-white/20 transition-all duration-300 hover:bg-white/5 group-hover:scale-[1.01]">
                  <div className="opacity-0 group-hover:opacity-100 transition duration-300 absolute inset-0 h-full w-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-xl" />

                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-300">
                      <group.icon className="w-8 h-8 text-[#3B82F6]" />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#3B82F6] transition-colors duration-300">
                      {group.title}
                    </h3>

                    <div className="text-sm font-medium text-[#3B82F6] bg-[#3B82F6]/10 px-3 py-1 rounded-full inline-block mb-4">
                      {group.subtitle}
                    </div>

                    <p className="text-sm text-secondary-foreground leading-relaxed">
                      {group.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
