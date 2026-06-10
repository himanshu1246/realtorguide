"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Cube3DProps {
  children: React.ReactNode;
  className?: string;
}

export function Cube3D({ children, className = "" }: Cube3DProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientY / window.innerHeight - 0.5) * 30;
      const y = (e.clientX / window.innerWidth - 0.5) * -30;
      setRotateX(x);
      setRotateY(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className={className}
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{
        type: "spring",
        stiffness: 30,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
}
