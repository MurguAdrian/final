import type { MetadataRoute } from 'next'
import { SITE_DOMAIN } from '../constants/marketingDefaults'

// Paginile de bază structurate pe nivele reale de importanță SEO
const mainPaths = [
  { path: '/', priority: 1.0 }, // Home-page-ul este întotdeauna regele
  { path: '/invitatii-digitale', priority: 0.7 },
  { path: '/invitatii-PDF', priority: 0.7 },
  { path: '/preturi', priority: 0.7 },
  { path: '/contact', priority: 0.5 },
  { path: '/despre', priority: 0.5 },
  { path: '/gdpr', priority: 0.3 },
  { path: '/politica', priority: 0.3 },
  { path: '/cookies', priority: 0.3 },
  { path: '/termeni', priority: 0.3 },
]

// Furnizori (Fotografi & Formații) - Prioritate mare
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

// Template-uri de invitații Online / Digitale - PRIMORDIALE (0.9)
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

// Paginile de invitații din directoarele noi (Nuntă / Botez standard) - PRIMORDIALE (0.9)
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

  // 1. Pagini structurate (1.0, 0.7, 0.5, 0.3)
  const baseSitemaps = mainPaths.map(({ path, priority }) => ({
    url: `${SITE_DOMAIN}${path}`,
    lastModified: now,
    changefreq: 'weekly' as const,
    priority,
  }))

  // 2. Furnizori (0.9)
  const providerSitemaps = providerPaths.map((path) => ({
    url: `${SITE_DOMAIN}${path}`,
    lastModified: now,
    changefreq: 'daily' as const,
    priority: 0.9,
  }))

  // 3. Modele Invitații Online (0.9 - RIDICAT)
  const onlineTemplateSitemaps = templateOnlinePaths.map((path) => ({
    url: `${SITE_DOMAIN}${path}`,
    lastModified: now,
    changefreq: 'weekly' as const,
    priority: 0.9,
  }))

  // 4. Modele Noi Nuntă / Botez (0.9 - RIDICAT)
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