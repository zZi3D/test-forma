import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenBooking: (tab: 'brief' | 'call') => void;
}

const NAV_ITEMS = [
  {
    index: '01',
    label: 'Studio Overview',
    subtitle: '3D Wave Terrain & Featured Work',
    target: 'hero-wave',
  },
  {
    index: '02',
    label: 'Selected Work',
    subtitle: '12 Luxury, Architectural & Cultural Works',
    target: 'selected-work',
  },
  {
    index: '03',
    label: '24h Process',
    subtitle: 'Methodology, Speed & Discovery Call',
    target: 'process-studio',
  },
];

export function MenuOverlay({
  isOpen,
  onClose,
  onNavigateSection,
  onOpenBooking,
}: MenuOverlayProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="menu-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex justify-end bg-[#1C1B18]/45 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-label="FORMA Studio Navigation"
        >
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="flex h-full w-full max-w-[460px] flex-col justify-between bg-[#1C1B18] p-6 text-[#F7F5F0] md:p-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/15 pb-5">
              <span className="text-[12px] font-semibold tracking-[0.14em] text-white/80">
                FORMA INDEX
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white hover:text-[#1C1B18]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Section Links */}
            <ul className="my-auto flex flex-col divide-y divide-white/10">
              {NAV_ITEMS.map((item) => (
                <li key={item.index}>
                  <button
                    type="button"
                    onClick={() => {
                      onNavigateSection(item.target);
                      onClose();
                    }}
                    className="group flex w-full items-baseline justify-between py-6 text-left transition-colors hover:text-[#C98A3A]"
                  >
                    <div>
                      <span className="block text-[26px] font-semibold tracking-[-0.025em] md:text-[32px]">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-[12px] text-white/55">
                        {item.subtitle}
                      </span>
                    </div>
                    <span className="font-mono-tabular text-[12px] text-white/45 transition-colors group-hover:text-[#C98A3A]">
                      {item.index}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Footer Actions */}
            <div className="border-t border-white/15 pt-6">
              <div className="flex flex-col gap-2.5 sm:flex-row">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenBooking('brief');
                  }}
                  className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-[#C98A3A] px-5 text-[12px] font-semibold text-[#1C1B18] whitespace-nowrap transition-colors hover:bg-[#d89c4c]"
                >
                  Start a 24h Sprint
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenBooking('call');
                  }}
                  className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-white/20 px-5 text-[12px] font-medium text-white whitespace-nowrap transition-colors hover:bg-white hover:text-[#1C1B18]"
                >
                  15-Min Discovery Call
                </button>
              </div>
              <p className="mt-5 text-[11px] text-white/50">
                New York · Zurich · hello@forma-studio.design
              </p>
            </div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
