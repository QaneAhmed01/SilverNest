import { cn } from '@/lib/utils';

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-shimmer rounded-[1.5rem] bg-gradient-to-r from-border/60 via-border/30 to-border/60 bg-[length:200%_100%]', className)} />;
}
