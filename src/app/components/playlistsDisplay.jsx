export default function PlaylistDisplay({ playlists }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">Your Playlists</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {playlists.map((pl) => (
          <div
            key={pl.id}
            className="bg-zinc-800 p-4 rounded-lg hover:bg-zinc-700 transition"
          >
            {pl.images?.[0]?.url && (
              <img
                src={pl.images[0].url}
                alt={pl.name}
                className="w-full h-40 object-cover rounded mb-3"
              />
            )}
            <h3 className="font-bold">{pl.name}</h3>
            <p className="text-sm text-gray-400">{pl.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
