"use client";
import React, { useState, useEffect } from 'react';

export default function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<any>(null);

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

  if (!timeLeft) return null;
  if (timeLeft === 0) return <div style={{ color: '#d4af37' }}>EVENIMENTUL A ÎNCEPUT! ✦</div>;

  return (
    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '30px' }}>
      <TimeUnit label="ZILE" value={timeLeft.zile} />
      <TimeUnit label="ORE" value={timeLeft.ore} />
      <TimeUnit label="MIN" value={timeLeft.minute} />
      <TimeUnit label="SEC" value={timeLeft.secunde} />
    </div>
  );
}

const TimeUnit = ({ label, value }: any) => (
  <div style={{ textAlign: 'center' }}>
    <div style={{ fontSize: '2rem', color: '#d4af37', fontWeight: '300' }}>{value}</div>
    <div style={{ fontSize: '0.6rem', letterSpacing: '2px', opacity: 0.6 }}>{label}</div>
  </div>
);