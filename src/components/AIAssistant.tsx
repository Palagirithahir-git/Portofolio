"use client";

import { useState } from "react";
import { MessageCircle, X, Send, Mic } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import portfolio from "@/data/portfolio";

type Message = {
  role: "user" | "ai";
  text: string;
};


export default function AIAssistant() {


  const [open, setOpen] = useState(false);

  const [input, setInput] = useState("");

  const [listening, setListening] = useState(false);



  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: `👋 Welcome to ThahirVerse AI!

I'm your personal AI portfolio assistant.

I can help you with:
• 👨‍💻 About Me
• 💼 Projects
• 🛠️ Skills
• 🎓 Education
• 📄 Resume
• 🚀 Career Goals
• 📧 Contact Information

Click one of the suggested questions below or ask me anything about my portfolio. I'm here to assist you!`,  
    },
  ]);





  // 🔊 AI Voice Reply

  function speak(text:string) {


    if(!window.speechSynthesis){
      return;
    }


    const speech =
      new SpeechSynthesisUtterance(text);


    speech.lang="en-US";
    speech.rate=1;
    speech.pitch=1;


    window.speechSynthesis.cancel();

    window.speechSynthesis.speak(speech);

  }







  // 💬 Send Message

  async function sendMessage(text = input) {
    if (!text.trim()) return;

    trackEvent("ai_questions");

    const userMessage: Message = { role: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();
      console.log("AI Response:", data);

      if (!response.ok) {
        setMessages((prev) => [...prev, { role: "ai", text: data.error || "AI service error." }]);
        return;
      }

      const reply = data.reply || "No response received.";
      setMessages((prev) => [...prev, { role: "ai", text: reply }]);
      speak(reply);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { role: "ai", text: "Sorry, I couldn't connect to AI service." }]);
    }
  }

// 🎤 Voice Input


  function startVoice(){


    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;



    if(!SpeechRecognition){

      alert(
        "Voice recognition is not supported in this browser"
      );

      return;

    }




    const recognition =
    new SpeechRecognition();




    recognition.lang="en-US";




    recognition.onstart=()=>{

      setListening(true);

    };




    recognition.onend=()=>{

      setListening(false);

    };




    recognition.onresult=(event:any)=>{


      const voiceText =
      event.results[0][0].transcript;



      setInput(voiceText);



    };



    recognition.start();


  }







  const suggestions = [
  "👋 Tell me about yourself",
  "💼 What projects have you built?",
  "🛠️ What technologies do you know?",
  "🤖 Tell me about ElectroMart",
  "📋 Explain your Task Management System",
  "🎓 What is your educational background?",
  "📄 Show your resume",
  "🏆 What are your strengths?",
  "🚀 What are your career goals?",
  "🧠 Why are you interested in AI?",
  "⚛️ Tell me about your React & Next.js skills",
  "☕ Tell me about your Java & Spring Boot skills",
  "📊 Do you know Power BI?",
  "🗄️ What databases have you worked with?",
  "🌐 Show your GitHub",
  "📧 How can I contact you?",
  "🎯 Why should we hire you?",

  ];







  return (

    <>


      {/* AI Floating Button */}


      <button

        onClick={()=>setOpen(!open)}

        className="fixed bottom-6 right-6 z-50 rounded-full bg-black p-4 text-white shadow-xl"

      >

        {open ? <X/> : <MessageCircle/>}

      </button>







      {open && (


        <div className="fixed bottom-24 right-6 z-50 flex h-[450px] w-96 flex-col rounded-3xl border bg-white/90 p-5 shadow-2xl backdrop-blur dark:bg-zinc-900">



          <h3 className="text-xl font-bold text-gray-900 dark:text-white">

            Thahir AI 🤖

          </h3>






          {/* Chat Messages */}


          <div className="mt-4 flex-1 space-y-3 overflow-y-auto">


            {messages.map((msg,index)=>(


              <div

                key={index}

                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${


                  msg.role==="user"

                  ? "ml-auto bg-black text-white"


                  : "bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-gray-200"


                }`}

              >

                {msg.text}

              </div>



            ))}


          </div>







          {/* Suggestions */}


          <div className="mb-3 flex gap-2 overflow-x-auto">


            {suggestions.map((item)=>(


              <button

                key={item}

                onClick={()=>sendMessage(item)}

                className="whitespace-nowrap rounded-full bg-gray-100 px-3 py-2 text-xs dark:bg-zinc-800 dark:text-white"

              >

                {item}

              </button>


            ))}


          </div>







          {/* Input */}


          <div className="flex gap-2">



            <button

              onClick={startVoice}

              className={`rounded-xl px-3 ${

                listening

                ? "bg-red-500 text-white"

                : "bg-gray-200 dark:bg-zinc-800"

              }`}

            >

              <Mic size={18}/>

            </button>






            <input

              value={input}

              onChange={(e)=>setInput(e.target.value)}

              onKeyDown={(e)=>{

                if(e.key==="Enter")
                sendMessage();

              }}

              placeholder={
                listening
                ? "Listening..."
                : "Ask something..."
              }


              className="flex-1 rounded-xl border px-4 py-2 outline-none dark:bg-zinc-800 dark:text-white"


            />







            <button

              onClick={()=>sendMessage()}

              className="rounded-xl bg-black px-4 text-white"

            >

              <Send size={18}/>

            </button>



          </div>




        </div>


      )}



    </>

  );

}