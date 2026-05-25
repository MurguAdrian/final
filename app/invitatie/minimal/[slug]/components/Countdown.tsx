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
    <div style={{ color: '#C8503A', fontFamily: "'DM Sans', sans-serif", letterSpacing: '.2em', fontSize: 'clamp(11px,1.3vw,13px)', marginTop: 30, textTransform: 'uppercase' }}>
      Evenimentul a început ✦
    </div>
  );

  const pad = (n: number) => String(n).padStart(2, '0');
  const units = [
    { label: 'Zile', value: pad(timeLeft.zile), flip: false, dark: true },
    { label: 'Ore', value: pad(timeLeft.ore), flip: false, dark: false, accent: true },
    { label: 'Min', value: pad(timeLeft.minute), flip: false, dark: false },
    { label: 'Sec', value: pad(timeLeft.secunde), flip: flipS, dark: false },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        .mn-cd-wrap { display: grid; grid-template-columns: repeat(4,1fr); gap: clamp(4px,1vw,8px); margin-top: 32px; max-width: 420px; margin-left: auto; margin-right: auto; }
        .mn-cd-unit { padding: clamp(14px,2vw,22px) clamp(8px,1.5vw,16px); border: 1px solid #E2E2E2; }
        .mn-cd-unit--dark { background: #111; border-color: transparent; }
        .mn-cd-unit--accent { background: #C8503A; border-color: transparent; }
        .mn-cd-unit--light { background: #fff; }
        .mn-cd-unit--pale { background: #F7F4F0; }
        .mn-cd-number { display: block; font-family: 'Playfair Display', serif; font-size: clamp(32px,5.5vw,56px); font-weight: 400; font-style: italic; line-height: 1; transition: opacity .12s; }
        .mn-cd-number--white { color: #fff; }
        .mn-cd-number--dark { color: #111; }
        .mn-cd-number--flip { opacity: .5; }
        .mn-cd-label { font-family: 'DM Sans', sans-serif; font-size: clamp(7px,.78vw,9px); letter-spacing: .22em; text-transform: uppercase; display: block; margin-top: 4px; font-weight: 400; }
        .mn-cd-label--light { color: rgba(255,255,255,.6); }
        .mn-cd-label--dark { color: #AAAAAA; }
        .mn-cd-eyebrow { font-family: 'DM Sans', sans-serif; font-size: clamp(7px,.9vw,9px); letter-spacing: .3em; text-transform: uppercase; color: #AAAAAA; text-align: center; margin-bottom: 14px; display: block; }
      `}</style>
      <div style={{ marginTop: 30 }}>
        <span className="mn-cd-eyebrow">Timp Rămas Până La Marea Sărbătoare</span>
        <div className="mn-cd-wrap">
          {units.map((u, i) => (
            <div key={u.label} className={`mn-cd-unit ${i === 0 ? 'mn-cd-unit--dark' : i === 1 ? 'mn-cd-unit--accent' : i === 2 ? 'mn-cd-unit--light' : 'mn-cd-unit--pale'}`}>
              <span className={`mn-cd-number ${i < 2 ? 'mn-cd-number--white' : 'mn-cd-number--dark'} ${u.flip ? 'mn-cd-number--flip' : ''}`}>{u.value}</span>
              <span className={`mn-cd-label ${i < 2 ? 'mn-cd-label--light' : 'mn-cd-label--dark'}`}>{u.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}