'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

export function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)
  const [phase, setPhase] = useState<'counting' | 'revealing' | 'exit'>('counting')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    let current = 0
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 15) + 15
      if (current >= 100) {
        current = 100
        clearInterval(interval)
        setPhase('revealing')
        setTimeout(() => {
          setPhase('exit')
          setTimeout(() => {
            setDone(true)
            onComplete?.()
          }, 300)
        }, 300)
      }
      setCount(current)
    }, 20)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-ink"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Ambient particles */}
          {mounted && (
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-gold/30"
                  style={{
                    width: Math.random() * 3 + 1,
                    height: Math.random() * 3 + 1,
                    left: `${Math.random() * 100}%`,
                    bottom: `-10%`,
                  }}
                  animate={{
                    y: [0, -1200],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: Math.random() * 4 + 3,
                    delay: Math.random() * 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              ))}
            </div>
          )}

          {/* Central content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="relative flex flex-col items-center gap-8 px-6 text-center"
          >
            {/* Monogram */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="flex h-24 w-24 items-center justify-center border border-gold/40">
                <span className="font-serif text-4xl font-light text-gold">VB</span>
              </div>
              {/* Corner accents */}
              <div className="absolute -left-1 -top-1 h-3 w-3 border-l border-t border-gold/60" />
              <div className="absolute -right-1 -top-1 h-3 w-3 border-r border-t border-gold/60" />
              <div className="absolute -bottom-1 -left-1 h-3 w-3 border-b border-l border-gold/60" />
              <div className="absolute -bottom-1 -right-1 h-3 w-3 border-b border-r border-gold/60" />
            </motion.div>

            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-[10px] uppercase tracking-luxe text-gold/80"
            >
              Bespoke Tailor · Dubai
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-5xl font-light leading-none text-ivory sm:text-6xl md:text-7xl"
            >
              Vanshika Babbar
            </motion.h1>

            {/* Progress line */}
            <div className="mt-2 h-px w-48 overflow-hidden bg-ivory/10">
              <motion.div
                className="h-full bg-gradient-to-r from-gold/60 via-gold to-gold/60"
                initial={{ width: 0 }}
                animate={{ width: `${count}%` }}
                transition={{ ease: 'easeOut', duration: 0.3 }}
              />
            </div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'revealing' ? 0.4 : 0.6 }}
              className="text-[9px] uppercase tracking-luxe text-ivory/40"
            >
              {phase === 'counting' ? 'Preparing your experience' : 'Welcome'}
            </motion.span>
          </motion.div>

          {/* Bottom counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'exit' ? 0 : 0.3 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-8 right-8 font-serif text-7xl font-light tabular-nums text-ivory/20 sm:text-8xl"
          >
            {String(count).padStart(3, '0')}
          </motion.div>

          {/* Decorative lines */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 left-0 right-0 h-px origin-left bg-gradient-to-r from-transparent via-gold/30 to-transparent"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
