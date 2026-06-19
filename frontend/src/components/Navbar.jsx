import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '/#about', label: 'About', isAnchor: true },
    { href: '/events', label: 'Events' },
    { href: '/team', label: 'Team' },
    { href: '/playground', label: 'Playground', highlight: true },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-navy-900/95 backdrop-blur-md border-b border-sds-orange/10 shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <svg width="36" height="24" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 75 Q15 75 25 40 Q35 5 50 5 Q65 5 75 40 Q85 75 100 75" fill="#F97316" opacity="0.9"/>
            <path d="M20 75 Q35 75 48 35 Q58 5 72 5 Q86 5 96 35 Q108 65 120 75" fill="#2563EB" opacity="0.85"/>
          </svg>
          <div>
            <span className="font-display font-bold text-lg text-white">SDS</span>
            <span className="text-sds-orange font-bold text-lg">.</span>
            <div className="text-xs text-gray-500 font-body leading-none -mt-0.5">BIT Mesra</div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            link.highlight ? (
              <Link key={link.href} to={link.href}
                className="px-4 py-2 rounded-lg bg-sds-orange/10 border border-sds-orange/30 text-orange-400 font-display font-medium text-sm hover:bg-sds-orange/20 hover:border-sds-orange/60 transition-all duration-200">
                {link.label} ✦
              </Link>
            ) : link.isAnchor ? (
              <a key={link.href} href={link.href}
                className="text-gray-400 hover:text-white font-body text-sm transition-colors duration-200">
                {link.label}
              </a>
            ) : (
              <Link key={link.href} to={link.href}
                className="text-gray-400 hover:text-white font-body text-sm transition-colors duration-200">
                {link.label}
              </Link>
            )
          ))}
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-gray-400 hover:text-white">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-navy-800/98 backdrop-blur-md border-t border-sds-orange/10 px-6 py-4 flex flex-col gap-4">
          {links.map(link => (
            link.isAnchor ? (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)}
                className={`font-body text-sm py-2 transition-colors ${link.highlight ? 'text-orange-400 font-medium' : 'text-gray-400 hover:text-white'}`}>
                {link.label}
              </a>
            ) : (
              <Link key={link.href} to={link.href} onClick={() => setOpen(false)}
                className={`font-body text-sm py-2 transition-colors ${link.highlight ? 'text-orange-400 font-medium' : 'text-gray-400 hover:text-white'}`}>
                {link.label}
              </Link>
            )
          ))}
        </div>
      )}
    </nav>
  )
}
