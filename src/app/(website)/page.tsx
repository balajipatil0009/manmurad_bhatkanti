import Image from "next/image";
import Link from "next/link";
import * as RemixIcons from "@remixicon/react";
import { SITE } from "@/lib/site";
import { treks as fallbackTreks } from "@/lib/treks";
import { Carousel } from "@/components/Carousel";
import { Reveal } from "@/components/Reveal";
import { ReviewsSection } from "@/components/ReviewsSection";
import {
  getPublishedTreks,
  getFeatures,
  getTestimonials,
  getGalleryItems,
  getGlobal,
} from "@/lib/queries";
import type { Media, TrekCategory, SiteSetting } from "@/payload-types";
import { RiChat1Line, RiPhoneLine } from "@remixicon/react";

const defaultGallery = [
  {
    image: "/img/dest-costa-rica.webp",
    alt: "Rajgad Peak Group Photo",
    title: "Rajgad Fort Trek",
    date: "August 2026",
  },
  {
    image: "/img/dest-argentina.webp",
    alt: "Harishchandragad Camping",
    title: "Harishchandragad",
    date: "July 2026",
  },
  {
    image: "/img/dest-bhutan.webp",
    alt: "Devkund Trek group",
    title: "Devkund Waterfall",
    date: "June 2026",
  },
  {
    image: "/img/dest-belize.webp",
    alt: "Kalsubai peak sunrise",
    title: "Kalsubai Sunrise",
    date: "May 2026",
  },
];

const defaultFeatures = [
  {
    emoji: "🧗‍♂️",
    title: "Experienced Team",
    description:
      "Our leaders have completed certified mountaineering courses and navigated Maharashtra's toughest ridges.",
  },
  {
    emoji: "🛡️",
    title: "Safety First",
    description:
      "Equipped with certified safety equipment, tracking ropes, and comprehensive first-aid response systems.",
  },
  {
    emoji: "🗺️",
    title: "Well-Planned Trips",
    description:
      "Custom itineraries detailing pick-up timelines, food stops, guides, and packing essentials.",
  },
  {
    emoji: "💸",
    title: "Affordable Packages",
    description:
      "Transparent pricing starting from ₹1,199 including transport and local home-style hot meals.",
  },
  {
    emoji: "⛺",
    title: "Memorable Experiences",
    description:
      "Sunrise viewing peaks, bonfire camping sessions, local histories, and lifelong trekker friendships.",
  },
  {
    emoji: "❤️",
    title: "Customer Focused",
    description:
      "Continuous coordinate support starting from your booking enquiry down to dropping you off safely.",
  },
];

const instagramPosts = [
  { image: "/img/tt-biking.webp", likes: "1.2k" },
  { image: "/img/tt-birding.webp", likes: "980" },
  { image: "/img/tt-community.jpg", likes: "2.4k" },
  { image: "/img/tt-culture.jpg", likes: "1.5k" },
  { image: "/img/tt-family.webp", likes: "1.9k" },
  { image: "/img/tt-safari.webp", likes: "3.1k" },
];

function getCategoryLabel(trek: any): string {
  if (trek.categoryLabel) return trek.categoryLabel;
  if (trek.category && typeof trek.category === "object") {
    return (trek.category as TrekCategory).name;
  }
  return "Trek";
}

function getTrekImage(trek: any): string {
  if (typeof trek.image === "string") return trek.image;
  if (trek.image && typeof trek.image === "object") {
    return (trek.image as Media).url || "/placeholder.jpg";
  }
  return "/placeholder.jpg";
}

function FeatureIcon({ iconStr }: { iconStr: string }) {
  if (!iconStr) return null;
  const cleanName = iconStr.replace(/[<\/>\s]/g, "");
  const IconComponent = (RemixIcons as any)[cleanName];
  if (IconComponent) {
    return <IconComponent className="w-10 h-10 text-primary block" />;
  }
  return <span className="text-3xl block">{iconStr}</span>;
}

