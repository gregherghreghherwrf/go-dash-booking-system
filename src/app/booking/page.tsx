"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Navbar from "../../components/Navbar";

const FACILITIES = ["Pickleball", "Box Cricket"];

const PRICES: Record<string, { weekday: number; weekend: number; advance: number }> = {
  Pickleball: { weekday: 600, weekend: 600, advance: 180 },
  "Box Cricket": { weekday: 1300, weekend: 1500, advance: 400 },
};

const API = process.env.NEXT_PUBLIC_API_URL!;

interface SlotInfo {
  slot: string;
  available: boolean;
}

function BookingContent() {
  const searchParams = useSearchParams();
  const prefillFacility = searchParams.get("facility") || "";

  const [facility, setFacility] = useState(prefillFacility);
  const [date, setDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [slots, setSlots] = useState<SlotInfo[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [paying, setPaying] = useState(false);
  const [bookingDone, setBookingDone] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  // Fetch available slots whenever facility or date changes
  const fetchSlots = useCallback(async () => {
    if (!facility || !date) return;
    setLoadingSlots(true);
    setSelectedSlot("");
    try {
      const { data } = await axios.get(`${API}/api/bookings/available-slots`, {
        params: { facility, date },
      });
      setSlots(data);
    } catch {
      setError("Failed to load slot availability. Please try again.");
    } finally {
      setLoadingSlots(false);
    }
  }, [facility, date]);

  useEffect(() => {
    fetchSlots();
    // Poll every 30 seconds for fresh availability
    const interval = setInterval(fetchSlots, 30000);
    return () => clearInterval(interval);
  }, [fetchSlots]);

  const isWeekend = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.getDay() === 0 || d.getDay() === 6;
  };

  const getPrice = () => {
    if (!facility || !date) return 0;
    const priceObj = PRICES[facility];
    return isWeekend(date) ? priceObj.weekend : priceObj.weekday;
  };

  const getAdvance = () => {
    if (!facility) return 0;
    return PRICES[facility].advance;
  };

  const handleBooking = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    setError("Please login first.");
    return;
  }

  try {
    await axios.post(
      `${API}/api/bookings`,
      {
        facility,
        date,
        slot: selectedSlot,
        amount: getPrice(),
        name,
        email,
        mobile,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setBookingDone(true);
  } catch (err: unknown) {
    const errorMessage =
      err && typeof err === "object" && "response" in err
        ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
        : "Booking failed";

    setError(errorMessage || "Booking failed");
  }
};

  const today = new Date().toISOString().split("T")[0];

  // ── Success Screen ──────────────────────────────────────────────
  if (bookingDone) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "var(--bg-base)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <div
          className="glass-card"
          style={{ maxWidth: 480, width: "100%", padding: "56px 48px", textAlign: "center" }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "rgba(34,197,94,0.15)",
              border: "2px solid rgba(34,197,94,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              margin: "0 auto 28px",
              animation: "pulse-glow 2s ease infinite",
            }}
          >
            ✅
          </div>
          <h2
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "1.8rem",
              fontWeight: 700,
              marginBottom: 12,
              color: "#f9fafb",
            }}
          >
            Booking Submitted!
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: 8, lineHeight: 1.7 }}>
            Your slot is <strong style={{ color: "#fbbf24" }}>pending admin approval</strong>. Your slot has been reserved successfully.
            Please pay by Cash, UPI, Paytm or PhonePe when you arrive at Go Dash.
          </p>
          <div
            style={{
              background: "rgba(34,197,94,0.07)",
              border: "1px solid rgba(34,197,94,0.2)",
              borderRadius: 12,
              padding: "20px",
              margin: "28px 0",
              textAlign: "left",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>Facility</span>
              <span style={{ color: "#f9fafb", fontWeight: 600, fontSize: "0.9rem" }}>{facility}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>Date</span>
              <span style={{ color: "#f9fafb", fontWeight: 600, fontSize: "0.9rem" }}>{date}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>Slot</span>
              <span style={{ color: "#f9fafb", fontWeight: 600, fontSize: "0.9rem" }}>{selectedSlot}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>Payment Status</span>
              <span style={{ color: "#22c55e", fontWeight: 700, fontSize: "0.95rem" }}>Pay At Venue</span>
            </div>
          </div>
          <a href="/" className="btn-primary" style={{ textDecoration: "none", width: "100%", justifyContent: "center" }}>
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  // ── Main Booking Form ───────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}>
      <Navbar />

      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
          padding: "120px 24px 60px",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div className="section-tag" style={{ marginBottom: 16 }}>
            <span className="live-dot" />
            Real-Time Availability
          </div>
          <h1
            className="section-title"
            style={{ marginBottom: 12 }}
          >
            Book Your <span className="gradient-text">Slot</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "1rem" }}>
            Select facility, date, and time — slots update every 30 seconds.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: 12,
              padding: "14px 18px",
              color: "#f87171",
              fontSize: "0.9rem",
              marginBottom: 24,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {/* Step 1: Facility + Date */}
        <div
          className="glass-card"
          style={{ padding: "36px", marginBottom: 24 }}
        >
          <h2
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "1.1rem",
              fontWeight: 700,
              marginBottom: 24,
              color: "#f9fafb",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "rgba(34,197,94,0.2)",
                border: "1px solid rgba(34,197,94,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.8rem",
                color: "#22c55e",
                fontWeight: 800,
              }}
            >
              1
            </span>
            Choose Facility &amp; Date
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {/* Facility Selector */}
            <div>
              <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
                Sport
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {FACILITIES.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFacility(f)}
                    style={{
                      padding: "14px 18px",
                      borderRadius: 12,
                      border: facility === f ? "1px solid rgba(34,197,94,0.5)" : "1px solid rgba(255,255,255,0.07)",
                      background: facility === f ? "rgba(34,197,94,0.1)" : "rgba(17,24,39,0.6)",
                      color: facility === f ? "#4ade80" : "rgba(255,255,255,0.6)",
                      fontWeight: facility === f ? 700 : 500,
                      fontSize: "0.95rem",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <span>{f === "Pickleball" ? "🏓" : "🏏"}</span> {f}
                    {facility === f && <span style={{ marginLeft: "auto", color: "#22c55e" }}>✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Picker */}
            <div>
              <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
                Date
              </label>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
                style={{ marginBottom: 12 }}
              />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                style={{ marginBottom: 12 }}
              />

              <input
                type="tel"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="input-field"
                style={{ marginBottom: 20 }}
              />
              
              <input
                type="date"
                className="input-field"
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{ marginBottom: 12 }}
              />

              {facility && date && (
                <div
                  style={{
                    background: "rgba(34,197,94,0.07)",
                    border: "1px solid rgba(34,197,94,0.2)",
                    borderRadius: 10,
                    padding: "12px 14px",
                    fontSize: "0.85rem",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ color: "rgba(255,255,255,0.45)" }}>Session Price</span>
                    <span style={{ color: "#4ade80", fontWeight: 700 }}>₹{getPrice()}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "rgba(255,255,255,0.45)" }}>Advance Online</span>
                    <span style={{ color: "#22c55e", fontWeight: 700 }}>₹{getAdvance()}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Step 2: Slot Selection */}
        <div className="glass-card" style={{ padding: "36px", marginBottom: 24 }}>
          <h2
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "1.1rem",
              fontWeight: 700,
              marginBottom: 8,
              color: "#f9fafb",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: step >= 2 ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.05)",
                border: step >= 2 ? "1px solid rgba(34,197,94,0.4)" : "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.8rem",
                color: step >= 2 ? "#22c55e" : "rgba(255,255,255,0.3)",
                fontWeight: 800,
              }}
            >
              2
            </span>
            Select Time Slot
            {facility && date && (
              <span
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: "0.75rem",
                  color: "rgba(34,197,94,0.7)",
                  fontWeight: 500,
                }}
              >
                <span className="live-dot" style={{ width: 6, height: 6 }} />
                Live
              </span>
            )}
          </h2>

          {!facility || !date ? (
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.9rem", padding: "20px 0" }}>
              Select a facility and date above to see available slots.
            </p>
          ) : loadingSlots ? (
            <div style={{ padding: "30px 0", textAlign: "center", color: "rgba(255,255,255,0.4)" }}>
              <div style={{ marginBottom: 8, fontSize: "1.5rem" }}>⟳</div>
              Loading real-time availability...
            </div>
          ) : (
            <>
              {/* Legend */}
              <div style={{ display: "flex", gap: 20, marginBottom: 20, marginTop: 8 }}>
                {[
                  { color: "#22c55e", label: "Available" },
                  { color: "#ef4444", label: "Booked" },
                  { color: "#6366f1", label: "Selected" },
                ].map((l) => (
                  <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.78rem", color: "rgba(255,255,255,0.45)" }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: l.color }} />
                    {l.label}
                  </div>
                ))}
              </div>

              <div className="slot-grid">
                {slots.map(({ slot, available }) => (
                  <button
                    key={slot}
                    onClick={() => available && setSelectedSlot(slot)}
                    className={`slot-btn ${!available ? "booked" : selectedSlot === slot ? "selected" : "available"}`}
                    disabled={!available}
                    style={selectedSlot === slot ? { background: "rgba(99,102,241,0.15)", borderColor: "#6366f1", color: "#818cf8" } : {}}
                  >
                    {slot}
                    <div style={{ fontSize: "0.7rem", marginTop: 4, opacity: 0.7 }}>
                      {!available ? "🔴 Booked" : selectedSlot === slot ? "✓ Selected" : "🟢 Open"}
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Step 3: Pay */}
        {selectedSlot && (
          <div className="glass-card" style={{ padding: "36px" }}>
            <h2
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "1.1rem",
                fontWeight: 700,
                marginBottom: 24,
                color: "#f9fafb",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "rgba(34,197,94,0.2)",
                  border: "1px solid rgba(34,197,94,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.8rem",
                  color: "#22c55e",
                  fontWeight: 800,
                }}
              >
                3
              </span>
              Confirm &amp; Pay
            </h2>

            {/* Summary */}
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 12,
                padding: "20px",
                marginBottom: 24,
              }}
            >
              {[
                { label: "Facility", value: facility },
                { label: "Date", value: date },
                { label: "Slot", value: selectedSlot },
                { label: "Total Price", value: `₹${getPrice()}` },
                { label: "Pay Now (Advance)", value: `₹${getAdvance()}`, highlight: true },
                { label: "Pay at Venue", value: `₹${getPrice() - getAdvance()}` },
              ].map(({ label, value, highlight }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 0",
                    borderBottom: label !== "Pay at Venue" ? "1px solid rgba(255,255,255,0.04)" : "none",
                  }}
                >
                  <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.88rem" }}>{label}</span>
                  <span
                    style={{
                      color: highlight ? "#22c55e" : "#f9fafb",
                      fontWeight: highlight ? 800 : 600,
                      fontSize: highlight ? "1rem" : "0.9rem",
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={handleBooking}
              disabled={paying}
              className="btn-primary"
              style={{
                width: "100%",
                justifyContent: "center",
                fontSize: "1.05rem",
                padding: "16px",
                opacity: paying ? 0.7 : 1,
              }}
            >
              {paying ? (
                <>⟳ Processing...</>
              ) : (
                <>📅 Confirm Booking</>
              )}
            </button>

            <p style={{ textAlign: "center", marginTop: 12, color: "rgba(255,255,255,0.25)", fontSize: "0.78rem" }}>
              Secured by Razorpay · 100% encrypted payment
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", background: "var(--bg-base)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "rgba(255,255,255,0.3)" }}>Loading booking...</div>
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}