'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const MatchSchedulePage: React.FC = () => {
  const router = useRouter();

  const assignedMatches = [
    {
      id: '1',
      team1: 'Bong',
      team2: 'Montserrado',
      date: '2025-01-15',
      time: '15:00',
      venue: 'SKD Sports Complex',
      discipline: 'football',
      group: 'A',
      status: 'upcoming'
    },
    {
      id: '2',
      team1: 'Nimba',
      team2: 'Bomi',
      date: '2025-01-16',
      time: '17:00',
      venue: 'Antoinette Tubman Stadium',
      discipline: 'football',
      group: 'A',
      status: 'upcoming'
    },
    {
      id: '3',
      team1: 'Grand Bassa',
      team2: 'Gbarpolu',
      date: '2025-01-14',
      time: '15:00',
      venue: 'SKD Sports Complex',
      discipline: 'football',
      group: 'B',
      status: 'completed'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Match Schedule</h1>
          <p className="text-gray-600 mb-6">Your assigned matches and schedule</p>
          
          <div className="space-y-4">
            {assignedMatches.map((match) => (
              <div key={match.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {match.team1} vs {match.team2}
                    </h3>
                    <p className="text-sm text-gray-600">{match.discipline} - Group {match.group}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    match.status === 'upcoming' ? 'bg-blue-100 text-blue-600' :
                    match.status === 'completed' ? 'bg-green-100 text-green-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {match.status}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div>📅 {new Date(match.date).toLocaleDateString()}</div>
                  <div>🕐 {match.time}</div>
                  <div>📍 {match.venue}</div>
                </div>
                                 {match.status === 'upcoming' && (
                   <div className="mt-3 flex space-x-2">
                     <button 
                       onClick={() => router.push('/admin/player-inspection')}
                       className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                     >
                       Start Inspection
                     </button>
                     <button 
                       onClick={() => router.push(`/admin/match-details/${match.id}`)}
                       className="text-sm bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 transition-colors"
                     >
                       View Details
                     </button>
                   </div>
                 )}
                                 {match.status === 'completed' && (
                   <div className="mt-3">
                     <button 
                       onClick={() => router.push('/admin/match-report')}
                       className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
                     >
                       Submit Report
                     </button>
                   </div>
                 )}
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <button 
              onClick={() => router.push('/dashboard/match-official')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchSchedulePage;
