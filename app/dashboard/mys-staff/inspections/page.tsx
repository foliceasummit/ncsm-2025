'use client'

import { useState } from 'react'
import { FaClipboardCheck, FaExclamationTriangle, FaCheck } from 'react-icons/fa'

interface MatchInspection {
  id: string
  matchNumber: string
  homeTeam: string
  awayTeam: string
  venue: string
  date: string
  status: 'Pending' | 'Completed' | 'Issues'
  inspectedBy?: string
  remarks?: string
}

export default function MatchInspection() {
  const [inspections, setInspections] = useState<MatchInspection[]>([
    {
      id: '1',
      matchNumber: 'M001',
      homeTeam: 'Montserrado',
      awayTeam: 'Nimba',
      venue: 'SKD Sports Complex',
      date: '2025-09-06',
      status: 'Pending'
    },
    // Add more sample data
  ])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800'
      case 'Issues':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Match Inspections</h1>
        <div className="flex space-x-4">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
            onClick={() => {/* Implement new inspection */}}
          >
            <FaClipboardCheck />
            <span>Start New Inspection</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Pending Inspections</p>
              <h3 className="text-2xl font-bold">8</h3>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <FaClipboardCheck className="text-yellow-600 w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Completed Today</p>
              <h3 className="text-2xl font-bold">5</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <FaCheck className="text-green-600 w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Issues Reported</p>
              <h3 className="text-2xl font-bold">2</h3>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <FaExclamationTriangle className="text-red-600 w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Inspection List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Upcoming Inspections</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {inspections.map((inspection) => (
            <div key={inspection.id} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="text-lg font-medium">
                        {inspection.homeTeam} vs {inspection.awayTeam}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Match #{inspection.matchNumber} • {inspection.venue}
                      </p>
                      <p className="text-sm text-gray-500">
                        Date: {new Date(inspection.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(inspection.status)}`}>
                    {inspection.status}
                  </span>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => {/* Implement inspection details/start */}}
                  >
                    {inspection.status === 'Pending' ? 'Start Inspection' : 'View Details'}
                  </button>
                </div>
              </div>
              {inspection.remarks && (
                <div className="mt-2 text-sm text-gray-600">
                  <p className="font-medium">Remarks:</p>
                  <p>{inspection.remarks}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Inspection Checklist Modal would go here */}
    </div>
  )
}
