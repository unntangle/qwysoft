import { ImageResponse } from "next/og";

export const alt = "QWY Software: build the intelligent core of your business";
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
          justifyContent: "space-between",
          padding: 72,
          background:
            "radial-gradient(60% 70% at 10% 100%, #ffd0b0 0%, transparent 70%), radial-gradient(60% 70% at 95% 10%, #cfc3f7 0%, transparent 70%), #fbf9f5",
          color: "#17131f",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, fontWeight: 600, letterSpacing: -1 }}>qwy</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, lineHeight: 1.02, letterSpacing: -2, maxWidth: 900 }}>
            Build the intelligent core of your business.
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 28, color: "#464153" }}>
            Odoo ERP, custom software and applied AI
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 3, width: 140 }}>
          <div style={{ height: 3, background: "#c39443" }} />
          <div style={{ height: 1, background: "#c39443", opacity: 0.6 }} />
        </div>
      </div>
    ),
    size,
  );
}
