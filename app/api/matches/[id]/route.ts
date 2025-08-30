import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const match = await prisma.match.findUnique({
      where: { id: params.id },
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
        matchOfficial: {
          select: {
            id: true,
            email: true,
          },
        },
        reports: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
              },
            },
          },
        },
        scorers: {
          include: {
            player: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    })

    if (!match) {
      return NextResponse.json(
        { error: 'Match not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(match)
  } catch (error) {
    console.error('Error fetching match:', error)
    return NextResponse.json(
      { error: 'Failed to fetch match' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const {
      homeScore,
      awayScore,
      status,
      venue,
      date,
      matchOfficialId,
    } = body

    const updateData: any = {}

    if (homeScore !== undefined) updateData.homeScore = homeScore
    if (awayScore !== undefined) updateData.awayScore = awayScore
    if (status) updateData.status = status
    if (venue) updateData.venue = venue
    if (date) updateData.date = new Date(date)
    if (matchOfficialId) updateData.matchOfficialId = matchOfficialId

    const match = await prisma.match.update({
      where: { id: params.id },
      data: updateData,
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
        matchOfficial: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(match)
  } catch (error) {
    console.error('Error updating match:', error)
    return NextResponse.json(
      { error: 'Failed to update match' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.match.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Match deleted successfully' })
  } catch (error) {
    console.error('Error deleting match:', error)
    return NextResponse.json(
      { error: 'Failed to delete match' },
      { status: 500 }
    )
  }
}
