'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  UserPlus, 
  Shield, 
  FileTextIcon, 
  Settings, 
  BarChart3, 
  Calendar,
  Upload,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  Database,
  Lock,
  Home,
  Newspaper,
  Video,
  Image,
  LogOut
} from 'lucide-react';

interface Player {
  id: string;
  name: string;
  county: string;
  discipline: string;
  position: string;
  status: 'active' | 'inactive' | 'pending';
  registrationDate: string;
  photo?: string;
}

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  venue: string;
  status: 'scheduled' | 'in-progress' | 'completed';
  score?: string;
  inspectionStatus: 'pending' | 'completed' | 'not-required';
}

interface CountyInfo {
  id: string;
  name: string;
  description: string;
  logo?: string;
  achievements: string[];
  lastUpdated: string;
}

const MYSStaffDashboard: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [players, setPlayers] = useState<Player[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [countyInfo, setCountyInfo] = useState<CountyInfo[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('all');
  const [selectedDiscipline, setSelectedDiscipline] = useState('all');

  // Mock data
  useEffect(() => {
    setPlayers([
      { id: '1', name: 'James Player', county: 'Bong', discipline: 'Football', position: 'Forward', status: 'active', registrationDate: '2025-01-10' },
      { id: '2', name: 'David Striker', county: 'Lofa', discipline: 'Football', position: 'Midfielder', status: 'active', registrationDate: '2025-01-12' },
      { id: '3', name: 'Emma Defender', county: 'Montserrado', discipline: 'Football', position: 'Defender', status: 'active', registrationDate: '2025-01-08' },
      { id: '4', name: 'Sarah Runner', county: 'Nimba', discipline: 'Athletics', position: 'Sprint', status: 'active', registrationDate: '2025-01-15' },
      { id: '5', name: 'Mike Jumper', county: 'Grand Bassa', discipline: 'Athletics', position: 'Long Jump', status: 'active', registrationDate: '2025-01-11' },
      { id: '6', name: 'Lisa Swimmer', county: 'Maryland', discipline: 'Swimming', position: 'Freestyle', status: 'active', registrationDate: '2025-01-14' }
    ]);

    setMatches([
      { id: '1', homeTeam: 'Bong', awayTeam: 'Lofa', date: '2025-01-20', venue: 'Bong Stadium', status: 'scheduled', inspectionStatus: 'pending' },
      { id: '2', homeTeam: 'Montserrado', awayTeam: 'Nimba', date: '2025-01-21', venue: 'Antoinette Tubman Stadium', status: 'scheduled', inspectionStatus: 'pending' },
      { id: '3', homeTeam: 'Grand Bassa', awayTeam: 'Grand Gedeh', date: '2025-01-18', venue: 'Buchanan Stadium', status: 'completed', score: '2-1', inspectionStatus: 'completed' }
    ]);

    setCountyInfo([
      { 
        id: '1', 
        name: 'Bong', 
        description: 'Bong County is known for its strong football tradition and has produced many talented players over the years.',
        achievements: ['2024 Regional Champions', '2023 Fair Play Award', '2022 Most Improved Team'],
        lastUpdated: '2025-01-15'
      },
      { 
        id: '2', 
        name: 'Lofa', 
        description: 'Lofa County has a rich sporting heritage with excellent facilities and dedicated athletes.',
        achievements: ['2024 National Runners-up', '2023 Best Defensive Team', '2022 Community Award'],
        lastUpdated: '2025-01-14'
      },
      { 
        id: '3', 
        name: 'Montserrado', 
        description: 'As the capital county, Montserrado leads in sports development and infrastructure.',
        achievements: ['2024 National Champions', '2023 Best Offensive Team', '2022 Excellence Award'],
        lastUpdated: '2025-01-13'
      }
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'pending':
      case 'scheduled':
        return 'text-yellow-600 bg-yellow-100';
      case 'inactive':
      case 'in-progress':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getDisciplineColor = (discipline: string) => {
    switch (discipline) {
      case 'Football':
        return 'bg-blue-100 text-blue-800';
      case 'Athletics':
        return 'bg-green-100 text-green-800';
      case 'Swimming':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getInspectionColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'not-required':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  // Filter players based on search and filters
  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.county.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCounty = selectedCounty === 'all' || player.county === selectedCounty;
    const matchesDiscipline = selectedDiscipline === 'all' || player.discipline === selectedDiscipline;
    return matchesSearch && matchesCounty && matchesDiscipline;
  });

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Players</p>
              <p className="text-2xl font-bold text-gray-900">{players.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Upcoming Matches</p>
              <p className="text-2xl font-bold text-gray-900">
                {matches.filter(m => m.status === 'scheduled').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-yellow-500">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <FileTextIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Inspections</p>
              <p className="text-2xl font-bold text-gray-900">
                {matches.filter(m => m.inspectionStatus === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Counties</p>
              <p className="text-2xl font-bold text-gray-900">{countyInfo.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <UserPlus className="w-5 h-5 text-blue-600 mr-3" />
              <span className="text-sm text-gray-700">New player registered: Sarah Runner (Nimba - Athletics)</span>
            </div>
            <span className="text-xs text-gray-500">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
              <span className="text-sm text-gray-700">Pre-match inspection completed: Grand Bassa vs Grand Gedeh</span>
            </div>
            <span className="text-xs text-gray-500">4 hours ago</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Edit className="w-5 h-5 text-yellow-600 mr-3" />
              <span className="text-sm text-gray-700">County info updated: Bong County achievements</span>
            </div>
            <span className="text-xs text-gray-500">6 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPlayerReview = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Review All Players by County and Discipline</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <UserPlus className="w-4 h-4" />
          Register New Player
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <FileTextIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search players..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">County</label>
            <select
              value={selectedCounty}
              onChange={(e) => setSelectedCounty(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Counties</option>
              <option value="Bong">Bong</option>
              <option value="Lofa">Lofa</option>
              <option value="Montserrado">Montserrado</option>
              <option value="Nimba">Nimba</option>
              <option value="Grand Bassa">Grand Bassa</option>
              <option value="Maryland">Maryland</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Discipline</label>
            <select
              value={selectedDiscipline}
              onChange={(e) => setSelectedDiscipline(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Disciplines</option>
              <option value="Football">Football</option>
              <option value="Athletics">Athletics</option>
              <option value="Swimming">Swimming</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              <Shield className="w-4 h-4 inline mr-2" />
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Players Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">County</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discipline</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPlayers.map((player) => (
                <tr key={player.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                        {player.photo ? (
                          <img className="h-10 w-10 rounded-full" src={player.photo} alt={player.name} />
                        ) : (
                          <Users className="h-5 w-5 text-gray-600" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{player.name}</div>
                        <div className="text-sm text-gray-500">Reg: {player.registrationDate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{player.county}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDisciplineColor(player.discipline)}`}>
                      {player.discipline}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{player.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(player.status)}`}>
                      {player.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPreMatchInspection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Pre-Match Inspection Management</h3>
      
      {/* Matches Table */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h4 className="text-md font-semibold text-gray-900 mb-4">Match Inspection Status</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Match</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inspection</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {matches.map((match) => (
                <tr key={match.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {match.homeTeam} vs {match.awayTeam}
                    </div>
                    {match.score && (
                      <div className="text-sm text-gray-500">Score: {match.score}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{match.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{match.venue}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(match.status)}`}>
                      {match.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getInspectionColor(match.inspectionStatus)}`}>
                      {match.inspectionStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {match.inspectionStatus === 'pending' && (
                        <button className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs">
                          Start Inspection
                        </button>
                      )}
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContentManagement = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Content & County Information Management</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* County Info Management */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Home className="w-6 h-6 text-blue-600 mr-2" />
            <h4 className="text-md font-semibold text-gray-900">County Information</h4>
          </div>
          <div className="space-y-3">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Edit County Info
            </button>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Update Logos
            </button>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Manage Achievements
            </button>
          </div>
        </div>

        {/* Media Management */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Upload className="w-6 h-6 text-green-600 mr-2" />
            <h4 className="text-md font-semibold text-gray-900">Media Management</h4>
          </div>
          <div className="space-y-3">
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Upload Photos
            </button>
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Upload Videos
            </button>
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Manage Gallery
            </button>
          </div>
        </div>

        {/* Content Updates */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Newspaper className="w-6 h-6 text-purple-600 mr-2" />
            <h4 className="text-md font-semibold text-gray-900">Content Updates</h4>
          </div>
          <div className="space-y-3">
            <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Post Updates
            </button>
            <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Edit Content
            </button>
            <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Manage News
            </button>
          </div>
        </div>
      </div>

      {/* County Information Table */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h4 className="text-md font-semibold text-gray-900 mb-4">County Information Overview</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">County</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Achievements</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {countyInfo.map((county) => (
                <tr key={county.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                        {county.logo ? (
                          <img className="h-10 w-10 rounded-full" src={county.logo} alt={county.name} />
                        ) : (
                          <Shield className="h-5 w-5 text-gray-600" />
                        )}
                      </div>
                      <div className="text-sm font-medium text-gray-900">{county.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{county.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="space-y-1">
                      {county.achievements.slice(0, 2).map((achievement, index) => (
                        <div key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {achievement}
                        </div>
                      ))}
                      {county.achievements.length > 2 && (
                        <div className="text-xs text-gray-500">+{county.achievements.length - 2} more</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{county.lastUpdated}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderResultsAndStandings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Results & Standings Management</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Official Results */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Publish Official Results</h4>
          <div className="space-y-3">
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" />
              Publish Match Results
            </button>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" />
              Update Standings
            </button>
            <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Generate Reports
            </button>
          </div>
        </div>

        {/* Table Standings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Current Standings</h4>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-700">Football Group A</div>
              <div className="text-xs text-gray-500">Last updated: 2 hours ago</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-700">Athletics Rankings</div>
              <div className="text-xs text-gray-500">Last updated: 4 hours ago</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-700">Swimming Results</div>
              <div className="text-xs text-gray-500">Last updated: 6 hours ago</div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h4 className="text-md font-semibold text-gray-900 mb-4">Recent Match Results</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Match</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {matches.map((match) => (
                <tr key={match.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {match.homeTeam} vs {match.awayTeam}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{match.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{match.venue}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {match.score ? (
                      <div className="text-sm font-medium text-gray-900">{match.score}</div>
                    ) : (
                      <div className="text-sm text-gray-500">Not played</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(match.status)}`}>
                      {match.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {match.status === 'completed' && (
                        <button className="text-green-600 hover:text-green-900">
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'players':
        return renderPlayerReview();
      case 'inspection':
        return renderPreMatchInspection();
      case 'content':
        return renderContentManagement();
      case 'results':
        return renderResultsAndStandings();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">MYS Staff Dashboard</h2>
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'overview' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <BarChart3 className="w-5 h-5 mr-3" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab('players')}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'players' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Users className="w-5 h-5 mr-3" />
                Player Review
              </button>
              <button
                onClick={() => setActiveTab('inspection')}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'inspection' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Shield className="w-5 h-5 mr-3" />
                Pre-Match Inspection
              </button>
              <button
                onClick={() => setActiveTab('content')}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'content' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Edit className="w-5 h-5 mr-3" />
                Content & County Info
              </button>
              <button
                onClick={() => setActiveTab('results')}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'results' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Shield className="w-5 h-5 mr-3" />
                Results & Standings
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h1>
              <p className="text-gray-600 mt-1">Manage NCSM players, inspections, content, and results</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Role: MYS Staff</span>
              <button
                onClick={() => router.push('/')}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ← Back to Home
              </button>
              <button className="px-4 py-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default MYSStaffDashboard;
