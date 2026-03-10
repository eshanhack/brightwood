import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Brightwood Energy — Dedicated Power for AI Data Centres";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#FAF9F6",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#5C6F2D",
              letterSpacing: "-0.02em",
              fontFamily: "Georgia, serif",
            }}
          >
            Brightwood Energy
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#2B2723",
              fontFamily: "system-ui, sans-serif",
              maxWidth: 800,
              lineHeight: 1.4,
            }}
          >
            Dedicated Power for AI Data Centres
          </div>
          <div
            style={{
              fontSize: 20,
              color: "#6B6560",
              fontFamily: "system-ui, sans-serif",
              maxWidth: 700,
              lineHeight: 1.6,
            }}
          >
            Solar + battery + gas power stations purpose-built for data centres
            in regional Australia
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 80,
            right: 80,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 18,
              color: "#857F78",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            brightwoodenergy.com.au
          </div>
          <div
            style={{
              width: 48,
              height: 48,
              backgroundColor: "#5C6F2D",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FAF9F6",
              fontSize: 28,
              fontWeight: 700,
              fontFamily: "Georgia, serif",
            }}
          >
            B
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
