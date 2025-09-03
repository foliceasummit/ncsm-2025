import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const discipline = searchParams.get('discipline')
    const countyId = searchParams.get('countyId')

    const where: any = {}

    if (status && status !== 'all') {
      where.status = status
    }

    if (discipline && discipline !== 'all') {
      where.discipline = discipline
    }

    // If countyId is provided, filter by user's county
    if (countyId) {
      where.user = {
        countyId: countyId
      }
    }

    const officials = await prisma.official.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            countyId: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Transform data to match dashboard interface
    const transformedOfficials = officials.map(official => ({
      id: official.id,
      firstName: official.firstName,
      lastName: official.lastName,
      discipline: official.discipline,
      status: official.status,
      photo: official.photo,
      documentsNeeded: getDocumentsNeeded(official),
    }))

    return NextResponse.json(transformedOfficials)
  } catch (error) {
    console.error('Error fetching officials:', error)
    return NextResponse.json(
      { error: 'Failed to fetch officials' },
      { status: 500 }
    )
  }
}

function getDocumentsNeeded(official: any): string[] {
  const needed: string[] = []
  
  if (!official.photo) needed.push('Photo')
  
  return needed
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      firstName,
      lastName,
      middleName,
      dateOfBirth,
      nationality,
      currentCounty,
      discipline,
      year,
      group,
      position,
      userId,
      photo,
    } = body

    // Validate required fields
    if (!firstName || !lastName || !dateOfBirth || !nationality || !currentCounty || !discipline || !year || !group || !position || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const official = await prisma.official.create({
      data: {
        firstName,
        lastName,
        middleName,
        dateOfBirth: new Date(dateOfBirth),
        nationality,
        currentCounty,
        discipline,
        year,
        group,
        position,
        userId,
        photo,
        status: 'PENDING',
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(official, { status: 201 })
  } catch (error) {
    console.error('Error creating official:', error)
    return NextResponse.json(
      { error: 'Failed to create official' },
      { status: 500 }
    )
  }
}
