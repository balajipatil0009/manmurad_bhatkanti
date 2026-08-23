"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function GSAPScrollWrapper({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const html = document.documentElement;
      html.classList.add("gsap-active");

      const panels = gsap.utils.toArray<HTMLElement>(
        containerRef.current ? containerRef.current.children : []
      );

      // Filter panels to find sections
      const targetPanels = panels.filter(
        (panel) => panel.tagName === "SECTION"
      );

      // Apply card stacking on all screen sizes
      targetPanels.forEach((panel, i) => {
        // Set sequential z-index so later panels scroll over earlier ones
        panel.style.zIndex = `${i + 1}`;
        panel.style.position = "relative";
        
        // Background must be solid to cover the pinned section behind it
        if (!panel.style.backgroundColor && !panel.className.includes("bg-")) {
          panel.style.backgroundColor = "var(--color-cream)";
        }

        // Pin the panel. The next panel will slide up over it.
        if (i < targetPanels.length - 1) {
          ScrollTrigger.create({
            trigger: panel,
            start: "top top",
            pin: true,
            pinSpacing: false, // Prevents creating gap; next section slides up directly
            end: "bottom top",
            invalidateOnRefresh: true,
          });
        }
      });

      return () => {
        html.classList.remove("gsap-active");
      };
    },
    { scope: containerRef }
  );

  return <div ref={containerRef}>{children}</div>;
}
