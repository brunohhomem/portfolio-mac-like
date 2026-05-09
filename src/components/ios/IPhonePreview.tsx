import { ArrowLeft } from "lucide-react";
import { portfolio } from "../../data/portfolio";
import { IOSExperience } from "./IOSExperience";

export function IPhonePreview({ onExit }: { onExit: () => void }) {
  return (
    <main className="relative grid h-svh w-screen place-items-center overflow-hidden bg-black" aria-label="iPhone portfolio preview">
      <button
        type="button"
        className="absolute left-4 top-4 z-20 inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/15 bg-[#1d1d1f]/90 px-4 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(0,0,0,0.3)] active:scale-95"
        onClick={onExit}
      >
        <ArrowLeft size={18} />
        <span>{portfolio.desktop.desktopLabel}</span>
      </button>
      <IOSExperience framed />
    </main>
  );
}
