import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(3,7,18,0.98)",
        padding: "60px 0 32px",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 48,
            marginBottom: 48,
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "linear-gradient(135deg, #22c55e, #16a34a)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  color: "#000",
                  fontSize: 16,
                }}
              >
                G
              </div>
              <span
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: "#f9fafb",
                }}
              >
                Go Dash
              </span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.87rem", lineHeight: 1.7, maxWidth: 240 }}>
              Ahmedabad&apos;s premier Pickleball &amp; Box Cricket destination. Book online. Play today.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ color: "#f9fafb", fontWeight: 600, fontSize: "0.9rem", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Quick Links
            </h4>
            {[
              { label: "Home", href: "/" },
              { label: "Book a Slot", href: "/booking" },
              { label: "Facilities", href: "/#facilities" },
              { label: "Pricing", href: "/#pricing" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  display: "block",
                  color: "rgba(255,255,255,0.4)",
                  textDecoration: "none",
                  fontSize: "0.88rem",
                  marginBottom: 10,
                  transition: "color 0.2s",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: "#f9fafb", fontWeight: 600, fontSize: "0.9rem", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Contact
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { icon: "📍", text: "Ahmedabad, Gujarat, India" },
                { icon: "📞", text: "+91 98765 43210" },
                { icon: "✉️", text: "hello@godash.in" },
                { icon: "🕐", text: "6 AM – 10 PM Daily" },
              ].map((c) => (
                <div
                  key={c.text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: "rgba(255,255,255,0.4)",
                    fontSize: "0.87rem",
                  }}
                >
                  <span>{c.icon}</span>
                  {c.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.82rem" }}>
            © 2025 Go Dash Sports. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span className="live-dot" />
            <span style={{ color: "rgba(34,197,94,0.7)", fontSize: "0.8rem", fontWeight: 500 }}>
              Booking System Live
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
