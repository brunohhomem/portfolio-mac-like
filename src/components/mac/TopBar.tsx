import { BatteryFull, Cat, Search, Smartphone, Wifi } from "lucide-react";
import { portfolio } from "../../data/portfolio";

export function TopBar({
  activeAppName,
  catMenuOpen,
  clock,
  onPreviewPhone,
  onToggleCatMenu,
}: {
  activeAppName: string;
  catMenuOpen: boolean;
  clock: string;
  onPreviewPhone: () => void;
  onToggleCatMenu: () => void;
}) {
  return (
    <header className="relative z-50 flex h-[30px] items-center justify-between border-b border-white/40 bg-[#f5f5f7]/80 px-3 text-[13px] text-[#1d1d1f] backdrop-blur-xl">
      <div className="flex min-w-0 items-center gap-3">
        <div className="relative">
          <button
            type="button"
            className="grid size-6 place-items-center rounded-md text-[#1d1d1f] hover:bg-white/70 focus-visible:bg-white focus-visible:outline-none"
            aria-expanded={catMenuOpen}
            aria-label={portfolio.desktop.catMenuTitle}
            onClick={onToggleCatMenu}
          >
            <Cat size={18} strokeWidth={2.4} />
          </button>

          {catMenuOpen ? (
            <div
              className="absolute left-0 top-[30px] z-50 w-56 rounded-lg border border-[#e0e0e0] bg-white p-2 text-[#1d1d1f]"
              role="menu"
            >
              <div className="flex min-h-9 items-center gap-2 rounded-md px-3 text-sm font-semibold text-[#7a7a7a]">
                <Cat size={18} />
                <span>{portfolio.profile.handle}</span>
              </div>
              <button
                type="button"
                className="flex min-h-9 w-full items-center gap-2 rounded-md px-3 text-left text-sm hover:bg-[#0066cc] hover:text-white focus-visible:bg-[#0066cc] focus-visible:text-white focus-visible:outline-none"
                role="menuitem"
                onClick={onPreviewPhone}
              >
                <Smartphone size={17} />
                <span>{portfolio.desktop.previewLabel}</span>
              </button>
            </div>
          ) : null}
        </div>

        <strong className="shrink-0 font-semibold">{activeAppName}</strong>
        <nav className="hidden min-w-0 items-center gap-1 sm:flex" aria-label="Desktop menu">
          {portfolio.desktop.menuItems.map((item) => (
            <button
              type="button"
              className="min-h-6 rounded-md px-2 hover:bg-white/60 focus-visible:bg-white focus-visible:outline-none"
              key={item}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex shrink-0 items-center gap-3 font-semibold">
        <Wifi size={16} aria-label="Wi-Fi" />
        <BatteryFull size={17} aria-label="Battery" />
        <Search size={15} aria-label="Search" />
        <span className="whitespace-nowrap">{clock}</span>
      </div>
    </header>
  );
}
