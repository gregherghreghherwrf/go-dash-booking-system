"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();

  // This page now redirects to booking — payment is handled inline on /booking
  useEffect(() => {
    router.replace("/booking");
  }, [router]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-base)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 16,
        color: "rgba(255,255,255,0.4)",
      }}
    >
      <div style={{ fontSize: "2rem" }}>⟳</div>
      <p>Redirecting to booking...</p>
      <Link href="/booking" style={{ color: "#22c55e", textDecoration: "none", fontWeight: 600 }}>
        Click here if not redirected
      </Link>
    </div>
  );
}