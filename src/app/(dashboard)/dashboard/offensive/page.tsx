"use client";

import { motion } from "framer-motion";
import { Swords } from "lucide-react";
import { BentoCard } from "@/components/bento-card";

export default function OffensivePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="mb-6 flex items-center gap-3">
        <Swords className="h-6 w-6 text-brand-red" />
        <h1 className="text-2xl font-bold tracking-tight">
          <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            Offensif
          </span>
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <BentoCard>
          <h3 className="text-sm font-medium text-brand-text-secondary mb-2">
            Notes
          </h3>
          <p className="text-sm text-brand-text-secondary/70">
            Les cheat sheets offensives seront affichées ici. Le contenu sera
            généré via le Content Engine (MDX).
          </p>
        </BentoCard>
      </div>
    </motion.div>
  );
}
