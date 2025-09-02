'use client'

import { useState, useEffect } from 'react'
import Navigation from '../components/layout/Navigation'
import Footer from '../components/layout/Footer'
import { UsersIcon, TrophyIcon, MapPinIcon } from '@heroicons/react/24/outline'

interface County {
  id: string
  name: string
  group: string
  playerCount: number
  officialCount: number
  achievements: string[]
  description: string
  image?: string
}

export default function CountyProfilePage() {
  const [counties, setCounties] = useState<County[]>([])
  const [selectedGroup, setSelectedGroup] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchCounties()
  }, [])

  const fetchCounties = async () => {
    try {
      // Mock data - in a real app, this would be an API call
      const mockCounties: County[] = [
        {
          id: '1',
          name: 'Montserrado',
          group: 'A',
          playerCount: 45,
          officialCount: 8,
          achievements: ['Champions 2023', 'Best Team Spirit 2022', 'Most Disciplined Team 2021'],
          description: 'Montserrado County, home to Liberia\'s capital Monrovia, has been a dominant force in the National County Sports Meet, consistently producing top-tier athletes across all disciplines.',
          image: '/images/county-montserrado.jpg'
        },
        {
          id: '2',
          name: 'Nimba',
          group: 'A',
          playerCount: 42,
          officialCount: 7,
          achievements: ['Runners-up 2023', 'Best Football Team 2022', 'Athletics Champions 2021'],
          description: 'Nimba County, known for its rich sporting culture, has excelled particularly in football and athletics, producing many national team players.',
          image: '/images/county-nimba.jpg'
        },
        {
          id: '3',
          name: 'Bong',
          group: 'A',
          playerCount: 38,
          officialCount: 6,
          achievements: ['Volleyball Champions 2023', 'Most Improved Team 2022'],
          description: 'Bong County has shown remarkable improvement in recent years, particularly in volleyball and basketball competitions.',
          image: '/images/county-bong.jpg'
        },
        {
          id: '4',
          name: 'Grand Bassa',
          group: 'B',
          playerCount: 40,
          officialCount: 7,
          achievements: ['Basketball Champions 2023', 'Best Female Team 2022'],
          description: 'Grand Bassa County has a strong tradition in basketball and has been particularly successful in female sports categories.',
          image: '/images/county-grand-bassa.jpg'
        },
        {
          id: '5',
          name: 'Lofa',
          group: 'A',
          playerCount: 35,
          officialCount: 5,
          achievements: ['Kickball Champions 2023', 'Fair Play Award 2022'],
          description: 'Lofa County is known for its sportsmanship and has excelled in kickball and traditional sports.',
          image: '/images/county-lofa.jpg'
        },
        {
          id: '6',
          name: 'Margibi',
          group: 'C',
          playerCount: 33,
          officialCount: 6,
          achievements: ['Most Disciplined Team 2023', 'Best Newcomer 2022'],
          description: 'Margibi County has quickly established itself as a competitive force with strong performances across multiple disciplines.',
          image: '/images/county-margibi.jpg'
        }
      ]

      setCounties(mockCounties)
    } catch (error) {
      console.error('Error fetching counties:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredCounties = counties.filter(county => {
    if (selectedGroup !== 'all' && county.group !== selectedGroup) return false
    return true
  })

  const groups = [
    { value: 'all', label: 'All Groups' },
    { value: 'A', label: 'Group A' },
    { value: 'B', label: 'Group B' },
    { value: 'C', label: 'Group C' },
    { value: 'D', label: 'Group D' },
  ]

  const getGroupColor = (group: string) => {
    switch (group) {
      case 'A':
        return 'bg-red-100 text-red-800'
      case 'B':
        return 'bg-blue-100 text-blue-800'
      case 'C':
        return 'bg-green-100 text-green-800'
      case 'D':
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-md p-6">
                    <div className="h-48 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
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
              County Profiles
            </h1>
            <p className="text-lg text-gray-600">
              Meet the 15 counties participating in the National County Sports Meet
            </p>
          </div>

          {/* Group Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {groups.map((group) => (
              <button
                key={group.value}
                onClick={() => setSelectedGroup(group.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedGroup === group.value
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {group.label}
              </button>
            ))}
          </div>

          {/* Counties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCounties.map((county) => (
              <div key={county.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={county.image || '/images/default-county.jpg'}
                    alt={county.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getGroupColor(county.group)}`}>
                      Group {county.group}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {county.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {county.description}
                  </p>

                  {/* Statistics */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <UsersIcon className="w-4 h-4 mr-1" />
                      {county.playerCount} Players
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <TrophyIcon className="w-4 h-4 mr-1" />
                      {county.officialCount} Officials
                    </div>
                  </div>

                  {/* Achievements */}
                  {county.achievements.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Recent Achievements</h4>
                      <div className="space-y-1">
                        {county.achievements.slice(0, 2).map((achievement, index) => (
                          <div key={index} className="flex items-center text-xs text-gray-600">
                            <div className="w-1 h-1 bg-primary-600 rounded-full mr-2"></div>
                            {achievement}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* View Details Button */}
                  <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredCounties.length === 0 && (
            <div className="text-center py-12">
              <MapPinIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No counties found</h3>
              <p className="text-gray-600">Try selecting a different group to see more counties.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
