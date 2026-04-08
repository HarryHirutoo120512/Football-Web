"use client";

type CartItem = {
  name: string;
  edition: string;
  color: string;
  price: string;
  accent: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (index: number) => void;
};

export default function CartDrawer({ isOpen, onClose, items, onRemove }: Props) {
  const subtotal = items.reduce(
    (sum, item) => sum + parseFloat(item.price.replace("$", "")),
    0
  );

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[360px] z-50 bg-[#0a0a0a] flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
          <h2 className="text-white font-black text-2xl uppercase tracking-wide">
            Your Cart ({items.length})
          </h2>
          <button onClick={onClose} className="text-white/60 hover:text-white text-xl">
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
          {items.length === 0 && (
            <p className="text-white/30 text-sm text-center mt-10">
              Your cart is empty
            </p>
          )}
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-[#141414] rounded-xl p-4 flex items-center gap-4 relative"
            >
              <div
                className="w-14 h-14 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.accent }}
              />
              <div className="flex-1">
                <p className="text-white font-black uppercase tracking-wide">
                  {item.name}
                </p>
                <p className="text-white/40 text-xs uppercase tracking-widest mt-0.5">
                  {item.edition}
                </p>
                <p className="text-orange-500 text-xs mt-1">{item.color}</p>
              </div>
              <p className="text-white font-bold">{item.price}</p>
              <button
                onClick={() => onRemove(i)}
                className="absolute top-3 right-3 text-white/20 hover:text-white/60 text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-6 border-t border-white/10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/50 text-sm uppercase tracking-widest">
              Subtotal
            </span>
            <span className="text-white font-black text-2xl">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <button className="w-full bg-white text-black font-black uppercase tracking-widest py-4 rounded-lg hover:bg-white/90 transition">
            Checkout
          </button>
          <p className="text-white/20 text-xs text-center mt-3 uppercase tracking-widest">
            Free shipping worldwide
          </p>
        </div>
      </div>
    </>
  );
}