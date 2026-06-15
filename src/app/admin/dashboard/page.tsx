"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Sidebar from "../../../components/admin/Sidebar";
import StatsCard from "../../../components/admin/StatsCard";
import BookingTable from "../../../components/admin/BookingTable";
import {
  useRouter,
} from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL!;

interface Stats {
  totalBookings: number;
  todayBookings: number;
  pending: number;
  approved: number;
  totalRevenue: number;
  todayRevenue: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [now, setNow] = useState<Date | null>(null);
  const [sidebarOpen, setSidebarOpen] =
  useState(false);
  const router = useRouter();

useEffect(() => {
  if (typeof window === "undefined") return;

  const token = localStorage.getItem("adminToken");

  if (!token) {
    router.replace("/admin/login");
  }
}, [router]);

  // Clock ticker
  useEffect(() => {
  setNow(new Date());

  const t = setInterval(() => {
    setNow(new Date());
  }, 1000);

  return () => clearInterval(t);
}, []);

  const fetchStats = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API}/api/bookings/stats`);
      setStats(data);
    } catch (err) {
      console.error("Stats fetch error", err);
    } finally {
      setLoadingStats(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 20000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-base)" }}>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main
  className="admin-main"
  style={{
    padding: "40px 36px",
    width: "100%",
    minHeight: "100vh",
  }}
>  
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 36,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <button
  className="mobile-menu-btn"
  onClick={() => setSidebarOpen(true)}
>
  ☰
</button>
            <h1
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "1.9rem",
                fontWeight: 700,
                color: "#f9fafb",
                marginBottom: 4,
              }}
            >
              Dashboard
            </h1>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.88rem" }}>
              Real-time overview of bookings and revenue
            </p>
          </div>

          {/* Live Clock */}
          <div
            style={{
              background: "rgba(17,24,39,0.7)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 12,
              padding: "12px 20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "#22c55e",
                lineHeight: 1,
              }}
            >
              {now
  ? now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  : "--:--:--"}
            </div>
            <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", marginTop: 4 }}>
              {now
  ? now.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  : ""}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div
          className="stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
            gap: 20,
            marginBottom: 40,
          }}
        >
          <StatsCard
            title="Today's Revenue"
            value={stats ? `₹${stats.todayRevenue.toLocaleString()}` : "—"}
            icon="💰"
            color="#22c55e"
            sub="Advance payments collected"
            loading={loadingStats}
          />
          <StatsCard
            title="Today's Bookings"
            value={stats?.todayBookings ?? "—"}
            icon="📅"
            color="#818cf8"
            sub="Slots booked today"
            loading={loadingStats}
          />
          <StatsCard
            title="Pending Approval"
            value={stats?.pending ?? "—"}
            icon="⏳"
            color="#fbbf24"
            sub="Awaiting your review"
            loading={loadingStats}
          />
          <StatsCard
            title="Total Bookings"
            value={stats?.totalBookings ?? "—"}
            icon="🏟️"
            color="#34d399"
            sub="All-time bookings"
            loading={loadingStats}
          />
          <StatsCard
            title="Total Revenue"
            value={stats ? `₹${stats.totalRevenue.toLocaleString()}` : "—"}
            icon="📊"
            color="#60a5fa"
            sub="All-time advance collected"
            loading={loadingStats}
          />
          <StatsCard
            title="Confirmed"
            value={stats?.approved ?? "—"}
            icon="✅"
            color="#4ade80"
            sub="Approved bookings"
            loading={loadingStats}
          />
        </div>

        {/* Recent Pending Bookings */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "#f9fafb",
                  marginBottom: 2,
                }}
              >
                Pending Approvals
              </h2>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.82rem" }}>
                Auto-refreshes every 15 seconds
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="live-dot" />
              <span style={{ fontSize: "0.8rem", color: "rgba(34,197,94,0.7)", fontWeight: 500 }}>
                Live
              </span>
            </div>
          </div>

          <BookingTable filter="pending" />
        </div>
      </main>
    </div>
  );
}