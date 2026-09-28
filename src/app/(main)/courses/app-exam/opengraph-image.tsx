import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "APP Exam Coaching Tamil Nadu";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#042C53",
          backgroundImage:
            "linear-gradient(135deg, #042C53 0%, #185FA5 100%)",
          padding: "60px 80px",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            background: "rgba(29,158,117,0.25)",
            color: "#9FE1CB",
            padding: "8px 20px",
            borderRadius: "100px",
            fontSize: "15px",
            fontWeight: 600,
            alignSelf: "flex-start",
          }}
        >
          TNPSC APP Grade II Exam Coaching
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "54px",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.15,
              marginBottom: "16px",
            }}
          >
            APP Exam Coaching Tamil Nadu
          </div>
          <div
            style={{
              fontSize: "22px",
              color: "rgba(255,255,255,0.70)",
              lineHeight: 1.4,
            }}
          >
            Assistant Public Prosecutor Exam Preparation · Criminal Law Mastery
            · BNS, BNSS &amp; BSA Complete Coverage
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "20px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span style={{ color: "#1D9E75" }}>⚖</span>
            XYZ Law Coaching · Tamil Nadu
          </div>
          <div
            style={{
              background: "#1D9E75",
              color: "white",
              padding: "10px 24px",
              borderRadius: "100px",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            Book Free Demo
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
