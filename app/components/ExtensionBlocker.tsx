'use client'

import { useEffect } from 'react'

export default function ExtensionBlocker() {
  useEffect(() => {
    // Block the specific problematic extension that's causing JSON parsing errors
    const blockProblematicExtension = () => {
      try {
        // Override the problematic JSON.parse that the extension is trying to use
        const originalJSONParse = JSON.parse
        
        JSON.parse = function(text, reviver) {
          try {
            // If it's an object being passed as a string, return it directly
            if (typeof text === 'object' && text !== null) {
              return text
            }
            
            // If it's a string that looks like "[object Object]", return an empty object
            if (typeof text === 'string' && text.includes('[object Object]')) {
              return {}
            }
            
            // Otherwise, use the original JSON.parse
            return originalJSONParse.call(this, text, reviver)
          } catch (error) {
            // If parsing fails, return an empty object instead of throwing
            console.warn('JSON parse failed, returning empty object:', error)
            return {}
          }
        }

        // Block the specific extension's storage change dispatcher
        if (window._storageChangeDispatcher) {
          window._storageChangeDispatcher = function() {
            // Do nothing - block the extension's functionality
            return
          }
        }

        // Block the extension's callback
        if (window._storageChangeDispatcherCallback) {
          window._storageChangeDispatcherCallback = function() {
            // Do nothing - block the extension's functionality
            return
          }
        }

        // Override any global error handlers that might be set by extensions
        const originalOnError = window.onerror
        window.onerror = function(message, source, lineno, colno, error) {
          // Block errors from the problematic extension
          if (source && source.includes('content.js') && message.includes('JSON')) {
            return true // Prevent the error from being logged
          }
          
          // Allow other errors to pass through
          if (originalOnError) {
            return originalOnError.call(this, message, source, lineno, colno, error)
          }
          return false
        }

        // Block unhandled promise rejections from extensions
        const originalOnUnhandledRejection = window.onunhandledrejection
        window.onunhandledrejection = function(event) {
          // Block rejections from the problematic extension
          if (event.reason && event.reason.message && event.reason.message.includes('JSON')) {
            event.preventDefault()
            return
          }
          
          // Allow other rejections to pass through
          if (originalOnUnhandledRejection) {
            return originalOnUnhandledRejection.call(this, event)
          }
        }

        console.log('Extension blocker activated - problematic browser extension blocked')
      } catch (error) {
        console.warn('Extension blocker setup failed:', error)
      }
    }

    // Run immediately
    blockProblematicExtension()

    // Also run after a short delay to catch any late-loading extensions
    const timeout = setTimeout(blockProblematicExtension, 100)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return null // This component doesn't render anything
}
