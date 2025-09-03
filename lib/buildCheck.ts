// This file ensures Prisma client is properly generated during build
// and prevents build-time database connection attempts

export function checkPrismaBuild() {
  // This function is called during build to ensure Prisma is available
  // without actually connecting to the database
  if (typeof window === 'undefined') {
    // Server-side only
    try {
      require('@prisma/client')
    } catch (error) {
      console.warn('Prisma client not available during build, this is normal')
    }
  }
}
