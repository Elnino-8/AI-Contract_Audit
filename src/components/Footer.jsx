import { Shield, Zap, Globe, Send, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-dark-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="relative">
                <Shield className="w-6 h-6 text-cyan-400" />
                <Zap className="w-3 h-3 text-brand-400 absolute -top-0.5 -right-0.5" />
              </div>
              <span className="text-lg font-bold">
                <span className="text-white">Audit</span>
                <span className="text-cyan-400">Chain</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm max-w-md leading-relaxed">
              AI-powered smart contract auditing platform built on Xiaomi MiMo V2.5. 
              Detect vulnerabilities before they become exploits. Secure the decentralized future.
            </p>
            <div className="flex gap-3 mt-5">
              {[Globe, Send, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-gray-500 hover:text-cyan-400 hover:border-cyan-400/30 hover:bg-cyan-400/5 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-2.5">
              {['Dashboard', 'New Audit', 'Audit History', 'API Docs'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {['Documentation', 'Vulnerability DB', 'Blog', 'Community'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600">
            © 2026 AuditChain. Powered by Xiaomi MiMo V2.5. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service'].map((item) => (
              <a key={item} href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
