/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}


module.exports = {
  webpack: (config) => {
    config.resolve.alias['@'] = path.join(__dirname, './src');
    return config;
  },
};

module.exports = nextConfig
