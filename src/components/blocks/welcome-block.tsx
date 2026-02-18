"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { BentoCard } from "../bento-card";

export function WelcomeBlock() {
  return (
    <BentoCard className="col-span-1 row-span-2 md:col-span-2 md:row-span-2 flex flex-col justify-between">
      <div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
        >
          <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            CyberVault
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="mt-4 max-w-md text-brand-text-secondary leading-relaxed"
        >
          Cybersecurity engineering portfolio & knowledge base. Offensive,
          defensive, and network expertise distilled into actionable cheat
          sheets.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        className="mt-8"
      >
        <Link
          href="/dashboard"
          className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-md border border-brand-border bg-transparent px-6 py-3 text-sm font-medium text-brand-text transition-all duration-300 hover:border-brand-blue/50 hover:text-white"
        >
          <span className="relative z-10">Explore Notes</span>
          <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          {/* Animated border beam */}
          <span className="absolute inset-0 z-0 rounded-md bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent bg-[length:200%_100%] animate-[border-beam_4s_linear_infinite] opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100" />
        </Link>
      </motion.div>
    </BentoCard>
  );
}
