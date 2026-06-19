import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-sds-orange/10 bg-navy-950 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <svg width="32" height="22" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 75 Q15 75 25 40 Q35 5 50 5 Q65 5 75 40 Q85 75 100 75" fill="#F97316" opacity="0.9"/>
            <path d="M20 75 Q35 75 48 35 Q58 5 72 5 Q86 5 96 35 Q108 65 120 75" fill="#2563EB" opacity="0.85"/>
          </svg>
          <div>
            <span className="font-display font-bold text-white">SDS<span className="text-sds-orange">.</span></span>
            <div className="text-xs text-gray-500">Society for Data Science · BIT Mesra</div>
          </div>
        </div>
        <div className="flex items-center gap-6 text-gray-500 text-sm">
          <Link to="/" className="hover:text-orange-400 transition-colors">Home</Link>
          <Link to="/playground" className="hover:text-orange-400 transition-colors">Playground</Link>
          <a href="#team" className="hover:text-orange-400 transition-colors">Team</a>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-orange-400 transition-colors"><Github size={18} /></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-orange-400 transition-colors"><Linkedin size={18} /></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-orange-400 transition-colors"><Instagram size={18} /></a>
          <a href="mailto:sds@bitmesra.ac.in" className="text-gray-500 hover:text-orange-400 transition-colors"><Mail size={18} /></a>
        </div>
      </div>
      <div className="text-center mt-8 text-gray-600 text-xs font-mono-data">
        © 2025 Society for Data Science, BIT Mesra. Built with purpose.
      </div>
    </footer>
  )
}
