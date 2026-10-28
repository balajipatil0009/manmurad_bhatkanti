import type { CollectionConfig } from "payload";
import { slugField } from "payload";
import { revalidatePath } from "next/cache";
import { seoField } from "@/fields/seo";
import { revalidateSite } from "@/lib/revalidate";

export const Pages: CollectionConfig = {
  slug: "pages",
  labels: {
    singular: "Page",
    plural: "Pages",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "_status"],
    group: "Content",
    listSearchableFields: ["title", "slug"],
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [
      async ({ doc, context }) => {
        if (doc?.slug) {
          try {
            revalidatePath(`/${doc.slug}`);
          } catch (error) {
            console.warn("revalidatePath failed (likely running outside Next.js):", error);
          }
        }
        return doc;
      },
    ],
    afterDelete: [
      async ({ doc, context }) => {
        revalidateSite(context);
        return doc;
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      index: true,
    },
    slugField(),
    {
      name: "content",
      type: "richText",
      required: true,
    },
    seoField,
  ],
  timestamps: true,
};
