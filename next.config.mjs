/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    mongodb_username: 'josipbjezancevic',
    mongodb_password: 'akNCrNu1HcRNo95B',
    mongodb_clustername: 'cluster0',
    mongodb_database: 'blog',
  },
};

export default nextConfig;
