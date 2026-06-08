"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL!;

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${API}/api/auth/register`, {
        name,
        email,
        phone,
        password,
      });
      localStorage.setItem("token", res.data.token);
      router.push("/booking");
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Registration failed. Try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-base)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BG Orbs */}
      <div
        className="orb orb-green"
        style={{ width: 500, height: 500, top: "-20%", right: "-15%", opacity: 0.45 }}
      />
      <div
        className="orb orb-teal"
        style={{ width: 400, height: 400, bottom: "-15%", left: "-10%", opacity: 0.4 }}
      />

      <div style={{ width: "100%", maxWidth: 440, position: "relative", zIndex: 2 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: "linear-gradient(135deg, #22c55e, #16a34a)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  color: "#000",
                  fontSize: 20,
                  boxShadow: "0 0 24px rgba(34,197,94,0.4)",
                }}
              >
                G
              </div>
              <span
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 700,
                  fontSize: "1.4rem",
                  color: "#f9fafb",
                }}
              >
                Go Dash
              </span>
            </div>
          </Link>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.9rem", marginTop: 4 }}>
            Create your account — it&apos;s free
          </p>
        </div>

        {/* Card */}
        <div className="glass-card" style={{ padding: "40px 36px" }}>
          <h1
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "1.6rem",
              fontWeight: 700,
              marginBottom: 28,
              color: "#f9fafb",
            }}
          >
            Create Account 🚀
          </h1>

          {error && (
            <div
              style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.3)",
                borderRadius: 10,
                padding: "12px 16px",
                color: "#f87171",
                fontSize: "0.88rem",
                marginBottom: 20,
              }}
            >
              {error}
            </div>
          )}

          <form
            onSubmit={handleRegister}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: 8,
                }}
              >
                Full Name
              </label>
              <input
                id="register-name"
                type="text"
                placeholder="Harsh Khatri"
                className="input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: 8,
                }}
              >
                Email
              </label>
              <input
                id="register-email"
                type="email"
                placeholder="you@example.com"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: 8,
                }}
              >
                Phone (optional)
              </label>
              <input
                id="register-phone"
                type="tel"
                placeholder="+91 98765 43210"
                className="input-field"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: 8,
                }}
              >
                Password
              </label>
              <input
                id="register-password"
                type="password"
                placeholder="Min 8 characters"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
            </div>

            <button
              id="register-submit"
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{
                width: "100%",
                justifyContent: "center",
                marginTop: 8,
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Creating account..." : "Create Account & Book →"}
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: 24,
              color: "rgba(255,255,255,0.35)",
              fontSize: "0.88rem",
            }}
          >
            Already have an account?{" "}
            <Link
              href="/login"
              style={{ color: "#22c55e", textDecoration: "none", fontWeight: 600 }}
            >
              Sign in
            </Link>
          </p>
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: 20,
            color: "rgba(255,255,255,0.2)",
            fontSize: "0.78rem",
          }}
        >
          By registering, you agree to our terms of service.
        </p>
      </div>
    </div>
  );
}