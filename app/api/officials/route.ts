import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const discipline = searchParams.get('discipline')

    const where: any = {}

    if (status && status !== 'all') {
      where.status = status
    }

    if (discipline && discipline !== 'all') {
      where.discipline = discipline
    }

    const officials = await prisma.official.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(officials)
  } catch (error) {
    console.error('Error fetching officials:', error)
    return NextResponse.json(
      { error: 'Failed to fetch officials' },
      { status: 500 }
    )
  }
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
