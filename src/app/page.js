"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [user, setUser] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const resUser = await fetch("/api/me");
        if (resUser.ok) setUser(await resUser.json());

        const resPl = await fetch("/api/playlists");
        if (resPl.ok) setPlaylists(await resPl.json());
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-40 text-zinc-500">Loading...</p>
    );

  if (!user)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
        <h1 className="text-4xl font-bold mb-4">Spotify Clone</h1>
        <Link href="/api/login">
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded font-semibold">
            Login with Spotify
          </button>
        </Link>
      </div>
    );

  return (
    <div className="flex h-screen bg-zinc-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-800 p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8">Spotify</h2>
        <nav className="flex flex-col gap-4">
          <Link href="#" className="hover:text-green-500">Home</Link>
          <Link href="#" className="hover:text-green-500">Search</Link>
          <Link href="#" className="hover:text-green-500">Your Library</Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">
        {/* Header */}
        <header className="flex justify-end mb-8 items-center gap-4">
          <span>{user.display_name}</span>
          {user.images?.[0]?.url ? (
            <Image
              src={user.images[0].url}
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-600 rounded-full" />
          )}
        </header>

        {/* Playlists */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Your Playlists</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {playlists.map((pl) => (
              <div
                key={pl.id}
                className="bg-zinc-800 rounded-lg p-4 hover:bg-zinc-700 transition cursor-pointer"
              >
                {pl.images[0] && (
                  <Image
                    src={pl.images[0].url}
                    alt={pl.name}
                    width={300}
                    height={160}
                    className="w-full h-40 object-cover rounded mb-2"
                  />
                )}
                <h3 className="font-semibold">{pl.name}</h3>
                <p className="text-sm text-gray-400">{pl.tracks.total} tracks</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
