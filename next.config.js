const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  env: {
    STRUNYAN_DATE: process.env.STRUNYAN_DATE,
  },
};

module.exports = nextConfig;
