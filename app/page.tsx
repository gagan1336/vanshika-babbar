'use client'

import { useCallback, useState } from 'react'
import { SmoothScroll } from '@/components/smooth-scroll'
import { CustomCursor } from '@/components/custom-cursor'
import { Atmosphere } from '@/components/atmosphere'
import { LoadingScreen } from '@/components/loading-screen'
import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { Philosophy } from '@/components/philosophy'
import { CinematicInterlude } from '@/components/cinematic-interlude'
import { SignatureGallery } from '@/components/signature-gallery'
import { Materials } from '@/components/materials'
import { BespokeJourney } from '@/components/bespoke-journey'
import { AtelierInterlude } from '@/components/atelier-interlude'
import { Experiences } from '@/components/experiences'
import { Consultation } from '@/components/consultation'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  const [ready, setReady] = useState(false)
  const handleComplete = useCallback(() => setReady(true), [])

  return (
    <SmoothScroll>
      <LoadingScreen onComplete={handleComplete} />
      <CustomCursor />
      <Atmosphere />
      <SiteNav ready={ready} />
      <main className="relative bg-ivory">
        <Hero ready={ready} />
        <Philosophy />
        <CinematicInterlude />
        <SignatureGallery />
        <Materials />
        <BespokeJourney />
        <AtelierInterlude />
        <Experiences />
        <Consultation />
        <SiteFooter />
      </main>
    </SmoothScroll>
  )
}
