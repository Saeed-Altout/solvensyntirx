import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

  return (
    <main className="ss-legal-page">
      <div className="ss-legal-inner">
        <Link href={`/${locale}`} className="ss-legal-back">← {t("back")}</Link>
        <h1 className="ss-legal-title">{t("title")}</h1>
        <p className="ss-legal-date">{t("updated")}</p>
        <div className="ss-legal-body">
          {(t.raw("sections") as { heading: string; body: string }[]).map((s, i) => (
            <section key={i}>
              <h2>{s.heading}</h2>
              <p>{s.body}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
