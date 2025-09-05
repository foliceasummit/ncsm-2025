import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// POST /api/federation/players/[playerId]/verify
export async function POST(
  request: Request,
  { params }: { params: Promise<{ playerId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { playerId } = await params
    const { verified } = await request.json()

    // Create or update document approval
    const approval = await prisma.documentApproval.create({
      data: {
        playerId,
        documentType: 'PHOTO', // Using photo as default document type
        status: verified ? 'APPROVED' : 'REJECTED',
        approvedBy: session.user.id,
        approvedAt: new Date()
      }
    })

    return NextResponse.json(approval)
  } catch (error) {
    console.error('Error updating player verification:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
