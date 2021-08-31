/** @type {import('next').NextConfig} */

const path = require('path');

module.exports = {
  reactStrictMode: true,
  eslint: {
    dirs: ['src'],
  },
  images: {
    domains: ['image.tmdb.org', 'upload.wikimedia.org', 'i.pinimg.com'],
  },
};
