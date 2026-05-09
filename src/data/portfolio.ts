export type Language = "en" | "pt";

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

export interface PortfolioContent {
  desktop: {
    finderName: string;
    menuItems: string[];
    brandMenuTitle: string;
    previewLabel: string;
    desktopLabel: string;
    languageLabel: string;
    englishLabel: string;
    portugueseLabel: string;
  };
  ui: {
    homeLabel: string;
    projectLabel: string;
    newMessageLabel: string;
    resumeLabel: string;
    pdfLabel: string;
    skillsCommand: string;
  };
  bot: {
    assistantLabel: string;
    closeAssistantLabel: string;
    openAssistantLabel: string;
    welcomeMessage: string;
    cookieQuestion: string;
    cookiesSavedMessage: string;
    languageChangedMessage: string;
    languageSavedMessage: string;
    acceptCookiesLabel: string;
    declineCookiesLabel: string;
  };
  profile: {
    name: string;
    handle: string;
    initials: string;
    role: string;
    location: string;
    availability: string;
    intro: string;
    bio: string;
    highlights: string[];
  };
  apps: PortfolioApp[];
  projects: PortfolioProject[];
  skillGroups: SkillGroup[];
  resume: {
    downloadUrl: string;
    items: ResumeItem[];
  };
  contact: {
    email: string;
    message: string;
    links: PortfolioLink[];
  };
}

const appFrames: Record<
  PortfolioAppId,
  Pick<PortfolioApp, "id" | "icon" | "accent" | "defaultWindow">
> = {
  about: {
    id: "about",
    icon: "about",
    accent: "#0066cc",
    defaultWindow: { x: 72, y: 88, width: 680, height: 500 },
  },
  projects: {
    id: "projects",
    icon: "projects",
    accent: "#0066cc",
    defaultWindow: { x: 330, y: 126, width: 760, height: 540 },
  },
  skills: {
    id: "skills",
    icon: "skills",
    accent: "#0066cc",
    defaultWindow: { x: 184, y: 172, width: 720, height: 460 },
  },
  contact: {
    id: "contact",
    icon: "contact",
    accent: "#0066cc",
    defaultWindow: { x: 510, y: 96, width: 650, height: 440 },
  },
  resume: {
    id: "resume",
    icon: "resume",
    accent: "#0066cc",
    defaultWindow: { x: 236, y: 68, width: 700, height: 540 },
  },
};

