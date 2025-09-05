import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Get comprehensive dashboard statistics
    const [
      totalUsers,
      totalCounties,
      totalPlayers,
      totalMatches,
      totalOfficials,
      totalBlogPosts,
      pendingInspections,
      upcomingMatches,
      recentMatches
    ] = await Promise.all([
      // Basic counts
      prisma.user.count(),
      prisma.county.count(),
      prisma.player.count(),
      prisma.match.count(),
      prisma.official.count(),
      prisma.blogPost.count(),
      
      // Pending inspections
      prisma.playerInspection.count({
        where: { status: 'PENDING' }
      }),
      
      // Upcoming matches (next 7 days)
      prisma.match.findMany({
        where: {
          date: {
            gte: new Date(),
            lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          }
        },
        include: {
          homeTeam: true,
          awayTeam: true
        },
        orderBy: { date: 'asc' },
        take: 5
      }),
      
      // Recent matches (last 7 days)
      prisma.match.findMany({
        where: {
          date: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            lt: new Date()
          }
        },
        include: {
          homeTeam: true,
          awayTeam: true
        },
        orderBy: { date: 'desc' },
        take: 5
      })
    ])

    // Get players by status
    const playersByStatus = await prisma.player.groupBy({
      by: ['status'],
      _count: { status: true }
    })

    // Get matches by status
    const matchesByStatus = await prisma.match.groupBy({
      by: ['status'],
      _count: { status: true }
    })

    // Get players by discipline
    const playersByDiscipline = await prisma.player.groupBy({
      by: ['discipline'],
      _count: { discipline: true }
    })

    return NextResponse.json({
      overview: {
        totalUsers,
        totalCounties,
        totalPlayers,
        totalMatches,
        totalOfficials,
        totalBlogPosts,
        pendingInspections
      },
      upcomingMatches,
      recentMatches,
      playersByStatus: playersByStatus.map(item => ({
        status: item.status,
        count: item._count.status
      })),
      matchesByStatus: matchesByStatus.map(item => ({
        status: item.status,
        count: item._count.status
      })),
      playersByDiscipline: playersByDiscipline.map(item => ({
        discipline: item.discipline,
        count: item._count.discipline
      }))
    })

  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard statistics' },
      { status: 500 }
    )
  }
}
