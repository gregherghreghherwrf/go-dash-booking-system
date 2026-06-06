"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-72 h-screen bg-zinc-950 fixed">

      <div className="p-6">

        <h1 className="text-3xl font-bold text-green-400">
          GO DASH
        </h1>

        <p className="text-gray-500">
          Admin Panel
        </p>

      </div>

      <nav className="mt-10">

        <Link
          href="/admin/dashboard"
          className="block p-4 hover:bg-zinc-800"
        >
          Dashboard
        </Link>

        <Link
          href="/admin/bookings"
          className="block p-4 hover:bg-zinc-800"
        >
          Bookings
        </Link>

        <Link
          href="/admin/facilities"
          className="block p-4 hover:bg-zinc-800"
        >
          Facilities
        </Link>

        <Link
          href="/admin/slots"
          className="block p-4 hover:bg-zinc-800"
        >
          Slot Management
        </Link>

      </nav>

    </aside>
  );
}