'use client'

import { useState } from 'react'
import { FaSort, FaSortUp, FaSortDown, FaSearch, FaFilter } from 'react-icons/fa'

interface Match {
  id: string
  name: string
  date: string
  ticketsSold: number
  revenue: number
  status: 'Complete' | 'Upcoming'
}

export default function MatchBreakdown() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortColumn, setSortColumn] = useState<string>('date')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [dateFilter, setDateFilter] = useState('all')

  // Sample data - replace with actual API call
  const matches: Match[] = [
    {
      id: '1',
      name: 'Montserrado vs Nimba',
      date: '2025-09-06',
      ticketsSold: 2345,
      revenue: 23450,
      status: 'Upcoming'
    },
    {
      id: '2',
      name: 'Bong vs Lofa',
      date: '2025-09-05',
      ticketsSold: 1890,
      revenue: 18900,
      status: 'Complete'
    },
    // Add more matches...
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

  const filteredMatches = matches
    .filter((match) => {
      const matchesSearch = match.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesDate = dateFilter === 'all' || 
        (dateFilter === 'today' && match.date === new Date().toISOString().split('T')[0]) ||
        (dateFilter === 'week' && new Date(match.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
      return matchesSearch && matchesDate
    })
    .sort((a, b) => {
      const modifier = sortDirection === 'asc' ? 1 : -1
      switch (sortColumn) {
        case 'date':
          return modifier * (new Date(a.date).getTime() - new Date(b.date).getTime())
        case 'ticketsSold':
          return modifier * (a.ticketsSold - b.ticketsSold)
        case 'revenue':
          return modifier * (a.revenue - b.revenue)
        default:
          return modifier * a.name.localeCompare(b.name)
      }
    })

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search matches..."
              className="pl-10 pr-4 py-2 border rounded-lg w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="border rounded-lg px-4 py-2"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            aria-label="Date filter"
          >
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <FaFilter className="text-gray-400" />
          <span className="text-sm text-gray-500">
            Showing {filteredMatches.length} matches
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">
                  Match Name
                  {getSortIcon('name')}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center">
                  Date
                  {getSortIcon('date')}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('ticketsSold')}
              >
                <div className="flex items-center">
                  Tickets Sold
                  {getSortIcon('ticketsSold')}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('revenue')}
              >
                <div className="flex items-center">
                  Revenue Generated
                  {getSortIcon('revenue')}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredMatches.map((match) => (
              <tr key={match.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{match.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {new Date(match.date).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{match.ticketsSold.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    ${match.revenue.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    match.status === 'Complete'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {match.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Footer */}
      <div className="mt-6 border-t pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800">Total Matches</h3>
            <p className="text-2xl font-bold text-blue-900">{matches.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-green-800">Total Tickets</h3>
            <p className="text-2xl font-bold text-green-900">
              {matches.reduce((sum, match) => sum + match.ticketsSold, 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-purple-800">Total Revenue</h3>
            <p className="text-2xl font-bold text-purple-900">
              ${matches.reduce((sum, match) => sum + match.revenue, 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
