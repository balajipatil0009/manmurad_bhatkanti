import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";
import type { SiteSetting, Navigation, Media } from "@/payload-types";

interface FooterProps {
  siteSettings: SiteSetting;
  navigation: Navigation;
}

export function Footer({ siteSettings, navigation }: FooterProps) {
  const siteName = siteSettings?.siteName || SITE.name;
  const siteNameParts = siteName.split(" ");
  const siteNameLine1 = siteNameParts[0] || "Manmurad";
  const siteNameLine2 = siteNameParts.slice(1).join(" ") || "Bhatkanti";

  const tagline = siteSettings?.footerTagline || SITE.description;
  const phone = siteSettings?.phone || SITE.phone;
  const phoneDisplay = siteSettings?.phoneDisplay || SITE.phoneDisplay;
  const instagram = siteSettings?.instagram || SITE.instagram;
  const whatsappNumber = siteSettings?.whatsappNumber || "919112784198";

  const designerName = siteSettings?.designerName || SITE.designer.name;
  const designerInstagram = siteSettings?.designerInstagram || SITE.designer.instagram;

  const logoUrl =
    siteSettings?.logo && typeof siteSettings.logo === "object"
      ? (siteSettings.logo as Media).url || SITE.logo
      : SITE.logo;

  const quickLinks = navigation?.quickLinks || [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/#about" },
    { label: "Upcoming Treks", href: "/#upcoming" },
    { label: "Completed Trips", href: "/#completed" },
    { label: "Gallery", href: "/#gallery" },
    { label: "Contact Us", href: "/#contact" },
  ];

  const connectLinks = navigation?.connectLinks || [
    { label: "Instagram", href: instagram },
    { label: "WhatsApp Chat", href: `https://wa.me/${whatsappNumber}` },
    { label: "Call Team", href: `tel:${phone}` },
  ];

  return (
    <footer className="bg-forestdeep text-white pt-16 overflow-hidden border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 grid md:grid-cols-[1.2fr_2fr] gap-12 pb-12">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-3 text-white">
            <Image
              src={logoUrl}
              alt={`${siteName} Logo`}
              width={100}
              height={100}
              className="h-10 w-auto object-contain"
            />
            <span className="font-extrabold uppercase leading-none text-sm tracking-wide">
              {siteNameLine1}
              <br />
              {siteNameLine2}
            </span>
          </Link>
          <p className="text-xs text-white/50 leading-relaxed font-light">
            {tagline}
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          <div>
            <h3 className="font-extrabold uppercase text-sm mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-white/60">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-extrabold uppercase text-sm mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <a href={`tel:${phone}`} className="hover:text-white">
                  {phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  className="hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Chat
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-extrabold uppercase text-sm mb-4">Connect</h3>
            <ul className="space-y-2 text-sm text-white/60">
              {connectLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-6 pb-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40 border-t border-white/10 pt-6">
        <p>© 2026 {siteName}</p>
        <p>
          Designed by{" "}
          <a
            href={designerInstagram}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-white"
          >
            {designerName}
          </a>
        </p>
      </div>
      <div className="wordmark text-center text-[16vw] leading-none -mb-[3vw] tracking-tighter">
        BHATKANTI
      </div>
    </footer>
  );
}
