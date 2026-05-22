// Mock data for demo purposes
export const sampleContract = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VaultToken is ERC20, Ownable {
    mapping(address => bool) public blacklist;
    uint256 public totalSupply;
    uint256 public maxSupply = 1_000_000_000 * 10**18;
    
    // BUG: No access control on this function
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
    
    // BUG: Missing zero address check
    function addToBlacklist(address user) public {
        blacklist[user] = true;
    }
    
    // BUG: Reentrancy vulnerability
    function withdraw(uint256 amount) public {
        require(balanceOf(msg.sender) >= amount);
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success);
        _burn(msg.sender, amount);
    }
    
    // BUG: No event emission
    function removeFromBlacklist(address user) public {
        blacklist[user] = false;
    }
    
    // BUG: Unchecked return value
    function transfer(address to, uint256 amount) public override returns (bool) {
        require(!blacklist[msg.sender], "Blacklisted");
        super.transfer(to, amount);
        return true;
    }
}`

export const mockAuditResult = {
  contractName: 'VaultToken.sol',
  auditDate: '2026-05-22',
  mimoModel: 'MiMo V2.5 — Reasoning',
  overallScore: 32,
  overallRisk: 'High',
  totalIssues: 6,
  summary: 'The VaultToken contract contains several critical and high-severity vulnerabilities that could lead to complete loss of funds, unauthorized token minting, and reentrancy attacks. Immediate remediation is required before deployment.',
  issues: [
    {
      id: 'VULN-001',
      title: 'Unprotected Mint Function — No Access Control',
      severity: 'Critical',
      category: 'Access Control',
      line: '15-17',
      description: 'The mint() function has no access modifier (onlyOwner, etc.), allowing ANY address to mint unlimited tokens. This could lead to catastrophic inflation and total loss of token value.',
      impact: 'Complete destruction of token economics. Any user can mint infinite tokens and drain all liquidity.',
      recommendation: 'Add onlyOwner modifier or implement a role-based access control system. Consider using OpenZeppelin AccessControl.',
      codeSnippet: `// VULNERABLE:
function mint(address to, uint256 amount) public {
    _mint(to, amount);
}

// FIXED:
function mint(address to, uint256 amount) public onlyOwner {
    require(totalSupply() + amount <= maxSupply, "Exceeds max supply");
    _mint(to, amount);
}`,
      cweId: 'CWE-284',
      cvssScore: 9.8,
    },
    {
      id: 'VULN-002',
      title: 'Reentrancy in Withdraw Function',
      severity: 'Critical',
      category: 'Reentrancy',
      line: '25-30',
      description: 'The withdraw() function makes an external call before updating state (burning tokens). An attacker can deploy a malicious contract that re-enters withdraw() before the burn executes, draining all ETH from the contract.',
      impact: 'Complete drainage of contract ETH balance through recursive callback attack.',
      recommendation: 'Apply checks-effects-interactions pattern. Use ReentrancyGuard from OpenZeppelin. Always update state before external calls.',
      codeSnippet: `// VULNERABLE:
function withdraw(uint256 amount) public {
    require(balanceOf(msg.sender) >= amount);
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success);
    _burn(msg.sender, amount);  // State update AFTER call
}

// FIXED:
function withdraw(uint256 amount) public nonReentrant {
    require(balanceOf(msg.sender) >= amount, "Insufficient");
    _burn(msg.sender, amount);  // State update BEFORE call
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success, "Transfer failed");
}`,
      cweId: 'CWE-841',
      cvssScore: 9.6,
    },
    {
      id: 'VULN-003',
      title: 'Missing Zero Address Validation in Blacklist',
      severity: 'High',
      category: 'Input Validation',
      line: '21-23',
      description: 'The addToBlacklist() function does not validate the input address. Setting address(0) as blacklisted could cause issues with default mappings and allow blacklisted users to bypass restrictions through the zero address.',
      impact: 'Potential bypass of blacklist mechanism. Logical errors in access control enforcement.',
      recommendation: 'Add require(user != address(0)) check. Add events for blacklist state changes.',
      codeSnippet: `// FIXED:
