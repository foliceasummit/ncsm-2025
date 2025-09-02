import { NextRequest, NextResponse } from 'next/server'

// Mock data for now - Prisma will be set up later
const mockBlogPosts = [
  {
    id: '1',
    title: 'NCSM 2025 Tournament Begins',
    content: 'The National County Sports Meet 2025 has officially begun...',
    author: { id: '1', email: 'admin@ncsm.lr' },
    published: true,
    createdAt: new Date().toISOString()
  }
]

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const blogPost = mockBlogPosts.find(post => post.id === params.id)

    if (!blogPost) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(blogPost)
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
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
    
    // Mock update - will be replaced with Prisma later
    return NextResponse.json({ 
      message: 'Blog post updated successfully',
      id: params.id,
      ...body
    })
  } catch (error) {
    console.error('Error updating blog post:', error)
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Mock delete - will be replaced with Prisma later
    return NextResponse.json({ 
      message: 'Blog post deleted successfully',
      id: params.id
    })
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    )
  }
}
