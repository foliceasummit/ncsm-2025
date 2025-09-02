'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PlayerCardProps {
  player: {
    id: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    photo?: string;
    discipline: string;
    level: string;
    county: string;
    dateOfBirth: string;
    nationality: string;
    position?: string;
  };
  onDownload?: () => void;
  onView?: () => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, onDownload, onView }) => {
  const getDisciplineColor = (discipline: string) => {
    switch (discipline.toUpperCase()) {
      case 'FOOTBALL':
        return 'from-green-500 to-green-700';
      case 'BASKETBALL':
        return 'from-orange-500 to-orange-700';
      case 'VOLLEYBALL':
        return 'from-blue-500 to-blue-700';
      case 'KICKBALL':
        return 'from-purple-500 to-purple-700';
      case 'ATHLETICS':
        return 'from-red-500 to-red-700';
      case 'FEMALE_SOCCER':
        return 'from-pink-500 to-pink-700';
      default:
        return 'from-gray-500 to-gray-700';
    }
  };

  const getDisciplineIcon = (discipline: string) => {
    switch (discipline.toUpperCase()) {
      case 'FOOTBALL':
        return '⚽';
      case 'BASKETBALL':
        return '🏀';
      case 'VOLLEYBALL':
        return '🏐';
      case 'KICKBALL':
        return '🥎';
      case 'ATHLETICS':
        return '🏃';
      case 'FEMALE_SOCCER':
        return '⚽';
      default:
        return '🏆';
    }
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const validityDate = new Date();
  validityDate.setMonth(validityDate.getMonth() + 6);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="relative w-80 h-96 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-600"
    >
      {/* Header with NCSM branding */}
      <div className={`h-16 bg-gradient-to-r ${getDisciplineColor(player.discipline)} flex items-center justify-between px-4`}>
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{getDisciplineIcon(player.discipline)}</span>
          <span className="text-white font-bold text-sm">NCSM</span>
        </div>
        <div className="text-right">
          <div className="text-white text-xs font-semibold">NATIONAL COUNTY</div>
          <div className="text-white text-xs font-semibold">SPORTS MEET</div>
        </div>
      </div>

      {/* Player Photo Section */}
      <div className="relative h-48 bg-gradient-to-b from-slate-800 to-slate-700 flex items-center justify-center">
        {player.photo ? (
          <img
            src={player.photo}
            alt={`${player.firstName} ${player.lastName}`}
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-slate-600 flex items-center justify-center border-4 border-white shadow-lg">
            <span className="text-4xl text-white">👤</span>
          </div>
        )}
        
        {/* NCSM ID Badge */}
        <div className="absolute top-4 right-4 bg-white rounded-lg px-3 py-1 shadow-lg">
          <div className="text-xs text-slate-600 font-semibold">NCSM ID</div>
          <div className="text-sm font-bold text-slate-800">{player.id}</div>
        </div>
      </div>

      {/* Player Information */}
      <div className="p-4 bg-white">
        {/* Player Name */}
        <div className="text-center mb-3">
          <h3 className="text-lg font-bold text-slate-800">
            {player.firstName} {player.middleName} {player.lastName}
          </h3>
        </div>

        {/* Player Details Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-600 font-medium">Category:</span>
              <span className="text-slate-800 font-semibold capitalize">
                {player.discipline.toLowerCase().replace('_', ' ')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 font-medium">Level:</span>
              <span className="text-slate-800 font-semibold">{player.level}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 font-medium">County:</span>
              <span className="text-slate-800 font-semibold">{player.county}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-600 font-medium">Age:</span>
              <span className="text-slate-800 font-semibold">{calculateAge(player.dateOfBirth)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 font-medium">Nationality:</span>
              <span className="text-slate-800 font-semibold">{player.nationality}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 font-medium">Valid Until:</span>
              <span className="text-slate-800 font-semibold text-xs">
                {validityDate.toLocaleDateString('en-US', { 
                  month: 'short', 
                  year: 'numeric' 
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 mt-4">
          {onDownload && (
            <button
              onClick={onDownload}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Download Card
            </button>
          )}
          {onView && (
            <button
              onClick={onView}
              className="flex-1 bg-gradient-to-r from-slate-500 to-slate-600 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:from-slate-600 hover:to-slate-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              View Details
            </button>
          )}
        </div>
      </div>

      {/* Watermark */}
      <div className="absolute bottom-2 right-2 text-xs text-slate-400 opacity-50">
        NCSM 2025
      </div>
    </motion.div>
  );
};

export default PlayerCard;
