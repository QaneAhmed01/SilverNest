'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/analyze', label: 'Get started' },
  { href: '/result', label: 'Results' },
  { href: '/about', label: 'About' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className={cn('sticky top-0 z-30 w-full transition-all duration-300', isScrolled && 'bg-background/90 shadow-sm backdrop-blur-md')}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold text-brand-ink">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand/15 text-brand-ink">✶</span>
          <span className="font-serif text-xl">SilverNest</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium text-subtle transition-all hover:text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30',
                  isActive && 'bg-brand/10 text-brand-ink'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            size="icon"
            variant="ghost"
            className="md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <m.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: 'easeInOut' }}
            className="md:hidden"
            aria-label="Mobile navigation"
          >
            <ul className="space-y-2 border-t border-border/70 bg-background/98 px-4 py-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30',
                        isActive && 'bg-brand/10 text-brand-ink'
                      )}
                    >
                      {item.label}
                      {isActive && <span className="text-xs uppercase tracking-[0.2em] text-brand">Now</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
