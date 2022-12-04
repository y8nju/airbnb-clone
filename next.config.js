const { default: mongoose } = require('mongoose');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'maps.googleapis.com'],
  },
  experimental: {
    modularizeImports: {
      '@mui/material/?(((\\w*)?/?)*)': {
        transform: '@mui/material/{{ matches.[1] }}/{{member}}'
      },
      '@mui/icons-material/?(((\\w*)?/?)*)': {
        transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}'
      }
    }
  },
  i18n: {
    locales: ["ko", "en"],
    defaultLocale: "ko",
  },
}

module.exports = () => {
  
  const MONGODB_URI = process.env.MONGODB_URI;
  mongoose.connect(MONGODB_URI, {dbName: 'airbnbClone'})
    .then(() => console.log('      - connect success'));
  return nextConfig;
}