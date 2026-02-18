"use client";

import { motion } from "framer-motion";
import { Terminal, Globe, Lock, Code, Database, Cpu } from "lucide-react";
import { BentoCard } from "../bento-card";

const tools = [
  { icon: Terminal, label: "Shell" },
  { icon: Globe, label: "Network" },
  { icon: Lock, label: "Crypto" },
  { icon: Code, label: "Scripts" },
  { icon: Database, label: "SIEM" },
  { icon: Cpu, label: "Systems" },
];

export function TechStackBlock() {
  return (
    <BentoCard className="col-span-1">
      <h3 className="mb-4 text-sm font-medium text-brand-text-secondary">
        Tech Stack
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {tools.map((tool, i) => (
          <motion.div
            key={tool.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 * i }}
            className="flex flex-col items-center gap-1.5 rounded-md border border-brand-border bg-black/50 p-2 transition-colors hover:border-brand-blue/30"
          >
            <tool.icon className="h-4 w-4 text-brand-text-secondary" />
            <span className="font-mono text-[10px] text-brand-text-secondary">
              {tool.label}
            </span>
          </motion.div>
        ))}
      </div>
    </BentoCard>
  );
}
