'use client';

import { Transaction } from '@/lib/mock/activity';

interface TransactionsTableProps {
  transactions: Transaction[];
  onRowClick: (transaction: Transaction) => void;
}

export default function TransactionsTable({ transactions, onRowClick }: TransactionsTableProps) {
  const getTypeColor = (type: Transaction['type']) => {
    switch (type) {
      case 'deposit':
        return 'text-tem-accent';
      case 'withdraw':
        return 'text-yellow-400';
      case 'rebalance':
        return 'text-tem-accent-soft';
      case 'yield-harvest':
        return 'text-green-400';
      default:
        return 'text-tem-neutral-muted';
    }
  };

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'confirmed':
        return 'text-tem-accent';
      case 'pending':
        return 'text-yellow-400';
      case 'failed':
        return 'text-red-400';
      default:
        return 'text-tem-neutral-muted';
    }
  };

  const formatAmount = (amount: number, asset: string) => {
    if (asset === 'ETH') {
      return `${amount.toFixed(4)} ${asset}`;
    }
    return `$${amount.toLocaleString()} ${asset}`;
  };

  const shortenHash = (hash: string) => {
    if (hash.length <= 12) return hash;
    return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
  };

  return (
    <div className="bg-tem-dark-2 rounded-xl2 border border-tem-dark-3 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-tem-dark-3">
              <th className="text-left py-3 px-4 text-sm font-semibold text-tem-neutral-muted">Time</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-tem-neutral-muted">Type</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-tem-neutral-muted">Asset</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-tem-neutral-muted">Amount</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-tem-neutral-muted">Tx Hash</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-tem-neutral-muted">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-tem-neutral-muted">
                  No transactions found
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  onClick={() => onRowClick(transaction)}
                  className="border-b border-tem-dark-3 hover:bg-tem-dark-3/50 transition-colors cursor-pointer"
                >
                  <td className="py-3 px-4 text-sm text-white font-mono">
                    {transaction.time.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-sm font-medium ${getTypeColor(transaction.type)}`}>
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1).replace('-', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-white">{transaction.asset}</td>
                  <td className="py-3 px-4 text-sm text-white text-right font-mono">
                    {formatAmount(transaction.amount, transaction.asset)}
                  </td>
                  <td className="py-3 px-4 text-sm text-tem-accent font-mono">
                    {shortenHash(transaction.txHash)}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-sm font-medium ${getStatusColor(transaction.status)}`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

