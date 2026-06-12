"use client";

import { useState, useRef } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";

const videos = [
  { id: 1, src: "/PRODUCTION SHOWCASE/number 1.mp4", title: "Ali Abdal", category: "Fully customizable" },
  { id: 2, src: "/PRODUCTION SHOWCASE/number 2.mp4", title: "Luxury Villa Tour", category: "Real Estate" },
  { id: 3, src: "/PRODUCTION SHOWCASE/number 3.mp4", title: "City Apartment", category: "Cinematic" },
  { id: 4, src: "/PRODUCTION SHOWCASE/number 4.MP4", title: "Modern Estate", category: "Walkthrough" },
  { id: 5, src: "/PRODUCTION SHOWCASE/number 5.mp4", title: "Penthouse View", category: "Lifestyle" },
];

export function Production({ onEnquiry }: { onEnquiry?: () => void }) {
  const [activeIndex, setActiveIndex] = useState(Math.floor(videos.length / 2));
  const [playingIndices, setPlayingIndices] = useState<Set<number>>(new Set());
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const toggleVideo = (index: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    if (index !== activeIndex) {
      setActiveIndex(index);
      // Pause all when changing active index
      videoRefs.current.forEach(v => v?.pause());
      setPlayingIndices(new Set());
      return;
    }

    const video = videoRefs.current[index];
    if (!video) return;

    if (video.paused) {
      // Pause all other videos
      videoRefs.current.forEach((v, i) => {
        if (v && i !== index) {
          v.pause();
        }
      });
      video.play();
      video.muted = false;
      setPlayingIndices(new Set([index]));
    } else {
      video.pause();
      setPlayingIndices(new Set());
    }
  };

  const navCarousel = (direction: number) => {
    const newIndex = activeIndex + direction;
    if (newIndex >= 0 && newIndex < videos.length) {
      setActiveIndex(newIndex);
      videoRefs.current.forEach(v => v?.pause());
      setPlayingIndices(new Set());
    }
  };

  const activeVideo = videos[activeIndex];

  return (
    <section className="production relative" id="production" style={{ background: "#0f0f11", padding: "100px 0", overflow: "hidden" }}>
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none" style={{ background: "rgba(123,92,246,0.15)" }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="reveal py-12 text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-10 h-[2px]" style={{ background: "linear-gradient(90deg, #7B5CF6, transparent)" }} />
            <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: "#7B5CF6" }}>
              All your Favourite Templates
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight" style={{ color: "white", fontFamily: "Syne, sans-serif" }}>
            Content That Sells <span style={{ color: "#7B5CF6" }}>Properties.</span>
          </h2>

          
          <button 
            onClick={onEnquiry}
            className="px-8 py-3 rounded-[30px] font-semibold transition-all"
            style={{
              background: "transparent",
              color: "#7B5CF6",
              border: "2px solid rgba(123,92,246,0.4)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(123,92,246,0.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            Get A Quote
          </button>
        </div>
      </div>

      {/* 3D Carousel */}
      <div className="relative w-full flex flex-col items-center overflow-hidden pb-24" style={{ perspective: "1500px" }}>
        <div className="relative w-full max-w-[1200px] h-[600px] flex justify-center items-center">
          {videos.map((video, index) => {
            const diff = index - activeIndex;
            const absDiff = Math.abs(diff);
            const direction = diff > 0 ? 1 : -1;
            const isActive = diff === 0;

            const translateX = isActive ? 0 : direction * (180 + (absDiff > 1 ? (absDiff - 1) * 140 : 0));
            const scale = isActive ? 1 : 1 - (absDiff * 0.15);
            const zIndex = isActive ? 10 : 10 - absDiff;
            const opacity = isActive ? 1 : 1 - (absDiff * 0.2);

            return (
              <div
                key={video.id}
                className="absolute overflow-hidden rounded-[20px] bg-[#111] cursor-pointer"
                style={{
                  width: "320px",
                  height: "560px",
                  transform: `translateX(${translateX}px) scale(${scale})`,
                  zIndex,
                  opacity,
                  transition: "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
                  boxShadow: isActive ? "0 25px 50px rgba(123,92,246,0.4)" : "0 15px 35px rgba(0,0,0,0.4)",
                  willChange: "transform, opacity, z-index"
                }}
                onClick={(e) => toggleVideo(index, e)}
              >
                <video
                  ref={(el) => { videoRefs.current[index] = el; }}
                  src={video.src}
                  loop
                  playsInline
                  muted
                  className="w-full h-full object-cover transition-opacity duration-300"
                  style={{ opacity: isActive ? 1 : 0.6 }}
                />

                {/* Play Button */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center pointer-events-none transition-all duration-300 z-10"
                  style={{
                    background: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(10px)",
                    border: "2px solid rgba(255, 255, 255, 0.3)",
                    opacity: playingIndices.has(index) ? 0 : 1,
                    transform: `translate(-50%, -50%) scale(${playingIndices.has(index) ? 0.8 : 1})`,
                  }}
                >
                  <Play className="w-5 h-5 text-white ml-[3px]" fill="white" />
                </div>

                {/* Video Info Overlay */}
                <div

              </div>
            );
          })}
        </div>

        {/* Control Bar */}
        <div className="flex items-center justify-between bg-[#1f2125] border border-white/10 rounded-[40px] p-2 w-full max-w-[340px] mt-8 z-20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <button 
            onClick={() => navCarousel(-1)}
            disabled={activeIndex === 0}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3 px-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-black flex-shrink-0">
              <video src={activeVideo.src} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-white text-sm font-semibold leading-tight">{activeVideo.title}</span>
              <span className="text-[#7B5CF6] text-[0.7rem] font-medium">{activeVideo.category}</span>
            </div>
          </div>

          <button 
            onClick={() => navCarousel(1)}
            disabled={activeIndex === videos.length - 1}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-[3] pointer-events-none">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="block w-full h-auto">
          <path d="M0 60L48 54C96 48 192 36 288 36C384 36 480 48 576 54C672 60 768 60 864 54C960 48 1056 36 1152 30C1248 24 1344 24 1392 24L1440 24V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z" fill="#FFFFFF"/>
        </svg>
      </div>
    </section>
  );
}
