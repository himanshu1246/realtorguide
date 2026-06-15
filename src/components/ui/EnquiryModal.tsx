"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, ArrowRight } from "lucide-react";

export function EnquiryModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
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
        onClose();
        if (formRef.current) formRef.current.reset();
      }, 2500);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998]"
            style={{ background: "rgba(30,27,75,0.6)", backdropFilter: "blur(8px)" }}
            onClick={onClose}
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-[90vw] max-w-lg"
          >
            <div className="rounded-[30px] overflow-hidden" style={{ background: "#F8F7FF", boxShadow: "0 30px 80px rgba(123,92,246,0.25), 0 0 0 1px rgba(123,92,246,0.1)" }}>
              {/* Header */}
              <div className="relative p-8 pb-4" style={{ background: "linear-gradient(135deg, #7B5CF6, #7B5CF6)" }}>
                <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all">
                  <X className="w-5 h-5" />
                </button>
                <div className="w-12 h-12 rounded-[30px] flex items-center justify-center mb-4" style={{ background: "rgba(255,255,255,0.15)" }}>
                  <Send className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white font-heading">Let&apos;s Connect</h3>
                <p className="text-white/70 text-sm mt-1">Tell us about your project and we&apos;ll reach out within 24 hours.</p>
              </div>

              {/* Body */}
              <div className="p-8">
                {formStatus === "success" ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-8 text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(52,211,153,0.1)" }}>
                      <svg className="w-8 h-8" style={{ color: "#34D399" }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h4 className="text-xl font-bold font-heading" style={{ color: "#1D1D2B" }}>We&apos;ve Got Your Details!</h4>
                    <p className="text-sm mt-2" style={{ color: "#4B5563" }}>Our team will connect with you shortly.</p>
                  </motion.div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: "#4B5563" }}>Name *</label>
                        <input name="Name" type="text" required className="w-full rounded-[30px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple/30 transition-all" style={{ background: "#FFFFFF", border: "1px solid rgba(123,92,246,0.12)", color: "#1D1D2B" }} />
                      </div>
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: "#4B5563" }}>Phone *</label>
                        <input name="Phone" type="tel" required className="w-full rounded-[30px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple/30 transition-all" style={{ background: "#FFFFFF", border: "1px solid rgba(123,92,246,0.12)", color: "#1D1D2B" }} />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: "#4B5563" }}>Company / Project</label>
                      <input name="Company" type="text" className="w-full rounded-[30px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple/30 transition-all" style={{ background: "#FFFFFF", border: "1px solid rgba(123,92,246,0.12)", color: "#1D1D2B" }} />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: "#4B5563" }}>Message</label>
                      <textarea name="Message" className="w-full rounded-[30px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple/30 transition-all resize-none h-20" style={{ background: "#FFFFFF", border: "1px solid rgba(123,92,246,0.12)", color: "#1D1D2B" }} />
                    </div>
                    <button type="submit" disabled={formStatus === "submitting"} className="w-full py-4 rounded-[30px] text-sm uppercase tracking-[0.15em] font-bold flex justify-center items-center gap-2 text-white transition-all duration-300 hover:shadow-lg" style={{ background: "linear-gradient(135deg, #7B5CF6, #7B5CF6)", boxShadow: "0 8px 25px rgba(123,92,246,0.3)" }}>
                      {formStatus === "submitting" ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><span>Send Enquiry</span><ArrowRight className="w-4 h-4" /></>}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
