'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { CalendarIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/outline'

interface Fixture {
  id: string
  homeTeam: { name: string }
  awayTeam: { name: string }
  date: string
  time: string
  venue: string
  discipline: string
  group: string
  status: string
}

export default function FixturesPage() {
  const [fixtures, setFixtures] = useState<Fixture[]>([])
  const [selectedDiscipline, setSelectedDiscipline] = useState('all')
  const [selectedGroup, setSelectedGroup] = useState('all')
  const [selectedDate, setSelectedDate] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchFixtures()
  }, [])

  const fetchFixtures = async () => {
    try {
      // Mock data - in a real app, this would be an API call
      const mockFixtures: Fixture[] = [
        {
          id: '1',
          homeTeam: { name: 'Montserrado' },
          awayTeam: { name: 'Nimba' },
          date: '2024-01-20',
          time: '14:00',
          venue: 'Antoinette Tubman Stadium',
          discipline: 'FOOTBALL',
          group: 'A',
          status: 'SCHEDULED'
        },
        {
          id: '2',
          homeTeam: { name: 'Bong' },
          awayTeam: { name: 'Lofa' },
          date: '2024-01-20',
          time: '16:00',
          venue: 'Antoinette Tubman Stadium',
          discipline: 'FOOTBALL',
          group: 'A',
          status: 'SCHEDULED'
        },
        {
          id: '3',
          homeTeam: { name: 'Grand Bassa' },
          awayTeam: { name: 'Margibi' },
          date: '2024-01-21',
          time: '14:00',
          venue: 'SKD Sports Complex',
          discipline: 'FOOTBALL',
          group: 'B',
          status: 'SCHEDULED'
        },
        {
          id: '4',
          homeTeam: { name: 'Bomi' },
          awayTeam: { name: 'Grand Cape Mount' },
          date: '2024-01-21',
          time: '16:00',
          venue: 'SKD Sports Complex',
          discipline: 'VOLLEYBALL',
          group: 'C',
          status: 'SCHEDULED'
        },
        {
          id: '5',
          homeTeam: { name: 'Maryland' },
          awayTeam: { name: 'Grand Kru' },
          date: '2024-01-22',
          time: '14:00',
          venue: 'Antoinette Tubman Stadium',
          discipline: 'BASKETBALL',
          group: 'D',
          status: 'SCHEDULED'
        }
      ]

      setFixtures(mockFixtures)
    } catch (error) {
      console.error('Error fetching fixtures:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredFixtures = fixtures.filter(fixture => {
    if (selectedDiscipline !== 'all' && fixture.discipline !== selectedDiscipline) return false
    if (selectedGroup !== 'all' && fixture.group !== selectedGroup) return false
    if (selectedDate !== 'all' && fixture.date !== selectedDate) return false
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

  const dates = [
    { value: 'all', label: 'All Dates' },
    { value: '2024-01-20', label: 'January 20, 2024' },
    { value: '2024-01-21', label: 'January 21, 2024' },
    { value: '2024-01-22', label: 'January 22, 2024' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SCHEDULED':
        return 'bg-blue-100 text-blue-800'
      case 'IN_PROGRESS':
        return 'bg-yellow-100 text-yellow-800'
      case 'COMPLETED':
        return 'bg-green-100 text-green-800'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getDisciplineColor = (discipline: string) => {
    switch (discipline) {
      case 'FOOTBALL':
        return 'bg-green-100 text-green-800'
      case 'VOLLEYBALL':
        return 'bg-orange-100 text-orange-800'
      case 'BASKETBALL':
        return 'bg-red-100 text-red-800'
      case 'ATHLETICS':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

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
                  <div key={i} className="h-32 bg-gray-200 rounded"></div>
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
              Match Fixtures
            </h1>
            <p className="text-lg text-gray-600">
              Complete schedule of matches for the National County Sports Meet
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

            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="input-field max-w-xs"
            >
              {dates.map((date) => (
                <option key={date.value} value={date.value}>
                  {date.label}
                </option>
              ))}
            </select>
          </div>

          {/* Fixtures List */}
          <div className="space-y-6">
            {filteredFixtures.map((fixture) => (
              <div key={fixture.id} className="card hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  {/* Match Details */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDisciplineColor(fixture.discipline)}`}>
                          {fixture.discipline}
                        </span>
                        <span className="text-sm text-gray-500">Group {fixture.group}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(fixture.status)}`}>
                        {fixture.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1 text-right">
                        <h3 className="text-lg font-semibold">{fixture.homeTeam.name}</h3>
                      </div>
                      <div className="mx-6 text-center">
                        <span className="text-2xl font-bold text-primary-600">VS</span>
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="text-lg font-semibold">{fixture.awayTeam.name}</h3>
                      </div>
                    </div>

                    {/* Match Info */}
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-600">
                      <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        {new Date(fixture.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-2" />
                        {fixture.time}
                      </div>
                      <div className="flex items-center">
                        <MapPinIcon className="w-4 h-4 mr-2" />
                        {fixture.venue}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredFixtures.length === 0 && (
              <div className="text-center py-12">
                <CalendarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No fixtures found</h3>
                <p className="text-gray-600">Try adjusting your filters to see more matches.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
