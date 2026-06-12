"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin/dashboard", icon: "📊", label: "Dashboard" },
  { href: "/admin/bookings", icon: "📋", label: "Bookings" },
  { href: "/admin/facilities", icon: "🏟️", label: "Facilities" },
  { href: "/admin/slots", icon: "🕐", label: "Slot Management" },
  
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({
  isOpen = true,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
  className={`admin-sidebar ${
    isOpen ? "sidebar-open" : ""
  }`}
>
  <button
  onClick={onClose}
  style={{
    position: "absolute",
    top: 16,
    right: 16,
    background: "transparent",
    border: "none",
    color: "#fff",
    fontSize: "24px",
    cursor: "pointer",
    display: "none",
  }}
  className="sidebar-close"
>
  ✕
</button>
      {/* Brand */}
      <div
        style={{
          padding: "28px 20px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                color: "#000",
                fontSize: 17,
                flexShrink: 0,
                boxShadow: "0 0 16px rgba(34,197,94,0.35)",
              }}
            >
              G
            </div>
            <div>
              <div
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: "#f9fafb",
                  lineHeight: 1,
                }}
              >
                Go Dash
              </div>
            </div>
          </div>
        </Link>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(34,197,94,0.08)",
            border: "1px solid rgba(34,197,94,0.2)",
            borderRadius: 100,
            padding: "3px 10px",
            marginTop: 8,
          }}
        >
          <span className="live-dot" style={{ width: 6, height: 6 }} />
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 600,
              color: "rgba(34,197,94,0.8)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Admin Panel
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ padding: "16px 12px" }}>
        <p
          style={{
            fontSize: "0.68rem",
            fontWeight: 700,
            color: "rgba(255,255,255,0.2)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            padding: "6px 10px",
            marginBottom: 4,
          }}
        >
          Menu
        </p>

        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-link ${isActive ? "active" : ""}`}
            >
              <span style={{ fontSize: "1rem" }}>{item.icon}</span>
              <span>{item.label}</span>
              {isActive && (
                <div
                  style={{
                    marginLeft: "auto",
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#22c55e",
                  }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: Back to site */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "16px 12px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 14px",
            borderRadius: 10,
            color: "rgba(255,255,255,0.3)",
            textDecoration: "none",
            fontSize: "0.85rem",
            transition: "all 0.2s",
          }}
        >
          <span>←</span> Back to Website
        </Link>
      </div>
    </aside>
  );
}