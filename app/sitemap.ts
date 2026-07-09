import type { MetadataRoute } from 'next'
import { SITE_DOMAIN } from '../constants/marketingDefaults'

// Paginile statice publice ale aplicației
const mainPaths = [
  { path: '/', priority: 1.0 },
  { path: '/invitatii-digitale', priority: 0.8 },
  { path: '/invitatii-PDF', priority: 0.8 },
  { path: '/servicii-nunta', priority: 0.8 }, // Adăugat acum din folderele tale
  { path: '/preturi', priority: 0.7 },
  { path: '/contact', priority: 0.5 },
  { path: '/despre', priority: 0.5 },
  { path: '/gdpr', priority: 0.3 },
  { path: '/politica', priority: 0.3 },
  { path: '/cookies', priority: 0.3 },
  { path: '/termeni', priority: 0.3 },
]

// Furnizorii din Marketplace (0.9)
const providerPaths = [
  '/fotograf-bacau-tr-visuals',
  '/fotograf-brasov-ireph-graphy',
  '/fotograf-bucuresti-razvan-ristea',
  '/fotograf-craiova-fotoali',
  '/fotograf-ilfov-dgc-media-wedding',
  '/fotograf-miercurea-ciuc-david-foto-video',
  '/fotograf-onesti-dragoi-george-adrian',
  '/fotograf-ploiesti-jo-photography',
  '/fotograf-targoviste-bianca-sfetcu',
  '/formatie-bucuresti-iordanescu-orchestra',
]

// Modelele Digitale de Invitații (0.9)
const templateOnlinePaths = [
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

// Modelele Fizice / Printabile / PDF (0.9)
const newTemplatePaths = [
  '/invitatie-botez-baiat-astronaut',
  '/invitatie-botez-baieti-masina',
  '/invitatie-botez-baieti-pirat',
  '/invitatie-botez-fete-baloane',
  '/invitatie-botez-fete-castel',
  '/invitatie-botez-fete-roz',
  '/invitatie-nunta-casa',
  '/invitatie-nunta-de-vara',
  '/invitatie-nunta-img-coral',
  '/invitatie-nunta-pdf-auriu',
  '/invitatie-nunta-pdf-simpla',
  '/invitatie-nunta-poza',
  '/invitatie-nunta-rustic',
  '/invitatie-nunta-sub-stele',
  '/invitatii-nunta-ocean',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const baseSitemaps = mainPaths.map(({ path, priority }) => ({
    url: `${SITE_DOMAIN}${path}`,
    lastModified: now,
    changefreq: 'weekly' as const,
    priority,
  }))

  const providerSitemaps = providerPaths.map((path) => ({
    url: `${SITE_DOMAIN}${path}`,
    lastModified: now,
    changefreq: 'daily' as const,
    priority: 0.9,
  }))

  const onlineTemplateSitemaps = templateOnlinePaths.map((path) => ({
    url: `${SITE_DOMAIN}${path}`,
    lastModified: now,
    changefreq: 'weekly' as const,
    priority: 0.9,
  }))

  const newTemplateSitemaps = newTemplatePaths.map((path) => ({
    url: `${SITE_DOMAIN}${path}`,
    lastModified: now,
    changefreq: 'weekly' as const,
    priority: 0.9,
  }))

  return [
    ...baseSitemaps,
    ...providerSitemaps,
    ...onlineTemplateSitemaps,
    ...newTemplateSitemaps
  ]
}