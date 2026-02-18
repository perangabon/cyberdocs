import { ShieldCheck, FolderOpen } from "lucide-react";
import {
  getNotesByCategory,
  getTagsByCategory,
  CATEGORY_INFO,
} from "@/lib/mdx";
import { CategoryGrid } from "@/components/notes/category-grid";
import { NotePageTransition } from "@/components/notes/note-page-transition";

const CATEGORY = "defensive" as const;

export default function DefensivePage() {
  const info = CATEGORY_INFO[CATEGORY];
  const notes = getNotesByCategory(CATEGORY);
  const tags = getTagsByCategory(CATEGORY);

  return (
    <NotePageTransition>
      <div className="mb-10">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border text-brand-green border-brand-green/20 bg-brand-green/10">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              {info.title}
            </h1>
            <p className="mt-1 text-sm text-brand-text-secondary">
              {info.description}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-6 border-t border-brand-border pt-4">
          <div className="flex items-center gap-2 text-xs text-brand-text-secondary">
            <FolderOpen className="h-3.5 w-3.5" />
            <span>
              {notes.length} note{notes.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-brand-text-secondary">
            <span className="h-1 w-1 rounded-full bg-brand-text-secondary" />
            <span>
              {tags.length} tag{tags.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      <CategoryGrid notes={notes} tags={tags} category={CATEGORY} />

      {notes.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-brand-text-secondary">
          <FolderOpen className="mb-4 h-12 w-12 opacity-30" />
          <p className="text-sm">
            Aucune note dans cette catégorie pour le moment.
          </p>
        </div>
      )}
    </NotePageTransition>
  );
}
