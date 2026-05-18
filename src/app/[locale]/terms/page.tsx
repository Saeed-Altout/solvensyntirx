import { getTranslations } from "next-intl/server";
import { LegalLayout } from "@/components/legal-layout";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms" });

  return (
    <LegalLayout
      locale={locale}
      title={t("title")}
      updated={t("updated")}
      back={t("back")}
      contents={t("contents")}
      sections={t.raw("sections") as { heading: string; body: string }[]}
    />
  );
}
