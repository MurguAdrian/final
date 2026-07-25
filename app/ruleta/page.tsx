'use client'

import { useState, useRef, useCallback } from 'react'

/* ═══════════════════════════════════════════════════════════════
   CONFIG — nume + câștigători ficși
═══════════════════════════════════════════════════════════════ */
const NAMES = [
  'Mădălina Câmpanu',
  'Serban Andreea',
  'Gabriella Badoi',
  'Roxana Dorobăț',
  'Adina Campanu',
  'Bianka Maria',
  'Dia Mylan',
  'Petronela Genoveva',
  'Mihaela Dorobăț',
]

const WINNERS = ['Mădălina Câmpanu', 'Serban Andreea']

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Sans:wght@400;500;600;700;800&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

:root{
  --orange:#FF6B00;
  --orange-light:#FF8C35;
  --orange-pale:#FFF4ED;
  --orange-border:rgba(255,107,0,.18);
  --ink:#1A1208;
  --ink-mid:rgba(26,18,8,.6);
  --ink-soft:rgba(26,18,8,.38);
  --bg:#FDFAF6;
  --white:#ffffff;
}

.rl-page{min-height:100vh;background:var(--bg);font-family:'DM Sans',sans-serif;color:var(--ink);position:relative;overflow:hidden;padding:48px 20px 90px;display:flex;flex-direction:column;align-items:center;}
.rl-page::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 680px 420px at 85% 0%,rgba(255,107,0,.08) 0%,transparent 60%),radial-gradient(ellipse 440px 320px at 10% 90%,rgba(255,107,0,.06) 0%,transparent 60%);pointer-events:none;}

