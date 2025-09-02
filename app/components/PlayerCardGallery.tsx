'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, Eye, Users } from 'lucide-react';
import PlayerCard from './PlayerCard';

interface Player {
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
  status: string;
}

interface PlayerCardGalleryProps {
  players: Player[];
  title?: string;
  showFilters?: boolean;
  onDownloadCard?: (player: Player) => void;
  onViewPlayer?: (player: Player) => void;
}

const PlayerCardGallery: React.FC<PlayerCardGalleryProps> = ({
  players,
  title = "Player Cards",
  showFilters = true,
  onDownloadCard,
  onViewPlayer
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedCounty, setSelectedCounty] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Filter players based on search and filters
  const filteredPlayers = useMemo(() => {
    return players.filter(player => {
      const matchesSearch = 
        player.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDiscipline = selectedDiscipline === 'all' || player.discipline === selectedDiscipline;
      const matchesLevel = selectedLevel === 'all' || player.level === selectedLevel;
      const matchesCounty = selectedCounty === 'all' || player.county === selectedCounty;
      const matchesStatus = selectedStatus === 'all' || player.status === selectedStatus;

      return matchesSearch && matchesDiscipline && matchesLevel && matchesCounty && matchesStatus;
    });
  }, [players, searchTerm, selectedDiscipline, selectedLevel, selectedCounty, selectedStatus]);

  // Get unique values for filter options
  const disciplines = useMemo(() => ['all', ...Array.from(new Set(players.map(p => p.discipline)))], [players]);
  const levels = useMemo(() => ['all', ...Array.from(new Set(players.map(p => p.level)))], [players]);
  const counties = useMemo(() => ['all', ...Array.from(new Set(players.map(p => p.county)))], [players]);
  const statuses = useMemo(() => ['all', ...Array.from(new Set(players.map(p => p.status)))], [players]);

  const handleDownloadCard = (player: Player) => {
    if (onDownloadCard) {
      onDownloadCard(player);
    } else {
      // Default download behavior - generate PDF
      console.log('Downloading card for:', player.firstName, player.lastName);
      // Here you would implement PDF generation
    }
  };

  const handleViewPlayer = (player: Player) => {
    if (onViewPlayer) {
      onViewPlayer(player);
    } else {
      console.log('Viewing player:', player.firstName, player.lastName);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-600">
            {filteredPlayers.length} of {players.length} players
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search players..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
          />
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Filters</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discipline</label>
              <select
                value={selectedDiscipline}
                onChange={(e) => setSelectedDiscipline(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {disciplines.map(discipline => (
                  <option key={discipline} value={discipline}>
                    {discipline === 'all' ? 'All Disciplines' : discipline.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {levels.map(level => (
                  <option key={level} value={level}>
                    {level === 'all' ? 'All Levels' : level}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">County</label>
              <select
                value={selectedCounty}
                onChange={(e) => setSelectedCounty(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {counties.map(county => (
                  <option key={county} value={county}>
                    {county === 'all' ? 'All Counties' : county}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Statuses' : status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>
      )}

      {/* Player Cards Grid */}
      {filteredPlayers.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredPlayers.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PlayerCard
                player={player}
                onDownload={() => handleDownloadCard(player)}
                onView={() => handleViewPlayer(player)}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Players Found</h3>
          <p className="text-gray-600">
            {searchTerm || selectedDiscipline !== 'all' || selectedLevel !== 'all' || selectedCounty !== 'all' || selectedStatus !== 'all'
              ? 'Try adjusting your filters or search terms'
              : 'No players have been registered yet'
            }
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default PlayerCardGallery;
