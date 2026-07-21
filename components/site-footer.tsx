'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { scrollToId } from './smooth-scroll'

export function SiteFooter() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  })
  const nameY = useTransform(scrollYProgress, [0, 1], ['30%', '0%'])

  return (
    <footer ref={ref} className="relative overflow-hidden bg-ink pb-10 pt-28 text-ivory">
      {/* Background VB watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-[0.02]">
        <span className="font-serif text-[50vw] font-light leading-none text-ivory">
          VB
        </span>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
        {/* Large brand name with parallax */}
        <div className="flex flex-col gap-14 border-b border-ivory/8 pb-20 lg:flex-row lg:items-end lg:justify-between">
          <button onClick={() => scrollToId('top')} className="text-left" data-cursor="Top">
            <motion.h2
              style={{ y: nameY }}
              className="font-serif text-[18vw] font-light leading-[0.82] text-ivory lg:text-[10vw]"
            >
              Vanshika
              <span className="block italic text-gold/80">Babbar</span>
            </motion.h2>
          </button>
          <div className="max-w-xs">
            <p className="text-[13px] leading-[1.8] text-ivory/40">
              A private bespoke tailoring atelier in Dubai. Crafted by hand, in limited numbers,
              for those who understand that true elegance is measured in devotion, not trends.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-px w-12 bg-gold/30" />
              <span className="text-[8px] uppercase tracking-luxe text-gold/40">Since 2009</span>
            </div>
          </div>
        </div>

        {/* Footer grid */}
        <div className="grid grid-cols-2 gap-12 py-16 md:grid-cols-4">
          <FooterCol
            title="Atelier"
            links={[
              { label: 'Philosophy', id: 'philosophy' },
              { label: 'Collection', id: 'signature' },
              { label: 'The Journey', id: 'journey' },
            ]}
          />
          <FooterCol
            title="Discover"
            links={[
              { label: 'Materials', id: 'materials' },
              { label: 'Testimonials', id: 'experiences' },
              { label: 'Book Appointment', id: 'consultation' },
            ]}
          />
          <div>
            <h3 className="text-[9px] uppercase tracking-luxe text-ivory/30">Contact</h3>
            <ul className="mt-6 space-y-4 text-[13px] text-ivory/55">
              <li>DIFC, Dubai, UAE</li>
              <li>atelier@vanshikababbar.com</li>
              <li>+971 4 XXX XXXX</li>
            </ul>
          </div>
          <div>
            <h3 className="text-[9px] uppercase tracking-luxe text-ivory/30">Follow</h3>
            <ul className="mt-6 space-y-4 text-[13px] text-ivory/55">
              {['Instagram', 'Pinterest', 'LinkedIn'].map((s) => (
                <li key={s}>
                  <span
                    className="inline-flex items-center gap-2 cursor-pointer transition-colors duration-500 hover:text-gold"
                    data-cursor="↗"
                  >
                    {s}
                    <span className="text-[9px] text-ivory/20 transition-colors duration-500">↗</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-ivory/8 pt-8 text-[9px] uppercase tracking-luxe text-ivory/25 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Vanshika Babbar Bespoke. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span>Handcrafted, never repeated.</span>
            <span className="h-3 w-px bg-ivory/10" />
            <span className="text-gold/30">✦</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({
  title,
  links,
}: {
  title: string
  links: { label: string; id: string }[]
}) {
  return (
    <div>
      <h3 className="text-[9px] uppercase tracking-luxe text-ivory/30">{title}</h3>
      <ul className="mt-6 space-y-4">
        {links.map((l) => (
          <li key={l.id}>
            <button
              onClick={() => scrollToId(l.id)}
              className="text-[13px] text-ivory/55 transition-colors duration-500 hover:text-gold"
            >
              {l.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
