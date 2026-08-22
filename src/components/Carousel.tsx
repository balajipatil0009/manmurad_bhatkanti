"use client";

import { useEffect, useRef } from "react";

interface CarouselProps {
  children: React.ReactNode;
  className?: string;
  trackClassName?: string;
  stepOffset?: number;
  eyebrow?: string;
  title?: string;
  showControls?: boolean;
}

export function Carousel({
  children,
  className = "",
  trackClassName = "",
  stepOffset = 24,
  eyebrow,
  title,
  showControls = true,
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const prev = prevRef.current;
    const next = nextRef.current;
    if (!track) return;

    const step = () => {
      const card = track.querySelector<HTMLElement>(":scope > *");
      return card ? card.getBoundingClientRect().width + stepOffset : 320;
    };

    const update = () => {
      if (prev) prev.disabled = track.scrollLeft <= 4;
      if (next)
        next.disabled =
          track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
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
  }, [stepOffset]);

  return (
    <div className={className}>
      {(eyebrow || title) && (
        <div className="flex items-end justify-between mb-8">
          <div>
            {eyebrow && (
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-moss mb-2">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-forest">
                {title}
              </h2>
            )}
          </div>
          {showControls && (
            <div className="flex gap-2">
              <button
                ref={prevRef}
                type="button"
                aria-label="Previous"
                className="w-11 h-11 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition disabled:opacity-30 disabled:pointer-events-none"
              >
                ←
              </button>
              <button
                ref={nextRef}
                type="button"
                aria-label="Next"
                className="w-11 h-11 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition disabled:opacity-30 disabled:pointer-events-none"
              >
                →
              </button>
            </div>
          )}
        </div>
      )}
      <div
        ref={trackRef}
        className={`flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory ${trackClassName}`}
      >
        {children}
      </div>
    </div>
  );
}
