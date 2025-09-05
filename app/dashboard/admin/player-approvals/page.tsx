'use client'

import { useState } from 'react'
import Image from 'next/image'
import { 
  FaCheck, FaTimes, FaEye, FaDownload,
  FaSearch, FaFilter, FaSort, FaSortUp, FaSortDown 
} from 'react-icons/fa'

interface Player {
  id: string
  name: string
  photo: string
  county: string
  discipline: string
  age: number
  submissionDate: string
  documents: string[]
  status: 'Pending' | 'Approved' | 'Rejected'
}

export default function PlayerApprovals() {
  const [searchTerm, setSearchTerm] = useState('')
  const [countyFilter, setCountyFilter] = useState('all')
  const [disciplineFilter, setDisciplineFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('pending')
  const [sortColumn, setSortColumn] = useState<string>('submissionDate')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)

  // Sample data - replace with actual API call
  const players: Player[] = [
    {
      id: '1',
      name: 'John Doe',
      photo: '/images/default-player.jpg',
      county: 'Montserrado',
      discipline: 'Football',
      age: 18,
      submissionDate: '2025-09-05T10:30:00',
      documents: ['ID Card', 'Birth Certificate', 'Medical Certificate'],
      status: 'Pending'
    },
    // Add more sample players
  ]

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const getSortIcon = (column: string) => {
    if (sortColumn !== column) return <FaSort className="ml-1" />
    return sortDirection === 'asc' ? (
      <FaSortUp className="ml-1" />
    ) : (
      <FaSortDown className="ml-1" />
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800'
      case 'Rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Player Approvals</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            Pending Approvals: {players.filter(p => p.status === 'Pending').length}
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search players..."
              className="pl-10 w-full p-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search players"
            />
          </div>
          <select
            className="p-2 border rounded-lg"
            value={countyFilter}
            onChange={(e) => setCountyFilter(e.target.value)}
            aria-label="Filter by county"
          >
            <option value="all">All Counties</option>
            <option value="montserrado">Montserrado</option>
            <option value="nimba">Nimba</option>
            {/* Add more counties */}
          </select>
          <select
            className="p-2 border rounded-lg"
            value={disciplineFilter}
            onChange={(e) => setDisciplineFilter(e.target.value)}
            aria-label="Filter by discipline"
          >
            <option value="all">All Disciplines</option>
            <option value="football">Football</option>
            <option value="basketball">Basketball</option>
            {/* Add more disciplines */}
          </select>
          <select
            className="p-2 border rounded-lg"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Players Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Player Info
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('discipline')}
              >
                <div className="flex items-center">
                  Discipline
                  {getSortIcon('discipline')}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('submissionDate')}
              >
                <div className="flex items-center">
                  Submission Date
                  {getSortIcon('submissionDate')}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Documents
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {players.map((player) => (
              <tr key={player.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <Image
                        className="h-10 w-10 rounded-full"
                        src={player.photo}
                        alt={player.name}
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {player.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {player.county} • Age: {player.age}
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
                  <div className="text-sm text-gray-500">
                    {new Date(player.submissionDate).toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    {player.documents.map((doc, index) => (
                      <button
                        key={index}
                        className="text-blue-600 hover:text-blue-900"
                        title={`Download ${doc}`}
                      >
                        <FaDownload />
                      </button>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(player.status)}`}>
                    {player.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <button
                      className="text-blue-600 hover:text-blue-900"
                      onClick={() => setSelectedPlayer(player)}
                      title="View details"
                    >
                      <FaEye />
                    </button>
                    <button
                      className="text-green-600 hover:text-green-900"
                      title="Approve player"
                    >
                      <FaCheck />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      title="Reject player"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Submissions</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {players.length}
          </p>
          <p className="mt-1 text-sm text-green-600">+12 this week</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Pending Review</h3>
          <p className="mt-2 text-3xl font-bold text-yellow-600">
            {players.filter(p => p.status === 'Pending').length}
          </p>
          <p className="mt-1 text-sm text-yellow-600">Requires attention</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Approved</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">
            {players.filter(p => p.status === 'Approved').length}
          </p>
          <p className="mt-1 text-sm text-green-600">Ready for cards</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Rejected</h3>
          <p className="mt-2 text-3xl font-bold text-red-600">
            {players.filter(p => p.status === 'Rejected').length}
          </p>
          <p className="mt-1 text-sm text-red-600">Need revision</p>
        </div>
      </div>
    </div>
  )
}
