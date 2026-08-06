"use client";

import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import projects from "../data/projects";

export default function Projects() {
  return (
    <Reveal>
      <section
        id="projects"
        className="min-h-screen bg-gray-50 px-6 py-20 dark:bg-zinc-950"
      >
        <div className="mx-auto max-w-7xl">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-lg font-semibold text-blue-600">
              Portfolio
            </p>

            <h2 className="mt-3 text-5xl font-bold text-black dark:text-white">
              Featured Projects
            </h2>

            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Some of my recent projects built using modern technologies.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">

            {projects.map((project, index) => (

              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.03,
                  y: -8,
                }}
                className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
              >

                {/* Project Demo Video */}
                <video
                  src={project.live}
                  poster={project.image}
                  controls
                  playsInline
                  preload="metadata"
                  className="h-56 w-full object-cover"
                />

                <div className="p-6">

                  <h3 className="text-2xl font-bold text-black dark:text-white">
                    {project.title}
                  </h3>

                  <p className="mt-4 text-gray-600 dark:text-gray-400">
                    {project.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex gap-4">

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-black px-5 py-3 text-white transition hover:bg-gray-800"
                    >
                      GitHub
                    </a>

                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-gray-300 px-5 py-3 transition hover:bg-gray-100 dark:hover:bg-zinc-800"
                    >
                      Open Video
                    </a>

                  </div>

                </div>

              </motion.div>

            ))}

          </div>

        </div>
      </section>
    </Reveal>
  );
}