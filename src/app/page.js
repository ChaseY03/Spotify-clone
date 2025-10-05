"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch user
        const resUser = await fetch("/api/me");
        if (resUser.ok) setUser(await resUser.json());

        // Fetch playlists
        const resPl = await fetch("/api/playlists");
        if (resPl.ok) setPlaylists(await resPl.json());
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-40 text-zinc-500">Loading...</p>;

  if (!user)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
        <h1 className="text-4xl font-bold mb-4">Spotify Clone</h1>
        <a
          href="/api/login"
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded font-semibold"
        >
          Login with Spotify
        </a>
      </div>
    );

  return (
    <div className="flex h-screen bg-zinc-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-800 p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8">Spotify</h2>
        <nav className="flex flex-col gap-4">
          <a href="#" className="hover:text-green-500">Home</a>
          <a href="#" className="hover:text-green-500">Search</a>
          <a href="#" className="hover:text-green-500">Your Library</a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">
        {/* Header */}
        <header className="flex justify-end mb-8 items-center gap-4">
          <span>{user.display_name}</span>
          <img
            src={user.images?.[0]?.url || "https://via.placeholder.com/40"}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
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
                  <img
                    src={pl.images[0].url}
                    alt={pl.name}
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
