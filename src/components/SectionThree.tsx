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

export default function SectionThree({ accent, isActive }: Props) {
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
      gsap.set(textTargets, { opacity: 0, x: 40, filter: "blur(6px)" });
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
    <div className="flex h-full flex-col overflow-hidden rounded-none bg-[#050816] transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] sm:rounded-[28px] lg:flex-row">
      {/* Left — 3D ball */}
      <div className="relative order-1 h-[28vh] w-full overflow-hidden sm:h-[34vh] md:h-[38vh] lg:order-1 lg:h-auto lg:w-[70%]">
        {/* Mobile */}
        <div className="absolute inset-0 sm:hidden" />

        {/* Tablet / Desktop */}
        <div
          ref={ballRef}
          className="absolute hidden sm:block sm:left-[-650px] sm:top-1/2 sm:h-[840px] sm:w-[840px] lg:left-[-450px] lg:h-[840px] lg:w-[840px] xl:left-[-370px] xl:h-[840px] xl:w-[840px]"
          style={{
            opacity: isActive ? 1 : 0,
            transform: "translateY(-50%) translateX(0px)",
          }}
        >
          <CanvasWrapper
            key={`${isActive}-${accent}`}
            accent={accent}
            size="normal"
            animationTrigger={0}
            continuousSpin={true}
            initialRotationX={0}
            initialRotationY={Math.PI * 0.52}
          />
        </div>
      </div>

      {/* Right — text */}
      <div className="order-2 ml-auto flex w-full flex-col justify-center px-5 py-6 text-right sm:px-8 md:w-[42%] md:px-10 lg:order-2 lg:w-[32%] lg:px-[40px] lg:py-[42px] xl:px-[44px]">
        <div
          ref={labelRef}
          className="mb-7 flex items-center justify-end gap-3"
          style={{ opacity: 0, transform: "translateX(40px)" }}
        >
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: accent }}
          />
          <span
            className="text-[12px] font-bold uppercase tracking-[0.18em]"
            style={{ color: accent }}
          >
            Flight Dynamics
          </span>
        </div>

        <div
          ref={headingRef}
          style={{ opacity: 0, transform: "translateX(40px)" }}
        >
          <h2
            className="mb-8 font-black uppercase leading-[0.92] text-white sm:mb-10 lg:mb-12"
            style={{
              fontSize: "clamp(34px, 4.8vw, 76px)",
              letterSpacing: "-0.05em",
            }}
          >
            PERFECT
            <br />
            FLIGHT
          </h2>
        </div>

        <div
          ref={stat1Ref}
          className="mb-9 border-r border-white/20 pr-6"
          style={{ opacity: 0, transform: "translateX(40px)" }}
        >
          <div className="flex items-end justify-end gap-1">
            <span className="text-[40px] font-black leading-none text-white sm:text-[46px] lg:text-[54px]">
              98%
            </span>
          </div>
          <p
            className="mb-3 mt-2 text-[12px] font-bold uppercase tracking-[0.18em]"
            style={{ color: accent }}
          >
            Air Stability
          </p>
          <p className="ml-auto max-w-[250px] text-[13px] leading-6 text-white/40 sm:text-[14px] sm:leading-7">
            Balanced panel geometry maintains cleaner trajectory under powerful
            strikes.
          </p>
        </div>

        <div
          ref={stat2Ref}
          className="border-r border-white/20 pr-6"
          style={{ opacity: 0, transform: "translateX(40px)" }}
        >
          <div className="flex items-end justify-end gap-1">
            <span className="text-[40px] font-black leading-none text-white sm:text-[46px] lg:text-[54px]">
              360
            </span>
            <span className="pb-1 text-[16px] font-bold uppercase text-white sm:text-[18px] lg:text-[20px]">
              °
            </span>
          </div>
          <p
            className="mb-3 mt-2 text-[12px] font-bold uppercase tracking-[0.18em]"
            style={{ color: accent }}
          >
            Rotational Control
          </p>
          <p className="ml-auto max-w-[250px] text-[13px] leading-6 text-white/40 sm:text-[14px] sm:leading-7">
            Surface friction and seam structure improve spin readability and
            touch feedback.
          </p>
        </div>

        <p className="mt-10 text-[11px] uppercase tracking-[0.12em] text-white/20">
          En
        </p>
      </div>
    </div>
  );
}
