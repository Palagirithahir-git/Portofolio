"use client";

import Link from "next/link";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-100 p-10 dark:bg-black">
      <div className="mx-auto max-w-7xl">

        <h1 className="text-5xl font-bold text-black dark:text-white">
          ThahirVerse Dashboard
        </h1>

        <p className="mt-3 text-gray-500 dark:text-gray-400">
          Welcome back, Thahir 👋
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {/* Profile */}
          <Card
            icon="👤"
            title="Profile"
            text="Edit your personal details"
            link="/admin/profile"
            button="Edit Profile"
          />

          {/* Projects */}
          <Card
            icon="💼"
            title="Projects"
            text="Manage portfolio projects"
            link="/admin/projects"
            button="Edit Projects"
          />

          {/* Skills */}
          <Card
            icon="🛠"
            title="Skills"
            text="Update your skills"
            link="/admin/skills"
            button="Edit Skills"
          />

          {/* Resume */}
          <Card
            icon="📄"
            title="Resume"
            text="Upload your latest resume"
            link="/admin/resume"
            button="Upload Resume"
          />

        </div>
      </div>
    </main>
  );
}


function Card({
  icon,
  title,
  text,
  link,
  button,
}: {
  icon: string;
  title: string;
  text: string;
  link: string;
  button: string;
}) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl dark:bg-zinc-900">

      <div className="text-5xl">{icon}</div>

      <h2 className="mt-4 text-2xl font-bold text-black dark:text-white">
        {title}
      </h2>

      <p className="mt-2 text-gray-600 dark:text-gray-400">
        {text}
      </p>

      <Link
        href={link}
        className="mt-6 inline-block rounded-xl bg-black px-5 py-2 text-white dark:bg-white dark:text-black"
      >
        {button}
      </Link>

    </div>
  );
}