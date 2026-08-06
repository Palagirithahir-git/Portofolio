"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200/60 bg-white/80 backdrop-blur-xl dark:border-gray-800 dark:bg-black/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          ThahirVerse
        </h1>

        {/* Desktop Menu */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm font-medium">
            {links.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="transition hover:text-blue-600"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-800 dark:text-white"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-black md:hidden">
          <ul className="flex flex-col gap-6 px-6 py-6">
            {links.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-lg text-gray-700 transition hover:text-blue-600 dark:text-gray-300"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}