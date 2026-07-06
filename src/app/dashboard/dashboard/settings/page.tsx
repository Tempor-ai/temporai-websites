'use client';

import { useState } from 'react';
import { mockSettings, Settings } from '@/lib/mock/data';
import OrganizationSection from '@/components/dashboard/settings/OrganizationSection';
import AlertPreferencesSection from '@/components/dashboard/settings/AlertPreferencesSection';
import PoliciesSection from '@/components/dashboard/settings/PoliciesSection';
import PermissionsSection from '@/components/dashboard/settings/PermissionsSection';

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(mockSettings);

  const handleSettingsUpdate = (updatedSettings: Settings) => {
    // Update mock state only - no direct execution
    setSettings(updatedSettings);
    console.log('Settings updated (mock state only):', updatedSettings);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-tem-neutral-muted">Configure organization settings and preferences</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        <OrganizationSection settings={settings} onUpdate={handleSettingsUpdate} />
        <AlertPreferencesSection settings={settings} onUpdate={handleSettingsUpdate} />
        <PoliciesSection settings={settings} />
        <PermissionsSection settings={settings} />
      </div>
    </div>
  );
}
