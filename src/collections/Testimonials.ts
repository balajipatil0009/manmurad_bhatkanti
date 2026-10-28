import type { CollectionConfig } from "payload";
import { revalidateSite } from "@/lib/revalidate";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  labels: {
    singular: "Testimonial",
    plural: "Testimonials",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "rating", "order", "_status"],
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
      name: "quote",
      type: "textarea",
      required: true,
    },
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "text",
    },
    {
      name: "rating",
      type: "number",
      min: 1,
      max: 5,
      defaultValue: 5,
      admin: { position: "sidebar" },
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
