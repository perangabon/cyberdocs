import type { Metadata, Viewport } from "next";
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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cybervault.dev";

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CyberVault | Cybersecurity Engineering Portfolio",
    template: "%s | CyberVault",
  },
  description:
    "Portfolio & knowledge base for a cybersecurity engineer. Cheat sheets, notes, and tools covering networking, offensive security, and defense.",
  keywords: [
    "cybersecurity",
    "portfolio",
    "cheat sheet",
    "nmap",
    "wireshark",
    "metasploit",
    "pentest",
    "networking",
    "security engineering",
  ],
  authors: [{ name: "CyberVault" }],
  creator: "CyberVault",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "CyberVault",
    title: "CyberVault | Cybersecurity Engineering Portfolio",
    description:
      "Portfolio & knowledge base for a cybersecurity engineer. Cheat sheets, notes, and tools.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "CyberVault | Cybersecurity Engineering Portfolio",
    description:
      "Portfolio & knowledge base for a cybersecurity engineer. Cheat sheets, notes, and tools.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
