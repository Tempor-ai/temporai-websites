"use client";

import { motion } from "motion/react";
import { Spotlight } from "./shared/Spotlight";
import CTAPair from "./shared/CTAPair";

export default function Hero() {
  return (
    <div className="relative h-full min-h-[100vh] overflow-hidden">
      {/* Navbar spacer */}
      <div className="h-16 sm:h-20"></div>
      <div className="page-container bg-black pb-16 sm:pb-20 pt-8 sm:pt-12 md:pt-16 lg:pt-20">
        <Spotlight className="-top-10 left-0 h-screen w-screen" fill="blue" />

        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(136,136,136,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(136,136,136,0.2)_1px,transparent_1px)] opacity-40 [background-size:6rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

        <div className="relative">
          <section className="flex max-w-7xl size-full flex-col items-center justify-center min-h-[calc(100vh-8rem)] sm:min-h-[calc(100vh-10rem)]">
            <div className="mx-4 w-full max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="text-center mb-4 sm:mb-6"
              >
                <span className="text-xs sm:text-sm font-medium tracking-wider uppercase">
                  Tempor-ai — AI &amp; Agent Consultancy
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="gradient-heading mb-6 sm:mb-8"
              >
                Make your company AI‑native
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
              className="mx-auto max-w-2xl px-4 sm:px-8 text-center text-base sm:text-lg md:text-xl font-normal leading-relaxed tracking-[-0.2px] text-secondary-foreground mb-8 sm:mb-12"
            >
              You set the goal. I build the agents. You ship faster — with a
              clear plan and a clear record.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, ease: "backInOut" }}
              className="w-full max-w-2xl px-4"
            >
              <CTAPair
                primaryTitle="Book a call"
                secondaryTitle="See the work"
                primaryOnClick={() =>
                  (window.location.href = "mailto:kevin@tempor.ai")
                }
                secondaryOnClick={() =>
                  document
                    .getElementById("pilot-case-study")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              />
            </motion.div>
          </section>
        </div>
      </div>
    </div>
  );
}
