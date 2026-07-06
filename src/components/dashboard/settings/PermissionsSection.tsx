'use client';

import { Settings } from '@/lib/mock/data';

interface PermissionsSectionProps {
  settings: Settings;
}

export default function PermissionsSection({ settings }: PermissionsSectionProps) {
  const permissions = [
    {
      label: 'Modify Policies',
      value: settings.permissions.canModifyPolicies,
      description: 'Ability to change risk limits and execution rules',
    },
    {
      label: 'Execute Actions',
      value: settings.permissions.canExecuteActions,
      description: 'Ability to confirm and execute actions in chat',
    },
    {
      label: 'Manage Users',
      value: settings.permissions.canManageUsers,
      description: 'Ability to add, remove, and modify user accounts',
    },
  ];

  return (
    <div className="bg-tem-dark-2 rounded-xl2 p-6 border border-tem-dark-3">
      <h2 className="text-xl font-semibold text-white mb-4">Permissions</h2>
      
      <div className="space-y-4">
        {permissions.map((permission, index) => (
          <div key={index} className="flex items-start justify-between py-3 border-b border-tem-dark-3 last:border-0">
            <div className="flex-1">
              <div className="text-sm font-medium text-white mb-1">{permission.label}</div>
              <div className="text-xs text-tem-neutral-muted">{permission.description}</div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
              permission.value
                ? 'bg-tem-accent text-tem-dark-1'
                : 'bg-tem-dark-3 text-tem-neutral-muted'
            }`}>
              {permission.value ? 'Granted' : 'Denied'}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 bg-tem-dark-3 rounded-lg p-4 border border-tem-accent/20">
        <p className="text-xs text-tem-neutral-muted">
          Permissions are managed by organization administrators. Contact support to request permission changes.
        </p>
      </div>
    </div>
  );
}

