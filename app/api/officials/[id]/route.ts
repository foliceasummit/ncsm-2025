import { NextRequest, NextResponse } from 'next/server'

// Mock data for now - Prisma will be set up later
const mockOfficials = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Referee',
    middleName: 'M',
    dateOfBirth: '1980-01-01',
    nationality: 'Liberian',
    discipline: 'FOOTBALL',
    year: 2025,
    group: 'A',
    position: 'Referee',
    countyId: '1',
    status: 'PENDING'
  }
]

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const official = mockOfficials.find(o => o.id === id)

    if (!official) {
      return NextResponse.json(
        { error: 'Official not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(official)
  } catch (error) {
    console.error('Error fetching official:', error)
    return NextResponse.json(
      { error: 'Failed to fetch official' },
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
    const officialIndex = mockOfficials.findIndex(o => o.id === id)
    if (officialIndex === -1) {
      return NextResponse.json(
        { error: 'Official not found' },
        { status: 404 }
      )
    }
    
    const updatedOfficial = { ...mockOfficials[officialIndex], ...body }
    mockOfficials[officialIndex] = updatedOfficial
    
    return NextResponse.json(updatedOfficial)
  } catch (error) {
    console.error('Error updating official:', error)
    return NextResponse.json(
      { error: 'Failed to update official' },
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
    const officialIndex = mockOfficials.findIndex(o => o.id === id)
    if (officialIndex === -1) {
      return NextResponse.json(
        { error: 'Official not found' },
        { status: 404 }
      )
    }
    
    mockOfficials.splice(officialIndex, 1)
    
    return NextResponse.json({ 
      message: 'Official deleted successfully',
      id
    })
  } catch (error) {
    console.error('Error deleting official:', error)
    return NextResponse.json(
      { error: 'Failed to delete official' },
      { status: 500 }
    )
  }
}
