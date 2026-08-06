"use client";

import { motion } from "framer-motion";
import  Reveal from "../components/Reveal";

export default function About() {
  return (
    <Reveal>
    <section 
    id="about"
    className="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-white">
      <div className="mx-auto max-w-7xl">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-white-900">
            About Me
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight">
            Building technology with creativity
          </h2>
        </motion.div>


        <div className="mt-12 grid gap-8 md:grid-cols-3">

          <motion.div
            whileHover={{ y: -8 }}
            className="rounded-3xl bg-[#f5f5f7] p-8"
          >
            <h3 className="text-black font-semibold">
              🎓 Education
            </h3>

            <p className="mt-4 text-gray-600">
              Bachelor of Computer Applications (BCA)
Presidency University, Bengaluru

I completed my Bachelor of Computer Applications, where I built a strong foundation in programming, software development, databases, and emerging technologies. During my academic journey, I developed skills in Java, Python, SQL, Web Development, and Artificial Intelligence concepts through projects and continuous learning.
            </p>
          </motion.div>


          <motion.div
            whileHover={{ y: -8 }}
            className="rounded-3xl bg-[#f5f5f7] p-8"
          >
            <h3 className="text-black font-semibold">
              💻 Development
            </h3>

            <p className="mt-4 text-gray-600">
My development journey started with curiosity about how technology works and how software can solve real-world problems. I have worked on projects using Java, Python, SQL, and modern web technologies like Next.js and React.

I enjoy building user-friendly applications, exploring AI-powered solutions, and improving my skills through hands-on projects. Every project helps me learn new technologies and become a better developer.            </p>
          </motion.div>


          <motion.div
            whileHover={{ y: -8 }}
            className="rounded-3xl bg-[#f5f5f7] p-8"
          >
            <h3 className="text-black font-semibold">
              🚀 Goal
            </h3>

            <p className="mt-4 text-gray-600">
             My goal is to become a skilled Software Developer and AI Engineer by continuously improving my technical knowledge and problem-solving abilities.

I aim to build innovative, scalable applications that create meaningful impact while growing as a professional in the technology industry. I am passionate about learning new technologies and contributing to challenging projects.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
    </Reveal>
  );
}