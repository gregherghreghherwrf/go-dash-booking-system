"use client";

import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] =
    useState("");
  const [password, setPassword] =
    useState("");

  const API = process.env.NEXT_PUBLIC_API_URL;

  const handleRegister = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await axios.post(
        `${API}/api/auth/register`,
        {
          name,
          email,
          password,
        }
      );

      alert("Registration Successful");
    } catch (error) {
      console.error(error);
      alert("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-gray-900 p-8 rounded-lg"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Register
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 mb-4 text-black rounded"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 text-black rounded"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 text-black rounded"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 p-3 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}