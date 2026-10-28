import type { GlobalConfig } from "payload";
import { revalidateSite } from "@/lib/revalidate";

export const About: GlobalConfig = {
  slug: "about",
  label: "About Section",
  admin: {
    group: "Settings",
  },
  hooks: {
    afterChange: [
      async ({ doc, context }) => {
        revalidateSite(context);
        return doc;
      },
    ],
  },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "heading", type: "text" },
    { name: "body", type: "richText" },
    { name: "image", type: "upload", relationTo: "media" },
    { name: "ctaLabel", type: "text" },
    { name: "ctaHref", type: "text" },
  ],
};
