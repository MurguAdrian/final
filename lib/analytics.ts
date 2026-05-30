/**
 * Analytics Helper — Wrapper pentru Google Analytics 4 Event Tracking
 * Funcționa DOAR dacă utilizatorul a acceptat cookie-urile analytics
 */

export type EventName =
  | 'view_homepage'
  | 'click_create_invitation'
  | 'theme_selected'
  | 'form_started'
  | 'form_completed'
  | 'begin_checkout'
  | 'payment_completed'
  | 'email_opened'
  | 'setup_password_completed'
  | 'rsvp_submitted'
  | 'excel_exported'
  | 'invitation_link_opened'
  | 'rsvp_confirmed'
  | 'photo_uploaded'
  | 'qr_menu_scanned'
  | 'map_accessed'
  | 'purchase'
  | 'account_deleted'
  | 'account_exported'
  | string;

export type EventParamValue =
  | string
  | number
  | boolean
  | undefined
  | EventParamValue[]
  | { [key: string]: EventParamValue };

export interface EventData {
  [key: string]: EventParamValue;
}

/**
 * Track a custom event in Google Analytics 4
 * 
 * @param eventName - Name of the event to track
 * @param eventData - Optional additional data to include with the event
 * 
 * @example
 * trackEvent('theme_selected', { theme_name: 'Lux' });
 * trackEvent('begin_checkout', { price: 300, currency: 'RON' });
 */
export function trackEvent(eventName: EventName, eventData?: EventData): void {
  if (typeof window === 'undefined') {
    return; // SSR guard
  }

  // Check if gtag is available (only if user accepted analytics consent)
  if (typeof window.gtag !== 'function') {
    console.debug(`[Analytics] gtag not available. Event "${eventName}" not tracked.`);
    return;
  }

  try {
    window.gtag('event', eventName, eventData || {});
    console.debug(`[Analytics] Event tracked: "${eventName}"`, eventData);
  } catch (error) {
    console.error(`[Analytics] Failed to track event "${eventName}":`, error);
  }
}

/**
 * Track a purchase/conversion event (e-commerce)
 * Used for Stripe checkout completion
 */
export function trackPurchase(data: {
  value: number;
  currency: string;
  transaction_id?: string;
  theme_name?: string;
}): void {
  trackEvent('purchase', {
    value: data.value,
    currency: data.currency,
    transaction_id: data.transaction_id,
    items: [
      {
        item_name: data.theme_name || 'Invitation Package',
        price: data.value,
        currency: data.currency,
        quantity: 1,
      },
    ],
  });
}

/**
 * Track a RSVP submission
 */
export function trackRSVP(data: {
  is_coming: boolean;
  guests_count?: number;
  has_plus_one?: boolean;
  has_dietary_preferences?: boolean;
}): void {
  trackEvent('rsvp_submitted', data);
}

/**
 * Track a photo upload
 */
export function trackPhotoUpload(data: {
  file_size_mb: number;
  upload_duration_ms?: number;
  success: boolean;
}): void {
  trackEvent('photo_uploaded', data);
}

/**
 * Track page view (usually automatic in GA4, but can be explicit)
 */
export function trackPageView(page_title?: string, page_path?: string): void {
  trackEvent('page_view', {
    page_title,
    page_path,
  });
}

/**
 * Declare global gtag for TypeScript
 */
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export default {
  trackEvent,
  trackPurchase,
  trackRSVP,
  trackPhotoUpload,
  trackPageView,
};
