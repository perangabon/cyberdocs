"use client";

import { motion } from "framer-motion";
import { Wifi, Swords, ShieldCheck, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BentoCard } from "../bento-card";

const categories = [
  {
    label: "Réseau",
    icon: Wifi,
    color: "text-brand-blue",
    borderColor: "hover:border-brand-blue/40",
    href: "/dashboard/network",
  },
  {
    label: "Offensif",
    icon: Swords,
    color: "text-brand-red",
    borderColor: "hover:border-brand-red/40",
    href: "/dashboard/offensive",
  },
  {
    label: "Défensif",
    icon: ShieldCheck,
    color: "text-brand-green",
    borderColor: "hover:border-brand-green/40",
    href: "/dashboard/defensive",
  },
];

export function QuickAccessBlock() {
  return (
    <BentoCard className="col-span-1 md:col-span-2">
      <h3 className="mb-4 text-sm font-medium text-brand-text-secondary">
        Quick Access
      </h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * i }}
          >
            <Link
              href={cat.href}
              className={`group/link flex items-center justify-between rounded-md border border-brand-border bg-black/50 px-4 py-3 transition-all duration-300 ${cat.borderColor}`}
            >
              <div className="flex items-center gap-3">
                <cat.icon className={`h-4 w-4 ${cat.color}`} />
                <span className="text-sm font-medium text-brand-text">
                  {cat.label}
                </span>
              </div>
              <ArrowUpRight className="h-3.5 w-3.5 text-brand-text-secondary transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </Link>
          </motion.div>
        ))}
      </div>
    </BentoCard>
  );
}
