"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setShown(true)),
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(28px)",
        transition: `opacity .8s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform .9s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export function CtaBanner() {
  const t = useTranslations("cta_banner");

  return (
    <section className="ss-cta-banner" id="cta">
      <div className="ss-cta-banner-inner">
        <div className="ss-cta-banner-glow" />
        <Reveal>
          <div className="ss-eyebrow ss-eyebrow-center">
            <span className="ss-eyebrow-dot" />{t("eyebrow")}
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="ss-cta-banner-title">{t("title")}</h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="ss-cta-banner-sub">{t("sub")}</p>
        </Reveal>
        <Reveal delay={240}>
          <div className="ss-cta-banner-actions">
            <a href="#contact" className="ss-btn ss-btn-primary ss-btn-lg" data-magnetic>
              {t("cta_primary")} <ArrowIcon />
            </a>
            <a href="#work" className="ss-btn ss-btn-ghost ss-btn-lg" data-magnetic>
              {t("cta_secondary")}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
