"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * A very thin reading-progress bar fixed to the top of the viewport.
 * Uses Framer Motion's useScroll + useSpring for a smooth, GPU-accelerated bar.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-brand-blue to-brand-blue/60"
      style={{ scaleX }}
    />
  );
}
