"use client";

import { useRouter, useSearchParams } from "next/navigation";

const categoryOptions = [
  { value: "all", label: "All Treks" },
  { value: "one-day", label: "One Day Trek" },
  { value: "night-trek", label: "Night Trek" },
  { value: "backpacking", label: "Backpacking Tour" },
  { value: "waterfall", label: "Waterfall Expedition" },
];

const sortOptions = [
  { value: "", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "days-asc", label: "Duration: Short to Long" },
];

export function TripFilters({ count }: { count: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") ?? "all";
  const sort = searchParams.get("sort") ?? "";

  const update = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    const query = params.toString();
    router.push(query ? `/trips?${query}` : "/trips", { scroll: false });
  };

  return (
    <section className="max-w-[1400px] mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-4 border-t border-black/10">
      <div className="flex items-center gap-4 flex-wrap">
        <label className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-forest">
          Category
          <select
            value={category}
            onChange={(e) => update("category", e.target.value)}
            className="border border-black/20 rounded-full px-4 py-2.5 text-xs bg-white outline-none cursor-pointer"
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="text-sm font-semibold uppercase tracking-widest text-forest">
        {count} {count === 1 ? "Trek" : "Treks"} Available
      </p>
      <label className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-forest">
        Sort
        <select
          value={sort}
          onChange={(e) => update("sort", e.target.value)}
          className="border border-black/20 rounded-full px-4 py-2.5 text-xs bg-white outline-none cursor-pointer normal-case tracking-normal"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </section>
  );
}
