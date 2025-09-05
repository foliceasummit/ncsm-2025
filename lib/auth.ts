import { getServerSession } from 'next-auth'
import { authOptions } from './auth.config'

export async function auth() {
  const session = await getServerSession(authOptions)
  return session
}

export async function getCurrentUser() {
  try {
    const session = await auth()
    return session?.user
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}
