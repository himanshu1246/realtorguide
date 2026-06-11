"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

const InstagramIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);
const FacebookIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const LinkedinIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);
const TwitterIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);

export function Footer() {
  return (
    <footer className="pt-24 pb-12 relative" style={{ background: "#FFFFFF", borderTop: "1px solid rgba(123,92,246,0.08)" }}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          <div className="lg:col-span-1">
            <div className="mb-6">
              <Image src="/logo.png" alt="Realtor Guide" width={180} height={50} className="object-contain" />
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#4B5563" }}>
              Premium real estate marketing agency helping developers and brokers generate high-quality leads that convert.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-xs uppercase tracking-[0.2em]" style={{ color: "#1D1D2B" }}>Quick Links</h4>
            <ul className="space-y-4">
              {["Home", "Case Studies", "Services", "Contact"].map((link) => (
                <li key={link}><a href="#" className="text-sm hover:text-purple transition-colors" style={{ color: "#4B5563" }}>{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-xs uppercase tracking-[0.2em]" style={{ color: "#1D1D2B" }}>Services</h4>
            <ul className="space-y-4">
              {["Lead Generation", "Content Production", "Website Development", "Automation"].map((link) => (
                <li key={link}><a href="#" className="text-sm hover:text-purple transition-colors" style={{ color: "#4B5563" }}>{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-xs uppercase tracking-[0.2em]" style={{ color: "#1D1D2B" }}>Connect</h4>
            <div className="flex space-x-3 mb-8">
              {[<InstagramIcon key="ig" />, <FacebookIcon key="fb" />, <LinkedinIcon key="li" />, <TwitterIcon key="tw" />].map((icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-[30px] flex items-center justify-center transition-all duration-300 hover:scale-110" style={{ background: "rgba(123,92,246,0.06)", color: "#7B5CF6", border: "1px solid rgba(123,92,246,0.08)" }}>
                  {icon}
                </a>
              ))}
            </div>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-[30px] text-sm font-bold text-white transition-all duration-300 hover:opacity-90" style={{ background: "#25D366" }}>
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs" style={{ borderTop: "1px solid rgba(123,92,246,0.06)", color: "#4B5563" }}>
          <p>&copy; {new Date().getFullYear()} Realtor Guide. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-purple transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-purple transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
