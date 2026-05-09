import { BatteryFull, Languages, Search, Smartphone, Wifi } from "lucide-react";
import { useBot } from "../../context/BotContext";
import { usePreferences } from "../../context/PreferencesContext";
import type { Language } from "../../data/portfolio";
import { cn } from "../../lib/cn";

export function TopBar({
  menuOpen,
  clock,
  onPreviewPhone,
  onToggleMenu,
}: {
  menuOpen: boolean;
  clock: string;
  onPreviewPhone: () => void;
  onToggleMenu: () => void;
}) {
  const { showBotMessage } = useBot();
  const { canPersistPreferences, language, portfolio, setLanguage } = usePreferences();
  const languageOptions: Array<{ label: string; value: Language }> = [
    { label: portfolio.desktop.englishLabel, value: "en" },
    { label: portfolio.desktop.portugueseLabel, value: "pt" },
  ];
  const handleLanguageChange = (nextLanguage: Language) => {
    if (nextLanguage === language) {
      return;
    }

    setLanguage(nextLanguage);
    showBotMessage(canPersistPreferences ? "language-saved" : "language-changed");
  };

  return (
    <header className="relative z-50 flex h-[30px] items-center justify-between border-b border-white/40 bg-[#f5f5f7]/80 px-3 text-[13px] text-[#1d1d1f] backdrop-blur-xl">
      <div className="flex min-w-0 items-center gap-3">
        <div className="relative">
          <button
            type="button"
            className="grid size-6 place-items-center rounded-md text-[#1d1d1f] hover:bg-white/70 focus-visible:bg-white focus-visible:outline-none"
            aria-expanded={menuOpen}
            aria-label={portfolio.desktop.brandMenuTitle}
            onClick={onToggleMenu}
          >
            <img src="/bh-logo.png" alt="" className="size-5 rounded-sm" />
          </button>

          {menuOpen ? (
            <div
              className="absolute left-0 top-[30px] z-50 w-56 rounded-lg border border-[#e0e0e0] bg-white p-2 text-[#1d1d1f]"
              role="menu"
            >
              <div className="flex min-h-9 items-center gap-2 rounded-md px-3 text-sm font-semibold text-[#7a7a7a]">
                <img src="/bh-logo.png" alt="" className="size-6 rounded" />
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
              <div className="my-2 h-px bg-[#e0e0e0]" aria-hidden="true" />
              <div className="px-1 pb-1" role="group" aria-label={portfolio.desktop.languageLabel}>
                <div className="mb-1 flex min-h-8 items-center gap-2 rounded-md px-2 text-xs font-semibold uppercase text-[#7a7a7a]">
                  <Languages size={15} />
                  <span>{portfolio.desktop.languageLabel}</span>
                </div>
                <div className="grid grid-cols-2 gap-1 rounded-md bg-[#f5f5f7] p-1">
                  {languageOptions.map((option) => (
                    <button
                      type="button"
                      className={cn(
                        "min-h-8 rounded px-2 text-xs font-semibold focus-visible:outline-none",
                        language === option.value
                          ? "bg-[#0066cc] text-white"
                          : "text-[#1d1d1f] hover:bg-white focus-visible:bg-white",
                      )}
                      aria-checked={language === option.value}
                      key={option.value}
                      onClick={() => handleLanguageChange(option.value)}
                      role="menuitemradio"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <strong className="shrink-0 font-semibold">{portfolio.desktop.finderName}</strong>
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
