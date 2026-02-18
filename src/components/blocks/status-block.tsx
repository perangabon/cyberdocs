"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { BentoCard } from "../bento-card";

export function StatusBlock() {
  return (
    <BentoCard className="col-span-1 flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col items-center gap-3"
      >
        {/* Pulsing green badge */}
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-brand-green/20" />
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-brand-green/30 bg-brand-green/10">
            <Shield className="h-5 w-5 text-brand-green" />
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-brand-green">System Online</p>
          <p className="mt-1 font-mono text-xs text-brand-text-secondary">
            Secure Connection
          </p>
        </div>
      </motion.div>
    </BentoCard>
  );
}
