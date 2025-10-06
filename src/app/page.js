"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Sidebar from "./components/sidebar";

export default function LandingPage() {
  const [user, setUser] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  async function handleLogout() {
    await fetch("/api/logout");
    window.location.href = "/";
  }


  useEffect(() => {
    async function fetchSpotifyData() {
      try {
        // Fetch user profile
        const resUser = await fetch("/api/me");
        if (!resUser.ok) {
          setLoading(false);
          return; // Not logged in
        }
        const userData = await resUser.json();
        setUser(userData);

        // Fetch playlists
        const resPl = await fetch("/api/playlists");
        const playlistsData = resPl.ok ? await resPl.json() : [];
        setPlaylists(playlistsData);

        // Fetch liked songs
        const resLiked = await fetch("/api/liked");
        const likedData = resLiked.ok ? await resLiked.json() : [];
        setLikedSongs(likedData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchSpotifyData();
  }, []);

  // Loading screen
  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-900 text-white">
        <p className="text-lg text-gray-400 animate-pulse">Loading...</p>
      </div>
    );

  // If not logged in → Landing Page
  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex flex-col">
        {/* Header */}
         <header className="flex justify-between items-center p-6 max-w-6xl mx-auto w-full">
      <div className="flex items-center gap-3">
        <Image
          src="/Spotify_Full_Logo_White.png"
          alt="Spotify logo"
          width={150}
          height={150}
          className="object-contain"
        />
        {/* <h1 className="text-3xl font-bold tracking-tight">Spotify</h1> */}
      </div>

      <a
        href="/api/login"
        className="bg-white text-zinc-900 font-semibold px-5 py-2 rounded-full shadow hover:scale-105 transform transition"
      >
        Login with Spotify
      </a>
    </header>

        {/* Hero Section */}
        <section className="flex flex-col-reverse md:flex-row items-center justify-between max-w-6xl mx-auto flex-1 px-6 md:gap-16">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Music for everyone
            </h2>
            <p className="text-gray-200 mb-6">
              Stream your favorite playlists, explore new music, and manage your
              library — all in one place.
            </p>
            {!user && (
              <a
                href="https://www.spotify.com/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-lg shadow transition"
              >
                GET SPOTIFY FREE
              </a>
            )}
          </div>

          <div className="mb-12 md:mb-0">
            <Image
              src="/hero-music.png"
              alt="Music illustration"
              width={800}
              height={800}
            //className="rounded-lg shadow-lg"
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-zinc-800 py-16">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-zinc-900 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">Playlists</h3>
              <p>Organize your favorite songs into custom playlists.</p>
            </div>
            <div className="p-6 bg-zinc-900 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">Liked Songs</h3>
              <p>Keep track of all the songs you love in one place.</p>
            </div>
            <div className="p-6 bg-zinc-900 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">Discover</h3>
              <p>Explore new artists and albums curated just for you.</p>
            </div>
          </div>
        </section>

        <footer className="bg-zinc-900 py-6 mt-auto text-center text-gray-400">
          &copy; {new Date().getFullYear()} Chxse Spotify Clone
        </footer>
      </div>
    );
  }

  // If logged in → Dashboard view
  return (
    <div className="flex h-screen bg-zinc-900 text-white">
      {/* Sidebar */}
      <Sidebar onLogout={handleLogout} />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">
        {/* Header */}
        <header className="flex justify-end items-center gap-4 mb-8">
          <span className="text-lg font-medium">{user.display_name}</span>
          <Image
            src={user.images?.[0]?.url || "https://via.placeholder.com/40"}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
        </header>

        {/* Playlists Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Your Playlists</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {playlists.map((pl) => (
              <div
                key={pl.id}
                className="bg-zinc-800 rounded-lg p-4 hover:bg-zinc-700 transition cursor-pointer"
              >
                {pl.images?.[0]?.url && (
                  <Image
                    src={pl.images[0].url}
                    alt={pl.name}
                    width={300}
                    height={160}
                    className="w-full h-40 object-cover rounded mb-2"
                  />
                )}
                <h3 className="font-semibold truncate">{pl.name}</h3>
                <p className="text-sm text-gray-400">{pl.tracks.total} tracks</p>
              </div>
            ))}
          </div>
        </section>

        {/* Liked Songs Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Liked Songs</h2>
          <ul className="space-y-2">
            {likedSongs.map((song) => (
              <li
                key={song.id}
                className="flex justify-between items-center bg-zinc-800 p-3 rounded hover:bg-zinc-700 transition"
              >
                <span>
                  {song.name} — <span className="text-gray-400">{song.artist}</span>
                </span>
                <span className="text-green-500">♥</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
