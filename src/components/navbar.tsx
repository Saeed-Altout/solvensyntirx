"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

const SunIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);
const MoonIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
const MenuIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M3 12h18M3 6h18M3 18h18" />
  </svg>
);
const CloseIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

export function Navbar({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onS = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onS, { passive: true });
    onS();
    return () => window.removeEventListener("scroll", onS);
  }, []);

  const otherLocale = locale === "ar" ? "en" : "ar";
  const logoSrc = mounted && isDark ? "/logo-dark.png" : "/logo.png";

  const links = [
    { href: "#about", label: t("about") },
    { href: "#services", label: t("services") },
    { href: "#process", label: t("process") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <header className={`ss-nav${scrolled ? " ss-nav-scrolled" : ""}`}>
      <div className="ss-nav-inner">
        <a href="#home" className="ss-logo" data-magnetic>
          <Image
            src={logoSrc}
            alt="Solven Syntrix"
            width={120}
            height={100}
            style={{ height: 100, width: "auto" }}
          />
        </a>

        <nav className="ss-nav-links">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ss-nav-actions">
          <Link
            href={`/${otherLocale}`}
            className="ss-iconbtn"
            aria-label="Toggle language"
            data-magnetic
          >
            <span
              style={{ fontWeight: 600, fontSize: 12, letterSpacing: ".08em" }}
            >
              {locale === "ar" ? "EN" : "ع"}
            </span>
          </Link>
          <button
            className="ss-iconbtn"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Toggle theme"
            data-magnetic
          >
            {mounted ? isDark ? <SunIcon /> : <MoonIcon /> : <MoonIcon />}
          </button>
          <a
            href="#contact"
            className="ss-btn ss-btn-primary ss-btn-nav ss-hide-mobile"
            data-magnetic
          >
            {t("cta")}
          </a>
          <button
            className="ss-iconbtn ss-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="ss-mobile-menu">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}>
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ss-btn ss-btn-primary ss-btn-block"
            onClick={() => setMobileOpen(false)}
          >
            {t("cta")}
          </a>
        </div>
      )}
    </header>
  );
}
