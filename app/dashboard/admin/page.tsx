'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  UserPlus, 
  Shield, 
  FileText, 
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
import { toast } from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  county?: string;
  lastLogin: string;
}

interface PlayerRegistration {
  id: string;
  name: string;
  county: string;
  position: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
}

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  venue: string;
  status: 'scheduled' | 'in-progress' | 'completed';
  score?: string;
}

interface DocumentApproval {
  id: string;
  playerId: string;
  documentType: 'PHOTO' | 'BIRTH_CERTIFICATE' | 'MEDICAL_CERTIFICATE';
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  approvedBy?: string;
  approvedAt?: string;
  comments?: string;
  player: {
    id: string;
    firstName: string;
    lastName: string;
    discipline: string;
    level: string;
    county: {
      name: string;
    };
  };
}

const AdminDashboard: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState<User[]>([]);
  const [playerRegistrations, setPlayerRegistrations] = useState<PlayerRegistration[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [documentApprovals, setDocumentApprovals] = useState<DocumentApproval[]>([]);
  const [loading, setLoading] = useState(false);

  // Mock data
  useEffect(() => {
    setUsers([
      { id: '1', name: 'John Admin', email: 'admin@ncsm.gov.lr', role: 'Super Admin', status: 'active', lastLogin: '2025-01-15 09:30' },
      { id: '2', name: 'Sarah County', email: 'sarah@bong.gov.lr', role: 'County Official', status: 'active', county: 'Bong', lastLogin: '2025-01-15 08:45' },
      { id: '3', name: 'Mike Referee', email: 'mike@referee.gov.lr', role: 'Match Official', status: 'active', lastLogin: '2025-01-14 16:20' },
      { id: '4', name: 'Lisa Journalist', email: 'lisa@press.gov.lr', role: 'Journalist', status: 'pending', lastLogin: '2025-01-14 12:15' },
      { id: '5', name: 'Tom LFA', email: 'tom@lfa.gov.lr', role: 'LFA Official', status: 'active', lastLogin: '2025-01-15 10:00' }
    ]);

    setPlayerRegistrations([
      { id: '1', name: 'James Player', county: 'Bong', position: 'Forward', status: 'pending', submittedDate: '2025-01-15' },
      { id: '2', name: 'David Striker', county: 'Lofa', position: 'Midfielder', status: 'approved', submittedDate: '2025-01-14' },
      { id: '3', name: 'Emma Defender', county: 'Montserrado', position: 'Defender', status: 'rejected', submittedDate: '2025-01-13' }
    ]);

    setMatches([
      { id: '1', homeTeam: 'Bong', awayTeam: 'Lofa', date: '2025-01-20', venue: 'Bong Stadium', status: 'scheduled' },
      { id: '2', homeTeam: 'Montserrado', awayTeam: 'Nimba', date: '2025-01-21', venue: 'Antoinette Tubman Stadium', status: 'scheduled' },
      { id: '3', homeTeam: 'Grand Bassa', awayTeam: 'Grand Gedeh', date: '2025-01-18', venue: 'Buchanan Stadium', status: 'completed', score: '2-1' }
    ]);

    // Fetch document approvals
    fetchDocumentApprovals();
  }, []);

  // Fetch document approvals from API
  const fetchDocumentApprovals = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/document-approval');
      if (response.ok) {
        const data = await response.json();
        setDocumentApprovals(data);
      } else {
        console.error('Failed to fetch document approvals');
        // Fallback to mock data
        setDocumentApprovals([
          {
            id: '1',
            playerId: '1',
            documentType: 'PHOTO',
            status: 'APPROVED',
            approvedBy: 'admin@ncsm.gov.lr',
            approvedAt: '2025-01-15T10:00:00Z',
            player: {
              id: '1',
              firstName: 'John',
              lastName: 'Doe',
              discipline: 'Football',
              level: 'First Division',
              county: { name: 'Bong' }
            }
          },
          {
            id: '2',
            playerId: '1',
            documentType: 'BIRTH_CERTIFICATE',
            status: 'PENDING',
            player: {
              id: '1',
              firstName: 'John',
              lastName: 'Doe',
              discipline: 'Football',
              level: 'First Division',
              county: { name: 'Bong' }
            }
          },
          {
            id: '3',
            playerId: '1',
            documentType: 'MEDICAL_CERTIFICATE',
            status: 'PENDING',
            player: {
              id: '1',
              firstName: 'John',
              lastName: 'Doe',
              discipline: 'Football',
              level: 'First Division',
              county: { name: 'Bong' }
            }
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching document approvals:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle document approval/rejection
  const handleDocumentAction = async (playerId: string, documentType: string, action: 'APPROVE' | 'REJECT', comments?: string) => {
    try {
      setLoading(true);
      const response = await fetch('/api/document-approval', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playerId,
          documentType,
          status: action === 'APPROVE' ? 'APPROVED' : 'REJECTED',
          approvedBy: 'admin@ncsm.gov.lr', // In real app, get from auth context
          comments
        }),
      });

      if (response.ok) {
        // Refresh document approvals
        await fetchDocumentApprovals();
        toast.success(`Document ${action === 'APPROVE' ? 'approved' : 'rejected'} successfully`);
      } else {
        toast.error('Failed to update document status');
      }
    } catch (error) {
      console.error('Error updating document status:', error);
      toast.error('An error occurred while updating document status');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'approved':
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'pending':
      case 'scheduled':
        return 'text-yellow-600 bg-yellow-100';
      case 'inactive':
      case 'rejected':
      case 'in-progress':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Super Admin':
        return 'bg-red-100 text-red-800';
      case 'County Official':
        return 'bg-blue-100 text-blue-800';
      case 'Match Official':
        return 'bg-green-100 text-green-800';
      case 'Journalist':
        return 'bg-purple-100 text-purple-800';
      case 'LFA Official':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-yellow-500">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <FileText className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
              <p className="text-2xl font-bold text-gray-900">
                {playerRegistrations.filter(p => p.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Matches Today</p>
              <p className="text-2xl font-bold text-gray-900">
                {matches.filter(m => m.date === new Date().toISOString().split('T')[0]).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Newspaper className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Blog Posts</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
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
              <span className="text-sm text-gray-700">New user registration: Lisa Journalist</span>
            </div>
            <span className="text-xs text-gray-500">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
              <span className="text-sm text-gray-700">Player approved: David Striker (Lofa)</span>
            </div>
            <span className="text-xs text-gray-500">4 hours ago</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Edit className="w-5 h-5 text-yellow-600 mr-3" />
              <span className="text-sm text-gray-700">Match schedule updated: Bong vs Lofa</span>
            </div>
            <span className="text-xs text-gray-500">6 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-6">
      {/* Add User Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">User & Role Management</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <UserPlus className="w-4 h-4" />
          Add New User
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
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

  const renderRegistrationControl = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Registration Control</h3>
      
      {/* Player Registrations */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h4 className="text-md font-semibold text-gray-900 mb-4">Player Registrations</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">County</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {playerRegistrations.map((player) => (
                <tr key={player.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{player.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{player.county}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{player.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(player.status)}`}>
                      {player.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {player.status === 'pending' && (
                        <>
                          <button className="text-green-600 hover:text-green-900">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
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

      {/* Registration Portal Control */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h4 className="text-md font-semibold text-gray-900 mb-4">Registration Portal Control</h4>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Open Registration Portal
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Close Registration Portal
          </button>
        </div>
      </div>
    </div>
  );

  const renderMatchManagement = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Match & Reporting Management</h3>
      
      {/* Matches Table */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h4 className="text-md font-semibold text-gray-900 mb-4">All Matches</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Match</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
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

  const renderContentManagement = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Content Management</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Blog Management */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Newspaper className="w-6 h-6 text-blue-600 mr-2" />
            <h4 className="text-md font-semibold text-gray-900">Blog Management</h4>
          </div>
          <div className="space-y-3">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create New Post
            </button>
            <button className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              Manage Posts
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
          </div>
        </div>

        {/* Home Page Management */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Home className="w-6 h-6 text-purple-600 mr-2" />
            <h4 className="text-md font-semibold text-gray-900">Home Page</h4>
          </div>
          <div className="space-y-3">
            <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Edit Slider
            </button>
            <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Edit Content
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMonitoring = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Monitoring & Reports</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Report Generation */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Generate Reports</h4>
          <div className="space-y-3">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Players by County (PDF)
            </button>
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Match Results (CSV)
            </button>
            <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              System Logs (PDF)
            </button>
          </div>
        </div>

        {/* System Logs */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">System Logs</h4>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-700">Admin login: 2 hours ago</div>
              <div className="text-xs text-gray-500">IP: 192.168.1.100</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-700">User role updated: 4 hours ago</div>
              <div className="text-xs text-gray-500">Action: Sarah County → County Official</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-700">Match report approved: 6 hours ago</div>
              <div className="text-xs text-gray-500">Match: Bong vs Lofa</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">System Settings</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">General Settings</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Player Registration</span>
              <button className="px-3 py-1 bg-green-600 text-white text-xs rounded-full">Open</button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Official Registration</span>
              <button className="px-3 py-1 bg-green-600 text-white text-xs rounded-full">Open</button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">System Maintenance</span>
              <button className="px-3 py-1 bg-red-600 text-white text-xs rounded-full">Off</button>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Security Settings</h4>
          <div className="space-y-4">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Reset All Passwords
            </button>
            <button className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
              Backup Database
            </button>
            <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Emergency Lockdown
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDocumentApproval = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">📋 Document Approval Management</h3>
        
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <Shield className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-blue-800">Review and approve player documents before final tournament approval</span>
          </div>
        </div>

        {/* Document Approval Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Player
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Photo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Birth Certificate/ID/Passport
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Medical Certificate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Overall Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      <span className="ml-2 text-gray-600">Loading document approvals...</span>
                    </div>
                  </td>
                </tr>
              ) : documentApprovals.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No document approvals found
                  </td>
                </tr>
              ) : (
                // Group approvals by player
                Array.from(new Set(documentApprovals.map(da => da.playerId))).map(playerId => {
                  const playerApprovals = documentApprovals.filter(da => da.playerId === playerId);
                  const player = playerApprovals[0]?.player;
                  
                  if (!player) return null;

                  const photoApproval = playerApprovals.find(da => da.documentType === 'PHOTO');
                  const birthCertApproval = playerApprovals.find(da => da.documentType === 'BIRTH_CERTIFICATE');
                  const medicalApproval = playerApprovals.find(da => da.documentType === 'MEDICAL_CERTIFICATE');

                  const overallStatus = [photoApproval, birthCertApproval, medicalApproval].every(approval => 
                    approval?.status === 'APPROVED'
                  ) ? 'All Approved' : 'Pending Approval';

                  return (
                    <tr key={playerId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                            <Users className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {player.firstName} {player.lastName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {player.discipline} - {player.level}
                            </div>
                            <div className="text-xs text-gray-400">
                              {player.county.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            photoApproval?.status === 'APPROVED' ? 'text-green-600 bg-green-100' :
                            photoApproval?.status === 'REJECTED' ? 'text-red-600 bg-red-100' :
                            'text-yellow-600 bg-yellow-100'
                          }`}>
                            {photoApproval?.status || 'Pending'}
                          </span>
                          <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                          {photoApproval?.status === 'PENDING' && (
                            <div className="flex space-x-1">
                              <button 
                                onClick={() => handleDocumentAction(playerId, 'PHOTO', 'APPROVE')}
                                className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                              >
                                Approve
                              </button>
                              <button 
                                onClick={() => handleDocumentAction(playerId, 'PHOTO', 'REJECT')}
                                className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            birthCertApproval?.status === 'APPROVED' ? 'text-green-600 bg-green-100' :
                            birthCertApproval?.status === 'REJECTED' ? 'text-red-600 bg-red-100' :
                            'text-yellow-600 bg-yellow-100'
                          }`}>
                            {birthCertApproval?.status || 'Pending'}
                          </span>
                          <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                          {birthCertApproval?.status === 'PENDING' && (
                            <div className="flex space-x-1">
                              <button 
                                onClick={() => handleDocumentAction(playerId, 'BIRTH_CERTIFICATE', 'APPROVE')}
                                className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                              >
                                Approve
                              </button>
                              <button 
                                onClick={() => handleDocumentAction(playerId, 'BIRTH_CERTIFICATE', 'REJECT')}
                                className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            medicalApproval?.status === 'APPROVED' ? 'text-green-600 bg-green-100' :
                            medicalApproval?.status === 'REJECTED' ? 'text-red-600 bg-red-100' :
                            'text-yellow-600 bg-yellow-100'
                          }`}>
                            {medicalApproval?.status || 'Pending'}
                          </span>
                          <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                          {medicalApproval?.status === 'PENDING' && (
                            <div className="flex space-x-1">
                              <button 
                                onClick={() => handleDocumentAction(playerId, 'MEDICAL_CERTIFICATE', 'APPROVE')}
                                className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                              >
                                Approve
                              </button>
                              <button 
                                onClick={() => handleDocumentAction(playerId, 'MEDICAL_CERTIFICATE', 'REJECT')}
                                className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          overallStatus === 'All Approved' ? 'text-green-600 bg-green-100' : 'text-yellow-600 bg-yellow-100'
                        }`}>
                          {overallStatus}
                        </span>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">View Details</button>
                        {overallStatus === 'All Approved' && (
                          <button className="text-green-600 hover:text-green-900">Final Approve</button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Bulk Actions */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-md font-semibold text-gray-900 mb-3">Bulk Actions</h4>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Approve All Pending
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Export Approval Report
            </button>
            <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
              Send Approval Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'users':
        return renderUserManagement();
      case 'registrations':
        return renderRegistrationControl();
      case 'document-approval':
        return renderDocumentApproval();
      case 'matches':
        return renderMatchManagement();
      case 'content':
        return renderContentManagement();
      case 'monitoring':
        return renderMonitoring();
      case 'settings':
        return renderSystemSettings();
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
            <h2 className="text-xl font-bold text-gray-900 mb-6">Admin Dashboard</h2>
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
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'users' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Users className="w-5 h-5 mr-3" />
                User Management
              </button>
              <button
                onClick={() => setActiveTab('registrations')}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'registrations' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FileText className="w-5 h-5 mr-3" />
                Registrations
              </button>
              <button
                onClick={() => setActiveTab('document-approval')}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'document-approval' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Shield className="w-5 h-5 mr-3" />
                Document Approval
              </button>
              <button
                onClick={() => setActiveTab('matches')}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'matches' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Calendar className="w-5 h-5 mr-3" />
                Matches
              </button>
              <button
                onClick={() => setActiveTab('content')}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'content' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Newspaper className="w-5 h-5 mr-3" />
                Content
              </button>
              <button
                onClick={() => setActiveTab('monitoring')}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'monitoring' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <BarChart3 className="w-5 h-5 mr-3" />
                Monitoring
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'settings' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Settings className="w-5 h-5 mr-3" />
                System Settings
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
              <p className="text-gray-600 mt-1">Manage NCSM system and content</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Role: Super Admin</span>
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

export default AdminDashboard;
