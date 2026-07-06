"use client";

import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const Logo = ({ className = "", size = "md" }: LogoProps) => {
  const heightClasses = {
    sm: "h-6",
    md: "h-8",
    lg: "h-12",
  };

  return (
    <div
      className={`inline-flex items-center rounded-md bg-white px-2 py-1 ${className}`}
    >
      <Image
        src="/logo.jpg"
        alt="Temporai Solutions"
        width={300}
        height={100}
        className={`w-auto ${heightClasses[size]}`}
        priority
      />
    </div>
  );
};

export default Logo;
