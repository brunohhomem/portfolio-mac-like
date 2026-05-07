import { useRef } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { Maximize2, Minus, X } from "lucide-react";
import type { PortfolioApp } from "../../data/portfolio";
import { cn } from "../../lib/cn";
import { appIcons } from "../icons";
import type { WindowState } from "./windowTypes";

export function MacWindow({
  app,
  children,
  isActive,
  onClose,
  onFocus,
  onMinimize,
  onMove,
  state,
}: {
  app: PortfolioApp;
  children: ReactNode;
  isActive: boolean;
  onClose: () => void;
  onFocus: () => void;
  onMinimize: () => void;
  onMove: (x: number, y: number) => void;
  state: WindowState;
}) {
  const Icon = appIcons[app.icon];
  const windowRef = useRef<HTMLElement>(null);

  const startDrag = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.button !== 0 || (event.target as HTMLElement).closest("button")) {
      return;
    }

    const windowElement = windowRef.current;
    const layerElement = windowElement?.parentElement;

    if (!windowElement || !layerElement) {
      return;
    }

    onFocus();
    event.preventDefault();

    const windowRect = windowElement.getBoundingClientRect();
    const layerRect = layerElement.getBoundingClientRect();
    const pointerStart = { x: event.clientX, y: event.clientY };
    const positionStart = { x: state.x, y: state.y };
    const maxX = Math.max(12, layerRect.width - windowRect.width - 12);
    const maxY = Math.max(12, layerRect.height - windowRect.height - 12);

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const nextX = Math.min(Math.max(12, positionStart.x + moveEvent.clientX - pointerStart.x), maxX);
      const nextY = Math.min(Math.max(12, positionStart.y + moveEvent.clientY - pointerStart.y), maxY);
      onMove(nextX, nextY);
    };

    const stopDrag = () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", stopDrag);
      window.removeEventListener("pointercancel", stopDrag);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopDrag);
    window.addEventListener("pointercancel", stopDrag);
  };

  return (
    <article
      ref={windowRef}
      className={cn(
        "absolute flex min-h-[300px] flex-col overflow-hidden rounded-[18px] border bg-white/95",
        isActive ? "border-[#0066cc]" : "border-[#e0e0e0]",
      )}
      style={
        {
          top: state.y,
          left: state.x,
          width: `min(${app.defaultWindow.width}px, calc(100vw - 48px))`,
          height: `min(${app.defaultWindow.height}px, calc(100svh - 136px))`,
          zIndex: state.zIndex,
        } as CSSProperties
      }
      onMouseDown={onFocus}
    >
      <header
        className="grid h-10 shrink-0 cursor-grab touch-none select-none grid-cols-[86px_minmax(0,1fr)_86px] items-center border-b border-[#e0e0e0] bg-[#f5f5f7]/95 active:cursor-grabbing"
        onPointerDown={startDrag}
      >
        <div className="flex h-full cursor-default items-center gap-2 pl-3">
          <TrafficButton label="Close" tone="close" onClick={onClose}>
            <X size={7} strokeWidth={3} />
          </TrafficButton>
          <TrafficButton label="Minimize" tone="minimize" onClick={onMinimize}>
            <Minus size={7} strokeWidth={3} />
          </TrafficButton>
          <TrafficButton label="Zoom" tone="zoom" onClick={onFocus}>
            <Maximize2 size={7} strokeWidth={3} />
          </TrafficButton>
        </div>

        <div className="flex min-w-0 items-center justify-center gap-2 text-[13px] font-semibold text-[#1d1d1f]">
          <Icon className="size-4 shrink-0 text-[#0066cc]" />
          <span className="truncate">{app.title}</span>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-auto bg-[#f5f5f7] p-5">{children}</div>
    </article>
  );
}

function TrafficButton({
  children,
  label,
  onClick,
  tone,
}: {
  children: ReactNode;
  label: string;
  onClick: () => void;
  tone: "close" | "minimize" | "zoom";
}) {
  const toneClass = {
    close: "bg-[#ff5f57]",
    minimize: "bg-[#febc2e]",
    zoom: "bg-[#28c840]",
  }[tone];

  return (
    <button
      type="button"
      className={cn(
        "flex size-3 shrink-0 items-center justify-center rounded-full p-0 text-transparent hover:text-black/60 focus-visible:text-black/60 focus-visible:outline-none",
        toneClass,
      )}
      aria-label={label}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
