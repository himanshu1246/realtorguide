"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Scroll3DRevealProps {
  children: ReactNode;
  delay?: number;
}

export function Scroll3DReveal({ children, delay = 0 }: Scroll3DRevealProps) {
  return (
    <div style={{ perspective: "1500px" }} className="w-full">
      <motion.div
        initial={{ opacity: 0, rotateX: 20, y: 100, scale: 0.95 }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ 
          duration: 1.2, 
          delay: delay,
          ease: [0.16, 1, 0.3, 1] // Custom ease-out cubic
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
