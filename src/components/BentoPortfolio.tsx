import Image from "next/image";
import {
  BrainCircuit,
  Briefcase,
  Download,
  FolderKanban,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Wrench,
} from "lucide-react";
import { profile } from "@/data/profile";

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-emerald-500/25 ${className}`}
    >
      {children}
    </div>
  );
}

function CardTitle({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-400">
      {icon}
      {children}
    </h2>
  );
}

export function BentoPortfolio() {
  const year = new Date().getFullYear();

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-6 sm:px-6 lg:px-10">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-32 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-4 lg:grid-cols-12">
          {/* Profile / Hero card */}
          <Card className="lg:col-span-4 lg:row-span-2 flex flex-col bg-gradient-to-br from-emerald-500/[0.08] to-cyan-500/[0.04]">
            <div className="flex flex-col items-center text-center">
              <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-emerald-500/30 shadow-lg shadow-emerald-500/10">
                <Image
                  src={profile.photoUrl}
                  alt={profile.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <h1 className="mt-4 text-2xl font-bold tracking-tight text-white">
                {profile.name}
              </h1>
              <p className="mt-2 text-sm font-medium leading-relaxed text-emerald-300">
                {profile.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {profile.tagline}
              </p>
            </div>

            <div className="mt-5 space-y-2.5 border-t border-white/10 pt-5 text-sm text-slate-300">
              <p className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-emerald-400" />
                {profile.location} · {profile.timezone.replace(" — ", " · ")}
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2.5 break-all transition-colors hover:text-emerald-300"
              >
                <Mail className="h-4 w-4 shrink-0 text-emerald-400" />
                {profile.email}
              </a>
              <a
                href={`tel:${profile.phone}`}
                className="flex items-center gap-2.5 transition-colors hover:text-emerald-300"
              >
                <Phone className="h-4 w-4 shrink-0 text-emerald-400" />
                {profile.phone}
              </a>
            </div>

            <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] p-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                {profile.availability.type}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                {profile.availability.roles}
              </p>
            </div>

            <div className="mt-auto flex flex-col gap-2.5 pt-5">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-emerald-400"
              >
                <Mail className="h-4 w-4" />
                Contact Me
              </a>
              <a
                href={profile.resumeUrl}
                download
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </div>
          </Card>

          {/* About */}
          <Card className="lg:col-span-8">
            <CardTitle icon={<Sparkles className="h-3.5 w-3.5" />}>
              Profile
            </CardTitle>
            <div className="space-y-3 text-sm leading-relaxed text-slate-400">
              {profile.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Card>

          {/* Skills */}
          <Card className="lg:col-span-8">
            <CardTitle icon={<Wrench className="h-3.5 w-3.5" />}>
              Skills
            </CardTitle>
            <div className="grid gap-4 sm:grid-cols-3">
              {profile.skills.map((group) => (
                <div key={group.category}>
                  <h3 className="mb-2 text-xs font-semibold text-slate-300">
                    {group.category}
                  </h3>
                  <ul className="flex flex-wrap gap-1.5">
                    {group.items.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-slate-300"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>

          {/* Experience */}
          <Card className="lg:col-span-7">
            <CardTitle icon={<Briefcase className="h-3.5 w-3.5" />}>
              Experience
            </CardTitle>
            {profile.experience.map((job) => (
              <div key={`${job.company}-${job.role}`}>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-base font-semibold text-white">
                    {job.role}
                  </h3>
                  <p className="text-xs font-medium text-emerald-400">
                    {job.period}
                  </p>
                </div>
                <p className="mt-0.5 text-sm text-slate-300">{job.company}</p>
                <ul className="mt-3 space-y-1.5">
                  {job.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-sm leading-snug text-slate-400"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Card>

          {/* Data & AI Capabilities */}
          <Card className="lg:col-span-5">
            <CardTitle icon={<BrainCircuit className="h-3.5 w-3.5" />}>
              Data & AI Capabilities
            </CardTitle>
            <ul className="space-y-2">
              {profile.dataAiCapabilities.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-sm leading-snug text-slate-400"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>

          {/* Projects */}
          <Card className="lg:col-span-12">
            <CardTitle icon={<FolderKanban className="h-3.5 w-3.5" />}>
              Selected Projects
            </CardTitle>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {profile.projects.map((project) => (
                <article
                  key={project.title}
                  className="group flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:-translate-y-0.5 hover:border-emerald-500/25 hover:bg-white/[0.05]"
                >
                  <h3 className="text-sm font-semibold text-white">
                    {project.title}
                  </h3>
                  {project.subtitle && (
                    <p className="mt-0.5 text-[11px] font-medium leading-snug text-emerald-400/80">
                      {project.subtitle}
                    </p>
                  )}
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-400">
                    {project.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-medium text-emerald-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </Card>
        </div>

        <footer className="mt-6 flex flex-col items-center justify-between gap-2 text-xs text-slate-500 sm:flex-row">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <p>Built with Next.js & Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}
