import { Bot, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useBot } from "../../context/BotContext";
import { usePreferences } from "../../context/PreferencesContext";
import { cn } from "../../lib/cn";

const LAUNCHER_SIZE = 56;
const PANEL_WIDTH = 320;
const PANEL_HEIGHT = 178;
const VIEWPORT_MARGIN = 12;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

function clampPosition(position: { x: number; y: number }) {
  const nextPosition = {
    x: clamp(position.x, VIEWPORT_MARGIN, window.innerWidth - LAUNCHER_SIZE - VIEWPORT_MARGIN),
    y: clamp(position.y, 44, window.innerHeight - LAUNCHER_SIZE - VIEWPORT_MARGIN),
  };

  return nextPosition.x === position.x && nextPosition.y === position.y ? position : nextPosition;
}

export function PortfolioBot() {
  const { activeMessageId, closeBot, isOpen, showBotMessage, toggleBot, unread } = useBot();
  const { acceptCookies, cookiePromptVisible, declineCookies, portfolio } = usePreferences();
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef<{ x: number; y: number } | null>(null);
  const hasCustomPosition = position !== null;

  useEffect(() => {
    if (cookiePromptVisible) {
      showBotMessage("cookie-consent");
    }
  }, [cookiePromptVisible, showBotMessage]);

  useEffect(() => {
    if (!hasCustomPosition) {
      return;
    }

    const keepInsideViewport = () => {
      setPosition((current) =>
        current ? clampPosition(current) : current,
      );
    };

    keepInsideViewport();
    window.addEventListener("resize", keepInsideViewport);

    return () => window.removeEventListener("resize", keepInsideViewport);
  }, [hasCustomPosition]);

  useEffect(() => {
    if (!dragging) {
      return;
    }

    const move = (event: PointerEvent) => {
      if (!dragOffset.current) {
        return;
      }

      setPosition({
        x: clamp(event.clientX - dragOffset.current.x, VIEWPORT_MARGIN, window.innerWidth - LAUNCHER_SIZE - VIEWPORT_MARGIN),
        y: clamp(event.clientY - dragOffset.current.y, 44, window.innerHeight - LAUNCHER_SIZE - VIEWPORT_MARGIN),
      });
    };

    const stopDragging = () => {
      dragOffset.current = null;
      setDragging(false);
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", stopDragging);
    window.addEventListener("pointercancel", stopDragging);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", stopDragging);
      window.removeEventListener("pointercancel", stopDragging);
    };
  }, [dragging]);

  const beginDrag = (event: ReactPointerEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest("[data-bot-action]")) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();

    dragOffset.current = {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    };
    setDragging(true);
  };

  const acceptCookieMessage = () => {
    acceptCookies();
    showBotMessage("cookies-saved");
  };

  const declineCookieMessage = () => {
    declineCookies();
    showBotMessage("welcome", { open: false, unread: false });
  };

  const message = {
    "cookie-consent": portfolio.bot.cookieQuestion,
    "cookies-saved": portfolio.bot.cookiesSavedMessage,
    "language-changed": portfolio.bot.languageChangedMessage,
    "language-saved": portfolio.bot.languageSavedMessage,
    welcome: portfolio.bot.welcomeMessage,
  }[activeMessageId];

  return (
    <section
      aria-label={portfolio.bot.assistantLabel}
      className={cn(
        "fixed z-[80] size-14 select-none touch-none",
        dragging ? "cursor-grabbing" : "cursor-grab",
      )}
      onPointerDown={beginDrag}
      style={position ? { left: position.x, top: position.y } : { bottom: VIEWPORT_MARGIN, right: VIEWPORT_MARGIN }}
    >
      {isOpen ? (
        <div
          aria-live="polite"
          className="absolute bottom-[68px] right-0 w-[min(320px,calc(100vw_-_24px))] rounded-xl border border-[#1d1d1f]/15 bg-white p-3 text-[#1d1d1f] shadow-[0_18px_48px_rgba(0,0,0,0.24)]"
          role="dialog"
          style={{
            maxHeight: `min(${PANEL_HEIGHT}px, calc(100vh - 84px))`,
            width: `min(${PANEL_WIDTH}px, calc(100vw - 24px))`,
          }}
        >
          <div className="mb-2 flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-full bg-[#0066cc] text-white">
              <Bot size={18} strokeWidth={2.2} />
            </span>
            <strong className="min-w-0 flex-1 text-sm">{portfolio.bot.assistantLabel}</strong>
            <button
              aria-label={portfolio.bot.closeAssistantLabel}
              className="grid size-8 place-items-center rounded-full text-[#7a7a7a] hover:bg-[#f5f5f7] hover:text-[#1d1d1f] active:scale-95"
              data-bot-action
              onClick={closeBot}
              type="button"
            >
              <X size={16} />
            </button>
          </div>
          <p className="m-0 text-sm font-semibold leading-snug">{message}</p>
          {activeMessageId === "cookie-consent" ? (
            <div className="mt-3 flex gap-2">
              <button
                className="min-h-9 rounded-md bg-[#0066cc] px-3 text-sm font-semibold text-white active:scale-95"
                data-bot-action
                onClick={acceptCookieMessage}
                type="button"
              >
                {portfolio.bot.acceptCookiesLabel}
              </button>
              <button
                className="min-h-9 rounded-md border border-[#d2d2d7] bg-[#f5f5f7] px-3 text-sm font-semibold text-[#1d1d1f] active:scale-95"
                data-bot-action
                onClick={declineCookieMessage}
                type="button"
              >
                {portfolio.bot.declineCookiesLabel}
              </button>
            </div>
          ) : null}
        </div>
      ) : null}

      <button
        aria-expanded={isOpen}
        aria-label={isOpen ? portfolio.bot.closeAssistantLabel : portfolio.bot.openAssistantLabel}
        className="relative ml-auto grid size-14 place-items-center rounded-full border border-white/45 bg-[#0066cc] text-white shadow-[0_14px_36px_rgba(0,0,0,0.24)] active:scale-95"
        data-bot-action
        onClick={toggleBot}
        type="button"
      >
        <Bot size={28} strokeWidth={2.2} />
        {unread ? (
          <span className="absolute right-0 top-0 size-3 rounded-full border-2 border-white bg-[#ff3b30]" aria-hidden="true" />
        ) : null}
      </button>
    </section>
  );
}
