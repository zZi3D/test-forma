/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, lazy, useCallback, useState } from 'react';
import { ProjectCategory, ProjectItem } from './data/projects';
import { WaveBackground } from './components/WaveBackground';
import { GlassHeader } from './components/GlassHeader';
import { HeroSection } from './components/HeroSection';
import { SelectedWorkGrid } from './components/SelectedWorkGrid';
import { ProcessSection } from './components/ProcessSection';

const ProjectPreviewModal = lazy(() =>
  import('./components/ProjectPreviewModal').then((m) => ({
    default: m.ProjectPreviewModal,
  })),
);
const MenuOverlay = lazy(() =>
  import('./components/MenuOverlay').then((m) => ({
    default: m.MenuOverlay,
  })),
);
const SprintBookingDrawer = lazy(() =>
  import('./components/SprintBookingDrawer').then((m) => ({
    default: m.SprintBookingDrawer,
  })),
);

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bookingState, setBookingState] = useState<{
    open: boolean;
    tab: 'brief' | 'call';
    prefilledCategory?: ProjectCategory;
    prefilledProjectTitle?: string;
  }>({
    open: false,
    tab: 'brief',
  });
  const [loadedOverlays, setLoadedOverlays] = useState({
    preview: false,
    menu: false,
    booking: false,
  });

  const scrollToSection = useCallback((sectionId: string) => {
    if (sectionId === 'hero-wave') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleSelectProject = useCallback((project: ProjectItem) => {
    setLoadedOverlays((prev) =>
      prev.preview ? prev : { ...prev, preview: true },
    );
    setSelectedProject(project);
  }, []);

  const handleOpenMenu = useCallback(() => {
    setLoadedOverlays((prev) => (prev.menu ? prev : { ...prev, menu: true }));
    setIsMenuOpen(true);
  }, []);

  const openBookingDrawer = useCallback(
    (
      tab: 'brief' | 'call',
      prefilledCategory?: ProjectCategory,
      prefilledProjectTitle?: string,
    ) => {
      setLoadedOverlays((prev) =>
        prev.booking ? prev : { ...prev, booking: true },
      );
      setBookingState({
        open: true,
        tab,
        prefilledCategory,
        prefilledProjectTitle,
      });
    },
    [],
  );

  return (
    <div className="relative min-h-screen w-full bg-[#F7F5F0] text-[#1C1B18]">
      {/* Pinned 52-line 3D Perspective HTML5 2D Canvas Wave + Mist Overlay */}
      <WaveBackground />

      {/* Sticky Elevated Glass Floating Header */}
      <GlassHeader
        onNavigateSection={scrollToSection}
        onOpenBooking={() => openBookingDrawer('brief')}
        onOpenMenu={handleOpenMenu}
      />

      {/* Main Content: Sticky Section 1 with Section 2+3 scrolling over it */}
      <main className="relative z-10">
        <HeroSection
          onSelectProject={handleSelectProject}
          onOpenBooking={() => openBookingDrawer('call')}
          onJumpToWork={() => scrollToSection('selected-work')}
        />

        {/* Rising Sheet (Section 2 & 3 scroll smoothly over fixed Section 1) */}
        <div className="relative z-20 overflow-hidden rounded-t-[28px] border-t border-white/75 shadow-[0_-24px_60px_-18px_rgba(28,27,24,0.12)] md:rounded-t-[40px]">
          {/* Frosted top lip + warm canvas veil at the leading edge so Hero clears cleanly while keeping WaveBackground visible behind grid tiles */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-white/30 backdrop-blur-md"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#F7F5F0]/90 via-[#F7F5F0]/45 to-[#F7F5F0]/25"
          />

          <div className="relative z-10">
            <SelectedWorkGrid
              onSelectProject={handleSelectProject}
              onStartProject={() => openBookingDrawer('brief')}
            />

            <ProcessSection
              onBookCall={() => openBookingDrawer('call')}
              onOpenBrief={() => openBookingDrawer('brief')}
            />
          </div>
        </div>
      </main>

      {/* Lazy-loaded Overlays (excluded from initial critical path, retain exit animations once opened) */}
      <Suspense fallback={null}>
        {loadedOverlays.preview && (
          <ProjectPreviewModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onSelectProject={handleSelectProject}
            onStartSimilarSprint={(project) => {
              setSelectedProject(null);
              openBookingDrawer('brief', project.category, project.title);
            }}
          />
        )}

        {loadedOverlays.menu && (
          <MenuOverlay
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            onNavigateSection={scrollToSection}
            onOpenBooking={(tab) => openBookingDrawer(tab)}
          />
        )}

        {loadedOverlays.booking && (
          <SprintBookingDrawer
            isOpen={bookingState.open}
            initialTab={bookingState.tab}
            prefilledCategory={bookingState.prefilledCategory}
            prefilledProjectTitle={bookingState.prefilledProjectTitle}
            onClose={() => setBookingState((prev) => ({ ...prev, open: false }))}
          />
        )}
      </Suspense>
    </div>
  );
}
