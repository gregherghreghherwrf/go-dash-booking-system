export default function Pricing() {
  const plans = [
    {
      sport: "Pickleball",
      emoji: "🏓",
      color: "#22c55e",
      glow: "rgba(34,197,94,0.15)",
      tiers: [
        { label: "Weekday", price: "₹600", note: "Mon – Fri" },
        { label: "Weekend", price: "₹600", note: "Sat – Sun" },
      ],
      advance: "₹180",
      features: ["Court + equipment", "Locker access", "Free warm-up time"],
    },
    {
      sport: "Box Cricket",
      emoji: "🏏",
      color: "#f59e0b",
      glow: "rgba(245,158,11,0.12)",
      tiers: [
        { label: "Weekday", price: "₹1,300", note: "Mon – Fri" },
        { label: "Weekend", price: "₹1,500", note: "Sat – Sun" },
      ],
      advance: "₹400",
      features: ["Full turf access", "Practice nets", "Scoreboard included"],
    },
  ];

  return (
    <section
      id="pricing"
      style={{
        padding: "100px 0",
        background:
          "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(34,197,94,0.04) 0%, transparent 60%), var(--bg-base)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div className="section-tag">💰 Simple Pricing</div>
          <h2 className="section-title" style={{ marginBottom: 16 }}>
            Transparent{" "}
            <span className="gradient-text">No-Surprise</span> Rates
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "1rem", maxWidth: 440, margin: "0 auto" }}>
            Only pay a small advance online. Remaining balance at the venue.
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
            gap: 28,
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          {plans.map((plan) => (
            <div
              key={plan.sport}
              className="glass-card"
              style={{ padding: "40px", position: "relative", overflow: "hidden" }}
            >
              {/* Glow */}
              <div
                style={{
                  position: "absolute",
                  top: -60,
                  right: -60,
                  width: 250,
                  height: 250,
                  background: `radial-gradient(circle, ${plan.glow} 0%, transparent 70%)`,
                  pointerEvents: "none",
                }}
              />

              {/* Sport Label */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
                <span style={{ fontSize: 28 }}>{plan.emoji}</span>
                <h3
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: plan.color,
                  }}
                >
                  {plan.sport}
                </h3>
              </div>

              {/* Price Tiers */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
                {plan.tiers.map((tier) => (
                  <div
                    key={tier.label}
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: 12,
                      padding: "16px",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
                      {tier.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "Space Grotesk, sans-serif",
                        fontSize: "1.6rem",
                        fontWeight: 800,
                        color: plan.color,
                        lineHeight: 1,
                        marginBottom: 4,
                      }}
                    >
                      {tier.price}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>{tier.note}</div>
                  </div>
                ))}
              </div>

              {/* Advance */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: `rgba(${plan.color === "#22c55e" ? "34,197,94" : "245,158,11"},0.07)`,
                  border: `1px solid ${plan.color}25`,
                  borderRadius: 10,
                  padding: "12px 16px",
                  marginBottom: 24,
                }}
              >
                <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>
                  💳 Pay At Venue
                </span>
              </div>

              {/* Features */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {plan.features.map((f) => (
                  <div
                    key={f}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontSize: "0.88rem",
                      color: "rgba(255,255,255,0.6)",
                    }}
                  >
                    <span style={{ color: plan.color, fontWeight: 700 }}>✓</span>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p style={{ textAlign: "center", marginTop: 40, color: "rgba(255,255,255,0.25)", fontSize: "0.85rem" }}>
          * Payment is collected at the venue by Cash, UPI, PhonePe or Paytm after booking approval.
        </p>
      </div>
    </section>
  );
}