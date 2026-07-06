// Mock data for dashboard

// -----------------------------------------------------------------------------
// Portfolio Types (from NodeAI storage - matches Portfolio box schema)
// -----------------------------------------------------------------------------

export interface PortfolioAllocationItem {
  name: string;
  symbol: string;
  type: 'liquid_token' | 'vault' | string;
  chain: string;
  protocol: string;
  address: string;
  asset_address: string | null;
  apy: number;
  risk_score: number;
  amount: number;
  percentage: number;
  live_balance: number | null;
  live_balance_raw: string | null;
  shares: string | null;
  decimals: number | null;
  last_tx_hash: string | null;
  orchestrator_address: string | null;
}

export interface NodeAIPortfolio {
  portfolio_id: string;
  total_amount: number;
  target_chain: string;
  liquid_percentage: number;
  vault_percentage: number;
  expected_apy: number;
  risk_score: number;
  risk_preference: string;
  created_at: string;
  allocation: PortfolioAllocationItem[];
  execution_results: Record<string, any>;
  weighted_apy: number;
}

/**
 * Convert NodeAI Portfolio allocation to Strategy format for display.
 * Maps the backend portfolio data to the frontend Strategy interface.
 */
export function portfolioToStrategies(portfolio: NodeAIPortfolio): Strategy[] {
  return portfolio.allocation.map((item, index) => ({
    id: `${index + 1}`,
    name: item.name,
    type: mapAllocationType(item.type),
    allocation: Math.round(item.percentage),
    apy: parseFloat(item.apy.toFixed(1)),
    status: 'active' as const, // All allocations from portfolio are active
  }));
}

/**
 * Map backend allocation type to frontend display type.
 */
function mapAllocationType(backendType: string): Strategy['type'] {
  switch (backendType.toLowerCase()) {
    case 'liquid_token':
    case 'vault':
      return 'Stable Yield';
    case 'liquidity':
      return 'Liquidity';
    case 'rwa':
      return 'RWA';
    default:
      return 'Other';
  }
}

// -----------------------------------------------------------------------------
// Activity & Alert Types
// -----------------------------------------------------------------------------

export interface ActivityLog {
  id: string;
  timestamp: Date;
  type: 'action' | 'alert' | 'system';
  status: 'pending' | 'confirmed' | 'executed' | 'failed';
  description: string;
  details?: string;
  agent?: string;
}

export interface Alert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  acknowledged: boolean;
  category: 'risk' | 'execution' | 'policy' | 'system';
  affectedStrategy?: string;
  status: 'unresolved' | 'acknowledged' | 'resolved';
  recommendedAction?: string;
}

export interface StatCard {
  label: string;
  value: string;
  subtext?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export interface PortfolioMetric {
  name: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
}

export const mockActivityLogs: ActivityLog[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    type: 'action',
    status: 'executed',
    description: 'Rebalanced USDC allocation to Aave',
    details: 'Moved 500,000 USDC to Aave protocol',
    agent: 'YieldAgent-01',
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    type: 'action',
    status: 'confirmed',
    description: 'Drafted: Increase Compound exposure by 15%',
    details: 'Pending confirmation in chat',
    agent: 'YieldAgent-01',
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    type: 'alert',
    status: 'pending',
    description: 'Risk threshold approaching limit',
    details: 'Current exposure at 78% of max allocation',
  },
  {
    id: '4',
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    type: 'action',
    status: 'executed',
    description: 'Withdrew yield from Uniswap V3',
    details: 'Withdrew 2.5 ETH worth of yield',
    agent: 'YieldAgent-01',
  },
  {
    id: '5',
    timestamp: new Date(Date.now() - 1000 * 60 * 240),
    type: 'system',
    status: 'executed',
    description: 'Policy update applied',
    details: 'Updated max single-protocol exposure to 30%',
  },
];

