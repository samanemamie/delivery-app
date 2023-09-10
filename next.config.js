/** @type {import('next').NextConfig} */
const path = require("path")


const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}



module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.resolve.alias['#'] = path.resolve(__dirname, './src');
    config.resolve.alias['#components'] = path.resolve(__dirname, './src/components');
    config.resolve.alias['@'] = path.resolve(__dirname, './src');
    return config;
  }
};

module.exports = nextConfig
