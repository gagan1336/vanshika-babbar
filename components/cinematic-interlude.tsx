'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

/**
 * A full-bleed cinematic image break with parallax typography.
 * Placed between Philosophy and Gallery to create visual breathing room
 * and emotional impact — like a chapter break in a luxury publication.
 */
export function CinematicInterlude() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const imgY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.05])
  const textX = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.7, 0.5, 0.5, 0.7])

  return (
    <section ref={ref} className="relative h-[70vh] w-full overflow-hidden sm:h-[80vh]">
      {/* Full-bleed background */}
      <motion.div className="absolute inset-0" style={{ y: imgY, scale: imgScale }}>
        <img
          src="/images/hd-3.jpg"
          alt="Rose silk blazer — editorial fashion photography"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-ink"
        style={{ opacity: overlayOpacity }}
      />

      {/* Floating editorial text — scrolls horizontally with parallax */}
      <div className="absolute inset-0 flex items-center overflow-hidden">
        <motion.div style={{ x: textX }} className="whitespace-nowrap">
          <h2 className="font-serif text-[18vw] font-light leading-none text-ivory/[0.07] sm:text-[14vw]">
            The Art of the Suit
          </h2>
        </motion.div>
      </div>

      {/* Center content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-gold/40" />
            <span className="text-[9px] uppercase tracking-luxe text-gold">A Manifesto</span>
            <span className="h-px w-10 bg-gold/40" />
          </div>

          <blockquote className="max-w-2xl font-serif text-2xl font-light italic leading-[1.5] text-ivory sm:text-3xl md:text-4xl">
            &ldquo;We do not make suits for men who follow trends.
            We make suits for men who <em className="not-italic text-gold">set standards</em>.&rdquo;
          </blockquote>

          <cite className="text-[9px] uppercase not-italic tracking-luxe text-ivory/40">
            — Vanshika Babbar, Founder & Master Tailor
          </cite>
        </motion.div>
      </div>

      {/* Top & bottom edge lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </section>
  )
}