export const mockAlerts: Alert[] = [
  {
    id: '1',
    severity: 'warning',
    title: 'Approaching Risk Limit',
    message: 'Current portfolio exposure is at 78% of maximum allocation threshold. Consider rebalancing.',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    acknowledged: false,
    category: 'risk',
    affectedStrategy: 'Compound USDC',
    status: 'unresolved',
    recommendedAction: 'Rebalance portfolio to reduce exposure below 75% threshold',
  },
  {
    id: '2',
    severity: 'info',
    title: 'New Yield Opportunity',
    message: 'Aave APY increased to 4.2%. Agent has drafted reallocation proposal.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    acknowledged: true,
    category: 'execution',
    affectedStrategy: 'Aave USDC',
    status: 'acknowledged',
    recommendedAction: 'Review and approve reallocation proposal in chat',
  },
  {
    id: '3',
    severity: 'critical',
    title: 'Protocol Update Detected',
    message: 'Compound protocol v3 upgrade detected. Review agent proposals before next execution cycle.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    acknowledged: false,
    category: 'system',
    affectedStrategy: 'Compound USDC',
    status: 'unresolved',
    recommendedAction: 'Review protocol changes and update strategy configuration if needed',
  },
  {
    id: '4',
    severity: 'info',
    title: 'Policy Compliance Check',
    message: 'All active positions within defined policy constraints.',
    timestamp: new Date(Date.now() - 1000 * 60 * 480),
    acknowledged: true,
    category: 'policy',
    affectedStrategy: undefined,
    status: 'resolved',
    recommendedAction: 'No action required',
  },
  {
    id: '5',
    severity: 'critical',
    title: 'Slippage Threshold Exceeded',
    message: 'Transaction failed due to excessive slippage. Market conditions may require adjustment.',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    acknowledged: false,
    category: 'execution',
    affectedStrategy: 'Uniswap V3',
    status: 'unresolved',
    recommendedAction: 'Review slippage tolerance settings and retry transaction',
  },
  {
    id: '6',
    severity: 'warning',
    title: 'Low Liquidity Warning',
    message: 'Available liquidity in Aave pool has decreased by 15%. Monitor closely.',
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
    acknowledged: false,
    category: 'risk',
    affectedStrategy: 'Aave USDC',
    status: 'unresolved',
    recommendedAction: 'Consider diversifying allocation or reducing position size',
  },
];

export const mockOverviewStats: StatCard[] = [
  {
    label: 'Total Value Locked',
    value: '$12.4M',
    subtext: 'Across 3 protocols',
    trend: {
      value: '+2.3%',
      isPositive: true,
    },
  },
  {
    label: 'Current APY',
    value: '4.1%',
    subtext: 'Weighted average',
    trend: {
      value: '+0.2%',
      isPositive: true,
    },
  },
  {
    label: 'Active Agents',
    value: '3',
    subtext: '2 executing, 1 monitoring',
  },
  {
    label: 'Pending Actions',
    value: '1',
    subtext: 'Awaiting confirmation',
  },
];

export const mockPortfolioMetrics: PortfolioMetric[] = [
  {
    name: 'Aave',
    value: '$5.2M',
    change: '+$120K',
    changeType: 'positive',
  },
  {
    name: 'Compound',
    value: '$4.8M',
    change: '-$45K',
    changeType: 'negative',
  },
  {
    name: 'Uniswap V3',
    value: '$2.4M',
    change: '+$89K',
    changeType: 'positive',
  },
];

export interface Settings {
  organization: {
    name: string;
    environment: 'production' | 'staging' | 'development';
  };
  alertPreferences: {
    channels: {
      email: boolean;
      slack: boolean;
      webhook: boolean;
    };
    thresholds: {
      critical: boolean;
      warning: boolean;
      info: boolean;
    };
    minSeverity: 'critical' | 'warning' | 'info';
  };
  policies: {
    riskLimits: {
      maxSingleProtocol: number;
      maxTotalExposure: number;
      minLiquidity: number;
    };
    execution: {
      autoConfirm: boolean;
      requireChatConfirmation: boolean;
      maxSlippage: number;
    };
  };
  permissions: {
    canModifyPolicies: boolean;
    canExecuteActions: boolean;
    canManageUsers: boolean;
  };
}

export const mockSettings: Settings = {
  organization: {
    name: 'Tempora Labs',
    environment: 'production',
  },
  alertPreferences: {
    channels: {
      email: true,
      slack: false,
      webhook: false,
    },
    thresholds: {
      critical: true,
      warning: true,
      info: false,
    },
    minSeverity: 'warning',
  },
  policies: {
    riskLimits: {
      maxSingleProtocol: 30,
      maxTotalExposure: 85,
      minLiquidity: 10,
    },
    execution: {
      autoConfirm: false,
      requireChatConfirmation: true,
      maxSlippage: 0.5,
    },
  },
  permissions: {
    canModifyPolicies: false,
    canExecuteActions: true,
    canManageUsers: false,
  },
};

