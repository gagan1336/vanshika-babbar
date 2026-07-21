'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

/**
 * A second cinematic break — the VB Signage in its full glory.
 * Shows the atelier exterior and brand presence before testimonials.
 */
export function AtelierInterlude() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05])
  const textY = useTransform(scrollYProgress, [0, 1], ['30%', '-30%'])

  return (
    <section ref={ref} className="relative h-[60vh] w-full overflow-hidden sm:h-[75vh]">
      {/* Background */}
      <motion.div className="absolute inset-0" style={{ y: imgY, scale }}>
        <img
          src="/images/hd-1.jpg"
          alt="Vanshika Babbar atelier — white linen blazer below signage"
          className="h-full w-full object-cover object-top"
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-ink/55" />

      {/* Scroll-driven text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div style={{ y: textY }} className="text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-5"
          >
            {/* Monogram */}
            <div className="flex h-16 w-16 items-center justify-center border border-gold/30">
              <span className="font-serif text-xl text-gold">VB</span>
            </div>

            <p className="max-w-lg font-serif text-xl font-light italic leading-[1.6] text-ivory/80 sm:text-2xl">
              From our atelier in Dubai, to the gentlemen who demand nothing less than extraordinary.
            </p>

            <span className="text-[8px] uppercase tracking-luxe text-gold/50">
              DIFC · Dubai · United Arab Emirates
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Edge lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
    </section>
  )
}
