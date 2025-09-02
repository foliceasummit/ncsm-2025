'use client'

import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Trophy, Users, Filter } from 'lucide-react';
import Image from 'next/image';
import Navigation from '../components/layout/Navigation';

// County flags mapping
const countyFlags = {
  'Montserrado': 'https://ik.imagekit.io/foliceasummit/mysncsm/Counties%20Flag/Montserrado_County.png?updatedAt=1756427586924',
  'Bong': 'https://ik.imagekit.io/foliceasummit/mysncsm/Counties%20Flag/Bong_County.png?updatedAt=1756427581521',
  'Nimba': 'https://ik.imagekit.io/foliceasummit/mysncsm/Counties%20Flag/Nimba.png?updatedAt=1756427586970',
  'Grand Bassa': 'https://ik.imagekit.io/foliceasummit/mysncsm/Counties%20Flag/Grand_Bassa.png?updatedAt=1756427581433',
  'Lofa': 'https://ik.imagekit.io/foliceasummit/mysncsm/Counties%20Flag/Lofa_County.png?updatedAt=1756427585768',
  'Grand Cape Mount': 'https://ik.imagekit.io/foliceasummit/mysncsm/Counties%20Flag/Grand_Cape_Mount_County..png?updatedAt=1756427582121',
  'Bomi': 'https://ik.imagekit.io/foliceasummit/mysncsm/Counties%20Flag/Bomi.png?updatedAt=1756427580872',
  'Margibi': 'https://ik.imagekit.io/foliceasummit/mysncsm/Counties%20Flag/margibi.png?updatedAt=1756427585894',
  'River Cess': 'https://ik.imagekit.io/foliceasummit/mysncsm/Counties%20Flag/Rivercess_County.png?updatedAt=1756427587968',
  'Grand Gedeh': 'https://ik.imagekit.io/foliceasummit/mysncsm/Counties%20Flag/Grand_Gedeh_County.png?updatedAt=1756427582316',
  'Sinoe': 'https://ik.imagekit.io/foliceasummit/mysncsm/Counties%20Flag/Sinoe_County.png?updatedAt=1756427587986',
  'Maryland': 'https://ik.imagekit.io/foliceasummit/mysncsm/Counties%20Flag/Maryland_County.png?updatedAt=1756427587986',
  'Grand Kru': 'https://ik.imagekit.io/foliceasummit/mysncsm/Counties%20Flag/Grand_Kru_County.png?updatedAt=1756427582433',
  'River Gee': 'https://ik.imagekit.io/foliceasummit/mysncsm/Counties%20Flag/River_Gee_County.png?updatedAt=1756427587799',
  'Gbarpolu': 'https://ik.imagekit.io/foliceasummit/mysncsm/Counties%20Flag/Gbarpolu_County.png?updatedAt=1756427581732'
};

