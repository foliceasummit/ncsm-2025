'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  UserCheck, 
  FileTextIcon, 
  Clock, 
  BarChart3, 
  CreditCard,
  Upload,
  Download,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Search
} from 'lucide-react';

interface Player {
  id: string;
  photo: string;
  lastName: string;
  firstName: string;
  middleName: string;
  dateOfBirth: string;
  nationality: string;
  pastClub: string;
  currentClub: string;
  level: '3rd Division' | 'Second Division' | 'First Division';
  discipline: string;
  year: string;
  group: string;
  county: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Action Needed';
  notes?: string;
  birthCertificate?: string;
  medicalCertificate?: string;
  documentApprovals?: {
    photo: 'Pending' | 'Approved' | 'Rejected';
    birthCertificate: 'Pending' | 'Approved' | 'Rejected';
    medicalCertificate: 'Pending' | 'Approved' | 'Rejected';
  };
}

interface Official {
  id: string;
  photo: string;
  lastName: string;
  firstName: string;
  middleName: string;
  dateOfBirth: string;
  nationality: string;
  discipline: string;
  year: string;
  group: string;
  position: string;
  county: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Action Needed';
  notes?: string;
  documents: string[];
}

const CountyOfficialDashboard: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDiscipline, setSelectedDiscipline] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - in real app, this would come from API based on logged-in county
  const [players, setPlayers] = useState<Player[]>([
    {
      id: '1',
      photo: '/api/placeholder/150/200',
      lastName: 'Doe',
      firstName: 'John',
      middleName: 'Michael',
      dateOfBirth: '1995-03-15',
      nationality: 'Liberian',
      pastClub: 'Bong United',
      currentClub: 'Bong Stars',
      level: 'First Division',
      discipline: 'Football',
      year: '2025',
      group: 'A',
      county: 'Bong',
      status: 'Approved',
      birthCertificate: '/api/placeholder/150/200',
      medicalCertificate: '/api/placeholder/150/200',
      documentApprovals: {
        photo: 'Approved',
        birthCertificate: 'Approved',
        medicalCertificate: 'Approved'
      }
    },
    {
      id: '2',
      photo: '/api/placeholder/150/200',
      lastName: 'Smith',
      firstName: 'Jane',
      middleName: 'Elizabeth',
      dateOfBirth: '1998-07-22',
      nationality: 'Liberian',
      pastClub: 'Bong Ladies',
      currentClub: 'Bong Ladies',
      level: 'Second Division',
      discipline: 'Female Soccer',
      year: '2025',
      group: 'A',
      county: 'Bong',
      status: 'Pending',
      birthCertificate: '/api/placeholder/150/200',
      medicalCertificate: '/api/placeholder/150/200',
      documentApprovals: {
        photo: 'Approved',
        birthCertificate: 'Pending',
        medicalCertificate: 'Pending'
      }
    }
  ]);

  const [officials, setOfficials] = useState<Official[]>([
    {
      id: '1',
      photo: '/api/placeholder/150/200',
      lastName: 'Johnson',
      firstName: 'Mike',
      middleName: 'Robert',
      dateOfBirth: '1985-11-08',
      nationality: 'Liberian',
      discipline: 'Football',
      year: '2025',
      group: 'A',
      position: 'Coach',
      county: 'Bong',
      status: 'Approved',
      documents: ['license.pdf', 'certification.pdf']
    }
  ]);

  const disciplines = ['Football', 'Kickball', 'Female Soccer', 'Volleyball', 'Basketball', 'Athletics'];
  const levels = ['3rd Division', 'Second Division', 'First Division'];
  const positions = ['Coach', 'Assistant Coach', 'Manager', 'Physio', 'Team Doctor', 'Equipment Manager'];

  // Calculate counts
  const totalPlayers = players.length;
  const totalOfficials = officials.length;
  const pendingCount = players.filter(p => p.status === 'Pending').length + 
                      officials.filter(o => o.status === 'Pending').length;
  const actionNeededCount = players.filter(p => p.status === 'Action Needed').length + 
                           officials.filter(o => o.status === 'Action Needed').length;

  // Filter data based on discipline and search
  const filteredPlayers = players.filter(player => {
    const disciplineMatch = selectedDiscipline === 'all' || player.discipline === selectedDiscipline;
    const searchMatch = player.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       player.lastName.toLowerCase().includes(searchTerm.toLowerCase());
    return disciplineMatch && searchMatch;
  });

  const filteredOfficials = officials.filter(official => {
    const disciplineMatch = selectedDiscipline === 'all' || official.discipline === selectedDiscipline;
    const searchMatch = official.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       official.lastName.toLowerCase().includes(searchTerm.toLowerCase());
    return disciplineMatch && searchMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'text-green-600 bg-green-100';
      case 'Rejected': return 'text-red-600 bg-red-100';
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      case 'Action Needed': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return <CheckCircle className="w-4 h-4" />;
      case 'Rejected': return <XCircle className="w-4 h-4" />;
      case 'Pending': return <Clock className="w-4 h-4" />;
      case 'Action Needed': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'register-players', label: 'Register Players', icon: Users },
    { id: 'register-officials', label: 'Register Officials', icon: UserCheck },
    { id: 'view-registrations', label: 'View Registrations', icon: FileTextIcon },
    { id: 'match-submission', label: 'Match Day List', icon: Clock },
    { id: 'status-dashboard', label: 'Status Dashboard', icon: BarChart3 },
    { id: 'player-cards', label: 'Player Cards', icon: CreditCard },
    { id: 'document-approval', label: 'Document Approval', icon: FileTextIcon }
  ];

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
              <p className="text-2xl font-bold text-gray-900">{totalPlayers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Officials</p>
              <p className="text-2xl font-bold text-gray-900">{totalOfficials}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-yellow-500">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-orange-500">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Action Needed</p>
              <p className="text-2xl font-bold text-gray-900">{actionNeededCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">⚠️ Important Alerts</h3>
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3" />
            <span className="text-yellow-800">Registration closes in 15 days</span>
          </div>
          {actionNeededCount > 0 && (
            <div className="flex items-center p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-orange-600 mr-3" />
              <span className="text-orange-800">You have {actionNeededCount} registrations requiring action</span>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Users className="w-4 h-4 text-blue-600 mr-3" />
              <span className="text-gray-700">New player registration: John Doe (Football)</span>
            </div>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <UserCheck className="w-4 h-4 text-green-600 mr-3" />
              <span className="text-gray-700">Official approved: Mike Johnson (Coach)</span>
            </div>
            <span className="text-sm text-gray-500">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPlayerRegistration = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">🏅 Register New Player</h3>
      
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Photo Upload */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Player Photo *
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                </div>
                <input type="file" className="hidden" accept="image/*" />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
            <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nationality *</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Past Club</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Club</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Level *</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select Level</option>
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Discipline *</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select Discipline</option>
              {disciplines.map(discipline => (
                <option key={discipline} value={discipline}>{discipline}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Year *</label>
            <input type="text" value="2025" readOnly className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Group</label>
            <input type="text" value="A" readOnly className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">County</label>
            <input type="text" value="Bong" readOnly className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" />
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            ✅ Submit Player Registration
          </button>
        </div>
      </form>
    </div>
  );

  const renderOfficialRegistration = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">👥 Register New Official</h3>
      
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Photo Upload */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Official Photo *
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                </div>
                <input type="file" className="hidden" accept="image/*" />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
            <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nationality *</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Discipline *</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select Discipline</option>
              {disciplines.map(discipline => (
                <option key={discipline} value={discipline}>{discipline}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Position *</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select Position</option>
              {positions.map(position => (
                <option key={position} value={position}>{position}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Year *</label>
            <input type="text" value="2025" readOnly className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Group</label>
            <input type="text" value="A" readOnly className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">County</label>
            <input type="text" value="Bong" readOnly className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" />
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            ✅ Submit Official Registration
          </button>
        </div>
      </form>
    </div>
  );

  const renderViewRegistrations = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Discipline</label>
            <select
              value={selectedDiscipline}
              onChange={(e) => setSelectedDiscipline(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Disciplines</option>
              {disciplines.map(discipline => (
                <option key={discipline} value={discipline}>{discipline}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Players Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Players</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discipline</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPlayers.map((player) => (
                <tr key={player.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-full" src={player.photo} alt="" />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {player.firstName} {player.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{player.level}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{player.discipline}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(player.status)}`}>
                      {getStatusIcon(player.status)}
                      <span className="ml-1">{player.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {player.documents.length} documents
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      {player.status === 'Action Needed' && (
                        <button className="text-orange-600 hover:text-orange-900">
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Officials Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Officials</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Official</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discipline</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOfficials.map((official) => (
                <tr key={official.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-full" src={official.photo} alt="" />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {official.firstName} {official.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{official.position}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{official.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{official.discipline}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(official.status)}`}>
                      {getStatusIcon(official.status)}
                      <span className="ml-1">{official.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      {official.status === 'Action Needed' && (
                        <button className="text-orange-600 hover:text-orange-900">
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
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

  const renderMatchSubmission = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">⏱ Submit Match Day List</h3>
      
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-center">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
          <span className="text-yellow-800 font-medium">Important: Final list must be submitted 1 hour before game time</span>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Discipline *</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select Discipline</option>
              {disciplines.map(discipline => (
                <option key={discipline} value={discipline}>{discipline}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Match Date *</label>
            <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">Select Players from County Roster</label>
          <div className="border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto">
            {filteredPlayers.map((player) => (
              <div key={player.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg mb-2">
                <div className="flex items-center">
                  <input type="checkbox" className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <img className="h-8 w-8 rounded-full mr-3" src={player.photo} alt="" />
                  <div>
                    <div className="font-medium">{player.firstName} {player.lastName}</div>
                    <div className="text-sm text-gray-500">{player.discipline} - {player.level}</div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(player.status)}`}>
                  {player.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            ✅ Submit Match List
          </button>
        </div>
      </div>
    </div>
  );

  const renderStatusDashboard = () => (
    <div className="space-y-6">
      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="text-2xl font-bold text-yellow-600">{players.filter(p => p.status === 'Pending').length}</div>
          <div className="text-sm text-gray-600">Pending Review</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="text-2xl font-bold text-green-600">{players.filter(p => p.status === 'Approved').length}</div>
          <div className="text-sm text-gray-600">Approved</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="text-2xl font-bold text-red-600">{players.filter(p => p.status === 'Rejected').length}</div>
          <div className="text-sm text-gray-600">Rejected</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="text-2xl font-bold text-orange-600">{players.filter(p => p.status === 'Action Needed').length}</div>
          <div className="text-sm text-gray-600">Action Needed</div>
        </div>
      </div>

      {/* Detailed Status Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Registration Status Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discipline</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LFA Notes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...players, ...officials].map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img className="h-8 w-8 rounded-full mr-3" src={item.photo} alt="" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {item.firstName} {item.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {('position' in item) ? item.position : item.level}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {('position' in item) ? 'Official' : 'Player'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.discipline}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {getStatusIcon(item.status)}
                      <span className="ml-1">{item.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.notes || 'No notes'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {item.status === 'Action Needed' && (
                      <button className="text-orange-600 hover:text-orange-900">
                        📤 Resubmit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPlayerCards = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">🎟️ Generate Player Cards</h3>
          
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-blue-800">Player cards are automatically generated once registrations are approved by LFA</span>
            </div>
          </div>

          <div className="text-center py-12">
            <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Player Cards Coming Soon</h3>
            <p className="text-gray-600">The modern player card system is being implemented. Check back soon!</p>
          </div>
        </div>
      </div>
    );
  };

  const renderDocumentApproval = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">📋 Document Approval Status</h3>
        
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-blue-800">Documents must be approved by Admin/Backend users before final player approval</span>
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
              {players.map((player) => {
                const approvals = player.documentApprovals || {
                  photo: 'Pending',
                  birthCertificate: 'Pending',
                  medicalCertificate: 'Pending'
                };
                
                const overallStatus = 
                  approvals.photo === 'Approved' && 
                  approvals.birthCertificate === 'Approved' && 
                  approvals.medicalCertificate === 'Approved' 
                    ? 'All Approved' 
                    : 'Pending Approval';

                const getStatusColor = (status: string) => {
                  switch (status) {
                    case 'Approved': return 'text-green-600 bg-green-100';
                    case 'Rejected': return 'text-red-600 bg-red-100';
                    case 'Pending': return 'text-yellow-600 bg-yellow-100';
                    default: return 'text-gray-600 bg-gray-100';
                  }
                };

                const getOverallStatusColor = (status: string) => {
                  switch (status) {
                    case 'All Approved': return 'text-green-600 bg-green-100';
                    case 'Pending Approval': return 'text-yellow-600 bg-yellow-100';
                    default: return 'text-gray-600 bg-gray-100';
                  }
                };

                return (
                  <tr key={player.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                          {player.photo ? (
                            <img className="h-10 w-10 rounded-full object-cover" src={player.photo} alt="" />
                          ) : (
                            <Users className="w-5 h-5 text-gray-600" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {player.firstName} {player.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{player.discipline} - {player.level}</div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(approvals.photo)}`}>
                          {approvals.photo}
                        </span>
                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                          View
                        </button>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(approvals.birthCertificate)}`}>
                          {approvals.birthCertificate}
                        </span>
                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                          View
                        </button>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(approvals.medicalCertificate)}`}>
                          {approvals.medicalCertificate}
                        </span>
                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                          View
                        </button>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getOverallStatusColor(overallStatus)}`}>
                        {overallStatus}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
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
      case 'register-players':
        return renderPlayerRegistration();
      case 'register-officials':
        return renderOfficialRegistration();
      case 'view-registrations':
        return renderViewRegistrations();
      case 'match-submission':
        return renderMatchSubmission();
      case 'status-dashboard':
        return renderStatusDashboard();
      case 'player-cards':
        return renderPlayerCards();
      case 'document-approval':
        return renderDocumentApproval();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">County Officials Dashboard</h1>
          <p className="text-gray-600 mt-2">Bong County - Manage players, officials, and registrations</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default CountyOfficialDashboard;
