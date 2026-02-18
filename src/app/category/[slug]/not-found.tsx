import Link from "next/link";
import { FolderX } from "lucide-react";

export default function CategoryNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <FolderX className="mb-6 h-16 w-16 text-brand-text-secondary opacity-40" />
      <h1 className="mb-2 text-2xl font-bold text-white">
        Catégorie introuvable
      </h1>
      <p className="mb-8 text-sm text-brand-text-secondary">
        Cette catégorie n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        href="/notes"
        className="rounded-lg border border-brand-border bg-[#050505] px-4 py-2 text-sm text-brand-blue transition-colors hover:border-brand-blue/40 hover:bg-brand-blue/5"
      >
        Retour aux Notes
      </Link>
    </main>
  );
}
