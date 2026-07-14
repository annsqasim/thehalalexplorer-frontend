interface AdSlotProps {
  id: string;
  className?: string;
  label?: string;
}

export function AdSlot({ id, className = '', label = 'Advertisement' }: AdSlotProps) {
  return (
    <div
      id={id}
      aria-label={label}
      className={`border border-dashed border-gray-200 rounded-lg bg-gray-50 flex items-center justify-center min-h-[250px] ${className}`}
    >
      <span className="text-gray-300 text-xs uppercase tracking-wider">{label}</span>
    </div>
  );
}
