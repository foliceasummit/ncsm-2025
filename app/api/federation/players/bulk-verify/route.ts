import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// POST /api/federation/players/bulk-verify
export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { playerIds, status, comment } = await request.json()

    if (!Array.isArray(playerIds) || playerIds.length === 0) {
      return new NextResponse('Invalid player IDs', { status: 400 })
    }

    // Create document approvals for each player
    const approvals = await prisma.$transaction(
      playerIds.map(playerId => 
        prisma.documentApproval.create({
          data: {
            playerId,
            documentType: 'PHOTO', // Using photo as default document type
            status: status === 'APPROVED' ? 'APPROVED' : 'REJECTED',
            approvedBy: session.user.id,
            approvedAt: new Date(),
            comments: comment
          }
        })
      )
    )

    return NextResponse.json(approvals)
  } catch (error) {
    console.error('Error bulk verifying players:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
