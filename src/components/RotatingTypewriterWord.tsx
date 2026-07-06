'use client';

import { useState, useEffect, useRef } from 'react';

interface WordConfig {
  text: string;
  colorClass: string;
}

interface RotatingTypewriterWordProps {
  words: WordConfig[];
  typeSpeed?: number;
  deleteSpeed?: number;
  holdDelay?: number;
  pauseBetweenWords?: number;
}

export default function RotatingTypewriterWord({
  words,
  typeSpeed = 50,
  deleteSpeed = 30,
  holdDelay = 1400,
  pauseBetweenWords = 150,
}: RotatingTypewriterWordProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isDeletingRef = useRef(false);
  const currentIndexRef = useRef(0);
  const currentTextRef = useRef('');

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Find the longest word for width reservation
  const longestWord = words.reduce((longest, word) => 
    word.text.length > longest.length ? word.text : longest, 
    ''
  );

  // Handle reduced motion
  useEffect(() => {
    if (prefersReducedMotion && words.length > 0) {
      setDisplayedText(words[words.length - 1].text);
    }
  }, [prefersReducedMotion, words]);

  // Main animation effect - runs once on mount
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (words.length === 0) return;

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Initialize refs
    currentIndexRef.current = 0;
    currentTextRef.current = '';
    isDeletingRef.current = false;

    // Create the animation function
    const animate = () => {
      const currentWord = words[currentIndexRef.current];
      if (!currentWord) return;

      if (isDeletingRef.current) {
        // Deleting phase
        if (currentTextRef.current.length > 0) {
          currentTextRef.current = currentTextRef.current.slice(0, -1);
          setDisplayedText(currentTextRef.current);
          timeoutRef.current = setTimeout(animate, deleteSpeed);
        } else {
          // Finished deleting, move to next word
          isDeletingRef.current = false;
          timeoutRef.current = setTimeout(() => {
            currentIndexRef.current = (currentIndexRef.current + 1) % words.length;
            setCurrentWordIndex(currentIndexRef.current);
            const nextWord = words[currentIndexRef.current];
            if (nextWord) {
              currentTextRef.current = nextWord.text[0] || '';
              setDisplayedText(currentTextRef.current);
              timeoutRef.current = setTimeout(animate, typeSpeed);
            }
          }, pauseBetweenWords);
        }
      } else {
        // Typing phase
        if (currentTextRef.current.length < currentWord.text.length) {
          currentTextRef.current = currentWord.text.slice(0, currentTextRef.current.length + 1);
          setDisplayedText(currentTextRef.current);
          timeoutRef.current = setTimeout(animate, typeSpeed);
        } else {
          // Finished typing, hold then start deleting
          timeoutRef.current = setTimeout(() => {
            isDeletingRef.current = true;
            animate();
          }, holdDelay);
        }
      }
    };

    // Start animation after initial delay
    timeoutRef.current = setTimeout(() => {
      const firstWord = words[0];
      if (firstWord) {
        currentTextRef.current = firstWord.text[0] || '';
        setDisplayedText(currentTextRef.current);
        timeoutRef.current = setTimeout(animate, typeSpeed);
      }
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [words, typeSpeed, deleteSpeed, holdDelay, pauseBetweenWords, prefersReducedMotion]);

  const currentWord = words[currentWordIndex];
  const currentColorClass = currentWord?.colorClass || 'text-white';

  return (
    <span className="inline-block relative min-w-[1ch]">
      {/* Invisible span to reserve width for longest word */}
      <span 
        className="invisible absolute whitespace-nowrap pointer-events-none"
        aria-hidden="true"
      >
        {longestWord}
      </span>
      
      {/* Visible rotating word */}
      <span className={`${currentColorClass} whitespace-nowrap inline-block`}>
        {displayedText}
        {/* Cursor */}
        {!prefersReducedMotion && (
          <span 
            className={`${currentColorClass} inline-block w-[2px] h-[0.9em] ml-1 align-middle`}
            style={{ 
              animation: 'blink 1s step-end infinite'
            }}
            aria-hidden="true"
          >
            |
          </span>
        )}
      </span>
    </span>
  );
}
