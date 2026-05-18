"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { contactSchema } from "@/lib/contact-schema";

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M13 5l7 7-7 7"/>
  </svg>
);

export function Contact({ locale }: { locale: string }) {
  const t = useTranslations("contact");
  const options = t.raw("service_options") as string[];
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openSel, setOpenSel] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      setSent(true);
      setForm({ name: "", email: "", service: "", message: "" });
      setTimeout(() => setSent(false), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="ss-section" id="contact" style={{ paddingBottom: "clamp(60px, 8vw, 100px)" }}>
      <div className="ss-contact-grid">
        <div>
          <div className="ss-eyebrow"><span className="ss-eyebrow-dot" />{t("eyebrow")}</div>
          <h2 className="ss-contact-title">{t("title")}</h2>
          <p className="ss-contact-sub">{t("sub")}</p>
          <div className="ss-contact-info">
            <div className="ss-contact-info-title">{t("info_title")}</div>
            <a href={`mailto:${t("info_email")}`}>{t("info_email")}</a>
            <a href={`tel:${t("info_phone").replace(/\s/g, "")}`}>{t("info_phone")}</a>
            <span>{t("info_address")}</span>
          </div>
        </div>

        <form className="ss-form" onSubmit={onSubmit} dir={locale === "ar" ? "rtl" : "ltr"}>
          <div className="ss-field">
            <label>{t("name")}</label>
            <input
              type="text" required
              value={form.name} placeholder={t("name_ph")}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && <span style={{ fontSize: 12, color: "#ef4444" }}>{errors.name}</span>}
          </div>
          <div className="ss-field">
            <label>{t("email")}</label>
            <input
              type="email" required
              value={form.email} placeholder={t("email_ph")}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && <span style={{ fontSize: 12, color: "#ef4444" }}>{errors.email}</span>}
          </div>
          <div className="ss-field ss-field-wide" style={{ position: "relative" }}>
            <label>{t("service")}</label>
            <button
              type="button"
              className={`ss-select${openSel ? " open" : ""}`}
              onClick={() => setOpenSel(!openSel)}
            >
              <span style={{ opacity: form.service ? 1 : 0.5 }}>{form.service || t("service_ph")}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            {openSel && (
              <div className="ss-select-menu">
                {options.map((o) => (
                  <button key={o} type="button" onClick={() => { setForm({ ...form, service: o }); setOpenSel(false); }}>
                    {o}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="ss-field ss-field-wide">
            <label>{t("message")}</label>
            <textarea
              rows={4} required
              value={form.message} placeholder={t("message_ph")}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            {errors.message && <span style={{ fontSize: 12, color: "#ef4444" }}>{errors.message}</span>}
          </div>
          <div className="ss-field-wide">
            <button type="submit" className="ss-btn ss-btn-primary ss-btn-block" disabled={loading} data-magnetic>
              {sent ? t("sent") : loading ? "…" : t("submit")}
              {!sent && !loading && <ArrowIcon />}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
