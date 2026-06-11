"use client";

import Sidebar from "../../../components/admin/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL!;

const ALL_SLOTS = [
  "4:00 PM - 4:30 PM",
  "4:30 PM - 5:00 PM",
  "5:00 PM - 5:30 PM",
  "5:30 PM - 6:00 PM",
  "6:00 PM - 6:30 PM",
  "6:30 PM - 7:00 PM",
  "7:00 PM - 7:30 PM",
  "7:30 PM - 8:00 PM",
  "8:00 PM - 8:30 PM",
  "8:30 PM - 9:00 PM",
  "9:00 PM - 9:30 PM",
  "9:30 PM - 10:00 PM",
  "10:00 PM - 10:30 PM",
  "10:30 PM - 11:00 PM",
  "11:00 PM - 11:30 PM",
  "11:30 PM - 12:00 AM",
  "12:00 AM - 12:30 AM",
  "12:30 AM - 1:00 AM",
];


export default function SlotsPage() {
  const [slots, setSlots] = useState([]);
  useEffect(() => {
    axios
      .get(`${API}/api/bookings/slot-stats`, {
        params: {
          facility: "Pickleball",
          date: new Date().toISOString().split("T")[0],
        },
      })
      .then((res) => setSlots(res.data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-base)" }}>
      <Sidebar />
      <main style={{ marginLeft: 260, padding: "40px 36px", width: "100%" }}>
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
            Slot Management
          </h1>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.88rem" }}>
            All available time slots across both facilities
          </p>
        </div>

        <div
          style={{
            background: "rgba(17,24,39,0.6)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Time Slot</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {slots.map((slotData: any, i) => (
                <tr key={slotData.slot}>
                  <td style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.82rem" }}>{i + 1}</td>
                  <td style={{ fontWeight: 600, color: "#f9fafb", fontSize: "0.9rem" }}>{slotData.slot}</td>
                  <td>
                    <span className="badge badge-approved">Active</span>
                  </td>
                  <td>
  <div style={{ color: "#f9fafb" }}>
    Booked: {slotData.booked}/{slotData.capacity}
  </div>

  <div
    style={{
      color:
        slotData.available > 0
          ? "#22c55e"
          : "#ef4444",
      fontSize: "0.82rem",
    }}
  >
    Available: {slotData.available}
  </div>
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}