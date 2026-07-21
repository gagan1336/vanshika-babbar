'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, motion } from 'motion/react'

const STAGES = [
  {
    n: '01',
    title: 'The Consultation',
    src: '/images/vanshika.png',
    body: 'It begins with a conversation. In our private salon in Dubai, we listen — to your lifestyle, your silhouette, your aspirations. Before a single measurement is taken, we understand the man.',
  },
  {
    n: '02',
    title: 'Fabric Selection',
    src: '/images/hd-6.jpg',
    body: 'From the looms of Loro Piana, Dormeuil, and Holland & Sherry — we source only the world\'s most exceptional cloths. You touch, you drape, you choose. The fabric must feel like an extension of your skin.',
  },
  {
    n: '03',
    title: 'Pattern & Cut',
    src: '/images/hd-5.jpg',
    body: 'A unique paper pattern is drafted to your anatomy alone. Neapolitan shoulder, English structure, or relaxed Italian drape — every construction choice serves your posture and presence.',
  },
  {
    n: '04',
    title: 'Hand Construction',
    src: '/images/hd-2.jpg',
    body: 'The canvas is pad-stitched by hand. Buttonholes are sewn one thread at a time. Every seam is pressed, shaped, and manipulated until the garment breathes with three-dimensional life.',
  },
  {
    n: '05',
    title: 'Fittings & Refinement',
    src: '/images/hd-3.jpg',
    body: 'Multiple private fittings sculpt the suit to you alone. We adjust, we refine, we obsess — millimetre by millimetre — until the garment moves as naturally as thought.',
  },
  {
    n: '06',
    title: 'The Finished Suit',
    src: '/images/hd-4.jpg',
    body: 'Presented with ceremony. A garment that will never be replicated, bearing the invisible signature of two hundred hours of devotion. Yours, and yours alone.',
  },
]

export function BespokeJourney() {
  const container = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray<HTMLElement>('[data-stage]')
      steps.forEach((step, i) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => {
            if (self.isActive) setActive(i)
          },
        })
      })
    }, container)
    return () => ctx.revert()
  }, [])

  return (
    <section id="journey" ref={container} className="relative bg-ivory">
      {/* Section header */}
      <div className="mx-auto max-w-[1600px] px-6 pt-28 sm:px-10 md:pt-44">
        <span className="flex items-center gap-3 text-[10px] uppercase tracking-luxe text-gold">
          <span className="inline-block h-px w-6 bg-gold/50" />
          The Bespoke Journey
        </span>
        <h2 className="mt-8 max-w-4xl font-serif text-4xl font-light leading-[1.05] text-ink sm:text-5xl md:text-[3.5rem]">
          Six chapters, from the first handshake to the final stitch.
        </h2>
      </div>

      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-6 py-20 sm:px-10 lg:grid-cols-2 lg:gap-24 lg:py-28">
        {/* Sticky media — left */}
        <div className="hidden lg:block">
          <div className="sticky top-0 flex h-[100svh] items-center">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <AnimatePresence mode="sync">
                <motion.img
                  key={active}
                  src={STAGES[active].src}
                  alt={STAGES[active].title}
                  initial={{ clipPath: 'inset(100% 0 0 0)', scale: 1.08 }}
                  animate={{ clipPath: 'inset(0% 0 0 0)', scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
              {/* Stage number overlay */}
              <div className="absolute bottom-8 left-8 z-10">
                <motion.span
                  key={`n-${active}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-serif text-8xl font-light text-ivory/80 mix-blend-difference"
                >
                  {STAGES[active].n}
                </motion.span>
              </div>
              {/* Progress dots */}
              <div className="absolute right-8 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-3">
                {STAGES.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-2 rounded-full transition-all duration-500 ${
                      i === active ? 'scale-125 bg-gold' : 'bg-ivory/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Steps — right */}
        <div>
          {STAGES.map((s) => (
            <div
              key={s.n}
              data-stage
              className="flex min-h-[70vh] flex-col justify-center border-b border-ink/8 py-12 lg:min-h-[100svh]"
            >
              {/* Mobile image */}
              <div className="relative mb-10 aspect-[4/5] w-full overflow-hidden lg:hidden">
                <img
                  src={s.src}
                  alt={s.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-5 left-5 font-serif text-6xl font-light text-ivory mix-blend-difference">
                  {s.n}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0.1 }}
                whileInView={{ opacity: 1 }}
                viewport={{ margin: '-30% 0px -30% 0px' }}
                transition={{ duration: 0.7 }}
              >
                <span className="text-[10px] uppercase tracking-luxe text-gold">
                  Chapter {s.n}
                </span>
                <h3 className="mt-5 font-serif text-4xl font-light text-ink sm:text-5xl md:text-[3.5rem]">
                  {s.title}
                </h3>
                <p className="mt-7 max-w-md text-[14px] leading-[1.9] text-muted-foreground">
                  {s.body}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
