"use client";

import { useEffect, useRef } from "react";
import type { Testimonial } from "@/payload-types";

interface ReviewsSectionProps {
  reviews?: Testimonial[] | null;
}

type Review = {
  quote: string;
  name: string;
  role?: string | null;
  rating?: number | null;
};

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  // Only display testimonials fetched from Payload CMS.
  // No hardcoded fallback reviews.
  const activeReviews: Review[] = reviews ?? [];

  const ratingOf = (review: Review) => {
    const value = review.rating || 5;
    return Math.min(5, Math.max(1, Math.round(value)));
  };

  const averageRating =
    activeReviews.length > 0
      ? activeReviews.reduce((sum, review) => sum + ratingOf(review), 0) /
        activeReviews.length
      : 0;

  const averageStars =
    "★".repeat(Math.round(averageRating)) +
    "☆".repeat(5 - Math.round(averageRating));

  useEffect(() => {
    const track = trackRef.current;
    const prev = prevRef.current;
    const next = nextRef.current;

    if (!track) return;

    const step = () => {
      const card = track.querySelector<HTMLElement>(":scope > *");
      return card ? card.getBoundingClientRect().width + 20 : 320;
    };

    const update = () => {
      if (prev) prev.disabled = track.scrollLeft <= 4;

      if (next) {
        next.disabled =
          track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
      }
    };

    const onPrev = () => track.scrollBy({ left: -step(), behavior: "smooth" });
    const onNext = () => track.scrollBy({ left: step(), behavior: "smooth" });

    prev?.addEventListener("click", onPrev);
    next?.addEventListener("click", onNext);
    track.addEventListener("scroll", update, { passive: true });

    update();

    return () => {
      prev?.removeEventListener("click", onPrev);
      next?.removeEventListener("click", onNext);
      track.removeEventListener("scroll", update);
    };
  }, [activeReviews]);

  // Hide the entire reviews section when no CMS reviews exist.
  if (activeReviews.length === 0) {
    return null;
  }

  return (
    <div className="grid lg:grid-cols-[380px_1fr] gap-10 items-start">
      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory"
      >
        {activeReviews.map((review) => {
          const rating = ratingOf(review);
          const stars = "★".repeat(rating) + "☆".repeat(5 - rating);

          return (
            <figure
              key={review.name}
              className="snap-start shrink-0 w-[300px] bg-white border border-black/5 p-6 rounded-3xl flex flex-col justify-between h-64 shadow-sm"
            >
              <p className="text-sm text-neutral-600 italic">
                &ldquo;{review.quote}&rdquo;
              </p>

              <div className="border-t border-black/5 pt-3">
                <span className="text-yellow-400 text-xs tracking-widest block">
                  {stars}
                </span>

                <p className="text-xs font-bold text-forest">
                  {review.name}
                </p>

                <p className="text-[10px] text-neutral-400">
                  {review.role}
                </p>
              </div>
            </figure>
          );
        })}
      </div>

      <div>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-yellow-400 text-2xl tracking-widest">
            {averageStars}
          </span>

          <span className="text-3xl font-extrabold text-forest">
            {averageRating.toFixed(1)} / 5
          </span>
        </div>

        <div className="flex gap-2 mt-8">
          <button
            ref={prevRef}
            type="button"
            aria-label="Previous review"
            className="w-11 h-11 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition disabled:opacity-30 disabled:pointer-events-none"
          >
            ←
          </button>

          <button
            ref={nextRef}
            type="button"
            aria-label="Next review"
            className="w-11 h-11 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition disabled:opacity-30 disabled:pointer-events-none"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
