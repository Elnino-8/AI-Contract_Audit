import { Link, useLocation } from 'react-router-dom'
import { Shield, LayoutDashboard, FileSearch, History, Zap } from 'lucide-react'

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/audit', label: 'New Audit', icon: FileSearch },
  { path: '/history', label: 'History', icon: History },
]

export default function Navbar() {
  const location = useLocation()

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-xl bg-dark-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <Shield className="w-7 h-7 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
              <Zap className="w-3.5 h-3.5 text-brand-400 absolute -top-0.5 -right-0.5" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              <span className="text-white">Audit</span>
              <span className="text-cyan-400">Chain</span>
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ path, label, icon: Icon }) => {
              const active = location.pathname === path
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'bg-brand-600/20 text-cyan-400 border border-cyan-400/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              )
            })}
          </div>

          {/* Connect Wallet Button */}
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-600 to-cyan-600 hover:from-brand-500 hover:to-cyan-500 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-brand-500/20 hover:shadow-brand-500/40">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-glow" />
            Connect Wallet
          </button>
        </div>
      </div>
    </nav>
  )
}
