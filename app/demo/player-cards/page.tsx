'use client';

import React from 'react';
// import PlayerCardGallery from './components/PlayerCardGallery';

// Sample player data for demonstration
const samplePlayers = [
  {
    id: 'NCSM001',
    firstName: 'John',
    lastName: 'Doe',
    middleName: 'Michael',
    photo: 'https://ik.imagekit.io/foliceasummit/mysncsm/cm.png?updatedAt=1756427570941',
    discipline: 'FOOTBALL',
    level: 'First Division',
    county: 'Montserrado',
    dateOfBirth: '1995-03-15',
    nationality: 'Liberian',
    position: 'Forward',
    status: 'Approved'
  },
  {
    id: 'NCSM002',
    firstName: 'Jane',
    lastName: 'Smith',
    middleName: 'Elizabeth',
    photo: 'https://ik.imagekit.io/foliceasummit/mysncsm/cm.png?updatedAt=1756427570941',
    discipline: 'BASKETBALL',
    level: 'Second Division',
    county: 'Bong',
    dateOfBirth: '1998-07-22',
    nationality: 'Liberian',
    position: 'Point Guard',
    status: 'Approved'
  },
  {
    id: 'NCSM003',
    firstName: 'Mike',
    lastName: 'Johnson',
    middleName: 'Robert',
    photo: 'https://ik.imagekit.io/foliceasummit/mysncsm/cm.png?updatedAt=1756427570941',
    discipline: 'VOLLEYBALL',
    level: '3rd Division',
    county: 'Nimba',
    dateOfBirth: '1997-11-08',
    nationality: 'Liberian',
    position: 'Setter',
    status: 'Approved'
  },
  {
    id: 'NCSM004',
    firstName: 'Sarah',
    lastName: 'Williams',
    middleName: 'Anne',
    photo: 'https://ik.imagekit.io/foliceasummit/mysncsm/cm.png?updatedAt=1756427570941',
    discipline: 'KICKBALL',
    level: 'First Division',
    county: 'Lofa',
    dateOfBirth: '1996-05-12',
    nationality: 'Liberian',
    position: 'Pitcher',
    status: 'Approved'
  },
  {
    id: 'NCSM005',
    firstName: 'David',
    lastName: 'Brown',
    middleName: 'Thomas',
    photo: 'https://ik.imagekit.io/foliceasummit/mysncsm/cm.png?updatedAt=1756427570941',
    discipline: 'ATHLETICS',
    level: 'Second Division',
    county: 'Grand Bassa',
    dateOfBirth: '1999-02-28',
    nationality: 'Liberian',
    position: 'Sprint',
    status: 'Approved'
  },
  {
    id: 'NCSM006',
    firstName: 'Emma',
    lastName: 'Davis',
    middleName: 'Grace',
    photo: 'https://ik.imagekit.io/foliceasummit/mysncsm/cm.png?updatedAt=1756427570941',
    discipline: 'FEMALE_SOCCER',
    level: 'First Division',
    county: 'Margibi',
    dateOfBirth: '1997-09-14',
    nationality: 'Liberian',
    position: 'Midfielder',
    status: 'Approved'
  }
];

export default function PlayerCardsDemoPage() {
  const handleDownloadCard = (player: any) => {
    console.log('Downloading card for:', player.firstName, player.lastName);
    // In a real implementation, this would generate and download a PDF
    alert(`Downloading player card for ${player.firstName} ${player.lastName}`);
  };

  const handleViewPlayer = (player: any) => {
    console.log('Viewing player:', player.firstName, player.lastName);
    // In a real implementation, this would show player details
    alert(`Viewing details for ${player.firstName} ${player.lastName}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Player Cards Demo</h1>
          <p className="text-gray-600 mt-2">
            Modern NCSM player cards for all disciplines with the new division system
          </p>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">New Features:</h3>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• <strong>NCSM ID:</strong> Unique identifier for each player</li>
              <li>• <strong>Discipline Categories:</strong> Football, Basketball, Volleyball, Kickball, Athletics, Female Soccer</li>
              <li>• <strong>Division Levels:</strong> 3rd Division, Second Division, First Division</li>
              <li>• <strong>6-Month Validity:</strong> Cards valid for 6 months from generation</li>
              <li>• <strong>Modern Design:</strong> Professional card layout with discipline-specific colors</li>
            </ul>
          </div>
        </div>

        {/* Player Cards Gallery */}
        {/* <PlayerCardGallery
          players={samplePlayers}
          title="NCSM Player Cards - All Disciplines"
          showFilters={true}
          onDownloadCard={handleDownloadCard}
          onViewPlayer={handleViewPlayer}
        /> */}
        
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Player Cards Demo</h3>
          <p className="text-gray-600 mb-4">The modern player card system is being implemented.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {samplePlayers.map((player) => (
              <div key={player.id} className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
                <h4 className="font-semibold text-gray-900">{player.firstName} {player.lastName}</h4>
                <p className="text-sm text-gray-600">{player.discipline}</p>
                <p className="text-sm text-gray-500">{player.level}</p>
                <p className="text-sm text-gray-500">{player.county}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Card Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Discipline Colors</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>Football & Female Soccer</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-orange-500 rounded"></div>
                  <span>Basketball</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span>Volleyball</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-purple-500 rounded"></div>
                  <span>Kickball</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span>Athletics</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Division System</h4>
              <div className="space-y-2 text-sm">
                <div><strong>3rd Division:</strong> Entry level players</div>
                <div><strong>Second Division:</strong> Intermediate level players</div>
                <div><strong>First Division:</strong> Advanced level players</div>
              </div>
              
              <h4 className="font-medium text-gray-800 mb-2 mt-4">Card Features</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <div>• Professional photo display</div>
                <div>• Complete player information</div>
                <div>• 6-month validity period</div>
                <div>• Download and view options</div>
                <div>• Responsive design for all devices</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
