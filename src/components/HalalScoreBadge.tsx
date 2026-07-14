interface HalalScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md';
  className?: string;
}

function renderStars(score: number) {
  const filled = Math.round(Math.min(5, Math.max(1, score)));
  return '★'.repeat(filled) + '☆'.repeat(5 - filled);
}

export function HalalScoreBadge({ score, size = 'sm', className = '' }: HalalScoreBadgeProps) {
  if (!score || score < 1) return null;

  const sizeClasses = size === 'md' ? 'px-3 py-1.5' : 'px-2.5 py-1';

  return (
    <div
      className={`flex items-center gap-1 bg-[#0F1923]/80 backdrop-blur-sm rounded-full border border-white/20 ${sizeClasses} ${className}`}
    >
      <span className="text-[#F59E0B] text-[10px] tracking-[-3px] leading-none">
        {renderStars(score)}
      </span>
      <span className="text-[#1D6A5B] text-[13px] font-bold ml-1">
        {score.toFixed(1)}
      </span>
    </div>
  );
}
