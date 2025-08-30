'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { TrophyIcon, CalendarIcon, UsersIcon } from '@heroicons/react/24/outline'

interface Match {
  id: string
  homeTeam: { name: string }
  awayTeam: { name: string }
  homeScore: number
  awayScore: number
  date: string
  discipline: string
  status: string
}

interface Standing {
  county: string
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  points: number
}

export default function ResultsPage() {
  const [matches, setMatches] = useState<Match[]>([])
  const [standings, setStandings] = useState<Standing[]>([])
  const [selectedDiscipline, setSelectedDiscipline] = useState('all')
  const [selectedGroup, setSelectedGroup] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchResults()
  }, [])

  const fetchResults = async () => {
    try {
      // In a real app, these would be API calls
      // For now, using mock data
      const mockMatches: Match[] = [
        {
          id: '1',
          homeTeam: { name: 'Montserrado' },
          awayTeam: { name: 'Nimba' },
          homeScore: 2,
          awayScore: 1,
          date: '2024-01-15',
          discipline: 'FOOTBALL',
          status: 'COMPLETED'
        },
        {
          id: '2',
          homeTeam: { name: 'Bong' },
          awayTeam: { name: 'Lofa' },
          homeScore: 0,
          awayScore: 0,
          date: '2024-01-16',
          discipline: 'FOOTBALL',
          status: 'COMPLETED'
        },
        {
          id: '3',
          homeTeam: { name: 'Grand Bassa' },
          awayTeam: { name: 'Margibi' },
          homeScore: 3,
          awayScore: 2,
          date: '2024-01-17',
          discipline: 'FOOTBALL',
          status: 'COMPLETED'
        }
      ]

      const mockStandings: Standing[] = [
        { county: 'Montserrado', played: 3, won: 3, drawn: 0, lost: 0, goalsFor: 8, goalsAgainst: 2, points: 9 },
        { county: 'Grand Bassa', played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 6, goalsAgainst: 3, points: 7 },
        { county: 'Nimba', played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 5, goalsAgainst: 4, points: 6 },
        { county: 'Bong', played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 3, goalsAgainst: 3, points: 4 },
        { county: 'Lofa', played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 2, goalsAgainst: 2, points: 4 },
        { county: 'Margibi', played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 3, goalsAgainst: 6, points: 1 }
      ]

      setMatches(mockMatches)
      setStandings(mockStandings)
    } catch (error) {
      console.error('Error fetching results:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredMatches = matches.filter(match => {
    if (selectedDiscipline !== 'all' && match.discipline !== selectedDiscipline) return false
    if (selectedGroup !== 'all') {
      // In a real app, you'd filter by group
      return true
    }
    return true
  })

  const disciplines = [
    { value: 'all', label: 'All Disciplines' },
    { value: 'FOOTBALL', label: 'Football' },
    { value: 'KICKBALL', label: 'Kickball' },
    { value: 'FEMALE_SOCCER', label: 'Female Soccer' },
    { value: 'VOLLEYBALL', label: 'Volleyball' },
    { value: 'BASKETBALL', label: 'Basketball' },
    { value: 'ATHLETICS', label: 'Athletics' },
  ]

  const groups = [
    { value: 'all', label: 'All Groups' },
    { value: 'A', label: 'Group A' },
    { value: 'B', label: 'Group B' },
    { value: 'C', label: 'Group C' },
    { value: 'D', label: 'Group D' },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-20 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
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
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Results & Standings
            </h1>
            <p className="text-lg text-gray-600">
              Live results and current standings for the National County Sports Meet
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <select
              value={selectedDiscipline}
              onChange={(e) => setSelectedDiscipline(e.target.value)}
              className="input-field max-w-xs"
            >
              {disciplines.map((discipline) => (
                <option key={discipline.value} value={discipline.value}>
                  {discipline.label}
                </option>
              ))}
            </select>

            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="input-field max-w-xs"
            >
              {groups.map((group) => (
                <option key={group.value} value={group.value}>
                  {group.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Matches */}
            <div className="card">
              <div className="flex items-center mb-6">
                <CalendarIcon className="w-6 h-6 text-primary-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900">Recent Matches</h2>
              </div>
              
              <div className="space-y-4">
                {filteredMatches.map((match) => (
                  <div key={match.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500">
                        {new Date(match.date).toLocaleDateString()}
                      </span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {match.discipline}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex-1 text-right">
                        <span className="font-semibold">{match.homeTeam.name}</span>
                      </div>
                      <div className="mx-4 text-center">
                        <span className="text-2xl font-bold text-primary-600">
                          {match.homeScore} - {match.awayScore}
                        </span>
                      </div>
                      <div className="flex-1 text-left">
                        <span className="font-semibold">{match.awayTeam.name}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Standings */}
            <div className="card">
              <div className="flex items-center mb-6">
                <TrophyIcon className="w-6 h-6 text-primary-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900">League Table</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-2">Pos</th>
                      <th className="text-left py-2 px-2">County</th>
                      <th className="text-center py-2 px-2">P</th>
                      <th className="text-center py-2 px-2">W</th>
                      <th className="text-center py-2 px-2">D</th>
                      <th className="text-center py-2 px-2">L</th>
                      <th className="text-center py-2 px-2">GF</th>
                      <th className="text-center py-2 px-2">GA</th>
                      <th className="text-center py-2 px-2">Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standings.map((standing, index) => (
                      <tr key={standing.county} className="border-b border-gray-100">
                        <td className="py-2 px-2 font-semibold">{index + 1}</td>
                        <td className="py-2 px-2 font-medium">{standing.county}</td>
                        <td className="py-2 px-2 text-center">{standing.played}</td>
                        <td className="py-2 px-2 text-center">{standing.won}</td>
                        <td className="py-2 px-2 text-center">{standing.drawn}</td>
                        <td className="py-2 px-2 text-center">{standing.lost}</td>
                        <td className="py-2 px-2 text-center">{standing.goalsFor}</td>
                        <td className="py-2 px-2 text-center">{standing.goalsAgainst}</td>
                        <td className="py-2 px-2 text-center font-bold text-primary-600">
                          {standing.points}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
