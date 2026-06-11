"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Clients", href: "#clients" },
  { label: "Our Work", href: "#production" },
  { label: "Process", href: "#process" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export function Navbar({ onEnquiry }: { onEnquiry: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
        style={{
          background: scrolled ? "rgba(248,246,255,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(123,92,246,0.08)" : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 30px rgba(123,92,246,0.06)" : "none",
        }}
      >
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Realtor Guide"
                width={140}
                height={40}
                className="object-contain"
                style={{ width: "auto", height: "36px" }}
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium transition-colors duration-300 hover:text-purple"
                  style={{ color: "#4B5563" }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-4">
              <button
                onClick={onEnquiry}
                className="hidden sm:inline-flex items-center px-5 py-2 rounded-full text-xs font-bold text-white transition-all duration-300 hover:shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #7B5CF6, #7B5CF6)",
                  boxShadow: "0 4px 15px rgba(123,92,246,0.3)",
                }}
              >
                Enquire Now
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-10 h-10 rounded-[30px] flex items-center justify-center transition-all"
                style={{ background: "rgba(123,92,246,0.06)", color: "#7B5CF6" }}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[99] pt-20 lg:hidden" style={{ background: "rgba(248,246,255,0.98)", backdropFilter: "blur(20px)" }}>
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-bold py-4 border-b transition-colors hover:text-purple"
                  style={{ color: "#1D1D2B", borderColor: "rgba(123,92,246,0.08)" }}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <button
              onClick={() => { setMobileOpen(false); onEnquiry(); }}
              className="w-full mt-8 py-3 rounded-[30px] text-xs uppercase tracking-widest font-bold text-white"
              style={{ background: "linear-gradient(135deg, #7B5CF6, #7B5CF6)", boxShadow: "0 8px 25px rgba(123,92,246,0.3)" }}
            >
              Enquire Now
            </button>
          </div>
        </div>
      )}
    </>
  );
}
