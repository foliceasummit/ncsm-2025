'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import Navigation from '../../components/layout/Navigation'
import Footer from '../../components/layout/Footer'
import { 
  UsersIcon, 
  CheckIcon, 
  XMarkIcon, 
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface Player {
  id: string
  firstName: string
  lastName: string
  middleName?: string
  dateOfBirth: string
  nationality: string
  discipline: string
  level: string
  status: 'PENDING' | 'APPROVED' | 'DISAPPROVED'
  county: { name: string }
  createdAt: string
  photo?: string
}

export default function AdminPlayersPage() {
  const { user, isLoading } = useAuth()
  const [players, setPlayers] = useState<Player[]>([])
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([])
  const [pageLoading, setPageLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [disciplineFilter, setDisciplineFilter] = useState('all')
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (user) {
      fetchPlayers()
    }
  }, [user])

  useEffect(() => {
    filterPlayers()
  }, [players, searchTerm, statusFilter, disciplineFilter])

  const fetchPlayers = async () => {
    try {
      // Mock data - in a real app, this would be an API call
      const mockPlayers: Player[] = [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          middleName: 'Michael',
          dateOfBirth: '1995-03-15',
          nationality: 'Liberian',
          discipline: 'FOOTBALL',
          level: 'Professional',
          status: 'PENDING',
          county: { name: 'Montserrado' },
          createdAt: '2024-01-15T10:30:00Z',
          photo: '/images/player1.jpg'
        },
        {
          id: '2',
          firstName: 'Sarah',
          lastName: 'Johnson',
          dateOfBirth: '1998-07-22',
          nationality: 'Liberian',
          discipline: 'VOLLEYBALL',
          level: 'Amateur',
          status: 'APPROVED',
          county: { name: 'Nimba' },
          createdAt: '2024-01-14T14:20:00Z'
        },
        {
          id: '3',
          firstName: 'Michael',
          lastName: 'Brown',
          middleName: 'David',
          dateOfBirth: '1993-11-08',
          nationality: 'Liberian',
          discipline: 'BASKETBALL',
          level: 'Professional',
          status: 'DISAPPROVED',
          county: { name: 'Bong' },
          createdAt: '2024-01-13T09:15:00Z'
        }
      ]

      setPlayers(mockPlayers)
    } catch (error) {
      console.error('Error fetching players:', error)
      toast.error('Failed to fetch players')
    } finally {
      setPageLoading(false)
    }
  }

  const filterPlayers = () => {
    let filtered = players

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(player =>
        player.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.county.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(player => player.status === statusFilter)
    }

    // Discipline filter
    if (disciplineFilter !== 'all') {
      filtered = filtered.filter(player => player.discipline === disciplineFilter)
    }

    setFilteredPlayers(filtered)
  }

  const handleApprove = async (playerId: string) => {
    try {
      // Mock API call
      setPlayers(prev => prev.map(player => 
        player.id === playerId 
          ? { ...player, status: 'APPROVED' as const }
          : player
      ))
      toast.success('Player approved successfully')
    } catch (error) {
      toast.error('Failed to approve player')
    }
  }

  const handleDisapprove = async (playerId: string) => {
    try {
      // Mock API call
      setPlayers(prev => prev.map(player => 
        player.id === playerId 
          ? { ...player, status: 'DISAPPROVED' as const }
          : player
      ))
      toast.success('Player disapproved successfully')
    } catch (error) {
      toast.error('Failed to disapprove player')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800'
      case 'DISAPPROVED':
        return 'bg-red-100 text-red-800'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getDisciplineColor = (discipline: string) => {
    switch (discipline) {
      case 'FOOTBALL':
        return 'bg-green-100 text-green-800'
      case 'VOLLEYBALL':
        return 'bg-orange-100 text-orange-800'
      case 'BASKETBALL':
        return 'bg-red-100 text-red-800'
      case 'ATHLETICS':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (pageLoading) {
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

  if (!user || !['LFA_OFFICIAL', 'MYS_STAFF', 'GENERAL_ADMIN'].includes(user.role)) {
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Player Management
            </h1>
            <p className="text-gray-600">
              Review and manage player registrations
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search players..."
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
                <option value="all">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="DISAPPROVED">Disapproved</option>
              </select>

              <select
                value={disciplineFilter}
                onChange={(e) => setDisciplineFilter(e.target.value)}
                className="input-field"
              >
                <option value="all">All Disciplines</option>
                <option value="FOOTBALL">Football</option>
                <option value="VOLLEYBALL">Volleyball</option>
                <option value="BASKETBALL">Basketball</option>
                <option value="ATHLETICS">Athletics</option>
                <option value="KICKBALL">Kickball</option>
                <option value="FEMALE_SOCCER">Female Soccer</option>
              </select>

              <button
                onClick={() => {
                  setSearchTerm('')
                  setStatusFilter('all')
                  setDisciplineFilter('all')
                }}
                className="btn-outline flex items-center justify-center"
              >
                <FunnelIcon className="w-4 h-4 mr-2" />
                Clear Filters
              </button>
            </div>
          </div>

          {/* Players List */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Players ({filteredPlayers.length})
              </h2>
            </div>

            {pageLoading ? (
              <div className="p-6">
                <div className="animate-pulse space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-20 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredPlayers.map((player) => (
                  <div key={player.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          {player.photo ? (
                            <img
                              src={player.photo}
                              alt={`${player.firstName} ${player.lastName}`}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <UsersIcon className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {player.firstName} {player.middleName} {player.lastName}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{player.county.name}</span>
                            <span>•</span>
                            <span>{player.nationality}</span>
                            <span>•</span>
                            <span>{new Date(player.dateOfBirth).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDisciplineColor(player.discipline)}`}>
                              {player.discipline}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(player.status)}`}>
                              {player.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedPlayer(player)
                            setShowModal(true)
                          }}
                          className="p-2 text-gray-400 hover:text-gray-600"
                        >
                          <EyeIcon className="w-5 h-5" />
                        </button>
                        
                        {player.status === 'PENDING' && (
                          <>
                            <button
                              onClick={() => handleApprove(player.id)}
                              className="p-2 text-green-600 hover:text-green-700"
                            >
                              <CheckIcon className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDisapprove(player.id)}
                              className="p-2 text-red-600 hover:text-red-700"
                            >
                              <XMarkIcon className="w-5 h-5" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {filteredPlayers.length === 0 && (
                  <div className="p-12 text-center">
                    <UsersIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No players found</h3>
                    <p className="text-gray-600">Try adjusting your filters to see more players.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Player Details Modal */}
      {showModal && selectedPlayer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Player Details
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                    {selectedPlayer.photo ? (
                      <img
                        src={selectedPlayer.photo}
                        alt={`${selectedPlayer.firstName} ${selectedPlayer.lastName}`}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    ) : (
                      <UsersIcon className="w-10 h-10 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {selectedPlayer.firstName} {selectedPlayer.middleName} {selectedPlayer.lastName}
                    </h3>
                    <p className="text-gray-600">{selectedPlayer.county.name}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Date of Birth</label>
                    <p className="text-gray-900">{new Date(selectedPlayer.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="label">Nationality</label>
                    <p className="text-gray-900">{selectedPlayer.nationality}</p>
                  </div>
                  <div>
                    <label className="label">Discipline</label>
                    <p className="text-gray-900">{selectedPlayer.discipline}</p>
                  </div>
                  <div>
                    <label className="label">Level</label>
                    <p className="text-gray-900">{selectedPlayer.level}</p>
                  </div>
                  <div>
                    <label className="label">Status</label>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedPlayer.status)}`}>
                      {selectedPlayer.status}
                    </span>
                  </div>
                  <div>
                    <label className="label">Registration Date</label>
                    <p className="text-gray-900">{new Date(selectedPlayer.createdAt).toLocaleDateString()}</p>
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
                {selectedPlayer.status === 'PENDING' && (
                  <>
                    <button
                      onClick={() => {
                        handleApprove(selectedPlayer.id)
                        setShowModal(false)
                      }}
                      className="btn-primary"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        handleDisapprove(selectedPlayer.id)
                        setShowModal(false)
                      }}
                      className="btn-secondary"
                    >
                      Disapprove
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
