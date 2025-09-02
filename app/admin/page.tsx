'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Users, 
  UserPlus, 
  Shield, 
  FileTextIcon, 
  Settings, 
  BarChart3, 
  Calendar,
  Upload,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  Database,
  Lock,
  Home,
  Newspaper,
  Video,
  Image,
  LogOut
} from 'lucide-react';
import Navigation from '../components/layout/Navigation'
import Footer from '../components/layout/Footer'

interface AdminStats {
  totalMatches: number
  totalPlayers: number
  totalCounties: number
  upcomingMatches: number
  completedMatches: number
  liveMatches: number
}

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  const [loginError, setLoginError] = useState('')

  // Mock admin stats
  const adminStats: AdminStats = {
    totalMatches: 48,
    totalPlayers: 1200,
    totalCounties: 15,
    upcomingMatches: 12,
    completedMatches: 32,
    liveMatches: 4
  }

  // Check authentication on mount
  useEffect(() => {
    // Simulate checking authentication status
    const checkAuth = setTimeout(() => {
      setIsLoading(false)
      // For demo purposes, we'll start with not authenticated
      setIsAuthenticated(false)
    }, 1000)

    return () => clearTimeout(checkAuth)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setLoginError('')

    // Simulate authentication
    setTimeout(() => {
      if (loginData.email === 'admin@ncsm.lr' && loginData.password === 'password123') {
        setIsAuthenticated(true)
        setLoginError('')
      } else {
        setLoginError('Invalid credentials. Please try again.')
      }
      setIsLoading(false)
    }, 1500)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setLoginData({ email: '', password: '' })
    setLoginError('')
  }

  // Admin Dashboard Content
  const AdminDashboard = () => (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-16 lg:pt-20">
        {/* Header */}
        <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-8">
          <div className="container-custom">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                  <p className="text-white/80">National County Sports Meet Management</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </section>

        {/* Stats Overview */}
        <section className="py-8 bg-white">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-80">Total Matches</p>
                    <p className="text-2xl font-bold">{adminStats.totalMatches}</p>
                  </div>
                  <Calendar className="w-8 h-8 opacity-80" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-80">Total Players</p>
                    <p className="text-2xl font-bold">{adminStats.totalPlayers}</p>
                  </div>
                  <Users className="w-8 h-8 opacity-80" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-80">Counties</p>
                    <p className="text-2xl font-bold">{adminStats.totalCounties}</p>
                  </div>
                  <Trophy className="w-8 h-8 opacity-80" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-80">Upcoming</p>
                    <p className="text-2xl font-bold">{adminStats.upcomingMatches}</p>
                  </div>
                  <Activity className="w-8 h-8 opacity-80" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-80">Live Matches</p>
                    <p className="text-2xl font-bold">{adminStats.liveMatches}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 opacity-80" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-6 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-80">Completed</p>
                    <p className="text-2xl font-bold">{adminStats.completedMatches}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 opacity-80" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Admin Navigation */}
        <section className="py-8 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Manage Matches',
                  description: 'Schedule, update, and manage all tournament matches',
                  icon: Calendar,
                  href: '/admin/matches',
                  color: 'from-blue-500 to-blue-600'
                },
                {
                  title: 'Player Management',
                  description: 'Add, edit, and manage player registrations',
                  icon: Users,
                  href: '/admin/players',
                  color: 'from-green-500 to-green-600'
                },
                {
                  title: 'Officials & Referees',
                  description: 'Manage tournament officials and referees',
                  icon: Shield,
                  href: '/admin/officials',
                  color: 'from-purple-500 to-purple-600'
                },
                {
                  title: 'Reports & Analytics',
                  description: 'View detailed reports and tournament statistics',
                  icon: BarChart3,
                  href: '/admin/reports',
                  color: 'from-yellow-500 to-yellow-600'
                },
                {
                  title: 'Blog & News',
                  description: 'Manage tournament news and announcements',
                  icon: FileTextIcon,
                  href: '/admin/blog',
                  color: 'from-red-500 to-red-600'
                },
                {
                  title: 'Match Reports',
                  description: 'Submit and manage match official reports',
                  icon: FileTextIcon,
                  href: '/admin/match-report',
                  color: 'from-green-500 to-green-600'
                },
                {
                  title: 'System Settings',
                  description: 'Configure system preferences and settings',
                  icon: Settings,
                  href: '/admin/settings',
                  color: 'from-indigo-500 to-indigo-600'
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                >
                  <Link href={item.href}>
                    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 group cursor-pointer">
                      <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="py-8 bg-white">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="space-y-4">
                {[
                  { action: 'Match Result Updated', details: 'Montserrado vs Nimba - Final Score: 2-1', time: '2 minutes ago', type: 'success' },
                  { action: 'New Player Registered', details: 'John Doe added to Bong County team', time: '15 minutes ago', type: 'info' },
                  { action: 'Match Scheduled', details: 'Grand Bassa vs Lofa - Tomorrow 3:00 PM', time: '1 hour ago', type: 'warning' },
                  { action: 'System Maintenance', details: 'Database backup completed successfully', time: '2 hours ago', type: 'success' }
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm"
                  >
                    <div className={`w-3 h-3 rounded-full ${
                      activity.type === 'success' ? 'bg-green-500' :
                      activity.type === 'warning' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.details}</p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )

  // Admin Login Form
  const AdminLogin = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Modern Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Modern Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div 
            className="w-20 h-20 bg-gradient-to-br from-red-500 to-purple-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Shield className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white mb-3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Admin Access
          </motion.h1>
          <motion.p 
            className="text-lg text-slate-300"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Secure administrator login for NCSM management
          </motion.p>
        </motion.div>

        {/* Modern Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20"
        >
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="admin-email" className="block text-sm font-semibold text-white/90">
                Admin Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-red-400 transition-colors" />
                </div>
                <input
                  id="admin-email"
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 group-hover:bg-white/15"
                  placeholder="admin@ncsm.lr"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="admin-password" className="block text-sm font-semibold text-white/90">
                Admin Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-red-400 transition-colors" />
                </div>
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 group-hover:bg-white/15"
                  placeholder="Enter admin password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {loginError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500/30 rounded-xl p-3"
              >
                <div className="flex items-center space-x-2 text-red-300 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{loginError}</span>
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-red-600 to-purple-600 text-white py-4 px-6 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Authenticating...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  Access Admin Panel
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </motion.button>
          </form>

          {/* Back to Login Link */}
          <motion.div 
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <a
              href="/login"
              className="inline-flex items-center text-slate-300 hover:text-white transition-all duration-300 group"
            >
              <ArrowRight className="w-4 h-4 mr-2 rotate-180 group-hover:scale-110 transition-transform" />
              <span className="group-hover:underline">Back to Login</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Loading Admin Panel...</p>
        </div>
      </div>
    )
  }

  return isAuthenticated ? <AdminDashboard /> : <AdminLogin />
}
