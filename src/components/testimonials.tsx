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

interface TestiItem { quote: string; name: string; role: string }

export function Testimonials() {
  const t = useTranslations("testimonials");
  const items = t.raw("items") as TestiItem[];

  return (
    <section className="ss-section" id="testimonials">
      <Reveal>
        <div className="ss-section-head">
          <div className="ss-eyebrow"><span className="ss-eyebrow-dot" />{t("eyebrow")}</div>
          <h2 className="ss-section-title">{t("title")}</h2>
        </div>
      </Reveal>
      <div className="ss-testi-grid">
        {items.map((q, i) => (
          <Reveal key={i} delay={i * 80}>
            <figure className="ss-testi-card">
              <svg className="ss-testi-quote" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 7h4v4H8c0 2 1 3 3 3v3c-3 0-5-2-5-5V7zm9 0h4v4h-3c0 2 1 3 3 3v3c-3 0-5-2-5-5V7z"/>
              </svg>
              <blockquote>{q.quote}</blockquote>
              <figcaption>
                <div className="ss-testi-avatar">{q.name.charAt(0)}</div>
                <div>
                  <div className="ss-testi-name">{q.name}</div>
                  <div className="ss-testi-role">{q.role}</div>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
