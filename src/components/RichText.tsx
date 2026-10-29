import { convertLexicalToHTML } from "@payloadcms/richtext-lexical/html";
import type { Page } from "@/payload-types";

type RichTextContent = Page["content"] | null | undefined;

export function RichText({
  content,
  className,
}: {
  content: RichTextContent;
  className?: string;
}) {
  if (!content?.root) return null;

  const html = convertLexicalToHTML({
    data: content as unknown as Parameters<typeof convertLexicalToHTML>[0]["data"],
    disableContainer: true,
  });

  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
