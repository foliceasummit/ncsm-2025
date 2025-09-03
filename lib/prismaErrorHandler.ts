import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError } from '@prisma/client/runtime/library'

export function handlePrismaError(error: unknown): { message: string; status: number } {
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return { message: 'A record with this unique field already exists', status: 409 }
      case 'P2025':
        return { message: 'Record not found', status: 404 }
      case 'P2003':
        return { message: 'Foreign key constraint failed', status: 400 }
      default:
        return { message: 'Database operation failed', status: 500 }
    }
  }
  
  if (error instanceof PrismaClientUnknownRequestError) {
    return { message: 'Database connection error', status: 500 }
  }
  
  if (error instanceof Error) {
    return { message: error.message, status: 500 }
  }
  
  return { message: 'An unexpected error occurred', status: 500 }
}
