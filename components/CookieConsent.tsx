
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type ConsentChoice = 'accepted' | 'rejected' | null;

export default function CookieConsent() {
  const [consent, setConsent] = useState<ConsentChoice>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'no' } | null>(null);

  useEffect(() => {
    const savedConsent = localStorage.getItem('cookie_consent') as ConsentChoice;
    if (savedConsent) {
      setConsent(savedConsent);
      if (savedConsent === 'accepted') loadGoogleAnalytics();
    } else {
      setShowBanner(true);
    }
  }, []);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2800);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const loadGoogleAnalytics = () => {
    if (typeof window !== 'undefined') {
      const gtmScript = document.createElement('script');
      gtmScript.async = true;
      gtmScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-PRLZS5WHS8';
      document.head.appendChild(gtmScript);
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) { window.dataLayer.push(args); }
      gtag('js', new Date());
      gtag('config', 'G-PRLZS5WHS8', { anonymize_ip: true, allow_google_signals: false });
      (window as any).gtag = gtag;
    }
  };

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setConsent('accepted');
    setShowBanner(false);
    loadGoogleAnalytics();
    setToast({ msg: 'Analytics acceptat — mulțumim!', type: 'ok' });
  };

  const handleReject = () => {
    localStorage.setItem('cookie_consent', 'rejected');
    setConsent('rejected');
    setShowBanner(false);
    setToast({ msg: 'Analytics refuzat — înțeles.', type: 'no' });
  };

  const handleDismiss = () => setShowBanner(false);

  return (
    <>
      <style>{`
        @keyframes cc-slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes cc-shimmer {
          0%   { background-position: 0 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes cc-toastIn {
          from { transform: translateX(-50%) translateY(-20px); opacity: 0; }
          to   { transform: translateX(-50%) translateY(0);     opacity: 1; }
        }
        .cc-banner {
          animation: cc-slideUp .35s cubic-bezier(.22,.68,0,1.2) forwards;
        }
        .cc-accent {
          height: 3px;
          background: linear-gradient(90deg, #FF6B00, #FF8C35, #FF6B00);
          background-size: 200% 100%;
          animation: cc-shimmer 3s linear infinite;
        }
        .cc-toast {
          animation: cc-toastIn .3s cubic-bezier(.22,.68,0,1.2) forwards;
        }
        .cc-btn-accept:hover { background: #e85e00 !important; transform: translateY(-1px); }
        .cc-btn-accept:active { transform: translateY(0); }
        .cc-btn-reject:hover { background: #f3f4f6 !important; }
        .cc-close:hover { background: #f3f4f6 !important; }
        .cc-pill { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; color: #6b7280; background: #f9fafb; border: 0.5px solid #e5e7eb; border-radius: 100px; padding: 3px 10px; }
        .cc-link { font-size: 11px; color: #9ca3af; text-decoration: none; transition: color .15s; }
        .cc-link:hover { color: #6b7280; }
      `}</style>

      {/* Toast */}
      {toast && (
        <div
          className="cc-toast"
          style={{
            position: 'fixed', top: 24, left: '50%', zIndex: 9999,
            background: '#fff', border: '0.5px solid #e5e7eb',
            borderRadius: 12, padding: '10px 18px',
            display: 'flex', alignItems: 'center', gap: 10,
            fontSize: 13, color: '#111827',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            whiteSpace: 'nowrap',
          }}
          role="status"
          aria-live="polite"
        >
          <span style={{ fontSize: 16, color: toast.type === 'ok' ? '#1D9E75' : '#6b7280' }}>
            {toast.type === 'ok' ? '✓' : '✕'}
          </span>
          {toast.msg}
        </div>
      )}

      {/* Banner */}
      {showBanner && consent === null && (
        <div
          style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9990,
            display: 'flex', justifyContent: 'center',
            padding: '0 16px',
          }}
          role="region"
          aria-label="Cookie Consent"
        >
          <div
            className="cc-banner"
            style={{
              width: '100%', maxWidth: 860,
              background: '#fff',
              borderRadius: '20px 20px 0 0',
              border: '0.5px solid #e5e7eb',
              borderBottom: 'none',
              overflow: 'hidden',
            }}
          >
            {/* Accent bar */}
            <div className="cc-accent" />

            <div style={{ padding: '20px 24px 24px' }}>

              {/* Top row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 14 }}>
                {/* Icon */}
                <div style={{
                  width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                  background: '#fff4ed', border: '0.5px solid #fed7aa',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20,
                }}>
                  🍪
                </div>

                {/* Text */}
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#111827', marginBottom: 4 }}>
                    Cookie-uri &amp; Analytics
                  </p>
                  <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6 }}>
                    Folosim cookie-uri necesare pentru funcționare și, opțional,{' '}
                    <strong style={{ color: '#374151', fontWeight: 600 }}>Google Analytics</strong>{' '}
                    cu IP anonimizat pentru a înțelege cum este folosit site-ul.
                  </p>
                </div>

                {/* Close */}
                <button
                  onClick={handleDismiss}
                  className="cc-close"
                  aria-label="Închide banner"
                  style={{
                    width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                    background: 'transparent', border: '0.5px solid #e5e7eb',
                    cursor: 'pointer', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', color: '#9ca3af', fontSize: 14,
                    transition: 'background .15s',
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 18 }}>
                <span className="cc-pill">🛡️ Necesare (mereu active)</span>
                <span className="cc-pill">📊 Google Analytics (opțional)</span>
                <span className="cc-pill">👁️ IP anonimizat</span>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button
                  onClick={handleReject}
                  className="cc-btn-reject"
                  aria-label="Refuză analytics cookies"
                  style={{
                    flex: '1 1 130px',
                    padding: '10px 18px', borderRadius: 12,
                    background: '#f9fafb', border: '0.5px solid #e5e7eb',
                    color: '#6b7280', fontSize: 13, fontWeight: 500,
                    cursor: 'pointer', transition: 'background .15s',
                  }}
                >
                  Refuză Analytics
                </button>
                <button
                  onClick={handleAccept}
                  className="cc-btn-accept"
                  aria-label="Acceptă toate cookie-urile"
                  style={{
                    flex: '2 1 160px',
                    padding: '10px 22px', borderRadius: 12,
                    background: '#FF6B00', border: 'none',
                    color: '#fff', fontSize: 13, fontWeight: 500,
                    cursor: 'pointer', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', gap: 8,
                    transition: 'background .15s, transform .1s',
                  }}
                >
                  ✓ Acceptă tot
                </button>
              </div>

              {/* Links */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 14 }}>
                <Link href="/cookies" className="cc-link">Politica Cookie</Link>
                <span style={{ color: '#e5e7eb', fontSize: 11 }}>·</span>
                <Link href="/politica" className="cc-link">Confidențialitate</Link>
                <span style={{ color: '#e5e7eb', fontSize: 11 }}>·</span>
                <Link href="/gdpr" className="cc-link">GDPR</Link>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export function trackEvent(eventName: string, eventData?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventData || {});
  }
}
