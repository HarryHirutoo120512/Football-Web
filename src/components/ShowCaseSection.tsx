"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const CanvasWrapper = dynamic(() => import("./scene/CanvasWrapper"), {
  ssr: false,
});

const variants = [
  { index: "01", name: "STRIKER", subtitle: "Official Match Ball", desc: "Built for elite touch, control, and modern match rhythm.", tags: ["Match", "Control", "Elite"], accent: "#2563EB" },
  { index: "02", name: "PHANTOM", subtitle: "Shadow Grip Edition", desc: "Low-light finish with sharper panel contrast and stealth balance.", tags: ["Stealth", "Grip", "Dark"], accent: "#8B5CF6" },
  { index: "03", name: "VELOCITY", subtitle: "Speed Control Series", desc: "Tuned for direct movement, pace, and fast strike response.", tags: ["Speed", "Strike", "Pace"], accent: "#F97316" },
  { index: "04", name: "AERO", subtitle: "Aerodynamic Match Pro", desc: "Streamlined panel logic for cleaner flight and rotational stability.", tags: ["Aero", "Flight", "Pro"], accent: "#14B8A6" },
  { index: "05", name: "TITAN", subtitle: "Elite Power Edition", desc: "Heavy presence, stronger contact, and amplified shot confidence.", tags: ["Power", "Elite", "Heavy"], accent: "#22C55E" },
];

type Props = {
  isActive: boolean;
};

export default function ShowcaseSection({ isActive }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const infoRef = useRef<HTMLDivElement>(null);
  const active = variants[activeIndex];

  const getCardStyle = (i: number): React.CSSProperties => {
    const offset = i - activeIndex;
    const absOffset = Math.abs(offset);

    if (absOffset > 2) return { display: "none" };

    return {
      transform: `translateX(${offset * 320}px) translateZ(${-absOffset * 120}px)`,
      opacity: 1 - absOffset * 0.25,
      zIndex: 10 - absOffset,
      transition: "all 0.7s cubic-bezier(0.77, 0, 0.175, 1)",
    };
  };

  useEffect(() => {
    if (!isActive) return;
    if (infoRef.current) {
      infoRef.current.style.opacity = "0";
      infoRef.current.style.transform = "translateY(20px)";
      setTimeout(() => {
        if (infoRef.current) {
          infoRef.current.style.opacity = "1";
          infoRef.current.style.transform = "translateY(0px)";
        }
      }, 100);
    }
  }, [activeIndex, isActive]);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden relative">

      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/soccer.mp4" type="video/mp4" />
      </video>

      {/* overlay */}
      <div className="absolute inset-0 bg-black/30 z-[1]" />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col h-full">

        {/* Top label */}
        <div className="flex items-center justify-between px-10 pt-8">
          <span className="text-xs uppercase text-white/30">Bluelock</span>
          <span className="text-xs text-white/20">
            {active.index} / 05
          </span>
        </div>

        {/* Cards */}
        <div className="flex-1 flex items-center justify-center">
          {variants.map((v, i) => (
            <div
              key={v.name}
              className="absolute"
              style={{ ...getCardStyle(i), width: 300, height: 220 }}
              onClick={() => setActiveIndex(i)}
            >
              <div
                className="w-full h-full rounded-2xl flex flex-col"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-[140px] h-[140px]">
                    <CanvasWrapper accent={v.accent} continuousSpin />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info */}
        <div ref={infoRef} className="px-10 pb-8">
          <p className="text-white text-2xl">{active.name}</p>
          <p className="text-white/50">{active.subtitle}</p>
        </div>

      </div>
    </div>
  );
}