import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    // Verify authentication
    const session = await auth()
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const data = await req.json()
    const { playerIds, sport, matchId, matchTime } = data

    // Create player inspection records for each player
    const inspections = await Promise.all(
      playerIds.map((playerId: string) =>
        prisma.playerInspection.create({
          data: {
            matchId,
            playerId,
            status: 'PENDING',
            inspectedById: session.user.id,
            notes: `Submitted for inspection by ${session.user.name || session.user.email}`
          },
          include: {
            player: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                discipline: true,
                status: true
              }
            }
          }
        })
      )
    )

    return NextResponse.json({
      message: 'Players submitted for inspection successfully',
      inspections,
      count: inspections.length
    })
  } catch (error) {
    console.error('Submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit players for inspection' },
      { status: 500 }
    )
  }
}
