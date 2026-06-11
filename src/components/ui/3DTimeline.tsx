"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TimelineStep {
  num: string;
  title: string;
  icon: ReactNode;
  items: string[];
  isDark: boolean;
}

interface Timeline3DProps {
  steps: TimelineStep[];
  onEnquiry: () => void;
}

export function Timeline3D({ steps, onEnquiry }: Timeline3DProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, rotateX: 20 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <section id="process" className="py-32 md:py-40 relative" style={{ background: "#FFFFFF" }}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-12 h-[2px] rounded-full" style={{ background: "linear-gradient(90deg, #7B5CF6, #34D399)" }} />
            <span className="text-sm font-semibold tracking-[0.2em] uppercase" style={{ color: "#7B5CF6" }}>Our Process</span>
            <span className="w-12 h-[2px] rounded-full" style={{ background: "linear-gradient(90deg, #34D399, #7B5CF6)" }} />
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight" style={{ color: "#1D1D2B" }}>
            How We Generate<br /><span className="gradient-text">High Quality Leads</span>
          </h2>
        </div>

        {/* 3D Timeline */}
        <div className="relative">
          {/* Animated center line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gradient-to-b from-transparent via-purple-500 to-transparent" />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
                style={{ perspective: "1200px" }}
                whileHover={{
                  rotateY: 5,
                  rotateX: -5,
                  transition: { duration: 0.4 },
                }}
              >
                <motion.div
                  className="relative p-8 md:p-10 rounded-[30px] overflow-hidden h-full transition-all duration-500"
                  style={{
                    background: step.isDark ? "#1D1D2B" : "#F8F7FF",
                    border: step.isDark ? "1px solid rgba(123,92,246,0.2)" : "1px solid rgba(123,92,246,0.08)",
                    boxShadow: step.isDark
                      ? "0 4px 30px rgba(0,0,0,0.3), 0 0 40px rgba(123,92,246,0.15)"
                      : "0 4px 30px rgba(123,92,246,0.05), 0 0 40px rgba(123,92,246,0.08)",
                  }}
                  whileHover={{
                    boxShadow: step.isDark
                      ? "0 20px 40px rgba(123,92,246,0.3), 0 0 60px rgba(123,92,246,0.25)"
                      : "0 20px 40px rgba(123,92,246,0.15), 0 0 60px rgba(123,92,246,0.15)",
                  }}
                >
                  {/* Animated gradient overlay on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: step.isDark
                        ? "linear-gradient(135deg, rgba(123,92,246,0.1), rgba(52,211,153,0.05))"
                        : "linear-gradient(135deg, rgba(123,92,246,0.05), rgba(52,211,153,0.02))",
                    }}
                  />

                  <div className="relative z-10">
                    {/* Number background */}
                    <div className="absolute -top-2 -right-1 text-[7rem] font-heading font-bold leading-none pointer-events-none" style={{ color: step.isDark ? "rgba(255,255,255,0.08)" : "rgba(123,92,246,0.05)" }}>
                      {step.num}
                    </div>

                    {/* Icon */}
                    <motion.div
                      className="w-14 h-14 rounded-[30px] flex items-center justify-center mb-6 relative z-20"
                      style={{
                        background: step.isDark
                          ? "rgba(123,92,246,0.2)"
                          : "rgba(123,92,246,0.08)",
                        color: step.isDark ? "#7B5CF6" : "#7B5CF6",
                      }}
                      whileHover={{
                        scale: 1.1,
                        rotate: 360,
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      {step.icon}
                    </motion.div>

                    <div className="text-xs uppercase tracking-[0.3em] font-semibold mb-3" style={{ color: step.isDark ? "#7B5CF6" : "#7B5CF6" }}>
                      Step {step.num}
                    </div>

                    <h3 className="text-2xl font-bold mb-6 font-heading" style={{ color: step.isDark ? "#F8F7FF" : "#1D1D2B" }}>
                      {step.title}
                    </h3>

                    {/* Items list with stagger animation */}
                    <ul className="space-y-3">
                      {step.items.map((item, i) => (
                        <motion.li
                          key={i}
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <motion.span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ background: "linear-gradient(135deg, #7B5CF6, #34D399)" }}
                            whileHover={{ scale: 1.5 }}
                          />
                          <span className="text-sm" style={{ color: step.isDark ? "#7B5CF6" : "#4B5563" }}>
                            {item}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom gradient line on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-700" style={{ background: "linear-gradient(90deg, transparent, #7B5CF6, transparent)" }} />

                  {/* 3D connector dots for timeline */}
                  {index !== steps.length - 1 && (
                    <motion.div
                      className="hidden lg:block absolute -right-4 top-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-green-500"
                      style={{
                        transform: "translate(50%, -50%)",
                        boxShadow: "0 0 20px rgba(123,92,246,0.4)",
                      }}
                      whileHover={{ scale: 1.2 }}
                    />
                  )}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            onClick={onEnquiry}
            className="btn-primary inline-flex items-center gap-3 px-10 py-5 rounded-full text-sm uppercase tracking-widest overflow-hidden relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Start Your Project</span>
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-emerald-500 -z-10"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#1D1D2B"
          />
        </svg>
      </div>
    </section>
  );
}
