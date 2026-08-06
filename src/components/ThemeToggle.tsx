"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";


export default function ThemeToggle(){

  const {theme,setTheme}=useTheme();

  const [mounted,setMounted]=useState(false);


  useEffect(()=>{
    setMounted(true);
  },[]);


  if(!mounted) return null;


  return(
    <button
      onClick={() =>
        setTheme(theme==="dark" ? "light":"dark")
      }
      className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
    >

      {theme==="dark"
      ? <Sun size={20}/>
      : <Moon size={20}/>
      }

    </button>
  );
}