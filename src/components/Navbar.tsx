"use client";

type Props = {
  accent: string;
  cartCount: number;
  onCartClick: () => void;
};

export default function Navbar({ accent, cartCount, onCartClick }: Props) {
  return (
    <nav className="flex items-center justify-between gap-4 pt-1">
      {/* Logo */}
      <div className="flex items-center gap-2 sm:gap-3">
        <svg width="34" height="34" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
          <circle cx="18" cy="18" r="17" fill="white" stroke="#2d2d2d" strokeWidth="1" />
          <polygon points="18,8 22,11 21,16 18,17 15,16 14,11" fill="#111" />
          <polygon points="18,8 14,11 10,9 9,5 13,3 18,4" fill="#111" />
          <polygon points="18,8 22,11 26,9 27,5 23,3 18,4" fill="#111" />
          <polygon points="21,16 22,11 26,9 30,12 29,17 25,18" fill="#111" />
          <polygon points="15,16 14,11 10,9 6,12 7,17 11,18" fill="#111" />
          <polygon points="18,17 21,16 25,18 24,23 18,25 12,23 11,18 15,16" fill="#111" />
          <polygon points="18,25 24,23 27,27 24,31 18,32 12,31 9,27 12,23" fill="#111" />
          <circle cx="18" cy="18" r="17" fill="none" stroke="#a3a3a3" strokeWidth="0.5" />
        </svg>
        <span className="text-[17px] font-black uppercase leading-[0.9] tracking-[0.04em] text-white sm:text-[18px] md:text-[22px]">
          BLUE
          <br />
          LOCK
        </span>
      </div>

      {/* Nav links */}
      <div className="hidden items-center gap-6 uppercase md:flex lg:gap-11">
        <span
          className="text-[15px] font-medium tracking-[0.08em] transition-colors duration-500"
          style={{ color: accent }}
        >
          Products
        </span>
        <span className="cursor-pointer text-[15px] tracking-[0.08em] text-[#a5afbf] transition hover:text-white">
          Customize
        </span>
        <span className="cursor-pointer text-[15px] tracking-[0.08em] text-[#a5afbf] transition hover:text-white">
          Contact
        </span>
      </div>

      {/* Icons */}
      <div className="flex items-center gap-4 text-[#a5afbf] sm:gap-5 md:gap-6">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
        <button onClick={onCartClick} className="relative transition hover:text-white">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          {cartCount > 0 && (
            <span
              className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white transition-colors duration-500"
              style={{ backgroundColor: accent }}
            >
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}