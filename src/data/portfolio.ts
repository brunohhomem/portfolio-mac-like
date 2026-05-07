export type PortfolioAppId = "about" | "projects" | "skills" | "contact" | "resume";

export type PortfolioIconName = "about" | "projects" | "skills" | "contact" | "resume";

export interface PortfolioApp {
  id: PortfolioAppId;
  title: string;
  shortTitle: string;
  dockLabel: string;
  icon: PortfolioIconName;
  accent: string;
  defaultWindow: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface PortfolioLink {
  label: string;
  href: string;
}

export interface PortfolioProject {
  title: string;
  summary: string;
  impact: string;
  stack: string[];
  links: PortfolioLink[];
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface ResumeItem {
  role: string;
  organization: string;
  period: string;
  summary: string;
}

export const portfolio = {
  desktop: {
    finderName: "Finder",
    menuItems: ["File", "Edit", "View", "Go", "Window", "Help"],
    catMenuTitle: "Cat Menu",
    previewLabel: "iPhone Preview",
    desktopLabel: "Desktop",
  },
  profile: {
    name: "Bruno H. Homem",
    handle: "bruno.dev",
    initials: "BD",
    role: "Full-stack developer",
    location: "Brazil",
    availability: "Available for product-focused web work",
    intro:
      "I build fast, polished applications with React, TypeScript, APIs, and careful interface thinking.",
    bio:
      "My sweet spot is turning ambiguous product ideas into interfaces that feel clear, responsive, and maintainable. I like sturdy data models, sharp frontends, and tiny details that make software feel considered.",
    highlights: [
      "React and TypeScript interfaces with strong UX polish",
      "API integrations, dashboards, and workflow tools",
      "Design-minded engineering from prototype to production",
    ],
  },
  apps: [
    {
      id: "about",
      title: "About Bruno",
      shortTitle: "About",
      dockLabel: "About",
      icon: "about",
      accent: "#0066cc",
      defaultWindow: { x: 72, y: 88, width: 680, height: 500 },
    },
    {
      id: "projects",
      title: "Projects",
      shortTitle: "Projects",
      dockLabel: "Projects",
      icon: "projects",
      accent: "#0066cc",
      defaultWindow: { x: 330, y: 126, width: 760, height: 540 },
    },
    {
      id: "skills",
      title: "Terminal - Skills",
      shortTitle: "Skills",
      dockLabel: "Skills",
      icon: "skills",
      accent: "#0066cc",
      defaultWindow: { x: 184, y: 172, width: 720, height: 460 },
    },
    {
      id: "contact",
      title: "Mail - Contact",
      shortTitle: "Contact",
      dockLabel: "Contact",
      icon: "contact",
      accent: "#0066cc",
      defaultWindow: { x: 510, y: 96, width: 650, height: 440 },
    },
    {
      id: "resume",
      title: "Preview - Resume",
      shortTitle: "Resume",
      dockLabel: "Resume",
      icon: "resume",
      accent: "#0066cc",
      defaultWindow: { x: 236, y: 68, width: 700, height: 540 },
    },
  ] satisfies PortfolioApp[],
  projects: [
    {
      title: "Operations Dashboard",
      summary:
        "A responsive command center for tracking tasks, customer health, and team throughput.",
      impact: "Reduced daily status gathering and made priority changes visible to the whole team.",
      stack: ["React", "TypeScript", "Node", "PostgreSQL"],
      links: [
        { label: "Case study", href: "https://example.com" },
        { label: "GitHub", href: "https://github.com/your-user" },
      ],
    },
    {
      title: "AI Support Console",
      summary:
        "A support workspace with ticket summaries, suggested replies, and internal knowledge search.",
      impact: "Helped agents answer repeated questions faster while keeping review control in their hands.",
      stack: ["React", "OpenAI API", "Express", "Redis"],
      links: [
        { label: "Demo", href: "https://example.com" },
        { label: "GitHub", href: "https://github.com/your-user" },
      ],
    },
    {
      title: "Portfolio OS",
      summary:
        "A playful personal site that presents developer work through desktop and mobile metaphors.",
      impact: "Turns a standard portfolio into an interactive product sample.",
      stack: ["Vite", "React", "TypeScript", "CSS"],
      links: [
        { label: "Live site", href: "https://example.com" },
        { label: "GitHub", href: "https://github.com/your-user" },
      ],
    },
  ] satisfies PortfolioProject[],
  skillGroups: [
    {
      title: "Frontend",
      skills: ["React", "TypeScript", "Vite", "CSS systems", "Accessibility", "Responsive UI"],
    },
    {
      title: "Backend",
      skills: ["Node.js", "REST APIs", "PostgreSQL", "Auth flows", "Queues", "Testing"],
    },
    {
      title: "Product",
      skills: ["UX architecture", "Prototyping", "Dashboards", "Design systems", "Technical writing"],
    },
  ] satisfies SkillGroup[],
  resume: {
    downloadUrl: "https://example.com/resume.pdf",
    items: [
      {
        role: "Full-stack Developer",
        organization: "Independent projects",
        period: "2023 - Present",
        summary:
          "Builds production-minded web apps, dashboards, and automation tools for small product teams.",
      },
      {
        role: "Frontend Engineer",
        organization: "Product studio",
        period: "2021 - 2023",
        summary:
          "Delivered React interfaces, component systems, and API-connected workflows for SaaS clients.",
      },
      {
        role: "Web Developer",
        organization: "Freelance",
        period: "2019 - 2021",
        summary:
          "Created landing pages, admin panels, and custom integrations for local and remote businesses.",
      },
    ] satisfies ResumeItem[],
  },
  contact: {
    email: "hello@example.com",
    message:
      "Send a note about a product idea, a frontend build, or a TypeScript problem that needs a calm pair of hands.",
    links: [
      { label: "GitHub", href: "https://github.com/your-user" },
      { label: "LinkedIn", href: "https://linkedin.com/in/your-user" },
      { label: "Website", href: "https://example.com" },
    ] satisfies PortfolioLink[],
  },
} as const;
