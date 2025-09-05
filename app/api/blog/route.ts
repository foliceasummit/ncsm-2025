import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get('published')
    const authorId = searchParams.get('authorId')

    const where: any = {}

    if (published !== null) {
      where.published = published === 'true'
    }

    if (authorId) {
      where.authorId = authorId
    }

    const blogPosts = await prisma.blogPost.findMany({
      where,
      include: {
        author: {
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

    return NextResponse.json(blogPosts)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      content,
      image,
      authorId,
      category = 'General',
      tags = [],
      published = false,
    } = body

    // Validate required fields
    if (!title || !content || !authorId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const blogPost = await prisma.blogPost.create({
      data: {
        title,
        content,
        image,
        authorId,
        category,
        tags,
        published,
      },
      include: {
        author: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(blogPost, { status: 201 })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}
