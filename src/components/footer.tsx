"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

export function Footer() {
  const t = useTranslations("footer");
  const st = useTranslations("services");
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const svcKeys = ["web", "mobile", "cloud", "ai"] as const;

  return (
    <footer className="ss-footer">
      <div className="ss-footer-grid">
        <div>
          <a href="#home" className="ss-logo">
            <Image
              src={isDark ? "/logo-dark.png" : "/logo.png"}
              alt="Solven Syntrix"
              width={120}
              height={100}
              style={{ height: 100, width: "auto" }}
            />
          </a>
          <p className="ss-footer-tag">{t("tagline")}</p>
        </div>
        <div>
          <h4>{t("col_company")}</h4>
          <ul>
            {(t.raw("links_company") as string[]).map((l) => (
              <li key={l}>
                <a href="#">{l}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>{t("col_services")}</h4>
          <ul>
            {svcKeys.map((k) => (
              <li key={k}>
                <a href="#services">{st(`${k}.title`)}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>{t("col_legal")}</h4>
          <ul>
            {(t.raw("links_legal") as string[]).map((l) => (
              <li key={l}>
                <a href="#">{l}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="ss-footer-bottom">
        <span>{t("copyright")}</span>
        <span className="ss-footer-status">
          <span className="ss-status-dot" />
          {t("status")}
        </span>
      </div>
    </footer>
  );
}
