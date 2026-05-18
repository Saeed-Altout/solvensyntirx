import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Cairo } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { PageLoader } from "@/components/page-loader";
import { LangTransition } from "@/components/lang-transition";
import { CookiesBanner } from "@/components/cookies-banner";
import { CursorFX } from "@/components/cursor-fx";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
});

const BASE_URL = "https://solvensyntrix.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const isAr = locale === "ar";
  const url = `${BASE_URL}/${locale}`;

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: t("title"),
      template: `%s | Solven Syntrix`,
    },
    description: t("description"),
    keywords: isAr
      ? ["سولفن سنتركس", "برمجة سوريا", "تقنية معلومات", "اتصالات", "استثمار رقمي", "تطوير برمجيات"]
      : ["Solven Syntrix", "Syria tech", "software development", "telecoms", "digital investment", "IT Syria"],
    authors: [{ name: "Solven Syntrix", url: BASE_URL }],
    creator: "Solven Syntrix",
    publisher: "Solven Syntrix",
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    alternates: {
      canonical: url,
      languages: { ar: `${BASE_URL}/ar`, en: `${BASE_URL}/en` },
    },
    icons: {
      icon: "/logo-favicon.png",
      shortcut: "/logo-favicon.png",
      apple: "/logo-favicon.png",
    },
    openGraph: {
      type: "website",
      locale: isAr ? "ar_SY" : "en_US",
      alternateLocale: isAr ? "en_US" : "ar_SY",
      url,
      siteName: "Solven Syntrix",
      title: t("title"),
      description: t("description"),
      images: [
        {
          url: `${BASE_URL}/${locale}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@solvensyntrix",
      creator: "@solvensyntrix",
      title: t("title"),
      description: t("description"),
      images: [`${BASE_URL}/${locale}/opengraph-image`],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={cairo.variable}>
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <PageLoader />
            <LangTransition />
            <CursorFX />
            {children}
            <CookiesBanner />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
