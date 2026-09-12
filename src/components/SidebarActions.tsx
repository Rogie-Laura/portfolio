"use client";

import { useEffect, useState } from "react";
import { Download, Mail, Send, X } from "lucide-react";

type SidebarActionsProps = {
  email: string;
  resumeUrl: string;
};

export function SidebarActions({
  email,
  resumeUrl,
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
              Fill out the form below to send a message.
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
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
