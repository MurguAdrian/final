// Centralized marketing defaults and domain enforcement
export const SITE_DOMAIN = 'https://www.vibeinvite.ro'

// MODIFICAT: Schimbat din /social/og-image.png în /og-main.png (pentru folderul public)
export const DEFAULT_OG = SITE_DOMAIN + '/og-main.png'

// MODIFICAT: Corectat dimensiunile standard pentru social-media/Google
export const OG_WIDTH = 1200
export const OG_HEIGHT = 630 // <-- Schimbat în 630, dimensiunea reală a imaginii tale

export default {
  SITE_DOMAIN,
  DEFAULT_OG,
  OG_WIDTH,
  OG_HEIGHT
}