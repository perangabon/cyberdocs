"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Wifi,
  Swords,
  ShieldCheck,
  BookOpen,
  Database,
  Terminal,
  Search,
  Bug,
  Globe,
  Lock,
  Eye,
  Server,
  Radio,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { NoteMetadata, NoteCategory } from "@/lib/mdx";

// Map tags / category to a specific Lucide icon
const TAG_ICON_MAP: Record<string, LucideIcon> = {
  nmap: Search,
  scanning: Radio,
  reconnaissance: Eye,
  wireshark: Globe,
  "packet-analysis": Server,
  metasploit: Terminal,
  exploitation: Bug,
  pentest: Swords,
  "red-team": Swords,
  "sql-injection": Database,
  traffic: Globe,
  pcap: Server,
  firewall: Lock,
};

const CATEGORY_ICON: Record<NoteCategory, LucideIcon> = {
  networking: Wifi,
  offensive: Swords,
  defensive: ShieldCheck,
  general: BookOpen,
};

const CATEGORY_ACCENT: Record<NoteCategory, string> = {
  networking:
    "group-hover:border-brand-blue/40 group-hover:shadow-brand-blue/5",
  offensive: "group-hover:border-brand-red/40 group-hover:shadow-brand-red/5",
  defensive:
    "group-hover:border-brand-green/40 group-hover:shadow-brand-green/5",
  general: "group-hover:border-zinc-500/40 group-hover:shadow-zinc-500/5",
};

const CATEGORY_ICON_COLOR: Record<NoteCategory, string> = {
  networking: "text-brand-blue",
  offensive: "text-brand-red",
  defensive: "text-brand-green",
  general: "text-zinc-400",
};

const CATEGORY_BADGE_STYLE: Record<NoteCategory, string> = {
  networking: "bg-brand-blue/10 text-brand-blue border-brand-blue/20",
  offensive: "bg-brand-red/10 text-brand-red border-brand-red/20",
  defensive: "bg-brand-green/10 text-brand-green border-brand-green/20",
  general: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
};

// Infer complexity from tags or frontmatter
function getComplexity(note: NoteMetadata): {
  label: string;
  color: string;
} {
  const complexity = note.complexity;
  if (complexity === "advanced")
    return { label: "Advanced", color: "text-brand-red" };
  if (complexity === "intermediate")
    return { label: "Intermediate", color: "text-yellow-400" };
  if (complexity === "beginner")
    return { label: "Beginner", color: "text-brand-green" };

  // Heuristic: if tags contain "exploitation" or "red-team", advanced
  const advancedTags = ["exploitation", "red-team", "post-exploitation"];
  const intermediateTags = ["pentest", "scanning", "packet-analysis"];
  if (note.tags.some((t) => advancedTags.includes(t)))
    return { label: "Advanced", color: "text-brand-red" };
  if (note.tags.some((t) => intermediateTags.includes(t)))
    return { label: "Intermediate", color: "text-yellow-400" };
  return { label: "Beginner", color: "text-brand-green" };
}

function getToolIcon(note: NoteMetadata): LucideIcon {
  // Check tags first
  for (const tag of note.tags) {
    if (TAG_ICON_MAP[tag]) return TAG_ICON_MAP[tag];
  }
  // Fallback to category icon
  return CATEGORY_ICON[note.category];
}

interface CategoryGridCardProps {
  note: NoteMetadata;
  index: number;
}

export function CategoryGridCard({ note, index }: CategoryGridCardProps) {
  const ToolIcon = getToolIcon(note);
  const complexity = getComplexity(note);
  const iconColor = CATEGORY_ICON_COLOR[note.category];
  const badgeStyle = CATEGORY_BADGE_STYLE[note.category];
  const accentHover = CATEGORY_ACCENT[note.category];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{
        duration: 0.35,
        delay: index * 0.06,
        layout: { type: "spring", stiffness: 350, damping: 30 },
      }}
    >
      <Link href={`/notes/${note.slug}`} className="group block h-full">
        <div
          className={cn(
            "relative flex h-full flex-col overflow-hidden rounded-lg border border-brand-border bg-[#050505] p-5 transition-all duration-300 hover:bg-[#0A0A0A] hover:shadow-lg",
            accentHover,
          )}
        >
          {/* Top: Tool Icon */}
          <div className="mb-4 flex items-center justify-between">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg border border-brand-border bg-black/60 transition-colors group-hover:border-white/10",
                iconColor,
              )}
            >
              <ToolIcon className="h-5 w-5" />
            </div>
            {/* Complexity badge */}
            <span
              className={cn(
                "text-[11px] font-medium uppercase tracking-wider",
                complexity.color,
              )}
            >
              {complexity.label}
            </span>
          </div>

          {/* Center: Title */}
          <h3 className="mb-2 text-base font-semibold leading-snug text-white transition-colors group-hover:text-brand-blue">
            {note.title}
          </h3>

          {/* Hover description reveal */}
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-brand-text-secondary opacity-60 transition-opacity duration-300 group-hover:opacity-100">
            {note.description}
          </p>

          {/* Bottom: Tag badges */}
          <div className="mt-auto flex flex-wrap gap-1.5">
            {note.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className={cn(
                  "inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium",
                  badgeStyle,
                )}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
