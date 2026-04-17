"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * Page transition template for the (user) layout.
 * Uses a smooth spring-based fade + subtle upward slide.
 * Note: `exit` animations require AnimatePresence at router level —
 * here we focus on enter only which works natively with Next.js templates.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.45,
        ease: [0.25, 0.46, 0.45, 0.94], // custom ease-out-quart
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
