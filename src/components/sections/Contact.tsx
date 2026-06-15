"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export function Contact() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    
    setFormStatus("submitting");
    const formData = new FormData(formRef.current);
    
    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL || "https://script.google.com/macros/s/AKfycbwnbZm3q7t9sAEJCrSO6jWgwded7KOwRe9LF1i5yA0mQb3qYMLc7iWFSn2Sp0pqqM3Zpw/exec";
    if (scriptUrl) {
      fetch(scriptUrl, { method: "POST", body: formData, mode: "no-cors" }).catch(() => {});
    }
    setTimeout(() => {
      setFormStatus("success");
      setTimeout(() => {
        setFormStatus("idle");
        if (formRef.current) formRef.current.reset();
      }, 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-32 md:py-40 relative" style={{ background: "#F8F7FF" }}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[2px] rounded-full" style={{ background: "linear-gradient(90deg, #7B5CF6, #34D399)" }} />
              <span className="text-sm font-semibold tracking-[0.2em] uppercase" style={{ color: "#7B5CF6" }}>Get In Touch</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight mb-6" style={{ color: "#1D1D2B" }}>
              Let&apos;s Grow Your<br />
              <span className="gradient-text">Real Estate Business.</span>
            </h2>
            <p className="text-lg mb-16 max-w-md leading-relaxed" style={{ color: "#4B5563" }}>
              Ready to stop chasing leads and start closing deals? Book a free strategy session with our experts.
            </p>

            <div className="space-y-8">
              {[
                { icon: <Phone className="w-5 h-5" />, title: "Phone", detail: "+91 7007319062", link: "tel:+917007319062" },
                { icon: <Mail className="w-5 h-5" />, title: "Email", detail: "services@realtorguide.in", link: "mailto:services@realtorguide.in" },
                { icon: <MapPin className="w-5 h-5" />, title: "Office", detail: "Belapur Station Tower no 10th,6th floor ,Realtor Guide", link: "#" },
                { icon: <MessageCircle className="w-5 h-5" />, title: "WhatsApp", detail: "Chat with us directly", link: "https://wa.me/917007319062?text=Hello%20Realtor%20Guide%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services." },
              ].map((item, i) => {
                const Wrapper = item.link !== "#" ? "a" : "div";
                return (
                  <Wrapper key={i} href={item.link !== "#" ? item.link : undefined} target={item.link?.startsWith("http") ? "_blank" : undefined} className="flex items-start gap-5 group cursor-pointer" style={{ textDecoration: 'none' }}>
                    <div className="w-12 h-12 rounded-[30px] flex items-center justify-center group-hover:scale-110 transition-all duration-300" style={{ background: "rgba(123,92,246,0.06)", color: "#7B5CF6", border: "1px solid rgba(123,92,246,0.1)" }}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold mb-1 text-sm uppercase tracking-wider" style={{ color: "#1D1D2B" }}>{item.title}</h4>
                      <p className="group-hover:text-purple transition-colors" style={{ color: "#4B5563" }}>{item.detail}</p>
                    </div>
                  </Wrapper>
                );
              })}
            </div>
          </div>

          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 md:p-12 rounded-[30px] relative overflow-hidden"
              style={{ background: "#FFFFFF", border: "1px solid rgba(123,92,246,0.1)", boxShadow: "0 10px 40px rgba(123,92,246,0.06)" }}
            >
              {formStatus === "success" ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="h-full min-h-[400px] flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ background: "rgba(52,211,153,0.1)" }}>
                    <svg className="w-10 h-10" style={{ color: "#34D399" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold mb-3 font-heading" style={{ color: "#1D1D2B" }}>Request Received!</h3>
                  <p style={{ color: "#4B5563" }}>Our team will contact you within 24 hours.</p>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider ml-1" style={{ color: "#4B5563" }}>Name *</label>
                      <input name="Name" type="text" required className="w-full rounded-[30px] p-4 focus:outline-none transition-all duration-300 focus:ring-2 focus:ring-purple/20" style={{ background: "#F8F7FF", border: "1px solid rgba(123,92,246,0.15)", color: "#1D1D2B" }} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider ml-1" style={{ color: "#4B5563" }}>Company *</label>
                      <input name="Company" type="text" required className="w-full rounded-[30px] p-4 focus:outline-none transition-all duration-300 focus:ring-2 focus:ring-purple/20" style={{ background: "#F8F7FF", border: "1px solid rgba(123,92,246,0.15)", color: "#1D1D2B" }} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider ml-1" style={{ color: "#4B5563" }}>Mobile *</label>
                      <input name="Phone" type="tel" required className="w-full rounded-[30px] p-4 focus:outline-none transition-all duration-300 focus:ring-2 focus:ring-purple/20" style={{ background: "#F8F7FF", border: "1px solid rgba(123,92,246,0.15)", color: "#1D1D2B" }} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider ml-1" style={{ color: "#4B5563" }}>Location</label>
                      <input name="Location" type="text" className="w-full rounded-[30px] p-4 focus:outline-none transition-all duration-300 focus:ring-2 focus:ring-purple/20" style={{ background: "#F8F7FF", border: "1px solid rgba(123,92,246,0.15)", color: "#1D1D2B" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider ml-1" style={{ color: "#4B5563" }}>Budget</label>
                    <input name="Budget" type="text" className="w-full rounded-[30px] p-4 focus:outline-none transition-all duration-300 focus:ring-2 focus:ring-purple/20" style={{ background: "#F8F7FF", border: "1px solid rgba(123,92,246,0.15)", color: "#1D1D2B" }} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider ml-1" style={{ color: "#4B5563" }}>Message</label>
                    <textarea name="Message" className="w-full rounded-[30px] p-4 focus:outline-none resize-none h-32 transition-all duration-300 focus:ring-2 focus:ring-purple/20" style={{ background: "#F8F7FF", border: "1px solid rgba(123,92,246,0.15)", color: "#1D1D2B" }} />
                  </div>
                  <button type="submit" disabled={formStatus === "submitting"} className="btn-primary w-full py-5 rounded-[30px] text-sm uppercase tracking-[0.2em] font-bold flex justify-center items-center">
                    {formStatus === "submitting" ? <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Send Your Enquiry"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
