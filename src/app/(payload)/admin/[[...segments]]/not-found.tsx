import config from "@payload-config";
import { NotFoundPage, generatePageMetadata } from "@payloadcms/next/views";
import type { Metadata } from "next";
import { importMap } from "../importMap";

type Args = {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: Args): Promise<Metadata> {
  return generatePageMetadata({ config, params, searchParams });
}

export default async function NotFound({ params, searchParams }: Args) {
  return (
    <NotFoundPage
      config={config}
      importMap={importMap}
      params={params}
      searchParams={searchParams}
    />
  );
}
