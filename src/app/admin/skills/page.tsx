"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Skill = {
  id: number;
  name: string;
  level: number | null;
  color: string | null;
};

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [newLevel, setNewLevel] = useState(80);
  const [newColor, setNewColor] = useState("bg-blue-500");

  async function fetchSkills() {
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .order("id");

    if (!error) {
      setSkills((data as Skill[]) || []);
    }
  }

  useEffect(() => {
    fetchSkills();
  }, []);

  async function addSkill() {
    if (!newSkill.trim()) return;

    const { error } = await supabase.from("skills").insert({
      name: newSkill,
      level: newLevel,
      color: newColor,
    });

    if (error) {
      alert(error.message);
      return;
    }

    setNewSkill("");
    setNewLevel(80);
    setNewColor("bg-blue-500");
    fetchSkills();
  }

  async function updateSkill(skill: Skill) {
    const { error } = await supabase
      .from("skills")
      .update({
        name: skill.name,
        level: skill.level,
        color: skill.color,
      })
      .eq("id", skill.id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Skill updated successfully.");
    fetchSkills();
  }

  async function deleteSkill(id: number) {
    const { error } = await supabase
      .from("skills")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchSkills();
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10 dark:bg-black">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold text-black dark:text-white">
          Manage Skills 🛠
        </h1>

        <div className="mt-8 rounded-3xl bg-white p-8 shadow-xl dark:bg-zinc-900">

          {/* Add Skill */}
          <div className="grid gap-3 md:grid-cols-4">
            <input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Skill Name"
              className="rounded-xl border p-3 text-black"
            />

            <input
              type="number"
              value={newLevel}
              onChange={(e) => setNewLevel(Number(e.target.value))}
              className="rounded-xl border p-3 text-black"
            />

            <select
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              className="rounded-xl border p-3 text-black"
            >
              <option value="bg-red-500">Red</option>
              <option value="bg-green-500">Green</option>
              <option value="bg-blue-500">Blue</option>
              <option value="bg-yellow-500">Yellow</option>
              <option value="bg-sky-500">Sky</option>
              <option value="bg-black">Black</option>
            </select>

            <button
              onClick={addSkill}
              className="rounded-xl bg-black p-3 text-white"
            >
              Add Skill
            </button>
          </div>

          {/* Existing Skills */}
          <div className="mt-10 space-y-5">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="grid gap-3 rounded-2xl bg-gray-100 p-5 dark:bg-zinc-800 md:grid-cols-5"
              >
                <input
                  value={skill.name}
                  onChange={(e) =>
                    setSkills((prev) =>
                      prev.map((s) =>
                        s.id === skill.id ? { ...s, name: e.target.value } : s
                      )
                    )
                  }
                  className="rounded-lg border p-2 text-black"
                />

                <input
                  type="number"
                  value={skill.level ?? 0}
                  onChange={(e) =>
                    setSkills((prev) =>
                      prev.map((s) =>
                        s.id === skill.id
                          ? { ...s, level: Number(e.target.value) }
                          : s
                      )
                    )
                  }
                  className="rounded-lg border p-2 text-black"
                />

                <select
                  value={skill.color ?? "bg-blue-500"}
                  onChange={(e) =>
                    setSkills((prev) =>
                      prev.map((s) =>
                        s.id === skill.id
                          ? { ...s, color: e.target.value }
                          : s
                      )
                    )
                  }
                  className="rounded-lg border p-2 text-black"
                >
                  <option value="bg-red-500">Red</option>
                  <option value="bg-green-500">Green</option>
                  <option value="bg-blue-500">Blue</option>
                  <option value="bg-yellow-500">Yellow</option>
                  <option value="bg-sky-500">Sky</option>
                  <option value="bg-black">Black</option>
                </select>

                <button
                  onClick={() => updateSkill(skill)}
                  className="rounded-lg bg-green-600 p-2 text-white"
                >
                  Update
                </button>

                <button
                  onClick={() => deleteSkill(skill.id)}
                  className="rounded-lg bg-red-600 p-2 text-white"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </main>
  );
}