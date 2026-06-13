import type { MetadataRoute } from 'next'
import { SITE_DOMAIN } from '../constants/marketingDefaults'

// Paginile tale clasice de prezentare și legale
const publicPaths = [
  '/',
  '/preturi',
  '/contact',
  '/despre',
  '/gdpr',
  '/politica',
  '/cookies',
  '/invitatii-digitale',
  '/invitatii-PDF',
]

// Paginile tale comerciale (Șabloanele) care TREBUIE să aducă trafic masiv din Google
const templatePaths = [
  // --- BOTEZ BĂIEȚI ---
  '/invitatie-botez-online-baiat-astronaut',
  '/invitatie-botez-online-baiat-masinuta',
  '/invitatie-botez-online-baiat-steluta',
  '/invitatie-botez-online-ursulet',

  // --- BOTEZ FETIȚE ---
  '/invitatie-botez-online-fata-baloane',
  '/invitatie-botez-online-fata-fluture',

  // --- ANIVERSĂRI / MAJORAT ---
  '/invitatie-online-aniversare-majorat-18-ani',

  // --- NUNȚI ---
  '/invitatii-online-nunta-boho',
  '/invitatii-online-nunta-lux',
  '/invitatii-online-nunta-minimal',
  '/invitatii-online-nunta-natura',
  '/invitatii-online-nunta-romantic',
  '/invitatii-online-nunta-royal',
]

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. Generăm sitemap-ul pentru paginile de bază
  const baseSitemaps = publicPaths.map((path) => ({
    url: `${SITE_DOMAIN}${path}`,
    lastModified: new Date(),
    changefreq: 'weekly' as const,
    priority: path === '/' ? 1.0 : 0.7,
  }))

  // 2. Generăm sitemap-ul pentru șabloane (le dăm prioritate 0.8 pentru că ele aduc conversiile și traficul)
  const templateSitemaps = templatePaths.map((path) => ({
    url: `${SITE_DOMAIN}${path}`,
    lastModified: new Date(),
    changefreq: 'weekly' as const,
    priority: 0.8, // Prioritate ridicată pentru ca Google să le trateze ca pagini importante de produs
  }))

  // 3. Combinăm ambele liste într-un singur sitemap mare și complet
  return [...baseSitemaps, ...templateSitemaps]
}