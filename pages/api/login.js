// pages/api/login.js
export default function handler(req, res) {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const redirect_uri = process.env.NEXT_PUBLIC_REDIRECT_URI;
  const scopes = [
  "user-read-private",
  "user-read-email",
  "playlist-read-private",       // private playlists
  "playlist-read-collaborative", // collaborative playlists
  "playlist-modify-public",      // optional if you want to edit playlists
  "playlist-modify-private",     // optional if you want to edit playlists
  "user-library-read",           // liked songs / saved tracks
].join(" ");


  const state = Math.random().toString(36).substring(2, 15);
  const params = new URLSearchParams({
    client_id,
    response_type: "code",
    redirect_uri,
    scope: scopes,
    state,
    show_dialog: "true",
  });

  res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
}
