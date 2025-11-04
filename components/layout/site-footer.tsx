import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-surface/90">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm text-subtle md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <p className="font-serif text-lg text-brand-ink">SilverNest</p>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-subtle">
            Photos and text are processed securely. You can delete them any time. We never sell your data.
          </p>
        </div>
        <nav className="flex flex-wrap items-center gap-4" aria-label="Footer">
          <Link className="hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30" href="/about">
            Privacy &amp; Care
          </Link>
          <Link className="hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30" href="mailto:hello@maturedater.ai">
            Contact
          </Link>
          <Link className="hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30" href="/sitemap.xml">
            Sitemap
          </Link>
        </nav>
        <p className="text-xs text-subtle/80">© {new Date().getFullYear()} SilverNest. All rights reserved.</p>
      </div>
    </footer>
  );
}
