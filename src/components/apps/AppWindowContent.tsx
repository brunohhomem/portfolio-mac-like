import {
  Clock,
  Code,
  Download,
  ExternalLink,
  Layers,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { portfolio } from "../../data/portfolio";
import type { PortfolioAppId } from "../../data/portfolio";
import { socialIcons } from "../icons";
import { cn } from "../../lib/cn";

type AppPresentation = "mac" | "ios";

export function AppWindowContent({
  appId,
  presentation,
}: {
  appId: PortfolioAppId;
  presentation: AppPresentation;
}) {
  if (appId === "about") {
    return <AboutApp presentation={presentation} />;
  }

  if (appId === "projects") {
    return <ProjectsApp />;
  }

  if (appId === "skills") {
    return <SkillsApp />;
  }

  if (appId === "contact") {
    return <ContactApp />;
  }

  return <ResumeApp />;
}

function AboutApp({ presentation }: { presentation: AppPresentation }) {
  return (
    <div className={cn("grid gap-5", presentation === "mac" && "lg:grid-cols-[0.8fr_1.2fr]")}>
      <section className="grid content-start gap-5 rounded-[18px] border border-[#e0e0e0] bg-white p-6">
        <div className="grid size-24 place-items-center rounded-[18px] bg-[#1d1d1f] text-3xl font-semibold text-white">
          {portfolio.profile.initials}
        </div>
        <div>
          <p className="mb-1 text-sm font-semibold tracking-[-0.224px] text-[#7a7a7a]">
            {portfolio.profile.handle}
          </p>
          <h1 className="mb-2 text-[34px] font-semibold leading-[1.08] tracking-[-0.374px] text-[#1d1d1f]">
            {portfolio.profile.name}
          </h1>
          <p className="m-0 text-[17px] font-semibold leading-[1.47] tracking-[-0.374px] text-[#0066cc]">
            {portfolio.profile.role}
          </p>
        </div>
      </section>

      <section className="rounded-[18px] border border-[#e0e0e0] bg-white p-6">
        <div className="mb-5 flex flex-wrap gap-2">
          <InfoChip icon={MapPin}>{portfolio.profile.location}</InfoChip>
          <InfoChip icon={Clock}>{portfolio.profile.availability}</InfoChip>
        </div>
        <p className="mb-4 text-2xl font-light leading-[1.5] text-[#1d1d1f]">
          {portfolio.profile.intro}
        </p>
        <p className="mb-5 text-[17px] leading-[1.47] tracking-[-0.374px] text-[#333333]">
          {portfolio.profile.bio}
        </p>
        <div className="grid gap-3">
          {portfolio.profile.highlights.map((highlight) => (
            <div
              className="flex items-start gap-3 border-t border-[#f0f0f0] pt-3 text-[17px] font-semibold leading-[1.24] tracking-[-0.374px] text-[#1d1d1f]"
              key={highlight}
            >
              <Sparkles className="mt-0.5 size-5 shrink-0 text-[#0066cc]" />
              <span>{highlight}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ProjectsApp() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
      {portfolio.projects.map((project) => (
        <article
          className="flex min-h-80 flex-col rounded-[18px] border border-[#e0e0e0] bg-white p-6"
          key={project.title}
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-lg bg-[#1d1d1f] text-white">
              <Layers size={21} />
            </div>
            <div>
              <p className="mb-1 text-sm font-semibold tracking-[-0.224px] text-[#7a7a7a]">
                Project
              </p>
              <h2 className="m-0 text-[21px] font-semibold leading-[1.19] tracking-[0.231px] text-[#1d1d1f]">
                {project.title}
              </h2>
            </div>
          </div>
          <p className="text-[17px] leading-[1.47] tracking-[-0.374px] text-[#333333]">
            {project.summary}
          </p>
          <p className="flex items-start gap-2 text-sm font-semibold leading-[1.43] tracking-[-0.224px] text-[#1d1d1f]">
            <ShieldCheck className="mt-1 size-4 shrink-0 text-[#0066cc]" />
            {project.impact}
          </p>
          <div className="mt-auto flex flex-wrap gap-2 pt-4">
            {project.stack.map((item) => (
              <span
                className="rounded-full border border-[#e0e0e0] bg-[#fafafc] px-3 py-1.5 text-xs text-[#333333]"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.links.map((link) => (
              <TextLink href={link.href} key={link.label}>
                <ExternalLink size={14} />
                {link.label}
              </TextLink>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

function SkillsApp() {
  return (
    <div className="min-h-full rounded-[18px] bg-[#272729] p-6 text-white">
      <div className="mb-5 flex gap-2 font-mono text-sm text-[#cccccc]">
        <span className="font-semibold text-[#2997ff]">$</span>
        <span>cat skills.json</span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(185px,1fr))] gap-4">
        {portfolio.skillGroups.map((group) => (
          <section className="rounded-[18px] border border-white/10 bg-white/[0.03] p-5" key={group.title}>
            <h2 className="mb-4 flex items-center gap-2 text-[21px] font-semibold leading-[1.19] tracking-[0.231px] text-white">
              <Code size={17} />
              {group.title}
            </h2>
            <ul className="grid gap-2 p-0 font-mono text-sm text-[#cccccc]">
              {group.skills.map((skill) => (
                <li className="list-none before:mr-2 before:text-[#2997ff] before:content-['>']" key={skill}>
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

function ContactApp() {
  const mailTo = `mailto:${portfolio.contact.email}`;

  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-[18px] border border-[#e0e0e0] bg-white p-6">
        <p className="mb-1 text-sm font-semibold tracking-[-0.224px] text-[#7a7a7a]">New message</p>
        <h1 className="mb-4 text-[34px] font-semibold leading-[1.08] tracking-[-0.374px] text-[#1d1d1f]">
          {portfolio.profile.name}
        </h1>
        <p className="mb-5 text-[17px] leading-[1.47] tracking-[-0.374px] text-[#333333]">
          {portfolio.contact.message}
        </p>
        <a
          className="inline-flex min-h-11 max-w-full items-center gap-2 rounded-full bg-[#0066cc] px-5 py-2.5 text-[17px] leading-[1.47] tracking-[-0.374px] text-white active:scale-95"
          href={mailTo}
        >
          <Mail size={17} />
          <span className="break-all">{portfolio.contact.email}</span>
        </a>
      </section>

      <section className="grid content-start gap-3 rounded-[18px] border border-[#e0e0e0] bg-white p-6">
        {portfolio.contact.links.map((link) => {
          const Icon = socialIcons[link.label] ?? ExternalLink;

          return (
            <a
              className="inline-flex min-h-11 items-center gap-3 rounded-lg border border-[#e0e0e0] bg-[#fafafc] px-4 text-[#1d1d1f] active:scale-95"
              href={link.href}
              target="_blank"
              rel="noreferrer"
              key={link.label}
            >
              <Icon size={19} />
              <span className="mr-auto">{link.label}</span>
              <ExternalLink size={14} className="text-[#0066cc]" />
            </a>
          );
        })}
      </section>
    </div>
  );
}

function ResumeApp() {
  return (
    <div className="grid gap-4">
      <header className="flex items-center justify-between gap-4 rounded-[18px] border border-[#e0e0e0] bg-white p-6">
        <div>
          <p className="mb-1 text-sm font-semibold tracking-[-0.224px] text-[#7a7a7a]">Resume</p>
          <h1 className="mb-2 text-[34px] font-semibold leading-[1.08] tracking-[-0.374px] text-[#1d1d1f]">
            {portfolio.profile.name}
          </h1>
          <p className="m-0 text-[17px] leading-[1.47] tracking-[-0.374px] text-[#333333]">
            {portfolio.profile.role}
          </p>
        </div>
        <a
          className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-[#0066cc] px-5 py-2.5 text-white active:scale-95"
          href={portfolio.resume.downloadUrl}
          target="_blank"
          rel="noreferrer"
        >
          <Download size={17} />
          <span>PDF</span>
        </a>
      </header>
      <div className="grid gap-3">
        {portfolio.resume.items.map((item) => (
          <article
            className="relative rounded-[18px] border border-[#e0e0e0] bg-white p-6 pl-12"
            key={`${item.role}-${item.organization}`}
          >
            <span className="absolute left-5 top-7 size-3 rounded-full bg-[#0066cc]" aria-hidden="true" />
            <p className="mb-1 text-sm font-semibold tracking-[-0.224px] text-[#0066cc]">{item.period}</p>
            <h2 className="mb-1 text-[21px] font-semibold leading-[1.19] tracking-[0.231px] text-[#1d1d1f]">
              {item.role}
            </h2>
            <h3 className="mb-2 text-sm font-semibold tracking-[-0.224px] text-[#7a7a7a]">
              {item.organization}
            </h3>
            <p className="m-0 text-[17px] leading-[1.47] tracking-[-0.374px] text-[#333333]">
              {item.summary}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

function InfoChip({ children, icon: Icon }: { children: string; icon: typeof MapPin }) {
  return (
    <span className="inline-flex min-h-8 items-center gap-2 rounded-full border border-[#e0e0e0] bg-[#fafafc] px-3 text-sm font-semibold text-[#333333]">
      <Icon size={15} className="text-[#0066cc]" />
      {children}
    </span>
  );
}

function TextLink({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <a
      className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[#0066cc] px-4 text-sm font-medium text-[#0066cc] active:scale-95"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}
