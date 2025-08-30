'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { 
  DocumentTextIcon, 
  PlusIcon, 
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface MatchReport {
  id: string
  match: {
    id: string
    homeTeam: { name: string }
    awayTeam: { name: string }
    date: string
    discipline: string
  }
  reporter: { name: string }
  content: string
  createdAt: string
  status: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED'
}

export default function AdminReportsPage() {
  const { user, loading } = useAuth()
  const [reports, setReports] = useState<MatchReport[]>([])
  const [filteredReports, setFilteredReports] = useState<MatchReport[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedReport, setSelectedReport] = useState<MatchReport | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (user) {
      fetchReports()
    }
  }, [user])

  useEffect(() => {
    filterReports()
  }, [reports, searchTerm, statusFilter])

  const fetchReports = async () => {
    try {
      // Mock data - in a real app, this would be an API call
      const mockReports: MatchReport[] = [
        {
          id: '1',
          match: {
            id: '1',
            homeTeam: { name: 'Montserrado' },
            awayTeam: { name: 'Nimba' },
            date: '2024-01-20T14:00:00Z',
            discipline: 'FOOTBALL'
          },
          reporter: { name: 'Robert Wilson' },
          content: 'Montserrado County defeated Nimba County 3-1 in a thrilling match. The game was well-contested with excellent sportsmanship from both teams. Key highlights include two goals from striker John Doe and a spectacular save from goalkeeper Sarah Johnson.',
          createdAt: '2024-01-20T16:30:00Z',
          status: 'APPROVED'
        },
        {
          id: '2',
          match: {
            id: '2',
            homeTeam: { name: 'Bong' },
            awayTeam: { name: 'Lofa' },
            date: '2024-01-20T16:00:00Z',
            discipline: 'FOOTBALL'
          },
          reporter: { name: 'Mary Thompson' },
          content: 'Bong County secured a narrow 2-1 victory over Lofa County. The match was closely contested with both teams showing great determination. The winning goal came in the 85th minute from a well-executed set piece.',
          createdAt: '2024-01-20T18:15:00Z',
          status: 'SUBMITTED'
        },
        {
          id: '3',
          match: {
            id: '3',
            homeTeam: { name: 'Grand Bassa' },
            awayTeam: { name: 'Margibi' },
            date: '2024-01-21T14:00:00Z',
            discipline: 'VOLLEYBALL'
          },
          reporter: { name: 'David Anderson' },
          content: 'Grand Bassa County dominated the volleyball match against Margibi County, winning in straight sets. The team showed excellent coordination and skill throughout the match.',
          createdAt: '2024-01-21T15:45:00Z',
          status: 'DRAFT'
        }
      ]

      setReports(mockReports)
    } catch (error) {
      console.error('Error fetching reports:', error)
      toast.error('Failed to fetch reports')
    } finally {
      setIsLoading(false)
    }
  }

  const filterReports = () => {
    let filtered = reports

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(report =>
        report.match.homeTeam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.match.awayTeam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.reporter.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(report => report.status === statusFilter)
    }

    setFilteredReports(filtered)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800'
      case 'REJECTED':
        return 'bg-red-100 text-red-800'
      case 'SUBMITTED':
        return 'bg-blue-100 text-blue-800'
      case 'DRAFT':
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
                Match Reports
              </h1>
              <p className="text-gray-600">
                Review and manage match reports from officials
              </p>
            </div>
            <button
              onClick={() => window.location.href = '/admin/reports/new'}
              className="btn-primary flex items-center"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Create Report
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reports..."
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
                <option value="DRAFT">Draft</option>
                <option value="SUBMITTED">Submitted</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>

              <button
                onClick={() => {
                  setSearchTerm('')
                  setStatusFilter('all')
                }}
                className="btn-outline flex items-center justify-center"
              >
                <FunnelIcon className="w-4 h-4 mr-2" />
                Clear Filters
              </button>
            </div>
          </div>

          {/* Reports List */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Reports ({filteredReports.length})
              </h2>
            </div>

            {isLoading ? (
              <div className="p-6">
                <div className="animate-pulse space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-32 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredReports.map((report) => (
                  <div key={report.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDisciplineColor(report.match.discipline)}`}>
                              {report.match.discipline}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                              {report.status}
                            </span>
                            <span className="text-sm text-gray-500">
                              {new Date(report.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              setSelectedReport(report)
                              setShowModal(true)
                            }}
                            className="p-2 text-gray-400 hover:text-gray-600"
                          >
                            <EyeIcon className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="mb-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {report.match.homeTeam.name} vs {report.match.awayTeam.name}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                            <span className="flex items-center">
                              <CalendarIcon className="w-4 h-4 mr-1" />
                              {new Date(report.match.date).toLocaleDateString()}
                            </span>
                            <span>•</span>
                            <span>Reporter: {report.reporter.name}</span>
                          </div>
                          <p className="text-gray-700 line-clamp-2">
                            {report.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredReports.length === 0 && (
                  <div className="p-12 text-center">
                    <DocumentTextIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
                    <p className="text-gray-600">Try adjusting your filters to see more reports.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Report Details Modal */}
      {showModal && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Match Report Details
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <DocumentTextIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {selectedReport.match.homeTeam.name} vs {selectedReport.match.awayTeam.name}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Discipline:</span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getDisciplineColor(selectedReport.match.discipline)}`}>
                        {selectedReport.match.discipline}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Date:</span>
                      <span className="ml-2">{new Date(selectedReport.match.date).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Reporter:</span>
                      <span className="ml-2">{selectedReport.reporter.name}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Status:</span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedReport.status)}`}>
                        {selectedReport.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Report Content</h4>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {selectedReport.content}
                    </p>
                  </div>
                </div>

                <div className="text-sm text-gray-500">
                  <p>Submitted on: {new Date(selectedReport.createdAt).toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="btn-outline"
                >
                  Close
                </button>
                {selectedReport.status === 'SUBMITTED' && (
                  <>
                    <button
                      onClick={() => {
                        // Handle approve report
                        toast.success('Report approved')
                        setShowModal(false)
                      }}
                      className="btn-primary"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        // Handle reject report
                        toast.success('Report rejected')
                        setShowModal(false)
                      }}
                      className="btn-secondary"
                    >
                      Reject
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
