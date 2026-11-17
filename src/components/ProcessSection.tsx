import { useEffect, useState } from 'react';

interface ProcessSectionProps {
  onBookCall: () => void;
  onOpenBrief: () => void;
}

const SPRINT_PHASES = [
  {
    index: '01.',
    window: '09:00 – 13:00 CET',
    title: 'Architecture & Typographic Grid',
    detail:
      'Editorial hierarchy, spatial layout cadence, and interactive structure locked within the first four hours.',
  },
  {
    index: '02.',
    window: '13:00 – 19:00 CET',
    title: 'Visual Direction & Motion',
    detail:
      'Custom surface textures, fluid scroll-linked transitions, and responsive breakpoints engineered directly in code.',
  },
  {
    index: '03.',
    window: '19:00 – 09:00 CET',
    title: 'Refinement & Live Launch',
    detail:
      'Accessibility contrast verification, performance tuning, and production handover ready for global traffic.',
  },
];

function formatAmsterdamTime(date: Date): string {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Amsterdam',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  } catch {
    return date.toTimeString().slice(0, 8);
  }
}

export function ProcessSection({ onBookCall, onOpenBrief }: ProcessSectionProps) {
  const [amsterdamTime, setAmsterdamTime] = useState<string>(() =>
    formatAmsterdamTime(new Date()),
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setAmsterdamTime(formatAmsterdamTime(new Date()));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      id="process-studio"
      aria-label="24-Hour Sprint Methodology"
      className="relative z-10 w-full px-4 pt-20 pb-20 md:px-8 md:pt-24 md:pb-28"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
          {/* Elevated Glass Manifesto Card */}
          <div className="glass-elevated flex flex-col justify-between rounded-2xl p-6 md:p-9 lg:col-span-7">
            <div>
              <p className="text-[12px] font-medium tracking-[0.04em] text-[#C98A3A]">
                24-Hour Digital Practice
              </p>
              <h2 className="display-tight mt-4 text-[clamp(1.85rem,3.6vw,3rem)] leading-[1.12] font-semibold text-[#1C1B18]">
                Time is money. We build publication-grade websites in 24 hours.
              </h2>
              <p className="mt-5 max-w-[54ch] text-[15px] leading-[1.65] text-[#1C1B18]/75">
                Senior partners handle strategy, art direction, and frontend engineering
                directly—combining Swiss typographic clarity with tactile motion for
                clients who cannot afford six-month agency timelines.
              </p>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4 border-t border-[#1C1B18]/10 pt-6">
              <button
                type="button"
                onClick={onBookCall}
                className="inline-flex h-10 items-center justify-center rounded-full bg-[#1C1B18] px-5 text-[12px] font-semibold text-[#F7F5F0] whitespace-nowrap shrink-0 transition-colors hover:bg-[#C98A3A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C98A3A]"
              >
                → Book a 15-min discovery call
              </button>
              <button
                type="button"
                onClick={onOpenBrief}
                className="text-[13px] font-medium text-[#1C1B18]/80 underline decoration-[#1C1B18]/30 underline-offset-4 transition-colors hover:text-[#C98A3A] hover:decoration-[#C98A3A]"
              >
                Submit a 24h brief
              </button>
            </div>
          </div>

          {/* Right Column: Standard + Subtle Glass Tiers */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            {SPRINT_PHASES.map((phase, idx) => (
              <div
                key={phase.index}
                className={`${
                  idx === 2 ? 'glass-subtle' : 'glass-tile'
                } flex flex-1 flex-col justify-between rounded-2xl p-5`}
              >
                <div className="flex items-center justify-between gap-2 text-[12px]">
                  <span className="font-mono-tabular font-semibold text-[#C98A3A]">
                    {phase.index}
                  </span>
                  <span className="font-mono-tabular text-[#1C1B18]/60">
                    {phase.window}
                  </span>
                </div>
                <h3 className="mt-2.5 text-[16px] font-semibold tracking-[-0.015em] text-[#1C1B18]">
                  {phase.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-[1.55] text-[#1C1B18]/75">
                  {phase.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quiet Subtle Glass Footer */}
        <footer
          id="studio-footer"
          className="glass-subtle mt-12 flex flex-col items-start justify-between gap-4 rounded-2xl px-6 py-5 text-[12px] text-[#1C1B18]/70 sm:flex-row sm:items-center"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-[#1C1B18]">Edition One</span>
            <span aria-hidden="true">·</span>
            <span>Netherlands</span>
            <span aria-hidden="true">·</span>
            <span>Crafted for Modern Business</span>
          </div>

          <div className="font-mono-tabular flex items-center gap-2 text-[#1C1B18]/75">
            <span>NL · CET</span>
            <span aria-hidden="true">·</span>
            <span>{amsterdamTime}</span>
            <span aria-hidden="true">·</span>
            <span>© 2026</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
