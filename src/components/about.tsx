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

interface Stat { value: string; sup: string; desc: string; label: string }
interface Meta { label: string; value: string }

export function About() {
  const t = useTranslations("about");
  const stats = t.raw("stats") as Stat[];
  const meta = t.raw("meta") as Meta[];

  return (
    <section className="ss-section" id="about">
      <Reveal>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div className="ss-eyebrow"><span className="ss-eyebrow-dot" />{t("eyebrow")}</div>
        </div>
      </Reveal>
      <Reveal delay={60}>
        <h2 className="ss-about-title">{t("title")}</h2>
      </Reveal>
      <div className="ss-about-columns">
        <div className="ss-about-text-col">
          <Reveal delay={80}>
            <p className="ss-about-body">{t("body")}</p>
          </Reveal>
          <Reveal delay={200}>
            <div className="ss-about-meta">
              {meta.map((m, i) => (
                <div key={i} className="ss-about-meta-item">
                  <span className="ss-about-meta-label">{m.label}</span>
                  <span className="ss-about-meta-value">{m.value}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <div className="ss-about-cards-col">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="ss-about-stat-card">
                <div style={{ position: "relative", zIndex: 1, marginBottom: 12 }}>
                  <div className="ss-about-stat-number">
                    {s.sup === "★" && <span className="ss-about-stat-sup ss-about-stat-star">★</span>}
                    {s.value}
                    {s.sup !== "★" && <span className="ss-about-stat-sup">{s.sup}</span>}
                  </div>
                </div>
                <p className="ss-about-stat-desc">{s.desc}</p>
                <span className="ss-about-stat-label">{s.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
