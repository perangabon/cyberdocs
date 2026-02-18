"use client";

import { cn } from "@/lib/utils";
import { type ReactNode, useCallback, useRef, useState } from "react";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  /** Override glow color — defaults to brand blue */
  glowColor?: string;
}

export function BentoCard({
  children,
  className,
  glowColor = "0, 212, 255",
}: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: -400, y: -400 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    // Move glow offscreen so fade-out doesn't flash in a corner
    setMousePosition({ x: -400, y: -400 });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative overflow-hidden rounded-lg border border-brand-border bg-[#050505] p-6 transition-colors duration-300",
        className,
      )}
    >
      {/* Radial glow following mouse — always mounted, opacity-driven for smooth transitions */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 will-change-[opacity]"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(${glowColor}, 0.06), transparent 60%)`,
        }}
      />

      {/* Subtle border glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-lg transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          boxShadow: `inset 0 0 0 1px rgba(${glowColor}, 0.08)`,
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
