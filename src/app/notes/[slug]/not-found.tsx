import Link from "next/link";
import { FileX, ArrowLeft } from "lucide-react";

export default function NoteNotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl border border-brand-border bg-brand-red/10">
          <FileX className="h-8 w-8 text-brand-red" />
        </div>
        <h1 className="mb-2 text-2xl font-bold tracking-tight">Note introuvable</h1>
        <p className="mb-8 max-w-md text-brand-text-secondary">
          La note que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          href="/notes"
          className="inline-flex items-center gap-2 rounded-lg border border-brand-border bg-white/5 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux notes
        </Link>
      </div>
    </main>
  );
}
