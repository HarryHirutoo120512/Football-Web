"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";

const CanvasWrapper = dynamic(() => import("./scene/CanvasWrapper"), {
  ssr: false,
});

type Props = {
  accent: string;
  isActive: boolean;
};

export default function TechnologySection({ accent, isActive }: Props) {
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stat1Ref = useRef<HTMLDivElement>(null);
  const stat2Ref = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const textTargets = [
      labelRef.current,
      headingRef.current,
      stat1Ref.current,
      stat2Ref.current,
    ].filter(Boolean);

    if (!isActive) {
      gsap.set(textTargets, { opacity: 0, x: -40, filter: "blur(6px)" });
      if (ballRef.current) {
        gsap.set(ballRef.current, {
          opacity: 0,
          x: isMobile ? 0 : 600,
          rotate: isMobile ? 0 : 14,
        });
      }
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (ballRef.current) {
      if (isMobile) {
        tl.fromTo(
          ballRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.45 },
        );
      } else {
        tl.fromTo(
          ballRef.current,
          { opacity: 0, x: 600, rotate: 14, scale: 0.92 },
          { opacity: 1, x: -30, rotate: 0, scale: 1, duration: 0.52 },
        ).to(ballRef.current, {
          x: 0,
          duration: 0.38,
          ease: "back.out(1.3)",
        });
      }
    }

    tl.to(
      textTargets,
      {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        duration: 0.55,
        stagger: 0.12,
      },
      isMobile ? "<0.08" : "<0.04",
    );
  }, [isActive]);

  return (
    <div
      className="flex h-full flex-col overflow-hidden rounded-none bg-[#050816] transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] sm:rounded-[28px] lg:flex-row"
    >
      {/* Left — text */}
      <div className="order-2 flex flex-1 flex-col justify-center px-5 py-6 sm:px-8 md:px-10 lg:order-1 lg:px-[54px] lg:py-[42px]">
        {/* Label */}
        <div
          ref={labelRef}
          className="mb-7 flex items-center gap-3"
          style={{ opacity: 0, transform: "translateX(-40px)" }}
        >
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: accent }} />
          <span
            className="text-[12px] font-bold uppercase tracking-[0.18em]"
            style={{ color: accent }}
          >
            Performance Metrics
          </span>
        </div>

        {/* Heading */}
        <div ref={headingRef} style={{ opacity: 0, transform: "translateX(-40px)" }}>
          <h2
            className="mb-8 font-black uppercase leading-[0.92] text-white sm:mb-10 lg:mb-12"
            style={{ fontSize: "clamp(42px,7vw,102px)", letterSpacing: "-0.05em" }}
          >
            ELITE
            <br />
            CONTROL
          </h2>
        </div>

        {/* Stat 1 */}
        <div
          ref={stat1Ref}
          className="mb-9 border-l border-white/20 pl-6"
          style={{ opacity: 0, transform: "translateX(-40px)" }}
        >
          <span className="text-[40px] font-black leading-none text-white sm:text-[46px] lg:text-[54px]">100%</span>
          <p
            className="mb-3 mt-2 text-[12px] font-bold uppercase tracking-[0.18em]"
            style={{ color: accent }}
          >
            Microfiber Composite
          </p>
          <p className="max-w-[320px] text-[13px] leading-6 text-white/40 sm:text-[14px] sm:leading-7">
            Exclusive coating material providing superior grip management in all weather conditions.
          </p>
        </div>

        {/* Stat 2 */}
        <div
          ref={stat2Ref}
          className="border-l border-white/20 pl-6"
          style={{ opacity: 0, transform: "translateX(-40px)" }}
        >
          <div className="flex items-end gap-1">
            <span className="text-[40px] font-black leading-none text-white sm:text-[46px] lg:text-[54px]">0.5</span>
            <span className="pb-1 text-[16px] font-bold uppercase text-white sm:text-[18px] lg:text-[20px]">mm</span>
          </div>
          <p
            className="mb-3 mt-2 text-[12px] font-bold uppercase tracking-[0.18em]"
            style={{ color: accent }}
          >
            Pebble Depth
          </p>
          <p className="max-w-[320px] text-[13px] leading-6 text-white/40 sm:text-[14px] sm:leading-7">
            Optimized surface texture for precision handling and rotational feedback.
          </p>
        </div>

        <p className="mt-10 text-[11px] uppercase tracking-[0.12em] text-white/20">En</p>
      </div>

      {/* Right — 3D ball */}
      <div className="relative order-1 h-[28vh] w-full overflow-hidden sm:h-[34vh] md:h-[38vh] lg:order-2 lg:h-auto lg:w-[46%]">
        {/* Mobile */}
        <div className="absolute inset-0 sm:hidden" />

        {/* Tablet / Desktop */}
        <div
          ref={ballRef}
          className="absolute hidden sm:block sm:right-[-185px] sm:top-1/2 sm:h-[420px] sm:w-[420px] lg:right-[-285px] lg:h-[700px] lg:w-[700px] xl:right-[-340px] xl:h-[840px] xl:w-[840px]"
          style={{
            opacity: isActive ? 1 : 0,
            transform: "translateY(-50%) translateX(0px)",
          }}
        >
          <CanvasWrapper
            accent={accent}
            size="normal"
            animationTrigger={0}
            continuousSpin={true}
          />
        </div>
      </div>
    </div>
  );
}