import { NextRequest, NextResponse } from 'next/server'

// Mock data for document approvals - will be replaced with Prisma later
const mockDocumentApprovals = [
  {
    id: '1',
    playerId: '1',
    documentType: 'BIRTH_CERTIFICATE',
    status: 'APPROVED',
    approvedBy: 'admin@ncsm.lr',
    approvedAt: new Date().toISOString(),
    comments: 'Document verified successfully',
    createdAt: new Date().toISOString(),
    player: {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      discipline: 'Football',
      county: {
        name: 'Montserrado'
      }
    }
  },
  {
    id: '2',
    playerId: '2',
    documentType: 'MEDICAL_CERTIFICATE',
    status: 'PENDING',
    approvedBy: null,
    approvedAt: null,
    comments: 'Awaiting review',
    createdAt: new Date().toISOString(),
    player: {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      discipline: 'Basketball',
      county: {
        name: 'Bong'
      }
    }
  }
]

// GET - Fetch document approvals for a player
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const playerId = searchParams.get('playerId')
    const status = searchParams.get('status')
    const documentType = searchParams.get('documentType')

    if (!playerId) {
      return NextResponse.json(
        { error: 'Player ID is required' },
        { status: 400 }
      )
    }

    let approvals = mockDocumentApprovals.filter(approval => approval.playerId === playerId)

    if (status && status !== 'all') {
      approvals = approvals.filter(approval => approval.status === status)
    }

    if (documentType && documentType !== 'all') {
      approvals = approvals.filter(approval => approval.documentType === documentType)
    }

    return NextResponse.json(approvals)
  } catch (error) {
    console.error('Error fetching document approvals:', error)
    return NextResponse.json(
      { error: 'Failed to fetch document approvals' },
      { status: 500 }
    )
  }
}

// POST - Create or update document approval
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      playerId,
      documentType,
      status,
      approvedBy,
      comments
    } = body

    if (!playerId || !documentType || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Mock response - will be replaced with Prisma later
    return NextResponse.json({
      message: 'Document approval updated successfully',
      id: Date.now().toString(),
      playerId,
      documentType,
      status,
      approvedBy,
      approvedAt: status === 'APPROVED' ? new Date().toISOString() : null,
      comments,
      createdAt: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error updating document approval:', error)
    return NextResponse.json(
      { error: 'Failed to update document approval' },
      { status: 500 }
    )
  }
}

// PUT - Bulk update document approvals
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { approvals } = body

    if (!Array.isArray(approvals)) {
      return NextResponse.json(
        { error: 'Approvals must be an array' },
        { status: 400 }
      )
    }

    const results = await Promise.all(
      approvals.map(async (approval) => {
        const { playerId, documentType, status, approvedBy, comments } = approval
        
        // Mock response - will be replaced with Prisma later
        return NextResponse.json({
          message: 'Document approval updated successfully',
          id: Date.now().toString(),
          playerId,
          documentType,
          status,
          approvedBy,
          approvedAt: status === 'APPROVED' ? new Date().toISOString() : null,
          comments,
          createdAt: new Date().toISOString()
        })
      })
    )

    return NextResponse.json(results)
  } catch (error) {
    console.error('Error bulk updating document approvals:', error)
    return NextResponse.json(
      { error: 'Failed to bulk update document approvals' },
      { status: 500 }
    )
  }
}
