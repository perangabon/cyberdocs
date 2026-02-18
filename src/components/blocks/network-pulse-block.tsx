"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Activity } from "lucide-react";
import { BentoCard } from "../bento-card";
import { useEffect, useState, useCallback } from "react";

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

function generateAreaPath(
  linePath: string,
  width: number,
  height: number,
): string {
  return `${linePath} L ${width} ${height} L 0 ${height} Z`;
}

interface NetworkStats {
  throughput: string;
  packets: string;
  latency: string;
}

function generateStats(): NetworkStats {
  return {
    throughput: `${(Math.random() * 400 + 100).toFixed(0)} Mb/s`,
    packets: `${(Math.random() * 5000 + 1000).toFixed(0)}/s`,
    latency: `${(Math.random() * 15 + 2).toFixed(1)} ms`,
  };
}

export function NetworkPulseBlock() {
  const [paths, setPaths] = useState<string[]>([]);
  const [stats, setStats] = useState<NetworkStats>(generateStats);
  const width = 400;
  const height = 120;

  const tick = useCallback(() => {
    setPaths((prev) => {
      const next = [...prev, generatePath(12, width, height)];
      return next.slice(-3);
    });
    setStats(generateStats());
  }, []);

  useEffect(() => {
    setPaths([generatePath(12, width, height)]);
    const interval = setInterval(tick, 2500);
    return () => clearInterval(interval);
  }, [tick]);

  return (
    <BentoCard className="col-span-1 md:col-span-2">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-brand-blue" />
          <h3 className="text-sm font-medium text-brand-text-secondary">
            Network Pulse
          </h3>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-blue opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-blue" />
          </span>
          <span className="font-mono text-xs text-brand-blue">LIVE</span>
        </div>
      </div>

      {/* Live stats row */}
      <div className="mb-3 grid grid-cols-3 gap-3">
        <AnimatePresence mode="popLayout">
          {[
            { label: "Throughput", value: stats.throughput },
            { label: "Packets", value: stats.packets },
            { label: "Latency", value: stats.latency },
          ].map((stat) => (
            <motion.div
              key={stat.label + stat.value}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.4 }}
              className="rounded-md border border-brand-border bg-black/40 px-2.5 py-1.5"
            >
              <p className="text-[10px] uppercase tracking-wider text-brand-text-secondary">
                {stat.label}
              </p>
              <p className="font-mono text-xs font-medium text-brand-blue">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="relative overflow-hidden rounded-md">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="pulseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
            </linearGradient>
            <filter id="glowFilter">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

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

          {/* Area fill under latest path */}
          {paths.length > 0 && (
            <motion.path
              d={generateAreaPath(paths[paths.length - 1], width, height)}
              fill="url(#pulseGrad)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
          )}

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
                opacity: i === paths.length - 1 ? 0.8 : 0.1,
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
              filter="url(#glowFilter)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.2 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          )}
        </svg>
      </div>
    </BentoCard>
  );
}
