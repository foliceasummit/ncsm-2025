'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Copy, Eye, EyeOff, Download, Building2 } from 'lucide-react';
import { countyCredentials, getCountiesByGroup } from '../../../data/countyCredentials';

const CountyCredentialsPage: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [showPasswords, setShowPasswords] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const groups = ['A', 'B', 'C', 'D'];

  // Filter counties based on search and group
  const filteredCounties = countyCredentials.filter(county => {
    const matchesSearch = county.county.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         county.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         county.superintendent.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = selectedGroup === 'all' || county.group === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const exportCredentials = () => {
    const csvContent = [
      ['County', 'Username', 'Password', 'Group', 'Superintendent', 'Email', 'Phone'],
      ...filteredCounties.map(county => [
        county.county,
        county.username,
        county.password,
        county.group,
        county.superintendent,
        county.email,
        county.phone
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `county-credentials-${selectedGroup === 'all' ? 'all' : `group-${selectedGroup}`}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">County Credentials</h1>
                             <p className="text-gray-600 mt-2">Access credentials for all 14 counties</p>
            </div>
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Counties</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by county, username, or superintendent..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Group Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Group</label>
                <select
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Groups</option>
                  {groups.map(group => (
                    <option key={group} value={group}>Group {group}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowPasswords(!showPasswords)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showPasswords ? 'Hide' : 'Show'} Passwords
              </button>
              <button
                onClick={exportCredentials}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Credentials Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">County</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Password</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Superintendent</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCounties.map((county) => (
                  <tr key={county.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${
                          county.group === 'A' ? 'bg-red-500' :
                          county.group === 'B' ? 'bg-blue-500' :
                          county.group === 'C' ? 'bg-green-500' :
                          'bg-purple-500'
                        }`}></div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{county.county}</div>
                          <div className="text-sm text-gray-500">ID: {county.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900 font-mono">{county.username}</span>
                        <button
                          onClick={() => copyToClipboard(county.username, `username-${county.id}`)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                          title="Copy username"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        {copiedId === `username-${county.id}` && (
                          <span className="ml-2 text-xs text-green-600">Copied!</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {showPasswords ? (
                          <>
                            <span className="text-sm text-gray-900 font-mono">{county.password}</span>
                            <button
                              onClick={() => copyToClipboard(county.password, `password-${county.id}`)}
                              className="ml-2 text-blue-600 hover:text-blue-800"
                              title="Copy password"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                            {copiedId === `password-${county.id}` && (
                              <span className="ml-2 text-xs text-green-600">Copied!</span>
                            )}
                          </>
                        ) : (
                          <span className="text-sm text-gray-500">••••••••••</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        county.group === 'A' ? 'bg-red-100 text-red-800' :
                        county.group === 'B' ? 'bg-blue-100 text-blue-800' :
                        county.group === 'C' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        Group {county.group}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{county.superintendent}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{county.email}</div>
                      <div className="text-sm text-gray-500">{county.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => copyToClipboard(`${county.username}:${county.password}`, `full-${county.id}`)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Copy username:password"
                      >
                        Copy All
                      </button>
                      {copiedId === `full-${county.id}` && (
                        <span className="ml-2 text-xs text-green-600">Copied!</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{filteredCounties.length}</div>
              <div className="text-sm text-gray-600">Total Counties</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{filteredCounties.filter(c => c.group === 'A').length}</div>
              <div className="text-sm text-gray-600">Group A</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{filteredCounties.filter(c => c.group === 'B').length}</div>
              <div className="text-sm text-gray-600">Group B</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{filteredCounties.filter(c => c.group === 'C').length}</div>
              <div className="text-sm text-gray-600">Group C</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountyCredentialsPage;
