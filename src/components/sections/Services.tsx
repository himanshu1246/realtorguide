"use client";

import { motion } from "framer-motion";
import { Megaphone, Search, Share2, Bot, Database, Laptop, Magnet, MessageCircle, Palette, Camera, ArrowRight } from "lucide-react";

const services = [
  { name: "Social Media Marketing", icon: <Megaphone className="w-7 h-7" />, desc: "Build a powerful social presence" },
  { name: "Google Ads", icon: <Search className="w-7 h-7" />, desc: "Dominate search results" },
  { name: "Facebook Ads", icon: <Share2 className="w-7 h-7" />, desc: "Targeted lead campaigns" },
  { name: "AI Automation", icon: <Bot className="w-7 h-7" />, desc: "Automate your workflows" },
  { name: "CRM Systems", icon: <Database className="w-7 h-7" />, desc: "Track every lead" },
  { name: "Website Development", icon: <Laptop className="w-7 h-7" />, desc: "High-converting sites" },
  { name: "Lead Generation", icon: <Magnet className="w-7 h-7" />, desc: "Quality over quantity" },
  { name: "WhatsApp Automation", icon: <MessageCircle className="w-7 h-7" />, desc: "Instant follow-ups" },
  { name: "Branding", icon: <Palette className="w-7 h-7" />, desc: "Premium brand identity" },
  { name: "Content Production", icon: <Camera className="w-7 h-7" />, desc: "Cinematic visuals" },
];

export function Services({ onEnquiry }: { onEnquiry: () => void }) {
  return (
    <section className="py-32 md:py-40 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #F5EBFA 0%, #E7DBEF 100%)" }}>
      <div className="absolute top-[20%] right-[10%] w-64 h-64 rounded-full opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(52,211,153,0.4) 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="container mx-auto px-6 md:px-12 mb-20 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="w-12 h-[2px] rounded-full" style={{ background: "linear-gradient(90deg, #6E3482, #34D399)" }} />
          <span className="text-sm font-semibold tracking-[0.2em] uppercase" style={{ color: "#6E3482" }}>What We Offer</span>
          <span className="w-12 h-[2px] rounded-full" style={{ background: "linear-gradient(90deg, #34D399, #6E3482)" }} />
        </div>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight mb-6" style={{ color: "#49225B" }}>
          Helping Real Estate<br />Professionals <span className="gradient-text">Grow Faster.</span>
        </h2>
        <p className="max-w-xl mx-auto text-lg leading-relaxed" style={{ color: "#4B5563" }}>
          An end-to-end ecosystem designed to scale your real estate business predictably.
        </p>
      </div>

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {services.map((service, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.05 }} whileHover={{ y: -12 }}
              className="group relative p-6 md:p-8 rounded-3xl flex flex-col items-center text-center cursor-pointer transition-all duration-500"
              style={{ background: "#E7DBEF", border: "1px solid rgba(227,170,221,0.06)", boxShadow: "0 4px 20px rgba(227,170,221,0.04)" }}
            >
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" style={{ boxShadow: "0 10px 40px rgba(227,170,221,0.12)" }} />
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110" style={{ background: "rgba(227,170,221,0.06)", color: "#6E3482" }}>{service.icon}</div>
              <h3 className="font-bold text-sm mb-2 relative z-10" style={{ color: "#49225B" }}>{service.name}</h3>
              <p className="text-xs leading-relaxed relative z-10" style={{ color: "#6B7280" }}>{service.desc}</p>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-3xl scale-x-0 group-hover:scale-x-100 transition-transform duration-700" style={{ background: "linear-gradient(90deg, transparent, #6E3482, transparent)" }} />
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-16">
        <button onClick={onEnquiry} className="btn-primary inline-flex items-center gap-3 px-10 py-5 rounded-full text-sm uppercase tracking-widest">
          Explore Our Services <ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>

      {/* Bottom wave (matches Contact background) */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#E7DBEF"/>
        </svg>
      </div>
    </section>
  );
}
