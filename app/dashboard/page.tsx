'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { 
  UsersIcon, 
  TrophyIcon, 
  CalendarIcon, 
  NewspaperIcon,
  ChartBarIcon,
  CogIcon
} from '@heroicons/react/24/outline'

interface DashboardStats {
  totalPlayers: number
  totalOfficials: number
  totalMatches: number
  pendingApprovals: number
  recentResults: number
  blogPosts: number
}

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    totalPlayers: 0,
    totalOfficials: 0,
    totalMatches: 0,
    pendingApprovals: 0,
    recentResults: 0,
    blogPosts: 0
  })

  useEffect(() => {
    if (user) {
      fetchDashboardStats()
    }
  }, [user])

  const fetchDashboardStats = async () => {
    try {
      // Mock data - in a real app, this would be an API call
      const mockStats: DashboardStats = {
        totalPlayers: 245,
        totalOfficials: 67,
        totalMatches: 89,
        pendingApprovals: 12,
        recentResults: 23,
        blogPosts: 15
      }
      setStats(mockStats)
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    }
  }

  const getRoleBasedActions = () => {
    if (!user) return []

    switch (user.role) {
      case 'COUNTY_OFFICIAL':
        return [
          { name: 'Register Player', href: '/register/player', icon: UsersIcon, color: 'bg-blue-500' },
          { name: 'Register Official', href: '/register/official', icon: UsersIcon, color: 'bg-green-500' },
          { name: 'View County Players', href: '/admin/players', icon: UsersIcon, color: 'bg-purple-500' },
        ]
      case 'MATCH_OFFICIAL':
        return [
          { name: 'Submit Match Report', href: '/admin/reports/new', icon: ChartBarIcon, color: 'bg-red-500' },
          { name: 'View Assigned Matches', href: '/admin/matches', icon: CalendarIcon, color: 'bg-blue-500' },
        ]
      case 'LFA_OFFICIAL':
        return [
          { name: 'Review Players', href: '/admin/players', icon: UsersIcon, color: 'bg-yellow-500' },
          { name: 'Review Officials', href: '/admin/officials', icon: UsersIcon, color: 'bg-green-500' },
        ]
      case 'JOURNALIST':
        return [
          { name: 'Write Blog Post', href: '/admin/blog/new', icon: NewspaperIcon, color: 'bg-purple-500' },
          { name: 'Manage Blog', href: '/admin/blog', icon: NewspaperIcon, color: 'bg-blue-500' },
        ]
      case 'MYS_STAFF':
        return [
          { name: 'Manage Players', href: '/admin/players', icon: UsersIcon, color: 'bg-blue-500' },
          { name: 'Manage Matches', href: '/admin/matches', icon: CalendarIcon, color: 'bg-green-500' },
          { name: 'Manage Blog', href: '/admin/blog', icon: NewspaperIcon, color: 'bg-purple-500' },
          { name: 'System Settings', href: '/admin/settings', icon: CogIcon, color: 'bg-gray-500' },
        ]
      case 'GENERAL_ADMIN':
        return [
          { name: 'User Management', href: '/admin/users', icon: UsersIcon, color: 'bg-red-500' },
          { name: 'Manage Players', href: '/admin/players', icon: UsersIcon, color: 'bg-blue-500' },
          { name: 'Manage Matches', href: '/admin/matches', icon: CalendarIcon, color: 'bg-green-500' },
          { name: 'Manage Blog', href: '/admin/blog', icon: NewspaperIcon, color: 'bg-purple-500' },
          { name: 'System Settings', href: '/admin/settings', icon: CogIcon, color: 'bg-gray-500' },
        ]
      default:
        return []
    }
  }

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'COUNTY_OFFICIAL':
        return 'County Official'
      case 'MATCH_OFFICIAL':
        return 'Match Official'
      case 'LFA_OFFICIAL':
        return 'LFA Official'
      case 'JOURNALIST':
        return 'Journalist'
      case 'MYS_STAFF':
        return 'MYS Staff'
      case 'GENERAL_ADMIN':
        return 'General Administrator'
      default:
        return role
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
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

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Access Denied
            </h1>
            <p className="text-gray-600">
              Please log in to access the dashboard.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const actions = getRoleBasedActions()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user.email}
            </h1>
            <p className="text-gray-600">
              {getRoleDisplayName(user.role)} Dashboard
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <UsersIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Players</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalPlayers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <UsersIcon className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Officials</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalOfficials}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <CalendarIcon className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Matches</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalMatches}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <TrophyIcon className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pendingApprovals}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <ChartBarIcon className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Recent Results</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.recentResults}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <NewspaperIcon className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Blog Posts</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.blogPosts}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {actions.map((action) => (
                <a
                  key={action.name}
                  href={action.href}
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className={`p-2 rounded-lg ${action.color}`}>
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="ml-3 font-medium text-gray-900">{action.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">New player registration submitted</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Match result updated</p>
                  <p className="text-xs text-gray-500">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">New blog post published</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
