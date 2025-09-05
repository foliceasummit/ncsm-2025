import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// POST /api/federation/players/[playerId]/comment
export async function POST(
  request: Request,
  { params }: { params: { playerId: string } }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { playerId } = params
    const { comment } = await request.json()

    // Create document approval with comment
    const approval = await prisma.documentApproval.create({
      data: {
        playerId,
        documentType: 'PHOTO', // Using photo as default document type
        status: 'PENDING',
        comments: comment,
        approvedBy: session.user.id
      }
    })

    return NextResponse.json(approval)
  } catch (error) {
    console.error('Error adding player comment:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
