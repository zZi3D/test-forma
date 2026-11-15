import { useEffect, useState } from 'react';
import { PROJECTS, ProjectConfig } from '../data/projects';
import { renderSwissMinimalism } from './mockupRenderers/renderSwissMinimalism';
import { renderDarkNeumorphism } from './mockupRenderers/renderDarkNeumorphism';
import { renderNeoBrutalism } from './mockupRenderers/renderNeoBrutalism';
import { renderNewAgeGradient } from './mockupRenderers/renderNewAgeGradient';
import { renderClaymorphism } from './mockupRenderers/renderClaymorphism';
import { renderSkeuomorphism } from './mockupRenderers/renderSkeuomorphism';
import { renderBentoEditorial } from './mockupRenderers/renderBentoEditorial';
import { renderCyberpunkGlass } from './mockupRenderers/renderCyberpunkGlass';
import { renderOrganicBiophilic } from './mockupRenderers/renderOrganicBiophilic';
import { renderDarkKinetic } from './mockupRenderers/renderDarkKinetic';
import { renderModularBento } from './mockupRenderers/renderModularBento';
import { renderDopamineCommerce } from './mockupRenderers/renderDopamineCommerce';

const cardUrlCache = new Map<string, string>();
const modalUrlCache = new Map<string, string>();
const subscribers = new Set<() => void>();

let queueStarted = false;

function getCacheKey(project: ProjectConfig): string {
  return `${project.id}:${project.uiStyle}:${project.palette.bg}:${project.palette.accent}:${project.styleName}`;
}

/**
 * Renders a project mockup in logical 1600x1000 coordinates,
 * scaling the backing bitmap by `outputScale` (0.6 = 960x600 Retina card size).
 */
export function renderMockupToCanvas(
  project: ProjectConfig,
  width = 1600,
  height = 1000,
  outputScale = 1,
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(width * outputScale);
  canvas.height = Math.round(height * outputScale);
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  if (outputScale !== 1) {
    ctx.scale(outputScale, outputScale);
  }

  switch (project.uiStyle) {
    case 'swiss-minimalism':
      renderSwissMinimalism(ctx, width, height, project);
      break;
    case 'dark-neumorphism':
      renderDarkNeumorphism(ctx, width, height, project);
      break;
    case 'neo-brutalism':
      renderNeoBrutalism(ctx, width, height, project);
      break;
    case 'new-age-gradient':
      renderNewAgeGradient(ctx, width, height, project);
      break;
    case 'claymorphism':
      renderClaymorphism(ctx, width, height, project);
      break;
    case 'skeuomorphism':
      renderSkeuomorphism(ctx, width, height, project);
      break;
    case 'bento-editorial':
      renderBentoEditorial(ctx, width, height, project);
      break;
    case 'cyberpunk-glass':
      renderCyberpunkGlass(ctx, width, height, project);
      break;
    case 'organic-biophilic':
      renderOrganicBiophilic(ctx, width, height, project);
      break;
    case 'dark-kinetic':
      renderDarkKinetic(ctx, width, height, project);
      break;
    case 'modular-bento':
      renderModularBento(ctx, width, height, project);
      break;
    case 'dopamine-commerce':
      renderDopamineCommerce(ctx, width, height, project);
      break;
  }

  return canvas;
}

function canvasToObjectUrl(canvas: HTMLCanvasElement): Promise<string> {
  return new Promise((resolve) => {
    if (typeof canvas.toBlob === 'function') {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(URL.createObjectURL(blob));
          } else {
            resolve(canvas.toDataURL('image/png'));
          }
        },
        'image/webp',
        0.94,
      );
      return;
    }
    resolve(canvas.toDataURL('image/png'));
  });
}

function yieldFrame(): Promise<void> {
  return new Promise((resolve) => {
    window.requestAnimationFrame(() => resolve());
  });
}

function notifySubscribers() {
  subscribers.forEach((cb) => cb());
}

function startThumbnailQueue() {
  if (queueStarted || typeof window === 'undefined') return;
  queueStarted = true;

  // Render front-facing wheel cards first (0, 1, 11, 2, 10), then the rest
  const priorityOrder = [0, 1, 11, 2, 10, 3, 9, 4, 8, 5, 7, 6].filter(
    (idx) => idx < PROJECTS.length,
  );

  const run = async () => {
    // Let initial React UI & Wave paint before heavy canvas drawing starts
    await yieldFrame();

    for (const idx of priorityOrder) {
      const project = PROJECTS[idx];
      const key = getCacheKey(project);
      if (cardUrlCache.has(key)) continue;

      const canvas = renderMockupToCanvas(project, 1600, 1000, 0.6);
      const url = await canvasToObjectUrl(canvas);
      cardUrlCache.set(key, url);
      notifySubscribers();

      await yieldFrame();
    }
  };

  void run();
}

function buildThumbnailMap(): Map<string, string> {
  const map = new Map<string, string>();
  PROJECTS.forEach((p) => {
    const url = cardUrlCache.get(getCacheKey(p));
    if (url) map.set(p.id, url);
  });
  return map;
}

/**
 * Shared progressive hook providing crisp 960x600 WebP blob URLs for cards
 * without blocking initial page load.
 */
export function useProjectThumbnails(): Map<string, string> {
  const [thumbnails, setThumbnails] = useState<Map<string, string>>(() =>
    buildThumbnailMap(),
  );

  useEffect(() => {
    const handleUpdate = () => {
      setThumbnails(buildThumbnailMap());
    };
    subscribers.add(handleUpdate);
    startThumbnailQueue();
    handleUpdate();
    return () => {
      subscribers.delete(handleUpdate);
    };
  }, []);

  return thumbnails;
}

/**
 * Returns cached card preview instantly while upgrading to full 1600x1000
 * high-DPI resolution asynchronously when a user opens the modal.
 */
export function useProjectModalPreview(project: ProjectConfig | null): string {
  const [url, setUrl] = useState<string>(() => {
    if (!project) return '';
    const key = getCacheKey(project);
    return modalUrlCache.get(key) ?? cardUrlCache.get(key) ?? '';
  });

  useEffect(() => {
    if (!project) {
      setUrl('');
      return;
    }

    const key = getCacheKey(project);
    const cachedModal = modalUrlCache.get(key);
    if (cachedModal) {
      setUrl(cachedModal);
      return;
    }

    const cachedCard = cardUrlCache.get(key);
    if (cachedCard) {
      setUrl(cachedCard);
    }

    let cancelled = false;
    const generateHighRes = async () => {
      await yieldFrame();
      if (cancelled) return;
      const canvas = renderMockupToCanvas(project, 1600, 1000, 1);
      const highResUrl = await canvasToObjectUrl(canvas);
      if (cancelled) {
        if (highResUrl.startsWith('blob:')) URL.revokeObjectURL(highResUrl);
        return;
      }
      modalUrlCache.set(key, highResUrl);
      setUrl(highResUrl);
    };

    void generateHighRes();
    return () => {
      cancelled = true;
    };
  }, [project]);

  return url;
}
