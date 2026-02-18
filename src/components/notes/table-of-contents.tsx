"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { List } from "lucide-react";

interface Heading {
  text: string;
  slug: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeSlug, setActiveSlug] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSlug(entry.target.id);
          }
        }
      },
      {
        rootMargin: "-80px 0px -70% 0px",
        threshold: 0,
      }
    );

    // Observe all heading elements
    for (const heading of headings) {
      const el = document.getElementById(heading.slug);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav className="sticky top-24">
      <div className="rounded-lg border border-brand-border bg-[#050505] p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-brand-text-secondary">
          <List className="h-4 w-4" />
          Table of Contents
        </div>
        <ul className="space-y-1">
          {headings.map((heading) => (
            <li key={heading.slug}>
              <a
                href={`#${heading.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(heading.slug);
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                    setActiveSlug(heading.slug);
                  }
                }}
                className={cn(
                  "block rounded-md px-2 py-1.5 text-sm transition-all duration-200",
                  heading.level === 3 && "pl-5",
                  heading.level === 4 && "pl-8",
                  activeSlug === heading.slug
                    ? "bg-brand-blue/10 text-brand-blue"
                    : "text-brand-text-secondary hover:bg-white/5 hover:text-white"
                )}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
