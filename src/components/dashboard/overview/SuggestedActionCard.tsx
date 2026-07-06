'use client';

import { mockSuggestedAction } from '@/lib/mock/data';
import ActionDraftButton from '@/components/dashboard/ActionDraftButton';

export default function SuggestedActionCard() {
  return (
    <div className="bg-tem-dark-2/50 rounded-xl2 p-6 border border-tem-accent/20">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="text-xs text-tem-accent font-mono mb-2">SUGGESTED ACTION</div>
          <h4 className="text-lg font-semibold text-white mb-2">{mockSuggestedAction.title}</h4>
          <p className="text-sm text-tem-neutral-muted">{mockSuggestedAction.description}</p>
        </div>
        <ActionDraftButton
          action={mockSuggestedAction.action}
          label="Draft in Chat"
          variant="primary"
        />
      </div>
    </div>
  );
}

