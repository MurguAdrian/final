"use client";
import React, { useState, useEffect } from 'react';

export default function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<any>(null);
  const [flipS, setFlipS] = useState(false);

  useEffect(() => {
    const calculate = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          zile: Math.floor(difference / (1000 * 60 * 60 * 24)),
          ore: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minute: Math.floor((difference / 1000 / 60) % 60),
          secunde: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft(0);
      }
    };
    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  useEffect(() => {
    if (!timeLeft || timeLeft === 0) return;
    setFlipS(true);
    const t = setTimeout(() => setFlipS(false), 160);
    return () => clearTimeout(t);
  }, [timeLeft?.secunde]);

  if (!timeLeft) return null;
  if (timeLeft === 0) return (
    <div style={{ color: '#A63248', fontFamily: "'Cinzel', serif", letterSpacing: '.2em', fontSize: 'clamp(12px,1.4vw,14px)', marginTop: 30 }}>
      EVENIMENTUL A ÎNCEPUT! ♥
    </div>
  );

  const pad = (n: number) => String(n).padStart(2, '0');
  const units = [
    { label: 'ZILE', value: pad(timeLeft.zile), flip: false },
    { label: 'ORE', value: pad(timeLeft.ore), flip: false },
    { label: 'MIN', value: pad(timeLeft.minute), flip: false },
    { label: 'SEC', value: pad(timeLeft.secunde), flip: flipS },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400&family=Cinzel:wght@400&display=swap');
        .rm-countdown-wrap { display: flex; gap: 0; justify-content: center; margin-top: 32px; background: rgba(232,160,168,.08); border: 1px solid rgba(196,80,106,.18); border-radius: 16px; padding: 20px 10px; max-width: 420px; margin-left: auto; margin-right: auto; position: relative; overflow: hidden; overscroll-behavior: contain; }
        .rm-countdown-top-line { position: absolute; top: 0; left: 10%; right: 10%; height: 1px; background: linear-gradient(90deg, transparent, rgba(196,80,106,.35), transparent); }
        .rm-countdown-bottom-line { position: absolute; bottom: 0; left: 10%; right: 10%; height: 1px; background: linear-gradient(90deg, transparent, rgba(196,80,106,.35), transparent); }
        .rm-countdown-unit { flex: 1; text-align: center; padding: 0 4px; border-right: 1px solid rgba(196,80,106,.12); }
        .rm-countdown-unit:last-child { border-right: none; }
        .rm-countdown-number { display: block; font-family: 'Cormorant Garamond', serif; font-size: clamp(36px, 6vw, 58px); font-weight: 300; line-height: 1; color: #A63248; transition: transform .15s ease, color .15s ease; }
        .rm-countdown-number.flip { transform: scale(1.08) translateY(-3px); color: #7B1A2E; text-shadow: 0 0 20px rgba(166,50,72,.3); }
        .rm-countdown-label { font-family: 'Cinzel', serif; font-size: clamp(6px, .8vw, 8px); letter-spacing: .18em; text-transform: uppercase; color: rgba(166,50,72,.5); display: block; margin-top: 4px; }
        .rm-countdown-eyebrow { font-family: 'Cinzel', serif; font-size: clamp(7px, .9vw, 9px); letter-spacing: .3em; text-transform: uppercase; color: rgba(166,50,72,.6); text-align: center; margin-bottom: 14px; display: block; }
      `}</style>
      <div style={{ marginTop: 30 }}>
        <span className="rm-countdown-eyebrow">Timp Rămas Până La Ziua Iubirii</span>
        <div className="rm-countdown-wrap">
          <div className="rm-countdown-top-line"/>
          <div className="rm-countdown-bottom-line"/>
          {units.map(u => (
            <div key={u.label} className="rm-countdown-unit">
              <span className={`rm-countdown-number${u.flip ? ' flip' : ''}`}>{u.value}</span>
              <span className="rm-countdown-label">{u.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
