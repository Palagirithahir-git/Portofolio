"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (
      email === "admin@thahirverse.com" &&
      password === "thahir123"
    ) {
      localStorage.setItem("admin", "true");
      router.push("/admin/dashboard");
    } else {
      alert("Invalid email or password");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-black">
      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-2xl dark:bg-zinc-900">

        <h1 className="text-center text-4xl font-bold text-black dark:text-white">
          Admin Login
        </h1>

        <p className="mt-3 text-center text-gray-500">
          Welcome back, Thahir 👋
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full rounded-xl border p-4 outline-none dark:bg-zinc-800 dark:text-white"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full rounded-xl border p-4 outline-none dark:bg-zinc-800 dark:text-white"
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-black py-4 text-white transition hover:scale-105 dark:bg-white dark:text-black"
          >
            Login
          </button>

        </form>

      </div>
    </main>
  );
}