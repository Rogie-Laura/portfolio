"use client";

import { useEffect, useState } from "react";
import { MessageSquareQuote, Send, Star } from "lucide-react";
import type { Review } from "@/lib/supabase/client";

const relationships = [
  "Client",
  "Coworker",
  "Supervisor",
  "Colleague",
  "Team Member",
] as const;

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < rating
              ? "fill-emerald-400 text-emerald-400"
              : "fill-transparent text-slate-600"
          }`}
        />
      ))}
    </div>
  );
}

function StarPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (rating: number) => void;
}) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        const active = starValue <= (hover || value);

        return (
          <button
            key={starValue}
            type="button"
            aria-label={`Rate ${starValue} stars`}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange(starValue)}
            className="transition-transform hover:scale-110"
          >
            <Star
              className={`h-7 w-7 ${
                active
                  ? "fill-emerald-400 text-emerald-400"
                  : "fill-transparent text-slate-600"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

export function PublicReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    reviewerName: "",
    relationship: "Coworker",
    projectName: "",
    rating: 0,
    message: "",
  });

  async function loadReviews() {
    setLoading(true);
    try {
      const response = await fetch("/api/reviews");
      const data = await response.json();
      if (response.ok) {
        setReviews(data.reviews ?? []);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReviews();
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Could not submit review.");
        return;
      }

      setSuccess("Thank you! Your rating has been posted.");
      setForm({
        reviewerName: "",
        relationship: "Coworker",
        projectName: "",
        rating: 0,
        message: "",
      });
      await loadReviews();
    } catch {
      setError("Could not submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  return (
    <div className="card-glow animate-fade-up rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
      <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-400">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10">
          <MessageSquareQuote className="h-3.5 w-3.5" />
        </span>
        Public Ratings & Reviews
      </h2>

      <p className="mb-5 text-sm text-slate-400">
        Clients, coworkers, and teammates who worked with me can leave a rating
        here — especially for systems we built together.
      </p>

      <div className="mb-6 flex flex-wrap items-center gap-4 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] p-4">
        <div>
          <p className="text-3xl font-bold text-white">
            {reviews.length > 0 ? averageRating.toFixed(1) : "—"}
          </p>
          <p className="text-xs text-slate-400">Average rating</p>
        </div>
        <div>
          <StarDisplay rating={Math.round(averageRating)} />
          <p className="mt-1 text-xs text-slate-400">
            {reviews.length} review{reviews.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-sm font-semibold text-white">Leave a rating</h3>

          <div>
            <label className="mb-1 block text-xs text-slate-400">Your name</label>
            <input
              value={form.reviewerName}
              onChange={(event) =>
                setForm({ ...form, reviewerName: event.target.value })
              }
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-emerald-500/40"
              placeholder="Juan Dela Cruz"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-slate-400">
              Relationship
            </label>
            <select
              value={form.relationship}
              onChange={(event) =>
                setForm({ ...form, relationship: event.target.value })
              }
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-emerald-500/40"
            >
              {relationships.map((item) => (
                <option key={item} value={item} className="bg-slate-900">
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs text-slate-400">
              Project / System (optional)
            </label>
            <input
              value={form.projectName}
              onChange={(event) =>
                setForm({ ...form, projectName: event.target.value })
              }
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-emerald-500/40"
              placeholder="CFRAME, PRISMS, PRO4A COMMAND..."
            />
          </div>

          <div>
            <label className="mb-2 block text-xs text-slate-400">Rating</label>
            <StarPicker
              value={form.rating}
              onChange={(rating) => setForm({ ...form, rating })}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-slate-400">Message</label>
            <textarea
              value={form.message}
              onChange={(event) =>
                setForm({ ...form, message: event.target.value })
              }
              rows={4}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-emerald-500/40"
              placeholder="Share your experience working with Rogie..."
              required
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}
          {success && <p className="text-sm text-emerald-400">{success}</p>}

          <button
            type="submit"
            disabled={submitting || form.rating === 0}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            {submitting ? "Submitting..." : "Submit Rating"}
          </button>
        </form>

        <div>
          <h3 className="mb-4 text-sm font-semibold text-white">
            What others say
          </h3>

          {loading ? (
            <p className="text-sm text-slate-400">Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/10 p-6 text-center">
              <p className="text-sm text-slate-400">
                No ratings yet. Be the first to leave a review!
              </p>
            </div>
          ) : (
            <div className="max-h-[520px] space-y-3 overflow-y-auto pr-1">
              {reviews.map((review) => (
                <article
                  key={review.id}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-emerald-500/20"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-white">
                        {review.reviewer_name}
                      </p>
                      <p className="text-xs text-emerald-400/80">
                        {review.relationship}
                        {review.project_name
                          ? ` · ${review.project_name}`
                          : ""}
                      </p>
                    </div>
                    <StarDisplay rating={review.rating} />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {review.message}
                  </p>
                  <p className="mt-2 text-[11px] text-slate-500">
                    {new Date(review.created_at).toLocaleDateString("en-PH", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
