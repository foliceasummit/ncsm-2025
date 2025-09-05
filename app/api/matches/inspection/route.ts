import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth.config'
import { InspectionStatus } from '@prisma/client'

// Get all match inspections
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const matches = await prisma.match.findMany({
      where: {
        date: {
          gte: new Date()
        }
      },
      include: {
        homeTeam: true,
        awayTeam: true,
        matchInspection: {
          include: {
            checklist: true,
            photos: true,
            inspector: true
          }
        }
      },
      orderBy: {
        date: 'asc'
      }
    })

    return NextResponse.json(matches)
  } catch (error) {
    console.error('Error fetching match inspections:', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

// Create or update match inspection
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await request.json()
    const { matchId, status, checklist } = body

    const inspection = await prisma.$transaction(async (tx) => {
      // Create or update the match inspection
      const inspection = await tx.matchInspection.upsert({
        where: {
          matchId
        },
        create: {
          matchId,
          status,
          inspectorId: session.user.id,
        },
        update: {
          status
        }
      })

      // Handle checklist items
      if (checklist && checklist.length > 0) {
        await tx.inspectionChecklist.deleteMany({
          where: { inspectionId: inspection.id }
        })
        
        await tx.inspectionChecklist.createMany({
          data: checklist.map((item: any) => ({
            inspectionId: inspection.id,
            item: item.item,
            status: item.status,
            comments: item.comments
          }))
        })
      }

      // Return the full inspection with relations
      return tx.matchInspection.findUnique({
        where: { id: inspection.id },
        include: {
          checklist: true,
          photos: true,
          inspector: true
        }
      })
    })

    return NextResponse.json(inspection)
  } catch (error) {
    console.error('Error updating match inspection:', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

// Upload inspection photos
export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const formData = await request.formData()
    const matchId = formData.get('matchId') as string
    const photos = formData.getAll('photos') as File[]

    const uploadPromises = photos.map(async (photo) => {
      // Here you would upload to your storage service (S3, etc)
      // For now, we'll simulate with a local URL
      const photoUrl = `/uploads/${photo.name}`
      
      // First, get the inspection ID for the match
      const inspection = await prisma.matchInspection.findUnique({
        where: { matchId }
      })

      if (!inspection) {
        throw new Error('No inspection found for this match')
      }

      // Then create the photo
      return prisma.inspectionPhoto.create({
        data: {
          url: photoUrl,
          inspectionId: inspection.id
        }
      })
    })

    const uploadedPhotos = await Promise.all(uploadPromises)
    return NextResponse.json(uploadedPhotos)
  } catch (error) {
    console.error('Error uploading photos:', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
