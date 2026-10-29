import { getPayloadCached } from "@/lib/getPayload";

const published = { _status: { equals: "published" } };

export async function getPublishedTreks() {
  const payload = await getPayloadCached();
  const { docs } = await payload.find({
    collection: "treks",
    where: published,
    depth: 1,
    sort: "createdAt",
    limit: 100,
  });
  return docs;
}

export async function getTrekBySlug(slug: string) {
  const payload = await getPayloadCached();
  const { docs } = await payload.find({
    collection: "treks",
    where: { ...published, slug: { equals: slug } },
    depth: 1,
    limit: 1,
  });
  return docs[0] ?? null;
}

export async function getTrekSlugs() {
  const payload = await getPayloadCached();
  const { docs } = await payload.find({
    collection: "treks",
    where: published,
    depth: 0,
    limit: 500,
    select: { slug: true },
  });
  return docs.map((doc) => ({ slug: doc.slug as string }));
}

export async function getTrekCategories() {
  const payload = await getPayloadCached();
  const { docs } = await payload.find({
    collection: "trek-categories",
    where: published,
    depth: 1,
    sort: "order",
    limit: 100,
  });
  return docs;
}

export async function getGalleryItems() {
  const payload = await getPayloadCached();
  const { docs } = await payload.find({
    collection: "gallery-items",
    where: published,
    depth: 1,
    sort: "order",
    limit: 100,
  });
  return docs;
}

export async function getFeatures() {
  const payload = await getPayloadCached();
  const { docs } = await payload.find({
    collection: "features",
    where: published,
    depth: 0,
    sort: "order",
    limit: 100,
  });
  return docs;
}

export async function getTestimonials() {
  const payload = await getPayloadCached();
  const { docs } = await payload.find({
    collection: "testimonials",
    where: published,
    depth: 0,
    sort: "order",
    limit: 100,
  });
  return docs;
}

export async function getGlobal(slug: "site-settings" | "navigation" | "home" | "about") {
  const payload = await getPayloadCached();
  return payload.findGlobal({ slug });
}

export async function getPageBySlug(slug: string) {
  const payload = await getPayloadCached();
  const { docs } = await payload.find({
    collection: "pages",
    where: { ...published, slug: { equals: slug } },
    depth: 1,
    limit: 1,
  });
  return docs[0] ?? null;
}

export async function getPageSlugs() {
  const payload = await getPayloadCached();
  const { docs } = await payload.find({
    collection: "pages",
    where: published,
    depth: 0,
    limit: 500,
    select: { slug: true },
  });
  return docs.map((doc) => ({ slug: doc.slug as string }));
}
