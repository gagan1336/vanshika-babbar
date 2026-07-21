'use client'

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from 'react'
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

/* ---------- SplitType line-by-line masked reveal (GSAP driven) ---------- */
export function SplitReveal({
  children,
  className,
  as: Tag = 'h2',
  stagger = 0.09,
  duration = 1.1,
  y = '110%',
  start = 'top 85%',
}: {
  children: string
  className?: string
  as?: ElementType
  stagger?: number
  duration?: number
  y?: string
  start?: string
}) {
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const split = new SplitType(el, { types: 'lines,words', lineClass: 'line' })
      gsap.set(split.words, { yPercent: 110 })
      gsap.to(split.words, {
        yPercent: 0,
        duration,
        stagger,
        ease: 'power4.out',
        scrollTrigger: { trigger: el, start, once: true },
      })
      // Recalculate on resize
      const onResize = () => {
        split.split({ types: 'lines,words' })
      }
      window.addEventListener('resize', onResize)
      return () => window.removeEventListener('resize', onResize)
    }, el)

    return () => ctx.revert()
  }, [children, stagger, duration, start])

  return (
    <Tag ref={ref as never} className={`split-lines ${className ?? ''}`}>
      {children}
    </Tag>
  )
}

/* ---------- Word-by-word reveal for headings (Framer, for eager/hero use) ---------- */
export function RevealHeading({
  text,
  className,
  delay = 0,
  as = 'h2',
}: {
  text: string
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'h3'
}) {
  const words = text.split(' ')
  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: delay } },
  }
  const child: Variants = {
    hidden: { y: '120%', filter: 'blur(10px)', rotateZ: 5 },
    visible: { y: '0%', filter: 'blur(0px)', rotateZ: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } },
  }
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10% 0px' }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span variants={child} className="inline-block pr-[0.25em] origin-bottom-left">
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  )
}

/* ---------- Fade / rise on view ---------- */
export function FadeIn({
  children,
  className,
  delay = 0,
  y = 24,
  blur = true,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  blur?: boolean
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: blur ? 'blur(10px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

/* ---------- Masked image reveal with scroll parallax ---------- */
export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  parallax = 60,
}: {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  parallax?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [-parallax, parallax])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ''}`}>
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        viewport={{ once: true, margin: '-5% 0px' }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.img
          src={src || '/placeholder.svg'}
          alt={alt}
          style={{ y }}
          className={`h-[115%] w-full object-cover ${imgClassName ?? ''}`}
        />
      </motion.div>
    </div>
  )
}

/* ---------- Mouse-parallax wrapper (independent depth) ---------- */
export function MouseParallax({
  children,
  strength = 20,
  className,
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.5 })
  const y = useSpring(my, { stiffness: 120, damping: 20, mass: 0.5 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = (e.clientX - cx) / (window.innerWidth / 2)
      const dy = (e.clientY - cy) / (window.innerHeight / 2)
      mx.set(dx * strength)
      my.set(dy * strength)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my, strength])

  return (
    <motion.div ref={ref} style={{ x, y }} className={className}>
      {children}
    </motion.div>
  )
}

/* ---------- Magnetic button (tactile hover with light sweep) ---------- */
export function MagneticButton({
  children,
  onClick,
  className,
  cursor,
  type = 'button',
}: {
  children: ReactNode
  onClick?: () => void
  className?: string
  cursor?: string
  type?: 'button' | 'submit'
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 200, damping: 15 })
  const y = useSpring(my, { stiffness: 200, damping: 15 })

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.4)
    my.set((e.clientY - (r.top + r.height / 2)) * 0.4)
  }
  const reset = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x, y }}
      data-cursor={cursor}
      className={`group relative overflow-hidden ${className ?? ''}`}
    >
      <span className="relative z-10 flex items-center justify-center gap-4">{children}</span>
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-ivory/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
    </motion.button>
  )
}

export function useSectionProgress(): [
  React.RefObject<HTMLDivElement | null>,
  MotionValue<number>,
] {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  return [ref, scrollYProgress]
}

export function useMounted() {
  const [m, setM] = useState(false)
  useEffect(() => setM(true), [])
  return m
}
