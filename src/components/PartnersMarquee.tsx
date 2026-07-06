'use client';

import { motion, type Variants } from 'framer-motion';

const partnersRow1 = [
  { name: 'Circle Alliance Program', src: '/logos/circle-logo.png', href: 'https://www.circle.com/alliance-program' },
  { name: '0G', src: '/logos/0g-purple.png', href: 'https://0g.ai' },
  // { name: 'NEAR Intents', src: '/logos/nest-intents.png', href: 'https://near.org/intents' },
  { name: 'Khalani Network', src: '/logos/khalani.png', href: 'https://khalani.network' },
  { name: 'Vishwa', src: '/logos/vishwa.png', href: 'https://vishwanetwork.xyz' },
  { name: 'Kite AI', src: '/logos/kite.png', href: 'https://gokite.ai' },
  { name: 'Chaoschain', src: '/logos/chaoschain.png', href: 'https://chaoscha.in' },
];

const partnersRow2 = [
  { name: 'Alchemy', src: '/logos/alchemy.png', href: 'https://alchemy.com' },
  { name: 'Cambrian Network', src: '/logos/cambrian.png', href: 'https://cambrian.org' },
  { name: 'Origin Protocol', src: '/logos/origin.png', href: 'https://originprotocol.com' },
  { name: 'Hashgraph Online', src: '/logos/hol.png', href: 'https://hol.org' },
  { name: 'Epoch Protocol', src: '/logos/epoch.png', href: 'https://epochprotocol.xyz' },
  { name: 'OyaChat', src: '/logos/oyachat.png', href: 'https://oyachat.com/' },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function PartnersMarquee() {
  return (
    <section
      className="relative w-full py-12 md:py-16 bg-gradient-to-b from-tem-cream-50 via-tem-cream-100 to-tem-grey-50 border-t border-slate-200/60"
      aria-label="Trusted partners"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <h3 className="text-sm md:text-base font-semibold text-tem-dark-1 tracking-wide uppercase">
            Our Trusted Partners
          </h3>
        </motion.div>

        <div className="flex flex-col gap-8 md:gap-10">
          {[partnersRow1, partnersRow2].map((row, rowIndex) => (
            <motion.div
              key={rowIndex}
              className="flex items-center justify-center gap-8 md:gap-16"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {row.map((partner) => (
                <motion.a
                  key={partner.name}
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center justify-center h-[120px] md:h-[160px] group"
                  variants={itemVariants}
                >
                  <img
                    src={partner.src}
                    alt={partner.name}
                    className="h-[96px] md:h-32 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-200"
                  />
                  <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold text-tem-dark-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    {partner.name}
                  </span>
                </motion.a>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
