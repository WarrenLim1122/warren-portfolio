const ITEMS = [
  { text: "Banking & Finance", accent: "gold" },
  { text: "NTU Singapore",     accent: "dim" },
  { text: "Algorithmic Trading", accent: "teal" },
  { text: "FMVA® Certified",   accent: "dim" },
  { text: "Equity Research",   accent: "gold" },
  { text: "Wealth Management", accent: "dim" },
  { text: "Bloomberg Terminal", accent: "teal" },
  { text: "System Builder",    accent: "dim" },
  { text: "Case Competition Champion", accent: "gold" },
  { text: "Singapore",         accent: "dim" },
];

export default function Marquee() {
  const allItems = [...ITEMS, ...ITEMS];

  return (
    <div className="relative overflow-hidden py-6 border-y border-white/5 bg-void">
      {/* fade masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
        style={{ background: "linear-gradient(to right, #0B0E1A, transparent)" }} />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
        style={{ background: "linear-gradient(to left, #0B0E1A, transparent)" }} />

      <div className="flex animate-marquee">
        {allItems.map((item, i) => (
          <div key={i} className="flex items-center flex-shrink-0 gap-6 px-6">
            <span
              className={`text-[10px] font-black uppercase tracking-[0.35em] whitespace-nowrap ${
                item.accent === "gold"
                  ? "text-gold"
                  : item.accent === "teal"
                  ? "text-teal"
                  : "text-white/25"
              }`}
            >
              {item.text}
            </span>
            <span className="text-white/12 text-xs">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}
