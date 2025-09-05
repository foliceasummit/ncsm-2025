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

    // Create submission record
    const submission = await prisma.submission.create({
      data: {
        sport,
        matchId,
        matchTime: new Date(matchTime),
        countyId: session.user.countyId,
        players: {
          connect: playerIds.map((id: string) => ({ id }))
        }
      },
      include: {
        players: true
      }
    })

    return NextResponse.json(submission)
  } catch (error) {
    console.error('Submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit players for inspection' },
      { status: 500 }
    )
  }
}
