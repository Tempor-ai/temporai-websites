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
      <div className="page-container pb-16 sm:pb-20 pt-8 sm:pt-12 md:pt-16 lg:pt-20">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(76,102,138,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(76,102,138,0.16)_1px,transparent_1px)] opacity-40 [background-size:6rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

        <div className="relative min-h-[calc(100vh-8rem)] sm:min-h-[calc(100vh-10rem)] md:h-[calc(100vh-10rem)] flex flex-col justify-center max-w-6xl mx-auto w-full">
          {/* Agent swarm: centered on the vertical middle of the hero, pinned right.
              Mobile: sits inline above the copy instead (no room for an overlay).
              Needs the parent's height to be definite (h-, not min-h-) for
              top-1/2 to resolve against the hero's own box, not its content.
              The centering transform lives on this plain wrapper, not the
              motion.div below — framer-motion writes its own inline
              `transform` for the entrance animation, which would otherwise
              clobber the CSS translateY(-50%) centering on the same node. */}
          <div className="relative h-[260px] sm:h-[320px] mb-8 md:mb-0 md:absolute md:h-[440px] md:w-[44%] md:max-w-xl md:right-0 md:top-1/2 md:-translate-y-1/2">
            <motion.div {...pop(0.3)} className="absolute inset-0">
              <AgentSwarm className="absolute inset-0" />
            </motion.div>
          </div>

          {/* Copy + CTAs — reserves the right side for the swarm on desktop */}
          <div className="text-left md:max-w-[54%]">
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
              className="max-w-xl text-base sm:text-lg md:text-xl font-normal leading-relaxed tracking-[-0.2px] text-secondary-foreground mb-8 sm:mb-12"
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
  );
}
