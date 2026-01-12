'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

interface NoHydrationWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

// Dynamically import components to prevent hydration issues
const DynamicNavigation = dynamic(() => import('./layout/Navigation'), {
  ssr: false,
  loading: () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="ml-4">
              <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-24 h-4 bg-gray-200 rounded animate-pulse mt-2"></div>
            </div>
          </div>
          <div className="w-20 h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </nav>
  )
})

const DynamicFooter = dynamic(() => import('./layout/Footer'), {
  ssr: false,
  loading: () => (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="w-32 h-8 bg-gray-700 rounded animate-pulse mx-auto mb-4"></div>
        <div className="w-48 h-4 bg-gray-700 rounded animate-pulse mx-auto"></div>
      </div>
    </footer>
  )
})

export default function NoHydrationWrapper({ children, fallback }: NoHydrationWrapperProps) {
  const [mounted, setMounted] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
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
          if (element instanceof HTMLElement) {
            element.style.display = 'none'
            element.style.visibility = 'hidden'
            element.style.opacity = '0'
            element.style.pointerEvents = 'none'
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

      // Clean up any hidden elements with problematic attributes
      const hiddenElements = document.querySelectorAll('[hidden]')
      hiddenElements.forEach(el => {
        if (el.hasAttribute('bis_skin_checked')) {
          el.removeAttribute('bis_skin_checked')
          if (el instanceof HTMLElement) {
            el.style.display = 'none'
          }
        }
      })
    }

    // Clean immediately
    cleanExtensions()

    // Clean on DOM ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', cleanExtensions)
    }

    // Clean very frequently
    const interval = setInterval(cleanExtensions, 25)

    // Clean on any DOM changes
    const observer = new MutationObserver(cleanExtensions)
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['bis_skin_checked', 'data-adblockkey', 'data-adblock']
    })

    setMounted(true)

    // Wait a bit more to ensure all cleanup is done
    setTimeout(() => {
      setIsHydrated(true)
    }, 100)

    return () => {
      clearInterval(interval)
      observer.disconnect()
    }
  }, [])

  if (!mounted) {
    return <>{fallback}</>
  }

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Preparing NCSM 2025</h2>
          <p className="text-blue-200">Cleaning up browser extensions...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <DynamicNavigation />
      <main>
        {children}
      </main>
    </>
  )
}
