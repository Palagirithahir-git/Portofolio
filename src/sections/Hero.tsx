"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Hero() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const { data } = await supabase
      .from("profile")
      .select("*")
      .order("id", { ascending: false })
      .limit(1)
      .single();

    if (data) {
      setProfile(data);
    }
  }

  return (
    <section
      id="home"
      className="flex min-h-screen items-center bg-[#f5f5f7] px-6 pt-16 dark:bg-black"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2">

        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lg text-gray-500 dark:text-gray-400">
            👋 Hello, I'm
          </p>

          <h1 className="mt-3 text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
            {profile?.name}
          </h1>

          <h2 className="mt-4 text-2xl font-medium text-blue-600">
            {profile?.role}
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300">
            Motivated and detail-oriented BCA graduate with strong
            communication, interpersonal, and problem-solving skills.
            Aspiring to build a career in technology while continuously
            enhancing technical expertise.
          </p>

          <div className="mt-10 flex gap-4">
            <button
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-full bg-black px-6 py-3 text-white transition hover:bg-gray-800 dark:bg-white dark:text-black"
            >
              View Projects
            </button>

            <a
              href={profile?.resume}
              download
              className="rounded-full border border-gray-300 px-6 py-3 transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-zinc-800"
            >
              Download Resume
            </a>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -15, 0],
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="flex justify-center"
        >
          <div className="flex h-80 w-80 items-center justify-center rounded-full border border-white/30 bg-white/60 shadow-2xl backdrop-blur-xl dark:bg-white/10">

            <img
  src="/images/Profile.png"
  alt="Profile"
  className="h-full w-full rounded-full object-cover"
/>
          

          </div>
        </motion.div>

      </div>
    </section>
  );
}