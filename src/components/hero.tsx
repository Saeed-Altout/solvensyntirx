"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { SyriaGlowMap } from "./syria-glow-map";

const MARQUEE_ITEMS = ["AWS", "GCP", "AZURE", "KUBERNETES", "NEXT.JS", "RUST", "KAFKA", "TERRAFORM", "POSTGRES", "REDIS", "REACT NATIVE", "OPENAI"];

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M13 5l7 7-7 7"/>
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
      { rootMargin: "-8% 0px -8% 0px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(24px)",
        transition: `opacity .8s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform .9s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

export function Hero({ locale }: { locale: string }) {
  const t = useTranslations("hero");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="ss-hero" id="home">
      <div className="ss-hero-bg">
        <div className="ss-hero-orb" style={{ transform: `translateY(${scrollY * 0.15}px)` }} />
        <div className="ss-hero-orb ss-hero-orb-2" style={{ transform: `translateY(${scrollY * 0.08}px)` }} />
      </div>

      <div className="ss-hero-grid">
        <div className="ss-hero-text">
          <Reveal>
            <div className="ss-eyebrow">
              <span className="ss-eyebrow-dot" />
              {t("eyebrow")}
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="ss-hero-title">
              <span className="ss-title-line">{t("title_a")}</span>
              <span className="ss-title-line ss-title-metallic">{t("title_b")}</span>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="ss-hero-sub">{t("subtitle")}</p>
          </Reveal>
          <Reveal delay={260}>
            <div className="ss-hero-ctas">
              <a href="#contact" className="ss-btn ss-btn-primary" data-magnetic>
                {t("cta_primary")} <ArrowIcon />
              </a>
              <a href="#services" className="ss-btn ss-btn-ghost" data-magnetic>
                {t("cta_secondary")}
              </a>
            </div>
          </Reveal>
        </div>

        <div className="ss-hero-map-wrap">
          <SyriaGlowMap lang={locale} />
          <div className="ss-hero-corner ss-hero-corner-tl" />
          <div className="ss-hero-corner ss-hero-corner-tr" />
          <div className="ss-hero-corner ss-hero-corner-bl" />
          <div className="ss-hero-corner ss-hero-corner-br" />
        </div>
      </div>

      <div className="ss-hero-marquee">
        <div className="ss-marquee-track">
          {[0, 1].map((k) => (
            <div key={k} className="ss-marquee-group">
              {MARQUEE_ITEMS.map((x) => <span key={x}>{x}</span>)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
