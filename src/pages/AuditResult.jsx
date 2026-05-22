import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Shield, AlertTriangle, ArrowLeft, Download, ExternalLink, 
  ChevronDown, ChevronRight, Copy, CheckCircle2, Clock, Zap,
  FileSearch, Code2, Lock, Eye, BarChart3, ShieldCheck
} from 'lucide-react'
import { mockAuditResult, severityConfig } from '../data/mockData'

export default function AuditResult() {
  const [expandedIssue, setExpandedIssue] = useState(0)
  const result = mockAuditResult

  const getScoreColor = (score) => {
    if (score >= 80) return { text: 'text-emerald-400', gradient: 'from-emerald-500 to-emerald-400' }
    if (score >= 60) return { text: 'text-amber-400', gradient: 'from-amber-500 to-amber-400' }
    return { text: 'text-red-400', gradient: 'from-red-500 to-red-400' }
  }

  const scoreColor = getScoreColor(result.overallScore)

  const getIssueCount = (severity) => {
    return result.issues.filter(i => i.severity === severity).length
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            to="/audit"
            className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Audit Report</h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs font-mono text-gray-500">{result.contractName}</span>
              <span className="text-xs text-gray-600">•</span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {result.auditDate}
              </span>
              <span className="text-xs text-gray-600">•</span>
              <span className="text-xs text-cyan-400 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                {result.mimoModel}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 text-gray-400 text-sm rounded-lg hover:bg-white/10 transition-all">
            <Download className="w-4 h-4" />
            Export PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 text-gray-400 text-sm rounded-lg hover:bg-white/10 transition-all">
            <ExternalLink className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Sidebar - Summary */}
        <div className="space-y-4">
          {/* Security Score */}
          <div className="p-6 rounded-xl bg-dark-800/50 border border-white/5 text-center">
            <h3 className="text-sm font-semibold text-white mb-4">Security Score</h3>
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#1a1a2e" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="42" fill="none"
                  stroke="url(#scoreGrad)" strokeWidth="8"
                  strokeDasharray={`${result.overallScore * 2.64} ${264 - result.overallScore * 2.64}`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#f87171" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-3xl font-black ${scoreColor.text}`}>{result.overallScore}</span>
                <span className="text-[10px] text-gray-500">/100</span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-300 border border-red-500/40">
              {result.overallRisk} Risk
            </span>
          </div>

          {/* Issue Breakdown */}
          <div className="p-5 rounded-xl bg-dark-800/50 border border-white/5">
            <h3 className="text-sm font-semibold text-white mb-4">Issue Breakdown</h3>
            <div className="space-y-3">
              {Object.entries(severityConfig).filter(([k]) => k !== 'Informational').map(([severity, config]) => {
                const count = getIssueCount(severity)
                return (
                  <div key={severity} className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm">{config.icon}</span>
                      <span className="text-sm text-gray-400">{severity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-dark-600 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${config.bg.replace('/10', '')}`}
                          style={{ width: `${count ? (count / result.totalIssues) * 100 : 0}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-white w-5 text-right">{count}</span>
                    </div>
                  </div>
                )
              })}
              <div className="border-t border-white/5 pt-3 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-400">Total</span>
                <span className="text-sm font-bold text-white">{result.totalIssues}</span>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="p-5 rounded-xl bg-dark-800/50 border border-white/5">
            <h3 className="text-sm font-semibold text-white mb-3">Summary</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              {result.summary}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-dark-800/50 border border-white/5 text-center">
              <div className="text-lg font-bold text-cyan-400">4.2s</div>
              <div className="text-[10px] text-gray-500 mt-1">Scan Time</div>
            </div>
            <div className="p-4 rounded-xl bg-dark-800/50 border border-white/5 text-center">
              <div className="text-lg font-bold text-brand-400">52</div>
              <div className="text-[10px] text-gray-500 mt-1">Lines Analyzed</div>
            </div>
          </div>
        </div>

        {/* Right - Issues Detail */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-white">Vulnerabilities Detected</h2>
            <span className="text-xs text-gray-500">{result.issues.length} issues</span>
          </div>

          {result.issues.map((issue, i) => {
            const config = severityConfig[issue.severity]
            const isExpanded = expandedIssue === i

            return (
              <div
                key={issue.id}
                className={`rounded-xl border transition-all duration-300 ${
                  isExpanded ? `${config.border} bg-dark-700/30` : 'border-white/5 bg-dark-800/30 hover:border-white/10'
                }`}
              >
                {/* Issue Header */}
                <button
                  onClick={() => setExpandedIssue(isExpanded ? -1 : i)}
                  className="w-full p-5 text-left flex items-start gap-4"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <span className="text-lg">{config.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[11px] text-gray-500">{issue.id}</span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase border ${config.badge}`}>
                        {issue.severity}
                      </span>
                      <span className="text-[10px] text-gray-600 bg-white/5 px-2 py-0.5 rounded">
                        CVSS {issue.cvssScore}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-white">{issue.title}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{issue.description}</p>
                  </div>
                  <div className="flex-shrink-0 ml-2">
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-5 pb-5 space-y-4 border-t border-white/5 pt-4">
                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5">
                        <Code2 className="w-3.5 h-3.5 text-gray-500" />
                        <span className="text-[11px] text-gray-400">Line {issue.line}</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5">
                        <Eye className="w-3.5 h-3.5 text-gray-500" />
                        <span className="text-[11px] text-gray-400">{issue.category}</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5">
                        <Lock className="w-3.5 h-3.5 text-gray-500" />
                        <span className="text-[11px] text-gray-400">{issue.cweId}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Description</h4>
                      <p className="text-sm text-gray-300 leading-relaxed">{issue.description}</p>
                    </div>

                    {/* Impact */}
                    <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/10">
                      <h4 className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Impact
                      </h4>
                      <p className="text-sm text-red-300/80 leading-relaxed">{issue.impact}</p>
                    </div>

                    {/* Recommendation */}
                    <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                      <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Recommendation
                      </h4>
                      <p className="text-sm text-emerald-300/80 leading-relaxed">{issue.recommendation}</p>
                    </div>

                    {/* Code Snippet */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Code Fix</h4>
                        <button className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                          <Copy className="w-3 h-3" />
                          Copy
                        </button>
                      </div>
                      <div className="rounded-lg bg-dark-900 border border-white/5 overflow-hidden">
                        <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5 bg-dark-800/50">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-red-500/50" />
                            <div className="w-2 h-2 rounded-full bg-amber-500/50" />
                            <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                          </div>
                          <span className="text-[10px] text-gray-600 font-mono">fix.sol</span>
                        </div>
                        <pre className="p-4 overflow-x-auto">
                          <code className="text-xs font-mono text-gray-300 leading-relaxed whitespace-pre">
                            {issue.codeSnippet}
                          </code>
                        </pre>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          {/* Verdict Banner */}
          <div className="mt-6 p-6 rounded-xl bg-gradient-to-r from-red-500/10 to-amber-500/10 border border-red-500/20">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">⚠️ Not Safe for Deployment</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  This contract contains <span className="text-red-400 font-semibold">2 critical</span> and <span className="text-amber-400 font-semibold">2 high-severity</span> vulnerabilities 
                  that could result in complete loss of funds. We strongly recommend addressing all issues before deployment. 
                  Re-audit after fixes are applied.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
