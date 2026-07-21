'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { scrollToId } from './smooth-scroll'

const LINKS = [
  { label: 'Philosophy', id: 'philosophy' },
  { label: 'Collection', id: 'signature' },
  { label: 'Materials', id: 'materials' },
  { label: 'The Journey', id: 'journey' },
  { label: 'Consultation', id: 'consultation' },
]

export function SiteNav({ ready }: { ready: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id: string) => {
    setOpen(false)
    scrollToId(id)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className={`fixed inset-x-0 top-0 z-[500] transition-all duration-700 ${
          scrolled
            ? 'border-b border-ink/8 bg-ivory/85 backdrop-blur-xl'
            : 'border-b border-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 sm:px-10 md:py-6">
          {/* Logo */}
          <button
            onClick={() => go('top')}
            className="flex items-center gap-4"
            data-cursor="Top"
          >
            <div className={`flex h-10 w-10 items-center justify-center border transition-colors duration-500 ${
              scrolled ? 'border-ink/20' : 'border-ivory/20'
            }`}>
              <span className={`font-serif text-sm transition-colors duration-500 ${
                scrolled ? 'text-ink' : 'text-ivory'
              }`}>VB</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className={`font-serif text-lg tracking-wide transition-colors duration-500 sm:text-xl ${
                scrolled ? 'text-ink' : 'text-ivory'
              }`}>
                Vanshika Babbar
              </span>
              <span className={`mt-1 text-[8px] uppercase tracking-luxe transition-colors duration-500 ${
                scrolled ? 'text-muted-foreground' : 'text-ivory/50'
              }`}>
                Bespoke Tailor · Dubai
              </span>
            </div>
          </button>

          {/* Desktop links */}
          <div className="hidden items-center gap-10 lg:flex">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={`group relative text-[10px] uppercase tracking-luxe transition-colors duration-500 ${
                  scrolled ? 'text-ink/60 hover:text-ink' : 'text-ivory/60 hover:text-ivory'
                }`}
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-600 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* CTA button */}
          <button
            onClick={() => go('consultation')}
            className={`hidden items-center gap-3 border px-6 py-3 text-[10px] uppercase tracking-luxe transition-all duration-600 lg:inline-flex ${
              scrolled
                ? 'border-ink/15 text-ink hover:border-gold hover:bg-ink hover:text-ivory'
                : 'border-ivory/20 text-ivory hover:border-gold hover:bg-gold hover:text-ink'
            }`}
            data-cursor="Book"
          >
            Book Appointment
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex flex-col gap-1.5 lg:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`h-px w-7 transition-all duration-500 ${
                open ? 'translate-y-[5px] rotate-45 bg-ivory' : scrolled ? 'bg-ink' : 'bg-ivory'
              }`}
            />
            <span
              className={`h-px w-7 transition-all duration-500 ${
                open ? 'opacity-0' : scrolled ? 'bg-ink' : 'bg-ivory'
              }`}
            />
            <span
              className={`h-px w-7 transition-all duration-500 ${
                open ? '-translate-y-[5px] -rotate-45 bg-ivory' : scrolled ? 'bg-ink' : 'bg-ivory'
              }`}
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[400] flex flex-col justify-center gap-3 bg-ink px-8 lg:hidden"
          >
            {/* Monogram */}
            <div className="absolute left-8 top-8">
              <div className="flex h-10 w-10 items-center justify-center border border-ivory/20">
                <span className="font-serif text-sm text-ivory">VB</span>
              </div>
            </div>

            {LINKS.map((l, i) => (
              <motion.button
                key={l.id}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => go(l.id)}
                className="border-b border-ivory/8 py-5 text-left font-serif text-3xl font-light text-ivory transition-colors hover:text-gold"
              >
                {l.label}
              </motion.button>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-10 text-[9px] uppercase tracking-luxe text-ivory/30"
            >
              Bespoke Tailor · Dubai · Est. 2009
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
