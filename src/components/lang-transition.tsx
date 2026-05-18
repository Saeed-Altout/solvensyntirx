"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export function LangTransition() {
  const params = useParams();
  const locale = params?.locale as string;
  const [active, setActive] = useState(false);
  const [prev, setPrev] = useState(locale);

  useEffect(() => {
    if (locale !== prev) {
      setActive(true);
      setPrev(locale);
      const t = setTimeout(() => setActive(false), 600);
      return () => clearTimeout(t);
    }
  }, [locale, prev]);

  if (!active) return null;
  return <div className="ss-lang-transition" />;
}
