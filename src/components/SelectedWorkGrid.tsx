import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  PROJECT_CATEGORIES,
  PROJECTS,
  ProjectCategory,
  ProjectConfig,
} from '../data/projects';
import { getProjectDataUrl } from '../utils/mockupGenerator';

interface SelectedWorkGridProps {
  onSelectProject: (project: ProjectConfig) => void;
  onStartProject: () => void;
}

type FilterOption = 'All' | ProjectCategory;

const FILTERS: FilterOption[] = ['All', ...PROJECT_CATEGORIES];

const STUDIO_METRICS = [
  { value: '24 Hours', label: 'Concept to live launch' },
  { value: '340+', label: 'Editorial editions shipped' },
  { value: '52-Layer', label: 'Procedural canvas craft' },
  { value: 'NYC · ZRH', label: 'Synchronized studio desk' },
];

export function SelectedWorkGrid({
  onSelectProject,
  onStartProject,
}: SelectedWorkGridProps) {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('All');

  const thumbnails = useMemo(() => {
    const map = new Map<string, string>();
    PROJECTS.forEach((p) => {
      map.set(p.id, getProjectDataUrl(p));
    });
    return map;
  }, []);

  const visibleProjects = useMemo(() => {
    if (activeFilter === 'All') return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <section
      id="selected-work"
      aria-label="Selected Work Portfolio Archive"
      className="relative z-10 w-full px-4 pt-14 pb-16 md:px-8 md:pt-20 md:pb-24"
    >
      <div className="mx-auto max-w-[1200px]">
        {/* Studio Proof Metrics Strip */}
        <div className="glass-tile mb-12 grid grid-cols-2 gap-4 rounded-2xl p-4 md:mb-14 md:grid-cols-4 md:gap-6 md:px-7 md:py-5">
          {STUDIO_METRICS.map((metric) => (
            <div key={metric.label}>
              <p className="font-mono-tabular text-[19px] font-semibold tracking-[-0.02em] text-[#1C1B18] md:text-[22px]">
                {metric.value}
              </p>
              <p className="mt-0.5 text-[12px] text-[#1C1B18]/70">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        {/* Section Header */}
        <div className="flex flex-col gap-5 border-b border-[#1C1B18]/12 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[12px] font-medium tracking-[0.04em] text-[#C98A3A]">
              Archive · {PROJECTS.length} Editions
            </p>
            <h2 className="display-tight mt-1.5 text-[clamp(2rem,3.4vw,3rem)] leading-[1.06] font-semibold text-[#1C1B18]">
              Selected Work
            </h2>
          </div>

          <button
            type="button"
            onClick={onStartProject}
            className="inline-flex h-10 items-center justify-center self-start rounded-full bg-[#1C1B18] px-5 text-[12px] font-semibold text-[#F7F5F0] whitespace-nowrap shrink-0 transition-colors duration-200 hover:bg-[#C98A3A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C98A3A] sm:self-auto"
          >
            + Start a project
          </button>
        </div>

        {/* Interactive Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter projects by discipline"
          className="mt-6 flex flex-wrap items-center gap-2"
        >
          {FILTERS.map((filter) => {
            const isSelected = activeFilter === filter;
            const count =
              filter === 'All'
                ? PROJECTS.length
                : PROJECTS.filter((p) => p.category === filter).length;
            return (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-1.5 text-[12px] font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#C98A3A] ${
                  isSelected
                    ? 'bg-[#1C1B18] text-[#F7F5F0]'
                    : 'glass-subtle text-[#1C1B18]/75 hover:bg-white/30 hover:text-[#1C1B18]'
                }`}
              >
                {filter}{' '}
                <span className="font-mono-tabular opacity-65">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Standard Glassmorphism 4-Column Responsive Portfolio Grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visibleProjects.map((project, idx) => {
            const imgSrc = thumbnails.get(project.id);
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.4,
                  delay: Math.min(idx * 0.03, 0.2),
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <button
                  type="button"
                  onClick={() => onSelectProject(project)}
                  className="glass-tile group block w-full rounded-2xl p-3 text-left transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C98A3A]"
                >
                  <div
                    className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#1C1B18]/10"
                    style={{ backgroundColor: project.palette.bg }}
                  >
                    {imgSrc ? (
                      <img
                        src={imgSrc}
                        alt={`${project.title} — ${project.styleLabel} UI/UX interface`}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center p-4 text-sm font-medium text-[#1C1B18]">
                        {project.title}
                      </div>
                    )}
                  </div>

                  <div className="mt-3 flex items-baseline justify-between gap-2 px-0.5">
                    <div className="min-w-0">
                      <h3 className="truncate text-[15px] font-semibold tracking-[-0.015em] text-[#1C1B18] transition-colors group-hover:text-[#C98A3A]">
                        {project.title}
                      </h3>
                      <p className="mt-0.5 truncate text-[11px] text-[#1C1B18]/65">
                        {project.styleLabel} · {project.year}
                      </p>
                    </div>
                    <span className="font-mono-tabular shrink-0 text-[11px] font-medium text-[#1C1B18]/50">
                      {project.index}
                    </span>
                  </div>
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
