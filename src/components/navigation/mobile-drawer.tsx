"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Wifi,
  Swords,
  ShieldCheck,
  Wrench,
  X,
  Shield,
} from "lucide-react";
import { useEffect } from "react";

const navItems = [
  {
    label: "Accueil",
    href: "/dashboard",
    icon: Home,
    color: "text-white",
  },
  {
    label: "Réseau",
    href: "/dashboard/network",
    icon: Wifi,
    color: "text-brand-blue",
  },
  {
    label: "Offensif",
    href: "/dashboard/offensive",
    icon: Swords,
    color: "text-brand-red",
  },
  {
    label: "Défensif",
    href: "/dashboard/defensive",
    icon: ShieldCheck,
    color: "text-brand-green",
  },
  {
    label: "Outils",
    href: "/dashboard/tools",
    icon: Wrench,
    color: "text-brand-text-secondary",
  },
];

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const pathname = usePathname();

  // Close drawer on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />

          {/* Drawer panel */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 35 }}
            className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-brand-border bg-black md:hidden"
          >
            {/* Header */}
            <div className="flex h-14 items-center justify-between border-b border-brand-border px-4">
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={onClose}
              >
                <Shield className="h-5 w-5 text-brand-blue" />
                <span className="text-sm font-bold tracking-wider text-brand-blue">
                  CYBERVAULT
                </span>
              </Link>
              <button
                onClick={onClose}
                className="flex h-7 w-7 items-center justify-center rounded-md border border-brand-border text-brand-text-secondary transition-colors hover:text-white"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 space-y-1 px-2 py-4">
              {navItems.map((item, i) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" &&
                    pathname.startsWith(item.href));

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.2 }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200",
                        isActive
                          ? "text-white bg-white/5"
                          : "text-brand-text-secondary hover:text-white hover:bg-white/[0.03]",
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-4 w-4 shrink-0",
                          isActive ? item.color : "text-brand-text-secondary",
                        )}
                      />
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom */}
            <div className="border-t border-brand-border px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-green animate-[pulse-slow_3s_ease-in-out_infinite]" />
                <span className="text-xs text-brand-text-secondary">
                  System Online
                </span>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
