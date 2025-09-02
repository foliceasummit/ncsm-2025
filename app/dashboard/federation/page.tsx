'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  MessageSquare, 
  Send, 
  CheckCircle, 
  XCircle,
  LogOut,
  User,
  Eye,
  FileText,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface Player {
  id: string;
  name: string;
  county: string;
  team: string;
  discipline: string;
  position: string;
  age: number;
  status: 'pending' | 'approved' | 'rejected';
  comments: string[];
  eligibility: boolean;
}

const FederationDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [players, setPlayers] = useState<Player[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'federation') {
      router.push('/login');
      return;
    }

    // Mock players data for Basketball Federation
    const mockPlayers: Player[] = [
      {
        id: '1',
        name: 'John Doe',
        county: 'Bong',
        team: 'Bong Basketball',
        discipline: 'basketball',
        position: 'Point Guard',
        age: 22,
        status: 'pending',
        comments: ['Need to verify age certificate'],
        eligibility: true
      },
      {
        id: '2',
        name: 'Jane Smith',
        county: 'Montserrado',
        team: 'Montserrado Basketball',
        discipline: 'basketball',
        position: 'Center',
        age: 24,
        status: 'approved',
        comments: ['All documents verified'],
        eligibility: true
      },
      {
        id: '3',
        name: 'Mike Johnson',
        county: 'Nimba',
        team: 'Nimba Basketball',
        discipline: 'basketball',
        position: 'Shooting Guard',
        age: 20,
        status: 'rejected',
        comments: ['Age certificate missing', 'Incomplete registration'],
        eligibility: false
      },
      {
        id: '4',
        name: 'Sarah Wilson',
        county: 'Grand Bassa',
        team: 'Grand Bassa Basketball',
        discipline: 'basketball',
        position: 'Power Forward',
        age: 23,
        status: 'pending',
        comments: [],
        eligibility: true
      }
    ];

    setPlayers(mockPlayers);
    setFilteredPlayers(mockPlayers);
  }, [user, router]);

  useEffect(() => {
    let filtered = players;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(player =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.county.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.team.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by county
    if (selectedCounty !== 'all') {
      filtered = filtered.filter(player => player.county === selectedCounty);
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(player => player.status === selectedStatus);
    }

    setFilteredPlayers(filtered);
  }, [players, searchTerm, selectedCounty, selectedStatus]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleAddComment = (player: Player) => {
    setSelectedPlayer(player);
    setShowCommentModal(true);
  };

  const submitComment = () => {
    if (selectedPlayer && newComment.trim()) {
      const updatedPlayers = players.map(player =>
        player.id === selectedPlayer.id
          ? { ...player, comments: [...player.comments, newComment] }
          : player
      );
      setPlayers(updatedPlayers);
      setNewComment('');
      setShowCommentModal(false);
      setSelectedPlayer(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const counties = Array.from(new Set(players.map(player => player.county)));

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Federation Dashboard</h1>
                <p className="text-gray-600">Welcome back, {user.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <User className="w-4 h-4" />
                <span className="text-sm">Basketball Federation</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Player List</h3>
                <p className="text-gray-600 text-sm">View basketball players</p>
              </div>
            </div>
            <div className="mt-4 text-2xl font-bold text-gray-900">{players.length}</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Approved</h3>
                <p className="text-gray-600 text-sm">Verified players</p>
              </div>
            </div>
            <div className="mt-4 text-2xl font-bold text-gray-900">
              {players.filter(p => p.status === 'approved').length}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Pending</h3>
                <p className="text-gray-600 text-sm">Awaiting review</p>
              </div>
            </div>
            <div className="mt-4 text-2xl font-bold text-gray-900">
              {players.filter(p => p.status === 'pending').length}
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-8"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search players..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">County</label>
              <select
                value={selectedCounty}
                onChange={(e) => setSelectedCounty(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="all">All Counties</option>
                {counties.map(county => (
                  <option key={county} value={county}>{county}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCounty('all');
                  setSelectedStatus('all');
                }}
                className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </motion.div>

        {/* Players Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <Users className="w-5 h-5 mr-2 text-purple-600" />
              Basketball Players ({filteredPlayers.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">County</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comments</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPlayers.map((player) => (
                  <tr key={player.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{player.name}</div>
                        <div className="text-sm text-gray-500">{player.team}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{player.county}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{player.position}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{player.age}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(player.status)}`}>
                        {getStatusIcon(player.status)}
                        <span className="capitalize">{player.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {player.comments.length} comment{player.comments.length !== 1 ? 's' : ''}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleAddComment(player)}
                          className="text-purple-600 hover:text-purple-900"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
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
        </motion.div>

        {/* Submit Observations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-orange-600" />
            Submit Observations to MYS
          </h2>
          <div className="space-y-4">
            <textarea
              placeholder="Enter your observations and recommendations for MYS..."
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
            <div className="flex justify-end">
              <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center">
                <Send className="w-4 h-4 mr-2" />
                Submit to MYS
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Comment Modal */}
      {showCommentModal && selectedPlayer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold mb-4">Add Comment for {selectedPlayer.name}</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Previous Comments:</p>
                {selectedPlayer.comments.length > 0 ? (
                  <ul className="space-y-1">
                    {selectedPlayer.comments.map((comment, index) => (
                      <li key={index} className="text-sm text-gray-800">• {comment}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No previous comments</p>
                )}
              </div>
              <textarea
                placeholder="Enter your comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowCommentModal(false);
                  setSelectedPlayer(null);
                  setNewComment('');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={submitComment}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Add Comment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FederationDashboard;
