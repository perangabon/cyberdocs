"use client";

import { motion } from "framer-motion";
import { Wrench } from "lucide-react";
import { BentoCard } from "@/components/bento-card";

export default function ToolsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="mb-6 flex items-center gap-3">
        <Wrench className="h-6 w-6 text-brand-text-secondary" />
        <h1 className="text-2xl font-bold tracking-tight">
          <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            Outils
          </span>
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <BentoCard>
          <h3 className="text-sm font-medium text-brand-text-secondary mb-2">
            Toolbox
          </h3>
          <p className="text-sm text-brand-text-secondary/70">
            Les outils et utilitaires seront listés ici. Configuration, scripts,
            et références rapides.
          </p>
        </BentoCard>
      </div>
    </motion.div>
  );
}
