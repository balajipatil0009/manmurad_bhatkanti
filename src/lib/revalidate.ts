import { revalidatePath } from "next/cache";
import type { RequestContext } from "payload";

export function revalidateSite(context?: RequestContext) {
  if (context?.skipRevalidate) return;

  try {
    revalidatePath("/", "layout");
  } catch (error) {
    console.warn("revalidatePath failed (likely running outside Next.js):", error);
  }
}
