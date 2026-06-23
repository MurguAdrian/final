
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'res.cloudinary.com',
//       },
//     ],
//   },
//   async headers() {
//     return [
//       {
//         source: '/invitatie/(.*)',
//         headers: [
//           {
//             key: 'X-Robots-Tag',
//             value: 'index, follow',
//           },
//         ],
//       },
//       {
//         source: '/api/og/(.*)',
//         headers: [
//           {
//             key: 'Cache-Control',
//             value: 'public, max-age=3600, s-maxage=3600',
//           },
//           {
//             key: 'Access-Control-Allow-Origin',
//             value: '*',
//           },
//         ],
//       },
//     ];
//   },
// };
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['@sparticuz/chromium', 'puppeteer-core'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/invitatie/(.*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow',
          },
        ],
      },
      {
        source: '/api/og/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;