'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import Navigation from '../../components/layout/Navigation'
import Footer from '../../components/layout/Footer'
import { 
  CalendarIcon, 
  PlusIcon, 
  PencilIcon, 
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  TrophyIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface Match {
  id: string
  homeTeam: { name: string }
  awayTeam: { name: string }
  date: string
  time: string
  venue: string
  discipline: string
  group: string
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  homeScore?: number
  awayScore?: number
  matchOfficial?: { name: string }
  createdAt: string
}

export default function AdminMatchesPage() {
  const { user, isLoading } = useAuth()
  const [matches, setMatches] = useState<Match[]>([])
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([])
  const [pageLoading, setPageLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [disciplineFilter, setDisciplineFilter] = useState('all')
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    if (user) {
      fetchMatches()
    }
  }, [user])

  useEffect(() => {
    filterMatches()
  }, [matches, searchTerm, statusFilter, disciplineFilter])

  const fetchMatches = async () => {
    try {
      // Mock data - in a real app, this would be an API call
      const mockMatches: Match[] = [
        {
          id: '1',
          homeTeam: { name: 'Montserrado' },
          awayTeam: { name: 'Nimba' },
          date: '2024-01-20',
          time: '14:00',
          venue: 'Antoinette Tubman Stadium',
          discipline: 'FOOTBALL',
          group: 'A',
          status: 'SCHEDULED',
          matchOfficial: { name: 'Robert Wilson' },
          createdAt: '2024-01-15T10:30:00Z'
        },
        {
          id: '2',
          homeTeam: { name: 'Bong' },
          awayTeam: { name: 'Lofa' },
          date: '2024-01-20',
          time: '16:00',
          venue: 'Antoinette Tubman Stadium',
          discipline: 'FOOTBALL',
          group: 'A',
          status: 'COMPLETED',
          homeScore: 2,
          awayScore: 1,
          matchOfficial: { name: 'Mary Thompson' },
          createdAt: '2024-01-15T10:30:00Z'
        },
        {
          id: '3',
          homeTeam: { name: 'Grand Bassa' },
          awayTeam: { name: 'Margibi' },
          date: '2024-01-21',
          time: '14:00',
          venue: 'SKD Sports Complex',
          discipline: 'VOLLEYBALL',
          group: 'B',
          status: 'IN_PROGRESS',
          matchOfficial: { name: 'David Anderson' },
          createdAt: '2024-01-15T10:30:00Z'
        }
      ]

      setMatches(mockMatches)
    } catch (error) {
      console.error('Error fetching matches:', error)
      toast.error('Failed to fetch matches')
    } finally {
      setPageLoading(false)
    }
  }

  const filterMatches = () => {
    let filtered = matches

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(match =>
        match.homeTeam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        match.awayTeam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        match.venue.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(match => match.status === statusFilter)
    }

    // Discipline filter
    if (disciplineFilter !== 'all') {
      filtered = filtered.filter(match => match.discipline === disciplineFilter)
    }

    setFilteredMatches(filtered)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800'
      case 'IN_PROGRESS':
        return 'bg-yellow-100 text-yellow-800'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800'
      case 'SCHEDULED':
        return 'bg-blue-100 text-blue-800'
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

  const getGroupColor = (group: string) => {
    switch (group) {
      case 'A':
        return 'bg-red-100 text-red-800'
      case 'B':
        return 'bg-blue-100 text-blue-800'
      case 'C':
        return 'bg-green-100 text-green-800'
      case 'D':
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

  if (!user || !['MYS_STAFF', 'GENERAL_ADMIN'].includes(user.role)) {
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
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Match Management
              </h1>
              <p className="text-gray-600">
                Schedule and manage matches for the National County Sports Meet
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary flex items-center"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Create Match
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search matches..."
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
                <option value="SCHEDULED">Scheduled</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
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

          {/* Matches List */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Matches ({filteredMatches.length})
              </h2>
            </div>

            {pageLoading ? (
              <div className="p-6">
                <div className="animate-pulse space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-32 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredMatches.map((match) => (
                  <div key={match.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDisciplineColor(match.discipline)}`}>
                              {match.discipline}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getGroupColor(match.group)}`}>
                              Group {match.group}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(match.status)}`}>
                              {match.status}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => {
                                setSelectedMatch(match)
                                setShowModal(true)
                              }}
                              className="p-2 text-gray-400 hover:text-gray-600"
                            >
                              <EyeIcon className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedMatch(match)
                                setShowModal(true)
                              }}
                              className="p-2 text-gray-400 hover:text-gray-600"
                            >
                              <PencilIcon className="w-5 h-5" />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex-1 text-right">
                            <h3 className="text-lg font-semibold">{match.homeTeam.name}</h3>
                            {match.homeScore !== undefined && (
                              <span className="text-2xl font-bold text-primary-600">{match.homeScore}</span>
                            )}
                          </div>
                          <div className="mx-6 text-center">
                            <span className="text-2xl font-bold text-gray-600">VS</span>
                            <div className="text-sm text-gray-500 mt-1">
                              {new Date(match.date).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-gray-500">{match.time}</div>
                          </div>
                          <div className="flex-1 text-left">
                            <h3 className="text-lg font-semibold">{match.awayTeam.name}</h3>
                            {match.awayScore !== undefined && (
                              <span className="text-2xl font-bold text-primary-600">{match.awayScore}</span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div className="flex items-center">
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            {match.venue}
                          </div>
                          {match.matchOfficial && (
                            <div className="flex items-center">
                              <TrophyIcon className="w-4 h-4 mr-2" />
                              {match.matchOfficial.name}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredMatches.length === 0 && (
                  <div className="p-12 text-center">
                    <CalendarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No matches found</h3>
                    <p className="text-gray-600">Try adjusting your filters to see more matches.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Match Details Modal */}
      {showModal && selectedMatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Match Details
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <CalendarIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-8 mb-4">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold">{selectedMatch.homeTeam.name}</h3>
                      {selectedMatch.homeScore !== undefined && (
                        <span className="text-3xl font-bold text-primary-600">{selectedMatch.homeScore}</span>
                      )}
                    </div>
                    <div className="text-center">
                      <span className="text-2xl font-bold text-gray-600">VS</span>
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-semibold">{selectedMatch.awayTeam.name}</h3>
                      {selectedMatch.awayScore !== undefined && (
                        <span className="text-3xl font-bold text-primary-600">{selectedMatch.awayScore}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Date</label>
                    <p className="text-gray-900">{new Date(selectedMatch.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="label">Time</label>
                    <p className="text-gray-900">{selectedMatch.time}</p>
                  </div>
                  <div>
                    <label className="label">Venue</label>
                    <p className="text-gray-900">{selectedMatch.venue}</p>
                  </div>
                  <div>
                    <label className="label">Discipline</label>
                    <p className="text-gray-900">{selectedMatch.discipline}</p>
                  </div>
                  <div>
                    <label className="label">Group</label>
                    <p className="text-gray-900">Group {selectedMatch.group}</p>
                  </div>
                  <div>
                    <label className="label">Status</label>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedMatch.status)}`}>
                      {selectedMatch.status}
                    </span>
                  </div>
                  {selectedMatch.matchOfficial && (
                    <div>
                      <label className="label">Match Official</label>
                      <p className="text-gray-900">{selectedMatch.matchOfficial.name}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="btn-outline"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    // Handle edit match
                    setShowModal(false)
                  }}
                  className="btn-primary"
                >
                  Edit Match
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
