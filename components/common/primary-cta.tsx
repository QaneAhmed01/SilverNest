import Link from 'next/link';
import { Button, type ButtonProps } from '@/components/ui/button';

export function PrimaryCTA({ href = '/analyze', label = 'Improve my profile', ...props }: { href?: string; label?: string } & Partial<ButtonProps>) {
  return (
    <Button asChild size="lg" {...props}>
      <Link href={href}>{label}</Link>
    </Button>
  );
}
