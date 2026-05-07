import type { PortfolioAppId } from "../../data/portfolio";

export type WindowState = {
  open: boolean;
  minimized: boolean;
  x: number;
  y: number;
  zIndex: number;
};

export type WindowStateMap = Record<PortfolioAppId, WindowState>;
