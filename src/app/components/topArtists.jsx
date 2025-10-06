export default function TopArtists({ artists }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Top Artists</h2>
      <div className="flex gap-6 flex-wrap">
        {artists.map((artist) => (
          <div key={artist.id} className="text-center w-32">
            <img
              src={artist.image}
              alt={artist.name}
              className="w-32 h-32 object-cover rounded-full mb-2"
            />
            <h3 className="font-semibold">{artist.name}</h3>
            <p className="text-gray-400 text-sm">{artist.genres.join(", ")}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
