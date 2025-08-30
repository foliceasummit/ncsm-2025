'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { 
  NewspaperIcon, 
  PlusIcon, 
  PencilIcon, 
  EyeIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface BlogPost {
  id: string
  title: string
  content: string
  image?: string
  author: { name: string }
  published: boolean
  createdAt: string
  updatedAt: string
}

export default function AdminBlogPage() {
  const { user, loading } = useAuth()
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    if (user) {
      fetchBlogPosts()
    }
  }, [user])

  useEffect(() => {
    filterPosts()
  }, [blogPosts, searchTerm, statusFilter])

  const fetchBlogPosts = async () => {
    try {
      // Mock data - in a real app, this would be an API call
      const mockPosts: BlogPost[] = [
        {
          id: '1',
          title: 'Montserrado County Dominates Opening Day',
          content: 'Montserrado County showed exceptional form on the opening day of the National County Sports Meet, securing victories in football, volleyball, and athletics...',
          image: '/images/blog1.jpg',
          author: { name: 'John Smith' },
          published: true,
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-01-15T10:30:00Z'
        },
        {
          id: '2',
          title: 'New Records Set in Athletics Competition',
          content: 'Several new records were established during the athletics competition, with athletes from Nimba County leading the charge...',
          image: '/images/blog2.jpg',
          author: { name: 'Sarah Johnson' },
          published: false,
          createdAt: '2024-01-14T14:20:00Z',
          updatedAt: '2024-01-14T14:20:00Z'
        },
        {
          id: '3',
          title: 'Volleyball Finals: A Thrilling Showdown',
          content: 'The volleyball finals between Bong and Grand Bassa counties provided spectators with an unforgettable display of skill and determination...',
          author: { name: 'Michael Brown' },
          published: true,
          createdAt: '2024-01-13T09:15:00Z',
          updatedAt: '2024-01-13T09:15:00Z'
        }
      ]

      setBlogPosts(mockPosts)
    } catch (error) {
      console.error('Error fetching blog posts:', error)
      toast.error('Failed to fetch blog posts')
    } finally {
      setIsLoading(false)
    }
  }

  const filterPosts = () => {
    let filtered = blogPosts

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(post => 
        statusFilter === 'published' ? post.published : !post.published
      )
    }

    setFilteredPosts(filtered)
  }

  const handlePublish = async (postId: string) => {
    try {
      // Mock API call
      setBlogPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, published: true }
          : post
      ))
      toast.success('Blog post published successfully')
    } catch (error) {
      toast.error('Failed to publish blog post')
    }
  }

  const handleUnpublish = async (postId: string) => {
    try {
      // Mock API call
      setBlogPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, published: false }
          : post
      ))
      toast.success('Blog post unpublished successfully')
    } catch (error) {
      toast.error('Failed to unpublish blog post')
    }
  }

  const handleDelete = async (postId: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        // Mock API call
        setBlogPosts(prev => prev.filter(post => post.id !== postId))
        toast.success('Blog post deleted successfully')
      } catch (error) {
        toast.error('Failed to delete blog post')
      }
    }
  }

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + '...'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!user || !['JOURNALIST', 'MYS_STAFF', 'GENERAL_ADMIN'].includes(user.role)) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Access Denied
            </h1>
            <p className="text-gray-600">
              You don't have permission to access this page.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Blog Management
              </h1>
              <p className="text-gray-600">
                Create and manage blog posts for the National County Sports Meet
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary flex items-center"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Create Post
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input-field"
              >
                <option value="all">All Posts</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>

              <button
                onClick={() => {
                  setSearchTerm('')
                  setStatusFilter('all')
                }}
                className="btn-outline flex items-center justify-center"
              >
                <FunnelIcon className="w-4 h-4 mr-2" />
                Clear Filters
              </button>
            </div>
          </div>

          {/* Blog Posts List */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Blog Posts ({filteredPosts.length})
              </h2>
            </div>

            {isLoading ? (
              <div className="p-6">
                <div className="animate-pulse space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-32 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredPosts.map((post) => (
                  <div key={post.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              post.published 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {post.published ? 'Published' : 'Draft'}
                            </span>
                            <span className="text-sm text-gray-500">
                              {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => {
                                setSelectedPost(post)
                                setShowModal(true)
                              }}
                              className="p-2 text-gray-400 hover:text-gray-600"
                            >
                              <EyeIcon className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedPost(post)
                                setShowModal(true)
                              }}
                              className="p-2 text-gray-400 hover:text-gray-600"
                            >
                              <PencilIcon className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(post.id)}
                              className="p-2 text-red-400 hover:text-red-600"
                            >
                              <TrashIcon className="w-5 h-5" />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-start space-x-4">
                          {post.image && (
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-24 h-24 object-cover rounded-lg"
                            />
                          )}
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {post.title}
                            </h3>
                            <p className="text-gray-600 mb-3">
                              {truncateContent(post.content)}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500">
                                By {post.author.name}
                              </span>
                              <div className="flex items-center space-x-2">
                                {post.published ? (
                                  <button
                                    onClick={() => handleUnpublish(post.id)}
                                    className="btn-outline text-sm"
                                  >
                                    <XMarkIcon className="w-4 h-4 mr-1" />
                                    Unpublish
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handlePublish(post.id)}
                                    className="btn-primary text-sm"
                                  >
                                    <CheckIcon className="w-4 h-4 mr-1" />
                                    Publish
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredPosts.length === 0 && (
                  <div className="p-12 text-center">
                    <NewspaperIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts found</h3>
                    <p className="text-gray-600">Try adjusting your filters to see more posts.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Blog Post Details Modal */}
      {showModal && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Blog Post Details
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <NewspaperIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {selectedPost.image && (
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                )}

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {selectedPost.title}
                  </h3>
                  <div className="flex items-center space-x-4 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedPost.published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedPost.published ? 'Published' : 'Draft'}
                    </span>
                    <span className="text-sm text-gray-500">
                      By {selectedPost.author.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(selectedPost.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {selectedPost.content}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="btn-outline"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    // Handle edit post
                    setShowModal(false)
                  }}
                  className="btn-primary"
                >
                  Edit Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
