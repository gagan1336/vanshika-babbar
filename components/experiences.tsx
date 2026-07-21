'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { FadeIn, RevealHeading } from './anim'

const WORDS = [
  'Bespoke',
  'Precision',
  'Heritage',
  'Exclusivity',
  'Craftsmanship',
  'Devotion',
  'Sartorial',
  'Mastery',
]

const TESTIMONIALS = [
  {
    quote:
      'I have worn Savile Row, I have worn Naples. Nothing has fit the way Vanshika constructs a jacket. She understands the body the way an architect understands space.',
    name: 'H. A.',
    place: 'Dubai · Business Suit Commission',
    initial: 'H',
  },
  {
    quote:
      'The fitting felt like sculpture. By the third session, I understood I was not buying a suit — I was investing in a second skin that would outlast every trend.',
    name: 'S. R.',
    place: 'London · Wedding Suit',
    initial: 'S',
  },
  {
    quote:
      'She asked me how I sit, how I gesture, which pocket my phone lives in. That attention is what separates craft from couture.',
    name: 'M. K.',
    place: 'Mumbai · Wardrobe Commission',
    initial: 'M',
  },
]

export function Experiences() {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: marqueeRef,
    offset: ['start end', 'end start'],
  })
  // Parallax the marquee slightly based on scroll
  const marqueeX = useTransform(scrollYProgress, [0, 1], ['0%', '-5%'])

  return (
    <section id="experiences" className="relative overflow-hidden bg-ink py-28 md:py-44">
      {/* Marquee band */}
      <div ref={marqueeRef} className="mb-28 flex select-none overflow-hidden border-y border-ivory/6 py-8">
        <motion.div style={{ x: marqueeX }} className="animate-marquee flex shrink-0 items-center gap-14 whitespace-nowrap">
          {[...WORDS, ...WORDS].map((w, i) => (
            <span key={i} className="flex items-center gap-14">
              <span className="font-serif text-4xl font-light italic text-ivory/60 md:text-6xl">
                {w}
              </span>
              <span className="text-xs text-gold/40">✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
        <div className="max-w-2xl">
          <div className="flex flex-col gap-2">
            <span className="flex items-center gap-3 text-[10px] uppercase tracking-luxe text-gold">
              <span className="inline-block h-px w-6 bg-gold/40" />
              06 / The Patrons
            </span>
            <span className="pl-9 text-[6.5px] uppercase tracking-wide-luxe text-ivory/30">
              Words from our clientele
            </span>
          </div>
          <RevealHeading
            text="Trusted by gentlemen who demand the exceptional."
            className="mt-8 font-serif text-4xl font-light leading-[1.05] text-ivory sm:text-5xl md:text-[3.5rem]"
          />
          <FadeIn delay={0.1}>
            <p className="mt-8 max-w-lg text-[14px] leading-[1.9] text-ivory/35">
              Our clients prefer discretion. Their words, shared privately, speak to an experience
              that transcends tailoring.
            </p>
          </FadeIn>
        </div>

        {/* Testimonial cards — stacked editorial layout */}
        <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn
              key={i}
              delay={i * 0.12}
              className="group relative flex flex-col justify-between gap-14 border-ivory/6 p-8 transition-all duration-700 hover:bg-ivory/[0.02] md:p-10 [&:not(:last-child)]:border-b md:[&:not(:last-child)]:border-b-0 md:[&:not(:last-child)]:border-r"
            >
              {/* Large initial letter */}
              <div className="absolute right-6 top-6 font-serif text-7xl font-light text-ivory/[0.04] md:text-8xl">
                {t.initial}
              </div>

              <div className="relative">
                <span className="font-serif text-5xl leading-none text-gold/25">&ldquo;</span>
                <p className="mt-3 font-serif text-[1.25rem] font-light leading-[1.65] text-ivory/80 md:text-[1.35rem]">
                  {t.quote}
                </p>
              </div>

              <div className="relative">
                <div className="mb-5 h-px w-16 bg-gold/25 transition-all duration-700 group-hover:w-24 group-hover:bg-gold/50" />
                <div className="text-sm text-gold">{t.name}</div>
                <div className="mt-2 text-[9px] uppercase tracking-luxe text-ivory/30">
                  {t.place}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Bottom trust statement */}
        <FadeIn delay={0.3}>
          <div className="mt-20 flex items-center justify-center gap-6 text-center">
            <span className="h-px w-12 bg-ivory/10" />
            <p className="text-[10px] uppercase tracking-luxe text-ivory/20">
              All client identities protected by our discretion policy
            </p>
            <span className="h-px w-12 bg-ivory/10" />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
