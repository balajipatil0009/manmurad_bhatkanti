import type { CollectionConfig } from "payload";
import { revalidateSite } from "@/lib/revalidate";

export const GalleryItems: CollectionConfig = {
  slug: "gallery-items",
  labels: {
    singular: "Gallery Item",
    plural: "Gallery Items",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "date", "order", "_status"],
    group: "Content",
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [
      async ({ doc, context }) => {
        revalidateSite(context);
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
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "alt",
      type: "text",
    },
    {
      name: "date",
      type: "text",
      admin: {
        description: "Free-form label (e.g. 'August 2026').",
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar" },
    },
  ],
  timestamps: true,
};
