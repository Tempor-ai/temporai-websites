'use client';

import { Settings } from '@/lib/mock/data';

interface OrganizationSectionProps {
  settings: Settings;
  onUpdate: (settings: Settings) => void;
}

export default function OrganizationSection({ settings, onUpdate }: OrganizationSectionProps) {
  const handleNameChange = (name: string) => {
    onUpdate({
      ...settings,
      organization: {
        ...settings.organization,
        name,
      },
    });
  };

  const handleEnvironmentChange = (environment: Settings['organization']['environment']) => {
    onUpdate({
      ...settings,
      organization: {
        ...settings.organization,
        environment,
      },
    });
  };

  return (
    <div className="bg-tem-dark-2 rounded-xl2 p-6 border border-tem-dark-3">
      <h2 className="text-xl font-semibold text-white mb-4">Organization</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Organization Name
          </label>
          <input
            type="text"
            value={settings.organization.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-full px-4 py-2 bg-tem-dark-3 border border-tem-dark-3 rounded-lg text-white focus:outline-none focus:border-tem-accent"
            placeholder="Organization name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Environment
          </label>
          <select
            value={settings.organization.environment}
            onChange={(e) => handleEnvironmentChange(e.target.value as Settings['organization']['environment'])}
            className="w-full px-4 py-2 bg-tem-dark-3 border border-tem-dark-3 rounded-lg text-white focus:outline-none focus:border-tem-accent"
          >
            <option value="production">Production</option>
            <option value="staging">Staging</option>
            <option value="development">Development</option>
          </select>
          <p className="text-xs text-tem-neutral-muted mt-2">
            Environment selector placeholder
          </p>
        </div>
      </div>
    </div>
  );
}

