import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PreferencesProvider } from "../../context/PreferencesContext";
import type { PortfolioAppId } from "../../data/portfolio";
import { AppWindowContent } from "./AppWindowContent";

function renderAppWindow(appId: PortfolioAppId) {
  return render(
    <PreferencesProvider>
      <AppWindowContent appId={appId} presentation="mac" />
    </PreferencesProvider>,
  );
}

describe("AppWindowContent", () => {
  it("renders the about app from portfolio data", () => {
    renderAppWindow("about");

    expect(screen.getByRole("heading", { name: "Bruno H. Homem" })).toBeInTheDocument();
    expect(screen.getByText("Full-stack developer")).toBeInTheDocument();
  });

  it("renders project cards", () => {
    renderAppWindow("projects");

    expect(screen.getByRole("heading", { name: "Operations Dashboard" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Case study/i })).toHaveAttribute("href", "https://example.com");
  });

  it("renders skills as terminal-style groups", () => {
    renderAppWindow("skills");

    expect(screen.getByText("cat skills.json")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Frontend/i })).toBeInTheDocument();
  });

  it("renders contact actions", () => {
    renderAppWindow("contact");

    expect(screen.getByRole("link", { name: /hello@example.com/i })).toHaveAttribute("href", "mailto:hello@example.com");
    expect(screen.getByRole("link", { name: /GitHub/i })).toHaveAttribute("href", "https://github.com/your-user");
  });

  it("renders resume download and entries", () => {
    renderAppWindow("resume");

    expect(screen.getByRole("link", { name: /PDF/i })).toHaveAttribute("href", "https://example.com/resume.pdf");
    expect(screen.getByRole("heading", { name: "Frontend Engineer" })).toBeInTheDocument();
  });
});
