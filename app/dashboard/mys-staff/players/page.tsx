'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FaSearch, FaFilter, FaEdit, FaCheck, FaTimes } from 'react-icons/fa'

interface Player {
  id: string
  photo: string
  name: string
  county: string
  team: string
  discipline: string
  status: 'Active' | 'Pending' | 'Inactive'
}

export default function PlayersManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCounty, setSelectedCounty] = useState('all')
  const [selectedDiscipline, setSelectedDiscipline] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  // Sample data - replace with actual API call
  const players: Player[] = [
    {
      id: '1',
      photo: '/images/default-player.jpg',
      name: 'John Doe',
      county: 'Montserrado',
      team: 'Team A',
      discipline: 'Football',
      status: 'Active'
    },
    // Add more sample data as needed
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'Inactive':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Player Management</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={() => {/* Implement new player registration */}}
        >
          Register New Player
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search players..."
              className="pl-10 w-full p-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="p-2 border rounded-lg"
            value={selectedCounty}
            onChange={(e) => setSelectedCounty(e.target.value)}
          >
            <option value="all">All Counties</option>
            <option value="montserrado">Montserrado</option>
            <option value="nimba">Nimba</option>
            {/* Add more counties */}
          </select>
          <select
            className="p-2 border rounded-lg"
            value={selectedDiscipline}
            onChange={(e) => setSelectedDiscipline(e.target.value)}
          >
            <option value="all">All Disciplines</option>
            <option value="football">Football</option>
            <option value="basketball">Basketball</option>
            {/* Add more disciplines */}
          </select>
          <select
            className="p-2 border rounded-lg"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Players Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Photo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                County
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Team
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Discipline
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
                  <Image
                    src={player.photo}
                    alt={player.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{player.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{player.county}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{player.team}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{player.discipline}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(player.status)}`}>
                    {player.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <button className="text-blue-600 hover:text-blue-900">
                      <FaEdit />
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      <FaCheck />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <FaTimes />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
