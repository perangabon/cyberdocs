import { NextResponse } from "next/server";
import { getAllNotes } from "@/lib/mdx";

/**
 * GET /api/notes
 * Returns all note metadata for the Command Center search.
 */
export async function GET() {
  const notes = getAllNotes();
  return NextResponse.json(notes);
}
