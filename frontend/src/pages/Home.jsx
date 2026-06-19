import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Database, Brain, TrendingUp, Users, Sparkles, ChevronRight, Calendar, UsersRound, PlayCircle } from 'lucide-react'
import introVideo from '../assets/video/sds-intro.mp4'

// ── Particle Network ─────────────────────────────────────────────────────────
function ParticleNetwork() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)
    const W = () => canvas.width, H = () => canvas.height
    const COUNT = 70
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W(), y: Math.random() * H(),
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1, pulse: Math.random() * Math.PI * 2,
    }))
    const ORANGE = [249, 115, 22], BLUE = [37, 99, 235]
    const draw = () => {
      ctx.clearRect(0, 0, W(), H())
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.pulse += 0.018
        if (p.x < 0 || p.x > W()) p.vx *= -1
        if (p.y < 0 || p.y > H()) p.vy *= -1
      })
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx*dx + dy*dy)
          if (dist < 130) {
            const c = (i+j)%3===0 ? BLUE : ORANGE
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${(1-dist/130)*0.22})`
            ctx.lineWidth = 0.8; ctx.stroke()
          }
        }
      }
      particles.forEach((p, i) => {
        const glow = 0.6 + 0.4 * Math.sin(p.pulse)
        const c = i%3===0 ? BLUE : ORANGE
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r*glow, 0, Math.PI*2)
        ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${0.5+0.5*glow})`; ctx.fill()
        const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*4)
        g.addColorStop(0,`rgba(${c[0]},${c[1]},${c[2]},0.12)`); g.addColorStop(1,'transparent')
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r*4, 0, Math.PI*2); ctx.fillStyle = g; ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.65 }} />
}

function StatCard({ value, label, icon: Icon }) {
  return (
    <div className="card-glass card-glass-hover rounded-xl p-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
        <Icon size={20} className="text-orange-400" />
      </div>
      <div>
        <div className="text-2xl font-display font-bold text-white">{value}</div>
        <div className="text-xs text-gray-400 font-body">{label}</div>
      </div>
    </div>
  )
}

