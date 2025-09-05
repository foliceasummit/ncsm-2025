import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const postSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  category: z.string(),
  tags: z.array(z.string()),
  image: z.string().optional(),
  published: z.boolean()
})

// GET /api/posts
export async function GET(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const posts = await prisma.blogPost.findMany({
      where: {
        authorId: session.user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

// POST /api/posts
export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const json = await request.json()
    const body = postSchema.parse(json)

    const post = await prisma.blogPost.create({
      data: {
        title: body.title,
        content: body.content,
        category: body.category,
        tags: body.tags,
        image: body.image,
        published: body.published,
        author: {
          connect: { id: session.user.id }
        }
      }
    })

    return NextResponse.json(post)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.errors), { status: 400 })
    }
    console.error('Error creating post:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
