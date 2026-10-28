import type { CollectionConfig } from "payload";
import { revalidateSite } from "@/lib/revalidate";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
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
  upload: {
    staticDir: "media",
    mimeTypes: ["image/*", "video/*"],
    focalPoint: true,
    crop: true,
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
      },
      {
        name: "card",
        width: 768,
        height: 1024,
        position: "centre",
      },
      {
        name: "hero",
        width: 1600,
        height: 900,
        position: "centre",
      },
    ],
    adminThumbnail: "thumbnail",
  },
  admin: {
    useAsTitle: "alt",
    defaultColumns: ["filename", "alt", "updatedAt"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "caption",
      type: "text",
    },
  ],
  timestamps: true,
};
