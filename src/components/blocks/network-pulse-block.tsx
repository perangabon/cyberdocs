"use client";

import { motion } from "framer-motion";
import { BentoCard } from "../bento-card";
import { useEffect, useState } from "react";

function generatePath(points: number, width: number, height: number): string {
  const step = width / (points - 1);
  const coords = Array.from({ length: points }, (_, i) => ({
    x: i * step,
    y: Math.random() * height * 0.6 + height * 0.2,
  }));

  let d = `M ${coords[0].x} ${coords[0].y}`;
  for (let i = 1; i < coords.length; i++) {
    const cpx = (coords[i - 1].x + coords[i].x) / 2;
    d += ` C ${cpx} ${coords[i - 1].y}, ${cpx} ${coords[i].y}, ${coords[i].x} ${coords[i].y}`;
  }
  return d;
}

export function NetworkPulseBlock() {
  const [paths, setPaths] = useState<string[]>([]);
  const width = 400;
  const height = 120;

  useEffect(() => {
    // Generate initial path
    setPaths([generatePath(12, width, height)]);

    const interval = setInterval(() => {
      setPaths((prev) => {
        const next = [...prev, generatePath(12, width, height)];
        // Keep only last 3 paths for smooth transition
        return next.slice(-3);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <BentoCard className="col-span-1 md:col-span-2">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium text-brand-text-secondary">
          Network Pulse
        </h3>
        <span className="font-mono text-xs text-brand-blue">LIVE</span>
      </div>
      <div className="relative overflow-hidden rounded-md">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full"
          preserveAspectRatio="none"
        >
          {/* Background grid lines */}
          {Array.from({ length: 5 }, (_, i) => (
            <line
              key={`grid-${i}`}
              x1={0}
              x2={width}
              y1={(height / 4) * i}
              y2={(height / 4) * i}
              stroke="#1A1A1A"
              strokeWidth={0.5}
            />
          ))}

          {/* Animated path lines */}
          {paths.map((d, i) => (
            <motion.path
              key={`path-${i}-${d.slice(0, 20)}`}
              d={d}
              fill="none"
              stroke="#00D4FF"
              strokeWidth={1.5}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0.3 }}
              animate={{
                pathLength: 1,
                opacity: i === paths.length - 1 ? 0.8 : 0.15,
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          ))}

          {/* Glow underneath the latest path */}
          {paths.length > 0 && (
            <motion.path
              d={paths[paths.length - 1]}
              fill="none"
              stroke="#00D4FF"
              strokeWidth={6}
              strokeLinecap="round"
              filter="blur(8px)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.15 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          )}
        </svg>
      </div>
    </BentoCard>
  );
}
