"use client";

import SectionHeading from "./shared/SectionHeading";
import CTAPair from "./shared/CTAPair";

const Footer = () => {
  return (
    <footer className="w-full py-20 bg-black">
      <div className="page-container">
        {/* CTA Section */}
        <SectionHeading
          tag=""
          title="Safer DeFi, with explainable AI"
          subTitle="DR HIRO plans, you confirm, NEAR Intents executes—backed by a full audit trail."
        />

        <CTAPair className="mt-8" />

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-xs text-secondary-foreground text-center">
            © 2025 Temporai
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
