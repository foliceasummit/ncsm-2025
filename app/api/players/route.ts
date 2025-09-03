import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const countyId = searchParams.get('countyId')

    if (!countyId) {
      return NextResponse.json(
        { error: 'County ID is required' },
        { status: 400 }
      )
    }

    const players = await prisma.player.findMany({
      where: { countyId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        discipline: true,
        status: true,
        photo: true,
        birthCertificate: true,
        medicalCertificate: true,
        county: {
          select: {
            name: true,
          },
        },
      },
    })

    // Transform data to match dashboard interface
    const transformedPlayers = players.map(player => ({
      id: player.id,
      firstName: player.firstName,
      lastName: player.lastName,
      discipline: player.discipline,
      status: player.status,
      photo: player.photo,
      birthCertificate: player.birthCertificate,
      medicalCertificate: player.medicalCertificate,
      documentsNeeded: getDocumentsNeeded(player),
    }))

    return NextResponse.json(transformedPlayers)
  } catch (error) {
    console.error('Error fetching players:', error)
    return NextResponse.json(
      { error: 'Failed to fetch players' },
      { status: 500 }
    )
  }
}

function getDocumentsNeeded(player: any): string[] {
  const needed: string[] = []
  
  if (!player.photo) needed.push('Photo')
  if (!player.birthCertificate) needed.push('Birth Certificate')
  if (!player.medicalCertificate) needed.push('Medical Certificate')
  
  return needed
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Mock player creation - will be replaced with Prisma later
    const newPlayer = {
      id: Date.now().toString(),
      ...body,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    }
    
    return NextResponse.json(newPlayer, { status: 201 })
  } catch (error) {
    console.error('Error creating player:', error)
    return NextResponse.json(
      { error: 'Failed to create player' },
      { status: 500 }
    )
  }
}
