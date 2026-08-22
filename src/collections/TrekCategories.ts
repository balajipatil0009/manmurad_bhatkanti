import type { CollectionConfig } from "payload";
import { slugField } from "payload";

export const TrekCategories: CollectionConfig = {
  slug: "trek-categories",
  labels: {
    singular: "Trek Category",
    plural: "Trek Categories",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "order", "_status"],
    group: "Treks",
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      index: true,
    },
    slugField({ useAsSlug: "name" }),
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
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
