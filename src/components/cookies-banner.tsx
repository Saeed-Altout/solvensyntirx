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