function addToBlacklist(address user) public onlyOwner {
    require(user != address(0), "Invalid address");
    blacklist[user] = true;
    emit BlacklistUpdated(user, true);
}`,
      cweId: 'CWE-20',
      cvssScore: 7.5,
    },
    {
      id: 'VULN-004',
      title: 'Missing Event Emission on State Change',
      severity: 'Medium',
      category: 'Best Practice',
      line: '33-35',
      description: 'The removeFromBlacklist() function changes state without emitting an event. This makes it impossible to track blacklist changes off-chain, complicating monitoring and incident response.',
      impact: 'Reduced transparency and inability to monitor critical security changes via event logs.',
      recommendation: 'Emit events for all state changes, especially security-related operations.',
      codeSnippet: `// FIXED:
event BlacklistUpdated(address indexed user, bool status);

function removeFromBlacklist(address user) public onlyOwner {
    blacklist[user] = false;
    emit BlacklistUpdated(user, false);
}`,
      cweId: 'CWE-778',
      cvssScore: 4.0,
    },
    {
      id: 'VULN-005',
      title: 'Unchecked Return Value in Transfer Override',
      severity: 'High',
      category: 'Unchecked Return',
      line: '37-42',
      description: 'The transfer() override calls super.transfer() but does not properly validate the return value in all execution paths. If the parent call fails silently, tokens could be lost.',
      impact: 'Potential token loss during transfers. Silent failures could mislead users.',
      recommendation: 'Use SafeERC20 patterns and ensure all return values are explicitly checked.',
      codeSnippet: `// IMPROVED:
function transfer(address to, uint256 amount) public override returns (bool) {
    require(!blacklist[msg.sender], "Blacklisted");
    require(to != address(0), "Transfer to zero");
    return super.transfer(to, amount);
}`,
      cweId: 'CWE-252',
      cvssScore: 7.0,
    },
    {
      id: 'VULN-006',
      title: 'Missing Max Supply Enforcement in Mint',
      severity: 'Medium',
      category: 'Logic Error',
      line: '15-17',
      description: 'Even if access control is added to mint(), the function does not check against maxSupply. The contract defines maxSupply but never enforces it, making the cap meaningless.',
      impact: 'Token supply could exceed intended maximum, violating tokenomics guarantees.',
      recommendation: 'Add supply cap check in mint function to enforce maxSupply invariant.',
      codeSnippet: `// FIXED:
function mint(address to, uint256 amount) public onlyOwner {
    require(totalSupply() + amount <= maxSupply, "Exceeds max supply");
    _mint(to, amount);
}`,
      cweId: 'CWE-682',
      cvssScore: 5.0,
    },
  ],
  stats: {
    contractsAudited: 1247,
    vulnerabilitiesFound: 8934,
    criticalIssues: 1256,
    totalValueProtected: '$2.4B',
  }
}

export const severityConfig = {
  Critical: { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30', icon: '🔴', badge: 'bg-red-500/20 text-red-300 border-red-500/40' },
  High: { color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', icon: '🟠', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
  Medium: { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', icon: '🟡', badge: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40' },
  Low: { color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30', icon: '🔵', badge: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
  Informational: { color: 'text-gray-400', bg: 'bg-gray-500/10', border: 'border-gray-500/30', icon: '⚪', badge: 'bg-gray-500/20 text-gray-300 border-gray-500/40' },
}

export const recentAudits = [
  { id: 1, name: 'UniswapV3Router.sol', date: '2026-05-21', score: 85, risk: 'Low', issues: 2, chain: 'Ethereum' },
  { id: 2, name: 'AaveLendingPool.sol', date: '2026-05-20', score: 72, risk: 'Medium', issues: 4, chain: 'Ethereum' },
  { id: 3, name: 'PancakeFactory.sol', date: '2026-05-19', score: 45, risk: 'High', issues: 7, chain: 'BSC' },
  { id: 4, name: 'CompoundCToken.sol', date: '2026-05-18', score: 91, risk: 'Low', issues: 1, chain: 'Ethereum' },
  { id: 5, name: 'CurvePool.sol', date: '2026-05-17', score: 63, risk: 'Medium', issues: 5, chain: 'Ethereum' },
]
