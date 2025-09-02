import { NextRequest, NextResponse } from 'next/server'

// Mock players data - Prisma will be set up later
const mockPlayers = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    middleName: 'M',
    dateOfBirth: '2000-01-01',
    nationality: 'Liberian',
    discipline: 'FOOTBALL',
    level: 'First Division',
    year: 2025,
    group: 'A',
    countyId: '1',
    pastClub: 'Liberia Stars',
    currentClub: 'Bong United',
    status: 'PENDING'
  }
]

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(mockPlayers)
  } catch (error) {
    console.error('Error fetching players:', error)
    return NextResponse.json(
      { error: 'Failed to fetch players' },
      { status: 500 }
    )
  }
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
