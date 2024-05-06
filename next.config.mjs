/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    mongodb_username: 'josipbjezancevic',
    mongodb_password: 'alQFS8pDpArEhxKP',
    mongodb_clustername: 'cluster0',
    mongodb_database: 'blog',
  },
};

export default nextConfig;