// Comprehensive mock data for all groups and disciplines
const allMatches = [
  // Group A - Football
  { id: '1', team1: 'Montserrado', team2: 'Nimba', scoreTeam1: 2, scoreTeam2: 1, date: '2025-01-15', time: '15:00', venue: 'SKD Sports Complex', discipline: 'football', group: 'A', status: 'completed' },
  { id: '2', team1: 'Margibi', team2: 'Grand Kru', scoreTeam1: 0, scoreTeam2: 0, date: '2025-01-15', time: '17:00', venue: 'Antoinette Tubman Stadium', discipline: 'football', group: 'A', status: 'completed' },
  { id: '3', team1: 'Montserrado', team2: 'Margibi', scoreTeam1: 3, scoreTeam2: 2, date: '2025-01-17', time: '15:00', venue: 'SKD Sports Complex', discipline: 'football', group: 'A', status: 'completed' },
  { id: '4', team1: 'Nimba', team2: 'Grand Kru', scoreTeam1: 1, scoreTeam2: 1, date: '2025-01-17', time: '17:00', venue: 'Antoinette Tubman Stadium', discipline: 'football', group: 'A', status: 'completed' },
  { id: '5', team1: 'Montserrado', team2: 'Grand Kru', scoreTeam1: 4, scoreTeam2: 0, date: '2025-01-19', time: '15:00', venue: 'SKD Sports Complex', discipline: 'football', group: 'A', status: 'completed' },
  { id: '6', team1: 'Nimba', team2: 'Margibi', scoreTeam1: 2, scoreTeam2: 2, date: '2025-01-19', time: '17:00', venue: 'Antoinette Tubman Stadium', discipline: 'football', group: 'A', status: 'completed' },

  // Group B - Football
  { id: '7', team1: 'Bong', team2: 'Lofa', scoreTeam1: 1, scoreTeam2: 1, date: '2025-01-16', time: '15:00', venue: 'SKD Sports Complex', discipline: 'football', group: 'B', status: 'completed' },
  { id: '8', team1: 'Sinoe', team2: 'River Gee', scoreTeam1: 2, scoreTeam2: 0, date: '2025-01-16', time: '17:00', venue: 'Antoinette Tubman Stadium', discipline: 'football', group: 'B', status: 'completed' },
  { id: '9', team1: 'Bong', team2: 'Sinoe', scoreTeam1: 3, scoreTeam2: 1, date: '2025-01-18', time: '15:00', venue: 'SKD Sports Complex', discipline: 'football', group: 'B', status: 'completed' },
  { id: '10', team1: 'Lofa', team2: 'River Gee', scoreTeam1: 0, scoreTeam2: 2, date: '2025-01-18', time: '17:00', venue: 'Antoinette Tubman Stadium', discipline: 'football', group: 'B', status: 'completed' },
  { id: '11', team1: 'Bong', team2: 'River Gee', scoreTeam1: 2, scoreTeam2: 1, date: '2025-01-20', time: '15:00', venue: 'SKD Sports Complex', discipline: 'football', group: 'B', status: 'completed' },
  { id: '12', team1: 'Lofa', team2: 'Sinoe', scoreTeam1: 1, scoreTeam2: 3, date: '2025-01-20', time: '17:00', venue: 'Antoinette Tubman Stadium', discipline: 'football', group: 'B', status: 'completed' },

  // Group C - Football
  { id: '13', team1: 'Grand Bassa', team2: 'Grand Cape Mount', scoreTeam1: 2, scoreTeam2: 0, date: '2025-01-16', time: '19:00', venue: 'SKD Sports Complex', discipline: 'football', group: 'C', status: 'completed' },
  { id: '14', team1: 'Grand Gedeh', team2: 'Gbarpolu', scoreTeam1: 1, scoreTeam2: 1, date: '2025-01-16', time: '21:00', venue: 'Antoinette Tubman Stadium', discipline: 'football', group: 'C', status: 'completed' },
  { id: '15', team1: 'Grand Bassa', team2: 'Grand Gedeh', scoreTeam1: 3, scoreTeam2: 2, date: '2025-01-18', time: '19:00', venue: 'SKD Sports Complex', discipline: 'football', group: 'C', status: 'completed' },
  { id: '16', team1: 'Grand Cape Mount', team2: 'Gbarpolu', scoreTeam1: 0, scoreTeam2: 1, date: '2025-01-18', time: '21:00', venue: 'Antoinette Tubman Stadium', discipline: 'football', group: 'C', status: 'completed' },
  { id: '17', team1: 'Grand Bassa', team2: 'Gbarpolu', scoreTeam1: 2, scoreTeam2: 2, date: '2025-01-20', time: '19:00', venue: 'SKD Sports Complex', discipline: 'football', group: 'C', status: 'completed' },
  { id: '18', team1: 'Grand Cape Mount', team2: 'Grand Gedeh', scoreTeam1: 1, scoreTeam2: 3, date: '2025-01-20', time: '21:00', venue: 'Antoinette Tubman Stadium', discipline: 'football', group: 'C', status: 'completed' },

  // Group D - Football
  { id: '19', team1: 'Bomi', team2: 'River Cess', scoreTeam1: 1, scoreTeam2: 0, date: '2025-01-17', time: '19:00', venue: 'SKD Sports Complex', discipline: 'football', group: 'D', status: 'completed' },
  { id: '20', team1: 'Maryland', team2: 'Bomi', scoreTeam1: 2, scoreTeam2: 1, date: '2025-01-19', time: '19:00', venue: 'SKD Sports Complex', discipline: 'football', group: 'D', status: 'completed' },
  { id: '21', team1: 'River Cess', team2: 'Maryland', scoreTeam1: 0, scoreTeam2: 2, date: '2025-01-21', time: '19:00', venue: 'SKD Sports Complex', discipline: 'football', group: 'D', status: 'completed' },

  // Basketball Matches
  { id: '22', team1: 'Montserrado', team2: 'Nimba', scoreTeam1: 85, scoreTeam2: 78, date: '2025-01-22', time: '15:00', venue: 'SKD Sports Complex', discipline: 'basketball', group: 'A', status: 'completed' },
  { id: '23', team1: 'Bong', team2: 'Lofa', scoreTeam1: 92, scoreTeam2: 88, date: '2025-01-22', time: '17:00', venue: 'Antoinette Tubman Stadium', discipline: 'basketball', group: 'B', status: 'completed' },
  { id: '24', team1: 'Grand Bassa', team2: 'Grand Gedeh', scoreTeam1: 76, scoreTeam2: 82, date: '2025-01-22', time: '19:00', venue: 'SKD Sports Complex', discipline: 'basketball', group: 'C', status: 'completed' },
  { id: '25', team1: 'Bomi', team2: 'Maryland', scoreTeam1: 89, scoreTeam2: 91, date: '2025-01-22', time: '21:00', venue: 'Antoinette Tubman Stadium', discipline: 'basketball', group: 'D', status: 'completed' },

  // Volleyball Matches
  { id: '26', team1: 'Margibi', team2: 'Grand Kru', scoreTeam1: 3, scoreTeam2: 1, date: '2025-01-23', time: '15:00', venue: 'SKD Sports Complex', discipline: 'volleyball', group: 'A', status: 'completed' },
  { id: '27', team1: 'Sinoe', team2: 'River Gee', scoreTeam1: 3, scoreTeam2: 2, date: '2025-01-23', time: '17:00', venue: 'Antoinette Tubman Stadium', discipline: 'volleyball', group: 'B', status: 'completed' },
  { id: '28', team1: 'Grand Cape Mount', team2: 'Gbarpolu', scoreTeam1: 1, scoreTeam2: 3, date: '2025-01-23', time: '19:00', venue: 'SKD Sports Complex', discipline: 'volleyball', group: 'C', status: 'completed' },
  { id: '29', team1: 'River Cess', team2: 'Bomi', scoreTeam1: 2, scoreTeam2: 3, date: '2025-01-23', time: '21:00', venue: 'Antoinette Tubman Stadium', discipline: 'volleyball', group: 'D', status: 'completed' },

  // Kickball Matches
  { id: '30', team1: 'Montserrado', team2: 'Margibi', scoreTeam1: 5, scoreTeam2: 3, date: '2025-01-24', time: '15:00', venue: 'SKD Sports Complex', discipline: 'kickball', group: 'A', status: 'completed' },
  { id: '31', team1: 'Bong', team2: 'Sinoe', scoreTeam1: 4, scoreTeam2: 4, date: '2025-01-24', time: '17:00', venue: 'Antoinette Tubman Stadium', discipline: 'kickball', group: 'B', status: 'completed' },
  { id: '32', team1: 'Grand Bassa', team2: 'Grand Cape Mount', scoreTeam1: 6, scoreTeam2: 2, date: '2025-01-24', time: '19:00', venue: 'SKD Sports Complex', discipline: 'kickball', group: 'C', status: 'completed' },
  { id: '33', team1: 'Maryland', team2: 'River Cess', scoreTeam1: 3, scoreTeam2: 5, date: '2025-01-24', time: '21:00', venue: 'Antoinette Tubman Stadium', discipline: 'kickball', group: 'D', status: 'completed' },

  // Female Soccer Matches
  { id: '34', team1: 'Nimba', team2: 'Grand Kru', scoreTeam1: 2, scoreTeam2: 0, date: '2025-01-25', time: '15:00', venue: 'SKD Sports Complex', discipline: 'female_soccer', group: 'A', status: 'completed' },
  { id: '35', team1: 'Lofa', team2: 'River Gee', scoreTeam1: 1, scoreTeam2: 1, date: '2025-01-25', time: '17:00', venue: 'Antoinette Tubman Stadium', discipline: 'female_soccer', group: 'B', status: 'completed' },
  { id: '36', team1: 'Grand Gedeh', team2: 'Gbarpolu', scoreTeam1: 3, scoreTeam2: 1, date: '2025-01-25', time: '19:00', venue: 'SKD Sports Complex', discipline: 'female_soccer', group: 'C', status: 'completed' },
  { id: '37', team1: 'Bomi', team2: 'Maryland', scoreTeam1: 0, scoreTeam2: 2, date: '2025-01-25', time: '21:00', venue: 'Antoinette Tubman Stadium', discipline: 'female_soccer', group: 'D', status: 'completed' },

  // Athletics Events
  { id: '38', team1: 'Montserrado', team2: 'Nimba', scoreTeam1: 8, scoreTeam2: 6, date: '2025-01-26', time: '15:00', venue: 'SKD Sports Complex', discipline: 'athletics', group: 'A', status: 'completed' },
  { id: '39', team1: 'Bong', team2: 'Lofa', scoreTeam1: 7, scoreTeam2: 7, date: '2025-01-26', time: '17:00', venue: 'Antoinette Tubman Stadium', discipline: 'athletics', group: 'B', status: 'completed' },
  { id: '40', team1: 'Grand Bassa', team2: 'Grand Gedeh', scoreTeam1: 9, scoreTeam2: 5, date: '2025-01-26', time: '19:00', venue: 'SKD Sports Complex', discipline: 'athletics', group: 'C', status: 'completed' },
  { id: '41', team1: 'Maryland', team2: 'River Cess', scoreTeam1: 6, scoreTeam2: 8, date: '2025-01-26', time: '21:00', venue: 'Antoinette Tubman Stadium', discipline: 'athletics', group: 'D', status: 'completed' },

  // Live Matches
  { id: '42', team1: 'Montserrado', team2: 'Bong', scoreTeam1: 1, scoreTeam2: 0, date: '2025-01-27', time: '15:00', venue: 'SKD Sports Complex', discipline: 'football', group: 'A', status: 'live', minute: '65' },
  { id: '43', team1: 'Grand Bassa', team2: 'Bomi', scoreTeam1: 2, scoreTeam2: 1, date: '2025-01-27', time: '17:00', venue: 'Antoinette Tubman Stadium', discipline: 'basketball', group: 'C', status: 'live', minute: '32' },

  // Upcoming Matches
  { id: '44', team1: 'Nimba', team2: 'Margibi', date: '2025-01-28', time: '15:00', venue: 'SKD Sports Complex', discipline: 'football', group: 'A', status: 'upcoming' },
  { id: '45', team1: 'Lofa', team2: 'Sinoe', date: '2025-01-28', time: '17:00', venue: 'Antoinette Tubman Stadium', discipline: 'volleyball', group: 'B', status: 'upcoming' },
  { id: '46', team1: 'Grand Cape Mount', team2: 'Grand Gedeh', date: '2025-01-28', time: '19:00', venue: 'SKD Sports Complex', discipline: 'kickball', group: 'C', status: 'upcoming' },
  { id: '47', team1: 'River Cess', team2: 'Maryland', date: '2025-01-28', time: '21:00', venue: 'Antoinette Tubman Stadium', discipline: 'female_soccer', group: 'D', status: 'upcoming' },
  { id: '48', team1: 'Grand Kru', team2: 'Montserrado', date: '2025-01-29', time: '15:00', venue: 'SKD Sports Complex', discipline: 'basketball', group: 'A', status: 'upcoming' },
  { id: '49', team1: 'River Gee', team2: 'Bong', date: '2025-01-29', time: '17:00', venue: 'Antoinette Tubman Stadium', discipline: 'athletics', group: 'B', status: 'upcoming' },
  { id: '50', team1: 'Gbarpolu', team2: 'Grand Bassa', date: '2025-01-29', time: '19:00', venue: 'SKD Sports Complex', discipline: 'football', group: 'C', status: 'upcoming' },
  { id: '51', team1: 'Bomi', team2: 'River Cess', date: '2025-01-29', time: '21:00', venue: 'Antoinette Tubman Stadium', discipline: 'volleyball', group: 'D', status: 'upcoming' }
];

