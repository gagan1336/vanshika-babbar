'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { FadeIn, RevealHeading, ParallaxImage } from './anim'

const FABRICS = [
  {
    mill: 'Loro Piana',
    origin: 'Quarona, Italy',
    detail: 'Summertime cashmere & virgin wool blends. The pinnacle of Italian luxury weaving since 1924.',
  },
  {
    mill: 'Dormeuil',
    origin: 'Paris, France',
    detail: 'Suppliers to heads of state and royalty. Vanity Fair, Amadeus, and Tonik — cloths woven with heritage.',
  },
  {
    mill: 'Holland & Sherry',
    origin: 'Peebles, Scotland',
    detail: 'Crispest English worsteds and the world\'s finest flannel. Quiet authority in every thread.',
  },
  {
    mill: 'Vitale Barberis Canonico',
    origin: 'Biella, Italy',
    detail: 'Six centuries of weaving mastery. Super 150s that drape like water and wear like armour.',
  },
]

export function Materials() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const lineScale = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  return (
    <section id="materials" ref={ref} className="relative overflow-hidden bg-ink py-28 md:py-44">
      {/* Background watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <span className="font-serif text-[30vw] font-light leading-none text-ivory/[0.015]">
          VB
        </span>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
        {/* Header */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <span className="flex items-center gap-3 text-[10px] uppercase tracking-luxe text-gold">
              <span className="inline-block h-px w-6 bg-gold/40" />
              Materials & Provenance
            </span>
            <RevealHeading
              text="We begin where the world's finest looms end."
              className="mt-8 font-serif text-4xl font-light leading-[1.05] text-ivory sm:text-5xl md:text-[3.5rem]"
            />
          </div>
          <div className="flex items-end">
            <FadeIn delay={0.15}>
              <p className="max-w-md text-[14px] leading-[1.9] text-ivory/45">
                Every bolt of cloth is selected in person. We travel to the mills of Italy,
                Scotland, and England — touching, draping, and choosing only what meets our
                uncompromising standard. A suit is only as extraordinary as the fabric it
                honours.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Fabric mills grid */}
        <div className="mt-20 grid grid-cols-1 gap-px border border-ivory/8 sm:grid-cols-2 lg:grid-cols-4">
          {FABRICS.map((f, i) => (
            <FadeIn key={f.mill} delay={i * 0.08}>
              <div className="group flex h-full flex-col justify-between gap-10 p-8 transition-colors duration-700 hover:bg-ivory/[0.03] md:p-10">
                <div>
                  <span className="text-[9px] uppercase tracking-luxe text-gold/60">
                    {f.origin}
                  </span>
                  <h3 className="mt-4 font-serif text-2xl font-light text-ivory transition-colors duration-500 group-hover:text-gold sm:text-3xl">
                    {f.mill}
                  </h3>
                </div>
                <div>
                  <p className="text-[13px] leading-[1.8] text-ivory/40">
                    {f.detail}
                  </p>
                  <div className="mt-6 h-px w-0 bg-gold/40 transition-all duration-700 group-hover:w-full" />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Large editorial image with fabric detail */}
        <div className="mt-24 grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ParallaxImage
              src="/images/hd-2.jpg"
              alt="Teal silk-linen blazer — close-up fabric detail"
              className="aspect-[16/10]"
              parallax={30}
            />
          </div>
          <div className="flex flex-col justify-center lg:col-span-2 lg:pl-8">
            <FadeIn>
              <span className="text-[9px] uppercase tracking-luxe text-gold/60">
                The Touch Test
              </span>
              <h3 className="mt-4 font-serif text-3xl font-light leading-snug text-ivory sm:text-4xl">
                A fabric must earn its place.
              </h3>
              <p className="mt-6 text-[14px] leading-[1.9] text-ivory/40">
                Every cloth undergoes our three-point assessment: how it falls under gravity,
                how it responds to the body&apos;s warmth, and how it catches light. Only then
                does it qualify for a Vanshika Babbar commission.
              </p>
              {/* Fabric specs */}
              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-ivory/8 pt-8">
                {[
                  { n: '50+', l: 'Cloth houses' },
                  { n: 'Super 150s', l: 'Minimum grade' },
                  { n: '3', l: 'Continents sourced' },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="font-serif text-xl font-light text-ivory sm:text-2xl">
                      {s.n}
                    </div>
                    <div className="mt-2 text-[8px] uppercase tracking-luxe text-ivory/30">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Animated centre line */}
      <motion.div
        className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 origin-top bg-gradient-to-b from-gold/10 via-gold/5 to-transparent"
        style={{ scaleY: lineScale }}
      />
    </section>
  )
}
