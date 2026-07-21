'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react'
import { RevealHeading } from './anim'

const PIECES = [
  {
    src: '/images/hd-1.jpg',
    name: 'The Linen',
    meta: 'Pure white Irish linen · Unlined construction',
    number: 'I',
  },
  {
    src: '/images/hd-2.jpg',
    name: 'The Riviera',
    meta: 'Teal silk-linen blend · Peak lapel',
    number: 'II',
  },
  {
    src: '/images/hd-3.jpg',
    name: 'The Boulevard',
    meta: 'Rosé silk · Neapolitan shoulder',
    number: 'III',
  },
  {
    src: '/images/hd-4.jpg',
    name: 'The Sovereign',
    meta: 'Double-breasted · Dormeuil wool',
    number: 'IV',
  },
  {
    src: '/images/hd-5.jpg',
    name: 'The Atelier',
    meta: 'Navy denim-weave · Patch pockets',
    number: 'V',
  },
  {
    src: '/images/hd-6.jpg',
    name: 'The Crescent',
    meta: 'Cream pleated trousers · Italian cotton',
    number: 'VI',
  },
]

export function SignatureGallery() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-65%'])

  return (
    <section id="signature" ref={ref} className="relative h-[420vh] bg-ink">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        {/* Header */}
        <div className="mx-auto flex w-full max-w-[1600px] items-end justify-between px-6 pb-8 pt-28 sm:px-10">
          <div>
            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-3 text-[10px] uppercase tracking-luxe text-gold">
                <span className="inline-block h-px w-6 bg-gold/40" />
                02 / The Archive
              </span>
              <span className="pl-9 text-[6.5px] uppercase tracking-wide-luxe text-ivory/30">
                Curated commissions & signature cuts
              </span>
            </div>
            <RevealHeading
              text="An archive of the singular."
              className="mt-6 font-serif text-4xl font-light leading-none text-ivory sm:text-5xl md:text-[3.5rem]"
            />
          </div>
          <div className="hidden flex-col items-end gap-2 md:flex">
            <span className="text-[9px] uppercase tracking-luxe text-ivory/30">
              Scroll to explore
            </span>
            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="text-gold/50"
            >
              →
            </motion.span>
          </div>
        </div>

        {/* Horizontal gallery */}
        <div className="flex flex-1 items-center">
          <motion.div style={{ x }} className="flex gap-8 pl-6 sm:gap-12 sm:pl-10">
            {PIECES.map((p, i) => (
              <GalleryCard key={p.name} piece={p} index={i} total={PIECES.length} />
            ))}

            {/* End card */}
            <div className="flex h-[56vh] w-[70vw] shrink-0 flex-col justify-center pr-10 sm:h-[65vh] sm:w-[30vw]">
              <span className="text-gold text-lg">✦</span>
              <p className="mt-6 font-serif text-3xl font-light leading-tight text-ivory/90 sm:text-4xl">
                Every piece, a chapter.<br />
                Every stitch, a sentence.
              </p>
              <p className="mt-5 max-w-xs text-[13px] leading-[1.8] text-ivory/40">
                Each commission is documented, numbered, and never repeated. What we craft for you
                belongs to you alone — a sartorial fingerprint.
              </p>
              <div className="mt-8 h-px w-20 bg-gold/30" />
            </div>
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className="mx-auto w-full max-w-[1600px] px-6 pb-8 sm:px-10">
          <div className="flex items-center gap-4">
            <span className="text-[8px] uppercase tracking-luxe text-ivory/20">01</span>
            <div className="h-px flex-1 bg-ivory/10 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold/70 to-gold/30"
                style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
              />
            </div>
            <span className="text-[8px] uppercase tracking-luxe text-ivory/20">06</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Individual gallery card with 3D perspective tilt on hover */
function GalleryCard({
  piece,
  index,
  total,
}: {
  piece: typeof PIECES[number]
  index: number
  total: number
}) {
  const cardRef = useRef<HTMLElement>(null)
  const [hovered, setHovered] = useState(false)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    rotateY.set(x * 8) // subtle 3D tilt
    rotateX.set(-y * 6)
    mx.set(x * 20)
    my.set(y * 20)
  }

  const handleMouseLeave = () => {
    setHovered(false)
    rotateX.set(0)
    rotateY.set(0)
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.article
      ref={cardRef}
      data-cursor="View"
      className="group relative h-[56vh] w-[80vw] shrink-0 overflow-hidden sm:h-[65vh] sm:w-[38vw] lg:w-[28vw]"
      style={{
        perspective: 1200,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image with depth shift */}
      <motion.img
        src={piece.src}
        alt={`${piece.name} — bespoke by Vanshika Babbar`}
        className="h-full w-full object-cover"
        animate={{
          scale: hovered ? 1.06 : 1,
          x: hovered ? mx.get() * -0.5 : 0,
          y: hovered ? my.get() * -0.5 : 0,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-95" />

      {/* Light sweep on hover */}
      <div className="absolute inset-0 opacity-0 mix-blend-sweep transition-opacity duration-700 group-hover:opacity-100">
        <div
          className="absolute inset-0 shimmer-sweep"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%)',
          }}
        />
      </div>

      {/* Bottom info — slides up on hover */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-7 translate-y-3 transition-transform duration-700 ease-out group-hover:translate-y-0">
        <div>
          <div className="font-serif text-2xl font-light text-ivory sm:text-3xl">
            {piece.name}
          </div>
          <div className="mt-2 text-[9px] uppercase tracking-luxe text-ivory/45">
            {piece.meta}
          </div>
        </div>
        <span className="font-serif text-xl italic text-gold/60">{piece.number}</span>
      </div>

      {/* Top counter — fades in on hover */}
      <div className="absolute left-7 top-7 flex items-center gap-3 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
        <span className="text-[9px] uppercase tracking-luxe text-ivory/35">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>

      {/* Inset border on hover */}
      <div className="pointer-events-none absolute inset-3 border border-gold/0 transition-all duration-700 group-hover:border-gold/15" />
    </motion.article>
  )
}
