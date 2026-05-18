"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const SYRIA_OUTLINE = `M 649,25 L 643,21 L 636,20 L 614,31 L 590,34 L 576,40 L 502,40 L 480,45
  L 457,56 L 434,60 L 425,66 L 393,69
  L 375,73 L 328,67 L 311,55 L 293,52 L 234,63 L 214,72 L 202,68 L 183,68
  L 178,60 L 147,56 L 144,53 L 138,69 L 130,78 L 134,86 L 144,92 L 148,100
  L 142,104 L 118,102 L 114,107 L 116,118 L 109,126 L 103,126 L 98,136
  L 88,128 L 73,126 L 70,132 L 66,132 L 68,139 L 56,152 L 60,160 L 66,160
  L 73,166 L 74,184 L 88,185 L 73,186 L 69,189 L 65,205 L 74,228 L 98,230
  L 100,229 L 108,226 L 112,230 L 118,230 L 120,233 L 109,241
  L 115,241 L 127,250 L 125,257 L 135,260 L 128,261 L 129,267 L 120,274
  L 119,278 L 112,278 L 100,286 L 100,289 L 109,293 L 108,296 L 79,296
  L 65,307 L 75,313 L 75,316 L 65,319 L 66,322 L 36,339 L 38,346 L 33,352
  L 30,368 L 31,384 L 40,381 L 54,382 L 65,390 L 70,400 L 82,400 L 101,414
  L 113,414 L 140,420 L 293,352 L 297,351 L 391,310
  L 393,308 L 497,262 L 536,253 L 539,242 L 553,226 L 552,188 L 558,174
  L 560,160 L 562,158 L 565,153 L 564,133 L 557,122 L 558,96
  L 568,81 L 603,73 L 650,36 Z`;

const CITIES = [
  { x: 175, y: 120, name: "Aleppo",      nameAr: "حلب" },
  { x: 341, y: 140, name: "Raqqa",       nameAr: "الرقة" },
  { x: 498, y: 96,  name: "Al-Hasakah",  nameAr: "الحسكة" },
  { x: 128, y: 142, name: "Idlib",       nameAr: "إدلب" },
  { x: 78,  y: 155, name: "Latakia",     nameAr: "اللاذقية" },
  { x: 82,  y: 200, name: "Tartus",      nameAr: "طرطوس" },
  { x: 139, y: 207, name: "Hama",        nameAr: "حماة" },
  { x: 134, y: 239, name: "Homs",        nameAr: "حمص" },
  { x: 444, y: 190, name: "Deir ez-Zor", nameAr: "دير الزور" },
  { x: 97,  y: 337, name: "Damascus",    nameAr: "دمشق" },
  { x: 142, y: 329, name: "Rif Dimashq", nameAr: "ريف دمشق" },
  { x: 55,  y: 368, name: "Quneitra",    nameAr: "القنيطرة" },
  { x: 90,  y: 380, name: "Daraa",       nameAr: "درعا" },
  { x: 135, y: 372, name: "As-Suwayda",  nameAr: "السويداء" },
];

function flightPath(a: typeof CITIES[0], b: typeof CITIES[0]) {
  const dx = b.x - a.x, dy = b.y - a.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const c = 0.28 + Math.random() * 0.18;
  const px = -dy / dist, py = dx / dist;
  const lift = py > 0 ? -1 : 1;
  const cx1 = a.x + dx * 0.25 + px * dist * c * lift;
  const cy1 = a.y + dy * 0.25 + py * dist * c * lift;
  const cx2 = a.x + dx * 0.75 + px * dist * c * lift;
  const cy2 = a.y + dy * 0.75 + py * dist * c * lift;
  return `M ${a.x},${a.y} C ${cx1},${cy1} ${cx2},${cy2} ${b.x},${b.y}`;
}

interface Flight { id: number; path: string; dur: number; len: number }

function FlightLine({ flight, accent }: { flight: Flight; accent: string }) {
  const style = {
    strokeDasharray: flight.len,
    strokeDashoffset: flight.len,
    animation: `syriaFlightDash ${flight.dur}ms cubic-bezier(0.4,0,0.2,1) forwards`,
  } as React.CSSProperties;
  return (
    <g>
      <path d={flight.path} fill="none" stroke={accent} strokeWidth="3.5" strokeOpacity="0.18" strokeLinecap="round" filter="url(#sGlow3)" style={style} />
      <path d={flight.path} fill="none" stroke={accent} strokeWidth="1.2" strokeOpacity="0.85" strokeLinecap="round" filter="url(#sGlow1)" style={style} />
    </g>
  );
}

export function SyriaGlowMap({ accent = "#4A90E2", lang = "ar" }: { accent?: string; lang?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(-1);
  const [flights, setFlights] = useState<Flight[]>([]);
  const idRef = useRef(0);

  const onMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -py * 11, y: px * 16 });
  }, []);

  const onLeave = useCallback(() => { setTilt({ x: 0, y: 0 }); setHovered(-1); }, []);

  useEffect(() => {
    const spawn = () => {
      const ai = Math.floor(Math.random() * CITIES.length);
      let bi = Math.floor(Math.random() * CITIES.length);
      while (bi === ai) bi = Math.floor(Math.random() * CITIES.length);
      const [a, b] = Math.random() > 0.5 ? [CITIES[ai], CITIES[bi]] : [CITIES[bi], CITIES[ai]];
      const dur = 2800 + Math.random() * 1800;
      const id = idRef.current++;
      const path = flightPath(a, b);
      setFlights((prev) => [...prev.slice(-8), { id, path, dur, len: 400 }]);
      setTimeout(() => setFlights((prev) => prev.filter((f) => f.id !== id)), dur + 200);
    };
    for (let i = 0; i < 3; i++) setTimeout(spawn, i * 400);
    const iv = setInterval(spawn, 900);
    return () => clearInterval(iv);
  }, []);

  const tip = hovered >= 0 ? CITIES[hovered] : null;

  return (
    <div
      ref={containerRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ width: "100%", height: "100%", perspective: "900px", cursor: "default" }}
    >
      <div
        style={{
          width: "100%", height: "100%",
          transition: tilt.x === 0 && tilt.y === 0 ? "transform 0.55s ease-out" : "transform 0.06s linear",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${tilt.x || tilt.y ? 1.015 : 1},${tilt.x || tilt.y ? 1.015 : 1},1)`,
          transformStyle: "preserve-3d", position: "relative",
        }}
      >
        <svg viewBox="0 0 680 440" style={{ width: "100%", height: "100%", overflow: "visible", display: "block" }}>
          <defs>
            <filter id="sGlow1" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="sGlow2" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="sGlow3" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="sMapGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feColorMatrix in="b" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1.5 0" result="br" />
              <feMerge><feMergeNode in="br" /><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          <path d={SYRIA_OUTLINE} fill={`${accent}0F`} stroke="none" />
          {flights.map((f) => <FlightLine key={f.id} flight={f} accent={accent} />)}
          <path d={SYRIA_OUTLINE} fill="none" stroke={accent} strokeWidth="1.8" strokeOpacity="0.8" strokeLinejoin="round" filter="url(#sMapGlow)" />

          {CITIES.map((city, i) => {
            const isH = hovered === i;
            const od = (2.2 + i * 0.13).toFixed(2);
            const ob = (i * 0.28 % 2.5).toFixed(2);
            const md = (1.8 + i * 0.09).toFixed(2);
            const mb = (i * 0.18 % 1.8).toFixed(2);
            return (
              <g key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(-1)} style={{ cursor: "pointer" }}>
                <circle cx={city.x} cy={city.y} fill={isH ? `${accent}40` : `${accent}1F`} stroke={isH ? `${accent}80` : `${accent}4D`} strokeWidth="0.8">
                  <animate attributeName="r" values="14;20;14" dur={`${od}s`} begin={`${ob}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.15;0.35;0.15" dur={`${od}s`} begin={`${ob}s`} repeatCount="indefinite" />
                </circle>
                <circle cx={city.x} cy={city.y} fill={isH ? `${accent}BF` : `${accent}59`} stroke={isH ? accent : `${accent}B3`} strokeWidth="1">
                  <animate attributeName="r" values="7;9;7" dur={`${md}s`} begin={`${mb}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0.7;0.4" dur={`${md}s`} begin={`${mb}s`} repeatCount="indefinite" />
                </circle>
                <circle cx={city.x} cy={city.y} r="2.8" fill={isH ? "#ffffff" : accent} filter="url(#sGlow2)" />
                {isH && (
                  <circle cx={city.x} cy={city.y} fill="none" stroke={accent} strokeWidth="1.2" strokeOpacity="0.6" filter="url(#sGlow1)">
                    <animate attributeName="r" values="12;22;12" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="stroke-opacity" values="0.6;0.05;0.6" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle cx={city.x} cy={city.y} r="18" fill="transparent" />
              </g>
            );
          })}

          <text x="340" y="22" textAnchor="middle" fill={accent} opacity="0.7" fontSize="11" fontFamily="Cairo, sans-serif" fontWeight="500" letterSpacing="3">
            S  Y  R  I  A   |   سوريا
          </text>
        </svg>

        {tip && (
          <div style={{
            position: "absolute",
            left: `${(tip.x / 680) * 100}%`,
            top: `${(tip.y / 440) * 100 - 4}%`,
            transform: "translate(-50%, -100%)",
            background: "rgba(2,14,40,0.97)",
            border: `1px solid ${accent}88`,
            borderRadius: 10, padding: "8px 14px", color: accent,
            whiteSpace: "nowrap", pointerEvents: "none",
            boxShadow: `0 0 20px ${accent}33, 0 4px 16px rgba(0,0,0,0.4)`,
            animation: "syriaTooltipIn 0.18s ease-out", zIndex: 10,
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, direction: "rtl", textAlign: "right", fontFamily: "Cairo, sans-serif" }}>
              {tip.nameAr}
            </div>
            <div style={{ fontSize: 11, color: `${accent}99`, marginTop: 2, fontFamily: "Cairo, sans-serif" }}>
              {tip.name}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
