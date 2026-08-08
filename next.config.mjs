/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.simulmalin.net" }],
        destination: "https://simulmalin.net/:path*",
        permanent: true,
      },
    ];
  },
};
export default nextConfig;