const { default: mongoose } = require('mongoose');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'maps.googleapis.com'],
  }
}

module.exports = () => {
  const MONGODB_URI = process.env.MONGODB_URI;
  mongoose.connect(MONGODB_URI, {dbName: 'airbnbClone'})
    .then(() => console.log('      - connect success'));
  return nextConfig;
}