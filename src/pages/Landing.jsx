import { Link } from 'react-router-dom'
import { 
  Shield, Zap, Brain, Lock, Eye, ArrowRight, ChevronRight,
  FileSearch, AlertTriangle, CheckCircle2, BarChart3,
  Code2, Database, Globe, Cpu, Sparkles, Activity, ShieldCheck
} from 'lucide-react'
import { severityConfig, mockAuditResult } from '../data/mockData'

export default function Landing() {
  const features = [
    {
      icon: Brain,
      title: 'MiMo V2.5 Powered',
      desc: 'Leveraging Xiaomi\'s flagship reasoning model for deep semantic analysis of smart contracts. Goes beyond pattern matching.',
      color: 'text-cyan-400',
      bg: 'bg-cyan-400/10',
    },
    {
      icon: Eye,
      title: 'Multi-Vector Detection',
      desc: 'Detects reentrancy, access control flaws, oracle manipulation, flash loan attacks, and 50+ vulnerability patterns.',
      color: 'text-brand-400',
      bg: 'bg-brand-400/10',
    },
    {
      icon: Zap,
      title: 'Instant Results',
      desc: 'Full audit report in under 30 seconds. No waiting days for manual review. Ship fast, ship safe.',
      color: 'text-amber-400',
      bg: 'bg-amber-400/10',
    },
    {
      icon: Lock,
      title: 'On-Chain Verification',
      desc: 'Every audit result is anchored on-chain as a verifiable credential. Prove your contract\'s security to anyone.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
    },
    {
      icon: Code2,
      title: 'Fix Suggestions',
      desc: 'Not just detection — get detailed code fixes with explanations. Learn while you secure.',
      color: 'text-rose-400',
      bg: 'bg-rose-400/10',
    },
    {
      icon: Globe,
      title: 'Multi-Chain Support',
      desc: 'Ethereum, BSC, Polygon, Arbitrum, Solana, and more. One platform for all your contracts.',
      color: 'text-purple-400',
      bg: 'bg-purple-400/10',
    },
  ]

  const stats = [
    { value: '1,247+', label: 'Contracts Audited', icon: FileSearch },
    { value: '8,934', label: 'Vulnerabilities Found', icon: AlertTriangle },
    { value: '$2.4B', label: 'Value Protected', icon: ShieldCheck },
    { value: '< 30s', label: 'Average Scan Time', icon: Activity },
  ]

  const severityBreakdown = Object.entries(severityConfig).filter(([k]) => k !== 'Informational')

  return (
    <div className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 text-xs font-medium mb-8 animate-fade-in-up">
            <Sparkles className="w-3.5 h-3.5" />
            Powered by Xiaomi MiMo V2.5 — Next-Gen AI Reasoning
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <span className="text-white">Smart Contract</span>
            <br />
            <span className="gradient-text">Security, Reimagined</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            AI-powered vulnerability detection that finds what humans miss.
            <br className="hidden sm:block" />
            Audit any Solidity contract in seconds, not days.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Link
              to="/audit"
              className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-brand-500 hover:from-cyan-400 hover:to-brand-400 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105"
            >
              <FileSearch className="w-5 h-5" />
              Start Free Audit
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#how-it-works"
              className="flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white font-semibold rounded-xl transition-all duration-300"
            >
              <Code2 className="w-5 h-5" />
              How It Works
            </a>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="group p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-cyan-400/20 hover:bg-cyan-400/5 transition-all duration-300">
                <Icon className="w-5 h-5 text-cyan-400 mb-2 mx-auto" />
                <div className="text-2xl font-bold text-white">{value}</div>
                <div className="text-xs text-gray-500 mt-1">{label}</div>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronRight className="w-6 h-6 text-gray-600 rotate-90" />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How <span className="text-cyan-400">AuditChain</span> Works
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Three simple steps to bulletproof your smart contracts
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Upload Contract',
                desc: 'Paste your Solidity code or upload a .sol file. We support all major frameworks — Hardhat, Foundry, Truffle.',
                icon: Code2,
                color: 'cyan',
              },
              {
                step: '02',
                title: 'AI Analysis',
                desc: 'MiMo V2.5 performs deep semantic analysis, cross-references vulnerability databases, and applies formal verification patterns.',
                icon: Cpu,
                color: 'brand',
              },
              {
                step: '03',
                title: 'Get Report',
                desc: 'Receive a detailed audit report with severity ratings, line-by-line analysis, and ready-to-use code fixes.',
                icon: Database,
                color: 'emerald',
              },
            ].map(({ step, title, desc, icon: Icon, color }) => (
              <div key={step} className="relative group">
                <div className={`absolute -inset-px rounded-2xl bg-gradient-to-b from-${color}-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative p-8 rounded-2xl bg-dark-800/50 border border-white/5 group-hover:border-white/10 transition-all">
                  <div className="text-7xl font-black text-white/[0.03] absolute top-4 right-6">{step}</div>
                  <div className={`w-12 h-12 rounded-xl bg-${color}-400/10 flex items-center justify-center mb-5`}>
                    <Icon className={`w-6 h-6 text-${color}-400`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                  <p className="text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Choose <span className="gradient-text">AuditChain</span>
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Enterprise-grade security analysis powered by cutting-edge AI
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc, color, bg }, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl bg-dark-800/30 border border-white/5 hover:border-white/10 hover:bg-dark-700/30 transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Preview */}
      <section className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              See It In <span className="text-cyan-400">Action</span>
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Real audit output from a vulnerable VaultToken contract
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Severity Summary */}
            <div className="lg:col-span-2 space-y-4">
              <div className="p-6 rounded-2xl bg-dark-800/50 border border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white">Overall Risk</h3>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-300 border border-red-500/40">
                    HIGH
                  </span>
                </div>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-4xl font-black text-red-400">32</span>
                  <span className="text-sm text-gray-500 mb-1">/100</span>
                </div>
                <div className="w-full h-2 bg-dark-600 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full" style={{ width: '32%' }} />
                </div>
                <p className="text-xs text-gray-500 mt-2">Security Score — higher is better</p>
              </div>

              <div className="p-6 rounded-2xl bg-dark-800/50 border border-white/5">
                <h3 className="font-semibold text-white mb-4">Issues Found</h3>
                <div className="space-y-3">
                  {severityBreakdown.map(([severity, config]) => {
                    const count = severity === 'Critical' ? 2 : severity === 'High' ? 2 : severity === 'Medium' ? 2 : 0
                    return (
                      <div key={severity} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${config.bg.replace('/10', '')}`} />
                          <span className="text-sm text-gray-400">{severity}</span>
                        </div>
                        <span className="text-sm font-bold text-white">{count}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-dark-800/50 border border-white/5">
                <h3 className="font-semibold text-white mb-3">Contract Info</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">File</span>
                    <span className="text-gray-300 font-mono text-xs">VaultToken.sol</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Model</span>
                    <span className="text-cyan-400 text-xs">MiMo V2.5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Analyzed</span>
                    <span className="text-gray-300 text-xs">~4.2s</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Issues List */}
            <div className="lg:col-span-3 space-y-4">
              {mockAuditResult.issues.slice(0, 4).map((issue, i) => {
                const config = severityConfig[issue.severity]
                return (
                  <div key={i} className={`p-5 rounded-xl bg-dark-800/40 border ${config.border} hover:bg-dark-700/40 transition-all duration-300 group`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{config.icon}</span>
                        <span className="font-mono text-xs text-gray-500">{issue.id}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase border ${config.badge}`}>
                        {issue.severity}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                      {issue.title}
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                      {issue.description}
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <span className="text-[10px] font-mono text-gray-600 bg-white/5 px-2 py-0.5 rounded">
                        Line {issue.line}
                      </span>
                      <span className="text-[10px] font-mono text-gray-600 bg-white/5 px-2 py-0.5 rounded">
                        CVSS {issue.cvssScore}
                      </span>
                      <span className="text-[10px] font-mono text-gray-600 bg-white/5 px-2 py-0.5 rounded">
                        {issue.cweId}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/audit"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-brand-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
            >
              Try It Yourself
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="relative py-24 px-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-widest mb-8">Built With</h3>
          <div className="flex flex-wrap items-center justify-center gap-8 text-gray-600">
            {['Xiaomi MiMo V2.5', 'Solidity', 'React', 'Node.js', 'The Graph', 'IPFS', 'OpenZeppelin'].map((tech) => (
              <span key={tech} className="text-sm font-medium hover:text-cyan-400 transition-colors cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-b from-dark-700/50 to-dark-800/50 border border-white/5">
            <Shield className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Secure Your Contracts?
            </h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Join 1,200+ developers who trust AuditChain to protect their protocols.
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-brand-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
            >
              Launch App
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Minimal Footer for Landing */}
      <footer className="border-t border-white/5 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-bold"><span className="text-white">Audit</span><span className="text-cyan-400">Chain</span></span>
            <span className="text-xs text-gray-600 ml-2">© 2026</span>
          </div>
          <div className="flex items-center gap-6">
            {['Docs', 'GitHub', 'Twitter', 'Discord'].map((item) => (
              <a key={item} href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