.rl-eyebrow{position:relative;z-index:1;display:inline-flex;align-items:center;gap:8px;background:var(--orange-pale);border:1px solid var(--orange-border);border-radius:100px;padding:6px 16px 6px 12px;font-size:13px;font-weight:700;color:var(--orange);letter-spacing:.06em;text-transform:uppercase;margin-bottom:18px;}
.rl-eyebrow-dot{width:7px;height:7px;background:var(--orange);border-radius:50%;animation:rl-dot 1.8s ease-in-out infinite;}
@keyframes rl-dot{0%,100%{opacity:.4;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}

.rl-title{position:relative;z-index:1;font-family:'Cormorant Garamond',serif;font-weight:300;font-size:clamp(28px,6vw,44px);text-align:center;line-height:1.15;margin-bottom:8px;}
.rl-title strong{font-weight:700;color:var(--orange);}
.rl-sub{position:relative;z-index:1;font-size:15px;color:var(--ink-mid);text-align:center;margin-bottom:40px;}

.rl-wheel-wrap{position:relative;z-index:1;width:min(96vw,680px);aspect-ratio:1/1;margin-bottom:36px;}
.rl-pointer{position:absolute;top:-16px;left:50%;transform:translateX(-50%);width:0;height:0;border-left:20px solid transparent;border-right:20px solid transparent;border-top:34px solid var(--ink);z-index:10;filter:drop-shadow(0 4px 8px rgba(0,0,0,.3));}
.rl-pointer::after{content:'';position:absolute;top:-33px;left:-12px;width:24px;height:24px;border-radius:50%;background:var(--orange);border:4px solid var(--white);box-shadow:0 2px 10px rgba(0,0,0,.25);}

.rl-wheel-outer{width:100%;height:100%;border-radius:50%;padding:14px;background:linear-gradient(155deg,#FF6B00,#FF8C35);box-shadow:0 24px 70px rgba(255,107,0,.3),0 6px 20px rgba(0,0,0,.14);}
.rl-wheel-inner{width:100%;height:100%;border-radius:50%;background:var(--white);overflow:hidden;position:relative;box-shadow:0 0 0 6px var(--white) inset;}
.rl-wheel-svg{width:100%;height:100%;display:block;}
.rl-wheel-hub{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:76px;height:76px;border-radius:50%;background:var(--white);border:4px solid var(--orange);display:flex;align-items:center;justify-content:center;box-shadow:0 6px 20px rgba(0,0,0,.18);z-index:5;}
.rl-wheel-hub span{font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:700;font-size:16px;color:var(--orange);}

.rl-btn{position:relative;z-index:1;display:inline-flex;align-items:center;justify-content:center;gap:8px;background:var(--orange);color:#fff;padding:18px 40px;border-radius:100px;font-size:17px;font-weight:700;border:none;cursor:pointer;box-shadow:0 8px 28px rgba(255,107,0,.35);transition:transform .15s,opacity .2s;}
.rl-btn:active{transform:scale(.97);}
.rl-btn:disabled{opacity:.5;cursor:not-allowed;}
.rl-btn-secondary{background:var(--ink);box-shadow:0 8px 28px rgba(26,18,8,.28);}

.rl-result{position:relative;z-index:1;margin-top:28px;background:var(--white);border:1px solid var(--orange-border);border-radius:22px;padding:26px 40px;text-align:center;min-width:300px;box-shadow:0 12px 40px rgba(255,107,0,.14);animation:rl-pop .4s ease;}
@keyframes rl-pop{from{opacity:0;transform:scale(.9) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}
.rl-result-label{font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--orange);margin-bottom:8px;}
.rl-result-name{font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:700;color:var(--ink);}

.rl-history{position:relative;z-index:1;margin-top:32px;display:flex;flex-direction:column;gap:10px;width:100%;max-width:400px;}
.rl-history-item{display:flex;align-items:center;gap:12px;background:var(--white);border:1px solid rgba(26,18,8,.08);border-radius:14px;padding:14px 18px;}
.rl-history-num{width:32px;height:32px;border-radius:50%;background:var(--orange-pale);color:var(--orange);font-weight:800;font-size:14px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.rl-history-name{font-size:16px;font-weight:600;color:var(--ink);}

.rl-progress{position:relative;z-index:1;font-size:13px;font-weight:600;color:var(--ink-soft);margin-top:16px;}
`

/* ═══════════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════════ */
function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function segmentPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const p1 = polar(cx, cy, r, startAngle)
  const p2 = polar(cx, cy, r, endAngle)
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  return `M ${cx} ${cy} L ${p1.x} ${p1.y} A ${r} ${r} 0 ${largeArc} 1 ${p2.x} ${p2.y} Z`
}

const SIZE = 700
const CENTER = SIZE / 2
const RADIUS = SIZE / 2 - 8
const HUB_RADIUS = 46
const TEXT_START_R = HUB_RADIUS + 26
const TEXT_END_R = RADIUS - 22

const SEGMENT_COLORS = ['#FF6B00', '#1A1208', '#FF8C35', '#3A2B18']

function fontSizeFor(segCount: number) {
  if (segCount <= 5) return 24
  if (segCount <= 7) return 20
  if (segCount <= 9) return 17
  if (segCount <= 12) return 14
  return 12
}

/* ═══════════════════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function RuletaPage() {
  const [remaining, setRemaining] = useState<string[]>(NAMES)
  const [round, setRound] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [currentWinner, setCurrentWinner] = useState<string | null>(null)
  const [history, setHistory] = useState<string[]>([])
  const [finished, setFinished] = useState(false)
  const rotationRef = useRef(0)

  const totalRounds = WINNERS.length
  const segAngle = 360 / remaining.length
  const fontSize = fontSizeFor(remaining.length)
  const textLength = TEXT_END_R - TEXT_START_R

  const spin = useCallback(() => {
    if (spinning || finished) return
    setSpinning(true)
    setCurrentWinner(null)

    const target = WINNERS[round - 1]
    const targetIndex = remaining.indexOf(target)
    const safeIndex = targetIndex === -1 ? 0 : targetIndex
    const centerAngle = safeIndex * segAngle + segAngle / 2

    const targetFinalMod = (360 - centerAngle + 360) % 360
    const currentMod = ((rotationRef.current % 360) + 360) % 360
    const delta = (targetFinalMod - currentMod + 360) % 360
    const extraTurns = 6 + round

    const newRotation = rotationRef.current + extraTurns * 360 + delta
    rotationRef.current = newRotation
    setRotation(newRotation)

    setTimeout(() => {
      setSpinning(false)
      setCurrentWinner(target)
      setHistory((h) => [...h, target])
    }, 4200)
  }, [spinning, finished, round, remaining, segAngle])

  const next = useCallback(() => {
    if (round >= totalRounds) {
      setFinished(true)
      return
    }
    const winnerJustDrawn = currentWinner
    setRemaining((r) => r.filter((n) => n !== winnerJustDrawn))
    setRound((r) => r + 1)
    setCurrentWinner(null)
  }, [round, totalRounds, currentWinner])

  const reset = useCallback(() => {
    setRemaining(NAMES)
    setRound(1)
    setRotation(0)
    rotationRef.current = 0
    setSpinning(false)
    setCurrentWinner(null)
    setHistory([])
    setFinished(false)
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="rl-page">
        <span className="rl-eyebrow">
          <span className="rl-eyebrow-dot" />
          Extragere câștigător
        </span>

        <h1 className="rl-title">
          Extragere Câștigător <strong>{Math.min(round, totalRounds)}/{totalRounds} extrageri</strong>
        </h1>
        <p className="rl-sub">
          {finished ? 'Toate extragerile s-au încheiat.' : 'Apasă butonul pentru a învârti roata.'}
        </p>

        <div className="rl-wheel-wrap">
          <div className="rl-pointer" />
          <div className="rl-wheel-outer">
            <div className="rl-wheel-inner">
              <svg
                className="rl-wheel-svg"
                viewBox={`0 0 ${SIZE} ${SIZE}`}
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: spinning ? 'transform 4.1s cubic-bezier(0.15,0.65,0.15,1)' : 'none',
                }}
              >
                {remaining.map((name, i) => {
                  const start = i * segAngle
                  const end = start + segAngle
                  const mid = start + segAngle / 2
                  const fill = SEGMENT_COLORS[i % SEGMENT_COLORS.length]

                  // Text runs radially from near the hub out toward the rim,
                  // confined entirely inside this slice's angular boundaries.
                  const p0 = polar(CENTER, CENTER, TEXT_START_R, mid)
                  const rotateDeg = mid - 90

                  return (
                    <g key={name}>
                      <path
                        d={segmentPath(CENTER, CENTER, RADIUS, start, end)}
                        fill={fill}
                        stroke="#ffffff"
                        strokeWidth={3}
                      />
                      <text
                        x={p0.x}
                        y={p0.y}
                        fill="#ffffff"
                        fontSize={fontSize}
                        fontWeight={700}
                        fontFamily="'DM Sans',sans-serif"
                        textAnchor="start"
                        dominantBaseline="middle"
                        stroke="rgba(0,0,0,0.28)"
                        strokeWidth={0.7}
                        paintOrder="stroke"
                        textLength={textLength}
                        lengthAdjust="spacingAndGlyphs"
                        transform={`rotate(${rotateDeg}, ${p0.x}, ${p0.y})`}
                      >
                        {name}
                      </text>
                    </g>
                  )
                })}
              </svg>
            </div>
          </div>
          <div className="rl-wheel-hub">
            <span>VI</span>
          </div>
        </div>

        {!finished && (
          <>
            {!currentWinner && (
              <button className="rl-btn" onClick={spin} disabled={spinning}>
                {spinning ? 'Se învârte…' : '✨ Învârte roata'}
              </button>
            )}

            {currentWinner && (
              <>
                <div className="rl-result">
                  <div className="rl-result-label">Câștigător extragerea {round}</div>
                  <div className="rl-result-name">{currentWinner}</div>
                </div>
                <button className="rl-btn rl-btn-secondary" style={{ marginTop: 20 }} onClick={next}>
                  {round >= totalRounds ? 'Finalizează' : 'Continuă la extragerea următoare →'}
                </button>
              </>
            )}

            <div className="rl-progress">
              Extragerea {round} din {totalRounds}
            </div>
          </>
        )}

        {finished && (
          <button className="rl-btn" onClick={reset}>
            🔁 Reîncepe
          </button>
        )}

        {history.length > 0 && (
          <div className="rl-history">
            {history.map((name, i) => (
              <div key={name} className="rl-history-item">
                <div className="rl-history-num">{i + 1}</div>
                <div className="rl-history-name">{name}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}