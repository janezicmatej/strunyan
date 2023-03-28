const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  env: {
    NEXT_PUBLIC_STRUNYAN_DATE_FROM: process.env.STRUNYAN_DATE_FROM,
    NEXT_PUBLIC_STRUNYAN_DATE_TO: process.env.STRUNYAN_DATE_TO,
  },
};

module.exports = nextConfig;
