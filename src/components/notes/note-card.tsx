"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NoteMetadata } from "@/lib/mdx";
import { categoryConfig } from "./note-category-badge";

interface NoteCardProps {
  note: NoteMetadata;
}

export function NoteCard({ note }: NoteCardProps) {
  const config = categoryConfig[note.category];
  const formattedDate = new Date(note.date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/notes/${note.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-lg border border-brand-border bg-[#050505] p-5 transition-all duration-300 hover:border-white/10 hover:bg-[#080808]">
          {/* Category indicator line */}
          <div
            className={cn(
              "absolute left-0 top-0 h-full w-0.5",
              config.bg.replace("/10", "/40")
            )}
          />

          {/* Category badge */}
          <span
            className={cn(
              "mb-3 inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium",
              config.color,
              config.bg,
              config.border
            )}
          >
            {config.label}
          </span>

          {/* Title */}
          <h3 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-brand-blue">
            {note.title}
          </h3>

          {/* Description */}
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-brand-text-secondary">
            {note.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-brand-text-secondary">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formattedDate}
              </span>
              {note.tags.length > 0 && (
                <span className="flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  {note.tags.length} tags
                </span>
              )}
            </div>
            <ArrowRight className="h-4 w-4 text-brand-text-secondary transition-all group-hover:translate-x-1 group-hover:text-brand-blue" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
