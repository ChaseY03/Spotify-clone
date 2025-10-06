import cookie from "cookie";

export default function handler(req, res) {
  // Clear the cookies
  res.setHeader("Set-Cookie", [
    cookie.serialize("sp_access_token", "", {
      httpOnly: true,
      path: "/",
      expires: new Date(0), // expire immediately
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    }),
    cookie.serialize("sp_refresh_token", "", {
      httpOnly: true,
      path: "/",
      expires: new Date(0),
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    }),
  ]);

  // Redirect to home page
  res.writeHead(302, { Location: "/" });
  res.end();
}
