/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  env: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "dctahvizk",
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN:
      "pk.eyJ1Ijoia29vbGtpc2hhbiIsImEiOiJjazV3Zm41cG8wa3I1M2tydnVkcW53b2ZpIn0.mYrXogbdTrWSoJECNR1epg",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "192.168.0.124",
        port: "81",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
