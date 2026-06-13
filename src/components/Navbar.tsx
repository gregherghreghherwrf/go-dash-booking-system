"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/booking", label: "Book Now" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? "12px 0" : "20px 0",
        background: scrolled
          ? "rgba(3, 7, 18, 0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div
  style={{
    width: "100%",
    padding: "0 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  }}
>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                fontWeight: 900,
                color: "#000",
                boxShadow: "0 0 20px rgba(34,197,94,0.4)",
              }}
            >
              G
            </div>
            <span
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 700,
                fontSize: "1.25rem",
                color: "#f9fafb",
                letterSpacing: "-0.02em",
              }}
            >
              Go{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #22c55e, #86efac)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Dash
              </span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                fontWeight: 500,
                fontSize: "0.9rem",
                textDecoration: "none",
                color:
                  pathname === link.href
                    ? "#22c55e"
                    : "rgba(255,255,255,0.7)",
                background:
                  pathname === link.href
                    ? "rgba(34,197,94,0.1)"
                    : "transparent",
                transition: "all 0.2s",
              }}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/admin/dashboard"
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              fontWeight: 500,
              fontSize: "0.85rem",
              textDecoration: "none",
              color: "rgba(255,255,255,0.4)",
              transition: "all 0.2s",
              marginLeft: 4,
            }}
          >
            Admin
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
  onClick={() => setMenuOpen(!menuOpen)}
  style={{
    position: "fixed",
    top: "20px",
    right: "20px",
    width: "44px",
    height: "44px",
    background: "rgba(34,197,94,0.12)",
    color: "#22c55e",
    borderRadius: "12px",
    zIndex: 999999,
    border: "1px solid rgba(34,197,94,0.25)",
    fontSize: "24px",
  }}
>
  {menuOpen ? "✕" : "☰"}
</button>
        </div>

        {/* Mobile Menu */}
        {/* Mobile Menu */}
        {menuOpen && (
        <>
    <div
      onClick={() => setMenuOpen(false)}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        zIndex: 9997,
      }}
    />

    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "280px",
        height: "100vh",
        background: "#030712",
        borderLeft: "1px solid rgba(255,255,255,0.08)",
        padding: "80px 24px 24px",
        zIndex: 9998,
      }}
    >
          {[...navLinks, { href: "/admin/dashboard", label: "Admin" }].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "12px 0",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                color: "rgba(255,255,255,0.8)",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
        </>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}