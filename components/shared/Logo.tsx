"use client";

import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "nav" | "lg" | "xl" | "2xl";
}

const Logo = ({ className = "", size = "md" }: LogoProps) => {
  const heightClasses = {
    sm: "h-6",
    md: "h-8",
    // The rebuilt logo file is cropped tight to the glyphs (the old file had
    // ~40% empty margin baked in), so the box is smaller for the same
    // visible wordmark size.
    nav: "h-7",
    lg: "h-12",
    xl: "h-16",
    "2xl": "h-28",
  };

  return (
    <div className={`inline-flex items-center ${className}`}>
      <Image
        src="/logo.png"
        alt="Temporai Solutions"
        width={492}
        height={100}
        className={`w-auto ${heightClasses[size]}`}
        priority
      />
    </div>
  );
};

export default Logo;
