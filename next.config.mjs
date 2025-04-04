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
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "img.vistarooms.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "assets.architecturaldigest.in",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn.decorilla.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
