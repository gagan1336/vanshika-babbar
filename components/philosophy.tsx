'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { FadeIn, ParallaxImage, RevealHeading } from './anim'

/** Animated counter that counts up when in view */
function AnimatedStat({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [displayed, setDisplayed] = useState('0')

  // Extract numeric part
  const numericMatch = value.match(/(\d+)/)
  const suffix = value.replace(/\d+/, '')
  const target = numericMatch ? parseInt(numericMatch[1]) : 0

  useEffect(() => {
    if (!inView) return
    const timer = setTimeout(() => {
      let start = 0
      const duration = 1800
      const startTime = Date.now()
      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        start = Math.floor(eased * target)
        setDisplayed(String(start))
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    }, delay * 1000)
    return () => clearTimeout(timer)
  }, [inView, target, delay])

  return (
    <FadeIn delay={delay}>
      <div ref={ref}>
        <div className="font-serif text-4xl font-light text-ink md:text-5xl">
          {inView ? displayed : '0'}{suffix}
        </div>
        <div className="mt-3 text-[9px] uppercase tracking-luxe text-muted-foreground">
          {label}
        </div>
      </div>
    </FadeIn>
  )
}

export function Philosophy() {
  return (
    <section id="philosophy" className="relative overflow-hidden bg-ivory">
      {/* Top editorial divider */}
      <div className="mx-auto max-w-[1600px] px-6 pt-32 sm:px-10 md:pt-48">
        <div className="gold-divider mb-20" />
      </div>

      <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-12 lg:gap-16">
          {/* Left column — Text */}
          <div className="lg:col-span-5">
            <FadeIn>
              <span className="flex items-center gap-3 text-[10px] uppercase tracking-luxe text-gold">
                <span className="inline-block h-px w-6 bg-gold/50" />
                The Philosophy
              </span>
            </FadeIn>

            <RevealHeading
              text="Not fashion. A quiet act of devotion to the individual."
              className="mt-10 font-serif text-[2.5rem] font-light leading-[1.08] text-ink sm:text-5xl md:text-[3.5rem]"
            />

            <FadeIn delay={0.1}>
              <p className="mt-12 max-w-md text-[14px] leading-[1.9] text-muted-foreground">
                Vanshika Babbar does not tailor for trends. She tailors for the man who
                understands that a suit is not worn — it is inhabited. Every commission begins
                with an intimate conversation about who you are, how you move, and the statement
                you make when you enter a room.
              </p>
              <p className="mt-6 max-w-md text-[14px] leading-[1.9] text-muted-foreground">
                Based in Dubai, working with the world&apos;s finest fabrics from Italy,
                England, and Japan — each garment is cut, sewn, and finished entirely by hand.
                No assembly line. No compromise. No repetition.
              </p>
            </FadeIn>

            {/* Animated stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 border-t border-ink/8 pt-12">
              <AnimatedStat value="200+" label="Hours per suit" delay={0.15} />
              <AnimatedStat value="40" label="Clients a year" delay={0.25} />
              <AnimatedStat value="15+" label="Years of mastery" delay={0.35} />
            </div>
          </div>

          {/* Right column — Images */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-5">
              <div className="sm:col-span-3 sm:mt-20">
                <ParallaxImage
                  src="/images/vanshika.png"
                  alt="Vanshika Babbar — bespoke tailor portrait"
                  className="aspect-[3/4]"
                />
                {/* Caption under portrait */}
                <FadeIn delay={0.3}>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="h-px w-4 bg-gold/40" />
                    <span className="text-[9px] uppercase tracking-luxe text-muted-foreground">
                      The founder at her Dubai atelier
                    </span>
                  </div>
                </FadeIn>
              </div>
              <div className="flex flex-col gap-8 sm:col-span-2">
                <ParallaxImage
                  src="/images/hd-4.jpg"
                  alt="Double-breasted brown suit with VB tag"
                  className="aspect-[3/4]"
                  parallax={40}
                />
                <FadeIn delay={0.2}>
                  <div className="relative pl-5 border-l-2 border-gold/30">
                    <blockquote className="font-serif text-[1.4rem] font-light italic leading-snug text-ink">
                      &ldquo;A suit should never announce itself. It should simply make every room
                      feel like it was built around you.&rdquo;
                    </blockquote>
                    <cite className="mt-5 block text-[9px] uppercase not-italic tracking-luxe text-muted-foreground">
                      — Vanshika Babbar
                    </cite>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="mx-auto max-w-[1600px] px-6 pb-32 pt-20 sm:px-10 md:pb-44">
        <div className="gold-divider" />
      </div>
    </section>
  )
}
