import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const county = searchParams.get('county')
    const discipline = searchParams.get('discipline')
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    if (county) where.countyId = county
    if (discipline) where.discipline = discipline
    if (status) where.status = status

    const [players, total] = await Promise.all([
      prisma.player.findMany({
        where,
        include: {
          county: {
            select: { id: true, name: true, group: true }
          },
          user: {
            select: { id: true, email: true, firstName: true, lastName: true }
          },
          _count: {
            select: {
              inspections: true,
              documentApprovals: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.player.count({ where })
    ])

    return NextResponse.json({
      players,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Players fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch players' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const {
      firstName,
      lastName,
      middleName,
      dateOfBirth,
      nationality,
      pastClub,
      currentClub,
      level,
      discipline,
      year,
      group,
      countyId,
      userId,
      photo,
      birthCertificate,
      medicalCertificate
    } = data

    // Validate required fields
    if (!firstName || !lastName || !dateOfBirth || !nationality || !discipline || !countyId || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const player = await prisma.player.create({
      data: {
        firstName,
        lastName,
        middleName,
        dateOfBirth: new Date(dateOfBirth),
        nationality,
        pastClub,
        currentClub,
        level,
        discipline,
        year,
        group,
        countyId,
        userId,
        photo,
        birthCertificate,
        medicalCertificate,
        status: 'PENDING'
      },
      include: {
        county: true,
        user: true
      }
    })

    return NextResponse.json(player, { status: 201 })
  } catch (error) {
    console.error('Player creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create player' },
      { status: 500 }
    )
  }
}