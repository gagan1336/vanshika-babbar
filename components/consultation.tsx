'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { FadeIn, RevealHeading, ParallaxImage } from './anim'

const OCCASIONS = ['Business', 'Wedding', 'Evening', 'Wardrobe', 'Other']

export function Consultation() {
  const [occasion, setOccasion] = useState<string>('Business')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="consultation" className="relative bg-ivory">
      {/* Top decorative */}
      <div className="mx-auto max-w-[1600px] px-6 pt-28 sm:px-10 md:pt-44">
        <div className="gold-divider mb-20" />
      </div>

      <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2 lg:gap-0">
          {/* Left — Info + Image */}
          <div className="flex flex-col justify-between lg:pr-16">
            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-3 text-[10px] uppercase tracking-luxe text-gold">
                <span className="inline-block h-px w-6 bg-gold/50" />
                05 / Consultation
              </span>
              <span className="pl-9 text-[6.5px] uppercase tracking-wide-luxe text-muted-foreground">
                By Appointment Only
              </span>
            </div>
            <RevealHeading
              text="Begin your bespoke journey."
              className="mt-8 font-serif text-5xl font-light leading-[1] text-ink sm:text-6xl md:text-[4rem]"
            />
            <FadeIn delay={0.1}>
              <p className="mt-12 max-w-md text-[14px] leading-[1.9] text-muted-foreground">
                We welcome a select number of new clients each season. Share a few details and
                our atelier will personally arrange your private consultation — in our Dubai
                salon or by appointment wherever you are in the world.
              </p>
            </FadeIn>

            {/* Consultation image */}
            <FadeIn delay={0.2}>
              <div className="mt-14 overflow-hidden">
                <ParallaxImage
                  src="/images/hd-6.jpg"
                  alt="Cream Italian cotton trousers — detail of bespoke finishing"
                  className="aspect-[16/10]"
                  parallax={20}
                />
              </div>
            </FadeIn>

            <FadeIn delay={0.25}>
              <div className="mt-14 space-y-8 border-t border-ink/8 pt-12">
                <Detail label="The Atelier" value="DIFC, Dubai, UAE" />
                <Detail label="By Appointment" value="atelier@vanshikababbar.com" />
                <Detail label="Direct Line" value="+971 4 XXX XXXX" />
                <Detail label="Hours" value="By private appointment only" />
              </div>
            </FadeIn>
          </div>

          {/* Right — Form with elevated card */}
          <div className="lg:border-l lg:border-ink/8 lg:pl-16">
            <FadeIn delay={0.15}>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex h-full min-h-[500px] flex-col items-center justify-center border border-ink/10 bg-card p-12 text-center"
                >
                  {/* Success monogram */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="relative"
                  >
                    <div className="flex h-20 w-20 items-center justify-center border border-gold/40">
                      <span className="font-serif text-3xl text-gold">VB</span>
                    </div>
                    <div className="absolute -left-1 -top-1 h-3 w-3 border-l border-t border-gold/50" />
                    <div className="absolute -right-1 -top-1 h-3 w-3 border-r border-t border-gold/50" />
                    <div className="absolute -bottom-1 -left-1 h-3 w-3 border-b border-l border-gold/50" />
                    <div className="absolute -bottom-1 -right-1 h-3 w-3 border-b border-r border-gold/50" />
                  </motion.div>

                  <h3 className="mt-10 font-serif text-3xl font-light text-ink">
                    Your request is received.
                  </h3>
                  <p className="mt-5 max-w-sm text-[13px] leading-[1.8] text-muted-foreground">
                    It is our privilege. A member of the atelier will contact you personally
                    to arrange your private consultation.
                  </p>
                  <div className="mt-8 h-px w-16 bg-gold/30" />
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="border border-ink/10 bg-card p-8 sm:p-12"
                >
                  {/* Form header */}
                  <div className="mb-10 flex items-center gap-4">
                    <div className="flex h-8 w-8 items-center justify-center border border-gold/30">
                      <span className="font-serif text-xs text-gold">VB</span>
                    </div>
                    <span className="text-[9px] uppercase tracking-luxe text-muted-foreground">
                      Private Consultation Request
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                    <Field label="Full Name" name="name" placeholder="Your name" />
                    <Field label="Email" name="email" type="email" placeholder="you@email.com" />
                  </div>

                  <div className="mt-7 grid grid-cols-1 gap-7 sm:grid-cols-2">
                    <Field label="Phone" name="phone" type="tel" placeholder="+971 ..." />
                    <Field label="City" name="city" placeholder="Dubai, London, etc." />
                  </div>

                  <div className="mt-10">
                    <label className="text-[9px] uppercase tracking-luxe text-muted-foreground">
                      Nature of Commission
                    </label>
                    <div className="mt-5 flex flex-wrap gap-3">
                      {OCCASIONS.map((o) => (
                        <button
                          type="button"
                          key={o}
                          onClick={() => setOccasion(o)}
                          className={`border px-6 py-3 text-[10px] uppercase tracking-luxe transition-all duration-500 ${
                            occasion === o
                              ? 'border-ink bg-ink text-ivory'
                              : 'border-ink/15 text-ink hover:border-gold'
                          }`}
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-10">
                    <label className="text-[9px] uppercase tracking-luxe text-muted-foreground">
                      Tell us about yourself
                    </label>
                    <textarea
                      name="vision"
                      rows={4}
                      placeholder="The occasion, your preferences, fabric interests, anything that helps us understand your vision…"
                      className="mt-4 w-full resize-none border-b border-ink/15 bg-transparent py-3 font-serif text-lg text-ink placeholder:text-muted-foreground/40 focus:border-gold focus:outline-none transition-colors duration-500"
                    />
                  </div>

                  <button
                    type="submit"
                    data-cursor="Send"
                    className="group relative mt-12 inline-flex w-full items-center justify-center gap-5 overflow-hidden bg-ink px-8 py-5 text-[10px] uppercase tracking-luxe text-ivory"
                  >
                    <span className="relative z-10 transition-colors duration-700 group-hover:text-ink">
                      Request Your Private Consultation
                    </span>
                    <span className="relative z-10 transition-all duration-500 group-hover:translate-x-1 group-hover:text-ink">
                      →
                    </span>
                    <span className="absolute inset-0 origin-left scale-x-0 bg-gold transition-transform duration-700 ease-out group-hover:scale-x-100" />
                  </button>

                  <p className="mt-6 text-center text-[9px] uppercase tracking-luxe text-muted-foreground/50">
                    All enquiries are treated with the utmost discretion
                  </p>
                </form>
              )}
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="mx-auto max-w-[1600px] px-6 pb-28 pt-20 sm:px-10 md:pb-40" />
    </section>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[9px] uppercase tracking-luxe text-muted-foreground">
        {label}
      </div>
      <div className="mt-2 font-serif text-xl font-light text-ink">{value}</div>
    </div>
  )
}

function Field({
  label,
  name,
  type = 'text',
  placeholder,
}: {
  label: string
  name: string
  type?: string
  placeholder?: string
}) {
  return (
    <div>
      <label className="text-[9px] uppercase tracking-luxe text-muted-foreground">
        {label}
      </label>
      <input
        required
        type={type}
        name={name}
        placeholder={placeholder}
        className="mt-4 w-full border-b border-ink/15 bg-transparent py-3 font-serif text-lg text-ink placeholder:text-muted-foreground/40 focus:border-gold focus:outline-none transition-colors duration-500"
      />
    </div>
  )
}
