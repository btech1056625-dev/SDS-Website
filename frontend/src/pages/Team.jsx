import { Mail, Linkedin } from 'lucide-react'
import { team } from '../data/sdsData'

// Static imports so Vite bundles these correctly
import vaibhav from '../assets/team/vaibhav.png'
import himanshu from '../assets/team/himanshu.png'
import shanvi from '../assets/team/shanvi.png'
import lakshay from '../assets/team/lakshay.png'
import devashish from '../assets/team/devashish.png'
import vedant from '../assets/team/vedant.png'
import aditi from '../assets/team/aditi.png'

const imgMap = { 'vaibhav.png': vaibhav, 'himanshu.png': himanshu, 'shanvi.png': shanvi, 'lakshay.png': lakshay, 'devashish.png': devashish, 'vedant.png': vedant, 'aditi.png': aditi }

function TeamCard({ member, i }) {
  const isOrange = i % 2 === 0
  const accent = isOrange ? '#F97316' : '#2563EB'

  return (
    <div className="card-glass card-glass-hover rounded-2xl overflow-hidden group">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={imgMap[member.img]}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-80" />
        {/* corner accent frame, echoes the original brand graphics */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 rounded-tl-md" style={{ borderColor: accent }} />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 rounded-br-md" style={{ borderColor: accent }} />
      </div>

      <div className="p-5">
        <h3 className="font-display font-semibold text-white text-lg">{member.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
          <span className="text-sm font-medium" style={{ color: accent }}>{member.role}</span>
        </div>
        <div className="text-gray-500 text-xs mt-2 font-mono-data">{member.domain}</div>
      </div>
    </div>
  )
}

export default function Team() {
  const leadership = team.filter(m => ['President', 'Vice President'].includes(m.role))
  const core = team.filter(m => !['President', 'Vice President'].includes(m.role))

  return (
    <div className="min-h-screen pt-24 pb-20 grid-bg">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono-data mb-4">
            Executive Body · 2025
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-3">
            The People Behind <span className="text-gradient">SDS</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            A student-run team driving data science forward at BIT Mesra — through events,
            research, and community building.
          </p>
        </div>

        {/* Leadership row — larger cards */}
        <div className="mb-6">
          <div className="text-orange-500 font-mono-data text-xs mb-4 tracking-widest uppercase">Leadership</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            {leadership.map((m, i) => <TeamCard key={m.name} member={m} i={i} />)}
          </div>
        </div>

        {/* Core team */}
        <div>
          <div className="text-blue-400 font-mono-data text-xs mb-4 tracking-widest uppercase">Core Team</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {core.map((m, i) => <TeamCard key={m.name} member={m} i={i + leadership.length} />)}
          </div>
        </div>

        {/* Join CTA */}
        <div className="mt-20 text-center card-glass rounded-2xl p-10">
          <h2 className="font-display font-bold text-2xl text-white mb-3">Want to join the team?</h2>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            We're always looking for passionate students in ML, data engineering, design, and event management.
          </p>
          <a href="mailto:sds@bitmesra.ac.in"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-orange-500/30 text-orange-400 font-display font-medium hover:bg-orange-500/10 transition-all duration-200">
            <Mail size={16} /> sds@bitmesra.ac.in
          </a>
        </div>
      </div>
    </div>
  )
}
