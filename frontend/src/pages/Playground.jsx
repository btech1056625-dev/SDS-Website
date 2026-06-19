import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, PieChart, Pie, Cell, Legend
} from 'recharts'
import {
  Upload, FileText, Brain, CheckCircle, AlertTriangle,
  TrendingUp, Database, Zap, BarChart2, ChevronDown, ChevronUp, Loader
} from 'lucide-react'

const COLORS = ['#00D4FF', '#7C3AED', '#10B981', '#F59E0B', '#EF4444', '#EC4899']
const API_BASE = import.meta.env.VITE_API_URL || ''

// ── Sub-components ──────────────────────────────────────────────────────────

function UploadZone({ onFile, loading }) {
  const onDrop = useCallback(files => { if (files[0]) onFile(files[0]) }, [onFile])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { 'text/csv': ['.csv'] }, maxFiles: 1, disabled: loading
  })

  return (
    <div {...getRootProps()}
      className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
        isDragActive
          ? 'border-cyan-400 bg-cyan-500/10'
          : 'border-white/10 hover:border-cyan-500/40 hover:bg-cyan-500/5'
      } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <input {...getInputProps()} />
      <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-4">
        <Upload size={28} className={`${isDragActive ? 'text-cyan-300' : 'text-cyan-500'}`} />
      </div>
      <p className="font-display font-semibold text-white text-lg mb-2">
        {isDragActive ? 'Drop your CSV here' : 'Upload a CSV dataset'}
      </p>
      <p className="text-gray-400 text-sm">Drag & drop or click to browse · Max 5MB</p>
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500 font-mono-data">
        <span className="px-2 py-1 rounded bg-white/5 border border-white/5">titanic.csv</span>
        <span className="px-2 py-1 rounded bg-white/5 border border-white/5">iris.csv</span>
        <span className="px-2 py-1 rounded bg-white/5 border border-white/5">sales.csv</span>
        <span className="text-gray-600">or any CSV</span>
      </div>
    </div>
  )
}

function MetaCard({ icon: Icon, label, value, sub }) {
  return (
    <div className="card-glass rounded-xl p-5">
      <div className="flex items-center gap-3 mb-1">
        <Icon size={16} className="text-cyan-400" />
        <span className="text-xs text-gray-400 font-mono-data uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-2xl font-display font-bold text-white">{value}</div>
      {sub && <div className="text-xs text-gray-500 mt-1">{sub}</div>}
    </div>
  )
}

