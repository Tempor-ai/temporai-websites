"use client";

import { motion } from "motion/react";
import { MessageSquare, Bot, Target, Eye, Share, Layers } from "lucide-react";
import { GlowingEffect } from "./shared/GlowingEffect";
import SectionHeading from "./shared/SectionHeading";

export function GlowingEffectContainer() {
  return (
    <motion.section
      id="what-you-get"
      className="relative scroll-mt-20"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1, ease: "backInOut" }}
    >
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(136,136,136,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(136,136,136,0.2)_1px,transparent_1px)] opacity-40 [background-size:6rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,transparent_70%,#000_110%)]
"
      ></div>

      <div className="page-container ">
        <SectionHeading
          tag="What you get"
          title="What you get"
          subTitle="An AI co‑pilot that plans, explains, and executes under guardrails."
        />
        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2 ">
          <GridItem
            area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
            icon={
              <MessageSquare className="h-4 w-4 text-black dark:text-neutral-400" />
            }
            title="Conversational planning"
            description='Tell us your goal in plain English: "75% liquid / 25% vaults; cap per‑protocol at 25%."'
          />

          <GridItem
            area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
            icon={<Bot className="h-4 w-4 text-black dark:text-neutral-400" />}
            title="Co‑pilot execution"
            description="Plan → confirm → 1‑click execution. Optional autonomy under explicit caps."
          />

          <GridItem
            area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
            icon={
              <Target className="h-4 w-4 text-black dark:text-neutral-400" />
            }
            title="Portfolio‑Level Intents (PLI)"
            description="Set portfolio targets and constraints—no per‑swap micromanagement."
          />

          <GridItem
            area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
            icon={<Eye className="h-4 w-4 text-black dark:text-neutral-400" />}
            title="Explainability"
            description="Clear rationale bullets and alternatives; every step logged and replayable."
          />

          <GridItem
            area="md:[grid-area:3/1/4/7] xl:[grid-area:2/8/3/10]"
            icon={
              <Share className="h-4 w-4 text-black dark:text-neutral-400" />
            }
            title="Cross-chain"
            description="Bridge, swap, and allocate across chains."
          />

          <GridItem
            area="md:[grid-area:3/7/4/13] xl:[grid-area:2/10/3/13]"
            icon={
              <Layers className="h-4 w-4 text-black dark:text-neutral-400" />
            }
            title="Built to expand"
            description="Start with stablecoins; extend to RWAs as"
          />
        </ul>
      </div>
    </motion.section>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none bg-black ${area}`}>
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem] dark:text-white">
                {title}
              </h3>
              <h2 className="font-sans text-sm/[1.125rem] text-black md:text-base/[1.375rem] dark:text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
