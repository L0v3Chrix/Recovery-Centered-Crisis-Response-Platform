'use client'

import React, { useEffect, useRef, useState } from 'react'
import './ScrollStack.css'

interface ScrollStackProps {
  children: React.ReactNode
  className?: string
}

interface ScrollStackItemProps {
  children: React.ReactNode
  className?: string
}

export function ScrollStack({ children, className = '' }: ScrollStackProps) {
  const stackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const stack = stackRef.current
    if (!stack) return

    const items = stack.querySelectorAll('.scroll-stack-item')
    if (items.length === 0) return

    const handleScroll = () => {
      const stackRect = stack.getBoundingClientRect()
      const stackCenter = stackRect.top + stackRect.height / 2

      let newActiveIndex = 0
      let minDistance = Infinity

      items.forEach((item, index) => {
        const itemRect = item.getBoundingClientRect()
        const itemCenter = itemRect.top + itemRect.height / 2
        const distance = Math.abs(itemCenter - stackCenter)

        if (distance < minDistance) {
          minDistance = distance
          newActiveIndex = index
        }
      })

      if (newActiveIndex !== activeIndex) {
        setActiveIndex(newActiveIndex)
      }
    }

    // Throttled scroll handler for performance
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', throttledScroll)
    }
  }, [activeIndex])

  return (
    <div 
      ref={stackRef} 
      className={`scroll-stack ${className}`}
      data-active-index={activeIndex}
    >
      {children}
    </div>
  )
}

export function ScrollStackItem({ children, className = '' }: ScrollStackItemProps) {
  return (
    <div className={`scroll-stack-item ${className}`}>
      {children}
    </div>
  )
}

export default ScrollStack