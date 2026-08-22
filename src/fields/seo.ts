import type { GroupField } from "payload";

export const seoField: GroupField = {
  name: "seo",
  label: "SEO",
  type: "group",
  fields: [
    {
      name: "metaTitle",
      type: "text",
      label: "Meta Title",
      admin: {
        description: "Overrides the page title. Falls back to the document title.",
      },
    },
    {
      name: "metaDescription",
      type: "textarea",
      label: "Meta Description",
    },
    {
      name: "ogImage",
      type: "upload",
      relationTo: "media",
      label: "Open Graph Image",
    },
    {
      name: "canonical",
      type: "text",
      label: "Canonical URL",
      admin: {
        description: "Optional. Defaults to the auto-generated route.",
      },
    },
  ],
};