export const portfolios = {
  en: {
    desktop: {
      finderName: "Finder",
      menuItems: ["File", "Edit", "View", "Go", "Window", "Help"],
      brandMenuTitle: "BH Menu",
      previewLabel: "iPhone Preview",
      desktopLabel: "Desktop",
      languageLabel: "Language",
      englishLabel: "English",
      portugueseLabel: "Portuguese",
    },
    ui: {
      homeLabel: "Home",
      projectLabel: "Project",
      newMessageLabel: "New message",
      resumeLabel: "Resume",
      pdfLabel: "PDF",
      skillsCommand: "cat skills.json",
    },
    bot: {
      assistantLabel: "Portfolio assistant",
      closeAssistantLabel: "Close assistant",
      openAssistantLabel: "Open assistant",
      welcomeMessage: "Hi. I can help with language preferences, cookies, and quick portfolio tips.",
      cookieQuestion: "Do you want to save cookies?",
      cookiesSavedMessage: "Cookies saved. Your language preference will be remembered.",
      languageChangedMessage: "Language updated for this session.",
      languageSavedMessage: "Language updated and saved.",
      acceptCookiesLabel: "Accept",
      declineCookiesLabel: "No",
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
        ...appFrames.about,
        title: "About Bruno",
        shortTitle: "About",
        dockLabel: "About",
      },
      {
        ...appFrames.projects,
        title: "Projects",
        shortTitle: "Projects",
        dockLabel: "Projects",
      },
      {
        ...appFrames.skills,
        title: "Terminal - Skills",
        shortTitle: "Skills",
        dockLabel: "Skills",
      },
      {
        ...appFrames.contact,
        title: "Mail - Contact",
        shortTitle: "Contact",
        dockLabel: "Contact",
      },
      {
        ...appFrames.resume,
        title: "Preview - Resume",
        shortTitle: "Resume",
        dockLabel: "Resume",
      },
    ],
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
    ],
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
    ],
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
      ],
    },
    contact: {
      email: "hello@example.com",
      message:
        "Send a note about a product idea, a frontend build, or a TypeScript problem that needs a calm pair of hands.",
      links: [
        { label: "GitHub", href: "https://github.com/your-user" },
        { label: "LinkedIn", href: "https://linkedin.com/in/your-user" },
        { label: "Website", href: "https://example.com" },
      ],
    },
  },
  pt: {
    desktop: {
      finderName: "Finder",
      menuItems: ["Arquivo", "Editar", "Visualizar", "Ir", "Janela", "Ajuda"],
      brandMenuTitle: "Menu BH",
      previewLabel: "Prévia no iPhone",
      desktopLabel: "Desktop",
      languageLabel: "Idioma",
      englishLabel: "Inglês",
      portugueseLabel: "Português",
    },
    ui: {
      homeLabel: "Início",
      projectLabel: "Projeto",
      newMessageLabel: "Nova mensagem",
      resumeLabel: "Currículo",
      pdfLabel: "PDF",
      skillsCommand: "cat habilidades.json",
    },
    bot: {
      assistantLabel: "Assistente do portfólio",
      closeAssistantLabel: "Fechar assistente",
      openAssistantLabel: "Abrir assistente",
      welcomeMessage: "Oi. Posso ajudar com idioma, cookies e dicas rápidas sobre o portfólio.",
      cookieQuestion: "Deseja salvar cookies?",
      cookiesSavedMessage: "Cookies salvos. Sua preferência de idioma será lembrada.",
      languageChangedMessage: "Idioma atualizado para esta sessão.",
      languageSavedMessage: "Idioma atualizado e salvo.",
      acceptCookiesLabel: "Aceitar",
      declineCookiesLabel: "Não",
    },
    profile: {
      name: "Bruno H. Homem",
      handle: "bruno.dev",
      initials: "BD",
      role: "Desenvolvedor full-stack",
      location: "Brasil",
      availability: "Disponível para produtos web com foco em experiência",
      intro:
        "Eu crio aplicações rápidas e polidas com React, TypeScript, APIs e cuidado real com interface.",
      bio:
        "Meu ponto forte é transformar ideias ambíguas de produto em interfaces claras, responsivas e fáceis de manter. Gosto de modelos de dados sólidos, frontends bem acabados e detalhes pequenos que fazem o software parecer bem pensado.",
      highlights: [
        "Interfaces em React e TypeScript com acabamento de UX",
        "Integrações de APIs, dashboards e ferramentas de fluxo de trabalho",
        "Engenharia com olhar de produto, do protótipo à produção",
      ],
    },
    apps: [
      {
        ...appFrames.about,
        title: "Sobre Bruno",
        shortTitle: "Sobre",
        dockLabel: "Sobre",
      },
      {
        ...appFrames.projects,
        title: "Projetos",
        shortTitle: "Projetos",
        dockLabel: "Projetos",
      },
      {
        ...appFrames.skills,
        title: "Terminal - Habilidades",
        shortTitle: "Habilidades",
        dockLabel: "Habilidades",
      },
      {
        ...appFrames.contact,
        title: "Mail - Contato",
        shortTitle: "Contato",
        dockLabel: "Contato",
      },
      {
        ...appFrames.resume,
        title: "Preview - Currículo",
        shortTitle: "Currículo",
        dockLabel: "Currículo",
      },
    ],
    projects: [
      {
        title: "Dashboard de Operações",
        summary:
          "Um painel responsivo para acompanhar tarefas, saúde de clientes e ritmo do time.",
        impact: "Reduziu a coleta diária de status e deixou mudanças de prioridade visíveis para todos.",
        stack: ["React", "TypeScript", "Node", "PostgreSQL"],
        links: [
          { label: "Estudo de caso", href: "https://example.com" },
          { label: "GitHub", href: "https://github.com/your-user" },
        ],
      },
      {
        title: "Console de Suporte com IA",
        summary:
          "Uma área de suporte com resumos de tickets, sugestões de resposta e busca em conhecimento interno.",
        impact: "Ajudou agentes a responder perguntas repetidas mais rápido sem perder controle de revisão.",
        stack: ["React", "OpenAI API", "Express", "Redis"],
        links: [
          { label: "Demo", href: "https://example.com" },
          { label: "GitHub", href: "https://github.com/your-user" },
        ],
      },
      {
        title: "Portfolio OS",
        summary:
          "Um portfólio pessoal interativo que apresenta projetos usando metáforas de desktop e celular.",
        impact: "Transforma um portfólio comum em uma amostra prática de produto.",
        stack: ["Vite", "React", "TypeScript", "CSS"],
        links: [
          { label: "Site ao vivo", href: "https://example.com" },
          { label: "GitHub", href: "https://github.com/your-user" },
        ],
      },
    ],
    skillGroups: [
      {
        title: "Frontend",
        skills: ["React", "TypeScript", "Vite", "Sistemas CSS", "Acessibilidade", "UI responsiva"],
      },
      {
        title: "Backend",
        skills: ["Node.js", "APIs REST", "PostgreSQL", "Fluxos de autenticação", "Filas", "Testes"],
      },
      {
        title: "Produto",
        skills: ["Arquitetura de UX", "Prototipagem", "Dashboards", "Design systems", "Escrita técnica"],
      },
    ],
    resume: {
      downloadUrl: "https://example.com/resume.pdf",
      items: [
        {
          role: "Desenvolvedor Full-stack",
          organization: "Projetos independentes",
          period: "2023 - Presente",
          summary:
            "Cria aplicações web, dashboards e automações com mentalidade de produto e produção.",
        },
        {
          role: "Engenheiro Frontend",
          organization: "Estúdio de produto",
          period: "2021 - 2023",
          summary:
            "Entregou interfaces em React, sistemas de componentes e fluxos conectados a APIs para clientes SaaS.",
        },
        {
          role: "Desenvolvedor Web",
          organization: "Freelance",
          period: "2019 - 2021",
          summary:
            "Criou landing pages, painéis administrativos e integrações customizadas para negócios locais e remotos.",
        },
      ],
    },
    contact: {
      email: "hello@example.com",
      message:
        "Envie uma mensagem sobre uma ideia de produto, uma interface frontend ou um problema em TypeScript que precisa de um par de mãos calmo.",
      links: [
        { label: "GitHub", href: "https://github.com/your-user" },
        { label: "LinkedIn", href: "https://linkedin.com/in/your-user" },
        { label: "Website", href: "https://example.com" },
      ],
    },
  },
} satisfies Record<Language, PortfolioContent>;

export const portfolio = portfolios.en;
