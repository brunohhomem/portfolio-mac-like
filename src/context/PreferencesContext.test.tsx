import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { PreferencesProvider, usePreferences } from "./PreferencesContext";

function PreferenceHarness() {
  const {
    acceptCookies,
    canPersistPreferences,
    cookiePromptVisible,
    declineCookies,
    language,
    portfolio,
    setLanguage,
  } = usePreferences();

  return (
    <section>
      <p data-testid="language">{language}</p>
      <p data-testid="role">{portfolio.profile.role}</p>
      <p data-testid="can-persist">{String(canPersistPreferences)}</p>
      <p data-testid="prompt-visible">{String(cookiePromptVisible)}</p>
      <button onClick={() => setLanguage("pt")} type="button">
        Portuguese
      </button>
      <button onClick={() => setLanguage("en")} type="button">
        English
      </button>
      <button onClick={acceptCookies} type="button">
        Accept cookies
      </button>
      <button onClick={declineCookies} type="button">
        Decline cookies
      </button>
    </section>
  );
}

function renderPreferences() {
  return render(
    <PreferencesProvider>
      <PreferenceHarness />
    </PreferencesProvider>,
  );
}

describe("PreferencesProvider", () => {
  it("updates the current session language without cookie consent", async () => {
    const user = userEvent.setup();

    renderPreferences();
    await user.click(screen.getByRole("button", { name: "Portuguese" }));

    expect(screen.getByTestId("language")).toHaveTextContent("pt");
    expect(screen.getByTestId("role")).toHaveTextContent("Desenvolvedor full-stack");
    expect(screen.getByTestId("can-persist")).toHaveTextContent("false");
    expect(document.cookie).not.toContain("portfolio_language=");
  });

  it("persists the selected language only after accepting cookies", async () => {
    const user = userEvent.setup();
    const { unmount } = renderPreferences();

    await user.click(screen.getByRole("button", { name: "Portuguese" }));
    await user.click(screen.getByRole("button", { name: "Accept cookies" }));

    expect(document.cookie).toContain("portfolio_cookie_consent=accepted");
    expect(document.cookie).toContain("portfolio_language=pt");

    unmount();
    renderPreferences();

    expect(screen.getByTestId("language")).toHaveTextContent("pt");
    expect(screen.getByTestId("can-persist")).toHaveTextContent("true");
  });

  it("ignores saved language when consent cookie is missing", () => {
    document.cookie = "portfolio_language=pt; path=/";

    renderPreferences();

    expect(screen.getByTestId("language")).toHaveTextContent("en");
    expect(screen.getByTestId("role")).toHaveTextContent("Full-stack developer");
    expect(screen.getByTestId("can-persist")).toHaveTextContent("false");
  });

  it("declining cookies hides the prompt but keeps the session preference", async () => {
    const user = userEvent.setup();

    renderPreferences();
    await user.click(screen.getByRole("button", { name: "Portuguese" }));
    await user.click(screen.getByRole("button", { name: "Decline cookies" }));

    expect(screen.getByTestId("language")).toHaveTextContent("pt");
    expect(screen.getByTestId("prompt-visible")).toHaveTextContent("false");
    expect(screen.getByTestId("can-persist")).toHaveTextContent("false");
    expect(document.cookie).not.toContain("portfolio_cookie_consent=accepted");
  });
});
