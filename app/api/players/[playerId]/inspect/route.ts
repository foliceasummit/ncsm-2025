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

    // Update player inspection status
    const player = await prisma.player.update({
      where: { id: playerId },
      data: {
        status,
        notes,
        inspectedBy: {
          connect: { id: session.user.id },
        },
        inspectedAt: new Date(),
      },
    })

    return NextResponse.json(player)
  } catch (error) {
    console.error('Error updating player inspection:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
