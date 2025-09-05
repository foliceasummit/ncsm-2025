'use client'

import { useState } from 'react'
import { 
  FaUserPlus, FaUserEdit, FaTrash, FaKey, 
  FaFilter, FaSearch, FaSort, FaSortUp, FaSortDown 
} from 'react-icons/fa'

interface User {
  id: string
  name: string
  email: string
  role: string
  status: 'Active' | 'Inactive' | 'Pending'
  lastLogin: string
  county?: string
}

interface RolePermission {
  name: string
  description: string
  isGranted: boolean
}

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortColumn, setSortColumn] = useState<string>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [showNewUserModal, setShowNewUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Match Official',
      status: 'Active',
      lastLogin: '2025-09-05T10:30:00',
      county: 'Montserrado'
    },
    // Add more sample users
  ]

  const rolePermissions: RolePermission[] = [
    { name: 'View Players', description: 'Access to view player profiles', isGranted: true },
    { name: 'Edit Players', description: 'Ability to edit player information', isGranted: false },
    { name: 'Approve Players', description: 'Can approve player registrations', isGranted: false },
    { name: 'View Reports', description: 'Access to view match reports', isGranted: true },
    { name: 'Submit Reports', description: 'Can submit new match reports', isGranted: true },
    // Add more permissions
  ]

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const getSortIcon = (column: string) => {
    if (sortColumn !== column) return <FaSort className="ml-1" />
    return sortDirection === 'asc' ? (
      <FaSortUp className="ml-1" />
    ) : (
      <FaSortDown className="ml-1" />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button
          onClick={() => setShowNewUserModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          title="Add new user"
        >
          <FaUserPlus />
          <span>Add New User</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 w-full p-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search users"
            />
          </div>
          <select
            className="p-2 border rounded-lg"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            aria-label="Filter by role"
          >
            <option value="all">All Roles</option>
            <option value="match-official">Match Officials</option>
            <option value="journalist">Journalists</option>
            <option value="mys-staff">MYS Staff</option>
            <option value="finance-officer">Finance Officers</option>
            <option value="federation">Federation Users</option>
          </select>
          <select
            className="p-2 border rounded-lg"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">
                  Name
                  {getSortIcon('name')}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('email')}
              >
                <div className="flex items-center">
                  Email
                  {getSortIcon('email')}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('role')}
              >
                <div className="flex items-center">
                  Role
                  {getSortIcon('role')}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center">
                  Status
                  {getSortIcon('status')}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('lastLogin')}
              >
                <div className="flex items-center">
                  Last Login
                  {getSortIcon('lastLogin')}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  {user.county && (
                    <div className="text-sm text-gray-500">{user.county}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : user.status === 'Inactive'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {new Date(user.lastLogin).toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Edit user"
                    >
                      <FaUserEdit />
                    </button>
                    <button
                      className="text-yellow-600 hover:text-yellow-900"
                      title="Reset password"
                    >
                      <FaKey />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      title="Delete user"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Role Permissions */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Role Permissions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rolePermissions.map((permission, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">{permission.name}</h3>
                <p className="text-sm text-gray-500">{permission.description}</p>
              </div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={permission.isGranted}
                  onChange={() => {/* Handle permission toggle */}}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
