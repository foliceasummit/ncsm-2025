'use client'

import { useEffect, useState } from 'react'

interface ClientOnlyProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    // Clean up browser extension attributes immediately
    const cleanExtensions = () => {
      const problematicAttrs = [
        'bis_skin_checked',
        'data-adblockkey',
        'data-adblock',
        'data-adblock-detected',
        'data-adblock-removed'
      ]

      problematicAttrs.forEach(attr => {
        const elements = document.querySelectorAll(`[${attr}]`)
        elements.forEach(element => {
          element.removeAttribute(attr)
          // Also hide the element completely
          if (element instanceof HTMLElement) {
            element.style.display = 'none'
            element.style.visibility = 'hidden'
            element.style.opacity = '0'
          }
        })
      })

      // Remove problematic classes
      const problematicClasses = [
        'adblock-detected',
        'adblock-removed',
        'bis-skin-checked'
      ]

      problematicClasses.forEach(className => {
        const elements = document.querySelectorAll(`.${className}`)
        elements.forEach(element => {
          element.classList.remove(className)
          if (element instanceof HTMLElement) {
            element.style.display = 'none'
          }
        })
      })
    }

    // Clean immediately
    cleanExtensions()

    // Clean on DOM ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', cleanExtensions)
    }

    // Clean periodically
    const interval = setInterval(cleanExtensions, 100)

    // Clean on any DOM changes
    const observer = new MutationObserver(cleanExtensions)
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['bis_skin_checked', 'data-adblockkey', 'data-adblock']
    })

    setHasMounted(true)

    return () => {
      clearInterval(interval)
      observer.disconnect()
    }
  }, [])

  if (!hasMounted) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
