"use client";

import { motion } from "framer-motion";
import { Search, Map, Video, TrendingUp, MessageSquare, MonitorSmartphone, ArrowRight } from "lucide-react";

const steps = [
  { num: "01", title: "Research & Site Visit", icon: <Search className="w-7 h-7" />, items: ["Understand project", "Analyze location", "Study target audience", "Understand competition"] },
  { num: "02", title: "Market Analysis", icon: <Map className="w-7 h-7" />, items: ["Infrastructure growth", "Nearby developments", "Connectivity", "Investment opportunities"] },
  { num: "03", title: "Content Production", icon: <Video className="w-7 h-7" />, items: ["Property Shoot", "Drone Shoot", "Walkthrough Videos", "Reels Creation"] },
  { num: "04", title: "Performance Marketing", icon: <TrendingUp className="w-7 h-7" />, items: ["Meta Ads", "Google Ads", "Lead Generation Funnels", "Campaign Optimization"] },
  { num: "05", title: "Automation Systems", icon: <MessageSquare className="w-7 h-7" />, items: ["WhatsApp Automation", "Lead Nurturing", "Follow Up Sequences", "AI Chat Systems"] },
  { num: "06", title: "Website & CRM", icon: <MonitorSmartphone className="w-7 h-7" />, items: ["High Converting Website", "CRM Setup", "Lead Tracking", "Sales Dashboard"] },
];

export function Process({ onEnquiry }: { onEnquiry: () => void }) {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} whileHover={{ y: -8 }}
              className="relative p-8 md:p-10 rounded-[30px] overflow-hidden group transition-all duration-500"
              style={{
                background: index % 2 === 0 ? "#F8F7FF" : "#1D1D2B",
                border: index % 2 === 0 ? "1px solid rgba(123,92,246,0.08)" : "none",
                boxShadow: index % 2 === 0 ? "0 4px 30px rgba(123,92,246,0.05)" : "0 4px 30px rgba(0,0,0,0.2)",
              }}
            >
              
              <div className="w-14 h-14 rounded-[30px] flex items-center justify-center mb-6" style={{ background: index % 2 === 0 ? "rgba(123,92,246,0.08)" : "rgba(123,92,246,0.2)", color: index % 2 === 0 ? "#7B5CF6" : "#7B5CF6" }}>{step.icon}</div>
              
              <h3 className="text-2xl font-bold mb-6 font-heading" style={{ color: index % 2 === 0 ? "#1D1D2B" : "#F8F7FF" }}>{step.title}</h3>
              <ul className="space-y-3">
                {step.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "linear-gradient(135deg, #7B5CF6, #34D399)" }} />
                    <span className="text-[1.05rem]" style={{ color: index % 2 === 0 ? "#4B5563" : "#7B5CF6" }}>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-700" style={{ background: "linear-gradient(90deg, transparent, #7B5CF6, transparent)" }} />
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-16">
          <button onClick={onEnquiry} className="btn-primary inline-flex items-center gap-3 px-10 py-5 rounded-full text-sm uppercase tracking-widest">
            Start Your Project <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>

      {/* Bottom wave (matches Testimonials background) */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#1D1D2B"/>
        </svg>
      </div>
    </section>
  );
}
