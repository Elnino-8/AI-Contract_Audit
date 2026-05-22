import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  FileSearch, Upload, Code2, Zap, Shield, AlertTriangle, 
  ChevronDown, Loader2, CheckCircle2, ArrowRight
} from 'lucide-react'
import { sampleContract } from '../data/mockData'

const chains = ['Ethereum', 'BSC', 'Polygon', 'Arbitrum', 'Solana', 'Avalanche', 'Base']

export default function AuditNew() {
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [contractName, setContractName] = useState('')
  const [selectedChain, setSelectedChain] = useState('Ethereum')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState('')

  const analysisSteps = [
    'Parsing contract AST...',
    'Analyzing function signatures...',
    'Detecting access control patterns...',
    'Scanning for reentrancy vectors...',
    'Checking input validation...',
    'MiMo V2.5 deep analysis...',
    'Generating vulnerability report...',
    'Computing security score...',
  ]

  const handleAnalyze = async () => {
    if (!code.trim()) return
    setIsAnalyzing(true)
    setProgress(0)

    for (let i = 0; i < analysisSteps.length; i++) {
      setCurrentStep(analysisSteps[i])
      await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 300))
      setProgress(((i + 1) / analysisSteps.length) * 100)
    }

    await new Promise(resolve => setTimeout(resolve, 500))
    navigate('/audit/result')
  }

  const loadSample = () => {
    setCode(sampleContract)
    setContractName('VaultToken.sol')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">New Smart Contract Audit</h1>
        <p className="text-sm text-gray-500 mt-1">
          Upload or paste your Solidity code for AI-powered vulnerability analysis
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Code Input */}
        <div className="lg:col-span-2">
          <div className="rounded-xl bg-dark-800/50 border border-white/5 overflow-hidden">
            {/* Editor Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-dark-700/30">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                </div>
                <span className="text-xs text-gray-500 font-mono">
                  {contractName || 'untitled.sol'}
                </span>
              </div>
              <button
                onClick={loadSample}
                className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
              >
                <Code2 className="w-3 h-3" />
                Load Sample Contract
              </button>
            </div>

            {/* Code Area */}
            <div className="relative">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="// Paste your Solidity smart contract code here...

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MyContract {
    // Your code here...
}"
                className="w-full h-[500px] p-5 bg-transparent text-sm font-mono text-gray-300 placeholder:text-gray-600 resize-none focus:outline-none leading-relaxed"
                spellCheck={false}
              />
              {code && (
                <div className="absolute bottom-3 right-4 text-[10px] text-gray-600">
                  {code.split('\n').length} lines · {code.length} chars
                </div>
              )}
            </div>
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={!code.trim() || isAnalyzing}
            className={`w-full mt-4 flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold text-base transition-all duration-300 ${
              code.trim() && !isAnalyzing
                ? 'bg-gradient-to-r from-cyan-500 to-brand-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01]'
                : 'bg-dark-700/50 text-gray-600 cursor-not-allowed'
            }`}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing with MiMo V2.5...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                Run AI Audit
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          {/* Progress */}
          {isAnalyzing && (
            <div className="mt-4 p-4 rounded-xl bg-dark-800/50 border border-cyan-400/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-cyan-400 font-medium">{currentStep}</span>
                <span className="text-xs text-gray-500">{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-1.5 bg-dark-600 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-brand-500 rounded-full transition-all duration-300 animate-gradient"
                  style={{ width: `${progress}%`, backgroundSize: '200% 100%' }}
                />
              </div>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse-glow" />
                <span className="text-[11px] text-gray-500">Powered by Xiaomi MiMo V2.5 Reasoning Model</span>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Contract Settings */}
          <div className="p-5 rounded-xl bg-dark-800/50 border border-white/5">
            <h3 className="font-semibold text-white mb-4 text-sm">Contract Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">Contract Name</label>
                <input
                  type="text"
                  value={contractName}
                  onChange={(e) => setContractName(e.target.value)}
                  placeholder="e.g. MyToken.sol"
                  className="w-full px-3 py-2 bg-dark-700/50 border border-white/5 rounded-lg text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-400/30 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">Target Chain</label>
                <div className="relative">
                  <select
                    value={selectedChain}
                    onChange={(e) => setSelectedChain(e.target.value)}
                    className="w-full px-3 py-2 bg-dark-700/50 border border-white/5 rounded-lg text-sm text-white appearance-none cursor-pointer focus:outline-none focus:border-cyan-400/30 transition-colors"
                  >
                    {chains.map((chain) => (
                      <option key={chain} value={chain}>{chain}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Audit Depth */}
          <div className="p-5 rounded-xl bg-dark-800/50 border border-white/5">
            <h3 className="font-semibold text-white mb-4 text-sm">Audit Configuration</h3>
            <div className="space-y-2">
              {[
                { label: 'Quick Scan', desc: 'Common vulnerabilities only', time: '~10s', active: false },
                { label: 'Standard Audit', desc: 'Full analysis + fixes', time: '~30s', active: true },
                { label: 'Deep Analysis', desc: 'Formal verification + all vectors', time: '~60s', active: false },
              ].map(({ label, desc, time, active }) => (
                <button
                  key={label}
                  className={`w-full p-3 rounded-lg text-left transition-all ${
                    active
                      ? 'bg-cyan-400/10 border border-cyan-400/30'
                      : 'bg-white/[0.02] border border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${active ? 'text-cyan-400' : 'text-gray-400'}`}>{label}</span>
                    <span className="text-[10px] text-gray-600">{time}</span>
                  </div>
                  <span className="text-[11px] text-gray-500 mt-0.5 block">{desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* What We Check */}
          <div className="p-5 rounded-xl bg-dark-800/50 border border-white/5">
            <h3 className="font-semibold text-white mb-4 text-sm">What We Check</h3>
            <div className="space-y-2.5">
              {[
                'Reentrancy attacks',
                'Access control flaws',
                'Integer overflow/underflow',
                'Unchecked external calls',
                'Flash loan vulnerabilities',
                'Oracle manipulation',
                'Front-running exposure',
                'Gas optimization',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400/60 flex-shrink-0" />
                  <span className="text-xs text-gray-500">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* MiMo Badge */}
          <div className="p-4 rounded-xl bg-gradient-to-b from-brand-600/10 to-cyan-600/10 border border-brand-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-semibold text-white">Powered by MiMo V2.5</span>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Xiaomi's flagship reasoning model with enhanced code understanding and vulnerability detection capabilities.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
