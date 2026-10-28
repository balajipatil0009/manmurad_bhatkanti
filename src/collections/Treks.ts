import type { CollectionConfig } from "payload";
import { slugField } from "payload";
import { revalidatePath } from "next/cache";
import { seoField } from "@/fields/seo";
import { revalidateSite } from "@/lib/revalidate";

export const Treks: CollectionConfig = {
  slug: "treks",
  labels: {
    singular: "Trek",
    plural: "Treks",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "price", "isPopular", "_status"],
    group: "Treks",
    listSearchableFields: ["name", "slug", "location"],
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [
      async ({ doc, req, context }) => {
        if (context?.skipRevalidate) return doc;

        try {
          revalidatePath("/");
          revalidatePath("/trips");

          if (doc?.slug) {
            revalidatePath(`/treks/${doc.slug}`);
          }
        } catch (error) {
          console.warn("revalidatePath failed (likely running outside Next.js):", error);
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
      name: "name",
      type: "text",
      required: true,
      index: true,
    },
    slugField(),
    {
      name: "category",
      type: "relationship",
      relationTo: "trek-categories",
      required: true,
      admin: { position: "sidebar" },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "imageAlt",
      type: "text",
      required: true,
    },
    {
      name: "badge",
      type: "text",
      admin: {
        description: "Short highlight label shown on the card (e.g. '12 Sept 2026').",
      },
    },
    {
      name: "location",
      type: "text",
      required: true,
    },
    {
      name: "date",
      type: "date",
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayOnly" },
      },
    },
    {
      name: "durationDays",
      type: "number",
      min: 1,
      required: true,
      admin: { position: "sidebar" },
    },
    {
      name: "duration",
      type: "text",
      required: true,
      admin: {
        description: "Human-readable duration (e.g. '1 Day (Full day)').",
      },
    },
    {
      name: "difficulty",
      type: "select",
      options: ["Easy", "Easy - Moderate", "Moderate", "Moderate - Difficult", "Difficult"],
      required: true,
    },
    {
      name: "distance",
      type: "text",
    },
    {
      name: "pickup",
      type: "text",
    },
    {
      name: "price",
      type: "number",
      required: true,
      admin: { position: "sidebar" },
    },
    {
      name: "shortDescription",
      type: "textarea",
      required: true,
    },
    {
      name: "overview",
      type: "richText",
    },
    {
      name: "included",
      type: "array",
      label: "Things Included",
      labels: {
        singular: "Item",
        plural: "Items",
      },
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea" },
      ],
    },
    {
      name: "notIncluded",
      type: "array",
      label: "Things Not Included",
      labels: {
        singular: "Item",
        plural: "Items",
      },
      fields: [
        { name: "label", type: "text", required: true },
      ],
    },
    {
      name: "carry",
      type: "array",
      label: "Things to Carry",
      labels: {
        singular: "Item",
        plural: "Items",
      },
      fields: [
        { name: "emoji", type: "text" },
        { name: "title", type: "text", required: true },
        { name: "note", type: "text" },
      ],
    },
    {
      name: "isPopular",
      type: "checkbox",
      label: "Popular Trek",
      defaultValue: false,
      admin: { position: "sidebar" },
    },
    {
      name: "isUpcoming",
      type: "checkbox",
      label: "Upcoming Trek",
      defaultValue: false,
      admin: { position: "sidebar" },
    },
    seoField,
  ],
  timestamps: true,
};
