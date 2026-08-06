"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  github: string;
  live: string;
  image: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    technologies: "",
    github: "",
    live: "",
    image: "",
  });

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("id");

    if (error) {
      alert(error.message);
      return;
    }

    setProjects(data || []);
  }

  function editProject(project: Project) {
    setEditingId(project.id);

    setForm({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(", "),
      github: project.github,
      live: project.live,
      image: project.image,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function saveProject() {
    const payload = {
      title: form.title,
      description: form.description,
      technologies: form.technologies
        .split(",")
        .map((t) => t.trim()),
      github: form.github,
      live: form.live,
      image: form.image,
    };

    let error;

    if (editingId) {
      ({ error } = await supabase
        .from("projects")
        .update(payload)
        .eq("id", editingId));
    } else {
      ({ error } = await supabase
        .from("projects")
        .insert(payload));
    }

    if (error) {
      alert(error.message);
      return;
    }

    alert("✅ Project Saved");

    setEditingId(null);

    setForm({
      title: "",
      description: "",
      technologies: "",
      github: "",
      live: "",
      image: "",
    });

    loadProjects();
  }

  async function deleteProject(id: number) {
    if (!confirm("Delete this project?")) return;

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    loadProjects();
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10 dark:bg-black">
      <div className="mx-auto max-w-7xl">

        <h1 className="mb-8 text-4xl font-bold text-black dark:text-white">
          Manage Projects
        </h1>

        <div className="mb-10 rounded-2xl bg-white p-6 shadow dark:bg-zinc-900">

          <h2 className="mb-6 text-2xl font-bold dark:text-white">
            {editingId ? "Edit Project" : "Add Project"}
          </h2>

          <input
            className="mb-3 w-full rounded-lg border p-3 text-black"
            placeholder="Project Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <textarea
            className="mb-3 w-full rounded-lg border p-3 text-black"
            placeholder="Description"
            rows={4}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <input
            className="mb-3 w-full rounded-lg border p-3 text-black"
            placeholder="React, Next.js, Tailwind"
            value={form.technologies}
            onChange={(e) =>
              setForm({ ...form, technologies: e.target.value })
            }
          />

          <input
            className="mb-3 w-full rounded-lg border p-3 text-black"
            placeholder="GitHub URL"
            value={form.github}
            onChange={(e) =>
              setForm({ ...form, github: e.target.value })
            }
          />

          <input
            className="mb-3 w-full rounded-lg border p-3 text-black"
            placeholder="Live Demo URL"
            value={form.live}
            onChange={(e) =>
              setForm({ ...form, live: e.target.value })
            }
          />

          <input
            className="mb-6 w-full rounded-lg border p-3 text-black"
  placeholder="/projects/image.png"
  value={form.image}
  onChange={(e) =>
    setForm({ ...form, image: e.target.value })
  }
          />

          <button
            onClick={saveProject}
            className="rounded-xl bg-green-600 px-8 py-3 text-white"
          >
            {editingId ? "Update Project" : "Add Project"}
          </button>

        </div>

        <div className="grid gap-6">

          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl bg-white p-6 shadow dark:bg-zinc-900"
            >
              <h2 className="text-2xl font-bold dark:text-white">
                {project.title}
              </h2>

              <p className="mt-3 text-gray-600 dark:text-gray-400">
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-blue-100 px-3 py-1 text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => editProject(project)}
                  className="rounded-xl bg-blue-600 px-5 py-2 text-white"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteProject(project.id)}
                  className="rounded-xl bg-red-600 px-5 py-2 text-white"
                >
                  Delete
                </button>
              </div>

            </div>
          ))}

        </div>

      </div>
    </main>
  );
}