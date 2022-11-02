const { default: mongoose } = require('mongoose');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // domains: ['www.animal.go.kr'],
  }
}

module.exports = () => {
  const MONGODB_URI = process.env.MONGODB_URI;
  mongoose.connect(MONGODB_URI, {dbName: 'nextJs-tutorial'})
    .then(() => console.log('      - connect success'));
  return nextConfig;
}