"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

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
    <div ref={ref} style={{ opacity: shown ? 1 : 0, transform: shown ? "translateY(0)" : "translateY(24px)", transition: `opacity .8s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform .9s cubic-bezier(.2,.7,.2,1) ${delay}ms`, willChange: "opacity, transform" }}>
      {children}
    </div>
  );
}

interface Partner { name: string; desc: string; url: string }

export function Partners() {
  const t = useTranslations("partners");
  const items = t.raw("items") as Partner[];

  return (
    <section className="ss-section" id="partners">
      <Reveal>
        <div className="ss-section-head">
          <div className="ss-eyebrow"><span className="ss-eyebrow-dot" />{t("eyebrow")}</div>
          <h2 className="ss-section-title">{t("title")}</h2>
        </div>
      </Reveal>
      <div className="ss-partners-grid">
        {items.map((p, i) => (
          <Reveal key={i} delay={i * 100}>
            <div className="ss-partner-card">
              <div className="ss-partner-logo-area">
                <span className="ss-partner-logo-text">{p.name.charAt(0)}</span>
              </div>
              <h3 className="ss-partner-name">{p.name}</h3>
              <p className="ss-partner-desc">{p.desc}</p>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="ss-partner-link">
                {p.url.replace("https://", "")}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7v10"/>
                </svg>
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
