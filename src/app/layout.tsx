import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BackgroundGrid } from "@/components/background-grid";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CyberVault | Cybersecurity Engineering Portfolio",
  description:
    "Portfolio & knowledge base for a cybersecurity engineer. Cheat sheets, notes, and tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-black text-white`}
      >
        <BackgroundGrid />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
