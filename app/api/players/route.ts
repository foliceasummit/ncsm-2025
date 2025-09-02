import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const discipline = searchParams.get('discipline')
    const countyId = searchParams.get('countyId')

    const where: any = {}

    if (status && status !== 'all') {
      where.status = status
    }

    if (discipline && discipline !== 'all') {
      where.discipline = discipline
    }

    if (countyId && countyId !== 'all') {
      where.countyId = countyId
    }

    const players = await prisma.player.findMany({
      where,
      include: {
        county: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(players)
  } catch (error) {
    console.error('Error fetching players:', error)
    return NextResponse.json(
      { error: 'Failed to fetch players' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      firstName,
      lastName,
      middleName,
      dateOfBirth,
      nationality,
      pastClub,
      currentClub,
      level,
      discipline,
      year,
      group,
      countyId,
      userId,
      photo,
      birthCertificate,
      medicalCertificate,
    } = body

    // Validate required fields
    if (!firstName || !lastName || !dateOfBirth || !nationality || !level || !discipline || !year || !group || !countyId || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const player = await prisma.player.create({
      data: {
        firstName,
        lastName,
        middleName,
        dateOfBirth: new Date(dateOfBirth),
        nationality,
        pastClub,
        currentClub,
        level,
        discipline,
        year,
        group,
        countyId,
        userId,
        photo,
        birthCertificate,
        medicalCertificate,
        status: 'PENDING',
      },
      include: {
        county: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    })

    // Create document approval records for uploaded documents
    const documentApprovals = []
    
    if (photo) {
      documentApprovals.push({
        playerId: player.id,
        documentType: 'PHOTO',
        status: 'PENDING',
        approvedBy: null,
        approvedAt: null,
        comments: null
      })
    }
    
    if (birthCertificate) {
      documentApprovals.push({
        playerId: player.id,
        documentType: 'BIRTH_CERTIFICATE',
        status: 'PENDING',
        approvedBy: null,
        approvedAt: null,
        comments: null
      })
    }
    
    if (medicalCertificate) {
      documentApprovals.push({
        playerId: player.id,
        documentType: 'MEDICAL_CERTIFICATE',
        status: 'PENDING',
        approvedBy: null,
        approvedAt: null,
        comments: null
      })
    }

    // Create document approval records
    if (documentApprovals.length > 0) {
      await prisma.documentApproval.createMany({
        data: documentApprovals
      })
    }

    return NextResponse.json(player, { status: 201 })
  } catch (error) {
    console.error('Error creating player:', error)
    return NextResponse.json(
      { error: 'Failed to create player' },
      { status: 500 }
    )
  }
}
