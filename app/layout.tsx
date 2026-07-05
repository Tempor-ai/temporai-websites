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
  title: "Temporai Solutions — AI Dev Shop",
  description:
    "Become AI-native. Unleash your AI potential — independent AI and agent consulting for web3 and traditional companies.",
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
