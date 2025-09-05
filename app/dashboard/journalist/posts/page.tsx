'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import dynamic from 'next/dynamic'
import { useDropzone } from 'react-dropzone'
import { format } from 'date-fns'

// Dynamic import of ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <div className="h-64 w-full bg-gray-100 animate-pulse rounded-lg" />
})

interface Post {
  id: string
  title: string
  content: string
  image?: string
  category: string
  tags: string[]
  published: boolean
  createdAt: string
  updatedAt: string
}

const CATEGORIES = [
  'Match Report',
  'Player Profile',
  'Tournament Update',
  'Team Analysis',
  'Interview',
  'News',
  'Opinion'
]

export default function JournalistDashboard() {
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: CATEGORIES[0],
    tags: [] as string[],
    image: '',
    published: false
  })
  const [tagInput, setTagInput] = useState('')

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'video/*': ['.mp4', '.webm']
    },
    maxSize: 10485760, // 10MB
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (file) {
        try {
          const formData = new FormData()
          formData.append('file', file)
          
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          })
          
          if (response.ok) {
            const { url } = await response.json()
            setFormData(prev => ({ ...prev, image: url }))
            toast.success('Media uploaded successfully')
          } else {
            toast.error('Failed to upload media')
          }
        } catch (error) {
          toast.error('Error uploading media')
        }
      }
    }
  })

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      if (response.ok) {
        const data = await response.json()
        setPosts(data)
      }
    } catch (error) {
      toast.error('Failed to fetch posts')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success('Post created successfully')
        setIsCreating(false)
        fetchPosts()
        setFormData({
          title: '',
          content: '',
          category: CATEGORIES[0],
          tags: [],
          image: '',
          published: false
        })
      } else {
        toast.error('Failed to create post')
      }
    } catch (error) {
      toast.error('Error creating post')
    }
  }

  const handleTagAdd = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }))
      }
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const toolbarOptions = [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'align': [] }],
    ['link', 'image', 'video'],
    ['clean']
  ]

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Articles Dashboard</h1>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Create New Article
        </button>
      </div>

      {isCreating ? (
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                {CATEGORIES.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={handleTagAdd}
                placeholder="Type a tag and press Enter"
                className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Media Upload
              </label>
              <div
                {...getRootProps()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500"
              >
                <input {...getInputProps()} />
                {formData.image ? (
                  <div className="space-y-2">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="max-h-40 mx-auto"
                    />
                    <p className="text-sm text-gray-500">Click or drag to replace</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p>Drag and drop an image/video here, or click to select</p>
                    <p className="text-sm text-gray-500">Max size: 10MB</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <ReactQuill
                value={formData.content}
                onChange={content => setFormData(prev => ({ ...prev, content }))}
                modules={{
                  toolbar: toolbarOptions
                }}
                className="h-64 mb-12"
              />
            </div>

            <div className="flex items-center space-x-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Save as Draft
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, published: true }))}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              >
                Publish
              </button>
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{format(new Date(post.createdAt), 'MMM d, yyyy')}</span>
                    <span className={post.published ? 'text-green-600' : 'text-yellow-600'}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => router.push(`/dashboard/journalist/posts/${post.id}`)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
