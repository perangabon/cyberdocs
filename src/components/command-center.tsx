"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Wifi,
  Swords,
  ShieldCheck,
  FileText,
  Search,
  ArrowRight,
} from "lucide-react";
import type { NoteMetadata } from "@/lib/mdx";

// Map categories to icons and colors
const categoryConfig: Record<
  string,
  { icon: React.ElementType; label: string; color: string }
> = {
  networking: {
    icon: Wifi,
    label: "Réseau",
    color: "text-brand-blue",
  },
  offensive: {
    icon: Swords,
    label: "Attaque",
    color: "text-brand-red",
  },
  defensive: {
    icon: ShieldCheck,
    label: "Défense",
    color: "text-brand-green",
  },
  general: {
    icon: FileText,
    label: "Général",
    color: "text-brand-text-secondary",
  },
};

// Quick navigation links
const quickLinks = [
  { label: "Accueil Dashboard", href: "/dashboard", icon: ArrowRight },
  { label: "Réseau", href: "/dashboard/network", icon: Wifi },
  { label: "Offensif", href: "/dashboard/offensive", icon: Swords },
  { label: "Défensif", href: "/dashboard/defensive", icon: ShieldCheck },
  { label: "Toutes les Notes", href: "/notes", icon: FileText },
];

export function CommandCenter() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState<NoteMetadata[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch notes when the dialog opens
  const fetchNotes = useCallback(async () => {
    if (notes.length > 0) return; // Already loaded
    setLoading(true);
    try {
      const res = await fetch("/api/notes");
      const data: NoteMetadata[] = await res.json();
      setNotes(data);
    } catch (err) {
      console.error("Failed to fetch notes for Command Center:", err);
    } finally {
      setLoading(false);
    }
  }, [notes.length]);

  // Global keyboard shortcut: CMD+K / CTRL+K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Fetch notes when dialog opens
  useEffect(() => {
    if (open) {
      fetchNotes();
    }
  }, [open, fetchNotes]);

  // Navigate to a note
  const handleSelectNote = (slug: string) => {
    setOpen(false);
    router.push(`/notes/${slug}`);
  };

  // Navigate to a quick link
  const handleSelectLink = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  // Group notes by category
  const groupedNotes = notes.reduce(
    (acc, note) => {
      const cat = note.category || "general";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(note);
      return acc;
    },
    {} as Record<string, NoteMetadata[]>,
  );

  return (
    <>
      {/* Trigger button for the navbar */}
      <button
        onClick={() => setOpen(true)}
        className="group flex h-8 items-center gap-2 rounded-md border border-brand-border bg-black/40 px-3 text-sm text-brand-text-secondary transition-all hover:border-brand-blue/40 hover:text-white"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden md:inline">Search...</span>
        <kbd className="pointer-events-none ml-1 hidden select-none rounded border border-brand-border px-1.5 py-0.5 font-mono text-[10px] text-brand-text-secondary/70 md:inline-block">
          ⌘K
        </kbd>
      </button>

      {/* Command Dialog */}
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Command Center"
        description="Search for a vulnerability, tool, or protocol..."
        showCloseButton={false}
      >
        <CommandInput placeholder="Search for a vulnerability, tool, or protocol..." />
        <CommandList className="max-h-[400px]">
          <CommandEmpty>
            {loading ? (
              <span className="text-brand-text-secondary">Loading...</span>
            ) : (
              <span className="text-brand-text-secondary">
                No results found.
              </span>
            )}
          </CommandEmpty>

          {/* Quick Navigation */}
          <CommandGroup heading="Quick Access">
            {quickLinks.map((link) => (
              <CommandItem
                key={link.href}
                value={link.label}
                onSelect={() => handleSelectLink(link.href)}
                className="cursor-pointer"
              >
                <link.icon className="mr-2 h-4 w-4 text-brand-text-secondary" />
                <span>{link.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          {/* Notes grouped by category */}
          {Object.entries(groupedNotes).map(([category, categoryNotes]) => {
            const config = categoryConfig[category] || categoryConfig.general;
            const Icon = config.icon;
            return (
              <CommandGroup key={category} heading={config.label}>
                {categoryNotes.map((note) => (
                  <CommandItem
                    key={note.slug}
                    value={`${note.title} ${note.tags.join(" ")} ${note.description}`}
                    onSelect={() => handleSelectNote(note.slug)}
                    className="cursor-pointer"
                  >
                    <Icon className={`mr-2 h-4 w-4 shrink-0 ${config.color}`} />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium text-white">
                        {note.title}
                      </span>
                      <span className="text-xs text-brand-text-secondary line-clamp-1">
                        {note.description}
                      </span>
                    </div>
                    <div className="ml-auto flex shrink-0 gap-1">
                      {note.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-sm border border-brand-border px-1.5 py-0.5 text-[10px] text-brand-text-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })}
        </CommandList>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-brand-border px-3 py-2 text-[11px] text-brand-text-secondary/60">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-brand-border px-1 py-0.5 font-mono text-[10px]">
                ↑↓
              </kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-brand-border px-1 py-0.5 font-mono text-[10px]">
                ↵
              </kbd>
              Open
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-brand-border px-1 py-0.5 font-mono text-[10px]">
                esc
              </kbd>
              Close
            </span>
          </div>
          <span className="text-brand-blue/60">Command Center</span>
        </div>
      </CommandDialog>
    </>
  );
}
