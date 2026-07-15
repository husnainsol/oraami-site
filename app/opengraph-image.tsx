import { ImageResponse } from "next/og";

export const alt = "Oraami — AI-powered lead intelligence";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#08090B",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 480,
            height: 6,
            borderRadius: 9999,
            background:
              "linear-gradient(90deg, transparent, #FF5A1F, transparent)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 96,
            height: 96,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #FF5702, #FF8918)",
            marginBottom: 32,
          }}
        >
          <span style={{ fontSize: 56, fontWeight: 700, color: "#08090B" }}>
            O
          </span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            color: "#F3F3F1",
            letterSpacing: "-0.02em",
          }}
        >
          Oraami
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 32,
            color: "#A0A3AD",
          }}
        >
          Identify customers most likely to convert
        </div>
      </div>
    ),
    { ...size }
  );
}
