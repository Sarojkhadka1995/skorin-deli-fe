/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '13.234.222.250',
        port: '8080'
      },
      // {
      //   protocol: 'http',
      //   hostname: 'localhost',
      //   port: '3000'
      // }
    ],
  },
};

export default nextConfig;
