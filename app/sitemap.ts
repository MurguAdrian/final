import type { MetadataRoute } from 'next'
import { SITE_DOMAIN } from '../constants/marketingDefaults'

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

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths.map((path) => ({
    url: `${SITE_DOMAIN}${path}`,
    lastModified: new Date(),
    changefreq: 'weekly',
    priority: path === '/' ? 1 : 0.7,
  }))
}
