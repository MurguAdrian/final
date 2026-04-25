'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Logo from './Logo'
import { NAV_ITEMS } from '@/constants/navItems'

import '@/styles/header.css'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className="vh-header">
      <div className={`vh-bar ${scrolled ? 'scrolled' : ''}`} ref={menuRef}>

        {/* LOGO */}
        <Link href="/" className="vh-logo">
          <Logo />
          <span className="vh-logo-text">
            Vibe<span>Invite</span>
          </span>
        </Link>

        {/* NAV */}
        <nav>
          <ul className="vh-nav">
            {NAV_ITEMS.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={pathname === item.href ? 'active' : ''}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ACTIONS */}
        <div className="vh-actions">
          <Link href="/login" className="vh-login">
            Login
          </Link>
          <Link href="/preturi" className="vh-cta">
            Creează
          </Link>
        </div>

        {/* BURGER */}
        <button className="vh-burger" onClick={() => setOpen(!open)}>
          ☰
        </button>

      </div>
    </header>
  )
}