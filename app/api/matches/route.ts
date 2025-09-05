import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const discipline = searchParams.get('discipline')
    const group = searchParams.get('group')

    const where: any = {}

    if (status && status !== 'all') {
      where.status = status
    }

    if (discipline && discipline !== 'all') {
      where.discipline = discipline
    }

    if (group && group !== 'all') {
      where.group = group
    }

    const matches = await prisma.match.findMany({
      where,
      include: {
        homeTeam: {
          select: {
            id: true,
            name: true,
          },
        },
        awayTeam: {
          select: {
            id: true,
            name: true,
          },
        },
        officials: {
          select: {
            id: true,
            role: true,
            official: {
              select: {
                id: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        date: 'asc',
      },
    })

    return NextResponse.json(matches)
  } catch (error) {
    console.error('Error fetching matches:', error)
    return NextResponse.json(
      { error: 'Failed to fetch matches' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      homeTeamId,
      awayTeamId,
      date,
      venue,
      discipline,
      group,
    } = body

    // Validate required fields
    if (!homeTeamId || !awayTeamId || !date || !venue || !discipline || !group) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if teams are different
    if (homeTeamId === awayTeamId) {
      return NextResponse.json(
        { error: 'Home team and away team cannot be the same' },
        { status: 400 }
      )
    }

    const match = await prisma.match.create({
      data: {
        homeTeamId,
        awayTeamId,
        date: new Date(date),
        venue,
        discipline,
        group,
        status: 'SCHEDULED',
      },
      include: {
        homeTeam: {
          select: {
            id: true,
            name: true,
          },
        },
        awayTeam: {
          select: {
            id: true,
            name: true,
          },
        },
        officials: {
          select: {
            id: true,
            role: true,
            official: {
              select: {
                id: true,
                email: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json(match, { status: 201 })
  } catch (error) {
    console.error('Error creating match:', error)
    return NextResponse.json(
      { error: 'Failed to create match' },
      { status: 500 }
    )
  }
}
