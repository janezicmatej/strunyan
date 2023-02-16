const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  env: {
    NEXT_PUBLIC_STRUNYAN_DATE: process.env.STRUNYAN_DATE,
  },
};

module.exports = nextConfig;
