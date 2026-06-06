"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between">
        <h1 className="text-3xl font-bold text-green-400">
          GO DASH
        </h1>

        <div className="flex gap-6">
          <Link href="/">Home</Link>
          <Link href="/booking">Booking</Link>
          <Link href="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
}