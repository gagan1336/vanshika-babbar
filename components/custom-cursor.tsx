'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [label, setLabel] = useState<string | null>(null)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 400, damping: 35, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 400, damping: 35, mass: 0.5 })

  // Outer ring (slower follow for depth)
  const outerX = useSpring(x, { stiffness: 120, damping: 25, mass: 1 })
  const outerY = useSpring(y, { stiffness: 120, damping: 25, mass: 1 })

  const rafId = useRef<number | null>(null)

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!isFinePointer) return
    setEnabled(true)
    document.documentElement.classList.add('cursor-none-lg')

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        'a, button, [data-cursor]',
      )
      if (target) {
        setHovering(true)
        setLabel(target.getAttribute('data-cursor'))
      } else {
        setHovering(false)
        setLabel(null)
      }
    }

    window.addEventListener('mousemove', move)
    return () => {
      window.removeEventListener('mousemove', move)
      document.documentElement.classList.remove('cursor-none-lg')
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      {/* Outer ring — slower, creates depth */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{ x: outerX, y: outerY }}
      >
        <motion.div
          className="rounded-full border border-gold/20"
          animate={{
            width: hovering ? 56 : 32,
            height: hovering ? 56 : 32,
            x: hovering ? -28 : -16,
            y: hovering ? -28 : -16,
            opacity: hovering ? 0.5 : 0.25,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        />
      </motion.div>

      {/* Inner dot — primary cursor */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center"
        style={{ x: springX, y: springY }}
      >
        <motion.div
          className="flex items-center justify-center rounded-full backdrop-blur-[1px]"
          animate={{
            width: label ? 88 : hovering ? 44 : 8,
            height: label ? 88 : hovering ? 44 : 8,
            x: label ? -44 : hovering ? -22 : -4,
            y: label ? -44 : hovering ? -22 : -4,
            backgroundColor: label
              ? 'oklch(0.72 0.065 72 / 0.15)'
              : hovering
              ? 'oklch(0.72 0.065 72 / 0.12)'
              : 'oklch(0.72 0.065 72 / 0.9)',
            borderWidth: label || hovering ? 1 : 0,
            borderColor: 'oklch(0.72 0.065 72 / 0.4)',
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        >
          {label && (
            <span className="text-[9px] uppercase tracking-luxe text-gold">{label}</span>
          )}
        </motion.div>
      </motion.div>
    </>
  )
}
