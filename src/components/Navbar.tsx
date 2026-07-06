'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled past hero section (approximately 100vh)
      const heroHeight = window.innerHeight;
      setScrolled(window.scrollY > heroHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 h-16 transition-all duration-300 ${
        scrolled
          ? 'bg-tem-dark-1 backdrop-blur-sm shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
        <Link href="/" className="transition-opacity duration-300 hover:opacity-80">
          <Image
            src="/logos/tempora-labs.png"
            alt="Tempora Labs"
            width={800}
            height={160}
            className="h-40 w-auto object-contain"
            style={{ filter: 'hue-rotate(-30deg) saturate(1.3) brightness(1.1)' }}
            priority
          />
        </Link>
        <div className="flex items-center gap-6 md:gap-8">
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#"
              className={`transition-colors text-sm font-medium ${
                scrolled
                  ? 'text-white/80 hover:text-white'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              About
            </a>
            <Link
              href="/team"
              className={`transition-colors text-sm font-medium ${
                scrolled
                  ? 'text-white/80 hover:text-white'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Team
            </Link>
            <a
              href="#"
              className={`transition-colors text-sm font-medium ${
                scrolled
                  ? 'text-white/80 hover:text-white'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Contact
            </a>
            <a 
              href="#" 
              className={`transition-colors text-sm font-medium ${
                scrolled 
                  ? 'text-white/80 hover:text-white' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Terms
            </a>
          </div>
          <a
            href="https://hiro.temporalabs.com/"
            className="px-4 py-2 rounded-lg bg-tem-accent text-tem-dark-1 font-semibold text-sm hover:bg-tem-accent-soft transition-colors"
          >
            APP
          </a>
        </div>
      </div>
    </nav>
  );
}

