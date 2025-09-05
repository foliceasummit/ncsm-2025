import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// POST /api/federation/observations
export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const formData = await request.formData()
    const content = formData.get('content') as string
    const files = formData.getAll('evidence') as File[]

    if (!content) {
      return new NextResponse('Content is required', { status: 400 })
    }

    // Get user's federation role and map to discipline
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    if (!user) {
      return new NextResponse('User not found', { status: 404 })
    }

    // Map federation roles to disciplines
    const disciplineMap = {
      'BASKETBALL_FEDERATION': 'BASKETBALL',
      'KICKBALL_FEDERATION': 'KICKBALL',
      'VOLLEYBALL_FEDERATION': 'VOLLEYBALL',
      'ATHLETICS_FEDERATION': 'ATHLETICS',
      'LFA_OFFICIAL': 'FOOTBALL'
    } as const

    const discipline = disciplineMap[user.role as keyof typeof disciplineMap]
    if (!discipline) {
      return new NextResponse('Invalid federation role', { status: 403 })
    }

    // Create observation record
    const observation = await prisma.federationObservation.create({
      data: {
        content,
        discipline,
        submittedById: session.user.id,
        status: 'PENDING'
      }
    })

    return NextResponse.json(observation)
  } catch (error) {
    console.error('Error submitting observation:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
