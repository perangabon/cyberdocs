"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Folder } from "lucide-react";
import { CategoryGridCard } from "./category-grid-card";
import { CategoryFilterBar } from "./category-filter-bar";
import type { NoteMetadata, NoteCategory } from "@/lib/mdx";

interface CategoryGridProps {
  notes: NoteMetadata[];
  tags: string[];
  category: NoteCategory;
}

export function CategoryGrid({ notes, tags, category }: CategoryGridProps) {
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const filteredNotes = useMemo(() => {
    if (activeTags.length === 0) return notes;
    return notes.filter((note) =>
      activeTags.every((tag) => note.tags.includes(tag)),
    );
  }, [notes, activeTags]);

  function handleToggleTag(tag: string) {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  function handleClear() {
    setActiveTags([]);
  }

  return (
    <>
      {tags.length > 0 && (
        <CategoryFilterBar
          tags={tags}
          activeTags={activeTags}
          onToggleTag={handleToggleTag}
          onClear={handleClear}
          category={category}
        />
      )}

      {/* Results count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6 flex items-center gap-2 text-sm text-brand-text-secondary"
      >
        <span>
          {filteredNotes.length} note{filteredNotes.length !== 1 ? "s" : ""}
          {activeTags.length > 0 && (
            <span className="ml-1 text-xs opacity-60">
              (filtré{filteredNotes.length !== 1 ? "es" : ""})
            </span>
          )}
        </span>
      </motion.div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredNotes.map((note, i) => (
            <CategoryGridCard key={note.slug} note={note} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      {filteredNotes.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24 text-brand-text-secondary"
        >
          <Folder className="mb-4 h-12 w-12 opacity-30" />
          <p className="text-sm">Aucune note ne correspond à ces filtres.</p>
          <button
            onClick={handleClear}
            className="mt-3 text-xs text-brand-blue transition-colors hover:text-white"
          >
            Réinitialiser les filtres
          </button>
        </motion.div>
      )}
    </>
  );
}
