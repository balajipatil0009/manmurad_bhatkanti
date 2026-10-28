import type { CollectionConfig } from "payload";
import { revalidateSite } from "@/lib/revalidate";

export const Features: CollectionConfig = {
  slug: "features",
  labels: {
    singular: "Feature",
    plural: "Features",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "order", "_status"],
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
      name: "emoji",
      type: "text",
      admin: {
        description: "Single emoji shown as the icon.",
      },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
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
