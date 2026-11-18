import { ArrowLeft } from 'lucide-react';
import { ProjectItem } from '../data/projects';
import { SelectedWorkGrid } from './SelectedWorkGrid';

interface WorkPageProps {
  onSelectProject: (project: ProjectItem) => void;
  onOpenLiveDemo: (demoId: string) => void;
  onStartProject: () => void;
  onBookCall: () => void;
  onBackToOverview: () => void;
}

export function WorkPage({
  onSelectProject,
  onOpenLiveDemo,
  onStartProject,
  onBookCall,
  onBackToOverview,
}: WorkPageProps) {
  return (
    <div className="relative z-10 min-h-screen w-full pb-20 md:pb-24">
      {/* Subtle warm frosted veil matching the Home archive surface while keeping WaveBackground visible */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-[#F7F5F0]/72 via-[#F7F5F0]/38 to-[#F7F5F0]/52"
      />

      <div className="relative z-10">
        <SelectedWorkGrid
          variant="page"
          onSelectProject={onSelectProject}
          onOpenLiveDemo={onOpenLiveDemo}
          onStartProject={onStartProject}
          onBackToOverview={onBackToOverview}
        />

        {/* Dedicated Directions Page Closing CTA & Studio Footer */}
        <section
          aria-label="Start a 24h Sprint"
          className="w-full px-4 pt-6 md:px-8 md:pt-10"
        >
          <div className="mx-auto max-w-[1200px]">
            <div className="glass-elevated flex flex-col items-start justify-between gap-6 rounded-2xl p-6 md:flex-row md:items-center md:p-9">
              <div className="max-w-xl">
                <p className="text-[12px] font-medium tracking-[0.04em] text-[#C98A3A]">
                  Found a style that fits your brand?
                </p>
                <h2 className="display-tight mt-2 text-[clamp(1.6rem,2.8vw,2.35rem)] leading-[1.1] font-semibold text-[#1C1B18]">
                  A bespoke website in your chosen direction, launched in 24 hours.
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onStartProject}
                  className="inline-flex h-10 items-center justify-center rounded-full bg-[#1C1B18] px-5 text-[12px] font-semibold text-[#F7F5F0] whitespace-nowrap shrink-0 transition-colors duration-200 hover:bg-[#C98A3A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C98A3A]"
                >
                  Start a 24h Sprint
                </button>
                <button
                  type="button"
                  onClick={onBookCall}
                  className="glass-tile inline-flex h-10 items-center justify-center rounded-full px-5 text-[12px] font-medium text-[#1C1B18] whitespace-nowrap shrink-0 transition-colors duration-200 hover:bg-white/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C98A3A]"
                >
                  Book a 15-min Call
                </button>
              </div>
            </div>

            <footer className="glass-subtle mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl px-6 py-5 text-[12px] text-[#1C1B18]/70 sm:flex-row sm:items-center">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-[#1C1B18]">Edition One</span>
                <span aria-hidden="true">·</span>
                <span>Netherlands</span>
                <span aria-hidden="true">·</span>
                <span>Crafted for Modern Business</span>
              </div>

              <button
                type="button"
                onClick={onBackToOverview}
                className="inline-flex items-center gap-1.5 font-medium text-[#1C1B18] transition-colors hover:text-[#C98A3A]"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Return to Studio Overview</span>
              </button>
            </footer>
          </div>
        </section>
      </div>
    </div>
  );
}
