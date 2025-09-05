'use client'

import { useState } from 'react'
import { FaBullhorn, FaEdit, FaTrash } from 'react-icons/fa'

interface Announcement {
  id: string
  title: string
  content: string
  type: 'General' | 'Results' | 'Schedule' | 'Important'
  publishDate: string
  author: string
  status: 'Draft' | 'Published'
}

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'Tournament Opening Ceremony',
      content: 'The opening ceremony will be held at the SKD Sports Complex...',
      type: 'Important',
      publishDate: '2025-09-05',
      author: 'MYS Staff',
      status: 'Published'
    },
    // Add more sample announcements
  ])

  const [showNewAnnouncementForm, setShowNewAnnouncementForm] = useState(false)
  const [newAnnouncement, setNewAnnouncement] = useState<Partial<Announcement>>({
    type: 'General',
    status: 'Draft'
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Important':
        return 'bg-red-100 text-red-800'
      case 'Results':
        return 'bg-green-100 text-green-800'
      case 'Schedule':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleSaveAnnouncement = () => {
    if (newAnnouncement.title && newAnnouncement.content) {
      const announcement: Announcement = {
        id: Math.random().toString(36).substr(2, 9),
        title: newAnnouncement.title,
        content: newAnnouncement.content,
        type: newAnnouncement.type as 'General',
        publishDate: new Date().toISOString(),
        author: 'MYS Staff',
        status: newAnnouncement.status as 'Draft'
      }
      setAnnouncements(prev => [announcement, ...prev])
      setShowNewAnnouncementForm(false)
      setNewAnnouncement({ type: 'General', status: 'Draft' })
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Announcements</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          onClick={() => setShowNewAnnouncementForm(true)}
        >
          <FaBullhorn />
          <span>New Announcement</span>
        </button>
      </div>

      {/* New Announcement Form */}
      {showNewAnnouncementForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Create New Announcement</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                className="w-full border rounded-lg p-2"
                value={newAnnouncement.title || ''}
                onChange={(e) => setNewAnnouncement(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter announcement title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                className="w-full border rounded-lg p-2 h-32"
                value={newAnnouncement.content || ''}
                onChange={(e) => setNewAnnouncement(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Enter announcement content"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  className="w-full border rounded-lg p-2"
                  value={newAnnouncement.type}
                  onChange={(e) => setNewAnnouncement(prev => ({ ...prev, type: e.target.value as 'General' | 'Results' | 'Schedule' | 'Important' }))}
                  aria-label="Announcement type"
                >
                  <option value="General">General</option>
                  <option value="Important">Important</option>
                  <option value="Results">Results</option>
                  <option value="Schedule">Schedule</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  className="w-full border rounded-lg p-2"
                  value={newAnnouncement.status}
                  onChange={(e) => setNewAnnouncement(prev => ({ ...prev, status: e.target.value as 'Draft' | 'Published' }))}
                  aria-label="Announcement status"
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                onClick={() => setShowNewAnnouncementForm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={handleSaveAnnouncement}
              >
                Save Announcement
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Announcements List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y divide-gray-200">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="p-6 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium">{announcement.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeColor(announcement.type)}`}>
                      {announcement.type}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      announcement.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {announcement.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-2">{announcement.content}</p>
                  <div className="mt-2 text-sm text-gray-500">
                    Posted by {announcement.author} on {new Date(announcement.publishDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit announcement"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    title="Delete announcement"
                    onClick={() => {
                      const newAnnouncements = announcements.filter(a => a.id !== announcement.id)
                      setAnnouncements(newAnnouncements)
                    }}
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
  )
}
