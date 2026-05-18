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
      { threshold: 0.05 }
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
      }}
    >
      {children}
    </div>
  );
}

interface FaqItem { q: string; a: string }

function FaqAccordion({ item, index }: { item: FaqItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal delay={index * 60}>
      <div className={`ss-faq-item${open ? " ss-faq-item-open" : ""}`}>
        <button
          className="ss-faq-trigger"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          <span className="ss-faq-q">{item.q}</span>
          <span className="ss-faq-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>
        </button>
        {/* grid-template-rows trick: reliable cross-browser accordion without max-height hacks */}
        <div className="ss-faq-body">
          <div className="ss-faq-body-inner">
            <p className="ss-faq-a">{item.a}</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function Faq() {
  const t = useTranslations("faq");
  const items = t.raw("items") as FaqItem[];

  return (
    <section className="ss-section" id="faq">
      <Reveal>
        <div className="ss-section-head">
          <div className="ss-eyebrow"><span className="ss-eyebrow-dot" />{t("eyebrow")}</div>
          <h2 className="ss-section-title">{t("title")}</h2>
        </div>
      </Reveal>
      <div className="ss-faq-list">
        {items.map((item, i) => (
          <FaqAccordion key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
