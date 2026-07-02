// import type { MetadataRoute } from 'next'
// import { SITE_DOMAIN } from '../constants/marketingDefaults'

// const publicPaths = [
//   '/',
//   '/preturi',
//   '/contact',
//   '/despre',
//   '/gdpr',
//   '/politica',
//   '/cookies',
//   '/termeni',
//   '/invitatii-digitale',
//   '/invitatii-PDF',
// ]

// const photographerPaths = [
//   '/fotograf-bacau-tr-visuals',
//   '/fotograf-bucuresti-razvan-ristea',
//   '/fotograf-craiova-fotoali',
//   '/fotograf-onesti-dragoi-george-adrian',
//   '/fotograf-ploiesti-jo-photography',
//   '/fotograf-targoviste-bianca-sfetcu',
//   '/fotograf-miercurea-ciuc-david-foto-video',
// ]

// const templatePaths = [
//   // --- BOTEZ BĂIEȚI ---
//   '/invitatie-botez-online-baiat-astronaut',
//   '/invitatie-botez-online-baiat-masinuta',
//   '/invitatie-botez-online-baiat-steluta',
//   '/invitatie-botez-online-ursulet',

//   // --- BOTEZ FETIȚE ---
//   '/invitatie-botez-online-fata-baloane',
//   '/invitatie-botez-online-fata-fluture',

//   // --- ANIVERSĂRI / MAJORAT ---
//   '/invitatie-online-aniversare-majorat-18-ani',

//   // --- NUNȚI ---
//   '/invitatii-online-nunta-boho',
//   '/invitatii-online-nunta-lux',
//   '/invitatii-online-nunta-minimal',
//   '/invitatii-online-nunta-natura',
//   '/invitatii-online-nunta-romantic',
//   '/invitatii-online-nunta-royal',
// ]

// const pdfTemplatePaths = [
//   '/invitatie-nunta-de-vara',
//   '/invitatie-nunta-img-coral',
//   '/invitatie-nunta-pdf-auriu',
//   '/invitatie-nunta-pdf-simpla',
//   '/invitatie-nunta-poza',
//   '/invitatii-nunta-ocean',
// ]

// export default function sitemap(): MetadataRoute.Sitemap {
//   const baseSitemaps = publicPaths.map((path) => ({
//     url: `${SITE_DOMAIN}${path}`,
//     lastModified: new Date(),
//     changefreq: 'weekly' as const,
//     priority: path === '/' ? 1.0 : 0.7,
//   }))

//   const templateSitemaps = templatePaths.map((path) => ({
//     url: `${SITE_DOMAIN}${path}`,
//     lastModified: new Date(),
//     changefreq: 'weekly' as const,
//     priority: 0.8,
//   }))

//   const pdfTemplateSitemaps = pdfTemplatePaths.map((path) => ({
//     url: `${SITE_DOMAIN}${path}`,
//     lastModified: new Date(),
//     changefreq: 'weekly' as const,
//     priority: 0.8,
//   }))

//   const photographerSitemaps = photographerPaths.map((path) => ({
//     url: `${SITE_DOMAIN}${path}`,
//     lastModified: new Date(),
//     changefreq: 'weekly' as const,
//     priority: 0.9,
//   }))

//   return [...baseSitemaps, ...templateSitemaps, ...pdfTemplateSitemaps, ...photographerSitemaps]
// }
// andre/app/sitemap.ts
import type { MetadataRoute } from 'next'
import { SITE_DOMAIN } from '../constants/marketingDefaults'

const publicPaths = [
  { path: '/', priority: 1.0 },
  { path: '/preturi', priority: 0.7 },
  { path: '/contact', priority: 0.6 },
  { path: '/despre', priority: 0.6 },
  { path: '/gdpr', priority: 0.3 },
  { path: '/politica', priority: 0.3 },
  { path: '/cookies', priority: 0.3 },
  { path: '/termeni', priority: 0.3 },
  { path: '/invitatii-digitale', priority: 0.9 },
  { path: '/invitatii-PDF', priority: 0.9 },
]

const photographerPaths = [
  '/fotograf-bacau-tr-visuals',
  '/fotograf-bucuresti-razvan-ristea',
  '/fotograf-craiova-fotoali',
  '/fotograf-onesti-dragoi-george-adrian',
  '/fotograf-ploiesti-jo-photography',
  '/fotograf-targoviste-bianca-sfetcu',
  '/fotograf-miercurea-ciuc-david-foto-video',
]

const templatePaths = [
  '/invitatie-botez-online-baiat-astronaut',
  '/invitatie-botez-online-baiat-masinuta',
  '/invitatie-botez-online-baiat-steluta',
  '/invitatie-botez-online-ursulet',
  '/invitatie-botez-online-fata-baloane',
  '/invitatie-botez-online-fata-fluture',
  '/invitatie-online-aniversare-majorat-18-ani',
  '/invitatii-online-nunta-boho',
  '/invitatii-online-nunta-lux',
  '/invitatii-online-nunta-minimal',
  '/invitatii-online-nunta-natura',
  '/invitatii-online-nunta-romantic',
  '/invitatii-online-nunta-royal',
]

const pdfTemplatePaths = [
  '/invitatie-nunta-de-vara',
  '/invitatie-nunta-img-coral',
  '/invitatie-nunta-pdf-auriu',
  '/invitatie-nunta-pdf-simpla',
  '/invitatie-nunta-poza',
  '/invitatii-nunta-ocean',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const baseSitemaps = publicPaths.map(({ path, priority }) => ({
    url: `${SITE_DOMAIN}${path}`,
    lastModified: now,
    changefreq: 'weekly' as const,
    priority,
  }))

  const templateSitemaps = templatePaths.map((path) => ({
    url: `${SITE_DOMAIN}${path}`,
    lastModified: now,
    changefreq: 'weekly' as const,
    priority: 0.8,
  }))

  const pdfTemplateSitemaps = pdfTemplatePaths.map((path) => ({
    url: `${SITE_DOMAIN}${path}`,
    lastModified: now,
    changefreq: 'weekly' as const,
    priority: 0.8,
  }))

  const photographerSitemaps = photographerPaths.map((path) => ({
    url: `${SITE_DOMAIN}${path}`,
    lastModified: now,
    changefreq: 'weekly' as const,
    priority: 0.9,
  }))

  return [...baseSitemaps, ...templateSitemaps, ...pdfTemplateSitemaps, ...photographerSitemaps]
}