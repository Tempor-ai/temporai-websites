'use client';

import { useState, useMemo } from 'react';
import { mockTransactions, mockAuditEvents, Transaction, AuditEvent } from '@/lib/mock/activity';
import ActivityTabs from '@/components/dashboard/activity/ActivityTabs';
import ActivityFilters from '@/components/dashboard/activity/ActivityFilters';
import TransactionsTable from '@/components/dashboard/activity/TransactionsTable';
import AuditTrailTable from '@/components/dashboard/activity/AuditTrailTable';

export default function ActivityPage() {
  const [activeTab, setActiveTab] = useState<'transactions' | 'audit-trail'>('transactions');
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | 'custom'>('30d');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [strategy, setStrategy] = useState('All Strategies');
  const [status, setStatus] = useState('All Statuses');

  const transactionStatusOptions = ['All Statuses', 'Confirmed', 'Pending', 'Failed'];
  const auditStatusOptions = ['All Statuses', 'Success', 'Pending', 'Failed'];

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    let filtered = [...mockTransactions];

    // Date range filter
    const now = new Date();
    const cutoffDate = (() => {
      switch (dateRange) {
        case '7d':
          return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        case '30d':
          return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        case '90d':
          return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        case 'custom':
          if (startDate && endDate) {
            return { start: new Date(startDate), end: new Date(endDate) };
          }
          return null;
        default:
          return null;
      }
    })();

    if (cutoffDate) {
      if (dateRange === 'custom' && typeof cutoffDate === 'object' && 'start' in cutoffDate) {
        filtered = filtered.filter(
          (t) => t.time >= cutoffDate.start && t.time <= cutoffDate.end
        );
      } else if (typeof cutoffDate === 'object' && !('start' in cutoffDate)) {
        filtered = filtered.filter((t) => t.time >= cutoffDate);
      }
    }

    // Strategy filter
    if (strategy !== 'All Strategies') {
      filtered = filtered.filter((t) => t.strategy === strategy);
    }

    // Status filter
    if (status !== 'All Statuses') {
      filtered = filtered.filter(
        (t) => t.status.toLowerCase() === status.toLowerCase()
      );
    }

    return filtered;
  }, [dateRange, startDate, endDate, strategy, status]);

  // Filter audit events
  const filteredAuditEvents = useMemo(() => {
    let filtered = [...mockAuditEvents];

    // Date range filter
    const now = new Date();
    const cutoffDate = (() => {
      switch (dateRange) {
        case '7d':
          return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        case '30d':
          return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        case '90d':
          return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        case 'custom':
          if (startDate && endDate) {
            return { start: new Date(startDate), end: new Date(endDate) };
          }
          return null;
        default:
          return null;
      }
    })();

    if (cutoffDate) {
      if (dateRange === 'custom' && typeof cutoffDate === 'object' && 'start' in cutoffDate) {
        filtered = filtered.filter(
          (e) => e.time >= cutoffDate.start && e.time <= cutoffDate.end
        );
      } else if (typeof cutoffDate === 'object' && !('start' in cutoffDate)) {
        filtered = filtered.filter((e) => e.time >= cutoffDate);
      }
    }

    // Strategy filter
    if (strategy !== 'All Strategies') {
      filtered = filtered.filter((e) => e.relatedStrategy === strategy);
    }

    // Status filter
    if (status !== 'All Statuses') {
      filtered = filtered.filter(
        (e) => e.status.toLowerCase() === status.toLowerCase()
      );
    }

    return filtered;
  }, [dateRange, startDate, endDate, strategy, status]);

  const handleTransactionClick = (transaction: Transaction) => {
    const action = {
      type: 'explain-transaction',
      description: `Explain this transaction: ${transaction.type} of ${transaction.amount} ${transaction.asset}`,
      details: `Transaction ${transaction.txHash} - ${transaction.type} - Status: ${transaction.status}`,
    };

    if (typeof window !== 'undefined') {
      const event = new CustomEvent('draftAction', { detail: action });
      window.dispatchEvent(event);
    }
  };

  const handleAuditEventClick = (event: AuditEvent) => {
    const action = {
      type: 'explain-event',
      description: `Explain this event: ${event.eventType} - ${event.description}`,
      details: `Event Type: ${event.eventType}, Actor: ${event.actor}, Status: ${event.status}`,
    };

    if (typeof window !== 'undefined') {
      const customEvent = new CustomEvent('draftAction', { detail: action });
      window.dispatchEvent(customEvent);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <ActivityTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Filters */}
      <ActivityFilters
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        strategy={strategy}
        onStrategyChange={setStrategy}
        status={status}
        onStatusChange={setStatus}
        statusOptions={activeTab === 'transactions' ? transactionStatusOptions : auditStatusOptions}
      />

      {/* Tables */}
      {activeTab === 'transactions' ? (
        <TransactionsTable
          transactions={filteredTransactions}
          onRowClick={handleTransactionClick}
        />
      ) : (
        <AuditTrailTable
          events={filteredAuditEvents}
          onRowClick={handleAuditEventClick}
        />
      )}
    </div>
  );
}
