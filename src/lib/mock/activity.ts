// Mock data for activity page

export interface Transaction {
  id: string;
  time: Date;
  type: 'deposit' | 'withdraw' | 'rebalance' | 'yield-harvest';
  asset: string;
  amount: number;
  txHash: string;
  status: 'pending' | 'confirmed' | 'failed';
  strategy?: string;
}

export interface AuditEvent {
  id: string;
  time: Date;
  eventType: 'action' | 'policy-change' | 'system-event' | 'alert';
  actor: string;
  relatedStrategy?: string;
  status: 'success' | 'pending' | 'failed';
  description: string;
}

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    time: new Date(Date.now() - 1000 * 60 * 15),
    type: 'rebalance',
    asset: 'USDC',
    amount: 500000,
    txHash: '0x1234...5678',
    status: 'confirmed',
    strategy: 'Aave USDC',
  },
  {
    id: '2',
    time: new Date(Date.now() - 1000 * 60 * 45),
    type: 'yield-harvest',
    asset: 'ETH',
    amount: 2.5,
    txHash: '0xabcd...ef01',
    status: 'confirmed',
    strategy: 'Uniswap V3',
  },
  {
    id: '3',
    time: new Date(Date.now() - 1000 * 60 * 120),
    type: 'deposit',
    asset: 'USDC',
    amount: 1000000,
    txHash: '0x9876...5432',
    status: 'pending',
    strategy: 'Compound USDC',
  },
  {
    id: '4',
    time: new Date(Date.now() - 1000 * 60 * 180),
    type: 'withdraw',
    asset: 'USDC',
    amount: 250000,
    txHash: '0xfedc...ba98',
    status: 'confirmed',
    strategy: 'Aave USDC',
  },
  {
    id: '5',
    time: new Date(Date.now() - 1000 * 60 * 240),
    type: 'rebalance',
    asset: 'USDC',
    amount: 300000,
    txHash: '0x1111...2222',
    status: 'failed',
    strategy: 'Compound USDC',
  },
  {
    id: '6',
    time: new Date(Date.now() - 1000 * 60 * 300),
    type: 'yield-harvest',
    asset: 'USDC',
    amount: 15000,
    txHash: '0x3333...4444',
    status: 'confirmed',
    strategy: 'Aave USDC',
  },
];

export const mockAuditEvents: AuditEvent[] = [
  {
    id: '1',
    time: new Date(Date.now() - 1000 * 60 * 15),
    eventType: 'action',
    actor: 'YieldAgent-01',
    relatedStrategy: 'Aave USDC',
    status: 'success',
    description: 'Rebalanced USDC allocation to Aave',
  },
  {
    id: '2',
    time: new Date(Date.now() - 1000 * 60 * 45),
    eventType: 'policy-change',
    actor: 'System',
    relatedStrategy: undefined,
    status: 'success',
    description: 'Updated max single-protocol exposure to 30%',
  },
  {
    id: '3',
    time: new Date(Date.now() - 1000 * 60 * 120),
    eventType: 'system-event',
    actor: 'System',
    relatedStrategy: undefined,
    status: 'success',
    description: 'Daily compliance check completed',
  },
  {
    id: '4',
    time: new Date(Date.now() - 1000 * 60 * 180),
    eventType: 'action',
    actor: 'YieldAgent-01',
    relatedStrategy: 'Uniswap V3',
    status: 'success',
    description: 'Harvested yield from Uniswap V3',
  },
  {
    id: '5',
    time: new Date(Date.now() - 1000 * 60 * 240),
    eventType: 'alert',
    actor: 'RiskMonitor-01',
    relatedStrategy: 'Compound USDC',
    status: 'pending',
    description: 'Risk threshold approaching limit',
  },
  {
    id: '6',
    time: new Date(Date.now() - 1000 * 60 * 300),
    eventType: 'action',
    actor: 'YieldAgent-01',
    relatedStrategy: 'Aave USDC',
    status: 'failed',
    description: 'Failed to rebalance: insufficient liquidity',
  },
];

export const mockStrategies = [
  'All Strategies',
  'Aave USDC',
  'Compound USDC',
  'Uniswap V3',
];

