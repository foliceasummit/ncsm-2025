'use client'

import { useState } from 'react'
import { FaTrophy, FaEdit, FaSave, FaUndo } from 'react-icons/fa'

interface MatchResult {
  id: string
  matchNumber: string
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  date: string
  venue: string
  status: 'Pending' | 'Final' | 'Under Review'
}

interface TeamStanding {
  team: string
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  points: number
}

export default function ResultsAndStandings() {
  const [activeTab, setActiveTab] = useState<'results' | 'standings'>('results')
  const [editingResult, setEditingResult] = useState<string | null>(null)
  
  const [results, setResults] = useState<MatchResult[]>([
    {
      id: '1',
      matchNumber: 'M001',
      homeTeam: 'Montserrado',
      awayTeam: 'Nimba',
      homeScore: 2,
      awayScore: 1,
      date: '2025-09-05',
      venue: 'SKD Sports Complex',
      status: 'Final'
    },
    // Add more sample matches
  ])

  const [standings, setStandings] = useState<TeamStanding[]>([
    {
      team: 'Montserrado',
      played: 5,
      won: 4,
      drawn: 1,
      lost: 0,
      goalsFor: 12,
      goalsAgainst: 3,
      points: 13
    },
    // Add more sample standings
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Final':
        return 'bg-green-100 text-green-800'
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Results & Standings</h1>
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'results'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab('results')}
          >
            Match Results
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'standings'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab('standings')}
          >
            Standings
          </button>
        </div>
      </div>

      {activeTab === 'results' ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Match
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teams
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Venue
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
              {results.map((match) => (
                <tr key={match.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">#{match.matchNumber}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{match.homeTeam}</div>
                    <div className="text-sm text-gray-900">{match.awayTeam}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingResult === match.id ? (
                      <div className="flex space-x-2">
                        <input
                          type="number"
                          className="w-16 border rounded px-2 py-1"
                          value={match.homeScore}
                          min={0}
                          onChange={(e) => {
                            const newResults = results.map(r =>
                              r.id === match.id ? { ...r, homeScore: parseInt(e.target.value) } : r
                            )
                            setResults(newResults)
                          }}
                          aria-label={`${match.homeTeam} score`}
                        />
                        <span className="text-gray-500">-</span>
                        <input
                          type="number"
                          className="w-16 border rounded px-2 py-1"
                          value={match.awayScore}
                          min={0}
                          onChange={(e) => {
                            const newResults = results.map(r =>
                              r.id === match.id ? { ...r, awayScore: parseInt(e.target.value) } : r
                            )
                            setResults(newResults)
                          }}
                          aria-label={`${match.awayTeam} score`}
                        />
                      </div>
                    ) : (
                      <div className="text-sm font-medium text-gray-900">
                        {match.homeScore} - {match.awayScore}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {new Date(match.date).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">{match.venue}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(match.status)}`}>
                      {match.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {editingResult === match.id ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingResult(null)}
                          className="text-green-600 hover:text-green-900"
                          title="Save changes"
                        >
                          <FaSave />
                        </button>
                        <button
                          onClick={() => setEditingResult(null)}
                          className="text-gray-600 hover:text-gray-900"
                          title="Cancel editing"
                        >
                          <FaUndo />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setEditingResult(match.id)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit result"
                      >
                        <FaEdit />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  P
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  W
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  D
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  L
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  GF
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  GA
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PTS
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {standings.sort((a, b) => b.points - a.points).map((team, index) => (
                <tr key={team.team} className={index < 3 ? 'bg-green-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{index + 1}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{team.team}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {team.played}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {team.won}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {team.drawn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {team.lost}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {team.goalsFor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {team.goalsAgainst}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">{team.points}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
