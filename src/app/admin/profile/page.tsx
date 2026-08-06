"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Profile = {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  image: string;
  resume: string;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>({
    id: 0,
    name: "",
    role: "",
    email: "",
    phone: "",
    location: "",
    github: "",
    linkedin: "",
    image: "",
    resume: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const { data, error } = await supabase
  .from("profile")
  .select("*")
  .order("id", { ascending: false })
  .limit(1)
  .single();

    if (error) {
      console.log(error);
      return;
    }

    setProfile(data);
  }

  async function saveProfile() {
    const { error } = await supabase
      .from("profile")
      .update({
        name: profile.name,
        role: profile.role,
        email: profile.email,
        phone: profile.phone,
        location: profile.location,
        github: profile.github,
        linkedin: profile.linkedin,
        image: profile.image,
        resume: profile.resume,
      })
      .eq("id", profile.id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("✅ Profile Updated Successfully");
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10 dark:bg-black">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-xl dark:bg-zinc-900">
        <h1 className="mb-8 text-4xl font-bold">Edit Profile</h1>

        {Object.keys(profile).map((key) => {
          if (key === "id") return null;

          return (
            <input
              key={key}
              className="mb-4 w-full rounded-xl border p-3 dark:bg-zinc-800"
              placeholder={key}
              value={(profile as any)[key]}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  [key]: e.target.value,
                })
              }
            />
          );
        })}

        <button
          onClick={saveProfile}
          className="rounded-xl bg-blue-600 px-8 py-3 text-white"
        >
          Save Changes
        </button>
      </div>
    </main>
  );
}