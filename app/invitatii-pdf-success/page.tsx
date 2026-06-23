'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=EB+Garamond:ital,wght@0,400;1,400&display=swap');
.su * { box-sizing: border-box; margin: 0; padding: 0; }
.su { font-family: 'EB Garamond', serif; background: #FDFAF6; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 40px 24px; }
.su-card { background: #fff; border: 1px solid rgba(201,168,76,.3); border-radius: 16px; padding: 48px 40px; max-width: 480px; width: 100%; text-align: center; box-shadow: 0 0 0 6px #FDFAF6, 0 0 0 7px rgba(201,168,76,.2); }
.su-icon { font-size: 48px; margin-bottom: 16px; }
.su-h1 { font-family: 'Cinzel', serif; font-size: 22px; font-weight: 400; letter-spacing: .1em; color: #1A1208; margin-bottom: 10px; }
.su-sub { font-size: 15px; color: rgba(26,18,8,.55); line-height: 1.7; margin-bottom: 28px; font-style: italic; }
.su-divider { width: 60%; height: 1px; margin: 0 auto 24px; background: linear-gradient(90deg, transparent, #C9A84C 30%, #C9A84C 70%, transparent); opacity: .4; }
.su-btn { display: block; width: 100%; padding: 14px; border-radius: 8px; font-family: 'Cinzel', serif; font-size: 13px; letter-spacing: .1em; font-weight: 600; cursor: pointer; text-decoration: none; transition: opacity .2s, transform .15s; margin-bottom: 10px; }
.su-btn:hover { opacity: .88; transform: translateY(-1px); }
.su-btn-pdf { background: #C9A84C; color: #1A1208; border: none; }
.su-btn-jpg { background: transparent; color: #C9A84C; border: 2px solid #C9A84C; }
.su-ios-hint { font-size: 12px; color: rgba(26,18,8,.45); margin-top: 20px; line-height: 1.7; font-style: italic; background: rgba(201,168,76,.06); border: 1px solid rgba(201,168,76,.2); border-radius: 8px; padding: 12px 16px; text-align: left; }
.su-ios-hint strong { font-style: normal; color: #8B6914; display: block; margin-bottom: 4px; font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: .08em; }
.su-note { font-size: 11px; color: rgba(26,18,8,.4); margin-top: 14px; font-style: italic; }
@media (max-width: 480px) { .su-card { padding: 36px 20px; } }
`

function SuccessContent() {
  const params = useSearchParams()
  const sessionId = params.get('session_id')

  if (!sessionId) {
    return (
      <div className="su-card">
        <p className="su-sub">Link invalid sau sesiune expirată.</p>
      </div>
    )
  }

  const pdfUrl = `/api/invitatii-pdf/download?session_id=${sessionId}&format=pdf`
  const jpgUrl = `/api/invitatii-pdf/download?session_id=${sessionId}&format=jpg`

  return (
    <div className="su-card">
      <div className="su-icon">✨</div>
      <h1 className="su-h1">Mulțumim!</h1>
      <p className="su-sub">Plata a fost confirmată. Invitația ta este gata.</p>
      <div className="su-divider" />
      <a href={pdfUrl} className="su-btn su-btn-pdf" target="_blank" rel="noopener noreferrer">
        ↓ Deschide PDF
      </a>
      <a href={jpgUrl} className="su-btn su-btn-jpg" target="_blank" rel="noopener noreferrer">
        ↓ Deschide JPG (pentru Poze)
      </a>
      <div className="su-ios-hint">
        <strong>📱 Pe iPhone / iPad:</strong>
        Apasă butonul de mai sus → fișierul se deschide în browser → apasă iconița de Share (pătrățel cu săgeată) → „Save to Photos" pentru JPG sau „Save to Files" pentru PDF.
      </div>
      <p className="su-note">Păstrează acest link — poți descărca din nou oricând.</p>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="su">
        <Suspense fallback={<div className="su-card"><p>Se încarcă...</p></div>}>
          <SuccessContent />
        </Suspense>
      </div>
    </>
  )
}
