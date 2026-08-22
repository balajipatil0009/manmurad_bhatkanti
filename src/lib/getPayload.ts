import { getPayload } from "payload";
import type { Payload } from "payload";
import config from "@payload-config";

let cached: Promise<Payload> | null = null;

export function getPayloadCached(): Promise<Payload> {
  if (!cached) {
    cached = getPayload({ config });
  }
  return cached;
}