// Card linking to a dedicated page (Events / Team)
function NavCard({ to, icon: Icon, title, desc, accent }) {
  return (
    <Link to={to} className="card-glass card-glass-hover rounded-2xl p-8 flex flex-col group relative overflow-hidden">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(135deg, ${accent}08, transparent)` }} />
      <div className="relative">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
          style={{ background: `${accent}15`, border: `1px solid ${accent}30` }}>
          <Icon size={22} style={{ color: accent }} />
        </div>
        <h3 className="font-display font-semibold text-xl text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-5">{desc}</p>
        <div className="flex items-center gap-1 text-sm font-medium" style={{ color: accent }}>
          View all <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  )
}

export default function Home() {
  return (
    <div className="grid-bg">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <ParticleNetwork />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.07) 0%, rgba(37,99,235,0.06) 50%, transparent 70%)' }} />

        <div className="relative max-w-7xl mx-auto px-6 text-center z-10">
          <div className="flex justify-center mb-6">
            <svg width="80" height="54" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
              <path d="M0 75 Q15 75 25 40 Q35 5 50 5 Q65 5 75 40 Q85 75 100 75" fill="#F97316" opacity="0.92"/>
              <path d="M20 75 Q35 75 48 35 Q58 5 72 5 Q86 5 96 35 Q108 65 120 75" fill="#2563EB" opacity="0.88"/>
            </svg>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-400 text-sm font-mono-data mb-6">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            Society for Data Science · BIT Mesra
          </div>

          <h1 className="font-display font-bold text-5xl md:text-7xl leading-tight mb-6">
            <span className="text-white">Where Data Meets</span>
            <br />
            <span className="text-gradient">Discovery.</span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-body leading-relaxed">
            BIT Mesra's premier data science community — building real skills in ML, AI,
            and data engineering through hackathons, workshops, and open projects.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link to="/playground"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-display font-semibold transition-all duration-200 shadow-lg hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #F97316, #EA6C00)', color: '#fff', boxShadow: '0 4px 24px rgba(249,115,22,0.3)' }}>
              Try Dataset Playground <ArrowRight size={18} />
            </Link>
            <a href="#about"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-white hover:border-orange-500/40 hover:bg-orange-500/5 transition-all duration-200 font-display font-medium">
              Explore SDS <ChevronRight size={18} />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <StatCard value="200+" label="Active Members" icon={Users} />
            <StatCard value="30+" label="Projects Built" icon={Database} />
            <StatCard value="15+" label="Workshops" icon={Brain} />
            <StatCard value="8" label="Competitions Won" icon={TrendingUp} />
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-28 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-orange-500 font-mono-data text-sm mb-3 tracking-widest uppercase">About Us</div>
            <h2 className="font-display font-bold text-4xl text-white mb-6">
              Built by students,<br />
              <span className="text-gradient">for data scientists.</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              SDS was founded to bridge the gap between academic theory and real-world data science practice.
              We run workshops, hackathons, speaker sessions, and open-source projects that push members
              beyond textbooks into production-grade work.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Whether you're writing your first pandas line or deploying your first ML model —
              this is your community at BIT Mesra.
            </p>
            <div className="flex gap-6">
              {[['ML & AI', '#F97316'], ['Data Eng', '#2563EB'], ['Visualization', '#10B981']].map(([label, color]) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                  <span className="text-sm text-gray-300">{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="card-glass rounded-2xl p-6 glow-orange">
              <div className="text-xs font-mono-data text-orange-500 mb-4">// sds_bitmesra.py</div>
              <div className="space-y-2 font-mono-data text-sm">
                {[
                  { k: 'society', v: '"SDS @ BIT Mesra"', c: 'text-orange-400' },
                  { k: 'focus', v: '["ML", "NLP", "CV", "DataEng"]', c: 'text-blue-400' },
                  { k: 'events_2025', v: '["DSS26", "Hack&Forge", "CodersCup"]', c: 'text-emerald-400' },
                  { k: 'mission', v: '"Build. Learn. Grow."', c: 'text-yellow-400' },
                ].map(({ k, v, c }) => (
                  <div key={k} className="flex gap-2 flex-wrap">
                    <span className="text-gray-500">→</span>
                    <span className="text-gray-300">{k}</span>
                    <span className="text-gray-500">=</span>
                    <span className={c}>{v}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-gray-400 font-mono-data">Active · 2025</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VIDEO SECTION ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-blue-400 font-mono-data text-sm mb-3 tracking-widest uppercase flex items-center justify-center gap-2">
              <PlayCircle size={14} /> Inside SDS
            </div>
            <h2 className="font-display font-bold text-4xl text-white">
              A glimpse <span className="text-gradient">into our world</span>
            </h2>
          </div>

          <div className="relative rounded-2xl overflow-hidden card-glass p-2 glow-blue">
            <video
              className="w-full rounded-xl"
              controls
              preload="metadata"
              poster=""
            >
              <source src={introVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* ── EVENTS & TEAM NAV CARDS ── */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="text-orange-500 font-mono-data text-sm mb-3 tracking-widest uppercase">Explore More</div>
          <h2 className="font-display font-bold text-4xl text-white">
            Dive deeper into <span className="text-gradient">SDS</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <NavCard
            to="/events"
            icon={Calendar}
            title="Events"
            desc="Hackathons, speaker sessions, and competitions — explore DSS'26 highlights and what's coming up next."
            accent="#F97316"
          />
          <NavCard
            to="/team"
            icon={UsersRound}
            title="Executive Body"
            desc="Meet the student leadership driving SDS forward — President, Directors, and the core team."
            accent="#2563EB"
          />
        </div>
      </section>

      {/* ── PLAYGROUND CTA ── */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden p-10 md:p-16 text-center"
            style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(37,99,235,0.12) 100%)', border: '1px solid rgba(249,115,22,0.15)' }}>
            <div className="absolute inset-0 grid-bg opacity-50" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono-data mb-6">
                <Sparkles size={12} /> AI-Powered Feature
              </div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">Dataset Playground</h2>
              <p className="text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed">
                Upload any CSV. Get instant AI-generated exploratory data analysis —
                statistics, visualizations, insights, and ML recommendations. No code required.
              </p>
              <Link to="/playground"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-display font-semibold hover:-translate-y-0.5 transition-all shadow-lg"
                style={{ background: 'linear-gradient(135deg, #F97316, #2563EB)', color: '#fff' }}>
                Launch Playground <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-20 max-w-2xl mx-auto px-6 text-center">
        <div className="text-orange-500 font-mono-data text-sm mb-3 tracking-widest uppercase">Contact</div>
        <h2 className="font-display font-bold text-3xl text-white mb-4">Join the community</h2>
        <p className="text-gray-400 mb-8">Open to all BIT Mesra students. Reach out and we'll get you onboarded.</p>
        <a href="mailto:sds@bitmesra.ac.in"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-orange-500/30 text-orange-400 font-display font-medium hover:bg-orange-500/10 transition-all duration-200">
          sds@bitmesra.ac.in <ArrowRight size={16} />
        </a>
      </section>
    </div>
  )
}
