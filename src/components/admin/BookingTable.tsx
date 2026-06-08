"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL!;

interface Booking {
  _id: string;
  user?: { name: string; email: string; phone?: string };
  facility: string;
  date: string;
  slot: string;
  amount: number;
  advancePaid: number;
  paymentStatus: string;
  bookingStatus: "pending" | "approved" | "rejected";
  createdAt: string;
}

interface BookingTableProps {
  filter?: string;
}

export default function BookingTable({ filter = "all" }: BookingTableProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchBookings = useCallback(async () => {
    try {
      const params: Record<string, string> = {};
      if (filter !== "all") params.status = filter;
      const { data } = await axios.get(`${API}/api/admin/bookings`, { params });
      setBookings(data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchBookings();
    // Auto-refresh every 15 seconds for real-time feel
    const interval = setInterval(fetchBookings, 15000);
    return () => clearInterval(interval);
  }, [fetchBookings]);

  const handleApprove = async (id: string) => {
    setActionId(id);
    try {
      const { data } = await axios.put(`${API}/api/admin/approve/${id}`);
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, bookingStatus: data.bookingStatus } : b))
      );
    } catch (err) {
      console.error("Approve failed", err);
    } finally {
      setActionId(null);
    }
  };

  const handleReject = async (id: string) => {
    setActionId(id);
    try {
      const { data } = await axios.put(`${API}/api/admin/reject/${id}`);
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, bookingStatus: data.bookingStatus } : b))
      );
    } catch (err) {
      console.error("Reject failed", err);
    } finally {
      setActionId(null);
    }
  };

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      pending: "badge-pending",
      approved: "badge-approved",
      rejected: "badge-rejected",
    };
    const icons: Record<string, string> = {
      pending: "⏳",
      approved: "✅",
      rejected: "❌",
    };
    return (
      <span className={`badge ${map[status] || "badge-pending"}`}>
        {icons[status]} {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const paymentBadge = (status: string) => {
    if (status === "paid") return <span className="badge badge-paid">💳 Paid</span>;
    return (
      <span className="badge" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.1)" }}>
        Pending
      </span>
    );
  };

  if (loading) {
    return (
      <div style={{ padding: "40px 0", textAlign: "center" }}>
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            style={{
              height: 52,
              borderRadius: 10,
              background: "rgba(255,255,255,0.04)",
              marginBottom: 12,
              animation: "pulse 1.5s ease infinite",
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "60px 0",
          color: "rgba(255,255,255,0.25)",
        }}
      >
        <div style={{ fontSize: "3rem", marginBottom: 16 }}>📋</div>
        <p style={{ fontSize: "1rem", fontWeight: 500 }}>No bookings found</p>
        <p style={{ fontSize: "0.85rem", marginTop: 6 }}>
          {filter === "pending" ? "All pending requests have been handled!" : "No bookings yet."}
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Last updated bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
          padding: "8px 0",
        }}
      >
        <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.25)" }}>
          {bookings.length} booking{bookings.length !== 1 ? "s" : ""}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.78rem", color: "rgba(34,197,94,0.6)" }}>
          <span className="live-dot" style={{ width: 6, height: 6 }} />
          {lastUpdated
            ? `Updated ${lastUpdated.toLocaleTimeString()}`
            : "Live"}
        </div>
      </div>

      {/* Table wrapper */}
      <div
        style={{
          background: "rgba(17,24,39,0.5)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Facility</th>
                <th>Date</th>
                <th>Slot</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "#f9fafb" }}>
                        {b.user?.name ?? "Unknown"}
                      </div>
                      <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", marginTop: 2 }}>
                        {b.user?.email ?? "—"}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: "0.88rem",
                        color: b.facility === "Pickleball" ? "#4ade80" : "#fbbf24",
                        fontWeight: 600,
                      }}
                    >
                      {b.facility === "Pickleball" ? "🏓" : "🏏"} {b.facility}
                    </span>
                  </td>
                  <td style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.88rem", whiteSpace: "nowrap" }}>
                    {b.date}
                  </td>
                  <td style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.82rem", whiteSpace: "nowrap" }}>
                    {b.slot}
                  </td>
                  <td>
                    <div>
                      {paymentBadge(b.paymentStatus)}
                      {b.advancePaid > 0 && (
                        <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", marginTop: 4 }}>
                          ₹{b.advancePaid} paid
                        </div>
                      )}
                    </div>
                  </td>
                  <td>{statusBadge(b.bookingStatus)}</td>
                  <td>
                    {b.bookingStatus === "pending" ? (
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <button
                          id={`approve-${b._id}`}
                          className="btn-ghost"
                          onClick={() => handleApprove(b._id)}
                          disabled={actionId === b._id}
                          style={{ opacity: actionId === b._id ? 0.6 : 1 }}
                        >
                          {actionId === b._id ? "..." : "✓ Approve"}
                        </button>
                        <button
                          id={`reject-${b._id}`}
                          className="btn-danger"
                          onClick={() => handleReject(b._id)}
                          disabled={actionId === b._id}
                          style={{ opacity: actionId === b._id ? 0.6 : 1 }}
                        >
                          {actionId === b._id ? "..." : "✕ Reject"}
                        </button>
                      </div>
                    ) : (
                      <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.82rem" }}>
                        {b.bookingStatus === "approved" ? "Confirmed ✓" : "Declined"}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}