'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { 
  FaNewspaper, FaUpload, FaEdit, FaTrash, FaImage,
  FaFile, FaFileWord, FaFilePdf, FaEye, FaSave
} from 'react-icons/fa'

// Dynamic import of rich text editor to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

interface ContentItem {
  id: string
  title: string
  type: 'news' | 'blog' | 'page' | 'county-profile'
  status: 'draft' | 'published'
  author: string
  lastModified: string
  featuredImage?: string
}

interface Document {
  id: string
  name: string
  type: string
  size: number
  uploadDate: string
  category: string
}

export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState<'content' | 'documents' | 'media'>('content')
  const [contentItems, setContentItems] = useState<ContentItem[]>([
    {
      id: '1',
      title: 'Tournament Opening Ceremony',
      type: 'news',
      status: 'published',
      author: 'Admin',
      lastModified: '2025-09-05T10:30:00',
      featuredImage: '/images/ceremony.jpg'
    },
    // Add more content items
  ])

  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Tournament Guidelines 2025.pdf',
      type: 'application/pdf',
      size: 2500000,
      uploadDate: '2025-09-01T08:00:00',
      category: 'guidelines'
    },
    // Add more documents
  ])

  const [newContent, setNewContent] = useState({
    title: '',
    content: '',
    type: 'news',
    status: 'draft'
  })

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    if (bytes === 0) return '0 Bytes'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`
  }

  const getFileIcon = (type: string) => {
    if (type.includes('image')) return <FaImage className="text-blue-500" />
    if (type.includes('pdf')) return <FaFilePdf className="text-red-500" />
    if (type.includes('word')) return <FaFileWord className="text-blue-700" />
    return <FaFile className="text-gray-500" />
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Content Management</h1>
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'content'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab('content')}
          >
            Content
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'documents'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab('documents')}
          >
            Documents
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'media'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab('media')}
          >
            Media
          </button>
        </div>
      </div>

      {activeTab === 'content' && (
        <>
          {/* Content Editor */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter title..."
                className="w-full p-2 border rounded-lg"
                value={newContent.title}
                onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
                aria-label="Content title"
              />
              <div className="flex space-x-4">
                <select
                  className="p-2 border rounded-lg"
                  value={newContent.type}
                  onChange={(e) => setNewContent({ ...newContent, type: e.target.value })}
                  aria-label="Content type"
                >
                  <option value="news">News</option>
                  <option value="blog">Blog</option>
                  <option value="page">Page</option>
                  <option value="county-profile">County Profile</option>
                </select>
                <select
                  className="p-2 border rounded-lg"
                  value={newContent.status}
                  onChange={(e) => setNewContent({ ...newContent, status: e.target.value })}
                  aria-label="Content status"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div className="h-64">
                <ReactQuill
                  theme="snow"
                  value={newContent.content}
                  onChange={(content) => setNewContent({ ...newContent, content })}
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">
                  Preview
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                  Save
                </button>
              </div>
            </div>
          </div>

          {/* Content List */}
          <div className="bg-white rounded-lg shadow-lg">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Published Content</h2>
            </div>
            <div className="divide-y">
              {contentItems.map((item) => (
                <div key={item.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{item.type}</span>
                        <span>•</span>
                        <span>{item.author}</span>
                        <span>•</span>
                        <span>{new Date(item.lastModified).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit content"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        title="Delete content"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === 'documents' && (
        <div className="space-y-6">
          {/* Document Upload */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Drag and drop files here, or click to select files
              </p>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
                Select Files
              </button>
            </div>
          </div>

          {/* Documents List */}
          <div className="bg-white rounded-lg shadow-lg">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Uploaded Documents</h2>
            </div>
            <div className="divide-y">
              {documents.map((doc) => (
                <div key={doc.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {getFileIcon(doc.type)}
                      <div>
                        <h3 className="font-medium">{doc.name}</h3>
                        <p className="text-sm text-gray-500">
                          {formatFileSize(doc.size)} • Uploaded on{' '}
                          {new Date(doc.uploadDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        title="Download document"
                      >
                        <FaFile />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        title="Delete document"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'media' && (
        <div className="space-y-6">
          {/* Media Upload */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <FaImage className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Drag and drop images here, or click to select files
              </p>
              <p className="text-xs text-gray-500">
                Supports: JPG, PNG, GIF (Max: 5MB)
              </p>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
                Select Images
              </button>
            </div>
          </div>

          {/* Media Grid */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="relative group">
                  <img
                    src={`/images/sample-${i}.jpg`}
                    alt={`Media ${i}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-4">
                    <button
                      className="text-white hover:text-blue-200"
                      title="View image"
                    >
                      <FaEye />
                    </button>
                    <button
                      className="text-white hover:text-red-200"
                      title="Delete image"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
