'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FaFile, FaImage, FaFilePdf, FaFileWord, FaTrash } from 'react-icons/fa'

interface UploadedFile {
  id: string
  name: string
  type: string
  size: number
  category: string
  uploadDate: string
  url: string
}

export default function ContentManagement() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Handle file upload logic here
    const newFiles = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type,
      size: file.size,
      category: 'uncategorized',
      uploadDate: new Date().toISOString(),
      url: URL.createObjectURL(file)
    }))
    setFiles(prev => [...prev, ...newFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    }
  })

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <FaImage className="w-6 h-6 text-blue-500" />
    if (type.includes('pdf')) return <FaFilePdf className="w-6 h-6 text-red-500" />
    if (type.includes('word')) return <FaFileWord className="w-6 h-6 text-blue-700" />
    return <FaFile className="w-6 h-6 text-gray-500" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Content Management</h1>
        <select
          className="border p-2 rounded-lg"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          aria-label="Filter by category"
        >
          <option value="all">All Categories</option>
          <option value="schedule">Schedule</option>
          <option value="results">Results</option>
          <option value="media">Media</option>
          <option value="guidelines">Guidelines</option>
        </select>
      </div>

      {/* Upload Section */}
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-8 text-center mb-8 cursor-pointer
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
      >
        <input {...getInputProps()} />
        <div className="space-y-4">
          <FaFile className="w-12 h-12 text-gray-400 mx-auto" />
          <div>
            {isDragActive ? (
              <p className="text-lg">Drop the files here ...</p>
            ) : (
              <>
                <p className="text-lg">Drag and drop files here, or click to select files</p>
                <p className="text-sm text-gray-500">Supports: Images, PDFs, and Word documents</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Files List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Uploaded Files</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {files.map((file) => (
            <div key={file.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getFileIcon(file.type)}
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {formatFileSize(file.size)} • Uploaded on {new Date(file.uploadDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <select
                    value={file.category}
                    onChange={(e) => {
                      const newFiles = files.map(f => 
                        f.id === file.id ? { ...f, category: e.target.value } : f
                      )
                      setFiles(newFiles)
                    }}
                    className="border rounded p-1"
                    aria-label="Select file category"
                  >
                    <option value="uncategorized">Uncategorized</option>
                    <option value="schedule">Schedule</option>
                    <option value="results">Results</option>
                    <option value="media">Media</option>
                    <option value="guidelines">Guidelines</option>
                  </select>
                  <button
                    onClick={() => {
                      const newFiles = files.filter(f => f.id !== file.id)
                      setFiles(newFiles)
                    }}
                    className="text-red-600 hover:text-red-800"
                    title="Delete file"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {files.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No files uploaded yet
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
