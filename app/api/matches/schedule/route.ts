import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

// GET /api/matches/schedule
export async function GET(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const filter = searchParams.get('filter') || 'upcoming'

    let statusFilter: any = {}
    const now = new Date()

    switch (filter) {
      case 'upcoming':
        statusFilter = {
          OR: [
            { status: 'PENDING' },
            {
              status: 'IN_PROGRESS',
              kickoffTime: {
                gte: now,
              },
            },
          ],
        }
        break
      case 'completed':
        statusFilter = { status: 'COMPLETED' }
        break
      case 'all':
        // No filter needed
        break
    }

    const matches = await prisma.match.findMany({
      where: {
        AND: [
          statusFilter,
          {
            officials: {
              some: {
                officialId: session.user.id,
              },
            },
          },
        ],
      },
      include: {
        homeTeam: true,
        awayTeam: true,
        officials: {
          where: {
            officialId: session.user.id,
          },
          select: {
            role: true,
          },
        },
      },
      orderBy: {
        kickoffTime: 'asc',
      },
    })

    const formattedMatches = matches.map(match => ({
      id: match.id,
      homeTeam: match.homeTeam.name,
      awayTeam: match.awayTeam.name,
      kickoffTime: match.kickoffTime,
      venue: match.venue,
      status: match.status,
      role: match.officials[0]?.role,
    }))

    return NextResponse.json(formattedMatches)
  } catch (error) {
    console.error('Error fetching match schedule:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
