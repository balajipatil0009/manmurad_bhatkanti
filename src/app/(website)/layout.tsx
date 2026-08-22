import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SITE } from "@/lib/site";
import { getGlobal } from "@/lib/queries";

import type { SiteSetting, Navigation } from "@/payload-types";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const siteSettings = (await getGlobal("site-settings")) as SiteSetting;
    const siteName = siteSettings.siteName || SITE.name;
    const tagline = siteSettings.tagline || SITE.tagline;
    const description = siteSettings.footerTagline || SITE.description;
    return {
      metadataBase: new URL("https://manmuradbhatkanti.in"),
      title: {
        default: `${siteName} | ${tagline}`,
        template: `%s | ${siteName}`,
      },
      description: description,
      keywords: [
        "Manmurad Bhatkanti",
        "Sahyadri treks",
        "Maharashtra trekking",
        "night treks",
        "backpacking tours",
        "waterfall expeditions",
      ],
      openGraph: {
        title: `${siteName} | ${tagline}`,
        description: description,
        type: "website",
        locale: "en_IN",
      },
    };
  } catch (error) {
    console.error("Failed to generate dynamic metadata:", error);
    return {
      metadataBase: new URL("https://manmuradbhatkanti.in"),
      title: {
        default: `${SITE.name} | ${SITE.tagline}`,
        template: `%s | ${SITE.name}`,
      },
      description: SITE.description,
    };
  }
}

export default async function RootLayout({
  children,
}: LayoutProps<"/">) {
  const siteSettings = (await getGlobal("site-settings")) as SiteSetting;
  const navigation = (await getGlobal("navigation")) as Navigation;

  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream text-black">
        <Header siteSettings={siteSettings} navigation={navigation} />
        <main className="flex-1">{children}</main>
        <Footer siteSettings={siteSettings} navigation={navigation} />
        <WhatsAppButton />
      </body>
    </html>
  );
}
