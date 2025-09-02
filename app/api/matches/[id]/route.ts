import { NextRequest, NextResponse } from 'next/server'

// Mock data for now - Prisma will be set up later
const mockMatches = [
  {
    id: '1',
    homeTeam: 'Bong County',
    awayTeam: 'Montserrado County',
    date: '2025-01-20',
    venue: 'Samuel Kanyon Doe Sports Complex',
    status: 'scheduled',
    score: null
  }
]

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const match = mockMatches.find(m => m.id === id)

    if (!match) {
      return NextResponse.json(
        { error: 'Match not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(match)
  } catch (error) {
    console.error('Error fetching match:', error)
    return NextResponse.json(
      { error: 'Failed to fetch match' },
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
    const matchIndex = mockMatches.findIndex(m => m.id === id)
    if (matchIndex === -1) {
      return NextResponse.json(
        { error: 'Match not found' },
        { status: 404 }
      )
    }
    
    const updatedMatch = { ...mockMatches[matchIndex], ...body }
    mockMatches[matchIndex] = updatedMatch
    
    return NextResponse.json(updatedMatch)
  } catch (error) {
    console.error('Error updating match:', error)
    return NextResponse.json(
      { error: 'Failed to update match' },
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
    const matchIndex = mockMatches.findIndex(m => m.id === id)
    if (matchIndex === -1) {
      return NextResponse.json(
        { error: 'Match not found' },
        { status: 404 }
      )
    }
    
    mockMatches.splice(matchIndex, 1)
    
    return NextResponse.json({ 
      message: 'Match deleted successfully',
      id
    })
  } catch (error) {
    console.error('Error deleting match:', error)
    return NextResponse.json(
      { error: 'Failed to delete match' },
      { status: 500 }
    )
  }
}
