const steps = [
  {
    step: "01",
    icon: "🏟️",
    title: "Pick Your Sport",
    desc: "Choose between Pickleball courts or Box Cricket turf — whichever game you're in the mood for.",
  },
  {
    step: "02",
    icon: "📅",
    title: "Check Live Slots",
    desc: "See real-time slot availability for your chosen date. Green = open, Red = booked.",
  },
  {
    step: "03",
    icon: "💳",
    title: "Pay Advance Online",
    desc: "Secure your slot instantly by paying a small advance via Razorpay. Safe & encrypted.",
  },
  {
    step: "04",
    icon: "✅",
    title: "Get Confirmed",
    desc: "Admin reviews and approves your booking. You get an email confirmation. Just show up and play!",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      style={{
        padding: "100px 0",
        background: "rgba(6,9,18,0.7)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div className="section-tag">⚡ Simple Process</div>
          <h2 className="section-title" style={{ marginBottom: 16 }}>
            Book in{" "}
            <span className="gradient-text">4 Easy Steps</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "1rem", maxWidth: 420, margin: "0 auto" }}>
            From picking your sport to stepping on the court — takes less than 2 minutes.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 24,
            position: "relative",
          }}
        >
          {steps.map((s, idx) => (
            <div
              key={s.step}
              style={{
                position: "relative",
                padding: "36px 28px",
                background: "rgba(17,24,39,0.6)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 20,
                transition: "all 0.3s",
              }}
            >
              {/* Step number */}
              <div
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "3.5rem",
                  fontWeight: 900,
                  color: "rgba(34,197,94,0.08)",
                  lineHeight: 1,
                  position: "absolute",
                  top: 20,
                  right: 24,
                  letterSpacing: "-0.04em",
                  userSelect: "none",
                }}
              >
                {s.step}
              </div>

              {/* Icon */}
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: "rgba(34,197,94,0.1)",
                  border: "1px solid rgba(34,197,94,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  marginBottom: 20,
                }}
              >
                {s.icon}
              </div>

              <h3
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: "#f9fafb",
                  marginBottom: 10,
                }}
              >
                {s.title}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.88rem", lineHeight: 1.65 }}>
                {s.desc}
              </p>

              {/* Connector line (not last) */}
              {idx < steps.length - 1 && (
                <div
                  style={{
                    display: "none", // hidden on mobile
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
