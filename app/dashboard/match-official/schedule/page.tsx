'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { toast } from 'react-hot-toast'

interface Match {
  id: string
  homeTeam: string
  awayTeam: string
  kickoffTime: string
  venue: string
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'
  role: 'REFEREE' | 'ASSISTANT_REFEREE' | 'FOURTH_OFFICIAL'
}

export default function MatchSchedulePage() {
  const [matches, setMatches] = useState<Match[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState('upcoming') // 'upcoming' | 'completed' | 'all'

  useEffect(() => {
    fetchMatches()
  }, [filter])

  const fetchMatches = async () => {
    try {
      const response = await fetch(`/api/matches/schedule?filter=${filter}`)
      if (response.ok) {
        const data = await response.json()
        setMatches(data)
      } else {
        toast.error('Failed to load match schedule')
      }
    } catch (error) {
      toast.error('Error loading match schedule')
    } finally {
      setIsLoading(false)
    }
  }

  const getMatchStatusColor = (status: Match['status']) => {
    switch (status) {
      case 'PENDING':
        return 'text-yellow-600 bg-yellow-50'
      case 'IN_PROGRESS':
        return 'text-blue-600 bg-blue-50'
      case 'COMPLETED':
        return 'text-green-600 bg-green-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const getMatchAction = (match: Match) => {
    switch (match.status) {
      case 'PENDING':
        return {
          text: 'View Details',
          href: `/dashboard/match-official/player-inspection/${match.id}`
        }
      case 'IN_PROGRESS':
        return {
          text: 'Submit Report',
          href: `/dashboard/match-official/submit-report/${match.id}`
        }
      case 'COMPLETED':
        return {
          text: 'View Report',
          href: `/dashboard/match-official/reports/${match.id}`
        }
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Match Schedule</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'upcoming' ? 'bg-blue-600 text-white' : 'bg-gray-100'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-100'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100'
            }`}
          >
            All
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {matches.map(match => {
          const action = getMatchAction(match)
          return (
            <div key={match.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-gray-600">Teams</p>
                  <p className="font-semibold">{match.homeTeam} vs {match.awayTeam}</p>
                </div>
                <div>
                  <p className="text-gray-600">Kickoff Time</p>
                  <p className="font-semibold">
                    {format(new Date(match.kickoffTime), 'PPp')}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Venue</p>
                  <p className="font-semibold">{match.venue}</p>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchStatusColor(match.status)}`}>
                    {match.status.replace('_', ' ')}
                  </span>
                  <span className="text-gray-600">
                    Role: {match.role.replace('_', ' ')}
                  </span>
                </div>
                {action && (
                  <a
                    href={action.href}
                    className="btn-primary"
                  >
                    {action.text}
                  </a>
                )}
              </div>
            </div>
          )
        })}

        {matches.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-600">No matches found</p>
          </div>
        )}
      </div>
    </div>
  )
}
