"use client";

export function BackgroundGrid() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
      style={{
        backgroundImage: `radial-gradient(circle, #333333 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
        opacity: 0.1,
      }}
    />
  );
}