export default async function Home() {
  const allTreks = await getPublishedTreks();
  const dbFeatures = await getFeatures();
  const dbTestimonials = await getTestimonials();
  const dbGallery = await getGalleryItems();
  const siteSettings = (await getGlobal("site-settings")) as SiteSetting;

  // Determine site settings dynamically
  const siteName = siteSettings?.siteName || SITE.name;
  const siteNameMr = siteSettings?.siteNameMr || SITE.nameMr;
  const tagline = siteSettings?.tagline || SITE.tagline;
  const phone = siteSettings?.phone || SITE.phone;
  const phoneDisplay = siteSettings?.phoneDisplay || SITE.phoneDisplay;
  const whatsappNumber = siteSettings?.whatsappNumber || "919112784198";
  const instagramUrl = siteSettings?.instagram || SITE.instagram;

  const heroMedia =
    siteSettings?.heroVideo && typeof siteSettings.heroVideo === "object"
      ? (siteSettings.heroVideo as Media)
      : null;
  const heroMediaUrl = heroMedia?.url || SITE.heroVideo;
  const heroIsImage = heroMedia?.mimeType?.startsWith("image/") ?? false;

  const logoUrl =
    siteSettings?.logo && typeof siteSettings.logo === "object"
      ? (siteSettings.logo as Media).url || SITE.logo
      : SITE.logo;

  // Filter dynamic treks
  const hasDbTreks = allTreks && allTreks.length > 0;
  const activeUpcoming = hasDbTreks ? allTreks.filter((t) => t.isUpcoming) : [];
  const activePopular = hasDbTreks ? allTreks.filter((t) => t.isPopular) : [];

  const displayUpcoming = hasDbTreks
    ? activeUpcoming
    : fallbackTreks.filter(
      (t) =>
        t.slug === "rajgad-fort-trek" ||
        t.slug === "harishchandragad-night-trek" ||
        t.slug === "devkund-waterfall-trek"
    );

  const displayPopular = hasDbTreks
    ? activePopular
    : fallbackTreks.filter(
      (t) =>
        t.slug === "kalsubai-peak-trek" ||
        t.slug === "sandhan-valley-trek" ||
        t.slug === "andharban-dark-forest-trek" ||
        t.slug === "vasota-jungle-fort-trek"
    );

  // Dynamic Features
  const featuresList = dbFeatures && dbFeatures.length > 0 ? dbFeatures : defaultFeatures;

  // Dynamic Gallery
  const galleryList =
    dbGallery && dbGallery.length > 0
      ? dbGallery.map((item) => ({
        image: typeof item.image === "object" ? (item.image as Media).url || "" : "",
        alt: item.alt || item.title || "",
        title: item.title,
        date: item.date || "",
      }))
      : defaultGallery;

  const whatsappEnquireUrl = `https://wa.me/${whatsappNumber}?text=Hello%20Manmurad%20Bhatkanti!%20I%20want%20to%20enquire%20about%20your%20upcoming%20trekking%20events.`;
  const whatsappContactUrl = `https://wa.me/${whatsappNumber}?text=Hello%20Manmurad%20Bhatkanti,%20I'm%20planning%20a%20trek.%20Please%20send%20schedule.`;

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {heroIsImage ? (
          <Image
            src={heroMediaUrl}
            alt={heroMedia?.alt || `${siteName} hero`}
            fill
            priority
            sizes="100vw"
            className="hero-img object-cover"
          />
        ) : (
          <video
            src={heroMediaUrl}
            poster="/images/hero-poster.jpg"
            preload="metadata"
            autoPlay
            loop
            muted
            playsInline
            className="hero-img absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/45 z-10" />
        <div className="relative z-20 text-center text-white px-6 w-full max-w-4xl flex flex-col items-center justify-center space-y-4">
          <Image
            src={logoUrl}
            alt={`${siteName} Logo`}
            width={500}
            height={500}
            priority
            className="h-32 sm:h-40 w-auto object-contain drop-shadow-2xl mb-2"
          />
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            {tagline}
          </p>
          <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight">
            {siteNameMr}
          </h1>
          <p className="max-w-2xl text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            तुमच्या स्वप्नातील भटकंटी, सह्याद्रीच्या कुशीत! We curate safe,
            affordable, and incredibly memorable trekking, camping, and
            backpacking experiences across Maharashtra. Let&apos;s do something
            extraordinary.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <a
              href="#upcoming"
              className="bg-primary text-white text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded-full hover:bg-primary-dark transition shadow-lg"
            >
              Explore Treks
            </a>
            <a
              href={whatsappEnquireUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white text-white text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded-full hover:bg-white hover:text-black transition"
            >
              Book Now
            </a>
          </div>
        </div>
      </section>

      {/* UPCOMING TREKS */}
      <section
        id="upcoming"
        className="max-w-[1400px] mx-auto px-6 pt-16 pb-8 scroll-mt-20"
      >
        <Carousel
          eyebrow="Book Your Next Adventure"
          title="Upcoming Treks & Trips"
        >
          {displayUpcoming.map((trek) => {
            const formattedPrice = trek.price.toLocaleString("en-IN");
            const categoryLabel = getCategoryLabel(trek);
            const imageUrl = getTrekImage(trek);

            return (
              <article
                key={trek.slug}
                className="snap-start shrink-0 w-[85%] sm:w-[400px] bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm flex flex-col justify-between"
              >
                <div className="relative card-zoom h-56">
                  <Image
                    src={imageUrl}
                    alt={trek.imageAlt || trek.name}
                    fill
                    sizes="(max-width: 640px) 85vw, 400px"
                    className="object-cover"
                  />
                  {trek.badge && (
                    <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow">
                      {trek.badge}
                    </span>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase">
                      {categoryLabel} • Pickup: {trek.pickup || "Dynamic"}
                    </span>
                    <h3 className="text-xl font-extrabold text-forest uppercase leading-tight">
                      {trek.name}
                    </h3>
                    <p className="text-xs text-neutral-500 line-clamp-2">
                      {trek.shortDescription}
                    </p>
                  </div>
                  <div className="border-t border-black/5 pt-4 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-neutral-400 font-bold uppercase">
                        Trek Fee
                      </p>
                      <span className="text-xl font-black text-forest">
                        ₹{formattedPrice}
                      </span>
                    </div>
                    <Link
                      href={`/treks/${trek.slug}`}
                      className="bg-forest text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-full hover:bg-primary transition"
                    >
                      Details &amp; Book
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </Carousel>
      </section>

      {/* POPULAR TREKS */}
      <Reveal className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-moss mb-3">
            Treks Directly on Your Screen
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-forest">
            Popular Treks
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayPopular.map((trek) => {
            const imageUrl = getTrekImage(trek);

            return (
              <div
                key={trek.slug}
                className="bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm flex flex-col"
              >
                <div className="relative card-zoom h-48">
                  <Image
                    src={imageUrl}
                    alt={trek.imageAlt || trek.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                  {trek.badge && (
                    <span className="absolute bottom-3 left-3 bg-forest text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded-full">
                      {trek.badge}
                    </span>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-lg text-forest uppercase">
                      {trek.name}
                    </h3>
                    <p className="text-xs text-neutral-500">
                      {trek.shortDescription}
                    </p>
                  </div>
                  <Link
                    href={`/treks/${trek.slug}`}
                    className="w-full block text-center bg-cream border border-forest hover:bg-forest hover:text-white text-forest text-xs font-bold uppercase tracking-wider py-2.5 rounded-full transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/trips"
            className="inline-block border border-primary text-primary text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-full hover:bg-primary hover:text-white transition"
          >
            View All Treks
          </Link>
        </div>
      </Reveal>

      {/* COMPLETED TRIPS / GALLERY */}
      <Reveal
        className="max-w-[1400px] mx-auto px-6 py-16 scroll-mt-20"
        id="completed"
      >
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-moss mb-3">
            Our Proud Memories
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-forest">
            Completed Trips &amp; Gallery
          </h2>
        </div>
        <div
          id="gallery"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 scroll-mt-20"
        >
          {galleryList.map((item) => (
            <div
              key={item.title}
              className="relative group rounded-3xl overflow-hidden card-zoom h-60"
            >
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-5 text-white">
                <p className="text-xs font-bold uppercase">{item.title}</p>
                <p className="text-[10px] text-white/70">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-full hover:bg-primary-dark transition shadow"
          >
            View More Photos
          </a>
        </div>
      </Reveal>

      {/* ABOUT US */}
      <Reveal
        className="max-w-[1400px] mx-auto px-6 py-16 border-t border-black/5 scroll-mt-20"
        id="about"
      >
        <div className="grid md:grid-cols-[1.2fr_1.8fr] gap-10 items-center">
          <div className="relative h-96">
            <Image
              src="/img/tt-family.webp"
              alt={`${siteName} Group`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-3xl shadow-md"
            />
          </div>
          <div className="space-y-6">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
              आम्ही कोण आहोत? / Who We Are
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-forest">
              सह्याद्रीचे सोबती — {siteNameMr}
            </h2>
            <div className="space-y-4 text-sm text-neutral-600 leading-relaxed font-light">
              <p>
                <strong>{siteNameMr} ({siteName})</strong> ही
                महाराष्ट्रातील एक अग्रगण्य आणि साहसी ट्रेकिंग संस्था आहे.
                डोंगरभटकंती आणि दुर्गभ्रमंतीची आवड असणाऱ्या प्रत्येकाला एकत्र
                आणून, सह्याद्रीचे वैभव अनुभवण्याची संधी देणे ही आमची सुरुवात होती.
              </p>
              <p>
                आमचा प्रवास केवळ पर्यटन नाही, तर दुर्ग संवर्धन, इतिहास प्रसार
                आणि प्रत्येकाच्या मनात सुरक्षित साहसाची भावना रुजवणे हे आमचे
                उद्दिष्ट आहे. We strive to provide well-planned, budget-friendly
                and highly memorable experiences, led by certified leaders who
                value your safety above everything else.
              </p>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="#contact"
                className="bg-forest text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full hover:bg-primary transition"
              >
                Know More
              </a>
              <a
                href={`tel:${phone}`}
                className="text-xs font-bold text-forest hover:underline"
              >
                Call Us: {phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      {/* WHY CHOOSE US */}
      <Reveal className="bg-forest text-white py-20">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-moss mb-3">
              Truly Unique Experiences
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase">
              Why Choose {siteName}?
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresList.map((feature) => (
              <div
                key={feature.title}
                className="bg-forestdeep p-8 rounded-3xl space-y-3"
              >
                <FeatureIcon iconStr={feature.emoji || ""} />
                <h3 className="font-extrabold uppercase text-lg">
                  {feature.title}
                </h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* CUSTOMER REVIEWS */}
      <section className="max-w-[1400px] mx-auto px-6 py-16">
        <ReviewsSection reviews={dbTestimonials} />
      </section>

      {/* INSTAGRAM SECTION */}
      <Reveal className="max-w-[1400px] mx-auto px-6 py-16 border-t border-black/5">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-moss mb-3">
            Connect on Social Media
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase text-forest">
            Instagram Feed
          </h2>
          <p className="text-xs text-neutral-500 mt-2">
            Follow our adventure updates, reels, and stories.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {instagramPosts.map((post) => (
            <div
              key={post.image}
              className="rounded-2xl overflow-hidden card-zoom relative group h-44"
            >
              <Image
                src={post.image}
                alt="Instagram post"
                fill
                sizes="(max-width: 768px) 50vw, 16vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs">
                ❤️ {post.likes}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-full hover:opacity-90 transition shadow"
          >
            Follow Us on Instagram
          </a>
        </div>
      </Reveal>

      {/* CONTACT / WHATSAPP CTA */}
      <Reveal
        className="max-w-[900px] mx-auto px-6 py-16 text-center border-t border-black/5 scroll-mt-20"
        id="contact"
      >
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-moss mb-3">
          Reach Out To Us
        </p>
        <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-forest mb-6">
          Let&apos;s Connect
        </h2>
        <p className="text-sm text-neutral-600 leading-relaxed font-light max-w-2xl mx-auto mb-10">
          Have questions about safety, packages, pick-up slots, or custom group
          departures? Get in touch directly with our trek coordinators via call
          or WhatsApp.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm space-y-4 text-center flex flex-col items-center">
            <span className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-3xl text-primary">
              <RiPhoneLine />
            </span>
            <div>
              <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider mb-1">
                Call Trek Coordinator
              </p>
              <a
                href={`tel:${phone}`}
                className="text-lg font-black text-forest hover:underline hover:text-primary transition"
              >
                {phoneDisplay}
              </a>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm space-y-4 text-center flex flex-col items-center">
            <span className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl text-green-600">
              <RiChat1Line />
            </span>
            <div>
              <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider mb-1">
                Direct WhatsApp Chat
              </p>
              <a
                href={whatsappContactUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-black text-forest hover:underline hover:text-green-600 transition"
              >
                Start Chat Now
              </a>
            </div>
          </div>
        </div>

        <div className="bg-forest text-white p-6 rounded-3xl mt-8 max-w-2xl mx-auto">
          <h3 className="font-extrabold uppercase text-sm mb-2 tracking-wider">
            Book Your Next Adventure
          </h3>
          <p className="text-xs text-white/70 leading-relaxed">
            Slots for monsoon and post-monsoon treks are filling fast! Secure
            your slot via a quick token payment on WhatsApp.
          </p>
        </div>
      </Reveal>
    </>
  );
}
