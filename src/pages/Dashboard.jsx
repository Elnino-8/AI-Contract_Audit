import { Link } from 'react-router-dom'
import { 
  FileSearch, AlertTriangle, ShieldCheck, TrendingUp, 
  ArrowRight, Clock, ExternalLink, Activity, BarChart3
} from 'lucide-react'
import { recentAudits, mockAuditResult } from '../data/mockData'

export default function Dashboard() {
  const stats = [
    { label: 'Total Audits', value: '23', change: '+5 this week', icon: FileSearch, color: 'cyan' },
    { label: 'Vulnerabilities Found', value: '87', change: '12 critical', icon: AlertTriangle, color: 'red' },
    { label: 'Avg Security Score', value: '74.2', change: '+8.3 vs last month', icon: ShieldCheck, color: 'emerald' },
    { label: 'Contracts Monitored', value: '12', change: '3 chains', icon: Activity, color: 'brand' },
  ]

  const getRiskColor = (risk) => {
    if (risk === 'Low') return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
    if (risk === 'Medium') return 'text-amber-400 bg-amber-500/10 border-amber-500/30'
    return 'text-red-400 bg-red-500/10 border-red-500/30'
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-400'
    if (score >= 60) return 'text-amber-400'
    return 'text-red-400'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Monitor your smart contract security posture</p>
        </div>
        <Link
          to="/audit"
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-brand-500 text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
        >
          <FileSearch className="w-4 h-4" />
          New Audit
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, change, icon: Icon, color }) => (
          <div key={label} className="p-5 rounded-xl bg-dark-800/50 border border-white/5 hover:border-white/10 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg bg-${color}-400/10 flex items-center justify-center`}>
                <Icon className={`w-5 h-5 text-${color}-400`} />
              </div>
              <TrendingUp className="w-4 h-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-xs text-gray-500 mt-1">{label}</div>
            <div className="text-[11px] text-emerald-400/70 mt-2">{change}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Audits Table */}
        <div className="lg:col-span-2 rounded-xl bg-dark-800/50 border border-white/5 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-white/5">
            <h2 className="font-semibold text-white">Recent Audits</h2>
            <Link to="/history" className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">Contract</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">Chain</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">Score</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">Risk</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">Issues</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentAudits.map((audit) => (
                  <tr key={audit.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors cursor-pointer group">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-brand-500/10 flex items-center justify-center">
                          <FileSearch className="w-3.5 h-3.5 text-brand-400" />
                        </div>
                        <span className="text-sm font-mono text-gray-300 group-hover:text-cyan-400 transition-colors">
                          {audit.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs text-gray-500">{audit.chain}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-sm font-bold ${getScoreColor(audit.score)}`}>
                        {audit.score}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase border ${getRiskColor(audit.risk)}`}>
                        {audit.risk}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-sm text-gray-400">{audit.issues}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {audit.date}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="p-5 rounded-xl bg-dark-800/50 border border-white/5">
            <h3 className="font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { label: 'New Audit', desc: 'Upload a contract', icon: FileSearch, to: '/audit' },
                { label: 'View History', desc: 'Past 23 audits', icon: Clock, to: '/history' },
                { label: 'Export Report', desc: 'Download PDF', icon: ExternalLink, to: '#' },
              ].map(({ label, desc, icon: Icon, to }) => (
                <Link
                  key={label}
                  to={to}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-cyan-400/10 transition-colors">
                    <Icon className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-300 group-hover:text-white transition-colors">{label}</div>
                    <div className="text-[11px] text-gray-600">{desc}</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-600 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>

          {/* AI Model Status */}
          <div className="p-5 rounded-xl bg-dark-800/50 border border-white/5">
            <h3 className="font-semibold text-white mb-4">AI Model Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">MiMo V2.5 Reasoning</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-glow" />
                  <span className="text-xs text-emerald-400">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Vuln Database</span>
                <span className="text-xs text-gray-500">v2026.05</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Avg Response</span>
                <span className="text-xs text-cyan-400">4.2s</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="p-5 rounded-xl bg-dark-800/50 border border-white/5">
            <h3 className="font-semibold text-white mb-4">Activity Feed</h3>
            <div className="space-y-3">
              {[
                { text: 'Critical reentrancy found in VaultToken', time: '2h ago', type: 'critical' },
                { text: 'UniswapV3Router audit completed', time: '5h ago', type: 'success' },
                { text: 'New audit started for AaveLendingPool', time: '1d ago', type: 'info' },
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                    item.type === 'critical' ? 'bg-red-400' : item.type === 'success' ? 'bg-emerald-400' : 'bg-cyan-400'
                  }`} />
                  <div>
                    <p className="text-xs text-gray-400 leading-relaxed">{item.text}</p>
                    <span className="text-[10px] text-gray-600">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
