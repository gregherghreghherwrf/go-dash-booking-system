"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className="hero-gradient"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: 100,
        paddingBottom: 80,
      }}
    >
      {/* Background Orbs */}
      <div
        className="orb orb-green"
        style={{
          width: 700,
          height: 700,
          top: "-20%",
          left: "-10%",
          opacity: 0.6,
        }}
      />
      <div
        className="orb orb-teal"
        style={{
          width: 600,
          height: 600,
          bottom: "-20%",
          right: "-10%",
          opacity: 0.5,
        }}
      />

      {/* Grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse at 50% 50%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 50%, black 30%, transparent 80%)",
        }}
      />

      <div
        style={{
          textAlign: "center",
          maxWidth: 900,
          padding: "0 24px",
          position: "relative",
          zIndex: 2,
          opacity: mounted ? 1 : 0,
          transform: mounted ? "none" : "translateY(30px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        {/* Live Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(34,197,94,0.1)",
            border: "1px solid rgba(34,197,94,0.3)",
            borderRadius: 100,
            padding: "6px 16px",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "#22c55e",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: 32,
          }}
        >
          <span className="live-dot" />
          Now Open — Real-Time Booking Live
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "clamp(3rem, 7vw, 6rem)",
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            marginBottom: 28,
            color: "#f9fafb",
          }}
        >
          Play.{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #22c55e 0%, #86efac 50%, #34d399 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Compete.
          </span>
          <br />
          Win.
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
            color: "rgba(255,255,255,0.55)",
            maxWidth: 600,
            margin: "0 auto 48px",
            lineHeight: 1.7,
            fontWeight: 400,
          }}
        >
          Ahmedabad&apos;s premier Pickleball &amp; Box Cricket destination.
          Book your slot in seconds. Check real-time availability. Play today.
        </p>

        {/* CTA Buttons */}
        <div
          className="hero-cta"
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link href="/booking" className="btn-primary" style={{ fontSize: "1.05rem", padding: "16px 36px" }}>
            ⚡ Book Now — Instant
          </Link>
          <Link href="#facilities" className="btn-secondary" style={{ fontSize: "1.05rem", padding: "15px 35px" }}>
            Explore Facilities →
          </Link>
        </div>

        {/* Trust Indicators */}
        <div
          className="hero-stats"
          style={{
            display: "flex",
            gap: 32,
            justifyContent: "center",
            marginTop: 64,
            flexWrap: "wrap",
          }}
        >
          {[
            { value: "6+", label: "Pickleball Courts" },
            { value: "2", label: "Cricket Turfs" },
            { value: "500+", label: "Monthly Bookings" },
            { value: "4.9★", label: "Rated on Google" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "1.8rem",
                  fontWeight: 800,
                  color: "#22c55e",
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", marginTop: 4, fontWeight: 500 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          color: "rgba(255,255,255,0.25)",
          fontSize: "0.75rem",
          fontWeight: 500,
        }}
      >
        <span>scroll</span>
        <div
          style={{
            width: 1,
            height: 40,
            background: "linear-gradient(to bottom, rgba(34,197,94,0.5), transparent)",
            animation: "float 2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}