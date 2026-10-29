import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug, getPageSlugs } from "@/lib/queries";
import { RichText } from "@/components/RichText";
import type { Media } from "@/payload-types";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    return await getPageSlugs();
  } catch (error) {
    console.error("Failed to generate page static params:", error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) return { title: "Page Not Found" };

  const ogImage =
    page.seo?.ogImage && typeof page.seo.ogImage === "object"
      ? ((page.seo.ogImage as Media).url || undefined)
      : undefined;

  return {
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription || undefined,
    alternates: {
      canonical: page.seo?.canonical || `/${page.slug}`,
    },
    openGraph: ogImage
      ? { title: page.seo?.metaTitle || page.title, images: [{ url: ogImage }] }
      : undefined,
  };
}

export default async function CustomPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) notFound();

  return (
    <article className="max-w-[900px] mx-auto px-6 py-16">
      <h1 className="text-4xl md:text-5xl font-extrabold uppercase text-forest mb-8">
        {page.title}
      </h1>
      <RichText
        content={page.content}
        className="space-y-4 text-sm md:text-base text-neutral-600 leading-relaxed font-light"
      />
    </article>
  );
}
