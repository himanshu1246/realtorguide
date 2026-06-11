"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Mouse3DSpotlight() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-50 mix-blend-screen"
      style={{
        left: position.x,
        top: position.y,
      }}
      animate={{
        opacity: isVisible ? 0.6 : 0,
      }}
      transition={{ duration: 0.1 }}
    >
      <div
        className="w-[400px] h-[400px] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
        style={{
          background: "radial-gradient(circle, rgba(123,92,246,0.3) 0%, rgba(123,92,246,0.1) 40%, transparent 70%)",
          boxShadow: "0 0 100px 50px rgba(123,92,246,0.2)",
        }}
      />
    </motion.div>
  );
}
