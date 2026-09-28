import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "XYZ Law Coaching — Civil Judge & APP Exam Coaching Tamil Nadu";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#042C53",
          backgroundImage:
            "radial-gradient(ellipse at 60% 40%, #185FA5 0%, #0C447C 35%, #042C53 70%)",
          padding: "60px 80px",
          position: "relative",
        }}
      >
        {/* Logo / Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              fontSize: "48px",
              color: "#1D9E75",
            }}
          >
            ⚖
          </div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "white",
              letterSpacing: "-0.5px",
            }}
          >
            XYZ Law Coaching
          </div>
        </div>

        {/* Main heading */}
        <div
          style={{
            fontSize: "52px",
            fontWeight: 800,
            color: "white",
            textAlign: "center",
            lineHeight: 1.15,
            maxWidth: "900px",
            marginBottom: "24px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Civil Judge &amp; APP Exam Coaching in Tamil Nadu
        </div>

        {/* Sub-text */}
        <div
          style={{
            fontSize: "22px",
            color: "rgba(255,255,255,0.75)",
            textAlign: "center",
            maxWidth: "700px",
            marginBottom: "36px",
            lineHeight: 1.4,
            display: "flex",
            justifyContent: "center",
          }}
        >
          Expert coaching · 25+ judges selected · Online &amp; offline
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: "40px",
            alignItems: "center",
          }}
        >
          {[
            ["1000+", "Students"],
            ["25+", "Judges Selected"],
            ["Online", "+ Offline"],
          ].map(([num, label]) => (
            <div
              key={num}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: 800,
                  color: "#1D9E75",
                }}
              >
                {num}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.60)",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            fontSize: "16px",
            color: "rgba(255,255,255,0.40)",
          }}
        >
          {siteUrl}
        </div>
      </div>
    ),
    { ...size }
  );
}
