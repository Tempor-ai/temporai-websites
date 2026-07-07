"use client";

import { motion, useReducedMotion } from "motion/react";
import AgentSwarm from "./AgentSwarm";
import CTAPair from "./shared/CTAPair";

// Staggered "pop" entrance (blur + scale + rise), matching the 0Gora landing
// page's hero reveal: elements arrive one at a time on this ease curve.
const POP_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const pop = (delay: number) =>
    reduceMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y: 22, scale: 0.97, filter: "blur(6px)" },
          animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
          transition: { duration: 0.75, delay, ease: POP_EASE },
        };

  return (
    <div className="relative h-full min-h-[100vh] overflow-hidden hero-gradient">
      {/* Navbar spacer */}
      <div className="h-16 sm:h-20"></div>
      {/* Wide (but not full-bleed) container: splits the difference between
          the old centered 1200px column and hugging the screen edge. */}
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-20 pb-16 sm:pb-20 pt-8 sm:pt-12 md:pt-16 lg:pt-20">
        <div className="relative min-h-[calc(100vh-8rem)] sm:min-h-[calc(100vh-10rem)] flex items-center w-full">
          {/* Swarm and copy centered against each other via flex + items-center,
              not viewport-percentage math — robust across window sizes. */}
          <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-14 w-full">
            {/* Agent swarm — nudged up and toward the page center so the
                whole cloud sits in view instead of drifting low-right */}
            {/* Graphic-only offsets — transforms never affect the text
                column's layout position. */}
            {/* Plain container: the canvas choreographs its own entrance
                (nodes pop, then edges connect), so no framer wrapper — a
                blur/scale overlay would mask it and its transform would
                skew the canvas's mount-time size measurement. */}
            <div className="relative order-1 md:order-2 md:flex-1 w-full h-[260px] sm:h-[320px] md:h-[440px] md:-translate-x-72 md:-translate-y-56">
              {/* Desktop: canvas box is 2x the layout slot, anchored at its
                  top-left — this reproduces the approved size/position of
                  the cloud (which was originally rendered through a HiDPI
                  2x-overflow quirk). Mobile keeps the contained 1x box. */}
              <div className="relative w-full h-full md:absolute md:top-0 md:left-0 md:w-[200%] md:h-[200%]">
                <AgentSwarm className="absolute inset-0" />
              </div>
            </div>

            {/* Copy + CTAs */}
            <div className="order-2 md:order-1 md:flex-1 text-left md:-translate-y-12">
              <motion.div {...pop(0.05)} className="mb-4 sm:mb-6">
                <span className="text-xs sm:text-sm font-medium tracking-wider uppercase">
                  Temporai Solutions — AI Dev Shop
                </span>
              </motion.div>
              <motion.h1 {...pop(0.25)} className="hero-heading !text-left mb-6 sm:mb-8">
                Become AI‑Native
              </motion.h1>
              <motion.p
                {...pop(0.5)}
                className="max-w-xl text-base sm:text-lg md:text-xl font-normal leading-relaxed tracking-[-0.2px] text-[#5C6470] mb-8 sm:mb-12"
              >
                Unleash your AI potential. You set the goal, I build the
                agents, you ship faster — with a clear plan and a clear
                record.
              </motion.p>
              <motion.div {...pop(0.75)} className="w-full max-w-2xl">
                <CTAPair
                  className="sm:justify-start"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
