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

export default buildConfig({
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
    },
    push: false,
    migrationDir: path.resolve(dirname, "migrations"),
  }),
  cors: ["http://localhost:3000"],
  csrf: ["http://localhost:3000"],
});