function QualityBar({ score }) {
  const color = score >= 80 ? '#10B981' : score >= 60 ? '#F59E0B' : '#EF4444'
  return (
    <div className="mt-2">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-400">Data Quality Score</span>
        <span className="font-mono-data" style={{ color }}>{score}/100</span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${score}%`, background: color }} />
      </div>
    </div>
  )
}

function ColumnCard({ col }) {
  const [expanded, setExpanded] = useState(false)
  const typeColor = { numeric: 'text-cyan-400 bg-cyan-500/10', categorical: 'text-violet-400 bg-violet-500/10', datetime: 'text-emerald-400 bg-emerald-500/10', empty: 'text-gray-400 bg-gray-500/10' }

  return (
    <div className="card-glass rounded-xl overflow-hidden">
      <button onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-white/3 transition-colors">
        <div className="flex items-center gap-3">
          <span className={`text-xs font-mono-data px-2 py-0.5 rounded ${typeColor[col.type] || 'text-gray-400 bg-white/5'}`}>
            {col.type}
          </span>
          <span className="font-display font-medium text-white text-sm">{col.name}</span>
          {col.missingPct > 0 && (
            <span className="text-xs text-orange-400 font-mono-data">{col.missingPct}% missing</span>
          )}
        </div>
        {expanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-white/5 pt-4">
          {col.stats && (
            <div className="grid grid-cols-3 gap-3">
              {[['Mean', col.stats.mean], ['Median', col.stats.median], ['Std Dev', col.stats.std],
                ['Min', col.stats.min], ['Max', col.stats.max], ['Count', col.stats.count]].map(([k, v]) => (
                <div key={k} className="bg-white/3 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">{k}</div>
                  <div className="font-mono-data text-cyan-300 text-sm">{v}</div>
                </div>
              ))}
            </div>
          )}
          {col.topValues && (
            <div>
              <div className="text-xs text-gray-500 mb-3">Top values</div>
              <div className="space-y-2">
                {col.topValues.map(({ val, count }) => (
                  <div key={val} className="flex items-center gap-3">
                    <span className="text-sm text-gray-300 font-mono-data w-32 truncate">{val}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-white/5">
                      <div className="h-full rounded-full bg-violet-500"
                        style={{ width: `${(count / col.topValues[0].count) * 100}%` }} />
                    </div>
                    <span className="text-xs text-gray-500 font-mono-data w-8 text-right">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function NumericChart({ columns }) {
  const numeric = columns.filter(c => c.stats)
  if (numeric.length === 0) return null

  const data = numeric.map(c => ({
    name: c.name.length > 12 ? c.name.slice(0, 12) + '…' : c.name,
    mean: c.stats.mean, min: c.stats.min, max: c.stats.max
  }))

  return (
    <div className="card-glass rounded-xl p-6">
      <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
        <BarChart2 size={16} className="text-cyan-400" /> Numeric Column Ranges
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#9CA3AF', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background: '#0D1529', border: '1px solid rgba(0,212,255,0.2)', borderRadius: 8, color: '#fff' }} />
          <Bar dataKey="mean" fill="#00D4FF" radius={[4,4,0,0]} name="Mean" />
          <Bar dataKey="max" fill="#7C3AED" radius={[4,4,0,0]} name="Max" opacity={0.6} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function MissingChart({ columns }) {
  const withMissing = columns.filter(c => c.missingPct > 0)
  if (withMissing.length === 0) return (
    <div className="card-glass rounded-xl p-6 flex items-center gap-3">
      <CheckCircle size={20} className="text-emerald-400" />
      <span className="text-gray-300 font-body">No missing values detected — clean dataset!</span>
    </div>
  )

  const data = withMissing.map(c => ({ name: c.name, missing: c.missingPct }))
  return (
    <div className="card-glass rounded-xl p-6">
      <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
        <AlertTriangle size={16} className="text-orange-400" /> Missing Values (%)
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} layout="vertical" margin={{ left: 10, right: 20 }}>
          <XAxis type="number" tick={{ fill: '#9CA3AF', fontSize: 11 }} domain={[0, 100]} />
          <YAxis type="category" dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 11 }} width={90} />
          <Tooltip contentStyle={{ background: '#0D1529', border: '1px solid rgba(255,165,0,0.2)', borderRadius: 8, color: '#fff' }} />
          <Bar dataKey="missing" fill="#F59E0B" radius={[0,4,4,0]} name="Missing %" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function TypeDistChart({ columns }) {
  const typeCounts = columns.reduce((acc, c) => {
    acc[c.type] = (acc[c.type] || 0) + 1; return acc
  }, {})
  const data = Object.entries(typeCounts).map(([name, value]) => ({ name, value }))
  return (
    <div className="card-glass rounded-xl p-6">
      <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
        <Database size={16} className="text-violet-400" /> Column Type Distribution
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" outerRadius={75} dataKey="value" label={({ name, percent }) => `${name} ${(percent*100).toFixed(0)}%`} labelLine={false}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip contentStyle={{ background: '#0D1529', border: '1px solid rgba(124,58,237,0.2)', borderRadius: 8, color: '#fff' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function Playground() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

  const handleFile = async (f) => {
    setFile(f)
    setResult(null)
    setError(null)
    setLoading(true)

    const formData = new FormData()
    formData.append('file', f)

    try {
      const { data } = await axios.post(`${API_BASE}/api/analyze`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 60000
      })
      setResult(data)
      setActiveTab('overview')
    } catch (err) {
      setError(err.response?.data?.error || 'Analysis failed. Check the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const tabs = ['overview', 'columns', 'charts', 'ai insights']

  return (
    <div className="min-h-screen pt-24 pb-20 grid-bg">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono-data mb-4">
            <Zap size={12} /> AI-Powered EDA Tool
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-3">
            Dataset <span className="text-gradient">Playground</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Upload any CSV. Get instant exploratory data analysis, visualizations, and AI-generated insights — no code required.
          </p>
        </div>

        {/* Upload */}
        <UploadZone onFile={handleFile} loading={loading} />

        {/* Loading */}
        {loading && (
          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl card-glass">
              <Loader size={20} className="text-cyan-400 animate-spin" />
              <div>
                <div className="text-white font-display font-medium">Analyzing your dataset…</div>
                <div className="text-gray-400 text-sm">Running stats + asking AI for insights</div>
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-mono-data">
            ✗ {error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="mt-10">
            {/* File info bar */}
            <div className="flex items-center gap-3 mb-6 p-3 rounded-xl bg-white/3 border border-white/5">
              <FileText size={16} className="text-cyan-400" />
              <span className="text-sm text-gray-300 font-mono-data">{result.meta.fileName}</span>
              <span className="text-gray-600">·</span>
              <span className="text-xs text-gray-500">{(result.meta.fileSize / 1024).toFixed(1)} KB</span>
              <CheckCircle size={14} className="text-emerald-400 ml-auto" />
              <span className="text-xs text-emerald-400">Analysis complete</span>
            </div>

            {/* Tab nav */}
            <div className="flex gap-1 mb-8 p-1 rounded-xl bg-white/3 border border-white/5 w-fit">
              {tabs.map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-lg text-sm font-display font-medium capitalize transition-all duration-200 ${
                    activeTab === tab
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/25'
                      : 'text-gray-400 hover:text-white'
                  }`}>
                  {tab}
                </button>
              ))}
            </div>

            {/* ── OVERVIEW TAB ── */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <MetaCard icon={Database} label="Rows" value={result.meta.rows.toLocaleString()} />
                  <MetaCard icon={BarChart2} label="Columns" value={result.meta.columns} />
                  <MetaCard icon={CheckCircle} label="Numeric Cols" value={result.columnAnalysis.filter(c => c.type === 'numeric').length} />
                  <MetaCard icon={AlertTriangle} label="Columns w/ Missing" value={result.columnAnalysis.filter(c => c.missingPct > 0).length} />
                </div>
                {result.aiAnalysis?.dataQuality && <QualityBar score={result.aiAnalysis.dataQuality.score} />}
                {result.aiAnalysis?.overview && (
                  <div className="card-glass rounded-xl p-6">
                    <h3 className="font-display font-semibold text-white mb-3 flex items-center gap-2">
                      <Brain size={16} className="text-violet-400" /> AI Overview
                    </h3>
                    <p className="text-gray-300 leading-relaxed">{result.aiAnalysis.overview}</p>
                  </div>
                )}
              </div>
            )}

            {/* ── COLUMNS TAB ── */}
            {activeTab === 'columns' && (
              <div className="space-y-3">
                {result.columnAnalysis.map((col, i) => <ColumnCard key={i} col={col} />)}
              </div>
            )}

            {/* ── CHARTS TAB ── */}
            {activeTab === 'charts' && (
              <div className="grid md:grid-cols-2 gap-6">
                <NumericChart columns={result.columnAnalysis} />
                <TypeDistChart columns={result.columnAnalysis} />
                <div className="md:col-span-2"><MissingChart columns={result.columnAnalysis} /></div>
              </div>
            )}

            {/* ── AI INSIGHTS TAB ── */}
            {activeTab === 'ai insights' && result.aiAnalysis && (
              <div className="space-y-6">
                {/* Key insights */}
                {result.aiAnalysis.keyInsights?.length > 0 && (
                  <div className="card-glass rounded-xl p-6">
                    <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
                      <Zap size={16} className="text-cyan-400" /> Key Insights
                    </h3>
                    <div className="space-y-3">
                      {result.aiAnalysis.keyInsights.map((insight, i) => (
                        <div key={i} className="flex gap-3 items-start">
                          <span className="text-cyan-500 font-mono-data text-sm mt-0.5">0{i+1}</span>
                          <p className="text-gray-300 text-sm leading-relaxed">{insight}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Data quality */}
                {result.aiAnalysis.dataQuality && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="card-glass rounded-xl p-5">
                      <h4 className="font-display font-medium text-orange-400 mb-3 text-sm">Issues Detected</h4>
                      {result.aiAnalysis.dataQuality.issues?.length > 0
                        ? result.aiAnalysis.dataQuality.issues.map((issue, i) => (
                          <div key={i} className="flex gap-2 text-sm text-gray-300 mb-2">
                            <AlertTriangle size={14} className="text-orange-400 mt-0.5 flex-shrink-0" />
                            {issue}
                          </div>
                        ))
                        : <p className="text-gray-500 text-sm">No major issues found.</p>
                      }
                    </div>
                    <div className="card-glass rounded-xl p-5">
                      <h4 className="font-display font-medium text-emerald-400 mb-3 text-sm">Recommendations</h4>
                      {result.aiAnalysis.dataQuality.recommendations?.map((rec, i) => (
                        <div key={i} className="flex gap-2 text-sm text-gray-300 mb-2">
                          <CheckCircle size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                          {rec}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggested analyses */}
                {result.aiAnalysis.suggestedAnalyses?.length > 0 && (
                  <div className="card-glass rounded-xl p-6">
                    <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
                      <TrendingUp size={16} className="text-emerald-400" /> Suggested Next Steps
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {result.aiAnalysis.suggestedAnalyses.map((s, i) => (
                        <div key={i} className="bg-white/3 rounded-xl p-4 border border-white/5">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-display font-medium text-white text-sm">{s.name}</span>
                            <span className={`text-xs font-mono-data px-2 py-0.5 rounded ${
                              s.difficulty === 'Easy' ? 'text-emerald-400 bg-emerald-500/10' :
                              s.difficulty === 'Medium' ? 'text-yellow-400 bg-yellow-500/10' :
                              'text-red-400 bg-red-500/10'}`}>{s.difficulty}</span>
                          </div>
                          <p className="text-gray-400 text-xs leading-relaxed">{s.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ML potential */}
                {result.aiAnalysis.mlPotential && (
                  <div className="card-glass rounded-xl p-6 border-l-2 border-violet-500">
                    <h3 className="font-display font-semibold text-white mb-2 flex items-center gap-2">
                      <Brain size={16} className="text-violet-400" /> ML Potential
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{result.aiAnalysis.mlPotential}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
