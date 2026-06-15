"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post(`${API}/api/admin/login`, {
        // Always trim + lowercase before sending — fixes mobile autocorrect/autocapitalize issues
        email: email.trim().toLowerCase(),
        password: password.trim(),
      });

      localStorage.setItem("adminToken", data.token);
      router.push("/admin/dashboard");
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Invalid credentials. Please try again.";
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
        padding: "24px 16px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background orbs */}
      <div className="orb orb-green" style={{ width: 500, height: 500, top: "-20%", left: "-15%", opacity: 0.45 }} />
      <div className="orb orb-teal" style={{ width: 400, height: 400, bottom: "-15%", right: "-10%", opacity: 0.35 }} />

      <div style={{ width: "100%", maxWidth: 420, position: "relative", zIndex: 2 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
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
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.88rem" }}>
            Admin Portal — Restricted Access
          </p>
        </div>

        {/* Card */}
        <div className="glass-card" style={{ padding: "40px 32px" }}>
          <h1
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "1.5rem",
              fontWeight: 700,
              marginBottom: 8,
              color: "#f9fafb",
            }}
          >
            Admin Login 🔐
          </h1>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.85rem", marginBottom: 28 }}>
            Use your admin credentials to access the dashboard.
          </p>

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
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={login} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label
                style={{
                  display: "block",
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: 8,
                }}
              >
                Admin Email
              </label>
              <input
                id="admin-email"
                type="email"
                placeholder="admin@godash.com"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                /* Critical for mobile — prevents autocapitalize/autocorrect from mangling the email */
                autoCapitalize="none"
                autoCorrect="off"
                autoComplete="email"
                spellCheck={false}
                inputMode="email"
                required
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: 8,
                }}
              >
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                placeholder="••••••••"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            <button
              id="admin-login-submit"
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
              {loading ? "Signing in..." : "Sign In to Dashboard →"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: 24, color: "rgba(255,255,255,0.2)", fontSize: "0.78rem" }}>
            This area is restricted to authorized administrators only.
          </p>
        </div>
      </div>
    </div>
  );
}