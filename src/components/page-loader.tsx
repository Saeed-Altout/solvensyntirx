"use client";
import { useEffect, useState } from "react";

export function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHiding(true), 1200);
    const t2 = setTimeout(() => setVisible(false), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!visible) return null;

  return (
    <div className={`ss-loader${hiding ? " ss-loader-hide" : ""}`}>
      <div className="ss-loader-inner">
        <div className="ss-loader-logo">
          <div className="ss-loader-ring" />
          <div className="ss-loader-ring ss-loader-ring-2" />
          <div className="ss-loader-dot" />
        </div>
        <div className="ss-loader-bar">
          <div className="ss-loader-bar-fill" />
        </div>
      </div>
    </div>
  );
}
