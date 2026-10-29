import type { Media } from "@/payload-types";

type MediaValue = number | Media | null | undefined;

export function getMediaUrl(value: MediaValue, fallback = ""): string {
  return value && typeof value === "object" ? value.url || fallback : fallback;
}

export function getMediaAlt(value: MediaValue, fallback = ""): string {
  return value && typeof value === "object" ? value.alt || fallback : fallback;
}
