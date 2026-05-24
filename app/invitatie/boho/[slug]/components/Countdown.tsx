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
    <div style={{ color: '#C17F3E', fontFamily: "'EB Garamond', serif", letterSpacing: '.2em', fontSize: 'clamp(12px,1.4vw,14px)', marginTop: 30, fontStyle: 'italic' }}>
      EVENIMENTUL A ÎNCEPUT! ✿
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
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        .bh-countdown-wrap { display: flex; gap: 0; justify-content: center; margin-top: 32px; background: rgba(255,250,240,.65); border: 1.5px solid rgba(193,127,62,.2); border-radius: 24px; padding: 20px 10px; max-width: 420px; margin-left: auto; margin-right: auto; position: relative; overflow: hidden; overscroll-behavior: contain; backdrop-filter: blur(8px); }
        .bh-countdown-top-line { position: absolute; top: 0; left: 10%; right: 10%; height: 1px; background: linear-gradient(90deg, transparent, rgba(193,127,62,.35), transparent); }
        .bh-countdown-bottom-line { position: absolute; bottom: 0; left: 10%; right: 10%; height: 1px; background: linear-gradient(90deg, transparent, rgba(193,127,62,.35), transparent); }
        .bh-countdown-unit { flex: 1; text-align: center; padding: 0 4px; border-right: 1px solid rgba(193,127,62,.15); }
        .bh-countdown-unit:last-child { border-right: none; }
        .bh-countdown-number { display: block; font-family: 'Playfair Display', serif; font-size: clamp(36px, 6vw, 58px); font-weight: 400; line-height: 1; color: #4A3728; transition: transform .15s ease, color .15s ease; }
        .bh-countdown-number.flip { transform: scale(1.08) translateY(-3px); color: #C17F3E; }
        .bh-countdown-label { font-family: 'EB Garamond', serif; font-size: clamp(8px, .9vw, 10px); letter-spacing: .16em; text-transform: uppercase; font-style: italic; color: rgba(139,99,67,.6); display: block; margin-top: 4px; }
        .bh-countdown-eyebrow { font-family: 'EB Garamond', serif; font-size: clamp(10px, 1.1vw, 12px); font-style: italic; letter-spacing: .1em; color: rgba(139,99,67,.7); text-align: center; margin-bottom: 14px; display: block; }
      `}</style>
      <div style={{ marginTop: 30 }}>
        <span className="bh-countdown-eyebrow">timp rămas până la marea sărbătoare...</span>
        <div className="bh-countdown-wrap">
          <div className="bh-countdown-top-line"/>
          <div className="bh-countdown-bottom-line"/>
          {units.map(u => (
            <div key={u.label} className="bh-countdown-unit">
              <span className={`bh-countdown-number${u.flip ? ' flip' : ''}`}>{u.value}</span>
              <span className="bh-countdown-label">{u.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}