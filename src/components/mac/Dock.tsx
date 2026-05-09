import { usePreferences } from "../../context/PreferencesContext";
import type { PortfolioAppId } from "../../data/portfolio";
import { cn } from "../../lib/cn";
import { appIcons } from "../icons";
import type { WindowStateMap } from "./windowTypes";

export function Dock({
  activeAppId,
  onOpenApp,
  windows,
}: {
  activeAppId: PortfolioAppId;
  onOpenApp: (appId: PortfolioAppId) => void;
  windows: WindowStateMap;
}) {
  const { portfolio } = usePreferences();

  return (
    <nav
      className="absolute bottom-3 right-1/2 z-40 flex h-[74px] max-w-[min(92vw,620px)] translate-x-1/2 items-center gap-2 rounded-[18px] bg-black px-3 py-2"
      aria-label="Portfolio dock"
    >
      {portfolio.apps.map((app) => {
        const Icon = appIcons[app.icon];
        const isOpen = windows[app.id].open;
        const isActive = activeAppId === app.id && isOpen && !windows[app.id].minimized;

        return (
          <button
            type="button"
            key={app.id}
            className="group relative grid size-[54px] place-items-center rounded-[14px] text-[#1d1d1f] focus-visible:outline-none"
            aria-label={app.dockLabel}
            onClick={() => onOpenApp(app.id)}
          >
            <span
              className={cn(
                "grid size-[54px] place-items-center rounded-[14px] border transition duration-150 group-active:translate-y-[-2px] group-active:scale-95",
                isActive
                  ? "translate-y-[-4px] border-[#0066cc] bg-[#0066cc] text-white"
                  : "border-[#e0e0e0] bg-[#f5f5f7] group-hover:translate-y-[-4px] group-hover:border-[#0066cc] group-hover:bg-[#0066cc] group-hover:text-white group-focus-visible:translate-y-[-4px] group-focus-visible:border-[#0066cc] group-focus-visible:bg-[#0066cc] group-focus-visible:text-white",
              )}
            >
              <Icon size={28} />
            </span>
            <span className="pointer-events-none absolute bottom-[68px] left-1/2 -translate-x-1/2 translate-y-1.5 whitespace-nowrap rounded-lg border border-[#e0e0e0] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#1d1d1f] opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              {app.dockLabel}
            </span>
            {isOpen ? <span className="absolute -bottom-2 size-1 rounded-full bg-[#0066cc]" aria-hidden="true" /> : null}
          </button>
        );
      })}
    </nav>
  );
}
