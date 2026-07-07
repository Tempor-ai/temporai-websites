"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface CTAPairProps {
  primaryTitle?: string;
  secondaryTitle?: string;
  primaryOnClick?: () => void;
  secondaryOnClick?: () => void;
  className?: string;
}

const CTAPair = ({
  primaryTitle = "Get Started",
  secondaryTitle = "Learn More",
  primaryOnClick = () => alert("navigate to temporai form"),
  secondaryOnClick = () => alert("navigate to early access form"),
  className = "",
}: CTAPairProps) => {
  return (
    <div
      className={`flex flex-col sm:flex-row gap-4 items-center justify-center ${className}`}
    >
      {/* Primary CTA Button */}
      <button
        onClick={primaryOnClick}
        className="relative inline-flex h-12 w-full sm:w-60 overflow-hidden rounded-lg p-[1px] focus:outline-none group"
      >
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#6CB2E3_0%,#9984BD_50%,#6CB2E3_100%)]" />
        <span className="relative z-10 inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-gradient-to-r from-[#6CB2E3] to-[#9984BD] px-7 text-sm font-medium text-white gap-2 group-hover:brightness-105 group-hover:scale-[1.02] group-hover:shadow-lg group-hover:shadow-[#6CB2E3]/30 transition-all duration-300">
          {primaryTitle}
          <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-200" />
        </span>
      </button>

      {/* Secondary CTA Button */}
      <button
        onClick={secondaryOnClick}
        className="relative inline-flex h-12 w-full sm:w-60 overflow-hidden rounded-lg focus:outline-none group"
      >
        <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#22303F]/5 via-[#22303F]/[0.03] to-[#22303F]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="relative inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-white/60 px-7 text-sm font-medium text-[#22303F]/90 hover:text-[#22303F] backdrop-blur-3xl border border-[#22303F]/20 hover:border-[#22303F]/35 transition-all duration-300 group-hover:bg-white group-hover:scale-[1.02] group-hover:shadow-lg group-hover:shadow-[#22303F]/10">
          {secondaryTitle}
        </span>
      </button>
    </div>
  );
};

export default CTAPair;
