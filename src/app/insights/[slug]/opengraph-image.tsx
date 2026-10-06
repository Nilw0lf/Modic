import { ImageResponse } from "next/og";
import { getInsight } from "@/content/insights";

export const alt =
  "Modic Insights — a practical guide with interactive experiments";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = getInsight((await params).slug);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "60px 70px",
        background: "#f4f3ee",
        color: "#292d32",
        borderTop: "12px solid #41678a",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 40, fontWeight: 700 }}>modic.</span>
        <span style={{ fontSize: 22, color: "#41678a" }}>
          INSIGHTS / {post?.topic ?? "A reading room"}
        </span>
      </div>
      <div
        style={{
          fontSize: 62,
          fontWeight: 700,
          lineHeight: 1.12,
          letterSpacing: "-2px",
          maxWidth: 1000,
        }}
      >
        {post?.title ?? "Make sense of what’s changing."}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #cccfc8",
          paddingTop: 26,
          fontSize: 23,
          color: "#5f6865",
        }}
      >
        <span>Read it. Test it. Make it yours.</span>
        <span>modic.app</span>
      </div>
    </div>,
    size,
  );
}
