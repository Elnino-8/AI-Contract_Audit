# 🔒 AuditChain — AI-Powered Smart Contract Auditor

> **Detect vulnerabilities before they become exploits. Secure the decentralized future.**

AuditChain is a decentralized application (dApp) that leverages **Xiaomi MiMo V2.5** — a state-of-the-art AI reasoning model — to perform automated, deep semantic analysis of Solidity smart contracts. Unlike traditional static analyzers that rely on pattern matching, AuditChain uses AI to understand code intent, detect complex multi-step attack vectors, and provide actionable fix recommendations.

## 🎯 Project Description (for Xiaomi MiMo 100T Application)

**AuditChain** is an AI-powered smart contract security auditing platform that combines the reasoning capabilities of Xiaomi MiMo V2.5 with blockchain technology to protect decentralized protocols from exploits.

### Problem
Over **$3.8 billion** was lost to smart contract exploits in 2025 alone. Traditional audit tools miss complex vulnerabilities like reentrancy chains, oracle manipulation, and flash loan attacks. Manual audits are expensive ($50K-$500K) and take weeks.

### Solution
AuditChain uses MiMo V2.5's advanced reasoning capabilities to:
- **Analyze** smart contract code at semantic depth beyond pattern matching
- **Detect** 50+ vulnerability types including reentrancy, access control flaws, oracle manipulation, and flash loan vectors
- **Generate** detailed fix recommendations with corrected code snippets
- **Anchor** audit results on-chain as verifiable credentials

### Why MiMo V2.5?
MiMo V2.5's reasoning model excels at:
- Understanding complex code semantics and control flow
- Multi-step vulnerability chain detection
- Context-aware fix generation that maintains contract invariants
- Processing contracts in under 30 seconds with high accuracy

### Tech Stack
- **AI Engine**: Xiaomi MiMo V2.5 (Reasoning Model) via MiMo API
- **Frontend**: React + Vite + Tailwind CSS
- **Smart Contracts**: Solidity (Ethereum, BSC, Polygon, Arbitrum, Solana)
- **On-Chain Anchoring**: Audit certificates stored as on-chain attestations
- **Standards**: CWE/CVSS vulnerability classification

### Impact
- Democratize smart contract security — from $50K+ manual audits to free AI-powered analysis
- Reduce exploit losses by catching vulnerabilities before deployment
- Build a verifiable trust layer for DeFi through on-chain audit credentials

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/elnino-8/audit-chain.git
cd audit-chain

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📸 Features

### Landing Page
- Modern Web3-inspired UI with dark theme
- Animated hero section with live statistics
- Feature showcase with severity breakdown demo
- How-it-works step-by-step guide

### Dashboard
- Personal audit statistics and trends
- Recent audit history with risk scores
- AI model status monitoring
- Quick action shortcuts

### New Audit
- Code editor with syntax highlighting
- Sample contract loader for demo
- Configurable audit depth (Quick/Standard/Deep)
- Real-time analysis progress with MiMo V2.5 branding

### Audit Report
- Overall security score with circular gauge
- Severity-classified vulnerability list (Critical/High/Medium/Low)
- Expandable issue cards with full details
- Code fix recommendations with copy button
- CWE/CVSS scoring for each vulnerability
- Deployment safety verdict

### Audit History
- Searchable audit archive
- Risk-based filtering
- Score trend visualization
- Export and sharing capabilities

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│                  Frontend                    │
│         React + Vite + Tailwind CSS          │
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ Dashboard │  │  Audit   │  │ History  │  │
│  │   Page    │  │  Engine  │  │   Page   │  │
│  └──────────┘  └────┬─────┘  └──────────┘  │
│                     │                        │
│              ┌──────┴──────┐                 │
│              │  MiMo API   │                 │
│              │  (V2.5)     │                 │
│              └──────┬──────┘                 │
│                     │                        │
│         ┌───────────┴───────────┐            │
│         │  Vulnerability DB     │            │
│         │  (CWE/CVSS/Patterns)  │            │
│         └───────────────────────┘            │
│                                             │
├─────────────────────────────────────────────┤
│            Blockchain Layer                  │
│    On-chain audit attestations (EVM)         │
└─────────────────────────────────────────────┘
```

## 📝 License

MIT License — © 2026 AuditChain

---

**Built for the Xiaomi MiMo Orbit: 100T Token Grant for Builders**
