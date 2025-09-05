'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'

const matchReportSchema = z.object({
  competition: z.string().min(1, 'Competition is required'),
  date: z.string().min(1, 'Date is required'),
  venue: z.string().min(1, 'Venue is required'),
  kickoffTime: z.string().min(1, 'Kick-off time is required'),
  matchDetails: z.object({
    homeTeam: z.string().min(1, 'Home team is required'),
    awayTeam: z.string().min(1, 'Away team is required'),
    finalScoreHome: z.string().min(1, 'Home team score is required'),
    finalScoreAway: z.string().min(1, 'Away team score is required'),
    halfTimeScore: z.string().min(1, 'Half-time score is required'),
    extraTime: z.string().optional()
  }),
  officials: z.object({
    referee: z.string().min(1, 'Referee name is required'),
    assistantReferee1: z.string().min(1, 'Assistant Referee 1 is required'),
    assistantReferee2: z.string().min(1, 'Assistant Referee 2 is required'),
    fourthOfficial: z.string().min(1, 'Fourth Official is required'),
    matchCommissioner: z.string().optional()
  }),
  teamSheets: z.object({
    submittedOnTime: z.boolean(),
    irregularities: z.string().optional()
  }),
  cards: z.object({
    yellowCards: z.array(z.object({
      playerName: z.string().min(1, 'Player name is required'),
      jerseyNo: z.string().min(1, 'Jersey number is required'),
      team: z.string().min(1, 'Team is required'),
      minute: z.string().min(1, 'Minute is required'),
      reason: z.string().min(1, 'Reason is required')
    })),
    redCards: z.array(z.object({
      playerName: z.string().min(1, 'Player name is required'),
      jerseyNo: z.string().min(1, 'Jersey number is required'),
      team: z.string().min(1, 'Team is required'),
      minute: z.string().min(1, 'Minute is required'),
      reason: z.string().min(1, 'Reason is required')
    }))
  }),
  injuries: z.object({
    details: z.string().optional(),
    medicalAttention: z.string().optional()
  }),
  incidents: z.object({
    crowdBehavior: z.string().optional(),
    teamOfficialConduct: z.string().optional(),
    protests: z.string().optional()
  }),
  remarks: z.string().optional()
})

type MatchReportFormData = z.infer<typeof matchReportSchema>

