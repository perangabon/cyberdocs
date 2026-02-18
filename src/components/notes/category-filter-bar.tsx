"use client";

import { motion } from "framer-motion";
import { Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NoteCategory } from "@/lib/mdx";

const CATEGORY_FILTER_STYLE: Record<
  NoteCategory,
  { active: string; ring: string }
> = {
  networking: {
    active: "bg-brand-blue/20 text-brand-blue border-brand-blue/40",
    ring: "ring-brand-blue/30",
  },
  offensive: {
    active: "bg-brand-red/20 text-brand-red border-brand-red/40",
    ring: "ring-brand-red/30",
  },
  defensive: {
    active: "bg-brand-green/20 text-brand-green border-brand-green/40",
    ring: "ring-brand-green/30",
  },
  general: {
    active: "bg-zinc-500/20 text-zinc-300 border-zinc-500/40",
    ring: "ring-zinc-500/30",
  },
};

interface CategoryFilterBarProps {
  tags: string[];
  activeTags: string[];
  onToggleTag: (tag: string) => void;
  onClear: () => void;
  category: NoteCategory;
}

export function CategoryFilterBar({
  tags,
  activeTags,
  onToggleTag,
  onClear,
  category,
}: CategoryFilterBarProps) {
  const style = CATEGORY_FILTER_STYLE[category];

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="mb-8"
    >
      <div className="flex items-center gap-3 mb-3">
        <Filter className="h-4 w-4 text-brand-text-secondary" />
        <span className="text-xs font-medium uppercase tracking-wider text-brand-text-secondary">
          Filter by tag
        </span>
        {activeTags.length > 0 && (
          <button
            onClick={onClear}
            className="ml-auto flex items-center gap-1 rounded-md border border-brand-border bg-[#0A0A0A] px-2.5 py-1 text-xs text-brand-text-secondary transition-colors hover:border-white/20 hover:text-white"
          >
            <X className="h-3 w-3" />
            Clear ({activeTags.length})
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isActive = activeTags.includes(tag);
          return (
            <motion.button
              key={tag}
              layout
              whileTap={{ scale: 0.95 }}
              onClick={() => onToggleTag(tag)}
              className={cn(
                "rounded-md border px-3 py-1.5 text-xs font-medium transition-all duration-200",
                isActive
                  ? cn(style.active, "ring-1", style.ring)
                  : "border-brand-border bg-[#050505] text-brand-text-secondary hover:border-white/20 hover:text-white",
              )}
            >
              #{tag}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
