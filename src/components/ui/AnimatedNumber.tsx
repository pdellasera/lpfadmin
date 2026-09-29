import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import { formatNumber } from '@/lib/format'

interface AnimatedNumberProps {
  value: number
  format?: (value: number) => string
}

export function AnimatedNumber({ value, format = formatNumber }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduceMotion = useReducedMotion() ?? false
  const [display, setDisplay] = useState(() => format(reduceMotion ? value : 0))

  useEffect(() => {
    if (!inView || reduceMotion) return
    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(format(Math.round(latest))),
      onComplete: () => setDisplay(format(value)),
    })
    return () => controls.stop()
  }, [inView, value, reduceMotion, format])

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  )
}
