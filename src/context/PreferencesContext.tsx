import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { portfolios } from "../data/portfolio";
import type { Language, PortfolioContent } from "../data/portfolio";

type CookieConsent = "accepted" | "pending";

interface PreferencesContextValue {
  acceptCookies: () => void;
  canPersistPreferences: boolean;
  cookieConsent: CookieConsent;
  cookiePromptVisible: boolean;
  declineCookies: () => void;
  language: Language;
  portfolio: PortfolioContent;
  setLanguage: (language: Language) => void;
}

const LANGUAGE_COOKIE = "portfolio_language";
const CONSENT_COOKIE = "portfolio_cookie_consent";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const PreferencesContext = createContext<PreferencesContextValue | undefined>(undefined);

function readCookie(name: string) {
  if (typeof document === "undefined") {
    return undefined;
  }

  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.split("=").slice(1).join("=")) : undefined;
}

function writeCookie(name: string, value: string) {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
}

function isLanguage(value: string | undefined): value is Language {
  return value === "en" || value === "pt";
}

function getInitialConsent(): CookieConsent {
  return readCookie(CONSENT_COOKIE) === "accepted" ? "accepted" : "pending";
}

function getInitialLanguage() {
  if (getInitialConsent() === "accepted") {
    const savedLanguage = readCookie(LANGUAGE_COOKIE);

    if (isLanguage(savedLanguage)) {
      return savedLanguage;
    }
  }

  return "en";
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [cookieConsent, setCookieConsent] = useState<CookieConsent>(() => getInitialConsent());
  const [promptDismissed, setPromptDismissed] = useState(false);
  const [language, setLanguageState] = useState<Language>(() => getInitialLanguage());

  const value = useMemo<PreferencesContextValue>(() => {
    const changeLanguage = (nextLanguage: Language) => {
      setLanguageState(nextLanguage);

      if (cookieConsent === "accepted") {
        writeCookie(LANGUAGE_COOKIE, nextLanguage);
      }
    };

    return {
      acceptCookies: () => {
        setCookieConsent("accepted");
        setPromptDismissed(true);
        writeCookie(CONSENT_COOKIE, "accepted");
        writeCookie(LANGUAGE_COOKIE, language);
      },
      canPersistPreferences: cookieConsent === "accepted",
      cookieConsent,
      cookiePromptVisible: cookieConsent !== "accepted" && !promptDismissed,
      declineCookies: () => {
        setPromptDismissed(true);
      },
      language,
      portfolio: portfolios[language],
      setLanguage: changeLanguage,
    };
  }, [cookieConsent, language, promptDismissed]);

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const context = useContext(PreferencesContext);

  if (!context) {
    throw new Error("usePreferences must be used inside PreferencesProvider");
  }

  return context;
}
