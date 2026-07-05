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
          title="Ready to make your team more AI-native?"
          subTitle="Let's figure out your AI roadmap — book a call or send me an email."
        />

        <CTAPair
          className="mt-8"
          primaryTitle="Book a call"
          secondaryTitle="Email me"
          primaryOnClick={() =>
            (window.location.href = "mailto:kevin@tempor.ai")
          }
          secondaryOnClick={() =>
            (window.location.href = "mailto:kevin@tempor.ai")
          }
        />

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-xs text-secondary-foreground text-center">
            © 2025 Temporai Solutions
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
