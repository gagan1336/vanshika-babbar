'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

/**
 * Fixed cinematic overlays: film grain, vignette, and floating ambient particles.
 * Creates a tactile, lived-in luxury atmosphere across the entire page.
 */
export function Atmosphere() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[300]">
      {/* Deep vignette — more dramatic than before */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 110% 90% at 50% 45%, transparent 45%, rgba(10,9,7,0.14) 100%)',
        }}
      />

      {/* Film grain — refined */}
      <div
        className="grain-layer absolute -inset-[50%] opacity-[0.04] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Floating dust particles */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => {
            const size = 1 + Math.random() * 2
            const startX = Math.random() * 100
            const duration = 12 + Math.random() * 20
            const delay = Math.random() * 10

            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-gold/20"
                style={{
                  width: size,
                  height: size,
                  left: `${startX}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                animate={{
                  y: [0, -40, -20, -60, 0],
                  x: [0, 15, -10, 20, 0],
                  opacity: [0, 0.5, 0.3, 0.6, 0],
                }}
                transition={{
                  duration,
                  delay,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            )
          })}
        </div>
      )}

      {/* Subtle top light leak */}
      <div
        className="absolute inset-x-0 top-0 h-40 opacity-30"
        style={{
          background: 'linear-gradient(180deg, rgba(180,155,110,0.04) 0%, transparent 100%)',
        }}
      />
    </div>
  )
}
