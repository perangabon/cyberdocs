import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { getNoteBySlug, getNoteSlugs, extractHeadings } from "@/lib/mdx";
import { renderMDX } from "@/lib/mdx-renderer";
import { NoteCategoryBadge } from "@/components/notes/note-category-badge";
import { NotePageTransition } from "@/components/notes/note-page-transition";
import { ScrollProgress } from "@/components/scroll-progress";
import { TableOfContents } from "@/components/notes/table-of-contents";
import type { Metadata } from "next";

interface NotePageProps {
  params: Promise<{ slug: string }>;
}

// Generate static pages for all notes
export async function generateStaticParams() {
  return getNoteSlugs().map((slug) => ({ slug }));
}

// Dynamic metadata with OG & Twitter cards
export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) return { title: "Note not found" };

  const { title, description, tags, category, author } = note.frontmatter;

  return {
    title,
    description,
    keywords: tags,
    authors: author ? [{ name: author }] : undefined,
    openGraph: {
      type: "article",
      title: `${title} | CyberVault`,
      description,
      tags,
      section: category,
      url: `/notes/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | CyberVault`,
      description,
    },
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) notFound();

  const { frontmatter, content } = note;
  const headings = extractHeadings(content);
  const mdxContent = await renderMDX(content);

  const formattedDate = new Date(frontmatter.date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Estimate reading time (~200 words/min)
  const wordCount = content.split(/\s+/g).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <NotePageTransition>
      <ScrollProgress />
      <main className="mx-auto min-h-screen max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <Link
          href="/notes"
          className="mb-8 inline-flex items-center gap-2 text-sm text-brand-text-secondary transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Explore Notes
        </Link>

        <div className="relative lg:grid lg:grid-cols-[1fr_250px] lg:gap-12">
          {/* Main content */}
          <article>
            {/* Header */}
            <header className="mb-10 border-b border-brand-border pb-8">
              <NoteCategoryBadge
                category={frontmatter.category}
                className="mb-4"
              />
              <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                {frontmatter.title}
              </h1>
              <p className="mb-6 text-lg leading-relaxed text-brand-text-secondary">
                {frontmatter.description}
              </p>

              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-brand-text-secondary">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formattedDate}
                </span>
                {frontmatter.author && (
                  <span className="flex items-center gap-1.5">
                    <User className="h-4 w-4" />
                    {frontmatter.author}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {readingTime} min de lecture
                </span>
              </div>

              {/* Tags */}
              {frontmatter.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-white/5 px-2.5 py-1 font-mono text-xs text-brand-text-secondary"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* MDX Content */}
            <div className="prose-cybervault">{mdxContent}</div>
          </article>

          {/* Table of Contents (sticky sidebar) */}
          {headings.length > 0 && (
            <aside className="hidden lg:block">
              <TableOfContents headings={headings} />
            </aside>
          )}
        </div>
      </main>
    </NotePageTransition>
  );
}
