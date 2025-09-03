'use client'

import React, { useState } from 'react';
import { Trophy, TrendingUp, TrendingDown, Medal, Filter } from 'lucide-react';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';

// Comprehensive standings data with correct formats for each discipline
const allStandings = {
  football: {
    'A': [
      { county: 'Montserrado', played: 3, won: 3, drawn: 0, lost: 0, goalsFor: 8, goalsAgainst: 2, goalDifference: 6, points: 9 },
      { county: 'Nimba', played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 5, goalsAgainst: 4, goalDifference: 1, points: 6 },
      { county: 'Margibi', played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 3, goalsAgainst: 6, goalDifference: -3, points: 3 },
      { county: 'Grand Kru', played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 2, goalsAgainst: 6, goalDifference: -4, points: 0 }
    ],
    'B': [
      { county: 'Bong', played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 5, goalsAgainst: 2, goalDifference: 3, points: 7 },
      { county: 'Lofa', played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 4, goalsAgainst: 3, goalDifference: 1, points: 6 },
      { county: 'Sinoe', played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 3, goalsAgainst: 4, goalDifference: -1, points: 3 },
      { county: 'River Gee', played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 2, goalsAgainst: 5, goalDifference: -3, points: 1 }
    ],
    'C': [
      { county: 'Grand Bassa', played: 3, won: 3, drawn: 0, lost: 0, goalsFor: 8, goalsAgainst: 1, goalDifference: 7, points: 9 },
      { county: 'Grand Gedeh', played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 6, goalsAgainst: 3, goalDifference: 3, points: 6 },
      { county: 'Grand Cape Mount', played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 3, goalsAgainst: 5, goalDifference: -2, points: 3 },
      { county: 'Gbarpolu', played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 1, goalsAgainst: 9, goalDifference: -8, points: 0 }
    ],
    'D': [
      { county: 'Maryland', played: 2, won: 2, drawn: 0, lost: 0, goalsFor: 4, goalsAgainst: 1, goalDifference: 3, points: 6 },
      { county: 'Bomi', played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 2, goalsAgainst: 2, goalDifference: 0, points: 3 },
      { county: 'River Cess', played: 2, won: 0, drawn: 0, lost: 2, goalsFor: 0, goalsAgainst: 3, goalDifference: -3, points: 0 }
    ]
  },
  kickball: {
    'A': [
      { county: 'Montserrado', played: 3, won: 3, drawn: 0, lost: 0, runsFor: 15, runsAgainst: 5, runDifference: 10, points: 9 },
      { county: 'Nimba', played: 3, won: 2, drawn: 0, lost: 1, runsFor: 12, runsAgainst: 8, runDifference: 4, points: 6 },
      { county: 'Margibi', played: 3, won: 1, drawn: 0, lost: 2, runsFor: 8, runsAgainst: 12, runDifference: -4, points: 3 },
      { county: 'Grand Kru', played: 3, won: 0, drawn: 0, lost: 3, runsFor: 5, runsAgainst: 15, runDifference: -10, points: 0 }
    ],
    'B': [
      { county: 'Bong', played: 3, won: 2, drawn: 1, lost: 0, runsFor: 14, runsAgainst: 6, runDifference: 8, points: 7 },
      { county: 'Lofa', played: 3, won: 2, drawn: 0, lost: 1, runsFor: 11, runsAgainst: 7, runDifference: 4, points: 6 },
      { county: 'Sinoe', played: 3, won: 1, drawn: 0, lost: 2, runsFor: 7, runsAgainst: 10, runDifference: -3, points: 3 },
      { county: 'River Gee', played: 3, won: 0, drawn: 1, lost: 2, runsFor: 4, runsAgainst: 13, runDifference: -9, points: 1 }
    ],
    'C': [
      { county: 'Grand Bassa', played: 3, won: 3, drawn: 0, lost: 0, runsFor: 16, runsAgainst: 4, runDifference: 12, points: 9 },
      { county: 'Grand Gedeh', played: 3, won: 2, drawn: 0, lost: 1, runsFor: 13, runsAgainst: 7, runDifference: 6, points: 6 },
      { county: 'Grand Cape Mount', played: 3, won: 1, drawn: 0, lost: 2, runsFor: 8, runsAgainst: 11, runDifference: -3, points: 3 },
      { county: 'Gbarpolu', played: 3, won: 0, drawn: 0, lost: 3, runsFor: 3, runsAgainst: 18, runDifference: -15, points: 0 }
    ],
    'D': [
      { county: 'Maryland', played: 2, won: 2, drawn: 0, lost: 0, runsFor: 10, runsAgainst: 3, runDifference: 7, points: 6 },
      { county: 'Bomi', played: 2, won: 1, drawn: 0, lost: 1, runsFor: 6, runsAgainst: 6, runDifference: 0, points: 3 },
      { county: 'River Cess', played: 2, won: 0, drawn: 0, lost: 2, runsFor: 2, runsAgainst: 9, runDifference: -7, points: 0 }
    ]
  },
  volleyball: {
    'A': [
      { county: 'Montserrado', played: 3, won: 3, lost: 0, setsWon: 9, setsLost: 0, setRatio: '9.00', points: 9 },
      { county: 'Nimba', played: 3, won: 2, lost: 1, setsWon: 6, setsLost: 3, setRatio: '2.00', points: 6 },
      { county: 'Margibi', played: 3, won: 1, lost: 2, setsWon: 3, setsLost: 6, setRatio: '0.50', points: 3 },
      { county: 'Grand Kru', played: 3, won: 0, lost: 3, setsWon: 0, setsLost: 9, setRatio: '0.00', points: 0 }
    ],
    'B': [
      { county: 'Bong', played: 3, won: 3, lost: 0, setsWon: 9, setsLost: 1, setRatio: '9.00', points: 9 },
      { county: 'Lofa', played: 3, won: 2, lost: 1, setsWon: 6, setsLost: 4, setRatio: '1.50', points: 6 },
      { county: 'Sinoe', played: 3, won: 1, lost: 2, setsWon: 4, setsLost: 6, setRatio: '0.67', points: 3 },
      { county: 'River Gee', played: 3, won: 0, lost: 3, setsWon: 1, setsLost: 9, setRatio: '0.11', points: 0 }
    ],
    'C': [
      { county: 'Grand Bassa', played: 3, won: 3, lost: 0, setsWon: 9, setsLost: 2, setRatio: '4.50', points: 9 },
      { county: 'Grand Gedeh', played: 3, won: 2, lost: 1, setsWon: 7, setsLost: 4, setRatio: '1.75', points: 6 },
      { county: 'Grand Cape Mount', played: 3, won: 1, lost: 2, setsWon: 4, setsLost: 7, setRatio: '0.57', points: 3 },
      { county: 'Gbarpolu', played: 3, won: 0, lost: 3, setsWon: 2, setsLost: 9, setRatio: '0.22', points: 0 }
    ],
    'D': [
      { county: 'Maryland', played: 2, won: 2, lost: 0, setsWon: 6, setsLost: 1, setRatio: '6.00', points: 6 },
      { county: 'Bomi', played: 2, won: 1, lost: 1, setsWon: 4, setsLost: 4, setRatio: '1.00', points: 3 },
      { county: 'River Cess', played: 2, won: 0, lost: 2, setsWon: 1, setsLost: 6, setRatio: '0.17', points: 0 }
    ]
  },
  basketball: {
    'A': [
      { county: 'Montserrado', played: 3, won: 3, lost: 0, pointsFor: 285, pointsAgainst: 210, pointsDifference: 75, points: 6 },
      { county: 'Nimba', played: 3, won: 2, lost: 1, pointsFor: 245, pointsAgainst: 220, pointsDifference: 25, points: 5 },
      { county: 'Margibi', played: 3, won: 1, lost: 2, pointsFor: 215, pointsAgainst: 235, pointsDifference: -20, points: 4 },
      { county: 'Grand Kru', played: 3, won: 0, lost: 3, pointsFor: 180, pointsAgainst: 280, pointsDifference: -100, points: 3 }
    ],
    'B': [
      { county: 'Bong', played: 3, won: 3, lost: 0, pointsFor: 275, pointsAgainst: 200, pointsDifference: 75, points: 6 },
      { county: 'Lofa', played: 3, won: 2, lost: 1, pointsFor: 240, pointsAgainst: 225, pointsDifference: 15, points: 5 },
      { county: 'Sinoe', played: 3, won: 1, lost: 2, pointsFor: 210, pointsAgainst: 240, pointsDifference: -30, points: 4 },
      { county: 'River Gee', played: 3, won: 0, lost: 3, pointsFor: 190, pointsAgainst: 250, pointsDifference: -60, points: 3 }
    ],
    'C': [
      { county: 'Grand Bassa', played: 3, won: 3, lost: 0, pointsFor: 265, pointsAgainst: 195, pointsDifference: 70, points: 6 },
      { county: 'Grand Gedeh', played: 3, won: 2, lost: 1, pointsFor: 235, pointsAgainst: 230, pointsDifference: 5, points: 5 },
      { county: 'Grand Cape Mount', played: 3, won: 1, lost: 2, pointsFor: 205, pointsAgainst: 245, pointsDifference: -40, points: 4 },
      { county: 'Gbarpolu', played: 3, won: 0, lost: 3, pointsFor: 185, pointsAgainst: 255, pointsDifference: -70, points: 3 }
    ],
    'D': [
      { county: 'Maryland', played: 2, won: 2, lost: 0, pointsFor: 185, pointsAgainst: 140, pointsDifference: 45, points: 4 },
      { county: 'Bomi', played: 2, won: 1, lost: 1, pointsFor: 165, pointsAgainst: 170, pointsDifference: -5, points: 3 },
      { county: 'River Cess', played: 2, won: 0, lost: 2, pointsFor: 145, pointsAgainst: 185, pointsDifference: -40, points: 2 }
    ]
  },
  female_soccer: {
    'A': [
      { county: 'Montserrado', played: 3, won: 3, drawn: 0, lost: 0, goalsFor: 12, goalsAgainst: 2, goalDifference: 10, points: 9 },
      { county: 'Nimba', played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 8, goalsAgainst: 4, goalDifference: 4, points: 6 },
      { county: 'Margibi', played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 4, goalsAgainst: 8, goalDifference: -4, points: 3 },
      { county: 'Grand Kru', played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 2, goalsAgainst: 12, goalDifference: -10, points: 0 }
    ],
    'B': [
      { county: 'Bong', played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 9, goalsAgainst: 3, goalDifference: 6, points: 7 },
      { county: 'Lofa', played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 7, goalsAgainst: 5, goalDifference: 2, points: 6 },
      { county: 'Sinoe', played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 5, goalsAgainst: 7, goalDifference: -2, points: 3 },
      { county: 'River Gee', played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 3, goalsAgainst: 9, goalDifference: -6, points: 1 }
    ],
    'C': [
      { county: 'Grand Bassa', played: 3, won: 3, drawn: 0, lost: 0, goalsFor: 11, goalsAgainst: 1, goalDifference: 10, points: 9 },
      { county: 'Grand Gedeh', played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 8, goalsAgainst: 4, goalDifference: 4, points: 6 },
      { county: 'Grand Cape Mount', played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 4, goalsAgainst: 8, goalDifference: -4, points: 3 },
      { county: 'Gbarpolu', played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 1, goalsAgainst: 11, goalDifference: -10, points: 0 }
    ],
    'D': [
      { county: 'Maryland', played: 2, won: 2, drawn: 0, lost: 0, goalsFor: 6, goalsAgainst: 1, goalDifference: 5, points: 6 },
      { county: 'Bomi', played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 3, goalsAgainst: 3, goalDifference: 0, points: 3 },
      { county: 'River Cess', played: 2, won: 0, drawn: 0, lost: 2, goalsFor: 1, goalsAgainst: 6, goalDifference: -5, points: 0 }
    ]
  },
  athletics: {
    'A': [
      { county: 'Montserrado', played: 3, won: 3, drawn: 0, lost: 0, goalsFor: 45, goalsAgainst: 15, goalDifference: 30, points: 9 },
      { county: 'Nimba', played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 35, goalsAgainst: 25, goalDifference: 10, points: 6 },
      { county: 'Margibi', played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 25, goalsAgainst: 35, goalDifference: -10, points: 3 },
      { county: 'Grand Kru', played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 15, goalsAgainst: 45, goalDifference: -30, points: 0 }
    ],
    'B': [
      { county: 'Bong', played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 40, goalsAgainst: 20, goalDifference: 20, points: 7 },
      { county: 'Lofa', played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 35, goalsAgainst: 25, goalDifference: 10, points: 6 },
      { county: 'Sinoe', played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 25, goalsAgainst: 35, goalDifference: -10, points: 3 },
      { county: 'River Gee', played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 20, goalsAgainst: 40, goalDifference: -20, points: 1 }
    ],
    'C': [
      { county: 'Grand Bassa', played: 3, won: 3, drawn: 0, lost: 0, goalsFor: 42, goalsAgainst: 18, goalDifference: 24, points: 9 },
      { county: 'Grand Gedeh', played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 32, goalsAgainst: 28, goalDifference: 4, points: 6 },
      { county: 'Grand Cape Mount', played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 22, goalsAgainst: 38, goalDifference: -16, points: 3 },
      { county: 'Gbarpolu', played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 18, goalsAgainst: 42, goalDifference: -24, points: 0 }
    ],
    'D': [
      { county: 'Maryland', played: 2, won: 2, drawn: 0, lost: 0, goalsFor: 28, goalsAgainst: 12, goalDifference: 16, points: 6 },
      { county: 'Bomi', played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 20, goalsAgainst: 20, goalDifference: 0, points: 3 },
      { county: 'River Cess', played: 2, won: 0, drawn: 0, lost: 2, goalsFor: 12, goalsAgainst: 28, goalDifference: -16, points: 0 }
    ]
  }
};

