// pages/api/callback.js
import fetch from "node-fetch";
import cookie from "cookie";

export default async function handler(req, res) {
  const code = req.query.code || null;
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = process.env.NEXT_PUBLIC_REDIRECT_URI;

  if (!code) return res.status(400).send("Missing code");

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri,
    }),
  });

  const tokenData = await tokenRes.json();
  if (tokenData.error) return res.status(400).json(tokenData);

  res.setHeader("Set-Cookie", [
    cookie.serialize("sp_access_token", tokenData.access_token, {
      httpOnly: true,
      path: "/",
      maxAge: tokenData.expires_in,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    }),
    cookie.serialize("sp_refresh_token", tokenData.refresh_token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    }),
  ]);

  res.redirect("/");
}
