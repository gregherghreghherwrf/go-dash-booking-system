import Link from "next/link";

const facilities = [
  {
    id: "pickleball",
    emoji: "🏓",
    name: "Pickleball",
    tagline: "Championship-grade courts",
    color: "#22c55e",
    glowColor: "rgba(34,197,94,0.2)",
    description:
      "6 professional pickleball courts with premium flooring, flood lights, and tournament-ready infrastructure.",
    features: [
      "6 Professional Courts",
      "Flood Lights (24x7)",
      "Tournament Ready",
      "Certified Coaching",
      "Equipment Rental",
      "Changing Rooms",
    ],
    price: "₹600",
    priceLabel: "per session",
    href: "/booking?facility=Pickleball",
  },
  {
    id: "cricket",
    emoji: "🏏",
    name: "Box Cricket",
    tagline: "Premium artificial turf",
    color: "#f59e0b",
    glowColor: "rgba(245,158,11,0.15)",
    description:
      "2 premium box cricket turfs with professional artificial grass, practice nets, and match-day ambiance.",
    features: [
      "2 Premium Turfs",
      "Artificial Grass",
      "Practice Nets",
      "Match Ready Setup",
      "Scoreboard",
      "Spectator Area",
    ],
    price: "₹1300",
    priceLabel: "per session (weekday)",
    href: "/booking?facility=Box Cricket",
  },
];

export default function Facilities() {
  return (
    <section
      id="facilities"
      style={{
        padding: "100px 0",
        position: "relative",
        background:
          "linear-gradient(180deg, var(--bg-base) 0%, rgba(6,9,18,0.9) 100%)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div className="section-tag">
            <span>🏟️</span> World-Class Facilities
          </div>
          <h2 className="section-title" style={{ color: "#f9fafb", marginBottom: 16 }}>
            Two Sports,{" "}
            <span className="gradient-text">One Destination</span>
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: "1.1rem",
              maxWidth: 500,
              margin: "0 auto",
            }}
          >
            Premium infrastructure designed for both casual players and serious
            competitors.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
            gap: 28,
          }}
        >
          {facilities.map((f) => (
            <div
              key={f.id}
              className="glass-card"
              style={{
                padding: "40px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Glow accent */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 200,
                  height: 200,
                  background: `radial-gradient(circle, ${f.glowColor} 0%, transparent 70%)`,
                  borderRadius: "0 20px 0 0",
                }}
              />

              {/* Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 16,
                  marginBottom: 24,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    background: `rgba(${f.color === "#22c55e" ? "34,197,94" : "245,158,11"},0.12)`,
                    border: `1px solid ${f.color}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 26,
                    flexShrink: 0,
                  }}
                >
                  {f.emoji}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: "1.6rem",
                      fontWeight: 700,
                      color: f.color,
                      lineHeight: 1.2,
                      marginBottom: 4,
                    }}
                  >
                    {f.name}
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", fontWeight: 500 }}>
                    {f.tagline}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p
                style={{
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.7,
                  marginBottom: 28,
                  fontSize: "0.95rem",
                }}
              >
                {f.description}
              </p>

              {/* Features */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                  marginBottom: 32,
                }}
              >
                {f.features.map((feat) => (
                  <div
                    key={feat}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: "0.85rem",
                      color: "rgba(255,255,255,0.65)",
                      fontWeight: 500,
                    }}
                  >
                    <span style={{ color: f.color, fontSize: "0.7rem" }}>✦</span>
                    {feat}
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div
                style={{
                  height: 1,
                  background: "rgba(255,255,255,0.06)",
                  marginBottom: 28,
                }}
              />

              {/* Price + CTA */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 16,
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: "2rem",
                      fontWeight: 800,
                      color: f.color,
                    }}
                  >
                    {f.price}
                  </span>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: "rgba(255,255,255,0.35)",
                      marginLeft: 6,
                    }}
                  >
                    {f.priceLabel}
                  </span>
                </div>
                <Link
                  href={f.href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "12px 24px",
                    borderRadius: 10,
                    background:
                      f.color === "#22c55e"
                        ? "linear-gradient(135deg, #22c55e, #16a34a)"
                        : "linear-gradient(135deg, #f59e0b, #d97706)",
                    color: "#000",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    boxShadow: `0 4px 20px ${f.glowColor}`,
                    transition: "all 0.3s",
                  }}
                >
                  Book {f.name} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}