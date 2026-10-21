import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { treks as fallbackTreks } from "@/lib/treks";
import { SITE } from "@/lib/site";
import { getTrekBySlug, getTrekSlugs, getGlobal } from "@/lib/queries";
import type { Media, TrekCategory, SiteSetting } from "@/payload-types";

type Props = {
  params: Promise<{ slug: string }>;
};

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

function renderLexicalText(node: any): React.ReactNode {
  if (!node) return null;

  if (node.type === "root" && node.children) {
    return node.children.map((child: any, idx: number) => (
      <div key={idx}>{renderLexicalText(child)}</div>
    ));
  }

  if (node.type === "paragraph" && node.children) {
    return (
      <p key={Math.random()} className="text-neutral-600 text-sm md:text-base leading-relaxed mb-4">
        {node.children.map((child: any, idx: number) => renderLexicalText(child))}
      </p>
    );
  }

  if (node.type === "text") {
    let text = node.text || "";
    if (node.format & 1) {
      return <strong key={text}>{text}</strong>;
    }
    if (node.format & 2) {
      return <em key={text}>{text}</em>;
    }
    return text;
  }

  if (node.type === "list" && node.children) {
    const Tag = node.tag === "ol" ? "ol" : "ul";
    const listClass =
      node.tag === "ol"
        ? "list-decimal pl-6 mb-4 text-sm text-neutral-600"
        : "list-disc pl-6 mb-4 text-sm text-neutral-600";
    return (
      <Tag key={Math.random()} className={listClass}>
        {node.children.map((child: any, idx: number) => renderLexicalText(child))}
      </Tag>
    );
  }

  if (node.type === "listitem" && node.children) {
    return (
      <li key={Math.random()} className="mb-1">
        {node.children.map((child: any, idx: number) => renderLexicalText(child))}
      </li>
    );
  }

  if (node.children) {
    return node.children.map((child: any, idx: number) => renderLexicalText(child));
  }

  return null;
}

function renderOverview(overview: any): React.ReactNode {
  if (!overview) return null;

  if (Array.isArray(overview)) {
    return overview.map((p: string, idx: number) => (
      <p key={idx} className="text-neutral-600 text-sm md:text-base leading-relaxed mb-4">
        {p}
      </p>
    ));
  }

  return renderLexicalText(overview);
}

