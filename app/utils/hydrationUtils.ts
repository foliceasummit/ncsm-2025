/**
 * Utility functions to handle hydration issues caused by browser extensions
 */

export const cleanBrowserExtensions = () => {
  if (typeof window === 'undefined') return

  // List of problematic attributes commonly injected by browser extensions
  const problematicAttributes = [
    'bis_skin_checked',
    'data-adblockkey',
    'data-adblock',
    'data-adblock-detected',
    'data-adblock-removed'
  ]

  // Remove problematic attributes from all elements
  problematicAttributes.forEach(attr => {
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
}

export const setupHydrationCleanup = () => {
  if (typeof window === 'undefined') return

  // Clean up immediately
  cleanBrowserExtensions()

  // Clean up after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cleanBrowserExtensions)
  } else {
    cleanBrowserExtensions()
  }

  // Clean up after a short delay to catch late injections
  setTimeout(cleanBrowserExtensions, 100)
  setTimeout(cleanBrowserExtensions, 500)
  setTimeout(cleanBrowserExtensions, 1000)

  // Clean up on window load
  window.addEventListener('load', cleanBrowserExtensions)

  // Clean up on route changes (for SPA navigation)
  if (typeof window !== 'undefined' && window.history) {
    const originalPushState = window.history.pushState
    const originalReplaceState = window.history.replaceState

    window.history.pushState = function(...args) {
      originalPushState.apply(this, args)
      setTimeout(cleanBrowserExtensions, 50)
    }

    window.history.replaceState = function(...args) {
      originalReplaceState.apply(this, args)
      setTimeout(cleanBrowserExtensions, 50)
    }
  }
}
