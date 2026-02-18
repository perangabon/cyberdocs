"use client";

import { useState, useRef } from "react";
import { Check, Copy, FileCode2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheatSheetCodeProps {
  children: React.ReactNode;
  title?: string;
  language?: string;
}

export function CheatSheetCode({
  children,
  title,
  language,
}: CheatSheetCodeProps) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);

  async function handleCopy() {
    if (!codeRef.current) return;
    const code = codeRef.current.textContent ?? "";
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="group/code my-6 overflow-hidden rounded-lg border border-brand-border bg-[#0a0a0a]">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-brand-border bg-[#050505] px-4 py-2">
        <div className="flex items-center gap-2">
          <FileCode2 className="h-4 w-4 text-brand-blue" />
          {title && (
            <span className="text-sm font-medium text-brand-text-secondary">
              {title}
            </span>
          )}
          {language && (
            <span className="ml-2 rounded bg-brand-blue/10 px-2 py-0.5 text-xs font-mono text-brand-blue">
              {language}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs transition-all duration-200",
            copied
              ? "bg-brand-green/10 text-brand-green"
              : "text-brand-text-secondary hover:bg-white/5 hover:text-white"
          )}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy
            </>
          )}
        </button>
      </div>
      {/* Code content */}
      <div ref={codeRef} className="overflow-x-auto p-4 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}
