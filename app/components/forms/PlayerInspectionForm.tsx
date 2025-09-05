'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'

const inspectionSchema = z.object({
  sport: z.enum(['FOOTBALL', 'VOLLEYBALL', 'BASKETBALL', 'KICKBALL', 'ATHLETICS']),
  matchId: z.string().min(1, 'Match ID is required'),
  matchTime: z.string().min(1, 'Match time is required'),
  playerIds: z.array(z.string()).min(1, 'At least one player must be selected')
})

type InspectionFormData = z.infer<typeof inspectionSchema>

interface Player {
  id: string
  firstName: string
  lastName: string
  sport: string
  status: string
}

export default function PlayerInspectionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [players, setPlayers] = useState<Player[]>([])
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<InspectionFormData>({
    resolver: zodResolver(inspectionSchema)
  })

  useEffect(() => {
    // Fetch approved players for the county
    const fetchPlayers = async () => {
      try {
        const response = await fetch('/api/players?status=APPROVED')
        if (response.ok) {
          const data = await response.json()
          setPlayers(data)
        }
      } catch (error) {
        console.error('Error fetching players:', error)
        toast.error('Failed to load players')
      }
    }

    fetchPlayers()
  }, [])

  const onSubmit = async (data: InspectionFormData) => {
    if (new Date(data.matchTime).getTime() - new Date().getTime() < 3600000) {
      toast.error('Players must be submitted at least 1 hour before the match')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/players/submit-for-inspection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          playerIds: selectedPlayers
        }),
      })

      if (response.ok) {
        toast.success('Players submitted for inspection successfully!')
        reset()
        setSelectedPlayers([])
      } else {
        const error = await response.json()
        toast.error(error.message || 'Failed to submit players')
      }
    } catch (error) {
      toast.error('An error occurred while submitting players')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePlayerSelection = (playerId: string) => {
    setSelectedPlayers(prev => 
      prev.includes(playerId)
        ? prev.filter(id => id !== playerId)
        : [...prev, playerId]
    )
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Submit Players for Match Inspection</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Match Details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Sport *</label>
            <select {...register('sport')} className="input-field">
              <option value="">Select a sport</option>
              <option value="FOOTBALL">Football</option>
              <option value="VOLLEYBALL">Volleyball</option>
              <option value="BASKETBALL">Basketball</option>
              <option value="KICKBALL">Kickball</option>
              <option value="ATHLETICS">Athletics</option>
            </select>
            {errors.sport && (
              <p className="text-red-500 text-sm mt-1">{errors.sport.message}</p>
            )}
          </div>
          <div>
            <label className="label">Match ID *</label>
            <input
              {...register('matchId')}
              className="input-field"
              placeholder="Enter match ID"
            />
            {errors.matchId && (
              <p className="text-red-500 text-sm mt-1">{errors.matchId.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="label">Match Time *</label>
          <input
            type="datetime-local"
            {...register('matchTime')}
            className="input-field"
          />
          {errors.matchTime && (
            <p className="text-red-500 text-sm mt-1">{errors.matchTime.message}</p>
          )}
        </div>

        {/* Player Selection */}
        <div>
          <label className="label">Select Players *</label>
          <div className="border rounded-lg p-4 space-y-2 max-h-96 overflow-y-auto">
            {players.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No approved players found</p>
            ) : (
              players.map(player => (
                <div 
                  key={player.id}
                  className="flex items-center p-2 hover:bg-gray-50 rounded"
                >
                  <input
                    type="checkbox"
                    id={player.id}
                    checked={selectedPlayers.includes(player.id)}
                    onChange={() => handlePlayerSelection(player.id)}
                    className="mr-3"
                  />
                  <label htmlFor={player.id}>
                    {player.firstName} {player.lastName} - {player.sport}
                  </label>
                </div>
              ))
            )}
          </div>
          {errors.playerIds && (
            <p className="text-red-500 text-sm mt-1">{errors.playerIds.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || selectedPlayers.length === 0}
            className="btn-primary"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              'Submit for Inspection'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
