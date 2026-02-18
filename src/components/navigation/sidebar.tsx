"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Home,
  Wifi,
  Swords,
  ShieldCheck,
  Wrench,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  {
    label: "Accueil",
    href: "/dashboard",
    icon: Home,
    color: "text-white",
    glowColor: "rgba(255, 255, 255, 0.4)",
  },
  {
    label: "Réseau",
    href: "/dashboard/network",
    icon: Wifi,
    color: "text-brand-blue",
    glowColor: "rgba(0, 212, 255, 0.5)",
  },
  {
    label: "Offensif",
    href: "/dashboard/offensive",
    icon: Swords,
    color: "text-brand-red",
    glowColor: "rgba(255, 0, 60, 0.5)",
  },
  {
    label: "Défensif",
    href: "/dashboard/defensive",
    icon: ShieldCheck,
    color: "text-brand-green",
    glowColor: "rgba(0, 255, 65, 0.5)",
  },
  {
    label: "Outils",
    href: "/dashboard/tools",
    icon: Wrench,
    color: "text-brand-text-secondary",
    glowColor: "rgba(161, 161, 170, 0.4)",
  },
];

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-brand-border bg-black transition-all duration-300",
        collapsed ? "w-16" : "w-56",
      )}
    >
      {/* Logo area */}
      <div className="flex h-14 items-center justify-between border-b border-brand-border px-4">
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm font-bold tracking-wider text-brand-blue"
          >
            CYBERVAULT
          </motion.span>
        )}
        <button
          onClick={onToggle}
          className="ml-auto flex h-7 w-7 items-center justify-center rounded-md border border-brand-border text-brand-text-secondary transition-colors hover:border-brand-blue/40 hover:text-white"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "text-white bg-white/5"
                  : "text-brand-text-secondary hover:text-white hover:bg-white/[0.03]",
              )}
            >
              {/* Active indicator — left glow bar */}
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 h-6 w-[2px] -translate-y-1/2 rounded-full"
                  style={{
                    backgroundColor: item.glowColor,
                    boxShadow: `0 0 8px ${item.glowColor}, 0 0 16px ${item.glowColor}`,
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}

              <item.icon
                className={cn(
                  "h-4 w-4 shrink-0 transition-colors duration-200",
                  isActive
                    ? item.color
                    : "text-brand-text-secondary group-hover:text-white",
                )}
              />

              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </motion.span>
              )}

              {/* Tooltip when collapsed */}
              {collapsed && (
                <span className="pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-md border border-brand-border bg-black px-2 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:pointer-events-auto group-hover:opacity-100">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom status */}
      <div className="border-t border-brand-border px-4 py-3">
        {!collapsed ? (
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand-green animate-[pulse-slow_3s_ease-in-out_infinite]" />
            <span className="text-xs text-brand-text-secondary">
              System Online
            </span>
          </div>
        ) : (
          <div className="flex justify-center">
            <span className="h-2 w-2 rounded-full bg-brand-green animate-[pulse-slow_3s_ease-in-out_infinite]" />
          </div>
        )}
      </div>
    </aside>
  );
}
