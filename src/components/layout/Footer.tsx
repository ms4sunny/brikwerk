import { Terminal, ArrowUpRight } from 'lucide-react';

interface FooterSection {
  title: string;
  links: { label: string; href: string; isExternal?: boolean }[];
}

const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: 'Navigation',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
      { label: 'Work / Case Studies', href: '/work' },
      { label: 'About Studio', href: '/about' },
      { label: 'Start Project', href: '/contact' },
    ],
  },
  {
    title: 'Engineering Services',
    links: [
      { label: 'Full-Stack Web Apps', href: '/services#fullstack' },
      { label: 'Performance Audits', href: '/services#audits' },
      { label: 'API & Backend Systems', href: '/services#backend' },
      { label: 'UI/UX Design Systems', href: '/services#design-systems' },
    ],
  },
  {
    title: 'Legal & Compliance',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Security Standards', href: '/security' },
    ],
  },
];

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.47 1.47 0 1 0 0 2.94 1.47 1.47 0 0 0 0-2.94z" />
    </svg>
  );
}

/**
 * Footer
 * 4-column studio footer featuring brand mark, quick links, a live
 * status pulse badge, and social/legal metadata. Padding stays
 * intentionally asymmetric (`pt-16 pb-12`) rather than `section-y` —
 * footers conventionally carry less bottom whitespace than a content
 * section since there's no next section to breathe into.
 */
export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-void pb-12 pt-16 text-slate-400">
      {/* Top glow line */}
      <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-linear-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container-app">
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand & status column */}
          <div className="space-y-6 lg:col-span-2">
            <a href="/" className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-tr from-primary to-secondary text-white shadow-glow-primary">
                <Terminal className="h-5 w-5" />
              </span>
              <span className="font-mono text-lg tracking-wider">
                BRIKWERK<span className="text-primary-400">.</span>
              </span>
            </a>

            <p className="max-w-sm text-sm leading-relaxed text-slate-400">
              Senior web engineering and high-performance software architecture for
              forward-thinking digital products. Built with zero templates and zero tech debt.
            </p>

            {/* Live infrastructure status indicator */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-secondary/20 bg-secondary/10 px-3.5 py-1.5 text-xs text-secondary-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary-500" />
              </span>
              <span className="font-mono font-medium">All Systems Operational (99.9% Uptime)</span>
            </div>
          </div>

          {/* Navigation link columns */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-white">
                {section.title}
              </h3>
              <ul className="space-y-2.5 text-sm">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-1 transition-colors duration-200 hover:text-white"
                    >
                      <span>{link.label}</span>
                      {link.isExternal && (
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom socials & copyright bar */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} Brikwerk Engineering. All rights reserved.</p>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-white/10 bg-white/5 p-2 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="GitHub"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-white/10 bg-white/5 p-2 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Twitter / X"
            >
              <TwitterIcon className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-white/10 bg-white/5 p-2 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
