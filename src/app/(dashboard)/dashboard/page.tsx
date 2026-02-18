"use client";

import { motion } from "framer-motion";
import { BentoCard } from "@/components/bento-card";
import { NetworkPulseBlock } from "@/components/blocks/network-pulse-block";
import { StatusBlock } from "@/components/blocks/status-block";
import { TechStackBlock } from "@/components/blocks/tech-stack-block";
import { QuickAccessBlock } from "@/components/blocks/quick-access-block";

export default function DashboardHome() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <h1 className="mb-6 text-2xl font-bold tracking-tight">
        <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
          Dashboard
        </span>
      </h1>

      <div className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-6 md:grid-cols-4">
        {/* Network Pulse */}
        <NetworkPulseBlock />

        {/* Status */}
        <StatusBlock />

        {/* Tech Stack */}
        <TechStackBlock />

        {/* Quick Access */}
        <QuickAccessBlock />
      </div>
    </motion.div>
  );
}
