"use client";

import { useState } from "react";
import Sidebar from "../../../components/admin/Sidebar";
import BookingTable from "../../../components/admin/BookingTable";

const FILTERS = [
  { value: "all", label: "All Bookings", icon: "📋" },
  { value: "pending", label: "Pending", icon: "⏳" },
  { value: "approved", label: "Approved", icon: "✅" },
  { value: "rejected", label: "Rejected", icon: "❌" },
];

export default function BookingsPage() {
  const [filter, setFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] =
  useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-base)" }}>
      <Sidebar
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
              

      <main
  className="admin-main"
  style={{
    padding: "80px 16px 16px",
    width: "100%",
    minHeight: "100vh",
    position: "relative",
  }}
>
  <button
  className="mobile-menu-btn"
  onClick={() => setSidebarOpen(true)}
>
  ☰
</button>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "1.9rem",
              fontWeight: 700,
              color: "#f9fafb",
              marginBottom: 4,
            }}
          >
            Booking Requests
          </h1>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.88rem" }}>
            Review, approve, or reject slot bookings in real time
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 28,
            background: "rgba(17,24,39,0.5)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 12,
            padding: 6,
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            maxWidth: "100%",
            flexShrink: 0,
          }}
        >
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 16px",
                borderRadius: 8,
                border: "none",
                background:
                  filter === f.value
                    ? "rgba(34,197,94,0.15)"
                    : "transparent",
                color:
                  filter === f.value
                    ? "#4ade80"
                    : "rgba(255,255,255,0.4)",
                fontWeight: filter === f.value ? 600 : 500,
                fontSize: "0.85rem",
                cursor: "pointer",
                transition: "all 0.2s",
                outline: filter === f.value ? "1px solid rgba(34,197,94,0.3)" : "none",
              }}
            >
              <span>{f.icon}</span>
              {f.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <BookingTable filter={filter} />
      </main>
    </div>
  );
}