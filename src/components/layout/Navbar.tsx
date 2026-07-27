import { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Menu, X, ArrowUpRight, Terminal } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work', badge: '10+' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const mobileMenuVariants: Variants = {
  closed: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

interface NavbarProps {
  currentPath?: string;
}

/**
 * Navbar
 * Glassmorphic sticky header with desktop navigation, active route highlighting,
 * direct intake CTA, and a Framer Motion animated mobile overlay drawer.
 */
export default function Navbar({ currentPath = '/' }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="/"
            className="group flex items-center gap-2.5 text-white font-bold text-xl tracking-tight transition-opacity hover:opacity-90"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-tr from-primary-600 to-indigo-500 text-white shadow-md shadow-primary-500/20 group-hover:scale-105 transition-transform duration-200">
              <Terminal className="h-5 w-5" />
            </span>
            <span className="font-mono text-lg tracking-wider">
              BRIKWERK<span className="text-primary-400">.</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPath === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-1.5 text-sm font-medium transition-colors duration-200 rounded-full ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-white/10 rounded-full border border-white/10"
                      transition={{ type: 'spring', duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {item.label}
                    {item.badge && (
                      <span className="text-[10px] leading-none px-1.5 py-0.5 rounded-full bg-primary-500/20 text-primary-300 font-mono">
                        {item.badge}
                      </span>
                    )}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a href="/contact" className="btn-primary py-2 px-4 text-sm">
              Start Project
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {/* Mobile Menu Button Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden absolute top-full inset-x-0 bg-slate-950/95 backdrop-blur-xl border-b border-white/10 px-4 py-6 shadow-2xl"
          >
            <div className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => {
                const isActive = currentPath === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-colors ${
                      isActive
                        ? 'border-primary-500/40 bg-primary-500/10 text-white font-semibold'
                        : 'border-white/5 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="text-base">{item.label}</span>
                    {item.badge && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-300 font-mono">
                        {item.badge}
                      </span>
                    )}
                  </a>
                );
              })}

              <div className="pt-3 border-t border-white/10 mt-2">
                <a
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-primary w-full justify-center py-3 text-base"
                >
                  Start Project
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}