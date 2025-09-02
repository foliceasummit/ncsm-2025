import { NextRequest, NextResponse } from 'next/server'

// Mock data for now - Prisma will be set up later
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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const player = mockPlayers.find(p => p.id === id)

    if (!player) {
      return NextResponse.json(
        { error: 'Player not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(player)
  } catch (error) {
    console.error('Error fetching player:', error)
    return NextResponse.json(
      { error: 'Failed to fetch player' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    // Mock update - will be replaced with Prisma later
    const playerIndex = mockPlayers.findIndex(p => p.id === id)
    if (playerIndex === -1) {
      return NextResponse.json(
        { error: 'Player not found' },
        { status: 404 }
      )
    }
    
    const updatedPlayer = { ...mockPlayers[playerIndex], ...body }
    mockPlayers[playerIndex] = updatedPlayer
    
    return NextResponse.json(updatedPlayer)
  } catch (error) {
    console.error('Error updating player:', error)
    return NextResponse.json(
      { error: 'Failed to update player' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Mock delete - will be replaced with Prisma later
    const playerIndex = mockPlayers.findIndex(p => p.id === id)
    if (playerIndex === -1) {
      return NextResponse.json(
        { error: 'Player not found' },
        { status: 404 }
      )
    }
    
    mockPlayers.splice(playerIndex, 1)
    
    return NextResponse.json({ 
      message: 'Player deleted successfully',
      id
    })
  } catch (error) {
    console.error('Error deleting player:', error)
    return NextResponse.json(
      { error: 'Failed to delete player' },
      { status: 500 }
    )
  }
}
