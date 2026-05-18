import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  const sections = t.raw("sections") as { heading: string; body: string }[];

  return (
    <main className="ss-legal-page">
      <div className="ss-legal-hero">
        <div className="ss-legal-hero-inner">
          <Link href={`/${locale}`} className="ss-legal-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            {t("back")}
          </Link>
          <div className="ss-eyebrow" style={{ marginTop: 24 }}>
            <span className="ss-eyebrow-dot" />
            {t("updated")}
          </div>
          <h1 className="ss-legal-title">{t("title")}</h1>
        </div>
      </div>

      <div className="ss-legal-layout">
        <nav className="ss-legal-toc">
          <p className="ss-legal-toc-label">Contents</p>
          {sections.map((s, i) => (
            <a key={i} href={`#section-${i}`} className="ss-legal-toc-link">
              <span className="ss-legal-toc-num">{String(i + 1).padStart(2, "0")}</span>
              {s.heading}
            </a>
          ))}
        </nav>

        <div className="ss-legal-body">
          {sections.map((s, i) => (
            <div key={i} id={`section-${i}`} className="ss-legal-card">
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
