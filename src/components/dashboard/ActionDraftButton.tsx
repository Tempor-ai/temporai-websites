'use client';

interface ActionDraft {
  type: string;
  description: string;
  details: string;
}

interface ActionDraftButtonProps {
  action: ActionDraft;
  label: string;
  icon?: string;
  variant?: 'primary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export default function ActionDraftButton({
  action,
  label,
  icon,
  variant = 'primary',
  size = 'md',
  onClick,
}: ActionDraftButtonProps) {
  const handleClick = () => {
    // Draft action to chat
    // In a real implementation, this would dispatch to a context/store
    console.log('Drafting action to chat:', action);
    
    // Show notification or trigger chat panel
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('draftAction', { detail: action });
      window.dispatchEvent(event);
    }
    
    onClick?.();
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const variantClasses = {
    primary: 'bg-tem-accent text-tem-dark-1 font-semibold hover:bg-tem-accent-soft shadow-tem-glow',
    outline: 'border-2 border-tem-accent text-tem-accent font-semibold hover:bg-tem-accent/10',
  };

  return (
    <button
      onClick={handleClick}
      className={`rounded-lg transition-colors duration-200 ${sizeClasses[size]} ${variantClasses[variant]}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );
}

