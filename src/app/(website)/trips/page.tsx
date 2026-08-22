import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { treks as fallbackTreks } from "@/lib/treks";
import { TripFilters } from "@/components/TripFilters";
import { Reveal } from "@/components/Reveal";
import { getPublishedTreks, getTrekCategories } from "@/lib/queries";
import type { Media, TrekCategory } from "@/payload-types";

export const metadata: Metadata = {
  title: "All Treks",
  description:
    "Browse one-day treks, night treks, backpacking tours, and waterfall expeditions by Manmurad Bhatkanti.",
};

const defaultCategories = [
  {
    type: "one-day",
    label: "One Day Trek",
    count: 4,
    image: "/img/tt-trekking.webp",
    alt: "One Day Trek",
  },
  {
    type: "night-trek",
    label: "Night Trek",
    count: 2,
    image: "/img/hero.webp",
    alt: "Night Trek",
  },
  {
    type: "backpacking",
    label: "Backpacking",
    count: 1,
    image: "/img/tt-rafting.webp",
    alt: "Backpacking Tour",
  },
  {
    type: "waterfall",
    label: "Waterfalls",
    count: 2,
    image: "/img/tt-coastal-adventure.jpg",
    alt: "Waterfall Expedition",
  },
];

const categoryImages: Record<string, string> = {
  "one-day": "/img/tt-trekking.webp",
  "night-trek": "/img/hero.webp",
  backpacking: "/img/tt-rafting.webp",
  waterfall: "/img/tt-coastal-adventure.jpg",
};

type SearchParams = Promise<{
  category?: string;
  sort?: string;
}>;

function getTrekImage(trek: any): string {
  if (typeof trek.image === "string") return trek.image;
  if (trek.image && typeof trek.image === "object") {
    return (trek.image as Media).url || "/placeholder.jpg";
  }
  return "/placeholder.jpg";
}

function getTrekImageAlt(trek: any): string {
  return trek.imageAlt || trek.name;
}

export default async function TripsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { category = "all", sort = "" } = await searchParams;

  const allTreks = await getPublishedTreks();
  const dbCategories = await getTrekCategories();

  // Compute trek counts per category
  const counts: Record<string, number> = {};
  if (allTreks) {
    allTreks.forEach((trek) => {
      const catSlug =
        trek.category && typeof trek.category === "object"
          ? (trek.category as TrekCategory).slug
          : "";
      if (catSlug) {
        counts[catSlug] = (counts[catSlug] || 0) + 1;
      }
    });
  }

  // Display categories
  const categoriesList =
    dbCategories && dbCategories.length > 0
      ? dbCategories.map((cat) => ({
          type: cat.slug,
          label: cat.name,
          count: counts[cat.slug] || 0,
          image: categoryImages[cat.slug] || "/img/tt-trekking.webp",
          alt: cat.name,
        }))
      : defaultCategories;

  // Filter and sort treks
  let visible: any[] = allTreks && allTreks.length > 0 ? [...allTreks] : [...fallbackTreks];

  if (category !== "all") {
    visible = visible.filter((trek) => {
      const catSlug =
        trek.category && typeof trek.category === "object"
          ? (trek.category as any).slug
          : trek.category;
      return catSlug === category;
    });
  }

  if (sort === "price-asc") {
    visible.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    visible.sort((a, b) => b.price - a.price);
  } else if (sort === "days-asc") {
    visible.sort((a, b) => a.durationDays - b.durationDays);
  }

  return (
    <>
      {/* TRIP TYPES CAROUSEL */}
      <section className="pt-12 pb-6">
        <div className="max-w-[1400px] mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase text-center mb-10 text-forest">
            Trek Categories
          </h1>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 relative">
          <div className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory">
            {categoriesList.map((cat) => (
              <Link
                key={cat.type}
                href={`/trips?category=${cat.type}`}
                className="card-zoom snap-start shrink-0 w-[170px] relative rounded-2xl overflow-hidden block h-44"
              >
                <Image
                  src={cat.image}
                  alt={cat.alt}
                  fill
                  sizes="170px"
                  className="object-cover"
                />
                <span className="absolute top-2 left-2 bg-white/90 text-[9px] font-bold uppercase px-2 py-0.5 rounded-full">
                  {cat.count} {cat.count === 1 ? "Trek" : "Treks"}
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-3 inset-x-0 text-center text-white text-xs font-extrabold uppercase">
                  {cat.label}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <TripFilters count={visible.length} />

      {/* TRIPS GRID */}
      <Reveal className="max-w-[1400px] mx-auto px-6 pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visible.map((trek) => {
            const imageUrl = getTrekImage(trek);
            const imageAlt = getTrekImageAlt(trek);
            return (
              <article
                key={trek.slug}
                className="card-zoom relative rounded-3xl overflow-hidden group h-72"
              >
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute top-4 left-4 bg-white/90 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full">
                  {trek.location}
                </span>
                <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                  <h3 className="font-extrabold uppercase leading-snug mb-2">
                    <Link href={`/treks/${trek.slug}`} className="hover:underline">
                      {trek.name}
                    </Link>
                  </h3>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white/70">
                      {trek.durationDays} {trek.durationDays === 1 ? "Day" : "Days"}{" "}
                      • {trek.difficulty}
                    </span>
                    <span className="font-bold text-primary">
                      ₹{trek.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {visible.length === 0 && (
          <p className="text-center text-sm text-neutral-500 py-16">
            No treks found for this category.
          </p>
        )}
      </Reveal>
    </>
  );
}
