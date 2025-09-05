import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/federation/players
export async function GET(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Get user's federation role
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    if (!user) {
      return new NextResponse('User not found', { status: 404 })
    }

    // Map federation roles to disciplines
    const disciplineMap = {
      'BASKETBALL_FEDERATION': 'BASKETBALL',
      'KICKBALL_FEDERATION': 'KICKBALL',
      'VOLLEYBALL_FEDERATION': 'VOLLEYBALL',
      'ATHLETICS_FEDERATION': 'ATHLETICS',
      'LFA_OFFICIAL': 'FOOTBALL'
    } as const

    const discipline = disciplineMap[user.role as keyof typeof disciplineMap]
    if (!discipline) {
      return new NextResponse('Invalid federation role', { status: 403 })
    }

    // Fetch players for the specific discipline
    const players = await prisma.player.findMany({
      where: {
        discipline: discipline
      },
      include: {
        county: true,
        documentApprovals: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 1
        }
      }
    })

    const formattedPlayers = players.map(player => ({
      id: player.id,
      photo: player.photo,
      firstName: player.firstName,
      lastName: player.lastName,
      middleName: player.middleName,
      dateOfBirth: player.dateOfBirth,
      county: player.county.name,
      currentClub: player.currentClub,
      pastClub: player.pastClub,
      level: player.level,
      discipline: player.discipline,
      verified: player.documentApprovals[0]?.status === 'APPROVED',
      group: player.group
    }))

    return NextResponse.json({ players: formattedPlayers })
  } catch (error) {
    console.error('Error fetching players:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
