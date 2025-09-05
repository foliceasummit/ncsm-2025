import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/matches/[matchId]/inspection
export async function GET(
  request: Request,
  { params }: { params: Promise<{ matchId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { matchId } = await params

    // Validate official's assignment to the match
    const matchAssignment = await prisma.matchOfficial.findFirst({
      where: {
        matchId,
        officialId: session.user.id,
      },
    })

    if (!matchAssignment) {
      return new NextResponse('Not assigned to this match', { status: 403 })
    }

    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: {
        homeTeam: {
          include: {
            players: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                jerseyNumber: true,
                idCardUrl: true,
                status: true,
                notes: true,
              },
            },
          },
        },
        awayTeam: {
          include: {
            players: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                jerseyNumber: true,
                idCardUrl: true,
                status: true,
                notes: true,
              },
            },
          },
        },
      },
    })

    if (!match) {
      return new NextResponse('Match not found', { status: 404 })
    }

    return NextResponse.json({
      match: {
        id: match.id,
        homeTeam: match.homeTeam.name,
        awayTeam: match.awayTeam.name,
        kickoffTime: match.kickoffTime,
        venue: match.venue,
      },
      homePlayers: match.homeTeam.players,
      awayPlayers: match.awayTeam.players,
    })
  } catch (error) {
    console.error('Error fetching match inspection data:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

// POST /api/matches/[matchId]/complete-inspection
export async function POST(
  request: Request,
  { params }: { params: Promise<{ matchId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { matchId } = await params

    // Validate all players have been inspected
    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: {
        homeTeam: {
          include: {
            players: {
              select: { status: true },
            },
          },
        },
        awayTeam: {
          include: {
            players: {
              select: { status: true },
            },
          },
        },
      },
    })

    if (!match) {
      return new NextResponse('Match not found', { status: 404 })
    }

    const allPlayers = [
      ...match.homeTeam.players,
      ...match.awayTeam.players,
    ]

    const pendingPlayers = allPlayers.filter(p => p.status === 'PENDING')
    if (pendingPlayers.length > 0) {
      return new NextResponse('All players must be inspected', { status: 400 })
    }

    // Update match status
    await prisma.match.update({
      where: { id: matchId },
      data: { status: 'IN_PROGRESS' },
    })

    return new NextResponse('Inspection completed successfully')
  } catch (error) {
    console.error('Error completing match inspection:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
