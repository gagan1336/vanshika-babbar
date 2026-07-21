'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { scrollToId } from './smooth-scroll'

export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '55%'])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.35, 0.55, 0.88])
  const badgeOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  return (
    <section id="top" ref={ref} className="relative h-[100svh] w-full overflow-hidden bg-ink">
      {/* Primary background — HD video provided by user */}
      <motion.div className="absolute inset-0" style={{ scale: imageScale, y: imageY }}>
        <motion.video
          src="/videos/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover object-center"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={ready ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>

      {/* Multi-layer cinematic overlay */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: overlayOpacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/50 via-transparent to-ink/30" />
      </motion.div>

      {/* Ambient warm light bloom on left side */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 2.2, duration: 2.5 }}
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 50% 70% at 15% 50%, rgba(180,155,110,0.12), transparent)',
        }}
      />

      {/* Secondary image — small editorial inset (signage/atelier) */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={ready ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 1.6, delay: 2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-6 top-28 z-20 hidden overflow-hidden border border-ivory/10 shadow-2xl lg:block"
        style={{ width: '220px' }}
      >
        <img
          src="/images/vb-signage.png"
          alt="Vanshika Babbar Bespoke Tailor in Dubai — atelier signage"
          className="h-auto w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 pb-14 sm:px-10 sm:pb-20 md:pb-28"
      >
        {/* Tagline */}
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={ready ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 flex items-center gap-5 text-[10px] uppercase tracking-luxe letter-spacing-hover text-gold"
        >
          <span className="inline-block h-px w-10 bg-gold/50" />
          Bespoke Tailoring · Dubai
          <span className="inline-block h-px w-10 bg-gold/50" />
        </motion.span>

        {/* Main headline — editorial typography */}
        <h1 className="font-serif font-light leading-[0.88] text-ivory">
          <span className="block overflow-hidden">
            <motion.span
              className="block text-[15vw] sm:text-[11vw] lg:text-[8.5vw]"
              initial={{ y: '120%' }}
              animate={ready ? { y: '0%' } : {}}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
            >
              Where Fabric
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block text-[15vw] italic shimmer-text sm:text-[11vw] lg:text-[8.5vw]"
              initial={{ y: '120%' }}
              animate={ready ? { y: '0%' } : {}}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 1.15 }}
            >
              Meets Fate.
            </motion.span>
          </span>
        </h1>

        {/* Bottom bar — description + CTA */}
        <div className="mt-10 flex flex-col items-start gap-8 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ duration: 1.4, delay: 1.6 }}
            className="max-w-lg"
          >
            <p className="text-[13px] leading-[1.85] text-ivory/55 sm:text-[14px]">
              Not a fashion label. A private atelier where every stitch is a conversation,
              every lapel a signature, every suit — a declaration of who you are.
            </p>
            {/* Trust badges */}
            <div className="mt-6 flex items-center gap-6 text-[8px] uppercase tracking-luxe text-ivory/25">
              <span>Hand-sewn</span>
              <span className="h-3 w-px bg-ivory/15" />
              <span>200+ hours</span>
              <span className="h-3 w-px bg-ivory/15" />
              <span>By appointment</span>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.9 }}
            onClick={() => scrollToId('consultation')}
            data-cursor="Book"
            className="group relative inline-flex items-center gap-5 overflow-hidden border border-ivory/20 px-10 py-5 text-[10px] uppercase tracking-luxe text-ivory transition-all duration-700 hover:border-gold"
          >
            <span className="relative z-10 transition-colors duration-700 group-hover:text-ink">
              Book Your Appointment
            </span>
            <motion.span className="relative z-10 text-base transition-all duration-700 group-hover:translate-x-1 group-hover:text-ink">
              →
            </motion.span>
            {/* Gold fill on hover */}
            <span className="absolute inset-0 origin-left scale-x-0 bg-gold transition-transform duration-700 ease-out group-hover:scale-x-100" />
          </motion.button>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        style={{ opacity: badgeOpacity }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[8px] uppercase tracking-luxe text-ivory/35">Discover</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="h-14 w-px bg-gradient-to-b from-gold/50 to-transparent"
        />
      </motion.div>

      {/* Vertical side badge — left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 2.8, duration: 1.2 }}
        className="absolute left-6 top-1/2 z-10 hidden -translate-y-1/2 xl:block"
      >
        <div className="flex -rotate-90 items-center gap-4 text-[7px] uppercase tracking-luxe text-ivory/20">
          <span className="inline-block h-px w-14 bg-ivory/10" />
          Est. MMIX · Dubai
        </div>
      </motion.div>
    </section>
  )
}
