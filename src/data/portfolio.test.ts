import { describe, expect, it } from "vitest";
import { portfolios } from "./portfolio";

describe("portfolio data", () => {
  it("keeps the same app structure across languages", () => {
    expect(portfolios.pt.apps.map((app) => app.id)).toEqual(portfolios.en.apps.map((app) => app.id));
  });

  it("defines usable metadata for every app", () => {
    Object.values(portfolios).forEach((portfolio) => {
      portfolio.apps.forEach((app) => {
        expect(app.title).toBeTruthy();
        expect(app.shortTitle).toBeTruthy();
        expect(app.dockLabel).toBeTruthy();
        expect(app.defaultWindow.width).toBeGreaterThan(0);
        expect(app.defaultWindow.height).toBeGreaterThan(0);
      });
    });
  });

  it("keeps contact and project links ready for rendering", () => {
    Object.values(portfolios).forEach((portfolio) => {
      expect(portfolio.contact.email).toContain("@");

      portfolio.projects.forEach((project) => {
        expect(project.title).toBeTruthy();
        expect(project.links.length).toBeGreaterThan(0);

        project.links.forEach((link) => {
          expect(link.label).toBeTruthy();
          expect(link.href).toMatch(/^https?:\/\//);
        });
      });
    });
  });
});
