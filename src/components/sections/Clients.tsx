"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const clients = [
  { id: 1, name: "Lodha Group", type: "Luxury Residences", location: "Mumbai" },
  { id: 2, name: "DLF Limited", type: "Commercial Hub", location: "Delhi" },
  { id: 3, name: "Prestige Estates", type: "Villa Project", location: "Bangalore" },
  { id: 4, name: "Godrej Properties", type: "Eco Township", location: "Pune" },
  { id: 5, name: "Sobha Ltd", type: "Penthouse Series", location: "Dubai" },
  { id: 6, name: "Oberoi Realty", type: "High-Rise Apartments", location: "Mumbai" },
  { id: 7, name: "Brigade Group", type: "Integrated Township", location: "Bangalore" },
  { id: 8, name: "Mahindra Lifespaces", type: "Smart City", location: "Chennai" },
];

export function Clients({ onEnquiry }: { onEnquiry: () => void }) {
  return (
    <section className="py-32 md:py-40 relative overflow-hidden" style={{ background: "#E7DBEF" }}>
      <div className="container mx-auto px-6 md:px-12 mb-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-12 h-[2px] rounded-full" style={{ background: "linear-gradient(90deg, #6E3482, #34D399)" }} />
          <span className="text-sm font-semibold tracking-[0.2em] uppercase" style={{ color: "#6E3482" }}>Our Partners</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight mb-4" style={{ color: "#49225B" }}>
              Clients We Have<br /><span className="gradient-text">Worked With</span>
            </h2>
            <p className="max-w-xl text-lg leading-relaxed" style={{ color: "#4B5563" }}>
              Partnering with India&apos;s most trusted real estate developers to craft high-converting campaigns.
            </p>
          </div>
          <button onClick={onEnquiry} className="btn-secondary px-8 py-3 rounded-full text-sm uppercase tracking-widest inline-flex items-center gap-2 self-start md:self-auto whitespace-nowrap">
            Work With Us <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {clients.map((client, i) => (
            <motion.div key={client.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }} whileHover={{ y: -8, scale: 1.02 }}
              className="group relative p-8 md:p-10 rounded-3xl cursor-pointer transition-all duration-500"
              style={{ background: "#F5EBFA", border: "1px solid rgba(227,170,221,0.08)" }}
            >
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" style={{ boxShadow: "0 15px 50px rgba(227,170,221,0.1)" }} />
              <div className="text-6xl font-heading font-bold mb-6" style={{ color: "rgba(227,170,221,0.08)" }}>{String(client.id).padStart(2, "0")}</div>
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold mb-2 font-heading group-hover:text-purple transition-colors duration-300" style={{ color: "#49225B" }}>{client.name}</h3>
                <p className="text-sm font-semibold mb-1" style={{ color: "#6E3482" }}>{client.type}</p>
                <div className="flex items-center gap-2 text-xs" style={{ color: "#6B7280" }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#34D399" }} />{client.location}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-3xl scale-x-0 group-hover:scale-x-100 transition-transform duration-700" style={{ background: "linear-gradient(90deg, transparent, #6E3482, transparent)" }} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom wave (matches Production background) */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#0f0f11"/>
        </svg>
      </div>
    </section>
  );
}
