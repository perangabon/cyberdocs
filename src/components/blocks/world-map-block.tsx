"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { BentoCard } from "../bento-card";
import { useEffect, useState } from "react";

interface MapNode {
  id: string;
  label: string;
  x: number; // percentage
  y: number; // percentage
  type: "server" | "node" | "endpoint";
}

const NODES: MapNode[] = [
  { id: "paris", label: "Paris", x: 49, y: 30, type: "server" },
  { id: "ny", label: "New York", x: 25, y: 35, type: "server" },
  { id: "tokyo", label: "Tokyo", x: 85, y: 35, type: "node" },
  { id: "sydney", label: "Sydney", x: 88, y: 68, type: "endpoint" },
  { id: "sao-paulo", label: "São Paulo", x: 32, y: 62, type: "node" },
  { id: "london", label: "London", x: 47, y: 27, type: "server" },
  { id: "singapore", label: "Singapore", x: 78, y: 52, type: "node" },
  { id: "mumbai", label: "Mumbai", x: 70, y: 43, type: "endpoint" },
  { id: "sf", label: "San Francisco", x: 13, y: 35, type: "server" },
  { id: "nairobi", label: "Nairobi", x: 58, y: 52, type: "endpoint" },
];

// Connections between nodes
const CONNECTIONS: [string, string][] = [
  ["paris", "ny"],
  ["paris", "london"],
  ["london", "mumbai"],
  ["ny", "sf"],
  ["ny", "sao-paulo"],
  ["tokyo", "singapore"],
  ["singapore", "sydney"],
  ["mumbai", "singapore"],
  ["tokyo", "sf"],
  ["nairobi", "paris"],
  ["nairobi", "mumbai"],
];

// Simplified world map path (continents outline)
const WORLD_PATH = `
  M 15,28 Q 18,20 25,22 L 28,20 Q 30,18 33,22 L 30,28 Q 28,35 25,35 L 22,38 Q 18,42 15,38 Z
  M 25,45 Q 28,42 30,45 L 33,50 Q 35,58 32,65 L 28,68 Q 25,70 23,65 L 22,58 Q 22,50 25,45 Z
  M 42,18 L 55,15 Q 62,14 68,18 L 72,22 Q 75,25 72,30 L 68,32 Q 62,35 55,33 L 50,30 Q 45,28 42,25 Z
  M 50,35 Q 55,32 60,35 L 65,38 Q 68,42 65,48 L 60,55 Q 55,60 52,55 L 48,48 Q 45,42 50,35 Z
  M 70,25 Q 75,22 80,25 L 88,28 Q 92,32 90,38 L 85,42 Q 80,45 75,42 L 70,35 Q 68,30 70,25 Z
  M 82,48 Q 85,45 88,48 L 92,55 Q 95,62 92,68 L 88,72 Q 85,75 82,70 L 80,62 Q 78,55 82,48 Z
`;

function getNodeById(id: string): MapNode | undefined {
  return NODES.find((n) => n.id === id);
}

export function WorldMapBlock() {
  const [activeConnection, setActiveConnection] = useState(0);
  const [pingNode, setPingNode] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveConnection((prev) => (prev + 1) % CONNECTIONS.length);
      // Ping a random node
      const randomNode = NODES[Math.floor(Math.random() * NODES.length)];
      setPingNode(randomNode.id);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <BentoCard className="col-span-1 md:col-span-2">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-brand-blue" />
          <h3 className="text-sm font-medium text-brand-text-secondary">
            Global Network
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
            <span className="text-[10px] text-brand-text-secondary">
              Server
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
            <span className="text-[10px] text-brand-text-secondary">Node</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-text-secondary" />
            <span className="text-[10px] text-brand-text-secondary">
              Endpoint
            </span>
          </div>
        </div>
      </div>

      <div className="relative aspect-[2/1] w-full overflow-hidden rounded-md border border-brand-border bg-black/40">
        <svg
          viewBox="0 0 100 80"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
            </radialGradient>
            <filter id="mapGlow">
              <feGaussianBlur stdDeviation="0.3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* World map outline — very faint */}
          <motion.path
            d={WORLD_PATH}
            fill="none"
            stroke="#1A1A1A"
            strokeWidth={0.3}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1.5 }}
          />
          <motion.path
            d={WORLD_PATH}
            fill="rgba(0, 212, 255, 0.02)"
            stroke="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          />

          {/* Connection lines */}
          {CONNECTIONS.map(([fromId, toId], i) => {
            const from = getNodeById(fromId);
            const to = getNodeById(toId);
            if (!from || !to) return null;

            const isActive = i === activeConnection;

            return (
              <g key={`conn-${fromId}-${toId}`}>
                {/* Base line */}
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="#1A1A1A"
                  strokeWidth={0.15}
                  strokeDasharray="0.5 0.5"
                />
                {/* Animated active line */}
                {isActive && (
                  <motion.line
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="#00D4FF"
                    strokeWidth={0.3}
                    filter="url(#mapGlow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.8 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                )}
              </g>
            );
          })}

          {/* Map nodes */}
          {NODES.map((node) => {
            const isPinging = pingNode === node.id;
            const nodeColor =
              node.type === "server"
                ? "#00D4FF"
                : node.type === "node"
                  ? "#00FF41"
                  : "#A1A1AA";

            return (
              <g key={node.id}>
                {/* Ping ripple effect */}
                {isPinging && (
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={0.8}
                    fill="none"
                    stroke={nodeColor}
                    strokeWidth={0.15}
                    initial={{ r: 0.8, opacity: 0.8 }}
                    animate={{ r: 4, opacity: 0 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  />
                )}

                {/* Ambient glow */}
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={2}
                  fill={nodeColor}
                  opacity={0.08}
                  animate={{
                    opacity: [0.05, 0.15, 0.05],
                    r: [1.5, 2.5, 1.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 2,
                  }}
                />

                {/* Node dot */}
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={node.type === "server" ? 0.8 : 0.5}
                  fill={nodeColor}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.5 + Math.random() * 0.5,
                  }}
                />

                {/* Label */}
                <motion.text
                  x={node.x}
                  y={node.y - 2.5}
                  textAnchor="middle"
                  fill={nodeColor}
                  opacity={0.6}
                  className="text-[2.5px] font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  {node.label}
                </motion.text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Bottom stats */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-brand-text-secondary">
              Active Nodes
            </p>
            <p className="font-mono text-xs font-medium text-brand-blue">
              {NODES.length}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-brand-text-secondary">
              Connections
            </p>
            <p className="font-mono text-xs font-medium text-brand-blue">
              {CONNECTIONS.length}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-green" />
          </span>
          <span className="font-mono text-[10px] text-brand-green">
            ALL SYSTEMS NOMINAL
          </span>
        </div>
      </div>
    </BentoCard>
  );
}
