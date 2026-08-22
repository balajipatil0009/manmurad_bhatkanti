import type { ArrayField, GlobalConfig } from "payload";

const linkGroup = (name: string, label: string): ArrayField => ({
  name,
  label,
  type: "array",
  fields: [
    { name: "label", type: "text", required: true },
    { name: "href", type: "text", required: true },
  ],
});

export const Navigation: GlobalConfig = {
  slug: "navigation",
  label: "Navigation",
  admin: {
    group: "Settings",
  },
  fields: [
    linkGroup("quickLinks", "Quick Links"),
    linkGroup("trekLinks", "Trek & Tour Links"),
    linkGroup("connectLinks", "Connect Links"),
  ],
};
