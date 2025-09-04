'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import { 
  UserPlus, 
  Users, 
  FileText, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Download,
  Calendar,
  Trophy,
  Shield,
  FileImage,
  FileCheck,
  Heart
} from 'lucide-react'

interface Player {
  id: string
  firstName: string
  lastName: string
  discipline: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  photo?: string
  birthCertificate?: string
  medicalCertificate?: string
  documentsNeeded: string[]
}

interface Official {
  id: string
  firstName: string
  lastName: string
  discipline: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  photo?: string
  documentsNeeded: string[]
}

export default function CountyOfficialDashboard() {
  const { user, isLoading } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [players, setPlayers] = useState<Player[]>([])
  const [officials, setOfficials] = useState<Official[]>([])
  const [registrationDeadline, setRegistrationDeadline] = useState<Date>(new Date('2025-02-15'))
  const [countdown, setCountdown] = useState('')
  const [countyName, setCountyName] = useState<string>('')
  const [isLoadingData, setIsLoadingData] = useState(true)

  // Security check - only COUNTY_OFFICIAL users can access this dashboard
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user || user.role !== 'COUNTY_OFFICIAL') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-xl shadow-lg p-8 text-center">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-red-800 mb-2">Access Denied</h2>
            <p className="text-red-600">Only County Officials can access this dashboard.</p>
          </div>
        </div>
      </div>
    )
  }

  // Fetch county-specific data
  useEffect(() => {
    if (!user || !user.countyId) {
      setIsLoadingData(false)
      return
    }

    const fetchCountyData = async () => {
      try {
        setIsLoadingData(true)
        
        // Fetch county information
        const countyResponse = await fetch(`/api/counties/${user.countyId}`)
        if (countyResponse.ok) {
          const countyData = await countyResponse.json()
          setCountyName(countyData.name)
        }

        // Fetch players for this county
        const playersResponse = await fetch(`/api/players?countyId=${user.countyId}`)
        if (playersResponse.ok) {
          const playersData = await playersResponse.json()
          setPlayers(playersData)
        }

        // Fetch officials for this county
        const officialsResponse = await fetch(`/api/officials?countyId=${user.countyId}`)
        if (officialsResponse.ok) {
          const officialsData = await officialsResponse.json()
          setOfficials(officialsData)
        }
      } catch (error) {
        console.error('Error fetching county data:', error)
        // Fallback to empty arrays if API fails
        setPlayers([])
        setOfficials([])
      } finally {
        setIsLoadingData(false)
      }
    }

    fetchCountyData()

    // Calculate countdown
    const updateCountdown = () => {
      const now = new Date()
      const diff = registrationDeadline.getTime() - now.getTime()
      
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        setCountdown(`${days}d ${hours}h`)
      } else {
        setCountdown('CLOSED')
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000 * 60 * 60) // Update every hour

    return () => clearInterval(interval)
  }, [registrationDeadline])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED': return 'text-green-600 bg-green-100'
      case 'PENDING': return 'text-yellow-600 bg-yellow-100'
      case 'REJECTED': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APPROVED': return <CheckCircle className="w-4 h-4" />
      case 'PENDING': return <Clock className="w-4 h-4" />
      case 'REJECTED': return <XCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const generatePlayerCard = (playerId: string) => {
    // Implementation for generating player card
    console.log('Generating player card for:', playerId)
    // This would typically generate a PDF or image
  }

  const submitGameList = (discipline: string) => {
    // Implementation for submitting game list
    console.log('Submitting game list for:', discipline)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {countyName ? `${countyName} County Dashboard` : 'County Dashboard'}
          </h1>
          <p className="text-gray-600">
            {countyName 
              ? `Manage ${countyName} County's players, officials, and registrations`
              : 'Manage your county\'s players, officials, and registrations'
            }
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoadingData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-lg p-8 mb-8 text-center"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading county data...</p>
          </motion.div>
        )}

        {/* No County Access */}
        {!isLoadingData && (!user || !user.countyId) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 border border-red-200 rounded-xl shadow-lg p-8 mb-8 text-center"
          >
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-red-800 mb-2">Access Restricted</h2>
            <p className="text-red-600">You don't have access to any county dashboard. Please contact an administrator.</p>
          </motion.div>
        )}

        {/* Main Dashboard Content - Only show if user has county access */}
        {!isLoadingData && user && user.countyId && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Players</p>
                <p className="text-2xl font-bold text-gray-900">{players.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Officials</p>
                <p className="text-2xl font-bold text-gray-900">{officials.length}</p>
              </div>
              <Shield className="w-8 h-8 text-green-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                <p className="text-2xl font-bold text-gray-900">
                  {players.filter(p => p.status === 'PENDING').length + officials.filter(o => o.status === 'PENDING').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Registration Deadline</p>
                <p className="text-lg font-bold text-gray-900">{countdown}</p>
              </div>
              <Calendar className="w-8 h-8 text-red-500" />
            </div>
          </motion.div>
        </div>

        {/* Registration Deadline Alert */}
        {countdown !== 'CLOSED' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8"
          >
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">
                  Registration Deadline Alert
                </h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Player and official registration closes in {countdown}. Complete all submissions before the deadline.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: Trophy },
                { id: 'players', label: 'Players', icon: Users },
                { id: 'officials', label: 'Officials', icon: Shield },
                { id: 'documents', label: 'Documents', icon: FileText },
                { id: 'game-lists', label: 'Game Lists', icon: Calendar }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Quick Actions */}
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                        <UserPlus className="w-4 h-4" />
                        <span>Register New Player</span>
                      </button>
                      <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                        <Shield className="w-4 h-4" />
                        <span>Register New Official</span>
                      </button>
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Registration Statistics</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Football Players:</span>
                        <span className="font-semibold">{players.filter(p => p.discipline === 'FOOTBALL').length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Basketball Players:</span>
                        <span className="font-semibold">{players.filter(p => p.discipline === 'BASKETBALL').length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Volleyball Players:</span>
                        <span className="font-semibold">{players.filter(p => p.discipline === 'VOLLEYBALL').length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Kickball Players:</span>
                        <span className="font-semibold">{players.filter(p => p.discipline === 'KICKBALL').length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Players Tab */}
            {activeTab === 'players' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Player Management</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <UserPlus className="w-4 h-4" />
                    <span>Add New Player</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discipline</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {players.map((player) => (
                        <tr key={player.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                {player.photo ? (
                                  <img src={player.photo} alt="" className="h-10 w-10 rounded-full" />
                                ) : (
                                  <UserPlus className="w-5 h-5 text-gray-400" />
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {player.firstName} {player.lastName}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {player.discipline}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(player.status)}`}>
                              <div className="flex items-center space-x-1">
                                {getStatusIcon(player.status)}
                                <span>{player.status}</span>
                              </div>
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex space-x-2">
                              {player.photo ? (
                                <div className="relative group">
                                  <FileImage className="w-4 h-4 text-green-500" />
                                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    Photo uploaded
                                  </div>
                                </div>
                              ) : (
                                <div className="relative group">
                                  <FileImage className="w-4 h-4 text-red-500" />
                                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    Photo needed
                                  </div>
                                </div>
                              )}
                              {player.birthCertificate ? (
                                <div className="relative group">
                                  <FileCheck className="w-4 h-4 text-green-500" />
                                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    Birth Certificate uploaded
                                  </div>
                                </div>
                              ) : (
                                <div className="relative group">
                                  <FileCheck className="w-4 h-4 text-red-500" />
                                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    Birth Certificate needed
                                  </div>
                                </div>
                              )}
                              {player.medicalCertificate ? (
                                <div className="relative group">
                                  <Heart className="w-4 h-4 text-green-500" />
                                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    Medical Certificate uploaded
                                  </div>
                                </div>
                              ) : (
                                <div className="relative group">
                                  <Heart className="w-4 h-4 text-red-500" />
                                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    Medical Certificate needed
                                  </div>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => generatePlayerCard(player.id)}
                                className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                              >
                                <Download className="w-4 h-4" />
                                <span>Card</span>
                              </button>
                              <button className="text-green-600 hover:text-green-900">Edit</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Officials Tab */}
            {activeTab === 'officials' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Official Management</h3>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>Add New Official</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Official</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discipline</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {officials.map((official) => (
                        <tr key={official.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                {official.photo ? (
                                  <img src={official.photo} alt="" className="h-10 w-10 rounded-full" />
                                ) : (
                                  <Shield className="w-5 h-5 text-gray-400" />
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {official.firstName} {official.lastName}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {official.discipline}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(official.status)}`}>
                              <div className="flex items-center space-x-1">
                                {getStatusIcon(official.status)}
                                <span>{official.status}</span>
                              </div>
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex space-x-2">
                              {official.photo ? (
                                <div className="relative group">
                                  <FileImage className="w-4 h-4 text-green-500" />
                                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    Photo uploaded
                                  </div>
                                </div>
                              ) : (
                                <div className="relative group">
                                  <FileImage className="w-4 h-4 text-red-500" />
                                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    Photo needed
                                  </div>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-green-600 hover:text-green-900">Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-900">Document Management</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Pending Documents */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <Clock className="w-6 h-6 text-yellow-600 mr-2" />
                      <h4 className="text-lg font-semibold text-yellow-800">Pending Documents</h4>
                    </div>
                    <div className="space-y-3">
                      {players.filter(p => p.status === 'PENDING').map(player => (
                        <div key={player.id} className="bg-white rounded-lg p-3">
                          <p className="font-medium text-gray-900">{player.firstName} {player.lastName}</p>
                          <p className="text-sm text-gray-600">{player.discipline}</p>
                          <div className="mt-2">
                            <p className="text-xs text-yellow-600">Needs: {player.documentsNeeded.join(', ')}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rejected Documents */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <XCircle className="w-6 h-6 text-red-600 mr-2" />
                      <h4 className="text-lg font-semibold text-red-800">Rejected Documents</h4>
                    </div>
                    <div className="space-y-3">
                      {players.filter(p => p.status === 'REJECTED').map(player => (
                        <div key={player.id} className="bg-white rounded-lg p-3">
                          <p className="font-medium text-gray-900">{player.firstName} {player.lastName}</p>
                          <p className="text-sm text-gray-600">{player.discipline}</p>
                          <div className="mt-2">
                            <p className="text-xs text-red-600">Action needed: {player.documentsNeeded.join(', ')}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Approved Documents */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                      <h4 className="text-lg font-semibold text-green-800">Approved Documents</h4>
                    </div>
                    <div className="space-y-3">
                      {players.filter(p => p.status === 'APPROVED').map(player => (
                        <div key={player.id} className="bg-white rounded-lg p-3">
                          <p className="font-medium text-gray-900">{player.firstName} {player.lastName}</p>
                          <p className="text-sm text-gray-600">{player.discipline}</p>
                          <div className="mt-2">
                            <p className="text-xs text-green-600">All documents verified</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Game Lists Tab */}
            {activeTab === 'game-lists' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-900">Game List Submission</h3>
                <p className="text-gray-600">Submit your player lists 1 hour before each game for inspection.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {['FOOTBALL', 'BASKETBALL', 'VOLLEYBALL', 'KICKBALL'].map((discipline) => (
                    <div key={discipline} className="bg-white border border-gray-200 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">{discipline}</h4>
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600">
                          Players: {players.filter(p => p.discipline === discipline).length}
                        </p>
                        <button
                          onClick={() => submitGameList(discipline)}
                          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          Submit Game List
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
        </>
      )}
      </div>
    </div>
  )
}