export interface PortfolioAllocation {
  name: string;
  allocation: number; // percentage
  apy: number;
  type: 'Stable Yield' | 'RWA' | 'Liquidity' | 'Other';
  color: string;
}

export interface PerformanceDataPoint {
  date: Date;
  value: number;
  event?: {
    type: 'rebalance' | 'yield-harvest' | 'policy-update';
    description: string;
  };
}

export interface Strategy {
  id: string;
  name: string;
  type: 'Stable Yield' | 'RWA' | 'Liquidity' | 'Other';
  allocation: number;
  apy: number;
  status: 'active' | 'pending' | 'paused';
}

export const mockPortfolioAllocations: PortfolioAllocation[] = [
  { name: 'Aave USDC', allocation: 42, apy: 4.2, type: 'Stable Yield', color: '#13C7C4' },
  { name: 'Compound USDC', allocation: 38, apy: 3.8, type: 'Stable Yield', color: '#55D5D1' },
  { name: 'Uniswap V3', allocation: 20, apy: 5.1, type: 'Liquidity', color: '#267B87' },
];

export const mockPerformanceData: Record<string, PerformanceDataPoint[]> = {
  '1D': [
    { date: new Date(Date.now() - 1000 * 60 * 60 * 23), value: 12.35 },
    { date: new Date(Date.now() - 1000 * 60 * 60 * 20), value: 12.36 },
    { date: new Date(Date.now() - 1000 * 60 * 60 * 17), value: 12.37 },
    { date: new Date(Date.now() - 1000 * 60 * 60 * 14), value: 12.38, event: { type: 'rebalance', description: 'Rebalanced USDC allocation' } },
    { date: new Date(Date.now() - 1000 * 60 * 60 * 11), value: 12.39 },
    { date: new Date(Date.now() - 1000 * 60 * 60 * 8), value: 12.40 },
    { date: new Date(Date.now() - 1000 * 60 * 60 * 5), value: 12.40 },
    { date: new Date(Date.now() - 1000 * 60 * 60 * 2), value: 12.41 },
    { date: new Date(), value: 12.42 },
  ],
  '1W': Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * (6 - i)),
    value: 12.2 + (i * 0.03) + Math.random() * 0.05,
    ...(i === 3 && { event: { type: 'yield-harvest', description: 'Harvested yield from Uniswap V3' } }),
  })),
  '1M': Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * (29 - i)),
    value: 12.0 + (i * 0.015) + Math.random() * 0.1,
    ...(i === 15 && { event: { type: 'policy-update', description: 'Updated risk limits' } }),
  })),
  '3M': Array.from({ length: 12 }, (_, i) => ({
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7 * (11 - i)),
    value: 11.8 + (i * 0.05) + Math.random() * 0.2,
  })),
  '1Y': Array.from({ length: 12 }, (_, i) => ({
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * (11 - i)),
    value: 11.0 + (i * 0.12) + Math.random() * 0.3,
  })),
};

export const mockStrategies: Strategy[] = [
  { id: '1', name: 'Aave USDC', type: 'Stable Yield', allocation: 42, apy: 4.2, status: 'active' },
  { id: '2', name: 'Compound USDC', type: 'Stable Yield', allocation: 38, apy: 3.8, status: 'active' },
  { id: '3', name: 'Uniswap V3 LP', type: 'Liquidity', allocation: 20, apy: 5.1, status: 'active' },
];

export const mockKPIs = {
  totalPortfolioValue: '$12.4M',
  netYield: '4.1%',
  systemStatus: 'healthy' as 'healthy' | 'monitoring' | 'action-required',
};

export const mockSuggestedAction = {
  title: 'Optimize Yield Allocation',
  description: 'Aave APY has increased to 4.5%. Consider reallocating 5% from Compound to Aave.',
  action: {
    type: 'rebalance',
    description: 'Reallocate 5% from Compound to Aave',
    details: 'Move $620K from Compound to Aave to capture higher yield',
  },
};

