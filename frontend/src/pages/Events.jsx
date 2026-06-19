import { useState } from 'react'
import { Calendar, Clock, MapPin, Award, ChevronRight } from 'lucide-react'
import { pastEvents, upcomingEvents, typeColors } from '../data/sdsData'

function PastEventCard({ ev }) {
  return (
    <div className="card-glass card-glass-hover rounded-2xl overflow-hidden flex flex-col">
      <div className="relative h-36 flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${ev.accent}22, ${ev.accent}05)`, borderBottom: `1px solid ${ev.accent}22` }}>
        <div className="absolute inset-0 grid-bg opacity-40" />
        <span className="relative text-6xl select-none">{ev.emoji}</span>
        <span className={`absolute top-3 right-3 text-xs font-mono-data px-2 py-0.5 rounded border ${typeColors[ev.type]}`}>
          {ev.type}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-white text-lg mb-1">{ev.title}</h3>
        {ev.subtitle && <p className="text-sm mb-3" style={{ color: ev.accent }}>{ev.subtitle}</p>}

        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1"><Calendar size={11} />{ev.date}</span>
          {ev.time && <span className="flex items-center gap-1"><Clock size={11} />{ev.time}</span>}
          {ev.location && <span className="flex items-center gap-1"><MapPin size={11} />{ev.location}</span>}
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">{ev.recap}</p>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {ev.stats.map(({ label, value }) => (
            <div key={label} className="rounded-lg p-3 text-center"
              style={{ background: `${ev.accent}08`, border: `1px solid ${ev.accent}18` }}>
              <div className="font-display font-bold text-base" style={{ color: ev.accent }}>{value}</div>
              <div className="text-xs text-gray-500 mt-0.5 truncate">{label}</div>
            </div>
          ))}
        </div>

        {ev.organizers && (
          <div className="text-xs text-gray-500 font-mono-data border-t border-white/5 pt-3">
            Organized by {ev.organizers.join(' & ')}
          </div>
        )}
      </div>
    </div>
  )
}

function UpcomingCard({ ev }) {
  return (
    <div className="card-glass card-glass-hover rounded-xl p-6">
      <div className="flex items-start justify-between mb-3">
        <span className={`text-xs font-mono-data px-2 py-1 rounded-md border ${typeColors[ev.type]}`}>{ev.type}</span>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Calendar size={12} /><span>{ev.date}</span>
        </div>
      </div>
      <h3 className="font-display font-semibold text-lg text-white mb-2">{ev.title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{ev.desc}</p>
    </div>
  )
}

export default function Events() {
  const [tab, setTab] = useState('past')

  return (
    <div className="min-h-screen pt-24 pb-20 grid-bg">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono-data mb-4">
            <Award size={12} /> DSS'26 & Beyond
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-3">
            SDS <span className="text-gradient">Events</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Hackathons, speaker sessions, and competitions — see what we've run and what's coming next.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-1 p-1 rounded-xl bg-white/3 border border-white/5 w-fit">
            {['past', 'upcoming'].map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-6 py-2 rounded-lg text-sm font-display font-medium capitalize transition-all duration-200 ${
                  tab === t ? 'bg-orange-500/15 text-orange-300 border border-orange-500/25' : 'text-gray-400 hover:text-white'
                }`}>
                {t === 'past' ? 'Past Events' : 'Upcoming'}
              </button>
            ))}
          </div>
        </div>

        {tab === 'past' ? (
          <div className="grid md:grid-cols-2 gap-6">
            {pastEvents.map((ev, i) => <PastEventCard key={i} ev={ev} />)}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingEvents.map((ev, i) => <UpcomingCard key={i} ev={ev} />)}
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center card-glass rounded-2xl p-10">
          <h2 className="font-display font-bold text-2xl text-white mb-3">Want to host an event with SDS?</h2>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Reach out if you'd like to collaborate, sponsor, or speak at one of our future sessions.
          </p>
          <a href="mailto:sds@bitmesra.ac.in"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-orange-500/30 text-orange-400 font-display font-medium hover:bg-orange-500/10 transition-all duration-200">
            Get in touch <ChevronRight size={16} />
          </a>
        </div>
      </div>
    </div>
  )
}
