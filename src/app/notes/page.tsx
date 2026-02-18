import Link from "next/link";
import { getAllNotes } from "@/lib/mdx";
import { NoteCategoryBadge } from "@/components/notes/note-category-badge";
import { NoteCard } from "@/components/notes/note-card";
import { FileText, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Notes | CyberVault",
  description: "Cheat sheets, guides et notes techniques en cybersécurité.",
};

export default function NotesPage() {
  const notes = getAllNotes();

  // Group notes by category
  const categories = ["networking", "offensive", "defensive", "general"] as const;
  const grouped = categories
    .map((cat) => ({
      category: cat,
      notes: notes.filter((n) => n.category === cat),
    }))
    .filter((g) => g.notes.length > 0);

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-brand-text-secondary transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-border bg-brand-blue/10">
            <FileText className="h-5 w-5 text-brand-blue" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notes & Cheat Sheets</h1>
            <p className="mt-1 text-brand-text-secondary">
              {notes.length} notes techniques disponibles
            </p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => {
          const count = notes.filter((n) => n.category === cat).length;
          if (count === 0) return null;
          return (
            <NoteCategoryBadge key={cat} category={cat} count={count} />
          );
        })}
      </div>

      {/* Notes Grid */}
      {grouped.map((group) => (
        <section key={group.category} className="mb-12">
          <h2 className="mb-6 text-lg font-semibold capitalize text-white/80">
            {group.category}
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {group.notes.map((note) => (
              <NoteCard key={note.slug} note={note} />
            ))}
          </div>
        </section>
      ))}

      {/* Empty state */}
      {notes.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-brand-text-secondary">
          <FileText className="mb-4 h-12 w-12 opacity-30" />
          <p>Aucune note pour le moment.</p>
        </div>
      )}
    </main>
  );
}
