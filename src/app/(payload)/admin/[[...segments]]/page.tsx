import config from "@payload-config";
import { RootPage, generatePageMetadata } from "@payloadcms/next/views";
import type { Metadata } from "next";
import { importMap } from "../importMap";

type Args = {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
};

export async function generateMetadata({ params, searchParams }: Args): Promise<Metadata> {
  return generatePageMetadata({ config, params, searchParams });
}

export default async function Page({ params, searchParams }: Args) {
  return <RootPage config={config} importMap={importMap} params={params} searchParams={searchParams} />;
}
