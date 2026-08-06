export default function Footer() {
  return (
    <footer className="border-t bg-white py-8 dark:border-zinc-800 dark:bg-black">

      <div className="mx-auto max-w-7xl px-6 text-center">

        <p className="text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} ThahirVerse. All rights reserved.
        </p>

        <p className="mt-2 text-sm text-gray-500">
          Built with Next.js, React, Tailwind CSS & AI
        </p>

      </div>

    </footer>
  );
}