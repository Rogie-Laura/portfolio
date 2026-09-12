"use client";

import { useEffect, useState } from "react";
import { Star, X } from "lucide-react";
import { Modal } from "./Modal";

function StarDisplay({
  rating,
  size = "sm",
}: {
  rating: number;
  size?: "sm" | "md";
}) {
  const sizeClass = size === "md" ? "h-5 w-5" : "h-3.5 w-3.5";

  return (
    <div className="flex justify-center gap-0.5">
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
    <div className="flex justify-center gap-2">
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
              className={`h-9 w-9 ${
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

export function ProfileRating() {
  const [stats, setStats] = useState<RatingStats>({
    average: 0,
    total: 0,
    totalStars: 0,
  });
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
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

  function closeModal() {
    setModalOpen(false);
    setSelectedRating(0);
    setError("");
    setSuccess("");
  }

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

      setTimeout(() => closeModal(), 900);
    } catch {
      setError("Could not submit rating. Please try again.");
      setSelectedRating(0);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className="mt-5 border-t border-white/10 pt-5 text-center">
        {loading ? (
          <p className="text-xs text-slate-500">Loading rating...</p>
        ) : (
          <>
            <StarDisplay
              rating={stats.total > 0 ? stats.average : 0}
              size="md"
            />
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-400/80">
              Portfolio Visitor Rating
            </p>
            <p className="mt-1 text-xl font-bold text-white">
              {stats.total > 0 ? stats.average.toFixed(1) : "—"}
            </p>
            <p className="mt-0.5 text-[11px] text-slate-400">
              {stats.total > 0
                ? `${stats.total} visitor rating${stats.total === 1 ? "" : "s"}`
                : "No visitor ratings yet"}
            </p>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-300 transition-all hover:border-emerald-400/50 hover:bg-emerald-500/20"
            >
              <Star className="h-3 w-3 fill-emerald-400 text-emerald-400" />
              Rate Me
            </button>
          </>
        )}
      </div>

      <Modal
        open={modalOpen}
        onClose={closeModal}
        labelId="rate-me-title"
        maxWidth="max-w-xs"
      >
        <div className="relative rounded-2xl border border-white/10 bg-slate-900 p-5 shadow-2xl shadow-emerald-500/10">
          <button
            type="button"
            aria-label="Close"
            onClick={closeModal}
            className="absolute right-3 top-3 rounded-lg p-1 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="text-center">
            <h3
              id="rate-me-title"
              className="text-sm font-semibold uppercase tracking-[0.15em] text-emerald-400"
            >
              Rate Me
            </h3>
            <p className="mt-2 text-xs text-slate-400">
              Portfolio visitor rating — piliin ang stars (1–5)
            </p>

            <div className="mt-5">
              <StarPicker
                value={selectedRating}
                onChange={handleRate}
                disabled={submitting}
              />
            </div>

            {error && <p className="mt-3 text-xs text-red-400">{error}</p>}
            {success && (
              <p className="mt-3 text-xs text-emerald-400">{success}</p>
            )}
            {submitting && (
              <p className="mt-3 text-xs text-slate-400">Saving...</p>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}
