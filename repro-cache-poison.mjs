// Proves the getClientSchemaMap global-cache poisoning behind:
// TypeError: Cannot use 'in' operator to search for 'hidden' in undefined
import { getClientSchemaMap } from "./node_modules/@payloadcms/ui/dist/utilities/getClientSchemaMap.js";

const nameField = { name: "name", type: "text" };
const rolesField = { name: "roles", type: "select", hasMany: true, options: ["admin", "editor"] };

const fullConfig = {
  collections: [{ slug: "users", auth: {}, fields: [nameField, rolesField] }],
  globals: [],
};

// What createUnauthenticatedClientConfig produces: users collection with NO fields
const unauthConfig = {
  collections: [{ slug: "users", auth: {} }],
  globals: [],
  unauthenticated: true,
};

const schemaMap = new Map([["users", { fields: [nameField, rolesField] }]]);

const baseArgs = {
  collectionSlug: "users",
  globalSlug: undefined,
  widgetSlug: undefined,
  i18n: { t: (k) => k, language: "en" },
  payload: { config: { db: { defaultIDType: "number" } } },
  schemaMap,
};

// 1) Unauthenticated form-state request (fires client-side during create-first-user)
const unauthMap = getClientSchemaMap({ ...baseArgs, config: unauthConfig });
console.log("unauth map has 'users.name' entry:", unauthMap.has("users.name"));

// 2) Authenticated SSR (create-first-user view / account page) on the SAME instance
const authMap = getClientSchemaMap({ ...baseArgs, config: fullConfig });
console.log("auth map === cached unauth map:", authMap === unauthMap);
console.log("auth map has 'users.name' entry:", authMap.has("users.name"));

// renderField does: clientFieldSchemaMap.get(schemaPath) -> fieldIsHiddenOrDisabled(entry)
const resolved = authMap.get("users.name");
console.log("renderField would receive:", resolved);
if (!resolved) {
  console.log(">>> POISONED: 'hidden' in undefined -> TypeError reproduced");
} else {
  console.log(">>> OK: not poisoned");
}