const Standings: React.FC = () => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('football');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');

  const disciplines = [
    { value: 'football', label: '⚽ Football (Soccer)', icon: '⚽' },
    { value: 'kickball', label: '🥎 Kickball', icon: '🥎' },
    { value: 'volleyball', label: '🏐 Volleyball', icon: '🏐' },
    { value: 'basketball', label: '🏀 Basketball', icon: '🏀' },
    { value: 'female_soccer', label: '⚽ Female Soccer', icon: '⚽' },
    { value: 'athletics', label: '🏃 Athletics', icon: '🏃' }
  ];
  const groups = ['A', 'B', 'C', 'D'];

  // Get discipline info
  const getDisciplineInfo = (discipline: string) => {
    switch (discipline) {
      case 'football':
      case 'female_soccer':
        return {
          name: discipline === 'football' ? 'Football (Soccer)' : 'Female Soccer',
          icon: '⚽',
          scoring: 'Win = 3 points, Draw = 1 point, Loss = 0 points',
          columns: ['Team', 'P', 'W', 'D', 'L', 'GF', 'GA', 'GD', 'Pts']
        };
      case 'kickball':
        return {
          name: 'Kickball',
          icon: '🥎',
          scoring: 'Win = 3 points, Draw = 1 point, Loss = 0 points',
          columns: ['Team', 'P', 'W', 'D', 'L', 'RF', 'RA', 'RD', 'Pts']
        };
      case 'volleyball':
        return {
          name: 'Volleyball',
          icon: '🏐',
          scoring: 'Win = 3 points, Loss = 0 points',
          columns: ['Team', 'P', 'W', 'L', 'SW', 'SL', 'SR', 'Pts']
        };
      case 'basketball':
        return {
          name: 'Basketball',
          icon: '🏀',
          scoring: 'Win = 2 points, Loss = 1 point',
          columns: ['Team', 'P', 'W', 'L', 'PF', 'PA', 'PD', 'Pts']
        };
      case 'athletics':
        return {
          name: 'Athletics',
          icon: '🏃',
          scoring: 'Win = 3 points, Draw = 1 point, Loss = 0 points',
          columns: ['Team', 'P', 'W', 'D', 'L', 'GF', 'GA', 'GD', 'Pts']
        };
      default:
        return { name: 'Unknown', icon: '🏆', scoring: '', columns: [] };
    }
  };

  const disciplineInfo = getDisciplineInfo(selectedDiscipline);

  // Sort standings by points and other criteria
  const sortStandings = (standings: any[], discipline: string) => {
    return standings.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      
      if (discipline === 'volleyball') {
        return (b.setsWon / Math.max(b.setsLost, 1)) - (a.setsWon / Math.max(a.setsLost, 1));
      } else if (discipline === 'basketball') {
        return b.pointsDifference - a.pointsDifference;
      } else {
        return b.goalDifference - a.goalDifference;
      }
    });
  };

  const getPositionIcon = (position: number) => {
    if (position === 1) return <Medal className="w-5 h-5 text-yellow-500" />;
    if (position === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (position === 3) return <Medal className="w-5 h-5 text-amber-600" />;
    return <div className="w-5 h-5 flex items-center justify-center text-gray-600 font-bold text-sm">{position}</div>;
  };

  const getRowColor = (position: number, groupSize: number) => {
    if (position <= 2) return 'bg-green-50 border-l-4 border-green-500';
    if (position >= groupSize - 1) return 'bg-red-50 border-l-4 border-red-500';
    return 'bg-white';
  };

  // Render table headers based on discipline
  const renderTableHeaders = (discipline: string) => {
    const headers = disciplineInfo.columns;
    return (
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pos</th>
          {headers.map((header, index) => (
            <th key={index} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              {header}
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  // Render table row based on discipline
  const renderTableRow = (team: any, position: number, discipline: string, groupSize: number) => {
    return (
      <tr key={team.county} className={`hover:bg-gray-50 ${getRowColor(position, groupSize)}`}>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            {getPositionIcon(position)}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">{team.county}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">{team.played}</td>
        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">{team.won}</td>
        {discipline !== 'volleyball' && discipline !== 'basketball' && (
          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">{team.drawn || 0}</td>
        )}
        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">{team.lost}</td>
        
        {discipline === 'volleyball' ? (
          <>
            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">{team.setsWon}</td>
            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">{team.setsLost}</td>
            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">{team.setRatio}</td>
          </>
        ) : discipline === 'basketball' ? (
          <>
            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">{team.pointsFor}</td>
            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">{team.pointsAgainst}</td>
            <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
              <span className={`font-medium ${
                team.pointsDifference > 0 ? 'text-green-600' : 
                team.pointsDifference < 0 ? 'text-red-600' : 'text-gray-900'
              }`}>
                {team.pointsDifference > 0 ? '+' : ''}{team.pointsDifference}
              </span>
            </td>
          </>
        ) : discipline === 'kickball' ? (
          <>
            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">{team.runsFor}</td>
            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">{team.runsAgainst}</td>
            <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
              <span className={`font-medium ${
                team.runDifference > 0 ? 'text-green-600' : 
                team.runDifference < 0 ? 'text-red-600' : 'text-gray-900'
              }`}>
                {team.runDifference > 0 ? '+' : ''}{team.runDifference}
              </span>
            </td>
          </>
        ) : (
          <>
            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">{team.goalsFor}</td>
            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">{team.goalsAgainst}</td>
            <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
              <span className={`font-medium ${
                team.goalDifference > 0 ? 'text-green-600' : 
                team.goalDifference < 0 ? 'text-red-600' : 'text-gray-900'
              }`}>
                {team.goalDifference > 0 ? '+' : ''}{team.goalDifference}
              </span>
            </td>
          </>
        )}
        
        <td className="px-6 py-4 whitespace-nowrap text-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {team.points}
          </span>
        </td>
      </tr>
    );
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
                Table{' '}
                <span className="text-gradient bg-gradient-to-r from-primary-300 to-secondary-300 bg-clip-text text-transparent">
                  Standings
                </span>
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                Track the performance of all counties across different sporting disciplines
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
                <h3 className="text-lg font-semibold text-gray-900">Filter Standings</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Discipline
                  </label>
                  <select
                    value={selectedDiscipline}
                    onChange={(e) => setSelectedDiscipline(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  >
                    {disciplines.map((discipline) => (
                      <option key={discipline.value} value={discipline.value}>
                        {discipline.icon} {discipline.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filter by Group
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
              </div>
            </div>

            {/* Discipline Info */}
            <div className="bg-white rounded-xl shadow-xl p-6 mb-8">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">{disciplineInfo.icon}</span>
                <h3 className="text-xl font-bold text-gray-900">{disciplineInfo.name}</h3>
              </div>
              <p className="text-gray-600 mb-4">{disciplineInfo.scoring}</p>
            </div>

            {/* Legend */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">Legend</h3>
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                  <span>Qualification to Next Round</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                  <span>Elimination</span>
                </div>
                <div className="flex items-center">
                  <Medal className="w-4 h-4 text-yellow-500 mr-2" />
                  <span>1st Place</span>
                </div>
                <div className="flex items-center">
                  <Medal className="w-4 h-4 text-gray-400 mr-2" />
                  <span>2nd Place</span>
                </div>
                <div className="flex items-center">
                  <Medal className="w-4 h-4 text-amber-600 mr-2" />
                  <span>3rd Place</span>
                </div>
              </div>
            </div>

            {/* Standings Tables */}
            <div className="space-y-6">
              {selectedGroup === 'all' ? (
                // Show all groups
                groups.map((group) => {
                  const disciplineKey = selectedDiscipline as keyof typeof allStandings;
                  const groupKey = group as keyof (typeof allStandings)[typeof disciplineKey];
                  const groupStandings = allStandings[disciplineKey]?.[groupKey];
                  if (!groupStandings || groupStandings.length === 0) return null;

                  const sortedStandings = sortStandings([...groupStandings], selectedDiscipline);

                  return (
                    <div key={group} className="bg-white rounded-xl shadow-xl overflow-hidden">
                      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 px-6 py-3">
                        <h2 className="text-xl font-bold text-white flex items-center">
                          <Trophy className="w-5 h-5 mr-2" />
                          Group {group} - {disciplineInfo.icon} {disciplineInfo.name}
                        </h2>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          {renderTableHeaders(selectedDiscipline)}
                          <tbody className="bg-white divide-y divide-gray-200">
                            {sortedStandings.map((team, index) => 
                              renderTableRow(team, index + 1, selectedDiscipline, sortedStandings.length)
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })
              ) : (
                // Show single group
                (() => {
                  const disciplineKey = selectedDiscipline as keyof typeof allStandings;
                  const groupKey = selectedGroup as keyof (typeof allStandings)[typeof disciplineKey];
                  const groupStandings = allStandings[disciplineKey]?.[groupKey];
                  if (!groupStandings || groupStandings.length === 0) return null;

                  const sortedStandings = sortStandings([...groupStandings], selectedDiscipline);

                  return (
                    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 px-6 py-3">
                        <h2 className="text-xl font-bold text-white flex items-center">
                          <Trophy className="w-5 h-5 mr-2" />
                          Group {selectedGroup} - {disciplineInfo.icon} {disciplineInfo.name}
                        </h2>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          {renderTableHeaders(selectedDiscipline)}
                          <tbody className="bg-white divide-y divide-gray-200">
                            {sortedStandings.map((team, index) => 
                              renderTableRow(team, index + 1, selectedDiscipline, sortedStandings.length)
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })()
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Standings;
