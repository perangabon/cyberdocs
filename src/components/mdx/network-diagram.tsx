"use client";

import { Network } from "lucide-react";
import { cn } from "@/lib/utils";

interface NetworkDiagramProps {
  children?: React.ReactNode;
  title?: string;
  className?: string;
}

export function NetworkDiagram({
  children,
  title,
  className,
}: NetworkDiagramProps) {
  return (
    <div
      className={cn(
        "my-6 overflow-hidden rounded-lg border border-brand-border bg-[#050505]",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-brand-border bg-[#0a0a0a] px-4 py-3">
        <Network className="h-4 w-4 text-brand-blue" />
        <span className="text-sm font-medium text-brand-text-secondary">
          {title ?? "Network Diagram"}
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-brand-green animate-pulse" />
          <span className="text-xs text-brand-text-secondary">Live</span>
        </div>
      </div>
      {/* Content area */}
      <div className="flex min-h-[200px] items-center justify-center p-6">
        {children ? (
          <div className="w-full">{children}</div>
        ) : (
          <div className="flex flex-col items-center gap-3 text-brand-text-secondary">
            <Network className="h-12 w-12 opacity-20" />
            <span className="text-sm">Diagram placeholder</span>
          </div>
        )}
      </div>
    </div>
  );
}
