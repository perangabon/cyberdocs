"use client";

import { PageTransition } from "@/components/page-transition";
import type { ReactNode } from "react";

export function NotePageTransition({ children }: { children: ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
