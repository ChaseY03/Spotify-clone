/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    allowedDevOrigins: [
      "http://localhost:3000",
      "https://chxse-spotify-clone.vercel.app/",
      "https://mikaela-presumptive-overpopularly.ngrok-free.dev/",
    ],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.scdn.co" },
      { protocol: "https", hostname: "mosaic.scdn.co" },
      { protocol: "https", hostname: "image-cdn-ak.spotifycdn.com" },
      { protocol: "https", hostname: "image-cdn-fa.spotifycdn.com" }, 
      { protocol: "https", hostname: "via.placeholder.com" }, // dummy fallback
    ],
  },
};

export default nextConfig;
