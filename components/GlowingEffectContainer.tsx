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
      <div className="page-container ">
        <SectionHeading
          tag="What you get"
          title="What you get"
          subTitle="An AI partner that plans, explains, and ships under guardrails."
        />
        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2 ">
          <GridItem
            area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
            icon={<MessageSquare className="h-4 w-4 text-[#4A90C2]" />}
            title="Discovery conversation"
            description='Tell me your goal in plain English: "cut our support backlog by half" or "ship an internal research agent."'
          />

          <GridItem
            area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
            icon={<Bot className="h-4 w-4 text-[#4A90C2]" />}
            title="Build &amp; handoff"
            description="Plan → confirm → build. You get working software and a clear handoff, not just a slide deck."
          />

          <GridItem
            area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
            icon={<Target className="h-4 w-4 text-[#4A90C2]" />}
            title="Outcome‑based engagements"
            description="Set the outcome and constraints—no per‑task micromanagement."
          />

          <GridItem
            area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
            icon={<Eye className="h-4 w-4 text-[#4A90C2]" />}
            title="Explainability"
            description="Clear rationale and alternatives; every decision documented and reviewable."
          />

          <GridItem
            area="md:[grid-area:3/1/4/7] xl:[grid-area:2/8/3/10]"
            icon={<Share className="h-4 w-4 text-[#4A90C2]" />}
            title="Works across your stack"
            description="Integrates with the tools and teams you already have."
          />

          <GridItem
            area="md:[grid-area:3/7/4/13] xl:[grid-area:2/10/3/13]"
            icon={<Layers className="h-4 w-4 text-[#4A90C2]" />}
            title="Built to expand"
            description="Start with one automation; extend into a full agent platform as you grow."
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
    <li className={`min-h-[14rem] list-none bg-white/70 shadow-sm ${area}`}>
      <div className="relative h-full rounded-2xl border border-[#22303F]/10 p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-[#22303F]/15 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-[#22303F] md:text-2xl/[1.875rem]">
                {title}
              </h3>
              <h2 className="font-sans text-sm/[1.125rem] text-secondary-foreground md:text-base/[1.375rem] [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
