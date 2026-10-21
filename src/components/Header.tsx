"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site";
import type { SiteSetting, Navigation, Media } from "@/payload-types";

interface HeaderProps {
  siteSettings: SiteSetting;
  navigation: Navigation;
}

export function Header({ siteSettings, navigation }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  const headerClass = isHome
    ? `fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-forest backdrop-blur border-b border-black/5" : "bg-transparent"
      }`
    : "sticky top-0 z-50 bg-forest backdrop-blur border-b border-black/5";

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  const navLinks = navigation?.quickLinks?.length
    ? navigation.quickLinks
    : [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/#about" },
        { label: "Upcoming Treks", href: "/#upcoming" },
        { label: "Completed Trips", href: "/#completed" },
        { label: "Gallery", href: "/#gallery" },
        { label: "Contact Us", href: "/#contact" },
      ];

  const trekLinks = navigation?.trekLinks?.length
    ? navigation.trekLinks
    : [
        { label: "One Day Treks", href: "/trips?category=one-day" },
        { label: "Night Treks", href: "/trips?category=night-trek" },
        { label: "Backpacking Tours", href: "/trips?category=backpacking" },
        { label: "Waterfall Expeditions", href: "/trips?category=waterfall" },
      ];

  const siteInstagram = siteSettings?.instagram || SITE.instagram;
  const sitePhone = siteSettings?.phone || SITE.phone;
  const siteWhatsapp = siteSettings?.whatsappNumber || "919112784198";

  const connectLinks = navigation?.connectLinks?.length
    ? navigation.connectLinks
    : [
        { label: "Instagram", href: siteInstagram },
        { label: "WhatsApp Chat", href: `https://wa.me/${siteWhatsapp}` },
        { label: "Call Team", href: `tel:${sitePhone}` },
      ];

  const logoUrl =
    siteSettings?.logo && typeof siteSettings.logo === "object"
      ? (siteSettings.logo as Media).url || SITE.logo
      : SITE.logo;

  const whatsappBookUrl = `https://wa.me/${siteWhatsapp}?text=Hello%20Manmurad%20Bhatkanti,%20I%20want%20to%20book%20a%20trek%20slot%20now!`;

  const siteName = siteSettings?.siteName || SITE.name;
  const siteNameParts = siteName.split(" ");
  const siteNameLine1 = siteNameParts[0] || "Manmurad";
  const siteNameLine2 = siteNameParts.slice(1).join(" ") || "Bhatkanti";

  return (
    <>
      <header className={headerClass}>
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 h-16">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={logoUrl}
              alt={`${siteName} Logo`}
              width={100}
              height={100}
              className="h-10 w-auto object-contain"
            />
            <span className="font-extrabold uppercase leading-none text-xs sm:text-sm tracking-wide text-white">
              {siteNameLine1}
              <br />
              {siteNameLine2}
            </span>
          </Link>
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[11px] font-bold uppercase tracking-widest text-white/85 hover:text-primary transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <a
              href={whatsappBookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-primary text-white text-xs font-bold uppercase tracking-wide px-5 py-3 rounded-full hover:bg-primary-dark transition shadow-md"
            >
              Book Now
            </a>
            <button
              type="button"
              onClick={toggle}
              aria-label="Toggle Menu"
              className="lg:hidden text-white flex flex-col gap-1.5 p-1"
            >
              <span className="block w-7 h-0.5 bg-white" />
              <span className="block w-7 h-0.5 bg-white" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 bg-forest text-white overflow-y-auto">
          <div className="max-w-[1400px] mx-auto px-6 py-5 flex items-center justify-between">
            <span className="flex items-center gap-3 text-white">
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
            </span>
            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="text-sm uppercase font-bold tracking-widest hover:opacity-70"
            >
              Close ✕
            </button>
          </div>
          <nav className="max-w-[1400px] mx-auto px-6 pb-16 grid md:grid-cols-3 gap-10 mt-8">
            <div>
              <h3 className="uppercase font-extrabold text-2xl mb-4">
                Quick Links
              </h3>
              <ul className="space-y-1.5 text-white/80 text-sm">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link className="hover:text-white" href={link.href} onClick={close}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="uppercase font-extrabold text-2xl mb-4">
                Treks &amp; Tours
              </h3>
              <ul className="space-y-1.5 text-white/80 text-sm">
                {trekLinks.map((link) => (
                  <li key={link.label}>
                    <Link className="hover:text-white" href={link.href} onClick={close}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="uppercase font-extrabold text-2xl mb-4">Connect</h3>
              <ul className="space-y-1.5 text-white/80 text-sm">
                {connectLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      className="hover:text-white"
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
