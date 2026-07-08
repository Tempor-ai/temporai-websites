"use client";

import React, { useEffect, useState } from "react";
import Logo from "./shared/Logo";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Past the hero (the "What you get" section onward, light background),
  // the bar swaps its pastel gradient for white — and back on scroll-up.
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 hero-gradient backdrop-blur-xl border-b border-[#22303F]/10 shadow-sm">
      {/* Gradients can't be CSS-transitioned, so the scrolled state fades a
          white sheet in over the gradient instead — quick, and reversible. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-white/95 transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Full-width container (no max-w centering) so the logo hugs the left
          edge with a small fixed gap on any monitor width. */}
      <div className="relative px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="#"
              className="hover:opacity-80 transition-opacity duration-200"
            >
              {/* stretch is baked into the logo file now (V7: +12%) */}
              <Logo size="nav" />
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-10">
            <a
              href="#features"
              className="text-[#22303F]/80 hover:text-[#22303F] transition-all duration-200 font-medium text-sm hover:scale-105"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-[#22303F]/80 hover:text-[#22303F] transition-all duration-200 font-medium text-sm hover:scale-105"
            >
              How it Works
            </a>
            <a
              href="#product-spotlight"
              className="text-[#22303F]/80 hover:text-[#22303F] transition-all duration-200 font-medium text-sm hover:scale-105"
            >
              Approach
            </a>
            <a
              href="#pilot-case-study"
              className="text-[#22303F]/80 hover:text-[#22303F] transition-all duration-200 font-medium text-sm hover:scale-105"
            >
              Case Studies
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-[#22303F]/80 hover:text-[#22303F] transition-colors duration-200 p-2"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className={`lg:hidden absolute top-full left-0 right-0 backdrop-blur-xl border-b border-[#22303F]/10 ${
              scrolled ? "bg-white/95" : "hero-gradient"
            }`}
          >
            <div className="px-4 py-6 space-y-4">
              <a
                href="#features"
                onClick={closeMobileMenu}
                className="block text-[#22303F]/80 hover:text-[#22303F] transition-colors duration-200 font-medium text-base py-2"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                onClick={closeMobileMenu}
                className="block text-[#22303F]/80 hover:text-[#22303F] transition-colors duration-200 font-medium text-base py-2"
              >
                How it Works
              </a>
              <a
                href="#product-spotlight"
                onClick={closeMobileMenu}
                className="block text-[#22303F]/80 hover:text-[#22303F] transition-colors duration-200 font-medium text-base py-2"
              >
                Approach
              </a>
              <a
                href="#pilot-case-study"
                onClick={closeMobileMenu}
                className="block text-[#22303F]/80 hover:text-[#22303F] transition-colors duration-200 font-medium text-base py-2"
              >
                Case Studies
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
