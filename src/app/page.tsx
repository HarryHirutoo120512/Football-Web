"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CartDrawer from "@/components/CartDrawer";
import CustomCursor from "@/components/CustomCursor";
import TechnologySection from "@/components/TechnologySection";
import SectionThree from "@/components/SectionThree";
import ShowcaseSection from "@/components/ShowCaseSection"; // ✅ thêm

const ballVariants = [
  {
    name: "STRIKER",
    left: "STRI",
    right: "KER",
    accent: "#2563EB",
    price: "$129.99",
    label: "Size: 5 · Official Match Ball",
  },
  {
    name: "PHANTOM",
    left: "PHA",
    right: "NTOM",
    accent: "#8B5CF6",
    price: "$139.99",
    label: "Size: 5 · Shadow Grip Edition",
  },
  {
    name: "VELOCITY",
    left: "VEL",
    right: "CITY",
    accent: "#F97316",
    price: "$144.99",
    label: "Size: 5 · Speed Control Series",
  },
  {
    name: "AERO",
    left: "A",
    right: "ERO",
    accent: "#14B8A6",
    price: "$149.99",
    label: "Size: 5 · Aerodynamic Match Pro",
  },
  {
    name: "TITAN",
    left: "TIT",
    right: "AN",
    accent: "#22C55E",
    price: "$159.99",
    label: "Size: 5 · Elite Power Edition",
  },
];

type CartItem = {
  name: string;
  edition: string;
  color: string;
  price: string;
  accent: string;
};

// ❗ đổi từ 3 -> 4
const TOTAL_SECTIONS = 4;

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentSection, setCurrentSection] = useState(0);
  const isScrolling = useRef(false);

  const currentBall = ballVariants[currentIndex];

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling.current) return;

      isScrolling.current = true;

      if (e.deltaY > 0) {
        setCurrentSection((prev) => Math.min(prev + 1, TOTAL_SECTIONS - 1));
      } else {
        setCurrentSection((prev) => Math.max(prev - 1, 0));
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, 800);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  const handleAddToCart = () => {
    setCartItems((prev) => [
      ...prev,
      {
        name: currentBall.name,
        edition: currentBall.label,
        color: currentBall.accent,
        price: currentBall.price,
        accent: currentBall.accent,
      },
    ]);
  };

  const handleRemove = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <CustomCursor accent={currentBall.accent} />

      <main
        className="h-screen overflow-hidden transition-colors duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]"
        style={{ backgroundColor: currentBall.accent }}
      >
        <div
          className="flex flex-col transition-transform duration-[950ms] ease-[cubic-bezier(0.77,0,0.175,1)] will-change-transform"
          style={{
            height: `${TOTAL_SECTIONS * 100}vh`,
            transform: `translateY(-${currentSection * 100}vh)`,
          }}
        >
          {/* SECTION 1 */}
          <div
            className="flex h-screen flex-col p-0 sm:p-3 md:p-4 transition-all duration-[850ms] ease-[cubic-bezier(0.77,0,0.175,1)]"
            style={{
              opacity: currentSection === 0 ? 1 : 0.82,
              transform: currentSection === 0 ? "scale(1)" : "scale(0.985)",
            }}
          >
            <div className="flex flex-1 flex-col rounded-none border-0 bg-[#050816] px-4 py-4 transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] sm:rounded-[28px] sm:px-6 sm:py-5 md:px-8 md:py-6 lg:px-[46px] lg:py-[38px]">
              <Navbar
                accent={currentBall.accent}
                cartCount={cartItems.length}
                onCartClick={() => setCartOpen(true)}
              />
              <HeroSection
                ballVariants={ballVariants}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                onAddToCart={handleAddToCart}
              />
            </div>
          </div>

          {/* SECTION 2 */}
          <div
            className="flex h-screen flex-col p-0 sm:p-3 md:p-4 transition-all duration-[850ms] ease-[cubic-bezier(0.77,0,0.175,1)]"
            style={{
              opacity: currentSection === 1 ? 1 : 0.82,
              transform: currentSection === 1 ? "scale(1)" : "scale(0.985)",
            }}
          >
            <TechnologySection
              accent={currentBall.accent}
              isActive={currentSection === 1}
            />
          </div>

          {/* SECTION 3 */}
          <div
            className="flex h-screen flex-col p-0 sm:p-3 md:p-4 transition-all duration-[850ms] ease-[cubic-bezier(0.77,0,0.175,1)]"
            style={{
              opacity: currentSection === 2 ? 1 : 0.82,
              transform: currentSection === 2 ? "scale(1)" : "scale(0.985)",
            }}
          >
            <SectionThree
              accent={currentBall.accent}
              isActive={currentSection === 2}
            />
          </div>

          {/* ✅ SECTION 4 (mới thêm) */}
          {/* SECTION 4 */}
          <div
  className="flex h-screen w-screen flex-col p-0 transition-all duration-[850ms] ease-[cubic-bezier(0.77,0,0.175,1)]"
  style={{
    opacity: currentSection === 3 ? 1 : 0.82,
    transform: currentSection === 3 ? "scale(1)" : "scale(0.985)",
  }}
>
  <ShowcaseSection isActive={currentSection === 3} />
</div>
        </div>

        {/* DOT NAV */}
        <div className="fixed right-3 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 md:flex md:right-6">
          {Array.from({ length: TOTAL_SECTIONS }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSection(i)}
              className="h-2 w-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor:
                  i === currentSection ? currentBall.accent : "#444",
                transform: i === currentSection ? "scale(1.5)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </main>

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemove={handleRemove}
      />
    </>
  );
}
