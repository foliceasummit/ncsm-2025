import "next-auth"
import "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      roles: string[]
      name?: string | null
      image?: string | null
    }
  }

  interface User {
    id: string
    email: string
    roles: string[]
    firstName?: string
    lastName?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    roles: string[]
  }
}
