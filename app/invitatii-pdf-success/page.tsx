'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=EB+Garamond:ital,wght@0,400;1,400&display=swap');
.su * { box-sizing: border-box; margin: 0; padding: 0; }
.su { font-family: 'EB Garamond', serif; background: #FDFAF6; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 40px 24px; }
.su-card { background: #fff; border: 1px solid rgba(201,168,76,.3); border-radius: 16px; padding: 52px 48px; max-width: 480px; width: 100%; text-align: center; box-shadow: 0 0 0 6px #FDFAF6, 0 0 0 7px rgba(201,168,76,.2); }
.su-icon { font-size: 48px; margin-bottom: 16px; }
.su-h1 { font-family: 'Cinzel', serif; font-size: 22px; font-weight: 400; letter-spacing: .1em; color: #1A1208; margin-bottom: 10px; }
.su-sub { font-size: 15px; color: rgba(26,18,8,.55); line-height: 1.7; margin-bottom: 8px; font-style: italic; }
.su-status { font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: .08em; color: #C9A84C; margin-bottom: 28px; min-height: 18px; }
.su-divider { width: 60%; height: 1px; margin: 0 auto 28px; background: linear-gradient(90deg, transparent, #C9A84C 30%, #C9A84C 70%, transparent); opacity: .4; }
.su-btn { display: block; width: 100%; padding: 14px; border-radius: 8px; font-family: 'Cinzel', serif; font-size: 13px; letter-spacing: .1em; font-weight: 600; cursor: pointer; text-decoration: none; transition: opacity .2s, transform .15s; margin-bottom: 10px; }
.su-btn:hover { opacity: .88; transform: translateY(-1px); }
.su-btn-pdf { background: #C9A84C; color: #1A1208; border: none; }
.su-btn-jpg { background: transparent; color: #C9A84C; border: 2px solid #C9A84C; }
.su-note { font-size: 11px; color: rgba(26,18,8,.4); margin-top: 16px; font-style: italic; line-height: 1.6; }
@media (max-width: 480px) { .su-card { padding: 36px 24px; } }
`

function SuccessContent() {
  const params = useSearchParams()
  const sessionId = params.get('session_id')

  const pdfUrl = sessionId ? `/api/invitatii-pdf/download?session_id=${sessionId}&format=pdf` : ''
  const jpgUrl = sessionId ? `/api/invitatii-pdf/download?session_id=${sessionId}&format=jpg` : ''

  useEffect(() => {
    if (!sessionId) return

    // auto-download PDF imediat, JPG după 3s
    const triggerDownload = (url: string, name: string) => {
      const a = document.createElement('a')
      a.href = url
      a.download = name
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }

    const t1 = setTimeout(() => triggerDownload(pdfUrl, 'invitatie.pdf'), 800)
    const t2 = setTimeout(() => triggerDownload(jpgUrl, 'invitatie.jpg'), 4000)

    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [sessionId, pdfUrl, jpgUrl])

  if (!sessionId) {
    return (
      <div className="su-card">
        <p className="su-sub">Link invalid sau sesiune expirată.</p>
      </div>
    )
  }

  return (
    <div className="su-card">
      <div className="su-icon">✨</div>
      <h1 className="su-h1">Mulțumim!</h1>
      <p className="su-sub">Plata a fost confirmată. Fișierele se descarcă automat.</p>
      <p className="su-status">PDF → acum &nbsp;·&nbsp; JPG → în câteva secunde</p>
      <div className="su-divider" />
      <a href={pdfUrl} className="su-btn su-btn-pdf" download="invitatie.pdf">↓ Descarcă PDF</a>
      <a href={jpgUrl} className="su-btn su-btn-jpg" download="invitatie.jpg">↓ Descarcă JPG</a>
      <p className="su-note">
        Dacă descărcările nu pornesc automat, apasă butoanele de mai sus.<br />
        Păstrează acest link — poți descărca din nou oricând.
      </p>
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
