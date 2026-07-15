import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#08090B",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 130,
            height: 130,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #FF5702, #FF8918)",
          }}
        >
          <span
            style={{
              fontSize: 92,
              fontWeight: 700,
              color: "#08090B",
            }}
          >
            O
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
