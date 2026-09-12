"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

function StarDisplay({
  rating,
  size = "md",
}: {
  rating: number;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass =
    size === "lg" ? "h-8 w-8" : size === "sm" ? "h-4 w-4" : "h-6 w-6";

  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={`${sizeClass} ${
            index < Math.round(rating)
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
  disabled,
}: {
  value: number;
  onChange: (rating: number) => void;
  disabled?: boolean;
}) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1.5">
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        const active = starValue <= (hover || value);

        return (
          <button
            key={starValue}
            type="button"
            disabled={disabled}
            aria-label={`Rate ${starValue} stars`}
            onMouseEnter={() => !disabled && setHover(starValue)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange(starValue)}
            className="transition-transform hover:scale-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Star
              className={`h-10 w-10 ${
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

type RatingStats = {
  average: number;
  total: number;
  totalStars: number;
};

export function PublicReviews() {
  const [stats, setStats] = useState<RatingStats>({
    average: 0,
    total: 0,
    totalStars: 0,
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadStats() {
    setLoading(true);
    try {
      const response = await fetch("/api/reviews");
      const data = await response.json();
      if (response.ok) {
        setStats({
          average: data.average ?? 0,
          total: data.total ?? 0,
          totalStars: data.totalStars ?? 0,
        });
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStats();
  }, []);

  async function handleRate(rating: number) {
    setSelectedRating(rating);
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Could not submit rating.");
        setSelectedRating(0);
        return;
      }

      setSuccess("Salamat sa rating!");
      setSelectedRating(0);
      await loadStats();
    } catch {
      setError("Could not submit rating. Please try again.");
      setSelectedRating(0);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="card-glow animate-fade-up rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
      <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-400">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10">
          <Star className="h-3.5 w-3.5 fill-emerald-400 text-emerald-400" />
        </span>
        Rate Me
      </h2>

      <div className="flex flex-col items-center gap-6 py-4 text-center">
        {loading ? (
          <p className="text-sm text-slate-400">Loading...</p>
        ) : (
          <>
            <div className="flex flex-col items-center gap-2">
              <StarDisplay
                rating={stats.total > 0 ? stats.average : 0}
                size="lg"
              />
              <p className="text-4xl font-bold text-white">
                {stats.total > 0 ? stats.average.toFixed(1) : "—"}
              </p>
              <p className="text-sm text-slate-400">
                {stats.total > 0
                  ? `${stats.totalStars} stars · ${stats.total} rating${stats.total === 1 ? "" : "s"}`
                  : "No ratings yet"}
              </p>
            </div>

            <div className="w-full max-w-sm border-t border-white/10 pt-6">
              <p className="mb-3 text-sm font-medium text-white">
                I-rate mo ako
              </p>
              <StarPicker
                value={selectedRating}
                onChange={handleRate}
                disabled={submitting}
              />
              {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
              {success && (
                <p className="mt-3 text-sm text-emerald-400">{success}</p>
              )}
              {submitting && (
                <p className="mt-3 text-sm text-slate-400">Saving...</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
