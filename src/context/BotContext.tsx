import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type BotMessageId =
  | "welcome"
  | "cookie-consent"
  | "cookies-saved"
  | "language-changed"
  | "language-saved";

interface BotContextValue {
  activeMessageId: BotMessageId;
  closeBot: () => void;
  isOpen: boolean;
  showBotMessage: (messageId: BotMessageId, options?: { open?: boolean; unread?: boolean }) => void;
  toggleBot: () => void;
  unread: boolean;
}

const BotContext = createContext<BotContextValue | undefined>(undefined);

export function BotProvider({ children }: { children: ReactNode }) {
  const [activeMessageId, setActiveMessageId] = useState<BotMessageId>("welcome");
  const [isOpen, setIsOpen] = useState(false);
  const [unread, setUnread] = useState(false);
  const closeBot = useCallback(() => setIsOpen(false), []);
  const showBotMessage = useCallback((messageId: BotMessageId, options?: { open?: boolean; unread?: boolean }) => {
    setActiveMessageId(messageId);

    if (options?.open ?? true) {
      setIsOpen(true);
      setUnread(false);
      return;
    }

    setIsOpen(false);
    setUnread(options?.unread ?? true);
  }, []);
  const toggleBot = useCallback(() => {
    setIsOpen((current) => {
      const nextOpen = !current;

      if (nextOpen) {
        setUnread(false);
      }

      return nextOpen;
    });
  }, []);

  const value = useMemo<BotContextValue>(
    () => ({
      activeMessageId,
      closeBot,
      isOpen,
      showBotMessage,
      toggleBot,
      unread,
    }),
    [activeMessageId, closeBot, isOpen, showBotMessage, toggleBot, unread],
  );

  return <BotContext.Provider value={value}>{children}</BotContext.Provider>;
}

export function useBot() {
  const context = useContext(BotContext);

  if (!context) {
    throw new Error("useBot must be used inside BotProvider");
  }

  return context;
}
