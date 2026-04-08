"use client";

import { useEffect, useRef } from "react";

type Props = {
  accent: string;
};

export default function CustomCursor({ accent }: Props) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let curX = 0;
    let curY = 0;

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top = `${mouseY}px`;
      }
    };

    const animate = () => {
      curX += (mouseX - curX) * 0.12;
      curY += (mouseY - curY) * 0.12;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${curX}px`;
        cursorRef.current.style.top = `${curY}px`;
      }

      requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    const handleEnter = () => {
      cursorRef.current?.classList.add("scale-150");
      dotRef.current?.classList.add("opacity-0");
    };
    const handleLeave = () => {
      cursorRef.current?.classList.remove("scale-150");
      dotRef.current?.classList.remove("opacity-0");
    };

    const interactives = document.querySelectorAll("button, a, [data-cursor]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, [accent]);

  return (
    <>
      {/* Ring — lag theo chuột */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] hidden -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 sm:block"
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: `1.5px solid ${accent}`,
          top: 0,
          left: 0,
        }}
      />
      {/* Dot — theo chuột ngay lập tức */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] hidden -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 sm:block"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: accent,
          top: 0,
          left: 0,
        }}
      />
    </>
  );
}