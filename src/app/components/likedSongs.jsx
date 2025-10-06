export default function LikedSongs({ liked }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">Liked Songs</h2>
      <ul className="divide-y divide-zinc-800">
        {liked.map((song) => (
          <li key={song.id} className="flex justify-between py-3">
            <div>
              <p className="font-medium">{song.name}</p>
              <p className="text-sm text-gray-400">{song.artist}</p>
            </div>
            <span className="text-gray-400">{song.duration}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
