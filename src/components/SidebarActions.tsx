"use client";

import { useEffect, useState } from "react";
import { Download, Mail, Send, X } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-1.005-.525-1.005-1.035 0-1.035.705 0 1.23.645 1.395 1.23.81 2.145 2.115 1.545 2.64 1.17.075-.915.405-1.545.735-1.905-2.565-.285-5.25-1.305-5.25-5.805 0-1.29.465-2.34 1.23-3.165-.12-.3-.54-1.515.12-3.165 0 0 1.005-.315 3.3 1.2.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.2 3.3-1.2.66 1.65.24 2.865.12 3.165.765.825 1.23 1.875 1.23 3.165 0 4.515-2.695 5.505-5.265 5.805.42.36.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

type SidebarActionsProps = {
  email: string;
  resumeUrl: string;
  githubUrl?: string;
};

export function SidebarActions({
  email,
  resumeUrl,
  githubUrl,
}: SidebarActionsProps) {
  const [contactOpen, setContactOpen] = useState(false);
  const [form, setForm] = useState({ name: "", subject: "", message: "" });

  useEffect(() => {
    if (!contactOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setContactOpen(false);
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [contactOpen]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const body = encodeURIComponent(
      `From: ${form.name}\n\n${form.message}`,
    );
    const subject = encodeURIComponent(
      form.subject || "Portfolio Inquiry",
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setContactOpen(false);
    setForm({ name: "", subject: "", message: "" });
  }

  return (
    <>
      <div className="mt-auto flex flex-col gap-2.5 pt-5">
        <button
          type="button"
          onClick={() => setContactOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:scale-[1.03] hover:bg-emerald-400 hover:shadow-emerald-400/40"
        >
          <Mail className="h-4 w-4" />
          Contact Me
        </button>

        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:border-emerald-500/30 hover:bg-white/10"
          >
            <GithubIcon className="h-4 w-4" />
            GitHub
          </a>
        )}

        <a
          href={resumeUrl}
          download
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:border-emerald-500/30 hover:bg-white/10"
        >
          <Download className="h-4 w-4" />
          Download Resume
        </a>
      </div>

      {contactOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-title"
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={() => setContactOpen(false)}
          />

          <div className="relative w-full max-w-md animate-fade-up rounded-2xl border border-white/10 bg-slate-900 p-5 shadow-2xl shadow-emerald-500/10">
            <button
              type="button"
              aria-label="Close"
              onClick={() => setContactOpen(false)}
              className="absolute right-3 top-3 rounded-lg p-1 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <h3
              id="contact-title"
              className="text-sm font-semibold uppercase tracking-[0.15em] text-emerald-400"
            >
              Contact Me
            </h3>
            <p className="mt-2 text-xs text-slate-400">
              Send a message through your email app. Your contact details stay
              private until you reach out.
            </p>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <div>
                <label className="mb-1 block text-xs text-slate-400">
                  Your name
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-emerald-500/40"
                  placeholder="Juan Dela Cruz"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-slate-400">
                  Subject
                </label>
                <input
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-emerald-500/40"
                  placeholder="Project inquiry"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-slate-400">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  required
                  rows={4}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-emerald-500/40"
                  placeholder="Write your message..."
                />
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-emerald-400"
              >
                <Send className="h-4 w-4" />
                Send via Email
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
