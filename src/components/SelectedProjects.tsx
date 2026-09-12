"use client";

import { useEffect, useState } from "react";
import {
  FolderKanban,
  Layers,
  MapPin,
  Smartphone,
  User,
  Wrench,
  X,
} from "lucide-react";
import type { Project } from "@/data/profile";

function CategoryBadge({ category }: { category: Project["category"] }) {
  const config = {
    web: { label: "Web App", icon: Layers, className: "text-cyan-300 bg-cyan-500/10 border-cyan-500/20" },
    mobile: { label: "Mobile App", icon: Smartphone, className: "text-violet-300 bg-violet-500/10 border-violet-500/20" },
    fullstack: { label: "Web + Mobile", icon: MapPin, className: "text-emerald-300 bg-emerald-500/10 border-emerald-500/20" },
  }[category];

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${config.className}`}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}

function ScreenshotPlaceholder({ title }: { title: string }) {
  return (
    <div className="flex aspect-video items-center justify-center rounded-xl border border-dashed border-white/10 bg-gradient-to-br from-emerald-500/[0.06] to-cyan-500/[0.04]">
      <div className="text-center px-4">
        <FolderKanban className="mx-auto h-8 w-8 text-emerald-400/50" />
        <p className="mt-2 text-xs font-medium text-slate-400">{title}</p>
        <p className="mt-1 text-[10px] text-slate-500">
          Screenshots available on request
        </p>
      </div>
    </div>
  );
}

function ProjectDetailModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`project-${project.id}-title`}
    >
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl shadow-emerald-500/10">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4">
          <div>
            <div className="mb-2">
              <CategoryBadge category={project.category} />
            </div>
            <h3
              id={`project-${project.id}-title`}
              className="text-lg font-bold text-white"
            >
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-emerald-400/90">{project.subtitle}</p>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {project.screenshots && project.screenshots.length > 0 ? (
              project.screenshots.map((src) => (
                <div
                  key={src}
                  className="overflow-hidden rounded-xl border border-white/10"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${project.title} screenshot`}
                    className="aspect-video w-full object-cover"
                  />
                </div>
              ))
            ) : (
              <>
                <ScreenshotPlaceholder title={`${project.title} — Dashboard`} />
                <ScreenshotPlaceholder title={`${project.title} — Interface`} />
              </>
            )}
          </div>

          <section className="mt-5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-400">
              Project Overview
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              {project.overview}
            </p>
          </section>

          {project.purpose && (
            <section className="mt-5">
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-400">
                Purpose
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {project.purpose}
              </p>
            </section>
          )}

          <section className="mt-5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-400">
              Key Features
            </h4>
            <ul className="mt-2 space-y-1.5">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="flex gap-2 text-sm leading-snug text-slate-400"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-400">
              <User className="h-3.5 w-3.5" />
              My Role
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              {project.role}
            </p>
          </section>

          <section className="mt-5">
            <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-400">
              <Wrench className="h-3.5 w-3.5" />
              Technology
            </h4>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {project.technology.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export function SelectedProjects({ projects }: { projects: Project[] }) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <article
            key={project.id}
            className="animate-fade-up group flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500/30 hover:bg-emerald-500/[0.05] hover:shadow-lg hover:shadow-emerald-500/10"
            style={{ animationDelay: `${600 + index * 80}ms` }}
          >
            <div className="mb-2">
              <CategoryBadge category={project.category} />
            </div>
            <h3 className="text-sm font-semibold text-white transition-colors group-hover:text-emerald-300">
              {project.title}
            </h3>
            {project.subtitle && (
              <p className="mt-0.5 line-clamp-2 text-[11px] font-medium leading-snug text-emerald-400/80">
                {project.subtitle}
              </p>
            )}
            <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-400">
              {project.shortDescription}
            </p>
            <div className="mt-3 flex flex-wrap gap-1">
              {project.technology.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-medium text-emerald-300 transition-colors group-hover:bg-emerald-500/20"
                >
                  {tech}
                </span>
              ))}
              {project.technology.length > 3 && (
                <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-slate-400">
                  +{project.technology.length - 3}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => setActiveProject(project)}
              className="mt-4 w-full rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-300 transition-all hover:border-emerald-400/40 hover:bg-emerald-500/20"
            >
              View Details
            </button>
          </article>
        ))}
      </div>

      {activeProject && (
        <ProjectDetailModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </>
  );
}
