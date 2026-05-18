"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";

const KEY = "ss-cookies-accepted";

export function CookiesBanner() {
  const t = useTranslations("cookies");
  const params = useParams();
  const locale = params?.locale as string ?? "ar";
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setShow(true);
  }, []);

  function accept() {
    localStorage.setItem(KEY, "1");
    setShow(false);
  }

  function decline() {
    localStorage.setItem(KEY, "0");
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="ss-cookies">
      <div className="ss-cookies-icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/>
          <circle cx="8.5" cy="9" r="1" fill="currentColor"/>
          <circle cx="15" cy="8" r="1" fill="currentColor"/>
          <circle cx="10" cy="14" r="1" fill="currentColor"/>
          <circle cx="15.5" cy="13.5" r="1" fill="currentColor"/>
          <circle cx="12" cy="11" r="0.5" fill="currentColor"/>
        </svg>
      </div>
      <p className="ss-cookies-text">
        {t("message")}{" "}
        <Link href={`/${locale}/privacy`} className="ss-cookies-link">{t("privacy_link")}</Link>
      </p>
      <div className="ss-cookies-actions">
        <button className="ss-btn ss-btn-ghost ss-btn-sm" onClick={decline}>{t("decline")}</button>
        <button className="ss-btn ss-btn-primary ss-btn-sm" onClick={accept}>{t("accept")}</button>
      </div>
    </div>
  );
}
