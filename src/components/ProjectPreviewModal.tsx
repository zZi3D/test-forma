import { useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { PROJECTS, ProjectItem } from '../data/projects';
import { getProjectDataUrl } from '../utils/mockupGenerator';

interface ProjectPreviewModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onSelectProject: (project: ProjectItem) => void;
  onStartSimilarSprint: (project: ProjectItem) => void;
}

export function ProjectPreviewModal({
  project,
  onClose,
  onSelectProject,
  onStartSimilarSprint,
}: ProjectPreviewModalProps) {
  useEffect(() => {
    if (!project) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        const idx = PROJECTS.findIndex((p) => p.id === project.id);
        onSelectProject(PROJECTS[(idx + 1) % PROJECTS.length]);
      }
      if (e.key === 'ArrowLeft') {
        const idx = PROJECTS.findIndex((p) => p.id === project.id);
        onSelectProject(PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length]);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [project, onClose, onSelectProject]);

  const previewUrl = useMemo(() => {
    if (!project) return '';
    return getProjectDataUrl(project);
  }, [project]);

  const currentIndex = project
    ? PROJECTS.findIndex((p) => p.id === project.id)
    : -1;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} case study preview`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 md:p-8"
        >
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.985 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] w-full max-w-[1040px] overflow-y-auto rounded-2xl border border-[#1C1B18]/12 bg-[#F7F5F0] p-5 text-[#1C1B18] md:p-8"
          >
            {/* Top Bar */}
            <div className="flex items-start justify-between gap-4 border-b border-[#1C1B18]/10 pb-5">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-[12px] text-[#1C1B18]/65">
                  <span className="font-mono-tabular font-semibold text-[#C98A3A]">
                    {project.index}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-medium text-[#1C1B18]">{project.styleLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-tabular">{project.sprintDuration}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-tabular">{project.year}</span>
                </div>
                <h2 className="display-tight mt-2 text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.05] font-semibold">
                  {project.title}
                </h2>
                <p className="mt-1 text-[13px] text-[#1C1B18]/65">
                  {project.subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close case study preview"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#1C1B18]/12 bg-white text-[#1C1B18] transition-colors hover:bg-[#1C1B18] hover:text-[#F7F5F0] focus-visible:outline-2 focus-visible:outline-[#C98A3A]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* 16:10 High-DPI Preview Frame */}
            <div
              className="mt-6 aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#1C1B18]/10"
              style={{ backgroundColor: project.palette.surface }}
            >
              <img
                src={previewUrl}
                alt={`${project.title} editorial interface`}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Details Grid */}
            <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-12">
              <div className="md:col-span-7">
                <p className="text-[15px] leading-[1.65] text-[#1C1B18]/80">
                  {project.summary}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-[#1C1B18]/65">
                  <span className="font-semibold text-[#1C1B18]">Deliverables:</span>
                  {project.deliverables.map((item, idx) => (
                    <span key={item} className="inline-flex items-center gap-2">
                      {idx > 0 && <span aria-hidden="true">·</span>}
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-between gap-5 border-t border-[#1C1B18]/10 pt-5 md:col-span-5 md:border-t-0 md:border-l md:pt-0 md:pl-6">
                <div className="grid grid-cols-2 gap-4 text-[12px]">
                  <div>
                    <span className="block text-[#1C1B18]/50">Client</span>
                    <span className="mt-1 block font-medium text-[#1C1B18]">
                      {project.client}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[#1C1B18]/50">Domain</span>
                    <span className="font-mono-tabular mt-1 block font-medium text-[#1C1B18]">
                      {project.slug}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        onSelectProject(
                          PROJECTS[
                            (currentIndex - 1 + PROJECTS.length) % PROJECTS.length
                          ],
                        )
                      }
                      aria-label="Previous project"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1C1B18]/15 bg-white text-[#1C1B18] transition-colors hover:bg-[#1C1B18] hover:text-[#F7F5F0]"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        onSelectProject(
                          PROJECTS[(currentIndex + 1) % PROJECTS.length],
                        )
                      }
                      aria-label="Next project"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1C1B18]/15 bg-white text-[#1C1B18] transition-colors hover:bg-[#1C1B18] hover:text-[#F7F5F0]"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onStartSimilarSprint(project)}
                    className="inline-flex h-10 items-center justify-center rounded-full bg-[#1C1B18] px-5 text-[12px] font-semibold text-[#F7F5F0] whitespace-nowrap shrink-0 transition-colors hover:bg-[#C98A3A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C98A3A]"
                  >
                    Start a 24h sprint like this
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
