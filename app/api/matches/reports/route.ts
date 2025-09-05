import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

// POST /api/matches/reports
export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const data = await request.json()
    const {
      matchId,
      homeTeamScore,
      awayTeamScore,
      yellowCards,
      redCards,
      substitutions,
      notes
    } = data

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

    // Create match report
    const report = await prisma.matchReport.create({
      data: {
        matchId,
        submittedById: session.user.id,
        homeTeamScore,
        awayTeamScore,
        yellowCards: {
          createMany: {
            data: yellowCards,
          },
        },
        redCards: {
          createMany: {
            data: redCards,
          },
        },
        substitutions: {
          createMany: {
            data: substitutions,
          },
        },
        notes,
        status: 'SUBMITTED',
      },
    })

    // Update match status
    await prisma.match.update({
      where: { id: matchId },
      data: { status: 'COMPLETED' },
    })

    return NextResponse.json(report)
  } catch (error) {
    console.error('Error submitting match report:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
