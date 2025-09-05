import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// POST /api/players/[playerId]/inspect
export async function POST(
  request: Request,
  { params }: { params: Promise<{ playerId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { playerId } = await params
    const { matchId, status, notes } = await request.json()

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

    // Create player inspection record
    const inspection = await prisma.playerInspection.create({
      data: {
        matchId,
        playerId,
        status,
        notes,
        inspectedById: session.user.id,
      },
      include: {
        player: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            status: true,
          },
        },
      },
    })

    return NextResponse.json(inspection)
  } catch (error) {
    console.error('Error updating player inspection:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
