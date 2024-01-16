/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  skipTrailingSlashRedirect: false,
  images: {
    unoptimized: true,
  }
};

module.exports = nextConfig;
