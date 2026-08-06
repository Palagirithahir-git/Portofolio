"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ResumePage() {

  const [resume, setResume] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  async function uploadResume() {

    if (!resume) {
      setMessage("Please select a PDF first");
      return;
    }


    const fileName = `resume-${Date.now()}.pdf`;


    const { error } = await supabase.storage
      .from("resume")
      .upload(fileName, resume);


    if (error) {
      setMessage(error.message);
      return;
    }


    setMessage("Resume uploaded successfully ✅");
  }


  return (
    <main className="min-h-screen bg-gray-100 p-10 dark:bg-black">

      <div className="mx-auto max-w-4xl">

        <h1 className="text-4xl font-bold text-black dark:text-white">
          Resume Manager 📄
        </h1>


        <div className="mt-8 rounded-3xl bg-white p-8 shadow-xl dark:bg-zinc-900">

          <input
            type="file"
            accept="application/pdf"
            onChange={(e)=>
              setResume(e.target.files?.[0] || null)
            }
          />


          <button
            onClick={uploadResume}
            className="mt-6 rounded-xl bg-black px-6 py-3 text-white"
          >
            Upload Resume
          </button>


          <p className="mt-4 text-green-600">
            {message}
          </p>


        </div>

      </div>

    </main>
  );
}