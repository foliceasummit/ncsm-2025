// RealTimeUpdates component temporarily disabled for initial deployment
// Will be re-enabled when Socket.IO functionality is implemented

'use client'

import { useEffect, useState } from 'react'
// import { io, Socket } from 'socket.io-client'
import toast from 'react-hot-toast'
import { 
  BellIcon,
  XMarkIcon,
  TrophyIcon,
  UserIcon,
  NewspaperIcon
} from '@heroicons/react/24/outline'

interface Notification {
  id: string
  type: 'score' | 'status' | 'player' | 'official' | 'blog'
  title: string
  message: string
  timestamp: Date
}

export default function RealTimeUpdates() {
  // Component temporarily disabled
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-full p-3 shadow-lg">
        <BellIcon className="w-6 h-6 text-gray-400" />
      </div>
    </div>
  )
}

// Full functionality will be restored when Socket.IO is implemented
/*
  const [socket, setSocket] = useState<Socket | null>(null)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showNotifications, setShowNotifications] = useState(false)

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('http://localhost:3001')
    setSocket(newSocket)

    // Socket event listeners
    newSocket.on('score-updated', (data) => {
      const notification: Notification = {
        id: Date.now().toString(),
        type: 'score',
        title: 'Score Updated',
        message: `Match score updated: ${data.homeScore} - ${data.awayScore}`,
        timestamp: new Date()
      }
      addNotification(notification)
    })

    newSocket.on('match-status-updated', (data) => {
      const notification: Notification = {
        id: Date.now().toString(),
        type: 'status',
        title: 'Match Status Updated',
        message: `Match status changed to: ${data.status}`,
        timestamp: new Date()
      }
      addNotification(notification)
    })

    newSocket.on('player-approval-updated', (data) => {
      const notification: Notification = {
        id: Date.now().toString(),
        type: 'player',
        title: 'Player Approved',
        message: `Player ${data.playerName} has been approved`,
        timestamp: new Date()
      }
      addNotification(notification)
    })

    newSocket.on('official-approval-updated', (data) => {
      const notification: Notification = {
        id: Date.now().toString(),
        type: 'official',
        title: 'Official Approved',
        message: `Official ${data.officialName} has been approved`,
        timestamp: new Date()
      }
      addNotification(notification)
    })

    newSocket.on('blog-post-created', (data) => {
      const notification: Notification = {
        id: Date.now().toString(),
        type: 'blog',
        title: 'New Blog Post',
        message: `New blog post published: ${data.title}`,
        timestamp: new Date()
      }
      addNotification(notification)
    })

    return () => {
      newSocket.close()
    }
  }, [])

  const addNotification = (notification: Notification) => {
    setNotifications(prev => [notification, ...prev.slice(0, 4)]) // Keep only last 5 notifications
    toast.success(notification.message, {
      duration: 4000,
      position: 'top-right',
    })
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'score':
        return <TrophyIcon className="w-5 h-5 text-green-600" />
      case 'status':
        return <TrophyIcon className="w-5 h-5 text-blue-600" />
      case 'player':
        return <UserIcon className="w-5 h-6 text-purple-600" />
      case 'official':
        return <UserIcon className="w-5 h-5 text-orange-600" />
      case 'blog':
        return <NewspaperIcon className="w-5 h-5 text-indigo-600" />
      default:
        return <BellIcon className="w-5 h-5 text-gray-600" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'score':
        return 'bg-green-50 border-green-200'
      case 'status':
        return 'bg-blue-50 border-blue-200'
      case 'player':
        return 'bg-purple-50 border-purple-200'
      case 'official':
        return 'bg-orange-50 border-orange-200'
      case 'blog':
        return 'bg-indigo-50 border-indigo-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Notification Bell */}
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
      >
        <BellIcon className="w-6 h-6 text-gray-600" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Live Updates</h3>
            <p className="text-sm text-gray-600">Real-time notifications</p>
          </div>
          
          <div className="max-h-64 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <BellIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>No notifications yet</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-l-4 ${getNotificationColor(notification.type)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">
                            {notification.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            {notification.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeNotification(notification.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {notifications.length > 0 && (
            <div className="p-3 border-t border-gray-200">
              <button
                onClick={() => setNotifications([])}
                className="w-full text-sm text-gray-600 hover:text-gray-800"
              >
                Clear all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
*/
