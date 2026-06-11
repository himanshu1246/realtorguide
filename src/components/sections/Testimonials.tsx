"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, ArrowRight } from "lucide-react";

const videos = [
  { id: 1, src: "/CLIENT TESTIMONIALS/Client Testimonials video 1.mp4" },
  { id: 2, src: "/CLIENT TESTIMONIALS/Client Testimonials video 2.mp4" },
];

export function Testimonials({ onEnquiry }: { onEnquiry: () => void }) {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [thumbnailsReady, setThumbnailsReady] = useState<boolean[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);

  // Generate thumbnail from a video frame
  useEffect(() => {
    const ready = new Array(videos.length).fill(false);
    videoRefs.current.forEach((vid, idx) => {
      if (vid) {
        const handler = () => {
          vid.currentTime = 0.5;
        };
        const seeked = () => {
          const canvas = canvasRefs.current[idx];
          if (canvas && vid.videoWidth > 0) {
            canvas.width = vid.videoWidth;
            canvas.height = vid.videoHeight;
            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.drawImage(vid, 0, 0, canvas.width, canvas.height);
            }
            ready[idx] = true;
            setThumbnailsReady([...ready]);
          }
        };
        vid.addEventListener("loadeddata", handler);
        vid.addEventListener("seeked", seeked);
        return () => {
          vid.removeEventListener("loadeddata", handler);
          vid.removeEventListener("seeked", seeked);
        };
      }
    });
  }, []);

  const handlePlay = (id: number) => {
    videoRefs.current.forEach((v, i) => { if (v && videos[i].id !== id) { v.pause(); v.muted = true; } });
    const idx = videos.findIndex((v) => v.id === id);
    const vid = videoRefs.current[idx];
    if (vid) {
      if (activeVideo === id) { vid.pause(); vid.muted = true; setActiveVideo(null); }
      else { vid.muted = false; vid.play(); setActiveVideo(id); }
    }
  };

  return (
    <section className="py-32 md:py-40 relative overflow-hidden" style={{ background: "#1D1D2B" }}>
      <div className="absolute bottom-[10%] left-[5%] w-[300px] h-[300px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(123,92,246,0.15) 0%, transparent 70%)", filter: "blur(80px)" }} />
      <div className="absolute top-[20%] right-[10%] w-[250px] h-[250px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(52,211,153,0.1) 0%, transparent 70%)", filter: "blur(60px)" }} />

      {/* Section Header */}
      <div className="container mx-auto px-6 md:px-12 mb-20 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="w-12 h-[2px] rounded-full" style={{ background: "linear-gradient(90deg, #7B5CF6, #34D399)" }} />
          <span className="text-sm font-semibold tracking-[0.2em] uppercase" style={{ color: "#7B5CF6" }}>Testimonials</span>
          <span className="w-12 h-[2px] rounded-full" style={{ background: "linear-gradient(90deg, #34D399, #7B5CF6)" }} />
        </div>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight mb-6 text-white">
          What Our Clients <span style={{ color: "#7B5CF6" }}>Say</span>
        </h2>
        <div className="flex items-center justify-center gap-2 mb-2">
          <Volume2 className="w-4 h-4" style={{ color: "#7B5CF6" }} />
          <p className="text-sm" style={{ color: "#7B5CF6" }}>Click any video to play with sound</p>
        </div>
      </div>

      {/* Videos */}
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {videos.map((video, idx) => (
            <motion.div key={video.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: idx * 0.15 }}
              className="flex-1 relative rounded-[30px] overflow-hidden cursor-pointer group"
              style={{ background: "#000", boxShadow: "0 20px 60px rgba(0,0,0,0.4)", border: activeVideo === video.id ? "2px solid #7B5CF6" : "1px solid rgba(255,255,255,0.1)" }}
              onClick={() => handlePlay(video.id)}
            >
              {/* Thumbnail canvas */}
              <canvas
                ref={(el) => { canvasRefs.current[idx] = el; }}
                className={`w-full h-auto ${activeVideo === video.id ? "hidden" : "block"}`}
                style={{ aspectRatio: "16/9" }}
              />

              {/* Actual video */}
              <video
                ref={(el) => { videoRefs.current[idx] = el; }}
                src={video.src}
                className={`w-full h-auto ${activeVideo === video.id ? "block" : "hidden"}`}
                style={{ aspectRatio: "16/9" }}
                loop playsInline muted
                preload="auto"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Play/Pause overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${activeVideo === video.id ? "opacity-80 scale-90" : "opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100"}`} style={{ background: "rgba(123,92,246,0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.3)" }}>
                  {activeVideo === video.id ? <Pause className="w-7 h-7 text-white" /> : <Play className="w-7 h-7 text-white ml-1" />}
                </div>
              </div>

              {/* Playing badge */}
              {activeVideo === video.id && (
                <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full pointer-events-none" style={{ background: "rgba(123,92,246,0.7)", backdropFilter: "blur(8px)" }}>
                  <Volume2 className="w-3 h-3 text-white" /><span className="text-xs text-white font-semibold">Playing</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-16">
        <button onClick={onEnquiry} className="px-8 py-3 rounded-full text-sm uppercase tracking-widest inline-flex items-center gap-2 font-semibold transition-all duration-300 hover:bg-white/10" style={{ border: "1px solid rgba(123,92,246,0.3)", color: "#7B5CF6" }}>
          Share Your Story <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>

      {/* Bottom wave (matches Services background) */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#FFFFFF"/>
        </svg>
      </div>
    </section>
  );
}
