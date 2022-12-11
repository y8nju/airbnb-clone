/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'maps.googleapis.com'],
  },
  experimental: {
    modularizeImports: {
      lodash: {
        transform: 'lodash/{{member}}'
      },
      '@mui/material/?(((\\w*)?/?)*)': {
        transform: '@mui/material/{{ matches.[1] }}/{{member}}'
      },
      '@mui/icons-material/?(((\\w*)?/?)*)': {
        transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}'
      },
      '@mui/lab': {
        transform: '@mui/lab/{{member}}'
      },
    }
  },
  i18n: {
    locales: ["ko", "en"],
    defaultLocale: "ko",
  },
}

module.exports = () => {
  return nextConfig;
}