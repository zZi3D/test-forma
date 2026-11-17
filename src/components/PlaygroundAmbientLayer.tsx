import { motion } from 'motion/react';
import { PlaygroundStyleId } from '../data/playgroundStyles';

interface PlaygroundAmbientLayerProps {
  styleId: PlaygroundStyleId;
  reducedMotion: boolean;
}

export function PlaygroundAmbientLayer({
  styleId,
  reducedMotion,
}: PlaygroundAmbientLayerProps) {
  if (reducedMotion) return null;

  switch (styleId) {
    case 'glassmorphism':
      return (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
        >
          <motion.div
            animate={{ x: [0, 34, -14, 0], y: [0, -18, 22, 0] }}
            transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-16 -left-12 h-72 w-72 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(129,140,248,0.28) 0%, transparent 70%)',
            }}
          />
          <motion.div
            animate={{ x: [0, -28, 16, 0], y: [0, 24, -16, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -right-14 -bottom-16 h-80 w-80 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(244,114,182,0.24) 0%, transparent 70%)',
            }}
          />
        </div>
      );

    case 'claymorphism':
      return (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
        >
          <motion.div
            animate={{ scale: [1, 1.07, 1], opacity: [0.45, 0.72, 0.45] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-12 right-12 h-64 w-64 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(255,255,255,0.72) 0%, transparent 68%)',
            }}
          />
        </div>
      );

    case 'holographic-hud':
      return (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
        >
          {/* Subtle descending cyan scanline */}
          <motion.div
            animate={{ y: ['-10%', '520%'] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-x-0 top-0 h-20"
            style={{
              background:
                'linear-gradient(180deg, transparent 0%, rgba(56,189,248,0.12) 50%, transparent 100%)',
            }}
          />
          {/* Faint telemetry corner pulse */}
          <motion.div
            animate={{ opacity: [0.25, 0.7, 0.25] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-3 rounded-2xl border border-sky-400/20"
          />
        </div>
      );

    case 'neon-dark':
      return (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
        >
          {/* Breathing opacity on static glow border (zero box-shadow animation!) */}
          <motion.div
            animate={{ opacity: [0.3, 0.85, 0.3] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-3xl border-2 border-emerald-400/45"
          />
          <motion.div
            animate={{ opacity: [0.18, 0.42, 0.18], scale: [0.96, 1.04, 0.96] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute right-8 bottom-8 h-60 w-60 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(16,185,129,0.28) 0%, transparent 70%)',
            }}
          />
        </div>
      );

    case 'cyberpunk':
      return (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
        >
          <motion.div
            animate={{ opacity: [0.22, 0.55, 0.22] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-10 right-10 h-56 w-56 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(236,72,153,0.24) 0%, transparent 68%)',
            }}
          />
          <motion.div
            animate={{ y: ['-15%', '520%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-x-0 top-0 h-14"
            style={{
              background:
                'linear-gradient(180deg, transparent 0%, rgba(250,204,21,0.08) 50%, transparent 100%)',
            }}
          />
        </div>
      );

    case 'candy-pop':
      return (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
        >
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-20 right-16 h-6 w-6 rounded-full bg-[#FFD60A]/45"
          />
          <motion.div
            animate={{ y: [0, 12, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 6.4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-14 left-12 h-5 w-5 rounded-md bg-[#34D399]/40"
          />
        </div>
      );

    case 'pop-cartoon':
      return (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
        >
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [12, 18, 12] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-20 right-10 h-5 w-5 border-2 border-[#09090B]/30 bg-[#FFD60A]/65"
          />
          <motion.div
            animate={{ y: [0, 9, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-12 left-10 h-4 w-4 rounded-full border-2 border-[#09090B]/25 bg-[#2563EB]/45"
          />
        </div>
      );

    case 'illustration':
      return (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
        >
          <motion.div
            animate={{ rotate: [0, 6, 0], y: [0, -6, 0] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute right-8 bottom-8 h-16 w-16 rounded-full border border-[#2F4538]/12"
          />
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-20 left-8 h-10 w-10 rounded-full bg-[#D97757]/10"
          />
        </div>
      );

    case 'cyber-id':
      return (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
        >
          <motion.div
            animate={{ y: ['-10%', '520%'] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-x-0 top-0 h-px bg-indigo-300/25"
          />
          <motion.div
            animate={{ opacity: [0.35, 0.85, 0.35] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-6 left-8 h-2 w-2 rounded-full bg-emerald-400/75"
          />
        </div>
      );
  }
}
