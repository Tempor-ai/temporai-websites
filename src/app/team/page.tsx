'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type Tier = 'founder' | 'officer' | 'advisor' | 'tester';

interface TeamMember {
  name: string;
  initials: string;
  role: string;
  location: string;
  duties: string;
  tier: Tier;
}

const TIER_COLORS: Record<Tier, { border: string; bg: string; text: string }> = {
  founder: {
    border: 'border-l-tem-accent',
    bg: 'bg-tem-accent/20',
    text: 'text-tem-accent',
  },
  officer: {
    border: 'border-l-tem-accent-soft',
    bg: 'bg-tem-accent-soft/20',
    text: 'text-tem-accent-soft',
  },
  advisor: {
    border: 'border-l-tem-accent-deep',
    bg: 'bg-tem-accent-deep/20',
    text: 'text-tem-accent-deep',
  },
  tester: {
    border: 'border-l-tem-neutral-muted',
    bg: 'bg-tem-neutral-muted/20',
    text: 'text-tem-neutral-muted',
  },
};

const TEAM: TeamMember[] = [
  {
    name: 'Chen Kevin',
    initials: 'CK',
    role: 'Founder, CEO',
    location: 'Washington, DC',
    duties: 'Lead Tempora Labs',
    tier: 'founder',
  },
  {
    name: 'Lee CJ',
    initials: 'LC',
    role: 'Co-Founder, Chief Agent Officer',
    location: 'San Francisco, CA',
    duties: 'Develops the internal Agentic framework NodeAI',
    tier: 'founder',
  },
  {
    name: 'Kuznetsov Vladislav',
    initials: 'KV',
    role: 'Technology Officer',
    location: 'Phuket, Thailand',
    duties: 'Infrastructure — AWS, 0G, Aethir GPU compute',
    tier: 'officer',
  },
  {
    name: 'Faraja Ombeni',
    initials: 'FO',
    role: 'Agent Officer',
    location: 'Nairobi, Kenya',
    duties: 'Software engineering & agent development',
    tier: 'officer',
  },
  {
    name: 'Myles Johnson',
    initials: 'MJ',
    role: 'Agent Officer',
    location: 'Nairobi, Kenya',
    duties: 'Software engineering & agent development',
    tier: 'officer',
  },
  {
    name: 'Perednik Shai',
    initials: 'PS',
    role: 'Blockchain Advisor',
    location: 'Tel Aviv, Israel',
    duties: 'Reviews code for blockchain best practices',
    tier: 'advisor',
  },
  {
    name: 'Rodriguez Kenji',
    initials: 'RK',
    role: 'Lead Tester',
    location: 'Brazzaville, Congo',
    duties: 'Tests agent DR HIRO',
    tier: 'tester',
  },
];

export default function TeamPage() {
  return (
    <main className="bg-tem-dark-1 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-r from-tem-accent/15 via-tem-accent-soft/10 to-tem-accent-deep/20 blur-3xl rounded-full opacity-50 pointer-events-none" />

        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-sm font-mono tracking-widest uppercase text-tem-accent">
            Our Team
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            <span className="bg-tem-accent-gradient bg-clip-text text-transparent">
              The people behind Tempora
            </span>
          </h1>
          <p className="text-tem-neutral-muted text-base sm:text-lg max-w-[600px] mx-auto leading-relaxed">
            A globally distributed team building autonomous agentic infrastructure for DeFi.
          </p>
        </motion.div>
      </section>

      {/* Card Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM.map((member, index) => {
            const colors = TIER_COLORS[member.tier];
            return (
              <motion.div
                key={member.name}
                className={`bg-tem-dark-2 rounded-2xl border border-tem-dark-3 border-l-4 ${colors.border} p-6 flex items-start gap-4 transition-shadow duration-200${index === TEAM.length - 1 ? ' lg:col-start-2' : ''}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 0 30px rgba(19,199,196,0.3)',
                }}
              >
                {/* Initials circle */}
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm ${colors.bg} ${colors.text} border ${colors.border.replace('border-l-', 'border-')}`}
                >
                  {member.initials}
                </div>

                {/* Info */}
                <div className="min-w-0">
                  <h3 className="text-white font-semibold text-base leading-snug">
                    {member.name}
                  </h3>
                  <p className="text-tem-accent text-sm mt-0.5">{member.role}</p>
                  <p className="text-tem-neutral-muted text-xs font-mono mt-2 flex items-center gap-1">
                    <svg
                      className="w-3 h-3 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>
                    {member.location}
                  </p>
                  <p className="text-tem-neutral-muted text-xs mt-1">{member.duties}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}
