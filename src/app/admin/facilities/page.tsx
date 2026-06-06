"use client";

import Sidebar from "../../../components/admin/Sidebar";

const facilities = [
  {
    name: "Pickleball Court 1–6",
    type: "Pickleball",
    emoji: "🏓",
    courts: 6,
    status: "Active",
    color: "#22c55e",
  },
  {
    name: "Box Cricket Turf 1–2",
    type: "Box Cricket",
    emoji: "🏏",
    courts: 2,
    status: "Active",
    color: "#f59e0b",
  },
];

export default function FacilitiesPage() {
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
            Facilities
          </h1>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.88rem" }}>
            Manage courts and turf availability
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {facilities.map((f) => (
            <div
              key={f.name}
              style={{
                background: "rgba(17,24,39,0.7)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16,
                padding: "28px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <span style={{ fontSize: "2rem" }}>{f.emoji}</span>
                <div>
                  <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, color: f.color, fontSize: "1.1rem" }}>
                    {f.name}
                  </h3>
                  <span className="badge badge-approved" style={{ marginTop: 4 }}>
                    ● {f.status}
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>Total Units</span>
                <span style={{ color: "#f9fafb", fontWeight: 700 }}>{f.courts}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}