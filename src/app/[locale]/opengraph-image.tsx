import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

export const runtime = "edge";
export const alt = "Solven Syntrix";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SYRIA_PATH =
  "M 649,25 L 643,21 L 636,20 L 614,31 L 590,34 L 576,40 L 502,40 L 480,45 L 457,56 L 434,60 L 425,66 L 393,69 L 375,73 L 328,67 L 311,55 L 293,52 L 234,63 L 214,72 L 202,68 L 183,68 L 178,60 L 147,56 L 144,53 L 138,69 L 130,78 L 134,86 L 144,92 L 148,100 L 142,104 L 118,102 L 114,107 L 116,118 L 109,126 L 103,126 L 98,136 L 88,128 L 73,126 L 70,132 L 66,132 L 68,139 L 56,152 L 60,160 L 66,160 L 73,166 L 74,184 L 88,185 L 73,186 L 69,189 L 65,205 L 74,228 L 98,230 L 100,229 L 108,226 L 112,230 L 118,230 L 120,233 L 109,241 L 115,241 L 127,250 L 125,257 L 135,260 L 128,261 L 129,267 L 120,274 L 119,278 L 112,278 L 100,286 L 100,289 L 109,293 L 108,296 L 79,296 L 65,307 L 75,313 L 75,316 L 65,319 L 66,322 L 36,339 L 38,346 L 33,352 L 30,368 L 31,384 L 40,381 L 54,382 L 65,390 L 70,400 L 82,400 L 101,414 L 113,414 L 140,420 L 293,352 L 297,351 L 391,310 L 393,308 L 497,262 L 536,253 L 539,242 L 553,226 L 552,188 L 558,174 L 560,160 L 562,158 L 565,153 L 564,133 L 557,122 L 558,96 L 568,81 L 603,73 L 650,36 Z";

export default async function OGImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";

  const title = isAr ? "سولفن سنتركس" : "Solven Syntrix";
  const sub = isAr
    ? "تقنية · برمجة · اتصالات"
    : "Technology · Development · Telecoms";
  const tagline = isAr
    ? "تركيب المنطق، صياغة المستقبل"
    : "Synthesizing Logic, Solving the Future";
  const domain = "solvensyntrix.com";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          background: "#04070d",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(74,144,226,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(74,144,226,0.07) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            display: "flex",
          }}
        />

        {/* Top-left corner bracket */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 40,
            width: 48,
            height: 48,
            borderTop: "2px solid rgba(74,144,226,0.5)",
            borderLeft: "2px solid rgba(74,144,226,0.5)",
            display: "flex",
          }}
        />

        {/* Top-right corner bracket */}
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 40,
            width: 48,
            height: 48,
            borderTop: "2px solid rgba(74,144,226,0.5)",
            borderRight: "2px solid rgba(74,144,226,0.5)",
            display: "flex",
          }}
        />

        {/* Bottom-left corner bracket */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 40,
            width: 48,
            height: 48,
            borderBottom: "2px solid rgba(74,144,226,0.5)",
            borderLeft: "2px solid rgba(74,144,226,0.5)",
            display: "flex",
          }}
        />

        {/* Bottom-right corner bracket */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 40,
            width: 48,
            height: 48,
            borderBottom: "2px solid rgba(74,144,226,0.5)",
            borderRight: "2px solid rgba(74,144,226,0.5)",
            display: "flex",
          }}
        />

        {/* Accent glow orb — top right */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(74,144,226,0.18) 0%, rgba(74,144,226,0.06) 50%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Accent glow orb — bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -60,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(28,34,48,0.9) 0%, rgba(74,144,226,0.05) 60%, transparent 80%)",
            display: "flex",
          }}
        />

        {/* Syria map — right side */}
        <div
          style={{
            position: "absolute",
            right: -20,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            opacity: 0.55,
          }}
        >
          <svg
            viewBox="0 0 680 440"
            width="580"
            height="375"
            style={{ display: "block" }}
          >
            {/* Glow fill */}
            <path d={SYRIA_PATH} fill="rgba(74,144,226,0.07)" />
            {/* Outer glow stroke */}
            <path
              d={SYRIA_PATH}
              fill="none"
              stroke="rgba(74,144,226,0.25)"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            {/* Main border */}
            <path
              d={SYRIA_PATH}
              fill="none"
              stroke="#4A90E2"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Left content */}
        <div
          style={{
            position: "absolute",
            left: 80,
            top: 0,
            bottom: 0,
            width: 640,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 0,
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 28,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#4A90E2",
                boxShadow: "0 0 10px #4A90E2",
                display: "flex",
              }}
            />
            <span
              style={{
                color: "#4A90E2",
                fontSize: 16,
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {sub}
            </span>
          </div>

          {/* Main title */}
          <div
            style={{
              fontSize: isAr ? 78 : 82,
              fontWeight: 800,
              color: "#f4f8ff",
              lineHeight: 1.05,
              letterSpacing: isAr ? "-0.01em" : "-0.04em",
              marginBottom: 20,
              display: "flex",
            }}
          >
            {title}
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 22,
              color: "#7e8ba2",
              fontWeight: 400,
              lineHeight: 1.4,
              marginBottom: 48,
              display: "flex",
            }}
          >
            {tagline}
          </div>

          {/* Divider */}
          <div
            style={{
              width: 64,
              height: 2,
              background:
                "linear-gradient(90deg, #4A90E2 0%, rgba(74,144,226,0.1) 100%)",
              marginBottom: 28,
              display: "flex",
            }}
          />

          {/* Domain */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              style={{
                color: "rgba(74,144,226,0.7)",
                fontSize: 15,
                letterSpacing: "0.06em",
                fontWeight: 500,
              }}
            >
              {domain}
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
