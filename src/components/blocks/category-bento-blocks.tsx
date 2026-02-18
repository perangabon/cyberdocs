"use client";

import { motion } from "framer-motion";
import { Wifi, Swords, Shield, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BentoCard } from "../bento-card";
import type { LucideIcon } from "lucide-react";

interface CategoryConfig {
  label: string;
  subtitle: string;
  icon: LucideIcon;
  accentColor: string;
  glowRgb: string;
  borderClass: string;
  href: string;
  noteCount: number;
}

const categories: CategoryConfig[] = [
  {
    label: "Network Infrastructure",
    subtitle: "Protocoles, topologies et surveillance réseau",
    icon: Wifi,
    accentColor: "#00D4FF",
    glowRgb: "0, 212, 255",
    borderClass: "border-[#00D4FF]/20 hover:border-[#00D4FF]/50",
    href: "/dashboard/network",
    noteCount: 12,
  },
  {
    label: "Offensive Operations",
    subtitle: "Pentesting, exploitation et red teaming",
    icon: Swords,
    accentColor: "#FF003C",
    glowRgb: "255, 0, 60",
    borderClass: "border-[#FF003C]/20 hover:border-[#FF003C]/50",
    href: "/dashboard/offensive",
    noteCount: 8,
  },
  {
    label: "Defensive Hardening",
    subtitle: "Blue team, durcissement et détection",
    icon: Shield,
    accentColor: "#00FF41",
    glowRgb: "0, 255, 65",
    borderClass: "border-[#00FF41]/20 hover:border-[#00FF41]/50",
    href: "/dashboard/defensive",
    noteCount: 6,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

function CategoryCard({ category }: { category: CategoryConfig }) {
  return (
    <motion.div variants={cardVariants} className="col-span-1">
      <Link href={category.href} className="block h-full">
        <BentoCard
          className={`h-full transition-all duration-500 ${category.borderClass}`}
          glowColor={category.glowRgb}
        >
          <div className="flex h-full flex-col justify-between gap-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <motion.div
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/5 bg-white/[0.03]"
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <category.icon
                  className="h-5 w-5"
                  style={{ color: category.accentColor }}
                />
              </motion.div>
              <ArrowUpRight className="h-4 w-4 text-brand-text-secondary opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
            </div>

            {/* Content */}
            <div className="space-y-1.5">
              <h3
                className="text-base font-semibold tracking-tight"
                style={{ color: category.accentColor }}
              >
                {category.label}
              </h3>
              <p className="text-sm leading-relaxed text-brand-text-secondary">
                {category.subtitle}
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-2">
              <div
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: category.accentColor }}
              />
              <span className="text-xs text-brand-text-secondary">
                {category.noteCount} notes
              </span>
            </div>
          </div>

          {/* Background glow accent — static subtle */}
          <div
            className="pointer-events-none absolute -bottom-8 -right-8 z-0 h-32 w-32 rounded-full opacity-[0.04] blur-2xl transition-opacity duration-500 group-hover:opacity-[0.10]"
            style={{ backgroundColor: category.accentColor }}
          />
        </BentoCard>
      </Link>
    </motion.div>
  );
}

export function CategoryBentoBlocks() {
  return (
    <motion.div
      className="col-span-1 grid grid-cols-1 gap-6 sm:grid-cols-3 md:col-span-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {categories.map((cat) => (
        <CategoryCard key={cat.label} category={cat} />
      ))}
    </motion.div>
  );
}
