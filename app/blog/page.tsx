'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { CalendarIcon, UserIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  image?: string
  category: string
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  const fetchBlogPosts = async () => {
    try {
      // Mock data - in a real app, this would be an API call
      const mockPosts: BlogPost[] = [
        {
          id: '1',
          title: 'Opening Ceremony Sets New Standards for County Sports Meet',
          excerpt: 'The 2024 National County Sports Meet kicked off with a spectacular opening ceremony that brought together athletes from all 15 counties in a celebration of unity and sportsmanship.',
          content: 'Full article content here...',
          author: 'Sports Reporter',
          publishedAt: '2024-01-15',
          image: '/images/blog-1.jpg',
          category: 'EVENTS'
        },
        {
          id: '2',
          title: 'Montserrado Dominates First Week of Competition',
          excerpt: 'Montserrado County has shown exceptional form in the opening week, securing victories across multiple disciplines and establishing themselves as early favorites.',
          content: 'Full article content here...',
          author: 'Match Analyst',
          publishedAt: '2024-01-16',
          image: '/images/blog-2.jpg',
          category: 'RESULTS'
        },
        {
          id: '3',
          title: 'Young Athletes Shine in Track and Field Events',
          excerpt: 'The athletics competition has been a highlight of this year\'s meet, with several young athletes breaking records and showcasing Liberia\'s future sporting talent.',
          content: 'Full article content here...',
          author: 'Athletics Correspondent',
          publishedAt: '2024-01-17',
          image: '/images/blog-3.jpg',
          category: 'ATHLETICS'
        },
        {
          id: '4',
          title: 'Volleyball Tournament Heats Up in Group Stages',
          excerpt: 'The volleyball competition has been fiercely contested, with several counties showing strong performances and creating exciting matchups.',
          content: 'Full article content here...',
          author: 'Volleyball Expert',
          publishedAt: '2024-01-18',
          image: '/images/blog-4.jpg',
          category: 'VOLLEYBALL'
        },
        {
          id: '5',
          title: 'Behind the Scenes: The Organizers Making It All Possible',
          excerpt: 'Meet the dedicated team of organizers, volunteers, and officials who work tirelessly to ensure the smooth running of the National County Sports Meet.',
          content: 'Full article content here...',
          author: 'Feature Writer',
          publishedAt: '2024-01-19',
          image: '/images/blog-5.jpg',
          category: 'FEATURES'
        }
      ]

      setPosts(mockPosts)
    } catch (error) {
      console.error('Error fetching blog posts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredPosts = posts.filter(post => {
    if (selectedCategory !== 'all' && post.category !== selectedCategory) return false
    return true
  })

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'EVENTS', label: 'Events' },
    { value: 'RESULTS', label: 'Results' },
    { value: 'ATHLETICS', label: 'Athletics' },
    { value: 'VOLLEYBALL', label: 'Volleyball' },
    { value: 'FOOTBALL', label: 'Football' },
    { value: 'FEATURES', label: 'Features' },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'EVENTS':
        return 'bg-blue-100 text-blue-800'
      case 'RESULTS':
        return 'bg-green-100 text-green-800'
      case 'ATHLETICS':
        return 'bg-purple-100 text-purple-800'
      case 'VOLLEYBALL':
        return 'bg-orange-100 text-orange-800'
      case 'FOOTBALL':
        return 'bg-red-100 text-red-800'
      case 'FEATURES':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-md p-6">
                    <div className="h-48 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            </div>
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
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Blog & News
            </h1>
            <p className="text-lg text-gray-600">
              Latest updates, stories, and insights from the National County Sports Meet
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          {filteredPosts.length > 0 && (
            <div className="mb-12">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={filteredPosts[0].image || '/images/default-blog.jpg'}
                      alt={filteredPosts[0].title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <div className="flex items-center mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(filteredPosts[0].category)}`}>
                        {filteredPosts[0].category}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      {filteredPosts[0].title}
                    </h2>
                    <p className="text-gray-600 mb-6">
                      {filteredPosts[0].excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <UserIcon className="w-4 h-4 mr-2" />
                        {filteredPosts[0].author}
                        <CalendarIcon className="w-4 h-4 ml-4 mr-2" />
                        {new Date(filteredPosts[0].publishedAt).toLocaleDateString()}
                      </div>
                      <Link
                        href={`/blog/${filteredPosts[0].id}`}
                        className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Read More
                        <ArrowRightIcon className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(1).map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={post.image || '/images/default-blog.jpg'}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <UserIcon className="w-4 h-4 mr-1" />
                      {post.author}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center mt-4 text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Read More
                    <ArrowRightIcon className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-400 text-2xl">📰</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">Try selecting a different category to see more articles.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
