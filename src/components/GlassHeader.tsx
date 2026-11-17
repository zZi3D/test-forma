import { Menu } from 'lucide-react';

interface GlassHeaderProps {
  activePage: 'home' | 'work';
  onNavigateSection: (sectionId: string) => void;
  onOpenBooking: () => void;
  onOpenMenu: () => void;
}

const NAV_LINKS = [
  { label: 'Overview', target: 'hero-wave', page: 'home' as const },
  { label: 'Directions', target: 'work', page: 'work' as const },
  { label: 'Playground', target: 'style-playground', page: null },
  { label: 'Process', target: 'process-studio', page: null },
  { label: 'Contact', target: 'studio-footer', page: null },
];

export function GlassHeader({
  activePage,
  onNavigateSection,
  onOpenBooking,
  onOpenMenu,
}: GlassHeaderProps) {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-40 px-4 md:top-5 md:px-8">
      <div className="glass-elevated pointer-events-auto mx-auto flex max-w-[1160px] items-center justify-between gap-8 rounded-full px-5 py-2.5 md:px-7">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => onNavigateSection('hero-wave')}
          className="group flex items-center gap-2.5 text-[#1C1B18] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C98A3A]"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0 transition-transform duration-300 group-hover:rotate-45"
            aria-hidden="true"
          >
            <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="14" cy="14" r="4.5" stroke="currentColor" strokeWidth="1.6" />
            <path d="M14 2V9.5M18.5 14H26" stroke="#C98A3A" strokeWidth="1.75" />
          </svg>
          <span className="text-[13px] font-semibold tracking-[0.12em]">FORMA</span>
        </button>

        {/* Zone 2: Concise Single-Line Nav Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 md:flex"
        >
          {NAV_LINKS.map((link) => {
            const isActive = link.page !== null && link.page === activePage;
            return (
              <button
                key={link.target}
                type="button"
                aria-current={isActive ? 'page' : undefined}
                onClick={() => onNavigateSection(link.target)}
                className={`relative inline-flex items-center gap-1.5 text-[13px] whitespace-nowrap shrink-0 underline-offset-4 transition-colors hover:text-[#1C1B18] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C98A3A] ${
                  isActive
                    ? 'font-semibold text-[#1C1B18]'
                    : 'font-medium text-[#1C1B18]/70'
                }`}
              >
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-[#C98A3A]"
                  />
                )}
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action (+ mobile menu trigger) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="Open navigation menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1C1B18]/15 text-[#1C1B18] transition-colors hover:bg-[#1C1B18]/5 md:hidden"
          >
            <Menu className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onOpenBooking}
            className="inline-flex h-9 items-center justify-center rounded-full bg-[#1C1B18] px-4 text-[12px] font-semibold text-[#F7F5F0] whitespace-nowrap shrink-0 transition-colors duration-200 hover:bg-[#C98A3A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C98A3A]"
          >
            Start a Sprint
          </button>
        </div>
      </div>
    </header>
  );
}
