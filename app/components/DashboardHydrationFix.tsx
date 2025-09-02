'use client'

import { useEffect, useState } from 'react'

interface DashboardHydrationFixProps {
  children: React.ReactNode
}

export default function DashboardHydrationFix({ children }: DashboardHydrationFixProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Comprehensive cleanup for dashboard pages
    const cleanupDashboard = () => {
      // Remove browser extension attributes
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
        })
      })

      // Clean up any hidden elements with problematic attributes
      const hiddenElements = document.querySelectorAll('[hidden]')
      hiddenElements.forEach(element => {
        if (element.hasAttribute('bis_skin_checked')) {
          element.removeAttribute('bis_skin_checked')
        }
      })
    }

    // Clean up immediately
    cleanupDashboard()

    // Clean up after short delays to catch late injections
    const timeouts = [100, 500, 1000, 2000]
    timeouts.forEach(delay => {
      setTimeout(cleanupDashboard, delay)
    })

    // Set up periodic cleanup
    const interval = setInterval(cleanupDashboard, 2000)

    // Clean up on unmount
    return () => {
      clearInterval(interval)
      timeouts.forEach(delay => {
        clearTimeout(delay)
      })
    }
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Loading Dashboard</h2>
          <p className="text-blue-200">Preparing your dashboard...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
