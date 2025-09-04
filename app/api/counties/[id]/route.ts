import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: countyId } = await params

    if (!countyId) {
      return NextResponse.json(
        { error: 'County ID is required' },
        { status: 400 }
      )
    }

    const county = await prisma.county.findUnique({
      where: { id: countyId },
      select: {
        id: true,
        name: true,
        group: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!county) {
      return NextResponse.json(
        { error: 'County not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(county)
  } catch (error) {
    console.error('Error fetching county:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
