import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const official = await prisma.official.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    })

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
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { status } = body

    if (!status || !['PENDING', 'APPROVED', 'DISAPPROVED'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    const official = await prisma.official.update({
      where: { id: params.id },
      data: { status },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(official)
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
  { params }: { params: { id: string } }
) {
  try {
    await prisma.official.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Official deleted successfully' })
  } catch (error) {
    console.error('Error deleting official:', error)
    return NextResponse.json(
      { error: 'Failed to delete official' },
      { status: 500 }
    )
  }
}
