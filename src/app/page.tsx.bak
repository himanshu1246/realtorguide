"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Clients } from "@/components/sections/Clients";
import { Production } from "@/components/sections/Production";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { EnquiryModal } from "@/components/ui/EnquiryModal";
import { Scroll3DReveal } from "@/components/ui/Scroll3DReveal";

export default function Home() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const openEnquiry = () => setIsEnquiryOpen(true);
  const closeEnquiry = () => setIsEnquiryOpen(false);

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary selection:bg-purple/20 selection:text-purple-dark overflow-hidden">
      <Navbar onEnquiry={openEnquiry} />
      
      <Hero onEnquiry={openEnquiry} />

      <Scroll3DReveal delay={0.1}>
        <div id="clients"><Clients onEnquiry={openEnquiry} /></div>
      </Scroll3DReveal>

      <Scroll3DReveal delay={0.1}>
        <div id="production"><Production onEnquiry={openEnquiry} /></div>
      </Scroll3DReveal>

      <Scroll3DReveal delay={0.1}>
        <Process onEnquiry={openEnquiry} />
      </Scroll3DReveal>

      <Scroll3DReveal delay={0.1}>
        <div id="testimonials"><Testimonials onEnquiry={openEnquiry} /></div>
      </Scroll3DReveal>

      <Scroll3DReveal delay={0.1}>
        <div id="services"><Services onEnquiry={openEnquiry} /></div>
      </Scroll3DReveal>

      <Scroll3DReveal delay={0.1}>
        <Contact />
      </Scroll3DReveal>

      <Footer />
      <EnquiryModal isOpen={isEnquiryOpen} onClose={closeEnquiry} />
    </main>
  );
}
