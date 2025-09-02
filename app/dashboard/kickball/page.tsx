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
  LogOut,
  Search,
  Filter,
  Trophy,
  Award,
  Clipboard,
  Camera,
  Play,
  Shield,
  Flag,
  Target,
  Zap,
  MessageSquare,
  Send,
  AlertCircle,
  Circle
} from 'lucide-react';

interface Player {
  id: string;
  name: string;
  team: string;
  county: string;
  position: string;
  status: 'verified' | 'pending' | 'rejected';
  registrationDate: string;
  photo?: string;
  licenseNumber: string;
  comment?: string;
  observation?: string;
}

interface Comment {
  id: string;
  playerId: string;
  playerName: string;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  reason?: string;
  submittedDate: string;
}

const KickballDashboard: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('players');
  const [players, setPlayers] = useState<Player[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('all');
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data
  useEffect(() => {
    setPlayers([
      { id: '1', name: 'John Kicker', team: 'Bong Kickers', county: 'Bong', position: 'Kicker', status: 'verified', registrationDate: '2025-01-10', licenseNumber: 'KICK-001' },
      { id: '2', name: 'Mike Runner', team: 'Lofa Sprinters', county: 'Lofa', position: 'Runner', status: 'pending', registrationDate: '2025-01-12', licenseNumber: 'KICK-002' },
      { id: '3', name: 'Sarah Catcher', team: 'Montserrado Catchers', county: 'Montserrado', position: 'Catcher', status: 'verified', registrationDate: '2025-01-08', licenseNumber: 'KICK-003' },
      { id: '4', name: 'David Pitcher', team: 'Nimba Throwers', county: 'Nimba', position: 'Pitcher', status: 'rejected', registrationDate: '2025-01-15', licenseNumber: 'KICK-004' },
      { id: '5', name: 'Lisa Fielder', team: 'Grand Bassa Fielders', county: 'Grand Bassa', position: 'Fielder', status: 'pending', registrationDate: '2025-01-11', licenseNumber: 'KICK-005' }
    ]);

    setComments([
      { id: '1', playerId: '2', playerName: 'Mike Runner', comment: 'Speed test results needed - listed time seems unrealistic', status: 'pending', submittedDate: '2025-01-15' },
      { id: '2', playerId: '4', playerName: 'David Pitcher', comment: 'Medical clearance required for shoulder injury', status: 'rejected', reason: 'Insufficient medical documentation', submittedDate: '2025-01-14' },
      { id: '3', playerId: '5', playerName: 'Lisa Fielder', comment: 'Age verification needed - birth certificate unclear', status: 'pending', submittedDate: '2025-01-13' }
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'rejected':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getCommentStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'rejected':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  // Filter players based on search and filters
  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.team.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCounty = selectedCounty === 'all' || player.county === selectedCounty;
    const matchesTeam = selectedTeam === 'all' || player.team === selectedTeam;
    const matchesStatus = selectedStatus === 'all' || player.status === selectedStatus;
    return matchesSearch && matchesCounty && matchesTeam && matchesStatus;
  });

  const handleCommentSubmit = (playerId: string, comment: string) => {
    const player = players.find(p => p.id === playerId);
    if (player && comment.trim()) {
      const newComment: Comment = {
        id: Date.now().toString(),
        playerId,
        playerName: player.name,
        comment: comment.trim(),
        status: 'pending',
        submittedDate: new Date().toISOString().split('T')[0]
      };
      setComments(prev => [newComment, ...prev]);
      
      // Update player with comment
      setPlayers(prev => prev.map(p => 
        p.id === playerId ? { ...p, comment: comment.trim() } : p
      ));
    }
  };

  const handleObservationSubmit = (playerId: string, observation: string) => {
    if (observation.trim()) {
      setPlayers(prev => prev.map(p => 
        p.id === playerId ? { ...p, observation: observation.trim() } : p
      ));
      // In real app, this would submit to backend/MYS
      alert('Observation submitted successfully!');
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-red-500">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <Circle className="w-6 h-6 text-red-600" />
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
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Verified Players</p>
              <p className="text-2xl font-bold text-gray-900">
                {players.filter(p => p.status === 'verified').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-yellow-500">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900">
                {players.filter(p => p.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MessageSquare className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Comments Submitted</p>
              <p className="text-2xl font-bold text-gray-900">{comments.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {comments.slice(0, 3).map((comment) => (
            <div key={comment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <MessageSquare className="w-5 h-5 text-red-600 mr-3" />
                <span className="text-sm text-gray-700">
                  Comment submitted for {comment.playerName}: {comment.comment.substring(0, 50)}...
                </span>
              </div>
              <span className="text-xs text-gray-500">{comment.submittedDate}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPlayerVerification = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Kickball Player Verification</h3>
        <div className="text-sm text-gray-600">
          Discipline: <span className="font-semibold text-red-600">Kickball</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
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
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">County</label>
            <select
              value={selectedCounty}
              onChange={(e) => setSelectedCounty(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">All Counties</option>
              <option value="Bong">Bong</option>
              <option value="Lofa">Lofa</option>
              <option value="Montserrado">Montserrado</option>
              <option value="Nimba">Nimba</option>
              <option value="Grand Bassa">Grand Bassa</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Team</label>
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">All Teams</option>
              <option value="Bong Kickers">Bong Kickers</option>
              <option value="Lofa Sprinters">Lofa Sprinters</option>
              <option value="Montserrado Catchers">Montserrado Catchers</option>
              <option value="Nimba Throwers">Nimba Throwers</option>
              <option value="Grand Bassa Fielders">Grand Bassa Fielders</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">All Status</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">County</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Observation</th>
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
                          <Circle className="h-5 w-5 text-gray-600" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{player.name}</div>
                        <div className="text-sm text-gray-500">Reg: {player.registrationDate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{player.team}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{player.county}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{player.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(player.status)}`}>
                      {player.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Add comment..."
                        defaultValue={player.comment || ''}
                        className="w-32 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-red-500 focus:border-red-500"
                        onBlur={(e) => handleCommentSubmit(player.id, e.target.value)}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Add observation..."
                        defaultValue={player.observation || ''}
                        className="w-32 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-red-500 focus:border-red-500"
                        onBlur={(e) => handleObservationSubmit(player.id, e.target.value)}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleCommentSubmit(player.id, player.comment || '')}
                      >
                        <Send className="w-4 h-4" />
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

  const renderComments = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Comments & Observations</h3>
      
      {/* Comments Table */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h4 className="text-md font-semibold text-gray-900 mb-4">Submitted Comments</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {comments.map((comment) => (
                <tr key={comment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{comment.playerName}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">{comment.comment}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCommentStatusColor(comment.status)}`}>
                      {comment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">{comment.reason || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{comment.submittedDate}</td>
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
        return renderPlayerVerification();
      case 'comments':
        return renderComments();
      default:
        return renderPlayerVerification();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Kickball Dashboard</h2>
            <p className="text-sm text-gray-600 mb-4">Kickball Federation</p>
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'overview' ? 'bg-red-100 text-red-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <BarChart3 className="w-5 h-5 mr-3" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab('players')}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'players' ? 'bg-red-100 text-red-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Circle className="w-5 h-5 mr-3" />
                Player Verification
              </button>
              <button
                onClick={() => setActiveTab('comments')}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'comments' ? 'bg-red-100 text-red-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <MessageSquare className="w-5 h-5 mr-3" />
                Comments & Observations
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {activeTab === 'players' ? 'Kickball Player Verification' : 
                 activeTab === 'comments' ? 'Comments & Observations' : 'Overview'}
              </h1>
              <p className="text-gray-600 mt-1">
                {activeTab === 'players' ? 'Verify players and submit comments for backend approval' :
                 activeTab === 'comments' ? 'Track submitted comments and observations' :
                 'Kickball Federation Dashboard Overview'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Role: Kickball Federation Official</span>
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

export default KickballDashboard;
