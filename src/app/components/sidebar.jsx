"use client";
import Link from "next/link";

export default function Sidebar({ onLogout }) {
  return (
    <aside className="w-64 bg-zinc-800 p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-8">Spotify</h2>
        <nav className="flex flex-col gap-4">
          <Link href="#" className="hover:text-green-500 transition">
            Home
          </Link>
          <Link href="#" className="hover:text-green-500 transition">
            Search
          </Link>
          <Link href="#" className="hover:text-green-500 transition">
            Your Library
          </Link>
        </nav>
      </div>

      <button
        onClick={onLogout}
        className="mt-8 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition"
      >
        Logout
      </button>
    </aside>
  );
}
