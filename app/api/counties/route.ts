import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const counties = await prisma.county.findMany({
      orderBy: {
        name: 'asc',
      },
    })

    return NextResponse.json(counties)
  } catch (error) {
    console.error('Error fetching counties:', error)
    return NextResponse.json(
      { error: 'Failed to fetch counties' },
      { status: 500 }
    )
  }
}
