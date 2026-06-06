"use client";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: string;
  color?: string;
  sub?: string;
  loading?: boolean;
}

export default function StatsCard({
  title,
  value,
  icon = "📈",
  color = "#22c55e",
  sub,
  loading = false,
}: StatsCardProps) {
  return (
    <div
      style={{
        background: "rgba(17,24,39,0.7)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 16,
        padding: "24px",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s",
      }}
    >
      {/* Glow accent */}
      <div
        style={{
          position: "absolute",
          top: -40,
          right: -40,
          width: 120,
          height: 120,
          background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <p
          style={{
            fontSize: "0.78rem",
            fontWeight: 600,
            color: "rgba(255,255,255,0.4)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {title}
        </p>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: `${color}15`,
            border: `1px solid ${color}25`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1rem",
          }}
        >
          {icon}
        </div>
      </div>

      {loading ? (
        <div
          style={{
            height: 36,
            width: 80,
            borderRadius: 8,
            background: "rgba(255,255,255,0.07)",
            animation: "pulse 1.5s ease infinite",
          }}
        />
      ) : (
        <p
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "2.2rem",
            fontWeight: 800,
            color,
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          {value}
        </p>
      )}

      {sub && (
        <p style={{ marginTop: 8, fontSize: "0.78rem", color: "rgba(255,255,255,0.3)" }}>
          {sub}
        </p>
      )}
    </div>
  );
}