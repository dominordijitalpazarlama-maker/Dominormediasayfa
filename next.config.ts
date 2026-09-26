import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // XAMPP / Apache gibi statik bir sunucuda çalıştırmak için: saf HTML/CSS/JS üretir.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
