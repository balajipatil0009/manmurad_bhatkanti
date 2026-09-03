import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "@/collections/Users";
import { Media } from "@/collections/Media";
import { TrekCategories } from "@/collections/TrekCategories";
import { Treks } from "@/collections/Treks";
import { GalleryItems } from "@/collections/GalleryItems";
import { Features } from "@/collections/Features";
import { Testimonials } from "@/collections/Testimonials";
import { Pages } from "@/collections/Pages";

import { SiteSettings } from "@/globals/SiteSettings";
import { Navigation } from "@/globals/Navigation";
import { Home } from "@/globals/Home";
import { About } from "@/globals/About";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Requests carrying an Origin header (all admin POST/PATCH/DELETE) are only
// authenticated when the origin is listed in csrf — see payload extractJWT.
// Set NEXT_PUBLIC_SERVER_URL to the deployment URL in the hosting environment.
const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
console.log(
  `[payload] NEXT_PUBLIC_SERVER_URL=${process.env.NEXT_PUBLIC_SERVER_URL || "(not set)"} -> serverURL: ${serverURL}`,
);

export default buildConfig({
  serverURL,
  admin: {
    user: "users",
    meta: {
      titleSuffix: " | Manmurad Bhatkanti",
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    TrekCategories,
    Treks,
    GalleryItems,
    Features,
    Testimonials,
    Pages,
  ],
  globals: [SiteSettings, Navigation, Home, About],
  editor: lexicalEditor(),
  sharp,
  secret: process.env.PAYLOAD_SECRET || "dev-secret-change-me",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
      max: 5,
      idleTimeoutMillis: 20_000,
      connectionTimeoutMillis: 10_000,
      allowExitOnIdle: true,
    },
    push: false,
    migrationDir: path.resolve(dirname, "migrations"),
  }),
  cors: [serverURL],
  csrf: [serverURL],
});
