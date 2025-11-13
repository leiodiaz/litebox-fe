interface TopicChipProps {
  children: React.ReactNode;
  className?: string;
}

export default function TopicChip({ children, className = '' }: TopicChipProps) {
  return (
    <span className={`inline-block px-4 py-1 bg-violet border border-violet text-white text-sm font-bold rounded-[5px] text-center ${className}`}>
      {children}
    </span>
  );
}
