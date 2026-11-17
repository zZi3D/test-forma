import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ProjectItem } from '../data/projects';
import { ShowcaseMosaic } from './ShowcaseMosaic';

interface ExamplesPageProps {
  onSelectProject: (project: ProjectItem) => void;
  onStartProject: () => void;
  onBookCall: () => void;
  onBackToOverview: () => void;
}

export function ExamplesPage({
  onSelectProject,
  onStartProject,
  onBookCall,
  onBackToOverview,
}: ExamplesPageProps) {
  return (
    <div className="relative z-10 min-h-screen w-full pb-20 md:pb-24">
      {/* Subtle canvas veil keeping WaveBackground softly visible */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-[#F7F5F0]/78 via-[#F7F5F0]/46 to-[#F7F5F0]/62"
      />

      <div className="relative z-10">
        {/* Top Editorial Hero */}
        <section className="mx-auto max-w-[1040px] px-4 pt-20 pb-3 text-center md:px-8 md:pt-24 md:pb-5">
          <div className="mb-2 flex justify-center md:mb-2.5">
            <button
              type="button"
              onClick={onBackToOverview}
              className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#1C1B18]/65 transition-colors hover:text-[#1C1B18] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C98A3A]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Overview</span>
            </button>
          </div>

          <h1 className="display-tight mx-auto max-w-[18ch] text-[clamp(1.75rem,4.4vw,3.35rem)] leading-[1.06] font-semibold text-[#1C1B18] md:max-w-[20ch]">
            Design with impact. Deliver in 24 hours.
          </h1>

          <p className="mx-auto mt-2 max-w-[46ch] text-[13px] leading-[1.48] text-[#1C1B18]/72 sm:text-[14.5px] md:mt-2.5 md:max-w-[54ch] md:text-[15.5px]">
            Scroll to zoom out from our opening row into a mosaic of all twelve
            website directions.
          </p>

          <div className="mt-3.5 flex justify-center md:mt-4">
            <button
              type="button"
              onClick={onStartProject}
              className="inline-flex h-9 items-center gap-2 rounded-full bg-[#1C1B18] px-4.5 text-[12px] font-semibold text-[#F7F5F0] whitespace-nowrap transition-colors duration-200 hover:bg-[#C98A3A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C98A3A] md:h-10 md:px-5 md:text-[12.5px]"
            >
              <span>Start a 24h Sprint</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </section>

        {/* Shared Scroll-Zoom Mosaic Stage */}
        <ShowcaseMosaic isHeroPage onSelectProject={onSelectProject} />

        {/* Closing CTA & Studio Footer */}
        <section
          aria-label="Start a 24h Sprint"
          className="mx-auto max-w-[1200px] px-4 pt-10 md:px-8 md:pt-16"
        >
          <div className="glass-elevated flex flex-col items-start justify-between gap-6 rounded-2xl p-6 md:flex-row md:items-center md:p-9">
            <div className="max-w-xl">
              <p className="text-[12px] font-medium tracking-[0.04em] text-[#C98A3A]">
                Ready for your own live concept?
              </p>
              <h2 className="display-tight mt-2 text-[clamp(1.6rem,2.8vw,2.35rem)] leading-[1.1] font-semibold text-[#1C1B18]">
                Receive your tailored website plan & first clickable concept within 24 hours.
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
        </section>
      </div>
    </div>
  );
}
