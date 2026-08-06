"use client";

import { motion } from "framer-motion";
import Reveal from "../components/Reveal";

export default function Resume() {
  return (
    <Reveal>
      <section
        id="resume"
        className="min-h-screen bg-white px-6 py-20 dark:bg-black"
      >

        <div className="mx-auto max-w-7xl">

          {/* Heading */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >

            <p className="text-lg font-semibold text-blue-600">
              Resume
            </p>

            <h2 className="mt-3 text-5xl font-bold text-black dark:text-white">
              My Journey
            </h2>

          </motion.div>


          {/* Download */}

          <div className="mt-10 flex justify-center">

            <a
              href="Palagiri_Thahir...pdf"
              download
              className="rounded-full bg-black px-8 py-4 text-white transition hover:scale-105 dark:bg-white dark:text-black"
            >
              Download Resume
            </a>

          </div>


          {/* Education */}

          <div className="mt-16 grid gap-8 md:grid-cols-2">


            <motion.div
              whileHover={{ y: -8 }}
              className="rounded-3xl border p-8 shadow-lg dark:border-zinc-800"
            >

              <h3 className="text-2xl font-bold text-black dark:text-white">
                🎓 Education
              </h3>


              <div className="mt-6">

                <h4 className="text-xl font-semibold dark:text-white">
                  Bachelor of Computer Applications (BCA)
                  Presidency University, Bangalore

                </h4>


                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Computer Science Graduate
                </p>


                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Skills focused on Java, Web Development, Database Management and Software Development. Pay Attention Close to detail, problem-solving, and teamwork skills. Strong foundation in programming languages, algorithms, and data structures.

                </p>

              </div>


            </motion.div>



            {/* Developer Journey */}


            <motion.div
              whileHover={{ y: -8 }}
              className="rounded-3xl border p-8 shadow-lg dark:border-zinc-800"
            >

              <h3 className="text-2xl font-bold text-black dark:text-white">
                🚀 Developer Journey
              </h3>


              <p className="mt-6 text-gray-600 dark:text-gray-400">
                Building skills in Full Stack Development using Java,
                Spring Boot, React, Next.js, SQL and AI technologies.
                python, JavaScript, HTML, CSS, and Tailwind CSS. Gaining hands-on experience through personal projects and contributing to open-source initiatives. Continuously learning and staying updated with the latest industry trends and best practices. 
                powerful problem-solving abilities and a passion for creating innovative solutions. Eager to contribute to impactful projects and collaborate with talented teams in the tech industry.  
              </p>


              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Passionate about creating scalable applications and solving real-world problems.
              </p>


            </motion.div>


          </div>


          {/* Certifications */}

          <div className="mt-10 rounded-3xl border p-8 dark:border-zinc-800">

            <h3 className="text-2xl font-bold text-black dark:text-white">
              📜 Certifications & Learning
            </h3>


            <ul className="mt-5 space-y-3 text-gray-600 dark:text-gray-400">

              <li>
                • Basic to Advanced SQL Masterclass – Skill Nation
              </li>

              <li>
                •Basic to Advanced Excel Program – Skill Nation
              </li>

              <li>
                • Deloitte Australia Cyber Job Simulation – Forage
              
              </li>
              <li>
                - Tata GenAI Powered Data Analytics Job Simulation – Forage

              </li> 
              <li>
                - AWS Solutions Architecture Job Simulation – Forage
              </li>

            </ul>


          </div>


        </div>

      </section>
    </Reveal>
  );
}