import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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

    const where: any = { playerId }

    if (status && status !== 'all') {
      where.status = status
    }

    if (documentType && documentType !== 'all') {
      where.documentType = documentType
    }

    const approvals = await prisma.documentApproval.findMany({
      where,
      include: {
        player: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            discipline: true,
            county: {
              select: {
                name: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

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

    // Check if approval already exists
    const existingApproval = await prisma.documentApproval.findFirst({
      where: {
        playerId,
        documentType
      }
    })

    let approval
    if (existingApproval) {
      // Update existing approval
      approval = await prisma.documentApproval.update({
        where: { id: existingApproval.id },
        data: {
          status,
          approvedBy,
          approvedAt: status === 'APPROVED' ? new Date() : null,
          comments
        }
      })
    } else {
      // Create new approval
      approval = await prisma.documentApproval.create({
        data: {
          playerId,
          documentType,
          status,
          approvedBy,
          approvedAt: status === 'APPROVED' ? new Date() : null,
          comments
        }
      })
    }

    // Check if all documents are approved to update player status
    if (status === 'APPROVED') {
      const allApprovals = await prisma.documentApproval.findMany({
        where: { playerId }
      })

      const requiredDocuments = ['PHOTO', 'BIRTH_CERTIFICATE', 'MEDICAL_CERTIFICATE']
      const allApproved = requiredDocuments.every(docType => 
        allApprovals.some(approval => 
          approval.documentType === docType && approval.status === 'APPROVED'
        )
      )

      if (allApproved) {
        await prisma.player.update({
          where: { id: playerId },
          data: { status: 'APPROVED' }
        })
      }
    }

    return NextResponse.json(approval, { status: 201 })
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
        
        const existingApproval = await prisma.documentApproval.findFirst({
          where: { playerId, documentType }
        })

        if (existingApproval) {
          return await prisma.documentApproval.update({
            where: { id: existingApproval.id },
            data: {
              status,
              approvedBy,
              approvedAt: status === 'APPROVED' ? new Date() : null,
              comments
            }
          })
        } else {
          return await prisma.documentApproval.create({
            data: {
              playerId,
              documentType,
              status,
              approvedBy,
              approvedAt: status === 'APPROVED' ? new Date() : null,
              comments
            }
          })
        }
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
