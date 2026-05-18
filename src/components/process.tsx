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

interface Step { n: string; title: string; desc: string }

export function Process() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as Step[];

  return (
    <section className="ss-section" id="process">
      <Reveal>
        <div className="ss-section-head">
          <div className="ss-eyebrow"><span className="ss-eyebrow-dot" />{t("eyebrow")}</div>
          <h2 className="ss-section-title">{t("title")}</h2>
          <p className="ss-section-sub">{t("sub")}</p>
        </div>
      </Reveal>
      <div className="ss-process-grid">
        <div className="ss-process-line" />
        {steps.map((s, i) => (
          <Reveal key={i} delay={i * 100}>
            <div className="ss-process-step">
              <div className="ss-process-num">{s.n}</div>
              <h3 className="ss-process-title">{s.title}</h3>
              <p className="ss-process-desc">{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
