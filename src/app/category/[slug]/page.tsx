import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Wifi,
  Swords,
  ShieldCheck,
  BookOpen,
  FolderOpen,
} from "lucide-react";
import {
  getNotesByCategory,
  getTagsByCategory,
  CATEGORY_SLUGS,
  CATEGORY_INFO,
  type NoteCategory,
} from "@/lib/mdx";
import { CategoryGrid } from "@/components/notes/category-grid";
import { NotePageTransition } from "@/components/notes/note-page-transition";
import type { Metadata } from "next";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const CATEGORY_ICON_MAP: Record<NoteCategory, typeof Wifi> = {
  networking: Wifi,
  offensive: Swords,
  defensive: ShieldCheck,
  general: BookOpen,
};

const CATEGORY_ACCENT_MAP: Record<NoteCategory, string> = {
  networking: "text-brand-blue border-brand-blue/20 bg-brand-blue/10",
  offensive: "text-brand-red border-brand-red/20 bg-brand-red/10",
  defensive: "text-brand-green border-brand-green/20 bg-brand-green/10",
  general: "text-zinc-400 border-zinc-500/20 bg-zinc-500/10",
};

// Generate static paths for all categories
export async function generateStaticParams() {
  return CATEGORY_SLUGS.map((slug) => ({ slug }));
}

// Dynamic metadata
export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const info = CATEGORY_INFO[slug as NoteCategory];
  if (!info) return { title: "Catégorie introuvable" };

  return {
    title: `${info.title} | CyberVault`,
    description: info.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  // Validate slug
  if (!CATEGORY_SLUGS.includes(slug as NoteCategory)) {
    notFound();
  }

  const category = slug as NoteCategory;
  const info = CATEGORY_INFO[category];
  const notes = getNotesByCategory(category);
  const tags = getTagsByCategory(category);
  const Icon = CATEGORY_ICON_MAP[category];
  const accentClass = CATEGORY_ACCENT_MAP[category];

  return (
    <NotePageTransition>
      <main className="mx-auto min-h-screen max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/notes"
          className="mb-8 inline-flex items-center gap-2 text-sm text-brand-text-secondary transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Notes
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl border ${accentClass}`}
            >
              <Icon className="h-6 w-6" />
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

          {/* Stats bar */}
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

        {/* Grid with filters */}
        <CategoryGrid notes={notes} tags={tags} category={category} />

        {/* Empty state when no notes at all */}
        {notes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-brand-text-secondary">
            <FolderOpen className="mb-4 h-12 w-12 opacity-30" />
            <p className="text-sm">
              Aucune note dans cette catégorie pour le moment.
            </p>
            <Link
              href="/notes"
              className="mt-3 text-xs text-brand-blue transition-colors hover:text-white"
            >
              Voir toutes les notes
            </Link>
          </div>
        )}
      </main>
    </NotePageTransition>
  );
}
