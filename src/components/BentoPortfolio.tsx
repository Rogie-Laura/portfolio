import Image from "next/image";
import {
  Award,
  BrainCircuit,
  Briefcase,
  FolderKanban,
  GraduationCap,
  MapPin,
  Sparkles,
  Wrench,
} from "lucide-react";
import { profile } from "@/data/profile";
import { ProfileRating } from "./ProfileRating";
import { SelectedProjects } from "./SelectedProjects";
import { SidebarActions } from "./SidebarActions";

function Card({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={`card-glow animate-fade-up rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/5 ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function RoleBadges({
  rows,
  variant = "primary",
}: {
  rows: string[][];
  variant?: "primary" | "muted";
}) {
  const primaryClass =
    "rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium leading-snug text-emerald-300 transition-colors hover:border-emerald-400/40 hover:bg-emerald-500/15";
  const mutedClass =
    "rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-slate-400";

  return (
    <div className="flex w-full flex-col gap-1.5">
      {rows.map((row) => (
        <div
          key={row.join("-")}
          className={`grid gap-1.5 ${row.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}
        >
          {row.map((item) => (
            <span
              key={item}
              className={`text-center ${
                variant === "primary" ? primaryClass : mutedClass
              }`}
            >
              {item}
            </span>
          ))}
        </div>
      ))}
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
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10">
        {icon}
      </span>
      {children}
    </h2>
  );
}

export function BentoPortfolio() {
  const year = new Date().getFullYear();

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-6 sm:px-6 lg:px-10">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-blob absolute -left-40 -top-32 h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="animate-blob-alt absolute -bottom-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="animate-blob-alt absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-400/[0.07] blur-3xl" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgb(255 255 255 / 0.4) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.4) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-4 lg:grid-cols-12">
          {/* Top row — sidebar and main content aligned at the bottom */}
          <div className="grid gap-4 lg:col-span-12 lg:grid lg:grid-cols-12 lg:items-stretch">
          {/* Left sidebar — profile only */}
          <Card
            delay={0}
            className="flex h-full flex-col bg-gradient-to-br from-emerald-500/[0.08] to-cyan-500/[0.04] lg:col-span-4"
          >
            <div className="flex flex-col items-center text-center">
              <div className="animate-ring-pulse relative h-36 w-36 overflow-hidden rounded-full border-4 border-emerald-500/40 shadow-lg shadow-emerald-500/20 transition-transform duration-300 hover:scale-105 sm:h-40 sm:w-40">
                <Image
                  src={profile.photoUrl}
                  alt={profile.name}
                  fill
                  sizes="160px"
                  className="object-cover"
                  priority
                />
              </div>

              <h1 className="animate-gradient-text mt-4 bg-gradient-to-r from-emerald-300 via-cyan-300 to-emerald-300 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
                {profile.name}
              </h1>
              <div className="mt-3 w-full px-1">
                <RoleBadges rows={profile.roleRows} />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {profile.tagline}
              </p>
            </div>

            <div className="mt-5 border-t border-white/10 pt-5 text-sm text-slate-300">
              <p className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-emerald-400" />
                {profile.location} · {profile.timezone.replace(" — ", " · ")}
              </p>
              <p className="mt-2.5 text-xs leading-relaxed text-slate-500">
                Contact details are shared privately through the Contact Me
                form.
              </p>
            </div>

            <ProfileRating />

            <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] p-4">
              <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-300">
                <span className="animate-dot-pulse h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                Available
              </p>
              <div className="mt-2.5 grid grid-cols-3 gap-1.5">
                {profile.availability.type.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-1 text-center text-[10px] font-semibold uppercase tracking-wide text-emerald-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-3">
                <RoleBadges rows={profile.availability.roleRows} variant="muted" />
              </div>
            </div>

            <SidebarActions
              email={profile.email}
              resumeUrl={profile.resumeUrl}
              githubUrl={profile.social.github || undefined}
            />
          </Card>

          {/* Main content — Profile, Education + Certs side by side, Skills full width */}
          <div className="flex h-full min-h-0 flex-col gap-4 lg:col-span-8">
            <Card delay={100} className="shrink-0">
              <CardTitle icon={<Sparkles className="h-3.5 w-3.5" />}>
                Profile
              </CardTitle>
              <div className="space-y-3 text-sm leading-relaxed text-slate-400">
                {profile.about.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Card>

            <div className="grid shrink-0 gap-4 md:grid-cols-2">
              <Card delay={150} className="h-full">
                <CardTitle icon={<GraduationCap className="h-3.5 w-3.5" />}>
                  Educational Background
                </CardTitle>
                <div className="space-y-2">
                  {profile.education.map((item) => (
                    <div
                      key={`${item.degree}-${item.school}`}
                      className="rounded-xl border border-white/10 bg-white/[0.03] p-3 transition-colors hover:border-emerald-500/20"
                    >
                      <p className="text-xs font-semibold text-emerald-400">
                        {item.period}
                      </p>
                      <p className="mt-1 text-sm font-medium leading-snug text-white">
                        {item.degree}
                      </p>
                      <p className="mt-1 text-xs leading-snug text-slate-400">
                        {item.school}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card delay={200} className="h-full">
                <CardTitle icon={<Award className="h-3.5 w-3.5" />}>
                  Certificates and Trainings
                </CardTitle>
                <div className="space-y-2">
                  {profile.certificates.map((item) => (
                    <div
                      key={`${item.title}-${item.institution}`}
                      className="rounded-xl border border-white/10 bg-white/[0.03] p-3 transition-colors hover:border-emerald-500/20"
                    >
                      <p className="text-sm font-medium leading-snug text-white">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {item.institution}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <Card delay={250} className="flex min-h-0 flex-1 flex-col">
              <CardTitle icon={<Wrench className="h-3.5 w-3.5" />}>
                Skills
              </CardTitle>
              <div className="grid flex-1 content-start gap-4 sm:grid-cols-3">
                {profile.skills.map((group) => (
                  <div key={group.category}>
                    <h3 className="mb-2 text-xs font-semibold text-slate-300">
                      {group.category}
                    </h3>
                    <ul className="flex flex-wrap gap-1.5">
                      {group.items.map((skill) => (
                        <li
                          key={skill}
                          className="cursor-default rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-slate-300 transition-all duration-200 hover:scale-105 hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-300"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          </div>

          {/* Experience */}
          <Card delay={300} className="lg:col-span-7">
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
                      className="flex gap-2 text-sm leading-snug text-slate-400 transition-colors hover:text-slate-300"
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
          <Card delay={400} className="lg:col-span-5">
            <CardTitle icon={<BrainCircuit className="h-3.5 w-3.5" />}>
              Data & AI Capabilities
            </CardTitle>
            <ul className="space-y-2">
              {profile.dataAiCapabilities.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-sm leading-snug text-slate-400 transition-colors hover:text-slate-300"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>

          {/* Projects */}
          <Card delay={650} className="lg:col-span-12">
            <CardTitle icon={<FolderKanban className="h-3.5 w-3.5" />}>
              Selected Projects
            </CardTitle>
            <SelectedProjects projects={profile.projects} />
          </Card>

        </div>

        <footer
          className="animate-fade-up mt-6 flex flex-col items-center justify-between gap-2 text-xs text-slate-500 sm:flex-row"
          style={{ animationDelay: "1000ms" }}
        >
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <p>Built with Next.js & Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}
