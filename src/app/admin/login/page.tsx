"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e: any) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("http://localhost:5000/api/admin/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("adminToken", data.token);

      router.push("/admin/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={login}
        className="glass-card"
        style={{
          width: 400,
          padding: 30,
        }}
      >
        <h1>Admin Login</h1>

        <input
          className="input-field"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <br />

        <input
          type="password"
          className="input-field"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />

        <button className="btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}