export async function generateStaticParams() {
  try {
    const dbSlugs = await getTrekSlugs();
    if (dbSlugs && dbSlugs.length > 0) {
      return dbSlugs;
    }
  } catch (error) {
    console.error("Failed to generate static params:", error);
  }
  return fallbackTreks.map((trek) => ({ slug: trek.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let trek = await getTrekBySlug(slug);

  if (!trek) {
    trek = fallbackTreks.find((t) => t.slug === slug) as any;
  }

  if (!trek) {
    return { title: "Trek Not Found" };
  }

  const imageUrl = getTrekImage(trek);
  const imageAlt = getTrekImageAlt(trek);

  return {
    title: `${trek.name} Trek Details`,
    description: trek.shortDescription,
    alternates: {
      canonical: `/treks/${trek.slug}`,
    },
    openGraph: {
      title: `${trek.name} | ${SITE.name}`,
      description: trek.shortDescription,
      images: [{ url: imageUrl, alt: imageAlt }],
    },
  };
}

export default async function TrekDetailPage({ params }: Props) {
  const { slug } = await params;
  const siteSettings = (await getGlobal("site-settings")) as SiteSetting;

  let trek = await getTrekBySlug(slug);

  if (!trek) {
    trek = fallbackTreks.find((t) => t.slug === slug) as any;
  }

  if (!trek) {
    notFound();
  }

  const sitePhone = siteSettings?.phone || SITE.phone;
  const sitePhoneDisplay = siteSettings?.phoneDisplay || SITE.phoneDisplay;
  const siteWhatsapp = siteSettings?.whatsappNumber || "919112784198";

  const bookingUrl = `https://wa.me/${siteWhatsapp}?text=${encodeURIComponent(
    `Hello Manmurad Bhatkanti! I want to book slots for the ${trek.name} on ${trek.date || "upcoming scheduled dates"}.`
  )}`;

  const imageUrl = getTrekImage(trek);
  const imageAlt = getTrekImageAlt(trek);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          priority
          className="hero-img object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#130D0C] via-[#130D0C]/40 to-black/30" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 pb-14 w-full text-white">
          <nav className="text-xs uppercase tracking-widest text-white/70 mb-4">
            <Link href="/" className="hover:text-white">
              Home
            </Link>{" "}
            /{" "}
            <Link href="/trips" className="hover:text-white">
              Treks
            </Link>{" "}
            / <span className="text-white">{trek.name}</span>
          </nav>
          <h1 className="text-5xl md:text-7xl font-extrabold uppercase mb-3 leading-none">
            {trek.name}
          </h1>
          <p className="max-w-2xl text-white/85 text-sm md:text-base leading-relaxed">
            {trek.shortDescription}
          </p>
        </div>
      </section>

      {/* CONTENT & INFO */}
      <main className="max-w-[1400px] mx-auto px-6 py-12 grid lg:grid-cols-[1.8fr_1fr] gap-10 items-start">
        {/* LEFT COLUMN */}
        <div className="space-y-10">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
            <div className="space-y-1">
              <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">
                Location
              </p>
              <p className="text-sm font-bold text-forest">{trek.location}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">
                Date
              </p>
              <p className="text-sm font-bold text-forest">{trek.date || "Upcoming"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">
                Trek Duration
              </p>
              <p className="text-sm font-bold text-forest">{trek.duration}</p>
            </div>
            <div className="space-y-1 pt-3 border-t border-black/5 md:border-none">
              <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">
                Difficulty
              </p>
              <span className="inline-block text-xs font-bold text-orange-600 bg-orange-100 px-2.5 py-1 rounded-full">
                {trek.difficulty}
              </span>
            </div>
            {trek.distance && (
              <div className="space-y-1 pt-3 border-t border-black/5">
                <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">
                  Trek Distance
                </p>
                <p className="text-sm font-bold text-forest">{trek.distance}</p>
              </div>
            )}
            {trek.pickup && (
              <div className="space-y-1 pt-3 border-t border-black/5">
                <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">
                  Pickup Point
                </p>
                <p className="text-sm font-bold text-forest">{trek.pickup}</p>
              </div>
            )}
          </div>

          {/* overview */}
          <div className="space-y-4">
            <h2 className="text-2xl font-extrabold uppercase tracking-wide border-b border-black/5 pb-2 text-forest">
              Trek Overview
            </h2>
            {renderOverview(trek.overview)}
          </div>

          {/* included */}
          {trek.included && trek.included.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold uppercase tracking-wide border-b border-black/5 pb-2 text-forest">
                Things Included
              </h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {trek.included.map((item: any, idx: number) => (
                  <li
                    key={item.title || idx}
                    className="flex items-start gap-2.5 text-neutral-600 text-sm"
                  >
                    <span className="text-green-600 font-bold text-lg leading-none">
                      ✓
                    </span>
                    <div>
                      <span className="font-semibold text-neutral-800">
                        {item.title}
                      </span>
                      {item.description && (
                        <p className="text-xs text-neutral-400">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* not included */}
          {trek.notIncluded && trek.notIncluded.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold uppercase tracking-wide border-b border-black/5 pb-2 text-forest">
                Things Not Included
              </h2>
              <ul className="space-y-2.5">
                {trek.notIncluded.map((item: any, idx: number) => {
                  const label = typeof item === "string" ? item : item.label;
                  return (
                    <li
                      key={label || idx}
                      className="flex items-center gap-2.5 text-neutral-600 text-sm"
                    >
                      <span className="text-red-500 font-bold text-lg leading-none">
                        ✕
                      </span>
                      <span>{label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* things to carry */}
          {trek.carry && trek.carry.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold uppercase tracking-wide border-b border-black/5 pb-2 text-forest">
                Things to Carry
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {trek.carry.map((item: any, idx: number) => (
                  <div
                    key={item.title || idx}
                    className="bg-white p-4 rounded-2xl border border-black/5 text-center space-y-1"
                  >
                    <span className="block text-2xl">{item.emoji || "🎒"}</span>
                    <p className="text-xs font-bold text-neutral-800 uppercase">
                      {item.title}
                    </p>
                    {item.note && (
                      <p className="text-[10px] text-neutral-400 leading-none">
                        {item.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <aside className="sticky top-24 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm space-y-6">
            <div className="flex items-baseline justify-between border-b border-black/5 pb-4">
              <div>
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest block">
                  Trek Fee
                </span>
                <span className="text-4xl font-black text-forest">
                  ₹{trek.price.toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-neutral-500"> / person</span>
              </div>
              <span className="text-xs font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full">
                Slots Available
              </span>
            </div>

            <ul className="space-y-3.5 text-xs text-neutral-600">
              <li className="flex items-center justify-between">
                <span>Trek Location:</span>
                <strong className="text-forest">{trek.location}</strong>
              </li>
              <li className="flex items-center justify-between">
                <span>Date:</span>
                <strong className="text-forest">{trek.date || "Upcoming"}</strong>
              </li>
              {trek.pickup && (
                <li className="flex items-center justify-between">
                  <span>Pickup:</span>
                  <strong className="text-forest">{trek.pickup}</strong>
                </li>
              )}
            </ul>

            <div className="space-y-3">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold uppercase tracking-wider py-4 rounded-full transition text-sm shadow-md"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5 13.9c-.2.6-1.2 1.1-1.7 1.2-.4 0-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.5.5c-.2.2-.3.4-.1.7.2.3.8 1.4 1.8 2.2 1.3 1.1 2.3 1.5 2.7 1.6.3.2.5.1.7-.1l1-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .7-.2 1.4Z" />
                </svg>
                Book via WhatsApp
              </a>
            </div>
          </div>

          <div className="bg-forest text-white p-6 rounded-3xl space-y-4">
            <h3 className="font-extrabold uppercase text-sm tracking-wider">
              Need Assistance?
            </h3>
            <p className="text-xs text-white/70 leading-relaxed">
              If you have questions about the difficulty levels, gear
              requirements, or payment terms, feel free to call our trek
              coordinators directly.
            </p>
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-lg">
                📞
              </span>
              <div>
                <p className="text-[10px] text-white/55 font-bold uppercase">
                  Call or Chat
                </p>
                <a
                  href={`tel:${sitePhone}`}
                  className="text-sm font-bold hover:underline"
                >
                  {sitePhoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </>
  );
}
