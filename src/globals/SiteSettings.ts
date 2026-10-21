import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  admin: {
    group: "Settings",
  },
  fields: [
    {
      name: "siteName",
      type: "text",
      required: true,
      defaultValue: "Manmurad Bhatkanti",
    },
    {
      name: "siteNameMr",
      type: "text",
      label: "Site Name (Marathi)",
      defaultValue: "मनमुराद भटकंटी",
    },
    {
      name: "tagline",
      type: "text",
      defaultValue: "Trek • Tour • Travel",
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "heroVideo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "phone",
      type: "text",
      defaultValue: "+919112784198",
    },
    {
      name: "phoneDisplay",
      type: "text",
      label: "Phone (Display)",
      defaultValue: "+91 91127 84198",
    },
    {
      name: "whatsappNumber",
      type: "text",
      defaultValue: "919112784198",
    },
    {
      name: "instagram",
      type: "text",
      label: "Instagram (Business)",
      defaultValue: "https://www.instagram.com/manmurad_bhatkanti_/",
    },
    {
      name: "instagramHandle",
      type: "text",
      label: "Instagram Handle",
      defaultValue: "@manmurad_bhatkanti_",
    },
    {
      name: "designerName",
      type: "text",
      label: "Designer Name",
      defaultValue: "AKA_BALA.009",
    },
    {
      name: "designerInstagram",
      type: "text",
      label: "Designer Instagram URL",
      defaultValue: "https://www.instagram.com/aka_bala.009",
    },
    {
      name: "footerTagline",
      type: "textarea",
      label: "Footer Tagline",
      defaultValue:
        "Trek • Tour • Travel — Providing safe, highly planned, and extremely memorable trekking experiences in Sahyadris and beyond.",
    },
  ],
};
