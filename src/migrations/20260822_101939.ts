import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_roles" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_trek_categories_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__trek_categories_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_treks_difficulty" AS ENUM('Easy', 'Easy - Moderate', 'Moderate', 'Moderate - Difficult', 'Difficult');
  CREATE TYPE "public"."enum_treks_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__treks_v_version_difficulty" AS ENUM('Easy', 'Easy - Moderate', 'Moderate', 'Moderate - Difficult', 'Difficult');
  CREATE TYPE "public"."enum__treks_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_gallery_items_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__gallery_items_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_features_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__features_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_testimonials_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__testimonials_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "users_roles" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"enable_a_p_i_key" boolean,
  	"api_key" varchar,
  	"api_key_index" varchar,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "trek_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_trek_categories_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_trek_categories_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_description" varchar,
  	"version_image_id" integer,
  	"version_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__trek_categories_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "treks_included" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "treks_not_included" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "treks_carry" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"emoji" varchar,
  	"title" varchar,
  	"note" varchar
  );
  
  CREATE TABLE "treks" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"category_id" integer,
  	"image_id" integer,
  	"image_alt" varchar,
  	"badge" varchar,
  	"location" varchar,
  	"date" timestamp(3) with time zone,
  	"duration_days" numeric,
  	"duration" varchar,
  	"difficulty" "enum_treks_difficulty",
  	"distance" varchar,
  	"pickup" varchar,
  	"price" numeric,
  	"short_description" varchar,
  	"overview" jsonb,
  	"is_popular" boolean DEFAULT false,
  	"is_upcoming" boolean DEFAULT false,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_treks_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_treks_v_version_included" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_treks_v_version_not_included" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_treks_v_version_carry" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"emoji" varchar,
  	"title" varchar,
  	"note" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_treks_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_category_id" integer,
  	"version_image_id" integer,
  	"version_image_alt" varchar,
  	"version_badge" varchar,
  	"version_location" varchar,
  	"version_date" timestamp(3) with time zone,
  	"version_duration_days" numeric,
  	"version_duration" varchar,
  	"version_difficulty" "enum__treks_v_version_difficulty",
  	"version_distance" varchar,
  	"version_pickup" varchar,
  	"version_price" numeric,
  	"version_short_description" varchar,
  	"version_overview" jsonb,
  	"version_is_popular" boolean DEFAULT false,
  	"version_is_upcoming" boolean DEFAULT false,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_canonical" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__treks_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "gallery_items" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"alt" varchar,
  	"date" varchar,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_gallery_items_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_gallery_items_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_image_id" integer,
  	"version_alt" varchar,
  	"version_date" varchar,
  	"version_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__gallery_items_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "features" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"emoji" varchar,
  	"description" varchar,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_features_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_features_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_emoji" varchar,
  	"version_description" varchar,
  	"version_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__features_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"rating" numeric DEFAULT 5,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_testimonials_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_testimonials_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_quote" varchar,
  	"version_name" varchar,
  	"version_role" varchar,
  	"version_rating" numeric DEFAULT 5,
  	"version_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__testimonials_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"content" jsonb,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_content" jsonb,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_canonical" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"trek_categories_id" integer,
  	"treks_id" integer,
  	"gallery_items_id" integer,
  	"features_id" integer,
  	"testimonials_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'Manmurad Bhatkanti' NOT NULL,
  	"site_name_mr" varchar DEFAULT 'मनमुराद भटकंटी',
  	"tagline" varchar DEFAULT 'Trek • Tour • Travel',
  	"logo_id" integer,
  	"hero_video_id" integer,
  	"phone" varchar DEFAULT '+919112784198',
  	"phone_display" varchar DEFAULT '+91 91127 84198',
  	"whatsapp_number" varchar DEFAULT '919112784198',
  	"instagram" varchar DEFAULT 'https://www.instagram.com/manmurad_bhatkanti_/',
  	"instagram_handle" varchar DEFAULT '@manmurad_bhatkanti_',
  	"designer_name" varchar DEFAULT 'AKA_BALA.009',
  	"designer_instagram" varchar DEFAULT 'https://www.instagram.com/aka_bala.009',
  	"footer_tagline" varchar DEFAULT 'Trek • Tour • Travel — Providing safe, highly planned, and extremely memorable trekking experiences in Sahyadris and beyond.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "navigation_quick_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_trek_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_connect_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_instagram_feed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"likes" varchar
  );
  
  CREATE TABLE "home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_heading" varchar,
  	"hero_subtitle" varchar,
  	"hero_cta_primary" varchar,
  	"hero_cta_primary_href" varchar,
  	"hero_cta_secondary" varchar,
  	"hero_cta_secondary_href" varchar,
  	"upcoming_eyebrow" varchar,
  	"upcoming_title" varchar,
  	"popular_eyebrow" varchar,
  	"popular_title" varchar,
  	"gallery_eyebrow" varchar,
  	"gallery_title" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb,
  	"image_id" integer,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trek_categories" ADD CONSTRAINT "trek_categories_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_trek_categories_v" ADD CONSTRAINT "_trek_categories_v_parent_id_trek_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."trek_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_trek_categories_v" ADD CONSTRAINT "_trek_categories_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "treks_included" ADD CONSTRAINT "treks_included_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."treks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "treks_not_included" ADD CONSTRAINT "treks_not_included_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."treks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "treks_carry" ADD CONSTRAINT "treks_carry_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."treks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "treks" ADD CONSTRAINT "treks_category_id_trek_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."trek_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "treks" ADD CONSTRAINT "treks_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "treks" ADD CONSTRAINT "treks_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_treks_v_version_included" ADD CONSTRAINT "_treks_v_version_included_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_treks_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_treks_v_version_not_included" ADD CONSTRAINT "_treks_v_version_not_included_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_treks_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_treks_v_version_carry" ADD CONSTRAINT "_treks_v_version_carry_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_treks_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_treks_v" ADD CONSTRAINT "_treks_v_parent_id_treks_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."treks"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_treks_v" ADD CONSTRAINT "_treks_v_version_category_id_trek_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."trek_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_treks_v" ADD CONSTRAINT "_treks_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_treks_v" ADD CONSTRAINT "_treks_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_items" ADD CONSTRAINT "gallery_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_gallery_items_v" ADD CONSTRAINT "_gallery_items_v_parent_id_gallery_items_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."gallery_items"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_gallery_items_v" ADD CONSTRAINT "_gallery_items_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_features_v" ADD CONSTRAINT "_features_v_parent_id_features_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."features"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_testimonials_v" ADD CONSTRAINT "_testimonials_v_parent_id_testimonials_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_trek_categories_fk" FOREIGN KEY ("trek_categories_id") REFERENCES "public"."trek_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_treks_fk" FOREIGN KEY ("treks_id") REFERENCES "public"."treks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_items_fk" FOREIGN KEY ("gallery_items_id") REFERENCES "public"."gallery_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_features_fk" FOREIGN KEY ("features_id") REFERENCES "public"."features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_hero_video_id_media_id_fk" FOREIGN KEY ("hero_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_quick_links" ADD CONSTRAINT "navigation_quick_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_trek_links" ADD CONSTRAINT "navigation_trek_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_connect_links" ADD CONSTRAINT "navigation_connect_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_instagram_feed" ADD CONSTRAINT "home_instagram_feed_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_instagram_feed" ADD CONSTRAINT "home_instagram_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about" ADD CONSTRAINT "about_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_roles_order_idx" ON "users_roles" USING btree ("order");
  CREATE INDEX "users_roles_parent_idx" ON "users_roles" USING btree ("parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "trek_categories_name_idx" ON "trek_categories" USING btree ("name");
  CREATE UNIQUE INDEX "trek_categories_slug_idx" ON "trek_categories" USING btree ("slug");
  CREATE INDEX "trek_categories_image_idx" ON "trek_categories" USING btree ("image_id");
  CREATE INDEX "trek_categories_updated_at_idx" ON "trek_categories" USING btree ("updated_at");
  CREATE INDEX "trek_categories_created_at_idx" ON "trek_categories" USING btree ("created_at");
  CREATE INDEX "trek_categories__status_idx" ON "trek_categories" USING btree ("_status");
  CREATE INDEX "_trek_categories_v_parent_idx" ON "_trek_categories_v" USING btree ("parent_id");
  CREATE INDEX "_trek_categories_v_version_version_name_idx" ON "_trek_categories_v" USING btree ("version_name");
  CREATE INDEX "_trek_categories_v_version_version_slug_idx" ON "_trek_categories_v" USING btree ("version_slug");
  CREATE INDEX "_trek_categories_v_version_version_image_idx" ON "_trek_categories_v" USING btree ("version_image_id");
  CREATE INDEX "_trek_categories_v_version_version_updated_at_idx" ON "_trek_categories_v" USING btree ("version_updated_at");
  CREATE INDEX "_trek_categories_v_version_version_created_at_idx" ON "_trek_categories_v" USING btree ("version_created_at");
  CREATE INDEX "_trek_categories_v_version_version__status_idx" ON "_trek_categories_v" USING btree ("version__status");
  CREATE INDEX "_trek_categories_v_created_at_idx" ON "_trek_categories_v" USING btree ("created_at");
  CREATE INDEX "_trek_categories_v_updated_at_idx" ON "_trek_categories_v" USING btree ("updated_at");
  CREATE INDEX "_trek_categories_v_latest_idx" ON "_trek_categories_v" USING btree ("latest");
  CREATE INDEX "treks_included_order_idx" ON "treks_included" USING btree ("_order");
  CREATE INDEX "treks_included_parent_id_idx" ON "treks_included" USING btree ("_parent_id");
  CREATE INDEX "treks_not_included_order_idx" ON "treks_not_included" USING btree ("_order");
  CREATE INDEX "treks_not_included_parent_id_idx" ON "treks_not_included" USING btree ("_parent_id");
  CREATE INDEX "treks_carry_order_idx" ON "treks_carry" USING btree ("_order");
  CREATE INDEX "treks_carry_parent_id_idx" ON "treks_carry" USING btree ("_parent_id");
  CREATE INDEX "treks_name_idx" ON "treks" USING btree ("name");
  CREATE UNIQUE INDEX "treks_slug_idx" ON "treks" USING btree ("slug");
  CREATE INDEX "treks_category_idx" ON "treks" USING btree ("category_id");
  CREATE INDEX "treks_image_idx" ON "treks" USING btree ("image_id");
  CREATE INDEX "treks_seo_seo_og_image_idx" ON "treks" USING btree ("seo_og_image_id");
  CREATE INDEX "treks_updated_at_idx" ON "treks" USING btree ("updated_at");
  CREATE INDEX "treks_created_at_idx" ON "treks" USING btree ("created_at");
  CREATE INDEX "treks__status_idx" ON "treks" USING btree ("_status");
  CREATE INDEX "_treks_v_version_included_order_idx" ON "_treks_v_version_included" USING btree ("_order");
  CREATE INDEX "_treks_v_version_included_parent_id_idx" ON "_treks_v_version_included" USING btree ("_parent_id");
  CREATE INDEX "_treks_v_version_not_included_order_idx" ON "_treks_v_version_not_included" USING btree ("_order");
  CREATE INDEX "_treks_v_version_not_included_parent_id_idx" ON "_treks_v_version_not_included" USING btree ("_parent_id");
  CREATE INDEX "_treks_v_version_carry_order_idx" ON "_treks_v_version_carry" USING btree ("_order");
  CREATE INDEX "_treks_v_version_carry_parent_id_idx" ON "_treks_v_version_carry" USING btree ("_parent_id");
  CREATE INDEX "_treks_v_parent_idx" ON "_treks_v" USING btree ("parent_id");
  CREATE INDEX "_treks_v_version_version_name_idx" ON "_treks_v" USING btree ("version_name");
  CREATE INDEX "_treks_v_version_version_slug_idx" ON "_treks_v" USING btree ("version_slug");
  CREATE INDEX "_treks_v_version_version_category_idx" ON "_treks_v" USING btree ("version_category_id");
  CREATE INDEX "_treks_v_version_version_image_idx" ON "_treks_v" USING btree ("version_image_id");
  CREATE INDEX "_treks_v_version_seo_version_seo_og_image_idx" ON "_treks_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_treks_v_version_version_updated_at_idx" ON "_treks_v" USING btree ("version_updated_at");
  CREATE INDEX "_treks_v_version_version_created_at_idx" ON "_treks_v" USING btree ("version_created_at");
  CREATE INDEX "_treks_v_version_version__status_idx" ON "_treks_v" USING btree ("version__status");
  CREATE INDEX "_treks_v_created_at_idx" ON "_treks_v" USING btree ("created_at");
  CREATE INDEX "_treks_v_updated_at_idx" ON "_treks_v" USING btree ("updated_at");
  CREATE INDEX "_treks_v_latest_idx" ON "_treks_v" USING btree ("latest");
  CREATE INDEX "gallery_items_image_idx" ON "gallery_items" USING btree ("image_id");
  CREATE INDEX "gallery_items_updated_at_idx" ON "gallery_items" USING btree ("updated_at");
  CREATE INDEX "gallery_items_created_at_idx" ON "gallery_items" USING btree ("created_at");
  CREATE INDEX "gallery_items__status_idx" ON "gallery_items" USING btree ("_status");
  CREATE INDEX "_gallery_items_v_parent_idx" ON "_gallery_items_v" USING btree ("parent_id");
  CREATE INDEX "_gallery_items_v_version_version_image_idx" ON "_gallery_items_v" USING btree ("version_image_id");
  CREATE INDEX "_gallery_items_v_version_version_updated_at_idx" ON "_gallery_items_v" USING btree ("version_updated_at");
  CREATE INDEX "_gallery_items_v_version_version_created_at_idx" ON "_gallery_items_v" USING btree ("version_created_at");
  CREATE INDEX "_gallery_items_v_version_version__status_idx" ON "_gallery_items_v" USING btree ("version__status");
  CREATE INDEX "_gallery_items_v_created_at_idx" ON "_gallery_items_v" USING btree ("created_at");
  CREATE INDEX "_gallery_items_v_updated_at_idx" ON "_gallery_items_v" USING btree ("updated_at");
  CREATE INDEX "_gallery_items_v_latest_idx" ON "_gallery_items_v" USING btree ("latest");
  CREATE INDEX "features_updated_at_idx" ON "features" USING btree ("updated_at");
  CREATE INDEX "features_created_at_idx" ON "features" USING btree ("created_at");
  CREATE INDEX "features__status_idx" ON "features" USING btree ("_status");
  CREATE INDEX "_features_v_parent_idx" ON "_features_v" USING btree ("parent_id");
  CREATE INDEX "_features_v_version_version_updated_at_idx" ON "_features_v" USING btree ("version_updated_at");
  CREATE INDEX "_features_v_version_version_created_at_idx" ON "_features_v" USING btree ("version_created_at");
  CREATE INDEX "_features_v_version_version__status_idx" ON "_features_v" USING btree ("version__status");
  CREATE INDEX "_features_v_created_at_idx" ON "_features_v" USING btree ("created_at");
  CREATE INDEX "_features_v_updated_at_idx" ON "_features_v" USING btree ("updated_at");
  CREATE INDEX "_features_v_latest_idx" ON "_features_v" USING btree ("latest");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "testimonials__status_idx" ON "testimonials" USING btree ("_status");
  CREATE INDEX "_testimonials_v_parent_idx" ON "_testimonials_v" USING btree ("parent_id");
  CREATE INDEX "_testimonials_v_version_version_updated_at_idx" ON "_testimonials_v" USING btree ("version_updated_at");
  CREATE INDEX "_testimonials_v_version_version_created_at_idx" ON "_testimonials_v" USING btree ("version_created_at");
  CREATE INDEX "_testimonials_v_version_version__status_idx" ON "_testimonials_v" USING btree ("version__status");
  CREATE INDEX "_testimonials_v_created_at_idx" ON "_testimonials_v" USING btree ("created_at");
  CREATE INDEX "_testimonials_v_updated_at_idx" ON "_testimonials_v" USING btree ("updated_at");
  CREATE INDEX "_testimonials_v_latest_idx" ON "_testimonials_v" USING btree ("latest");
  CREATE INDEX "pages_title_idx" ON "pages" USING btree ("title");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_seo_seo_og_image_idx" ON "pages" USING btree ("seo_og_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_title_idx" ON "_pages_v" USING btree ("version_title");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_seo_version_seo_og_image_idx" ON "_pages_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_trek_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("trek_categories_id");
  CREATE INDEX "payload_locked_documents_rels_treks_id_idx" ON "payload_locked_documents_rels" USING btree ("treks_id");
  CREATE INDEX "payload_locked_documents_rels_gallery_items_id_idx" ON "payload_locked_documents_rels" USING btree ("gallery_items_id");
  CREATE INDEX "payload_locked_documents_rels_features_id_idx" ON "payload_locked_documents_rels" USING btree ("features_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings_hero_video_idx" ON "site_settings" USING btree ("hero_video_id");
  CREATE INDEX "navigation_quick_links_order_idx" ON "navigation_quick_links" USING btree ("_order");
  CREATE INDEX "navigation_quick_links_parent_id_idx" ON "navigation_quick_links" USING btree ("_parent_id");
  CREATE INDEX "navigation_trek_links_order_idx" ON "navigation_trek_links" USING btree ("_order");
  CREATE INDEX "navigation_trek_links_parent_id_idx" ON "navigation_trek_links" USING btree ("_parent_id");
  CREATE INDEX "navigation_connect_links_order_idx" ON "navigation_connect_links" USING btree ("_order");
  CREATE INDEX "navigation_connect_links_parent_id_idx" ON "navigation_connect_links" USING btree ("_parent_id");
  CREATE INDEX "home_instagram_feed_order_idx" ON "home_instagram_feed" USING btree ("_order");
  CREATE INDEX "home_instagram_feed_parent_id_idx" ON "home_instagram_feed" USING btree ("_parent_id");
  CREATE INDEX "home_instagram_feed_image_idx" ON "home_instagram_feed" USING btree ("image_id");
  CREATE INDEX "about_image_idx" ON "about" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_roles" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "trek_categories" CASCADE;
  DROP TABLE "_trek_categories_v" CASCADE;
  DROP TABLE "treks_included" CASCADE;
  DROP TABLE "treks_not_included" CASCADE;
  DROP TABLE "treks_carry" CASCADE;
  DROP TABLE "treks" CASCADE;
  DROP TABLE "_treks_v_version_included" CASCADE;
  DROP TABLE "_treks_v_version_not_included" CASCADE;
  DROP TABLE "_treks_v_version_carry" CASCADE;
  DROP TABLE "_treks_v" CASCADE;
  DROP TABLE "gallery_items" CASCADE;
  DROP TABLE "_gallery_items_v" CASCADE;
  DROP TABLE "features" CASCADE;
  DROP TABLE "_features_v" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "_testimonials_v" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "navigation_quick_links" CASCADE;
  DROP TABLE "navigation_trek_links" CASCADE;
  DROP TABLE "navigation_connect_links" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TABLE "home_instagram_feed" CASCADE;
  DROP TABLE "home" CASCADE;
  DROP TABLE "about" CASCADE;
  DROP TYPE "public"."enum_users_roles";
  DROP TYPE "public"."enum_trek_categories_status";
  DROP TYPE "public"."enum__trek_categories_v_version_status";
  DROP TYPE "public"."enum_treks_difficulty";
  DROP TYPE "public"."enum_treks_status";
  DROP TYPE "public"."enum__treks_v_version_difficulty";
  DROP TYPE "public"."enum__treks_v_version_status";
  DROP TYPE "public"."enum_gallery_items_status";
  DROP TYPE "public"."enum__gallery_items_v_version_status";
  DROP TYPE "public"."enum_features_status";
  DROP TYPE "public"."enum__features_v_version_status";
  DROP TYPE "public"."enum_testimonials_status";
  DROP TYPE "public"."enum__testimonials_v_version_status";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_status";`)
}
