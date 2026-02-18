"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Shield, Github, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { CommandCenter } from "@/components/command-center";

/** Generates breadcrumb segments from the current pathname */
function getBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs: { label: string; href: string }[] = [];

  const labelMap: Record<string, string> = {
    dashboard: "Accueil",
    network: "Réseau",
    offensive: "Offensif",
    defensive: "Défensif",
    tools: "Outils",
  };

  let currentPath = "";
  for (const segment of segments) {
    currentPath += `/${segment}`;
    breadcrumbs.push({
      label: labelMap[segment] || segment,
      href: currentPath,
    });
  }

  return breadcrumbs;
}

interface NavbarProps {
  sidebarCollapsed?: boolean;
  onMobileMenuToggle?: () => void;
}

export function Navbar({ sidebarCollapsed, onMobileMenuToggle }: NavbarProps) {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 flex h-14 items-center border-b border-brand-border transition-all duration-300",
        // Glassmorphism
        "bg-black/60 backdrop-blur-xl supports-[backdrop-filter]:bg-black/40",
        // Offset for sidebar
        sidebarCollapsed ? "left-16" : "left-0 md:left-56",
      )}
    >
      <div className="flex w-full items-center justify-between px-4 md:px-6">
        {/* Left: Mobile burger + Logo */}
        <div className="flex items-center gap-3">
          {/* Mobile burger */}
          <button
            onClick={onMobileMenuToggle}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-brand-border text-brand-text-secondary transition-colors hover:text-white md:hidden"
            aria-label="Toggle menu"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Logo (visible on mobile or when sidebar is collapsed) */}
          <Link
            href="/"
            className="flex items-center gap-2 text-brand-blue transition-opacity hover:opacity-80 md:hidden"
          >
            <Shield className="h-5 w-5" />
          </Link>

          {/* Breadcrumbs — center on desktop */}
          <nav
            className="hidden items-center gap-1 text-sm md:flex"
            aria-label="Breadcrumb"
          >
            {breadcrumbs.map((crumb, i) => (
              <div key={crumb.href} className="flex items-center gap-1">
                {i > 0 && (
                  <ChevronRight className="h-3 w-3 text-brand-text-secondary/50" />
                )}
                {i === breadcrumbs.length - 1 ? (
                  <span className="text-white font-medium">{crumb.label}</span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="text-brand-text-secondary transition-colors hover:text-white"
                  >
                    {crumb.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Right: Command Center + Social links */}
        <div className="flex items-center gap-2">
          <CommandCenter />
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-brand-border text-brand-text-secondary transition-colors hover:border-brand-blue/40 hover:text-white"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </motion.a>
        </div>
      </div>
    </header>
  );
}
