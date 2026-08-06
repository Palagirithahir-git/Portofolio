"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Reveal from "../components/Reveal";

export default function Contact() {

  const form = useRef<HTMLFormElement>(null);

  const [status, setStatus] = useState("");

  async function sendEmail(e: React.FormEvent) {
    e.preventDefault();

    if (!form.current) return;

    try {
      setStatus("Sending...");

      await emailjs.sendForm(
        "service_noxlptb",
        "template_1yssr4u",
        form.current,
        {
          publicKey: "Ure1q9mcFA7OILnTK",
        }
      );

      setStatus("Message sent successfully ✅");

      form.current.reset();

    } catch (error) {

      console.error("EmailJS Error:", error);

      setStatus("Failed to send message ❌");

    }
  }


  return (
    <Reveal>

      <section
        id="contact"
        className="min-h-screen bg-gray-50 px-6 py-20 dark:bg-zinc-950"
      >

        <div className="mx-auto max-w-5xl">


          {/* Heading */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            viewport={{
              once: true,
            }}
            className="text-center"
          >

            <p className="text-lg font-semibold text-blue-600">
              Contact
            </p>


            <h2 className="mt-3 text-5xl font-bold text-black dark:text-white">
              Let's Work Together
            </h2>


            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Have a project or opportunity? Feel free to reach out.
            </p>


          </motion.div>



          <div className="mt-12 grid gap-8 md:grid-cols-2">



            {/* Contact Info */}


            <motion.div
              whileHover={{
                y: -8,
              }}
              className="rounded-3xl border bg-white p-8 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
            >

              <h3 className="text-2xl font-bold text-black dark:text-white">
                Connect With Me
              </h3>


              <p className="mt-5 text-gray-600 dark:text-gray-400">
                I am open to opportunities in Full Stack Development,
                Java Development and Software Engineering roles.
              </p>



              <div className="mt-8 space-y-4">


                <a
                  href="mailto:solothahir143@gmail.com"
                  className="block rounded-xl border p-4 transition hover:bg-gray-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                >
                  📧 Email
                </a>



                <a
                  href="https://github.com/Palagirithahir-git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl border p-4 transition hover:bg-gray-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                >
                  💻 GitHub
                </a>



                <a
                  href="https://www.linkedin.com/in/palagirithahir/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl border p-4 transition hover:bg-gray-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                >
                  🔗 LinkedIn
                </a>


              </div>


            </motion.div>





            {/* Contact Form */}


            <motion.form
              ref={form}
              onSubmit={sendEmail}
              whileHover={{
                y: -8,
              }}
              className="rounded-3xl border bg-white p-8 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
            >


              <input
                name="name"
                type="text"
                required
                placeholder="Your Name"
                className="w-full rounded-xl border px-4 py-3 outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              />



              <input
                name="email"
                type="email"
                required
                placeholder="Your Email"
                className="mt-4 w-full rounded-xl border px-4 py-3 outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              />



              <textarea
                name="message"
                required
                placeholder="Your Message"
                rows={5}
                className="mt-4 w-full rounded-xl border px-4 py-3 outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              />




              <button
                type="submit"
                className="mt-6 rounded-full bg-black px-8 py-3 text-white transition hover:scale-105 dark:bg-white dark:text-black"
              >

                Send Message

              </button>




              {status && (

                <p className="mt-4 text-center text-sm text-blue-600">
                  {status}
                </p>

              )}



            </motion.form>



          </div>


        </div>


      </section>


    </Reveal>
  );
}