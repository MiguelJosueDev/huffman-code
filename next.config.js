/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    "extends": [
        "eslint:recommended",
        "next/core-web-vitals"
    ],
    "rules": {
    }
}

module.exports = nextConfig;
