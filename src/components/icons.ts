import {
  FileText,
  Folder,
  Github,
  Globe,
  Linkedin,
  Mail,
  Terminal,
  User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { PortfolioIconName } from "../data/portfolio";

export const appIcons: Record<PortfolioIconName, LucideIcon> = {
  about: User,
  projects: Folder,
  skills: Terminal,
  contact: Mail,
  resume: FileText,
};

export const socialIcons: Record<string, LucideIcon> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Website: Globe,
};
