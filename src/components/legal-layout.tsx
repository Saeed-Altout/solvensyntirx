"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Section { heading: string; body: string }

interface LegalLayoutProps {
  locale: string;
  title: string;
  updated: string;
  back: string;
  contents: string;
  sections: Section[];
}

export function LegalLayout({ locale, title, updated, back, contents, sections }: LegalLayoutProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const isLast = (i: number) => i === sections.length - 1;
    sections.forEach((_, i) => {
      const el = document.getElementById(`section-${i}`);
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(i); },
        { rootMargin: isLast(i) ? "-20% 0px -10% 0px" : "-30% 0px -60% 0px", threshold: 0 }
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((io) => io.disconnect());
  }, [sections]);

  function scrollTo(i: number) {
    setActive(i);
    document.getElementById(`section-${i}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="ss-legal-page">
      <div className="ss-legal-hero">
        <div className="ss-legal-hero-inner">
          <div className="ss-legal-hero-top">
            <Link href={`/${locale}`} className="ss-legal-back">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
              {back}
            </Link>
            <div className="ss-eyebrow">
              <span className="ss-eyebrow-dot" />
              {updated}
            </div>
          </div>
          <h1 className="ss-legal-title">{title}</h1>
        </div>
      </div>

      <div className="ss-legal-layout">
        <nav className="ss-legal-toc">
          <p className="ss-legal-toc-label">{contents}</p>
          <div className="ss-legal-toc-items">
            {sections.map((s, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`ss-legal-toc-link${active === i ? " active" : ""}`}
              >
                <span className="ss-legal-toc-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="ss-legal-toc-text">{s.heading}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="ss-legal-body">
          {sections.map((s, i) => (
            <div key={i} id={`section-${i}`} className={`ss-legal-card${active === i ? " active" : ""}`}>
              <div className="ss-legal-card-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="ss-legal-card-content">
                <h2 className="ss-legal-card-heading">{s.heading}</h2>
                <p className="ss-legal-card-body">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
