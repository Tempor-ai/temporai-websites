'use client';

import { Settings } from '@/lib/mock/data';

interface PoliciesSectionProps {
  settings: Settings;
}

export default function PoliciesSection({ settings }: PoliciesSectionProps) {
  return (
    <div className="bg-tem-dark-2 rounded-xl2 p-6 border border-tem-dark-3">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Policies</h2>
        <span className="text-xs text-tem-neutral-muted font-mono">Read-Only</span>
      </div>
      
      <div className="space-y-6">
        {/* Risk Limits */}
        <div>
          <h3 className="text-sm font-medium text-tem-accent mb-3 font-mono">RISK LIMITS</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-tem-dark-3">
              <span className="text-sm text-tem-neutral-muted">Max Single Protocol Exposure</span>
              <span className="text-sm text-white font-mono">{settings.policies.riskLimits.maxSingleProtocol}%</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-tem-dark-3">
              <span className="text-sm text-tem-neutral-muted">Max Total Exposure</span>
              <span className="text-sm text-white font-mono">{settings.policies.riskLimits.maxTotalExposure}%</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-tem-neutral-muted">Min Liquidity Reserve</span>
              <span className="text-sm text-white font-mono">{settings.policies.riskLimits.minLiquidity}%</span>
            </div>
          </div>
        </div>

        {/* Execution Rules */}
        <div>
          <h3 className="text-sm font-medium text-tem-accent mb-3 font-mono">EXECUTION RULES</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-tem-dark-3">
              <span className="text-sm text-tem-neutral-muted">Auto Confirm</span>
              <span className="text-sm text-white font-mono">
                {settings.policies.execution.autoConfirm ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-tem-dark-3">
              <span className="text-sm text-tem-neutral-muted">Require Chat Confirmation</span>
              <span className="text-sm text-white font-mono">
                {settings.policies.execution.requireChatConfirmation ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-tem-neutral-muted">Max Slippage</span>
              <span className="text-sm text-white font-mono">{settings.policies.execution.maxSlippage}%</span>
            </div>
          </div>
        </div>

        <div className="bg-tem-dark-3 rounded-lg p-4 border border-tem-accent/20">
          <p className="text-xs text-tem-neutral-muted">
            Policy changes must be drafted through chat for approval. Contact your administrator to modify policies.
          </p>
        </div>
      </div>
    </div>
  );
}

