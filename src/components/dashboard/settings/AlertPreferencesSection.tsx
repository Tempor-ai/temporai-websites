'use client';

import { Settings } from '@/lib/mock/data';

interface AlertPreferencesSectionProps {
  settings: Settings;
  onUpdate: (settings: Settings) => void;
}

export default function AlertPreferencesSection({ settings, onUpdate }: AlertPreferencesSectionProps) {
  const handleChannelChange = (channel: keyof Settings['alertPreferences']['channels'], value: boolean) => {
    onUpdate({
      ...settings,
      alertPreferences: {
        ...settings.alertPreferences,
        channels: {
          ...settings.alertPreferences.channels,
          [channel]: value,
        },
      },
    });
  };

  const handleThresholdChange = (threshold: keyof Settings['alertPreferences']['thresholds'], value: boolean) => {
    onUpdate({
      ...settings,
      alertPreferences: {
        ...settings.alertPreferences,
        thresholds: {
          ...settings.alertPreferences.thresholds,
          [threshold]: value,
        },
      },
    });
  };

  const handleMinSeverityChange = (severity: Settings['alertPreferences']['minSeverity']) => {
    onUpdate({
      ...settings,
      alertPreferences: {
        ...settings.alertPreferences,
        minSeverity: severity,
      },
    });
  };

  return (
    <div className="bg-tem-dark-2 rounded-xl2 p-6 border border-tem-dark-3">
      <h2 className="text-xl font-semibold text-white mb-4">Alert Preferences</h2>
      
      <div className="space-y-6">
        {/* Notification Channels */}
        <div>
          <label className="block text-sm font-medium text-white mb-3">
            Notification Channels
          </label>
          <div className="space-y-3">
            {(['email', 'slack', 'webhook'] as const).map((channel) => (
              <label key={channel} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.alertPreferences.channels[channel]}
                  onChange={(e) => handleChannelChange(channel, e.target.checked)}
                  className="w-4 h-4 rounded bg-tem-dark-3 border-tem-dark-3 text-tem-accent focus:ring-tem-accent"
                />
                <span className="text-sm text-white capitalize">
                  {channel === 'webhook' ? 'Webhook' : channel.charAt(0).toUpperCase() + channel.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Alert Thresholds */}
        <div>
          <label className="block text-sm font-medium text-white mb-3">
            Alert Thresholds
          </label>
          <div className="space-y-3">
            {(['critical', 'warning', 'info'] as const).map((threshold) => (
              <label key={threshold} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.alertPreferences.thresholds[threshold]}
                  onChange={(e) => handleThresholdChange(threshold, e.target.checked)}
                  className="w-4 h-4 rounded bg-tem-dark-3 border-tem-dark-3 text-tem-accent focus:ring-tem-accent"
                />
                <span className="text-sm text-white capitalize">{threshold}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Minimum Severity */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Minimum Alert Severity
          </label>
          <select
            value={settings.alertPreferences.minSeverity}
            onChange={(e) => handleMinSeverityChange(e.target.value as Settings['alertPreferences']['minSeverity'])}
            className="w-full px-4 py-2 bg-tem-dark-3 border border-tem-dark-3 rounded-lg text-white focus:outline-none focus:border-tem-accent"
          >
            <option value="critical">Critical Only</option>
            <option value="warning">Warning and Above</option>
            <option value="info">All Alerts</option>
          </select>
        </div>
      </div>
    </div>
  );
}

