import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const counties = await prisma.county.findMany({
      include: {
        _count: {
          select: {
            players: true,
            users: true,
            homeMatches: true,
            awayMatches: true
          }
        }
      },
      orderBy: { name: 'asc' }
    })

    return NextResponse.json(counties)
  } catch (error) {
    console.error('Counties fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch counties' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const { name, group } = data

    if (!name || !group) {
      return NextResponse.json(
        { error: 'Name and group are required' },
        { status: 400 }
      )
    }

    const county = await prisma.county.create({
      data: {
        name,
        group
      }
    })

    return NextResponse.json(county, { status: 201 })
  } catch (error) {
    console.error('County creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create county' },
      { status: 500 }
    )
  }
}