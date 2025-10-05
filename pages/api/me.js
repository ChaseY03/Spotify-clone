import cookie from "cookie";

export default async function handler(req, res) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies.sp_access_token;

  if (!token) return res.status(401).json({ error: "Not logged in" });

  try {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const errData = await response.json();
      return res.status(response.status).json(errData);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
}
