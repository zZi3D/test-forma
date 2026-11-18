/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { IndustryFilter, ProjectItem } from './data/projects';
import { WaveBackground } from './components/WaveBackground';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { GlassHeader } from './components/GlassHeader';
import { HeroSection } from './components/HeroSection';
import { SelectedWorkGrid } from './components/SelectedWorkGrid';
import { DirectionsMarqueeShowcase } from './components/DirectionsMarqueeShowcase';
import { StylePlayground } from './components/StylePlayground';
import { ProcessSection } from './components/ProcessSection';

const WorkPage = lazy(() =>
  import('./components/WorkPage').then((m) => ({
    default: m.WorkPage,
  })),
);
const ExamplesPage = lazy(() =>
  import('./components/ExamplesPage').then((m) => ({
    default: m.ExamplesPage,
  })),
);
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

type PageView = 'home' | 'work' | 'examples';

function isDirectionsHash(hash: string): boolean {
  return hash === '#/directions' || hash === '#/work';
}

function isExamplesHash(hash: string): boolean {
  return hash === '#/examples';
}

function getPageFromHash(hash: string): PageView {
  if (isDirectionsHash(hash)) return 'work';
  if (isExamplesHash(hash)) return 'examples';
  return 'home';
}

function getInitialPage(): PageView {
  if (typeof window !== 'undefined') {
    return getPageFromHash(window.location.hash);
  }
  return 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>(getInitialPage);
  const [pendingDemoScrollId, setPendingDemoScrollId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bookingState, setBookingState] = useState<{
    open: boolean;
    tab: 'brief' | 'call';
    prefilledCategory?: IndustryFilter;
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

  useEffect(() => {
    const syncFromHash = () => {
      setCurrentPage(getPageFromHash(window.location.hash));
    };
    window.addEventListener('hashchange', syncFromHash);
    window.addEventListener('popstate', syncFromHash);
    return () => {
      window.removeEventListener('hashchange', syncFromHash);
      window.removeEventListener('popstate', syncFromHash);
    };
  }, []);

  const navigateTo = useCallback(
    (target: string, demoId?: string) => {
      if (target === 'work') {
        if (window.location.hash !== '#/directions') {
          window.history.pushState(null, '', '#/directions');
        }
        setCurrentPage('work');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (target === 'examples') {
        if (window.location.hash !== '#/examples') {
          window.history.pushState(null, '', '#/examples');
        }
        setPendingDemoScrollId(demoId ?? null);
        setCurrentPage('examples');
        if (!demoId) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      const scrollTargetOnHome = () => {
        if (target === 'hero-wave') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        const el = document.getElementById(target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };

      if (currentPage !== 'home') {
        if (
          isDirectionsHash(window.location.hash) ||
          isExamplesHash(window.location.hash)
        ) {
          window.history.pushState(
            null,
            '',
            window.location.pathname + window.location.search,
          );
        }
        setCurrentPage('home');
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(scrollTargetOnHome);
        });
        return;
      }

      scrollTargetOnHome();
    },
    [currentPage],
  );

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
      prefilledCategory?: IndustryFilter,
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

      {/* Subtle Top Scroll Progress Bar on Homepage */}
      {currentPage === 'home' && <ScrollProgressBar />}

      {/* Sticky Elevated Glass Floating Header */}
      <GlassHeader
        activePage={currentPage}
        onNavigateSection={navigateTo}
        onOpenBooking={() => openBookingDrawer('brief')}
        onOpenMenu={handleOpenMenu}
      />

      {currentPage === 'work' ? (
        <main className="relative z-10">
          <Suspense fallback={<div className="min-h-screen" />}>
            <WorkPage
              onSelectProject={handleSelectProject}
              onOpenLiveDemo={(demoId) => navigateTo('examples', demoId)}
              onStartProject={() => openBookingDrawer('brief')}
              onBookCall={() => openBookingDrawer('call')}
              onBackToOverview={() => navigateTo('hero-wave')}
            />
          </Suspense>
        </main>
      ) : currentPage === 'examples' ? (
        <main className="relative z-10">
          <Suspense fallback={<div className="min-h-screen" />}>
            <ExamplesPage
              initialDemoId={pendingDemoScrollId}
              onConsumeInitialDemo={() => setPendingDemoScrollId(null)}
              onStartProject={(prefilledStyle) =>
                openBookingDrawer('brief', undefined, prefilledStyle)
              }
              onBookCall={() => openBookingDrawer('call')}
              onBackToOverview={() => navigateTo('hero-wave')}
            />
          </Suspense>
        </main>
      ) : (
        /* Home Content: Sticky Section 1 with Section 2+3 scrolling over it */
        <main className="relative z-10">
          <HeroSection
            onSelectProject={handleSelectProject}
            onOpenBooking={() => openBookingDrawer('call')}
            onJumpToWork={() => navigateTo('selected-work')}
          />

          {/* Rising Sheet (Section 2 & 3 scroll smoothly over fixed Section 1) */}
          <div id="rising-sheet" className="relative z-20">
            {/* Rounded frosted top lip + translucent warm veil kept in an absolute sibling so no overflow-x-clip or border-radius clips sticky descendants */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-t-[28px] border-t border-white/75 shadow-[0_-24px_60px_-18px_rgba(28,27,24,0.12)] md:rounded-t-[40px]"
            >
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/75 via-white/35 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#F7F5F0]/90 via-[#F7F5F0]/45 to-[#F7F5F0]/25" />
            </div>

            <div className="relative z-10">
              <SelectedWorkGrid
                onSelectProject={handleSelectProject}
                onOpenLiveDemo={(demoId) => navigateTo('examples', demoId)}
                onStartProject={() => openBookingDrawer('brief')}
              />

              <DirectionsMarqueeShowcase
                onOpenLiveDemo={(demoId) => navigateTo('examples', demoId)}
              />

              <StylePlayground
                onBuildInStyle={(industry, description) =>
                  openBookingDrawer('brief', industry, description)
                }
              />

              <ProcessSection
                onBookCall={() => openBookingDrawer('call')}
                onOpenBrief={() => openBookingDrawer('brief')}
              />
            </div>
          </div>
        </main>
      )}

      {/* Lazy-loaded Overlays (excluded from initial critical path, retain exit animations once opened) */}
      <Suspense fallback={null}>
        {loadedOverlays.preview && (
          <ProjectPreviewModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onSelectProject={handleSelectProject}
            onOpenLiveDemo={(demoId) => navigateTo('examples', demoId)}
            onStartSimilarSprint={(project) => {
              setSelectedProject(null);
              openBookingDrawer(
                'brief',
                project.industries[0],
                `${project.businessTitle} (${project.styleSubtitle})`,
              );
            }}
          />
        )}

        {loadedOverlays.menu && (
          <MenuOverlay
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            onNavigateSection={navigateTo}
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
