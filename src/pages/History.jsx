import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  FileSearch, Clock, Filter, Search, ArrowRight, 
  ExternalLink, ChevronDown, BarChart3, Download
} from 'lucide-react'
import { recentAudits } from '../data/mockData'

export default function History() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterRisk, setFilterRisk] = useState('All')

  const allAudits = [
    ...recentAudits,
    { id: 6, name: 'SushiSwap.sol', date: '2026-05-16', score: 58, risk: 'High', issues: 6, chain: 'Ethereum' },
    { id: 7, name: 'AaveOracle.sol', date: '2026-05-15', score: 88, risk: 'Low', issues: 1, chain: 'Ethereum' },
    { id: 8, name: 'ChainlinkVRF.sol', date: '2026-05-14', score: 95, risk: 'Low', issues: 0, chain: 'Ethereum' },
    { id: 9, name: 'GMXRouter.sol', date: '2026-05-13', score: 67, risk: 'Medium', issues: 3, chain: 'Arbitrum' },
    { id: 10, name: 'RaydiumPool.sol', date: '2026-05-12', score: 41, risk: 'High', issues: 8, chain: 'Solana' },
    { id: 11, name: 'LidoStaking.sol', date: '2026-05-11', score: 82, risk: 'Low', issues: 2, chain: 'Ethereum' },
    { id: 12, name: 'dYdXPerp.sol', date: '2026-05-10', score: 73, risk: 'Medium', issues: 4, chain: 'Ethereum' },
  ]

  const filtered = allAudits.filter((audit) => {
    const matchSearch = audit.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchFilter = filterRisk === 'All' || audit.risk === filterRisk
    return matchSearch && matchFilter
  })

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-400'
    if (score >= 60) return 'text-amber-400'
    return 'text-red-400'
  }

  const getRiskColor = (risk) => {
    if (risk === 'Low') return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
    if (risk === 'Medium') return 'text-amber-400 bg-amber-500/10 border-amber-500/30'
    return 'text-red-400 bg-red-500/10 border-red-500/30'
  }

  const riskFilters = ['All', 'Low', 'Medium', 'High', 'Critical']

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Audit History</h1>
          <p className="text-sm text-gray-500 mt-1">
            {allAudits.length} audits completed · Total {allAudits.reduce((a, b) => a + b.issues, 0)} issues found
          </p>
        </div>
        <Link
          to="/audit"
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-brand-500 text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
        >
          <FileSearch className="w-4 h-4" />
          New Audit
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search contracts..."
            className="w-full pl-10 pr-4 py-2.5 bg-dark-800/50 border border-white/5 rounded-lg text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-400/30 transition-colors"
          />
        </div>

        {/* Risk Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          {riskFilters.map((risk) => (
            <button
              key={risk}
              onClick={() => setFilterRisk(risk)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filterRisk === risk
                  ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/30'
                  : 'bg-white/5 text-gray-500 border border-white/5 hover:border-white/10'
              }`}
            >
              {risk}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-dark-800/50 border border-white/5">
          <div className="text-lg font-bold text-emerald-400">5</div>
          <div className="text-xs text-gray-500 mt-1">Low Risk</div>
        </div>
        <div className="p-4 rounded-xl bg-dark-800/50 border border-white/5">
          <div className="text-lg font-bold text-amber-400">3</div>
          <div className="text-xs text-gray-500 mt-1">Medium Risk</div>
        </div>
        <div className="p-4 rounded-xl bg-dark-800/50 border border-white/5">
          <div className="text-lg font-bold text-red-400">4</div>
          <div className="text-xs text-gray-500 mt-1">High Risk</div>
        </div>
        <div className="p-4 rounded-xl bg-dark-800/50 border border-white/5">
          <div className="text-lg font-bold text-white">72.4</div>
          <div className="text-xs text-gray-500 mt-1">Avg Score</div>
        </div>
      </div>

      {/* Audits Table */}
      <div className="rounded-xl bg-dark-800/50 border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">#</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">Contract</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">Chain</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">Score</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">Risk</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">Issues</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">Date</th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((audit, i) => (
                <tr
                  key={audit.id}
                  className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group"
                >
                  <td className="px-5 py-3.5 text-xs text-gray-600 font-mono">{String(i + 1).padStart(2, '0')}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-brand-500/10 flex items-center justify-center">
                        <FileSearch className="w-3.5 h-3.5 text-brand-400" />
                      </div>
                      <Link to="/audit/result" className="text-sm font-mono text-gray-300 group-hover:text-cyan-400 transition-colors">
                        {audit.name}
                      </Link>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded">{audit.chain}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-1.5 bg-dark-600 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            audit.score >= 80 ? 'bg-emerald-400' : audit.score >= 60 ? 'bg-amber-400' : 'bg-red-400'
                          }`}
                          style={{ width: `${audit.score}%` }}
                        />
                      </div>
                      <span className={`text-sm font-bold ${getScoreColor(audit.score)}`}>{audit.score}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase border ${getRiskColor(audit.risk)}`}>
                      {audit.risk}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-sm font-medium ${audit.issues > 5 ? 'text-red-400' : audit.issues > 2 ? 'text-amber-400' : 'text-gray-400'}`}>
                      {audit.issues}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {audit.date}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        to="/audit/result"
                        className="w-7 h-7 rounded-md bg-white/5 flex items-center justify-center text-gray-500 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all"
                        title="View Report"
                      >
                        <BarChart3 className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        className="w-7 h-7 rounded-md bg-white/5 flex items-center justify-center text-gray-500 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all"
                        title="Download PDF"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button
                        className="w-7 h-7 rounded-md bg-white/5 flex items-center justify-center text-gray-500 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all"
                        title="View on Explorer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <Search className="w-10 h-10 text-gray-600 mx-auto mb-4" />
            <h3 className="text-sm font-semibold text-gray-400 mb-1">No audits found</h3>
            <p className="text-xs text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <span className="text-xs text-gray-500">Showing {filtered.length} of {allAudits.length} audits</span>
        <div className="flex gap-2">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                page === 1
                  ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/30'
                  : 'bg-white/5 text-gray-500 border border-white/5 hover:border-white/10'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
