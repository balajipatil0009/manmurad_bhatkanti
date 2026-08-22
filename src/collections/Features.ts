import type { CollectionConfig } from "payload";

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
