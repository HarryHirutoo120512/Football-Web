"use client";

import { useRef, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { Oswald } from "next/font/google";
import gsap from "gsap";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["700"],
});

const CanvasWrapper = dynamic(() => import("./scene/CanvasWrapper"), {
  ssr: false,
});

type Ball = {
  name: string;
  left: string;
  right: string;
  accent: string;
  price: string;
  label: string;
};

type Props = {
  ballVariants: Ball[];
  currentIndex: number;
  setCurrentIndex: (fn: (prev: number) => number) => void;
  onAddToCart: () => void;
};

export default function HeroSection({
  ballVariants,
  currentIndex,
  setCurrentIndex,
  onAddToCart,
}: Props) {
  const currentBall = ballVariants[currentIndex];
  const leftLetters = useMemo(() => currentBall.left.split(""), [currentBall.left]);
  const rightLetters = useMemo(() => currentBall.right.split(""), [currentBall.right]);

  const leftTextRef = useRef<HTMLSpanElement>(null);
  const rightTextRef = useRef<HTMLSpanElement>(null);
  const ballContainerRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLParagraphElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const promoRef = useRef<HTMLDivElement>(null);
  const ctaWrapRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const directionRef = useRef<"left" | "right">("right");

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      const headingLetters = gsap.utils.toArray<HTMLElement>(".hero-letter");
      gsap.fromTo(
        headingLetters,
        { opacity: 0, y: 24, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.05,
          ease: "power3.out",
        },
      );
      gsap.fromTo(
        ballContainerRef.current,
        { opacity: 0, scale: 0.7 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
          delay: 0.2,
        },
      );
      gsap.fromTo(
        [priceRef.current, labelRef.current],
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.4,
        },
      );
      gsap.fromTo(
        promoRef.current,
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.55, ease: "power3.out", delay: 0.45 },
      );
      gsap.fromTo(
        ctaWrapRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.65, ease: "power3.out", delay: 0.65 },
      );
      gsap.fromTo(
        paginationRef.current,
        { opacity: 0, x: 24 },
        { opacity: 1, x: 0, duration: 0.55, ease: "power3.out", delay: 0.75 },
      );
      return;
    }

    const dir = directionRef.current;
    const xOut = dir === "right" ? -80 : 80;
    const xIn = dir === "right" ? 80 : -80;

    const tl = gsap.timeline();

    tl.to([leftTextRef.current, rightTextRef.current], {
      opacity: 0,
      x: xOut,
      filter: "blur(8px)",
      duration: 0.28,
      ease: "power2.in",
    })
      .to(
        ballContainerRef.current,
        {
          opacity: 0,
          scale: 0.84,
          rotate: dir === "right" ? -10 : 10,
          duration: 0.22,
          ease: "power2.in",
        },
        "<",
      )
      .to(
        [priceRef.current, labelRef.current],
        {
          opacity: 0,
          x: xOut * 0.5,
          filter: "blur(6px)",
          duration: 0.22,
          ease: "power2.in",
        },
        "<",
      )
      .set([leftTextRef.current, rightTextRef.current], { x: xIn, filter: "blur(8px)" })
      .set(ballContainerRef.current, {
        scale: 0.84,
        rotate: dir === "right" ? 10 : -10,
      })
      .set([priceRef.current, labelRef.current], { x: xIn * 0.5, filter: "blur(6px)" })
      .to([leftTextRef.current, rightTextRef.current], {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        duration: 0.45,
        ease: "power3.out",
      })
      .to(
        ballContainerRef.current,
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.55,
          ease: "back.out(1.35)",
        },
        "<0.04",
      )
      .to(
        [priceRef.current, labelRef.current],
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.42,
          stagger: 0.05,
          ease: "power2.out",
        },
        "<0.08",
      );
  }, [currentIndex]);


  const handlePrev = () => {
    directionRef.current = "left";
    setCurrentIndex((prev) =>
      prev === 0 ? ballVariants.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    directionRef.current = "right";
    setCurrentIndex((prev) =>
      prev === ballVariants.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <section className="relative flex flex-1 flex-col overflow-hidden">
      {/* Promotion video */}
      <div ref={promoRef} className="mt-3 flex items-center gap-2 sm:mt-4 sm:gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#94A3B8] sm:h-10 sm:w-10">
          <span className="text-white text-xs">▶</span>
        </div>
        <span className="text-[10px] leading-tight text-[#94A3B8] sm:text-xs">
          Promotion
          <br />
          video
        </span>
      </div>

      {/* Big text + 3D ball */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden">
        {/* Mobile composition */}
        <div className="absolute inset-0 flex flex-col items-center justify-start overflow-visible pt-2 sm:hidden">
          <div
            ref={ballContainerRef}
            className="relative z-10 flex items-center justify-center overflow-visible"
            style={{ width: "126px", height: "126px" }}
          >
            <div className="h-[126px] w-[126px] -translate-y-1">
              <CanvasWrapper accent={currentBall.accent} animationTrigger={currentIndex} />
            </div>
          </div>

          <div className="relative mt-4 flex w-full items-center justify-center">
            <span
              ref={leftTextRef}
              className="absolute left-1/2 top-1/2 -translate-x-[92%] -translate-y-1/2 font-extrabold uppercase text-[#5a5a5a] leading-none tracking-[-0.08em]"
              style={{ fontSize: "84px" }}
            >
              {leftLetters.map((letter, index) => (
                <span key={`mobile-left-${index}`} className="hero-letter inline-block">
                  {letter}
                </span>
              ))}
            </span>
            <span
              ref={rightTextRef}
              className="absolute left-1/2 top-1/2 -translate-x-[4%] -translate-y-1/2 font-extrabold uppercase text-[#5a5a5a] leading-none tracking-[-0.08em]"
              style={{ fontSize: "84px" }}
            >
              {rightLetters.map((letter, index) => (
                <span key={`mobile-right-${index}`} className="hero-letter inline-block">
                  {letter}
                </span>
              ))}
            </span>
          </div>
        </div>

        {/* Tablet/Desktop composition */}
        <div className="absolute inset-0 hidden pointer-events-none sm:block">
          <span
            ref={leftTextRef}
            className="absolute left-[5%] top-1/2 -translate-y-1/2 font-extrabold uppercase text-[#5a5a5a] whitespace-nowrap select-none leading-none tracking-[-0.08em] sm:left-[6%] md:left-[7%]"
            style={{ fontSize: "clamp(54px, 14.2vw, 220px)" }}
          >
            {leftLetters.map((letter, index) => (
              <span key={`desktop-left-${index}`} className="hero-letter inline-block">
                {letter}
              </span>
            ))}
          </span>

          <span
            ref={rightTextRef}
            className="absolute right-[5%] top-1/2 -translate-y-1/2 font-extrabold uppercase text-[#5a5a5a] whitespace-nowrap select-none leading-none tracking-[-0.08em] sm:right-[6%] md:right-[7%]"
            style={{ fontSize: "clamp(54px, 14.2vw, 220px)" }}
          >
            {rightLetters.map((letter, index) => (
              <span key={`desktop-right-${index}`} className="hero-letter inline-block">
                {letter}
              </span>
            ))}
          </span>
        </div>

        <div
          ref={ballContainerRef}
          className="absolute left-[51.8%] top-[53%] z-10 hidden items-center justify-center -translate-x-1/2 -translate-y-1/2 sm:flex"
          style={{
            width: "clamp(140px, 19.2vw, 320px)",
            height: "clamp(140px, 19.2vw, 320px)",
          }}
        >
          <CanvasWrapper accent={currentBall.accent} animationTrigger={currentIndex} />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative -mt-2 flex flex-col gap-4 pb-3 pt-0 sm:mt-0 sm:pb-4 md:flex-row md:items-end md:justify-between md:gap-0 md:pt-2">
        {/* Mobile layout */}
        <div className="flex flex-col items-center sm:hidden">
          <p
            ref={priceRef}
            className="text-[44px] font-medium leading-none transition-colors duration-500"
            style={{ color: currentBall.accent }}
          >
            {currentBall.price}
          </p>
          <p
            ref={labelRef}
            className="mt-4 text-center text-[11px] uppercase tracking-[0.16em] text-[#94A3B8]"
          >
            {currentBall.label}
          </p>
          <div ref={paginationRef} className="absolute right-0 top-[-110px] flex flex-col items-center gap-4">
            <span
              className="text-[11px] leading-none transition-colors duration-500"
              style={{
                color: currentBall.accent,
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                letterSpacing: "0.14em",
              }}
            >
              {String(currentIndex + 1).padStart(2, "0")}/05
            </span>
            <button
              onClick={handlePrev}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#5a5a5a] text-[#b8c0cc] transition-all duration-300 hover:border-white hover:text-white"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#5a5a5a] text-[#b8c0cc] transition-all duration-300 hover:border-white hover:text-white"
            >
              →
            </button>
          </div>
          <div ref={ctaWrapRef} className="mt-8 w-full">
            <button
              onClick={onAddToCart}
              className="w-full rounded-[8px] px-8 py-4 text-[15px] font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 active:scale-95"
              style={{
                backgroundColor: currentBall.accent,
                boxShadow: `0 0 26px ${currentBall.accent}55`,
              }}
            >
              Add to cart
            </button>
          </div>
        </div>

        {/* Tablet/Desktop layout */}
        <>
          <div className="hidden min-w-0 sm:block md:min-w-[240px]">
            <p
              ref={priceRef}
              className="text-[28px] font-bold leading-none transition-colors duration-500 sm:text-[32px] md:text-[36px]"
              style={{ color: currentBall.accent }}
            >
              {currentBall.price}
            </p>
            <p
              ref={labelRef}
              className="mt-2 max-w-[260px] text-[10px] uppercase tracking-[0.14em] text-[#94A3B8] sm:max-w-[320px] sm:text-[11px] md:text-[12px] md:tracking-[0.18em]"
            >
              {currentBall.label}
            </p>
            <p className="mt-4 text-[11px] uppercase tracking-[0.12em] text-[#555]">En</p>
          </div>

          <div ref={ctaWrapRef} className="order-3 hidden self-center sm:block md:absolute md:bottom-1 md:left-1/2 md:-translate-x-1/2">
            <button
              onClick={onAddToCart}
              className="rounded-[8px] px-10 py-3 text-[13px] font-bold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:scale-105 active:scale-95 sm:px-12 sm:py-3.5 sm:text-[14px] md:px-14 md:py-4 md:text-[15px]"
              style={{
                backgroundColor: currentBall.accent,
                boxShadow: `0 0 26px ${currentBall.accent}55`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 48px ${currentBall.accent}88, 0 0 80px ${currentBall.accent}22`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 0 26px ${currentBall.accent}55`;
              }}
            >
              Add to cart
            </button>
          </div>

          <div ref={paginationRef} className="order-2 hidden items-center gap-3 self-start sm:flex sm:gap-4 md:order-none md:gap-5 md:self-end">
            <span
              className="text-[12px] leading-none transition-colors duration-500"
              style={{
                color: currentBall.accent,
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                letterSpacing: "0.14em",
              }}
            >
              {String(currentIndex + 1).padStart(2, "0")}/05
            </span>
            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#5a5a5a] text-[#b8c0cc] transition-all duration-300 hover:scale-110 hover:border-white hover:text-white hover:shadow-[0_0_18px_rgba(255,255,255,0.12)]"
              >
                ←
              </button>
              <button
                onClick={handleNext}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#5a5a5a] text-[#b8c0cc] transition-all duration-300 hover:scale-110 hover:border-white hover:text-white hover:shadow-[0_0_18px_rgba(255,255,255,0.12)]"
              >
                →
              </button>
            </div>
          </div>
        </>
      </div>
    </section>
  );
}
