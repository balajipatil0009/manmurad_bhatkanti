import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    tokenExpiration: 7200,
    useAPIKey: true,
  },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "name", "roles"],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "roles",
      type: "select",
      hasMany: true,
      options: ["admin", "editor"],
      required: true,
      defaultValue: ["editor"],
      saveToJWT: true,
    },
  ],
  timestamps: true,
};
