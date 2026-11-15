import { ProjectConfig } from '../data/projects';
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
import { renderBauhausGrid } from './mockupRenderers/renderBauhausGrid';
import { renderRetroCrt } from './mockupRenderers/renderRetroCrt';

const dataUrlCache = new Map<string, string>();

/**
 * Generates a crisp high-DPI 1600x1000px (16:10) HTML5 Canvas mockup
 * using the dedicated UI/UX renderer mapped to `project.uiStyle`.
 */
export function renderMockupToCanvas(
  project: ProjectConfig,
  width = 1600,
  height = 1000,
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

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
    case 'bauhaus-grid':
      renderBauhausGrid(ctx, width, height, project);
      break;
    case 'retro-crt':
      renderRetroCrt(ctx, width, height, project);
      break;
  }

  return canvas;
}

export function getProjectDataUrl(project: ProjectConfig): string {
  const cacheKey = `${project.id}:${project.uiStyle}:${project.palette.bg}:${project.palette.accent}:${project.content.headline}`;
  const cached = dataUrlCache.get(cacheKey);
  if (cached) return cached;

  const canvas = renderMockupToCanvas(project, 1600, 1000);
  const url = canvas.toDataURL('image/png');
  dataUrlCache.set(cacheKey, url);
  return url;
}
