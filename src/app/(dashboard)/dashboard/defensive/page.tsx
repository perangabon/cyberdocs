"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { BentoCard } from "@/components/bento-card";

export default function DefensivePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="mb-6 flex items-center gap-3">
        <ShieldCheck className="h-6 w-6 text-brand-green" />
        <h1 className="text-2xl font-bold tracking-tight">
          <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            Défensif
          </span>
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <BentoCard>
          <h3 className="text-sm font-medium text-brand-text-secondary mb-2">
            Notes
          </h3>
          <p className="text-sm text-brand-text-secondary/70">
            Les cheat sheets défensives seront affichées ici. Le contenu sera
            généré via le Content Engine (MDX).
          </p>
        </BentoCard>
      </div>
    </motion.div>
  );
}
