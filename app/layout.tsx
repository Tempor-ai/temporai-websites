import type { Metadata } from "next";
import { Geist, Geist_Mono as GeistMono, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = GeistMono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Temporai - AI-Powered DeFi Portfolio Management",
  description:
    "Build safer, explainable DeFi portfolios with AI. DR HIRO plans, you confirm, NEAR Intents executes—backed by a full audit trail.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={` ${geistSans.variable}   ${geistMono.variable} ${inter.variable}   select-none  bg-background font-sans text-foreground antialiased max-w-screen overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
