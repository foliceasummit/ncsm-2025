'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { 
  UsersIcon, 
  CheckIcon, 
  XMarkIcon, 
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface Official {
  id: string
  firstName: string
  lastName: string
  middleName?: string
  dateOfBirth: string
  nationality: string
  discipline: string
  position: string
  currentCounty: string
  status: 'PENDING' | 'APPROVED' | 'DISAPPROVED'
  createdAt: string
  photo?: string
}

export default function AdminOfficialsPage() {
  const { user, loading } = useAuth()
  const [officials, setOfficials] = useState<Official[]>([])
  const [filteredOfficials, setFilteredOfficials] = useState<Official[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [disciplineFilter, setDisciplineFilter] = useState('all')
  const [selectedOfficial, setSelectedOfficial] = useState<Official | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (user) {
      fetchOfficials()
    }
  }, [user])

  useEffect(() => {
    filterOfficials()
  }, [officials, searchTerm, statusFilter, disciplineFilter])

  const fetchOfficials = async () => {
    try {
      // Mock data - in a real app, this would be an API call
      const mockOfficials: Official[] = [
        {
          id: '1',
          firstName: 'Robert',
          lastName: 'Wilson',
          middleName: 'James',
          dateOfBirth: '1985-06-12',
          nationality: 'Liberian',
          discipline: 'FOOTBALL',
          position: 'Referee',
          currentCounty: 'Montserrado',
          status: 'PENDING',
          createdAt: '2024-01-15T10:30:00Z',
          photo: '/images/official1.jpg'
        },
        {
          id: '2',
          firstName: 'Mary',
          lastName: 'Thompson',
          dateOfBirth: '1990-03-25',
          nationality: 'Liberian',
          discipline: 'VOLLEYBALL',
          position: 'Line Judge',
          currentCounty: 'Nimba',
          status: 'APPROVED',
          createdAt: '2024-01-14T14:20:00Z'
        },
        {
          id: '3',
          firstName: 'David',
          lastName: 'Anderson',
          middleName: 'Michael',
          dateOfBirth: '1988-09-18',
          nationality: 'Liberian',
          discipline: 'BASKETBALL',
          position: 'Referee',
          currentCounty: 'Bong',
          status: 'DISAPPROVED',
          createdAt: '2024-01-13T09:15:00Z'
        }
      ]

      setOfficials(mockOfficials)
    } catch (error) {
      console.error('Error fetching officials:', error)
      toast.error('Failed to fetch officials')
    } finally {
      setIsLoading(false)
    }
  }

  const filterOfficials = () => {
    let filtered = officials

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(official =>
        official.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        official.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        official.currentCounty.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(official => official.status === statusFilter)
    }

    // Discipline filter
    if (disciplineFilter !== 'all') {
      filtered = filtered.filter(official => official.discipline === disciplineFilter)
    }

    setFilteredOfficials(filtered)
  }

  const handleApprove = async (officialId: string) => {
    try {
      // Mock API call
      setOfficials(prev => prev.map(official => 
        official.id === officialId 
          ? { ...official, status: 'APPROVED' as const }
          : official
      ))
      toast.success('Official approved successfully')
    } catch (error) {
      toast.error('Failed to approve official')
    }
  }

  const handleDisapprove = async (officialId: string) => {
    try {
      // Mock API call
      setOfficials(prev => prev.map(official => 
        official.id === officialId 
          ? { ...official, status: 'DISAPPROVED' as const }
          : official
      ))
      toast.success('Official disapproved successfully')
    } catch (error) {
      toast.error('Failed to disapprove official')
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

  const getPositionColor = (position: string) => {
    switch (position.toLowerCase()) {
      case 'referee':
        return 'bg-blue-100 text-blue-800'
      case 'line judge':
        return 'bg-purple-100 text-purple-800'
      case 'timekeeper':
        return 'bg-indigo-100 text-indigo-800'
      case 'scorer':
        return 'bg-pink-100 text-pink-800'
      default:
        return 'bg-gray-100 text-gray-800'
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
              Officials Management
            </h1>
            <p className="text-gray-600">
              Review and manage official registrations
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search officials..."
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

          {/* Officials List */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Officials ({filteredOfficials.length})
              </h2>
            </div>

            {isLoading ? (
              <div className="p-6">
                <div className="animate-pulse space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-20 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredOfficials.map((official) => (
                  <div key={official.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          {official.photo ? (
                            <img
                              src={official.photo}
                              alt={`${official.firstName} ${official.lastName}`}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <UsersIcon className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {official.firstName} {official.middleName} {official.lastName}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{official.currentCounty}</span>
                            <span>•</span>
                            <span>{official.nationality}</span>
                            <span>•</span>
                            <span>{new Date(official.dateOfBirth).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDisciplineColor(official.discipline)}`}>
                              {official.discipline}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPositionColor(official.position)}`}>
                              {official.position}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(official.status)}`}>
                              {official.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedOfficial(official)
                            setShowModal(true)
                          }}
                          className="p-2 text-gray-400 hover:text-gray-600"
                        >
                          <EyeIcon className="w-5 h-5" />
                        </button>
                        
                        {official.status === 'PENDING' && (
                          <>
                            <button
                              onClick={() => handleApprove(official.id)}
                              className="p-2 text-green-600 hover:text-green-700"
                            >
                              <CheckIcon className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDisapprove(official.id)}
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

                {filteredOfficials.length === 0 && (
                  <div className="p-12 text-center">
                    <UsersIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No officials found</h3>
                    <p className="text-gray-600">Try adjusting your filters to see more officials.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Official Details Modal */}
      {showModal && selectedOfficial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Official Details
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
                    {selectedOfficial.photo ? (
                      <img
                        src={selectedOfficial.photo}
                        alt={`${selectedOfficial.firstName} ${selectedOfficial.lastName}`}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    ) : (
                      <UsersIcon className="w-10 h-10 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {selectedOfficial.firstName} {selectedOfficial.middleName} {selectedOfficial.lastName}
                    </h3>
                    <p className="text-gray-600">{selectedOfficial.currentCounty}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Date of Birth</label>
                    <p className="text-gray-900">{new Date(selectedOfficial.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="label">Nationality</label>
                    <p className="text-gray-900">{selectedOfficial.nationality}</p>
                  </div>
                  <div>
                    <label className="label">Discipline</label>
                    <p className="text-gray-900">{selectedOfficial.discipline}</p>
                  </div>
                  <div>
                    <label className="label">Position</label>
                    <p className="text-gray-900">{selectedOfficial.position}</p>
                  </div>
                  <div>
                    <label className="label">Current County</label>
                    <p className="text-gray-900">{selectedOfficial.currentCounty}</p>
                  </div>
                  <div>
                    <label className="label">Status</label>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOfficial.status)}`}>
                      {selectedOfficial.status}
                    </span>
                  </div>
                  <div>
                    <label className="label">Registration Date</label>
                    <p className="text-gray-900">{new Date(selectedOfficial.createdAt).toLocaleDateString()}</p>
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
                {selectedOfficial.status === 'PENDING' && (
                  <>
                    <button
                      onClick={() => {
                        handleApprove(selectedOfficial.id)
                        setShowModal(false)
                      }}
                      className="btn-primary"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        handleDisapprove(selectedOfficial.id)
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
