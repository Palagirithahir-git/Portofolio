"use client";

import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Skills() {
  const [skills, setSkills] = useState<any[]>([]);

useEffect(() => {
  async function getSkills() {
    const { data, error } = await supabase
      .from("skills")
      .select("*");

    if (!error) {
      setSkills(data || []);
    }
  }

  getSkills();
}, []);

  return (
    <Reveal>
      <section
        id="skills"
        className="min-h-screen bg-white px-6 py-20 dark:bg-black"
      >
        <div className="mx-auto max-w-7xl">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-blue-600 font-semibold text-lg">
              Skills
            </p>

            <h2 className="mt-3 text-5xl font-bold text-black dark:text-white">
              Technologies I Work With
            </h2>

            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Here are the technologies and tools I use to build modern web applications.
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.03,
                  y: -8,
                }}
                className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg transition dark:border-zinc-700 dark:bg-zinc-900"
              >

                {/* Skill Name */}
                <div className="mb-4 flex items-center justify-between">

                  <h3 className="text-2xl font-semibold text-black dark:text-white">
                    {skill.name}
                  </h3>

                  <span className="font-bold text-blue-600">
                    {skill.level}%
                  </span>

                </div>

                {/* Progress Bar */}
                <div className="h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-zinc-700">

                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{
                      width: `${skill.level}%`,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.2,
                    }}
                    className={`h-full rounded-full ${skill.color}`}
                  />

                </div>

              </motion.div>
            ))}

          </div>

        </div>
      </section>
    </Reveal>
  );
}