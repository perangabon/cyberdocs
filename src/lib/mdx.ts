import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Directory where MDX content files are stored
const CONTENT_DIR = path.join(process.cwd(), "content");

export interface NoteFrontmatter {
  title: string;
  description: string;
  category: "networking" | "offensive" | "defensive" | "general";
  tags: string[];
  date: string;
  author?: string;
}

export interface NoteMetadata extends NoteFrontmatter {
  slug: string;
}

export interface NoteData {
  frontmatter: NoteFrontmatter;
  content: string;
  slug: string;
}

/**
 * Get all note slugs from the content directory
 */
export function getNoteSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/**
 * Get metadata for all notes (for listing pages)
 */
export function getAllNotes(): NoteMetadata[] {
  const slugs = getNoteSlugs();
  const notes = slugs.map((slug) => {
    const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);
    return {
      ...(data as NoteFrontmatter),
      slug,
    };
  });

  // Sort by date descending
  return notes.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Get a single note by slug (frontmatter + raw MDX content)
 */
export function getNoteBySlug(slug: string): NoteData | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    frontmatter: data as NoteFrontmatter,
    content,
    slug,
  };
}

/**
 * Extract headings from MDX content for Table of Contents
 */
export function extractHeadings(
  content: string
): { text: string; slug: string; level: number }[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const headings: { text: string; slug: string; level: number }[] = [];

  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const slug = text
      .toLowerCase()
      .replace(/[^a-z0-9àâäéèêëïîôùûüÿçœæ\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    headings.push({ text, slug, level });
  }

  return headings;
}
