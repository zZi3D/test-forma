import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Check, Sparkles, X } from 'lucide-react';
import { PROJECTS, ProjectItem } from '../data/projects';
import { useProjectModalPreview } from '../utils/mockupGenerator';

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

  const previewUrl = useProjectModalPreview(project);

  const currentIndex = project
    ? PROJECTS.findIndex((p) => p.id === project.id)
    : -1;

  const paletteSwatches = project
    ? [
        { label: 'Canvas', hex: project.palette.bg },
        { label: 'Surface', hex: project.palette.surface },
        { label: 'Ink', hex: project.palette.text },
        { label: 'Accent', hex: project.palette.accent },
      ]
    : [];

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
          aria-label={`${project.styleName} design direction blueprint`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 md:p-8"
        >
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.985 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] w-full max-w-[1060px] overflow-y-auto rounded-2xl border border-[#1C1B18]/12 bg-[#F7F5F0] p-5 text-[#1C1B18] md:p-8"
          >
            {/* Blueprint Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[#1C1B18]/10 pb-5">
              <div>
                <div className="font-mono-tabular flex flex-wrap items-center gap-2 text-[11px] font-medium tracking-[0.06em] text-[#1C1B18]/60 uppercase">
                  <span className="font-semibold text-[#C98A3A]">
                    {project.index}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#1C1B18]">{project.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>Design Direction</span>
                </div>
                <h2 className="display-tight mt-2 text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.05] font-semibold">
                  {project.styleName}
                </h2>
                <p className="mt-1 text-[14px] text-[#1C1B18]/70">
                  {project.tagline}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close design direction blueprint"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#1C1B18]/12 bg-white text-[#1C1B18] transition-colors hover:bg-[#1C1B18] hover:text-[#F7F5F0] focus-visible:outline-2 focus-visible:outline-[#C98A3A]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* 16:10 High-DPI Preview Frame */}
            <div
              className="mt-6 aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#1C1B18]/10"
              style={{ backgroundColor: project.palette.bg }}
            >
              <img
                src={previewUrl}
                alt={`${project.styleName} website design direction preview`}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>

            {/* 3-Column Design Direction Blueprint */}
            <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7">
              {/* Column 1: The Vibe & Impact */}
              <div className="flex flex-col justify-between rounded-xl border border-[#1C1B18]/10 bg-white/65 p-5">
                <div>
                  <p className="font-mono-tabular text-[11px] font-semibold tracking-[0.06em] text-[#C98A3A] uppercase">
                    01 · The Vibe &amp; Impact
                  </p>
                  <p className="mt-3 text-[14px] leading-[1.65] text-[#1C1B18]/82">
                    {project.shortDescription}
                  </p>
                </div>

                <div className="mt-5 border-t border-[#1C1B18]/10 pt-3.5">
                  <span className="block text-[11px] font-medium text-[#1C1B18]/50">
                    Typography Pairing
                  </span>
                  <span className="mt-1 block text-[12px] font-semibold text-[#1C1B18]">
                    {project.typographyNote}
                  </span>
                </div>
              </div>

              {/* Column 2: Ideal For */}
              <div className="rounded-xl border border-[#1C1B18]/10 bg-white/65 p-5">
                <p className="font-mono-tabular text-[11px] font-semibold tracking-[0.06em] text-[#C98A3A] uppercase">
                  02 · Ideal For
                </p>
                <ul className="mt-3.5 flex flex-col gap-2.5">
                  {project.bestFor.map((business) => (
                    <li
                      key={business}
                      className="flex items-start gap-2.5 text-[13px] leading-[1.45] text-[#1C1B18]/85"
                    >
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#1C1B18]/8 text-[#C98A3A]">
                        <Check className="h-2.5 w-2.5" />
                      </span>
                      <span className="font-medium">{business}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Visual Characteristics & Palette */}
              <div className="flex flex-col justify-between rounded-xl border border-[#1C1B18]/10 bg-white/65 p-5">
                <div>
                  <p className="font-mono-tabular text-[11px] font-semibold tracking-[0.06em] text-[#C98A3A] uppercase">
                    03 · Visual Characteristics
                  </p>
                  <ul className="mt-3.5 flex flex-col gap-2">
                    {project.visualCharacteristics.map((trait) => (
                      <li
                        key={trait}
                        className="flex items-start gap-2 text-[12.5px] leading-[1.45] text-[#1C1B18]/80"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C98A3A]"
                        />
                        <span>{trait}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Palette Swatches */}
                <div className="mt-5 border-t border-[#1C1B18]/10 pt-3.5">
                  <span className="block text-[11px] font-medium text-[#1C1B18]/50">
                    Reference Palette
                  </span>
                  <div className="mt-2 flex items-center gap-3">
                    {paletteSwatches.map((swatch) => (
                      <div key={swatch.label} className="flex items-center gap-1.5">
                        <span
                          aria-label={`${swatch.label}: ${swatch.hex}`}
                          title={`${swatch.label} (${swatch.hex})`}
                          className="h-5 w-5 rounded-full border border-[#1C1B18]/20 shadow-xs"
                          style={{ backgroundColor: swatch.hex }}
                        />
                        <span className="font-mono-tabular hidden text-[10px] text-[#1C1B18]/55 sm:inline">
                          {swatch.hex}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tailoring Note & Footer Action Bar */}
            <div className="mt-7 flex flex-col gap-4 border-t border-[#1C1B18]/10 pt-5 md:flex-row md:items-center md:justify-between">
              <p className="flex items-center gap-2 text-[12.5px] text-[#1C1B18]/72">
                <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#C98A3A]" />
                <span>
                  Every direction is fully customized to your brand colors, typography,
                  and content within 24 hours.
                </span>
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3 md:justify-end">
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
                    aria-label="Previous design direction"
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
                    aria-label="Next design direction"
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
                  Build my site in this style →
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
