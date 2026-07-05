"use client";

import React, { useState } from "react";
import Logo from "./shared/Logo";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/20">
      <div className="page-container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="#"
              className="hover:opacity-80 transition-opacity duration-200"
            >
              <Logo size="sm" variant="gradient" />
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-10">
            <a
              href="#features"
              className="text-white/90 hover:text-white transition-all duration-200 font-medium text-sm tracking-wide hover:scale-105"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-white/90 hover:text-white transition-all duration-200 font-medium text-sm tracking-wide hover:scale-105"
            >
              How it Works
            </a>
            <a
              href="#product-spotlight"
              className="text-white/90 hover:text-white transition-all duration-200 font-medium text-sm tracking-wide hover:scale-105"
            >
              Product
            </a>
            <a
              href="#pilot-case-study"
              className="text-white/90 hover:text-white transition-all duration-200 font-medium text-sm tracking-wide hover:scale-105"
            >
              Pilot
            </a>
            <a
              href="#milestones"
              className="text-white/90 hover:text-white transition-all duration-200 font-medium text-sm tracking-wide hover:scale-105"
            >
              Roadmap
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white/90 hover:text-white transition-colors duration-200 p-2"
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
          <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/20">
            <div className="px-4 py-6 space-y-4">
              <a
                href="#features"
                onClick={closeMobileMenu}
                className="block text-white/90 hover:text-white transition-colors duration-200 font-medium text-base py-2"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                onClick={closeMobileMenu}
                className="block text-white/90 hover:text-white transition-colors duration-200 font-medium text-base py-2"
              >
                How it Works
              </a>
              <a
                href="#product-spotlight"
                onClick={closeMobileMenu}
                className="block text-white/90 hover:text-white transition-colors duration-200 font-medium text-base py-2"
              >
                Product
              </a>
              <a
                href="#pilot-case-study"
                onClick={closeMobileMenu}
                className="block text-white/90 hover:text-white transition-colors duration-200 font-medium text-base py-2"
              >
                Pilot
              </a>
              <a
                href="#milestones"
                onClick={closeMobileMenu}
                className="block text-white/90 hover:text-white transition-colors duration-200 font-medium text-base py-2"
              >
                Roadmap
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