// Team component with flag
const TeamWithFlag = ({ teamName }: { teamName: string }) => (
  <div className="flex items-center justify-center space-x-3">
    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg">
      <Image
        src={countyFlags[teamName as keyof typeof countyFlags] || '/images/default-flag.png'}
        alt={`${teamName} flag`}
        fill
        className="object-cover"
        sizes="48px"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent) {
            parent.innerHTML = '<div class="flex items-center justify-center h-full text-lg font-bold text-gray-600">🏁</div>';
          }
        }}
      />
    </div>
    <h3 className="text-xl font-bold text-gray-900">{teamName}</h3>
  </div>
);

const Results: React.FC = () => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('all');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const disciplines = ['football', 'female_soccer', 'basketball', 'volleyball', 'kickball', 'athletics'];
  const groups = ['A', 'B', 'C', 'D'];
  const statuses = ['completed', 'live', 'upcoming'];

  // Filter matches based on selections
  const filteredMatches = allMatches.filter(match => {
    const disciplineMatch = selectedDiscipline === 'all' || match.discipline === selectedDiscipline;
    const groupMatch = selectedGroup === 'all' || match.group === selectedGroup;
    const statusMatch = selectedStatus === 'all' || match.status === selectedStatus;
    return disciplineMatch && groupMatch && statusMatch;
  });

  // Separate matches by status
  const liveMatches = filteredMatches.filter(match => match.status === 'live');
  const completedMatches = filteredMatches.filter(match => match.status === 'completed');
  const upcomingMatches = filteredMatches.filter(match => match.status === 'upcoming');

  // Get discipline display name
  const getDisciplineName = (discipline: string) => {
    return discipline.replace('_', ' ').toUpperCase();
  };

  // Get group color
  const getGroupColor = (group: string) => {
    switch (group) {
      case 'A': return 'text-red-600 bg-red-100';
      case 'B': return 'text-blue-600 bg-blue-100';
      case 'C': return 'text-green-600 bg-green-100';
      case 'D': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      <Navigation />
      <main className="pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container-custom relative z-10">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Results &{' '}
                <span className="text-gradient bg-gradient-to-r from-primary-300 to-secondary-300 bg-clip-text text-transparent">
                  Fixtures
                </span>
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                Stay updated with all match results and upcoming fixtures from the National County Sports Meet
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Enhanced Filters */}
            <div className="bg-white rounded-xl shadow-xl p-6 mb-8">
              <div className="flex items-center mb-4">
                <Filter className="w-5 h-5 text-primary-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Filter Matches</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discipline
                  </label>
                  <select
                    value={selectedDiscipline}
                    onChange={(e) => setSelectedDiscipline(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="all">All Disciplines</option>
                    {disciplines.map((discipline) => (
                      <option key={discipline} value={discipline}>
                        {getDisciplineName(discipline)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Group
                  </label>
                  <select
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="all">All Groups</option>
                    {groups.map((group) => (
                      <option key={group} value={group}>
                        Group {group}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="all">All Matches</option>
                    <option value="completed">Completed</option>
                    <option value="live">Live</option>
                    <option value="upcoming">Upcoming</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Live Matches */}
            {liveMatches.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <div className="w-3 h-3 bg-red-600 rounded-full mr-2 animate-pulse"></div>
                  Live Matches
                </h2>
                <div className="space-y-4">
                  {liveMatches.map((match) => (
                    <div key={match.id} className="bg-white rounded-xl shadow-xl p-6 border-l-4 border-red-600">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium mr-3">
                            LIVE
                          </span>
                          <span className="text-red-600 font-medium">{match.minute}'</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGroupColor(match.group)}`}>
                            Group {match.group}
                          </span>
                          <span className="text-sm text-gray-600">
                            {getDisciplineName(match.discipline)}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 items-center text-center">
                        <div>
                          <TeamWithFlag teamName={match.team1} />
                        </div>
                        <div className="bg-gray-100 rounded-lg py-4">
                          <div className="text-3xl font-bold text-gray-900">
                            {match.scoreTeam1} - {match.scoreTeam2}
                          </div>
                        </div>
                        <div>
                          <TeamWithFlag teamName={match.team2} />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center mt-4 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        {match.venue}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Results */}
            {completedMatches.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Trophy className="w-6 h-6 mr-2 text-yellow-600" />
                  Recent Results
                </h2>
                <div className="space-y-4">
                  {completedMatches.map((match) => (
                    <div key={match.id} className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-sm text-gray-600">
                          {new Date(match.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGroupColor(match.group)}`}>
                            Group {match.group}
                          </span>
                          <span className="text-sm text-gray-600">
                            {getDisciplineName(match.discipline)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 items-center text-center">
                        <div>
                          <TeamWithFlag teamName={match.team1} />
                        </div>
                        <div className="bg-gray-100 rounded-lg py-4">
                          <div className="text-3xl font-bold text-gray-900">
                            {match.scoreTeam1} - {match.scoreTeam2}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">FT</div>
                        </div>
                        <div>
                          <TeamWithFlag teamName={match.team2} />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {match.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {match.venue}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Fixtures */}
            {upcomingMatches.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Calendar className="w-6 h-6 mr-2 text-blue-600" />
                  Upcoming Fixtures
                </h2>
                <div className="space-y-4">
                  {upcomingMatches.map((match) => (
                    <div key={match.id} className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-sm text-gray-600">
                          {new Date(match.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGroupColor(match.group)}`}>
                            Group {match.group}
                          </span>
                          <span className="text-sm text-gray-600">
                            {getDisciplineName(match.discipline)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 items-center text-center">
                        <div>
                          <TeamWithFlag teamName={match.team1} />
                        </div>
                        <div className="bg-blue-50 rounded-lg py-4 border-2 border-blue-200">
                          <div className="text-lg font-bold text-blue-600">VS</div>
                          <div className="text-sm text-blue-600 mt-1">{match.time}</div>
                        </div>
                        <div>
                          <TeamWithFlag teamName={match.team2} />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center mt-4 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        {match.venue}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No matches message */}
            {filteredMatches.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No matches found</h3>
                <p className="text-gray-600">
                  Try adjusting your filters to see more results.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Results;
