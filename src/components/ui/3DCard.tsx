"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Card3DProps {
  children: ReactNode;
  className?: string;
  isDark?: boolean;
}

export function Card3D({ children, className = "", isDark = false }: Card3DProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [shine, setShinе] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = (y - centerY) / 10;
    const rotY = (centerX - x) / 10;

    setRotateX(rotX);
    setRotateY(rotY);
    setShinе({ x, y });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setShinе({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className={`relative transition-all duration-300 ${className}`}
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
      }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          background: isDark
            ? "linear-gradient(135deg, #49225B 0%, #0f0f1b 100%)"
            : "linear-gradient(135deg, #E7DBEF 0%, #F5F3FF 100%)",
        }}
      >
        {children}

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-3xl opacity-0"
          style={{
            background: `radial-gradient(circle 600px at ${shine.x}px ${shine.y}px, rgba(255,255,255,0.15), transparent 80%)`,
          }}
          animate={{
            opacity: shine.x > 0 && shine.y > 0 ? 1 : 0,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
