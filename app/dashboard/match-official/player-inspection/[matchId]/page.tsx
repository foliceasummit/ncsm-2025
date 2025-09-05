'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { toast } from 'react-hot-toast'

interface Player {
  id: string
  firstName: string
  lastName: string
  jerseyNumber: string
  idCardUrl: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  notes?: string
}

interface MatchDetails {
  id: string
  homeTeam: string
  awayTeam: string
  kickoffTime: string
  venue: string
}

export default function PlayerInspectionPage() {
  const { matchId } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [matchDetails, setMatchDetails] = useState<MatchDetails | null>(null)
  const [homePlayers, setHomePlayers] = useState<Player[]>([])
  const [awayPlayers, setAwayPlayers] = useState<Player[]>([])
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchMatchAndPlayers()
  }, [matchId])

  const fetchMatchAndPlayers = async () => {
    try {
      const response = await fetch(`/api/matches/${matchId}/inspection`)
      if (response.ok) {
        const data = await response.json()
        setMatchDetails(data.match)
        setHomePlayers(data.homePlayers)
        setAwayPlayers(data.awayPlayers)
      } else {
        toast.error('Failed to load match details')
      }
    } catch (error) {
      toast.error('Error loading match details')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePlayerInspection = async (playerId: string, status: 'APPROVED' | 'REJECTED', notes?: string) => {
    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/players/${playerId}/inspect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          matchId,
          status,
          notes
        }),
      })

      if (response.ok) {
        toast.success('Player inspection updated')
        fetchMatchAndPlayers() // Refresh the list
      } else {
        toast.error('Failed to update player inspection')
      }
    } catch (error) {
      toast.error('Error updating player inspection')
    } finally {
      setIsSubmitting(false)
      setSelectedPlayer(null)
    }
  }

  const submitInspection = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/matches/${matchId}/complete-inspection`, {
        method: 'POST',
      })

      if (response.ok) {
        toast.success('Match inspection completed')
        // Redirect to dashboard or next task
      } else {
        toast.error('Failed to complete inspection')
      }
    } catch (error) {
      toast.error('Error completing inspection')
    } finally {
      setIsSubmitting(false)
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
      {/* Match Details Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">Player Inspection</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Match</p>
            <p className="font-semibold">{matchDetails?.homeTeam} vs {matchDetails?.awayTeam}</p>
          </div>
          <div>
            <p className="text-gray-600">Kickoff</p>
            <p className="font-semibold">{new Date(matchDetails?.kickoffTime || '').toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-600">Venue</p>
            <p className="font-semibold">{matchDetails?.venue}</p>
          </div>
        </div>
      </div>

      {/* Team Players */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Home Team */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">{matchDetails?.homeTeam} Players</h2>
          <div className="space-y-4">
            {homePlayers.map(player => (
              <div 
                key={player.id}
                className={`p-4 rounded-lg border ${
                  player.status === 'APPROVED' ? 'border-green-200 bg-green-50' :
                  player.status === 'REJECTED' ? 'border-red-200 bg-red-50' :
                  'border-gray-200 bg-white'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{player.firstName} {player.lastName}</p>
                    <p className="text-sm text-gray-600">Jersey #{player.jerseyNumber}</p>
                  </div>
                  <button
                    onClick={() => setSelectedPlayer(player)}
                    className="btn-outline text-sm"
                  >
                    Inspect
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Away Team */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">{matchDetails?.awayTeam} Players</h2>
          <div className="space-y-4">
            {awayPlayers.map(player => (
              <div 
                key={player.id}
                className={`p-4 rounded-lg border ${
                  player.status === 'APPROVED' ? 'border-green-200 bg-green-50' :
                  player.status === 'REJECTED' ? 'border-red-200 bg-red-50' :
                  'border-gray-200 bg-white'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{player.firstName} {player.lastName}</p>
                    <p className="text-sm text-gray-600">Jersey #{player.jerseyNumber}</p>
                  </div>
                  <button
                    onClick={() => setSelectedPlayer(player)}
                    className="btn-outline text-sm"
                  >
                    Inspect
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Complete Inspection Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={submitInspection}
          disabled={isSubmitting || homePlayers.some(p => p.status === 'PENDING') || awayPlayers.some(p => p.status === 'PENDING')}
          className="btn-primary"
        >
          {isSubmitting ? 'Submitting...' : 'Complete Inspection'}
        </button>
      </div>

      {/* Player Inspection Modal */}
      {selectedPlayer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h3 className="text-xl font-semibold mb-4">Player Inspection</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-600">Name</p>
                <p className="font-semibold">{selectedPlayer.firstName} {selectedPlayer.lastName}</p>
              </div>
              <div>
                <p className="text-gray-600">Jersey Number</p>
                <p className="font-semibold">#{selectedPlayer.jerseyNumber}</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 mb-2">ID Card</p>
              <img
                src={selectedPlayer.idCardUrl}
                alt="Player ID"
                className="w-full max-w-md mx-auto rounded-lg border"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-600 mb-2">Notes</label>
              <textarea
                className="w-full p-2 border rounded"
                rows={3}
                placeholder="Enter any notes or reasons for rejection..."
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setSelectedPlayer(null)}
                className="btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={() => handlePlayerInspection(selectedPlayer.id, 'REJECTED')}
                className="btn-danger"
                disabled={isSubmitting}
              >
                Reject
              </button>
              <button
                onClick={() => handlePlayerInspection(selectedPlayer.id, 'APPROVED')}
                className="btn-success"
                disabled={isSubmitting}
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
