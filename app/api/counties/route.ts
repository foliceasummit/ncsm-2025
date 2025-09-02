import { NextRequest, NextResponse } from 'next/server'

// Mock counties data - Prisma will be set up later
const mockCounties = [
  { id: '1', name: 'Montserrado', group: 'A', superintendent: 'Hon. John Doe' },
  { id: '2', name: 'Bong', group: 'A', superintendent: 'Hon. Jane Smith' },
  { id: '3', name: 'Nimba', group: 'B', superintendent: 'Hon. Bob Johnson' },
  { id: '4', name: 'Lofa', group: 'B', superintendent: 'Hon. Alice Brown' },
  { id: '5', name: 'Grand Bassa', group: 'C', superintendent: 'Hon. Charlie Wilson' },
  { id: '6', name: 'Margibi', group: 'C', superintendent: 'Hon. Diana Davis' },
  { id: '7', name: 'Bomi', group: 'D', superintendent: 'Hon. Edward Miller' },
  { id: '8', name: 'Grand Cape Mount', group: 'D', superintendent: 'Hon. Fiona Garcia' },
  { id: '9', name: 'Gbarpolu', group: 'A', superintendent: 'Hon. George Martinez' },
  { id: '10', name: 'River Cess', group: 'B', superintendent: 'Hon. Helen Rodriguez' },
  { id: '11', name: 'Sinoe', group: 'C', superintendent: 'Hon. Ian Thompson' },
  { id: '12', name: 'Grand Gedeh', group: 'D', superintendent: 'Hon. Julia Lee' },
  { id: '13', name: 'River Gee', group: 'A', superintendent: 'Hon. Kevin White' },
  { id: '14', name: 'Maryland', group: 'B', superintendent: 'Hon. Henry Cole' }
]

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(mockCounties)
  } catch (error) {
    console.error('Error fetching counties:', error)
    return NextResponse.json(
      { error: 'Failed to fetch counties' },
      { status: 500 }
    )
  }
}
