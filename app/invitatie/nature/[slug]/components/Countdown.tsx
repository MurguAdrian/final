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
    const t = setTimeout(() => setFlipS(false), 155);
    return () => clearTimeout(t);
  }, [timeLeft?.secunde]);

  if (!timeLeft) return null;
  if (timeLeft === 0) return (
    <div style={{ color: '#3A5E33', fontFamily: "'Cinzel', serif", letterSpacing: '.2em', fontSize: 'clamp(12px,1.4vw,14px)', marginTop: 30, textAlign: 'center' }}>
      EVENIMENTUL A ÎNCEPUT! ✦
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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400&family=Cinzel:wght@400&display=swap');
        .nat-countdown-wrap { display: flex; gap: 0; justify-content: center; background: rgba(255,255,255,.52); border: 1px solid rgba(154,123,63,.15); border-radius: 22px; padding: 22px 10px; max-width: 440px; margin-left: auto; margin-right: auto; position: relative; overflow: hidden; backdrop-filter: blur(12px); box-shadow: 0 6px 28px rgba(0,0,0,.05); overscroll-behavior: contain; }
        .nat-countdown-top-line { position: absolute; top: 0; left: 10%; right: 10%; height: 1px; background: linear-gradient(90deg, transparent, rgba(154,123,63,.4), transparent); }
        .nat-countdown-bottom-line { position: absolute; bottom: 0; left: 10%; right: 10%; height: 1px; background: linear-gradient(90deg, transparent, rgba(154,123,63,.4), transparent); }
        .nat-countdown-unit { flex: 1; text-align: center; padding: 0 4px; border-right: 1px solid rgba(154,123,63,.18); }
        .nat-countdown-unit:last-child { border-right: none; }
        .nat-countdown-number { display: block; font-family: 'Cormorant', serif; font-size: clamp(36px, 5.8vw, 58px); font-weight: 300; line-height: 1; color: #1C2218; transition: transform .15s ease, color .15s ease; }
        .nat-countdown-number.flip { transform: scale(1.1) translateY(-3px); color: #3A5E33; }
        .nat-countdown-label { font-family: 'Cinzel', serif; font-size: clamp(6px, .85vw, 8.5px); letter-spacing: .14em; text-transform: uppercase; color: #6B7A5E; display: block; margin-top: 3px; }
        .nat-countdown-eyebrow { font-family: 'Cinzel', serif; font-size: clamp(7px, .95vw, 9.5px); letter-spacing: .26em; text-transform: uppercase; color: #9A7B3F; text-align: center; margin-bottom: 14px; display: block; opacity: .78; }
      `}</style>
      <div style={{ marginTop: 30 }}>
        <span className="nat-countdown-eyebrow">Timp Rămas Până La Marele Eveniment</span>
        <div className="nat-countdown-wrap">
          <div className="nat-countdown-top-line" />
          <div className="nat-countdown-bottom-line" />
          {units.map(u => (
            <div key={u.label} className="nat-countdown-unit">
              <span className={`nat-countdown-number${u.flip ? ' flip' : ''}`}>{u.value}</span>
              <span className="nat-countdown-label">{u.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
