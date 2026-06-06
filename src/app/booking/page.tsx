"use client";

import { useState } from "react";

export default function BookingPage() {

  const [facility, setFacility] = useState("");

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        Book Your Slot
      </h1>

      <div className="max-w-xl space-y-6">

        <select
          className="w-full p-4 bg-zinc-900 rounded"
          onChange={(e) => setFacility(e.target.value)}
        >
          <option>Select Facility</option>
          <option>Pickleball</option>
          <option>Box Cricket</option>
        </select>

        <input
          type="date"
          className="w-full p-4 bg-zinc-900 rounded"
        />

        <select className="w-full p-4 bg-zinc-900 rounded">
          <option>Select Time Slot</option>
          <option>6 AM - 7 AM</option>
          <option>7 AM - 8 AM</option>
          <option>8 AM - 9 AM</option>
          <option>6 PM - 7 PM</option>
          <option>7 PM - 8 PM</option>
        </select>

        <button
          className="bg-green-500 text-black px-8 py-4 rounded-xl font-bold"
        >
          Continue Booking
        </button>

      </div>

    </div>
  );
}