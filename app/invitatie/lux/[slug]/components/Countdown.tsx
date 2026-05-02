// "use client";
// import React, { useState, useEffect } from 'react';

// export default function Countdown({ targetDate }: { targetDate: string }) {
//   const [timeLeft, setTimeLeft] = useState<any>(null);

//   useEffect(() => {
//     const calculate = () => {
//       const difference = +new Date(targetDate) - +new Date();
//       if (difference > 0) {
//         setTimeLeft({
//           zile: Math.floor(difference / (1000 * 60 * 60 * 24)),
//           ore: Math.floor((difference / (1000 * 60 * 60)) % 24),
//           minute: Math.floor((difference / 1000 / 60) % 60),
//           secunde: Math.floor((difference / 1000) % 60),
//         });
//       } else {
//         setTimeLeft(0);
//       }
//     };

//     calculate();
//     const timer = setInterval(calculate, 1000);
//     return () => clearInterval(timer);
//   }, [targetDate]);

//   if (!timeLeft) return null;
//   if (timeLeft === 0) return <div style={{ color: '#d4af37' }}>EVENIMENTUL A ÎNCEPUT! ✦</div>;

//   return (
//     <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '30px' }}>
//       <TimeUnit label="ZILE" value={timeLeft.zile} />
//       <TimeUnit label="ORE" value={timeLeft.ore} />
//       <TimeUnit label="MIN" value={timeLeft.minute} />
//       <TimeUnit label="SEC" value={timeLeft.secunde} />
//     </div>
//   );
// }

// const TimeUnit = ({ label, value }: any) => (
//   <div style={{ textAlign: 'center' }}>
//     <div style={{ fontSize: '2rem', color: '#d4af37', fontWeight: '300' }}>{value}</div>
//     <div style={{ fontSize: '0.6rem', letterSpacing: '2px', opacity: 0.6 }}>{label}</div>
//   </div>
// );

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

  // Flip animation on seconds change
  useEffect(() => {
    if (!timeLeft || timeLeft === 0) return;
    setFlipS(true);
    const t = setTimeout(() => setFlipS(false), 160);
    return () => clearTimeout(t);
  }, [timeLeft?.secunde]);

  if (!timeLeft) return null;
  if (timeLeft === 0) return (
    <div style={{ color: '#d4af37', fontFamily: "'Cinzel', serif", letterSpacing: '.2em', fontSize: 'clamp(12px,1.4vw,14px)', marginTop: 30 }}>
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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400&family=Cinzel:wght@400&display=swap');
        .countdown-wrap {
          display: flex; gap: 0; justify-content: center;
          margin-top: 32px;
          background: rgba(212,175,55,.04);
          border: 1px solid rgba(212,175,55,.18);
          border-radius: 16px;
          padding: 20px 10px;
          max-width: 420px;
          margin-left: auto; margin-right: auto;
          position: relative; overflow: hidden;
        }
        .countdown-top-line {
          position: absolute; top: 0; left: 10%; right: 10%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212,175,55,.4), transparent);
        }
        .countdown-bottom-line {
          position: absolute; bottom: 0; left: 10%; right: 10%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212,175,55,.4), transparent);
        }
        .countdown-unit {
          flex: 1; text-align: center; padding: 0 4px;
          border-right: 1px solid rgba(212,175,55,.12);
        }
        .countdown-unit:last-child { border-right: none; }
        .countdown-number {
          display: block;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 6vw, 58px);
          font-weight: 300; line-height: 1;
          color: #D4AF37;
          transition: transform .15s ease, color .15s ease;
        }
        .countdown-number.flip {
          transform: scale(1.08) translateY(-3px);
          color: #F5D678;
          text-shadow: 0 0 20px rgba(212,175,55,.4);
        }
        .countdown-label {
          font-family: 'Cinzel', serif;
          font-size: clamp(6px, .8vw, 8px);
          letter-spacing: .18em; text-transform: uppercase;
          color: rgba(212,175,55,.45); display: block; margin-top: 4px;
        }
        .countdown-eyebrow {
          font-family: 'Cinzel', serif;
          font-size: clamp(7px, .9vw, 9px);
          letter-spacing: .3em; text-transform: uppercase;
          color: rgba(212,175,55,.55);
          text-align: center; margin-bottom: 14px;
          display: block;
        }
      `}</style>
      <div style={{ marginTop: 30 }}>
        <span className="countdown-eyebrow">Timp Rămas Până La Marea Sărbătoare</span>
        <div className="countdown-wrap">
          <div className="countdown-top-line"/>
          <div className="countdown-bottom-line"/>
          {units.map(u => (
            <div key={u.label} className="countdown-unit">
              <span className={`countdown-number${u.flip ? ' flip' : ''}`}>{u.value}</span>
              <span className="countdown-label">{u.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
