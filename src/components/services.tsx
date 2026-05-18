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

const WebIllustration = () => (
  <svg viewBox="0 0 280 140" fill="none" className="ss-svc-illust-svg">
    <rect x="60" y="20" width="160" height="100" rx="8" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
    <rect x="60" y="20" width="160" height="20" rx="8" fill="currentColor" opacity="0.06"/>
    <circle cx="76" cy="30" r="3" fill="currentColor" opacity="0.35"/><circle cx="86" cy="30" r="3" fill="currentColor" opacity="0.25"/><circle cx="96" cy="30" r="3" fill="currentColor" opacity="0.18"/>
    <rect x="74" y="50" width="70" height="5" rx="2.5" fill="currentColor" opacity="0.25"/>
    <rect x="74" y="62" width="48" height="5" rx="2.5" fill="currentColor" opacity="0.15"/>
    <rect x="74" y="74" width="55" height="5" rx="2.5" fill="currentColor" opacity="0.2"/>
    <rect x="155" y="50" width="50" height="60" rx="4" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
    <rect x="74" y="90" width="60" height="18" rx="4" fill="currentColor" opacity="0.08"/>
    <rect x="80" y="96" width="30" height="5" rx="2.5" fill="currentColor" opacity="0.2"/>
  </svg>
);

const MobileIllustration = () => (
  <svg viewBox="0 0 280 140" fill="none" className="ss-svc-illust-svg">
    <rect x="105" y="8" width="70" height="124" rx="12" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
    <rect x="105" y="8" width="70" height="18" rx="12" fill="currentColor" opacity="0.05"/>
    <rect x="130" y="14" width="20" height="4" rx="2" fill="currentColor" opacity="0.2"/>
    <rect x="115" y="36" width="50" height="5" rx="2.5" fill="currentColor" opacity="0.2"/>
    <rect x="115" y="48" width="35" height="5" rx="2.5" fill="currentColor" opacity="0.15"/>
    <rect x="115" y="64" width="50" height="30" rx="4" fill="currentColor" opacity="0.06"/>
    <polyline points="120,88 128,78 136,82 144,72 152,76 160,68" stroke="currentColor" strokeWidth="1.2" opacity="0.35" fill="none"/>
    <rect x="127" y="118" width="26" height="4" rx="2" fill="currentColor" opacity="0.2"/>
  </svg>
);

const CloudIllustration = () => (
  <svg viewBox="0 0 280 140" fill="none" className="ss-svc-illust-svg">
    <path d="M175 85a28 28 0 0 0-5-55 35 35 0 0 0-65 10 24 24 0 0 0 5 47h65z" stroke="currentColor" strokeWidth="1.2" opacity="0.45" fill="currentColor" fillOpacity="0.04"/>
    <rect x="108" y="95" width="16" height="28" rx="3" stroke="currentColor" strokeWidth="1" opacity="0.25"/>
    <rect x="132" y="95" width="16" height="28" rx="3" stroke="currentColor" strokeWidth="1" opacity="0.25"/>
    <rect x="156" y="95" width="16" height="28" rx="3" stroke="currentColor" strokeWidth="1" opacity="0.25"/>
    <line x1="116" y1="90" x2="116" y2="95" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.2"/>
    <line x1="140" y1="87" x2="140" y2="95" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.2"/>
    <line x1="164" y1="90" x2="164" y2="95" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.2"/>
  </svg>
);

const AIIllustration = () => (
  <svg viewBox="0 0 280 140" fill="none" className="ss-svc-illust-svg">
    <circle cx="140" cy="60" r="28" stroke="currentColor" strokeWidth="1.2" opacity="0.4"/>
    <circle cx="140" cy="60" r="14" stroke="currentColor" strokeWidth="1" opacity="0.25"/>
    <circle cx="140" cy="60" r="4" fill="currentColor" opacity="0.4"/>
    <line x1="140" y1="32" x2="140" y2="18" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
    <line x1="140" y1="88" x2="140" y2="102" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
    <line x1="112" y1="60" x2="98" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
    <line x1="168" y1="60" x2="182" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
    <circle cx="140" cy="18" r="3" fill="currentColor" opacity="0.3"/>
    <circle cx="140" cy="102" r="3" fill="currentColor" opacity="0.3"/>
    <circle cx="98" cy="60" r="3" fill="currentColor" opacity="0.3"/>
    <circle cx="182" cy="60" r="3" fill="currentColor" opacity="0.3"/>
    <polyline points="98,115 112,108 126,118 140,105 154,112 168,102 182,110" stroke="currentColor" strokeWidth="1.2" opacity="0.3" fill="none"/>
  </svg>
);

const illustrations: Record<string, React.ReactNode> = {
  web: <WebIllustration />, mobile: <MobileIllustration />,
  cloud: <CloudIllustration />, ai: <AIIllustration />,
};

interface SvcData { title: string; desc: string; bullets: string[] }

export function Services() {
  const t = useTranslations("services");
  const keys = ["web", "mobile", "cloud", "ai"] as const;

  return (
    <section className="ss-section" id="services">
      <Reveal>
        <div className="ss-section-head">
          <div className="ss-eyebrow"><span className="ss-eyebrow-dot" />{t("eyebrow")}</div>
          <h2 className="ss-section-title">{t("title")}</h2>
          <p className="ss-section-sub">{t("sub")}</p>
        </div>
      </Reveal>
      <div className="ss-svc-grid">
        {keys.map((k, i) => {
          const svc = t.raw(k) as SvcData;
          return (
            <Reveal key={k} delay={i * 90}>
              <div className="ss-svc-card">
                <div className="ss-svc-illust-area">
                  <div className="ss-svc-diag-lines" />
                  {illustrations[k]}
                </div>
                <div className="ss-svc-card-body">
                  <div className="ss-svc-tags">
                    {svc.bullets.map((b) => <span key={b} className="ss-svc-tag">{b}</span>)}
                  </div>
                  <h3 className="ss-svc-title">{svc.title}</h3>
                  <p className="ss-svc-desc">{svc.desc}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
