"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Sparkles } from "lucide-react";

export function Hero({ onEnquiry }: { onEnquiry: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    const ctx = gsap.context(() => {
      tl.fromTo(".hero-label", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.3 })
        .fromTo(".hero-heading-1", { y: 80, opacity: 0, rotateX: 20 }, { y: 0, opacity: 1, rotateX: 0, duration: 1.2 }, "-=0.5")
        .fromTo(".hero-heading-2", { y: 80, opacity: 0, rotateX: 20 }, { y: 0, opacity: 1, rotateX: 0, duration: 1.2 }, "-=0.8")
        .fromTo(".hero-sub", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.5")
        .fromTo(".hero-cta", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.3")
        .fromTo(".hero-stats", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 }, "-=0.3")
        .fromTo(".hero-3d-card", { scale: 0.8, opacity: 0, rotateY: -30 }, { scale: 1, opacity: 1, rotateY: 0, duration: 1.4 }, "-=1")
        .add(() => {
          // Idle animation that loops forever
          gsap.to(".hero-3d-card", {
            rotateY: 8,
            rotateX: 4,
            y: -15,
            duration: 3,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
          });
        });
    }, containerRef);

    const handlePointerMove = (e: PointerEvent) => {
      if (orbRef.current) {
        const x = (e.clientX / window.innerWidth - 0.5) * 60;
        const y = (e.clientY / window.innerHeight - 0.5) * 60;
        gsap.to(orbRef.current, { x, y, duration: 1.5, ease: "power2.out" });
      }
      // Parallax for 3D card
      const card = document.querySelector(".hero-3d-card") as HTMLElement;
      if (card) {
        // Stop the idle animation when user interacts
        gsap.killTweensOf(card, "rotateX,rotateY,y");
        const rx = (e.clientY / window.innerHeight - 0.5) * 10;
        const ry = (e.clientX / window.innerWidth - 0.5) * -10;
        gsap.to(card, { rotateX: rx, rotateY: ry, y: 0, duration: 0.5, ease: "power2.out" });
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => { ctx.revert(); window.removeEventListener("pointermove", handlePointerMove); };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen flex items-center overflow-hidden" style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #F8F7FF 50%, #F8F7FF 100%)" }}>
      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div ref={orbRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full" style={{ background: "radial-gradient(circle, rgba(123,92,246,0.25) 0%, rgba(109,40,217,0.08) 40%, transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute top-[15%] right-[5%] w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(52,211,153,0.2) 0%, transparent 70%)", filter: "blur(60px)", animation: "float 8s ease-in-out infinite" }} />
        <div className="absolute bottom-[10%] left-[10%] w-[300px] h-[300px] rounded-full" style={{ background: "radial-gradient(circle, rgba(123,92,246,0.4) 0%, transparent 70%)", filter: "blur(50px)", animation: "float 6s ease-in-out infinite reverse" }} />
        {/* 3D floating shapes */}
        <div className="absolute top-[25%] right-[20%] w-16 h-16 rounded-[30px] rotate-12 opacity-30" style={{ background: "linear-gradient(135deg, #7B5CF6, #7B5CF6)", animation: "float 5s ease-in-out infinite", boxShadow: "0 20px 40px rgba(123,92,246,0.3)" }} />
        <div className="absolute bottom-[30%] right-[30%] w-10 h-10 rounded-full opacity-25" style={{ background: "linear-gradient(135deg, #34D399, #10B981)", animation: "floatReverse 7s ease-in-out infinite", boxShadow: "0 15px 30px rgba(52,211,153,0.3)" }} />
        <div className="absolute top-[65%] left-[8%] w-12 h-12 rounded-[30px] rotate-45 opacity-20" style={{ background: "linear-gradient(135deg, #7B5CF6, #7B5CF6)", animation: "float 9s ease-in-out infinite", boxShadow: "0 15px 30px rgba(123,92,246,0.2)" }} />
      </div>

      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #7B5CF6 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 pt-28 pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left */}
          <div className="flex-1 max-w-2xl">
            <div className="hero-label inline-flex items-center gap-3 mb-8 opacity-0">
              <span className="w-12 h-[2px] rounded-full" style={{ background: "linear-gradient(90deg, #7B5CF6, #34D399)" }} />
              <span className="text-sm font-semibold tracking-[0.2em] uppercase" style={{ color: "#7B5CF6" }}>Real Estate Marketing Agency</span>
            </div>

            <h1 className="hero-heading-1 text-5xl md:text-7xl lg:text-[5.5rem] font-heading font-bold leading-[0.95] tracking-tight mb-2 opacity-0" style={{ color: "#1D1D2B" }}>
              HELLO REALTORS,
            </h1>
            <h1 className="hero-heading-2 text-5xl md:text-7xl lg:text-[5.5rem] font-heading font-bold leading-[0.95] tracking-tight mb-8 opacity-0">
              <span className="gradient-text">GENERATE LEADS</span><br />
              <span className="gradient-text">THAT CONVERT.</span>
            </h1>

            <p className="hero-sub text-lg md:text-xl max-w-xl mb-10 leading-relaxed opacity-0" style={{ color: "#4B5563" }}>
              Stop using those old listing sites. We build premium marketing systems that attract high-quality buyers and close deals faster.
            </p>

            <div className="hero-cta flex flex-col sm:flex-row gap-4 mb-16 opacity-0">
              <button onClick={onEnquiry} className="btn-primary px-10 py-5 rounded-full text-sm uppercase tracking-widest inline-flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" /> Book A Strategy Call
              </button>
              <a href="#process" className="btn-secondary px-10 py-5 rounded-full text-sm uppercase tracking-widest inline-flex items-center justify-center">
                View Our Process
              </a>
            </div>

            <div className="flex flex-wrap gap-12 md:gap-16">
              {[{ value: "150+", label: "Projects Delivered" }, { value: "50K+", label: "Leads Generated" }, { value: "3X", label: "Average ROI" }].map((stat, i) => (
                <div key={i} className="hero-stats opacity-0">
                  <div className="text-4xl md:text-5xl font-heading font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm uppercase tracking-widest mt-2" style={{ color: "#6B7280" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - 3D card */}
          <div className="flex-1 flex justify-center hero-3d-card opacity-0" style={{ perspective: "1000px" }}>
            <div className="relative w-[320px] md:w-[380px] rounded-[30px] overflow-hidden" style={{ boxShadow: "0 30px 80px rgba(123,92,246,0.2), 0 0 0 1px rgba(123,92,246,0.08)", transform: "perspective(1000px) rotateY(-5deg) rotateX(3deg)", transition: "transform 0.3s ease-out" }}>
              <div className="p-8" style={{ background: "linear-gradient(160deg, #1D1D2B 0%, #312E81 100%)" }}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-3 h-3 rounded-full" style={{ background: "#F87171" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "#FBBF24" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "#34D399" }} />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[30px] flex items-center justify-center" style={{ background: "rgba(123,92,246,0.2)" }}>
                      <svg className="w-5 h-5" style={{ color: "#7B5CF6" }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    </div>
                    <div>
                      <p className="text-xs" style={{ color: "#A5B4FC" }}>Total Leads</p>
                      <p className="text-2xl font-bold text-white font-heading">12,847</p>
                    </div>
                  </div>
                  <div className="h-[1px]" style={{ background: "rgba(255,255,255,0.06)" }} />
                  <div className="flex justify-between text-sm">
                    <div><p className="text-xs mb-1" style={{ color: "#A5B4FC" }}>Conversion</p><p className="font-bold text-white">18.4%</p></div>
                    <div><p className="text-xs mb-1" style={{ color: "#A5B4FC" }}>Cost/Lead</p><p className="font-bold text-white">₹42</p></div>
                    <div><p className="text-xs mb-1" style={{ color: "#A5B4FC" }}>ROI</p><p className="font-bold" style={{ color: "#34D399" }}>342%</p></div>
                  </div>
                  <div className="h-[1px]" style={{ background: "rgba(255,255,255,0.06)" }} />
                  {/* Mini chart bars */}
                  <div className="flex items-end gap-2 h-20 pt-2">
                    {[35, 55, 40, 70, 50, 85, 65, 90, 75, 95, 80, 100].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t-sm transition-all" style={{ height: `${h}%`, background: i >= 9 ? "linear-gradient(to top, #7B5CF6, #7B5CF6)" : "rgba(123,92,246,0.2)" }} />
                    ))}
                  </div>
                  <p className="text-xs text-center" style={{ color: "#A5B4FC" }}>Last 12 Months Performance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F8F7FF"/>
        </svg>
      </div>
    </section>
  );
}
