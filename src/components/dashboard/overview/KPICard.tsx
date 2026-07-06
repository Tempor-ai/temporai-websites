interface KPICardProps {
  label: string;
  value: string;
  status?: 'healthy' | 'monitoring' | 'action-required';
}

export default function KPICard({ label, value, status }: KPICardProps) {
  const getStatusColor = () => {
    if (!status) return '';
    switch (status) {
      case 'healthy':
        return 'bg-tem-accent text-tem-dark-1';
      case 'monitoring':
        return 'bg-yellow-400 text-tem-dark-1';
      case 'action-required':
        return 'bg-red-400 text-white';
    }
  };

  return (
    <div className="bg-tem-dark-2 rounded-xl2 p-6 border border-tem-dark-3">
      <div className="text-tem-accent font-mono text-sm mb-2">{label}</div>
      <div className="text-3xl font-bold text-white mb-2">{value}</div>
      {status && (
        <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor()}`}>
          {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
        </div>
      )}
    </div>
  );
}

