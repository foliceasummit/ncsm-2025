import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Extract form data
    const lastName = formData.get('lastName') as string
    const firstName = formData.get('firstName') as string
    const middleName = formData.get('middleName') as string
    const dateOfBirth = formData.get('dateOfBirth') as string
    const nationality = formData.get('nationality') as string
    const pastClub = formData.get('pastClub') as string
    const currentClub = formData.get('currentClub') as string
    const level = formData.get('level') as string
    const discipline = formData.get('discipline') as string
    const year = parseInt(formData.get('year') as string)
    const group = formData.get('group') as string
    const county = formData.get('county') as string
    const photo = formData.get('photo') as File

    // Validate required fields
    if (!lastName || !firstName || !dateOfBirth || !nationality || !level || !discipline || !year || !group || !county) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Handle photo upload (in a real app, you'd upload to a cloud service)
    let photoUrl = null
    if (photo) {
      // For now, we'll just store the filename
      // In production, upload to Cloudinary, AWS S3, or similar
      photoUrl = `/uploads/players/${Date.now()}-${photo.name}`
    }

    // Find or create county
    let countyRecord = await prisma.county.findUnique({
      where: { name: county }
    })

    if (!countyRecord) {
      countyRecord = await prisma.county.create({
        data: {
          name: county,
          group: group
        }
      })
    }

    // Create player record
    const player = await prisma.player.create({
      data: {
        photo: photoUrl,
        lastName,
        firstName,
        middleName: middleName || null,
        dateOfBirth: new Date(dateOfBirth),
        nationality,
        pastClub: pastClub || null,
        currentClub: currentClub || null,
        level,
        discipline: discipline as any,
        year,
        group,
        countyId: countyRecord.id,
        userId: 'temp-user-id', // This should come from the authenticated user
        status: 'PENDING'
      }
    })

    return NextResponse.json({
      message: 'Player registered successfully',
      player: {
        id: player.id,
        firstName: player.firstName,
        lastName: player.lastName,
        discipline: player.discipline,
        county: countyRecord.name
      }
    })
  } catch (error) {
    console.error('Player registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
