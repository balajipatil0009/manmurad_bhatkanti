import type { GlobalConfig } from "payload";

export const Home: GlobalConfig = {
  slug: "home",
  label: "Home Page",
  admin: {
    group: "Settings",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [
            { name: "heroHeading", type: "text" },
            { name: "heroSubtitle", type: "textarea" },
            { name: "heroCtaPrimary", type: "text", label: "Primary CTA Label" },
            { name: "heroCtaPrimaryHref", type: "text", label: "Primary CTA Href" },
            { name: "heroCtaSecondary", type: "text", label: "Secondary CTA Label" },
            { name: "heroCtaSecondaryHref", type: "text", label: "Secondary CTA Href" },
          ],
        },
        {
          label: "Section Headings",
          fields: [
            { name: "upcomingEyebrow", type: "text" },
            { name: "upcomingTitle", type: "text" },
            { name: "popularEyebrow", type: "text" },
            { name: "popularTitle", type: "text" },
            { name: "galleryEyebrow", type: "text" },
            { name: "galleryTitle", type: "text" },
          ],
        },
        {
          label: "Instagram Feed",
          fields: [
            {
              name: "instagramFeed",
              type: "array",
              label: "Instagram Feed Tiles",
              fields: [
                {
                  name: "image",
                  type: "upload",
                  relationTo: "media",
                  required: true,
                },
                {
                  name: "likes",
                  type: "text",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
