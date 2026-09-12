"use client";

import { useState } from "react";
import { Download, Loader2, Mail, Send, X } from "lucide-react";
import { Modal } from "./Modal";

type SidebarActionsProps = {
  resumeUrl: string;
};

export function SidebarActions({ resumeUrl }: SidebarActionsProps) {
  const [contactOpen, setContactOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function closeContact() {
    setContactOpen(false);
    setError("");
    setSuccess("");
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Could not send message. Please try again.");
        return;
      }

      setSuccess("Message sent! Salamat — babasahin ko ito at babalikan kita.");
      setForm({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => closeContact(), 1500);
    } catch {
      setError("Could not send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
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

      <Modal open={contactOpen} onClose={closeContact} labelId="contact-title">
        <div className="relative max-h-[min(90vh,640px)] overflow-y-auto rounded-2xl border border-white/10 bg-slate-900 p-5 shadow-2xl shadow-emerald-500/10">
          <button
            type="button"
            aria-label="Close"
            onClick={closeContact}
            className="absolute right-3 top-3 z-10 rounded-lg p-1 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
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
            Send a message — saved securely so I can review and reply.
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
                disabled={submitting}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-emerald-500/40 disabled:opacity-50"
                placeholder="Juan Dela Cruz"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-slate-400">
                Your email (optional, for reply)
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                disabled={submitting}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-emerald-500/40 disabled:opacity-50"
                placeholder="you@email.com"
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
                disabled={submitting}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-emerald-500/40 disabled:opacity-50"
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
                disabled={submitting}
                rows={4}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-emerald-500/40 disabled:opacity-50"
                placeholder="Write your message..."
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}
            {success && <p className="text-sm text-emerald-400">{success}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}