export default function MatchReportForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [yellowCards, setYellowCards] = useState<any[]>([])
  const [redCards, setRedCards] = useState<any[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<MatchReportFormData>({
    resolver: zodResolver(matchReportSchema)
  })

  const addCard = (type: 'yellow' | 'red') => {
    if (type === 'yellow') {
      setYellowCards([...yellowCards, { id: Date.now() }])
    } else {
      setRedCards([...redCards, { id: Date.now() }])
    }
  }

  const removeCard = (type: 'yellow' | 'red', id: number) => {
    if (type === 'yellow') {
      setYellowCards(yellowCards.filter(card => card.id !== id))
    } else {
      setRedCards(redCards.filter(card => card.id !== id))
    }
  }

  const onSubmit = async (data: MatchReportFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/match-reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast.success('Match report submitted successfully!')
        reset()
        setYellowCards([])
        setRedCards([])
      } else {
        const error = await response.json()
        toast.error(error.message || 'Failed to submit report')
      }
    } catch (error) {
      toast.error('An error occurred while submitting the report')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Match Officials Report Form</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Match Basic Details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Competition *</label>
            <input
              {...register('competition')}
              className="input-field"
              placeholder="Enter competition name"
            />
            {errors.competition && (
              <p className="text-red-500 text-sm mt-1">{errors.competition.message}</p>
            )}
          </div>
          <div>
            <label className="label">Date *</label>
            <input
              type="date"
              {...register('date')}
              className="input-field"
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
            )}
          </div>
          <div>
            <label className="label">Venue *</label>
            <input
              {...register('venue')}
              className="input-field"
              placeholder="Enter venue"
            />
            {errors.venue && (
              <p className="text-red-500 text-sm mt-1">{errors.venue.message}</p>
            )}
          </div>
          <div>
            <label className="label">Kick-off Time *</label>
            <input
              type="time"
              {...register('kickoffTime')}
              className="input-field"
            />
            {errors.kickoffTime && (
              <p className="text-red-500 text-sm mt-1">{errors.kickoffTime.message}</p>
            )}
          </div>
        </div>

        {/* Match Details */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">1. Match Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Home Team *</label>
              <input
                {...register('matchDetails.homeTeam')}
                className="input-field"
                placeholder="Enter home team"
              />
              {errors.matchDetails?.homeTeam && (
                <p className="text-red-500 text-sm mt-1">{errors.matchDetails.homeTeam.message}</p>
              )}
            </div>
            <div>
              <label className="label">Away Team *</label>
              <input
                {...register('matchDetails.awayTeam')}
                className="input-field"
                placeholder="Enter away team"
              />
              {errors.matchDetails?.awayTeam && (
                <p className="text-red-500 text-sm mt-1">{errors.matchDetails.awayTeam.message}</p>
              )}
            </div>
            <div>
              <label className="label">Final Score (Home) *</label>
              <input
                type="number"
                min="0"
                {...register('matchDetails.finalScoreHome')}
                className="input-field"
              />
            </div>
            <div>
              <label className="label">Final Score (Away) *</label>
              <input
                type="number"
                min="0"
                {...register('matchDetails.finalScoreAway')}
                className="input-field"
              />
            </div>
            <div>
              <label className="label">Half-Time Score *</label>
              <input
                {...register('matchDetails.halfTimeScore')}
                className="input-field"
                placeholder="e.g., 1-0"
              />
            </div>
            <div>
              <label className="label">Extra Time / Penalties</label>
              <input
                {...register('matchDetails.extraTime')}
                className="input-field"
                placeholder="Enter if applicable"
              />
            </div>
          </div>
        </div>

        {/* Match Officials */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">2. Match Officials</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Referee *</label>
              <input
                {...register('officials.referee')}
                className="input-field"
                placeholder="Enter referee name"
              />
            </div>
            <div>
              <label className="label">Assistant Referee 1 *</label>
              <input
                {...register('officials.assistantReferee1')}
                className="input-field"
                placeholder="Enter AR1 name"
              />
            </div>
            <div>
              <label className="label">Assistant Referee 2 *</label>
              <input
                {...register('officials.assistantReferee2')}
                className="input-field"
                placeholder="Enter AR2 name"
              />
            </div>
            <div>
              <label className="label">Fourth Official *</label>
              <input
                {...register('officials.fourthOfficial')}
                className="input-field"
                placeholder="Enter fourth official name"
              />
            </div>
            <div className="col-span-2">
              <label className="label">Match Commissioner</label>
              <input
                {...register('officials.matchCommissioner')}
                className="input-field"
                placeholder="Enter if applicable"
              />
            </div>
          </div>
        </div>

        {/* Team Sheets */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">3. Team Sheets</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('teamSheets.submittedOnTime')}
                className="rounded text-blue-600"
              />
              <label>Team lists were submitted on time</label>
            </div>
            <div>
              <label className="label">Irregularities</label>
              <textarea
                {...register('teamSheets.irregularities')}
                className="input-field h-24"
                placeholder="Note any irregularities..."
              />
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">4. Cautions (Yellow Cards)</h2>
            <button
              type="button"
              onClick={() => addCard('yellow')}
              className="btn-outline text-sm"
            >
              + Add Yellow Card
            </button>
            {yellowCards.map((card, index) => (
              <div key={card.id} className="grid grid-cols-5 gap-2 items-start">
                <input
                  {...register(`cards.yellowCards.${index}.playerName`)}
                  className="input-field"
                  placeholder="Player Name"
                />
                <input
                  {...register(`cards.yellowCards.${index}.jerseyNo`)}
                  className="input-field"
                  placeholder="Jersey #"
                />
                <input
                  {...register(`cards.yellowCards.${index}.team`)}
                  className="input-field"
                  placeholder="Team"
                />
                <input
                  {...register(`cards.yellowCards.${index}.minute`)}
                  className="input-field"
                  placeholder="Minute"
                  type="number"
                />
                <div className="flex space-x-2">
                  <select
                    {...register(`cards.yellowCards.${index}.reason`)}
                    className="input-field flex-1"
                  >
                    <option value="">Select reason</option>
                    <option value="UB">Unsporting Behavior</option>
                    <option value="DT">Dissent</option>
                    <option value="PI">Persistent Infringement</option>
                    <option value="DR">Delaying Restart</option>
                    <option value="FD">Failure to Respect Distance</option>
                    <option value="ED">Entering/Leaving Field without Permission</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeCard('yellow', card.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">5. Sending Off (Red Cards)</h2>
            <button
              type="button"
              onClick={() => addCard('red')}
              className="btn-outline text-sm"
            >
              + Add Red Card
            </button>
            {redCards.map((card, index) => (
              <div key={card.id} className="grid grid-cols-5 gap-2 items-start">
                <input
                  {...register(`cards.redCards.${index}.playerName`)}
                  className="input-field"
                  placeholder="Player Name"
                />
                <input
                  {...register(`cards.redCards.${index}.jerseyNo`)}
                  className="input-field"
                  placeholder="Jersey #"
                />
                <input
                  {...register(`cards.redCards.${index}.team`)}
                  className="input-field"
                  placeholder="Team"
                />
                <input
                  {...register(`cards.redCards.${index}.minute`)}
                  className="input-field"
                  placeholder="Minute"
                  type="number"
                />
                <div className="flex space-x-2">
                  <select
                    {...register(`cards.redCards.${index}.reason`)}
                    className="input-field flex-1"
                  >
                    <option value="">Select reason</option>
                    <option value="SFP">Serious Foul Play</option>
                    <option value="VC">Violent Conduct</option>
                    <option value="S">Spitting</option>
                    <option value="DOGSO">Denying Goal Scoring Opportunity</option>
                    <option value="AL">Abusive Language</option>
                    <option value="2YC">Second Yellow Card</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeCard('red', card.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Injuries */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">6. Injuries</h2>
          <div>
            <label className="label">Notable Injuries</label>
            <textarea
              {...register('injuries.details')}
              className="input-field h-24"
              placeholder="Describe any notable injuries..."
            />
          </div>
          <div>
            <label className="label">Medical Attention Provided</label>
            <textarea
              {...register('injuries.medicalAttention')}
              className="input-field h-24"
              placeholder="Describe medical attention provided..."
            />
          </div>
        </div>

        {/* Incidents */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">7. Incidents / Protests</h2>
          <div>
            <label className="label">Crowd Behavior</label>
            <textarea
              {...register('incidents.crowdBehavior')}
              className="input-field h-24"
              placeholder="Describe crowd behavior..."
            />
          </div>
          <div>
            <label className="label">Team Officials' Conduct</label>
            <textarea
              {...register('incidents.teamOfficialConduct')}
              className="input-field h-24"
              placeholder="Describe team officials' conduct..."
            />
          </div>
          <div>
            <label className="label">Protests Lodged</label>
            <textarea
              {...register('incidents.protests')}
              className="input-field h-24"
              placeholder="Describe any protests..."
            />
          </div>
        </div>

        {/* Remarks */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">8. Match Officials' Remarks</h2>
          <textarea
            {...register('remarks')}
            className="input-field h-32"
            placeholder="Enter any additional remarks..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => reset()}
            className="btn-outline"
          >
            Clear Form
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              'Submit Report'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
