'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  FaUsers, FaUserCheck, FaRegIdCard, FaNewspaper, FaCalendarAlt,
  FaMoneyBillWave, FaClipboardCheck, FaHistory, FaCog, FaTachometerAlt,
  FaBars, FaTimes
} from 'react-icons/fa'

interface SidebarItem {
  title: string
  href: string
  icon: React.ReactNode
  badge?: number
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const sidebarItems: SidebarItem[] = [
    {
      title: 'Dashboard',
      href: '/dashboard/admin',
      icon: <FaTachometerAlt />,
    },
    {
      title: 'Users & Roles',
      href: '/dashboard/admin/users',
      icon: <FaUsers />,
      badge: 5, // New user requests
    },
    {
      title: 'Player Approvals',
      href: '/dashboard/admin/player-approvals',
      icon: <FaUserCheck />,
      badge: 12, // Pending approvals
    },
    {
      title: 'Player Cards',
      href: '/dashboard/admin/player-cards',
      icon: <FaRegIdCard />,
    },
    {
      title: 'Content Management',
      href: '/dashboard/admin/content',
      icon: <FaNewspaper />,
    },
    {
      title: 'Fixtures & Tables',
      href: '/dashboard/admin/fixtures',
      icon: <FaCalendarAlt />,
    },
    {
      title: 'Financial Controls',
      href: '/dashboard/admin/finance',
      icon: <FaMoneyBillWave />,
    },
    {
      title: 'Match Inspection',
      href: '/dashboard/admin/inspection',
      icon: <FaClipboardCheck />,
    },
    {
      title: 'System Logs',
      href: '/dashboard/admin/logs',
      icon: <FaHistory />,
    },
    {
      title: 'Settings',
      href: '/dashboard/admin/settings',
      icon: <FaCog />,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 bg-gray-800">
          <h1 className="text-xl font-bold text-white">NCSM Admin</h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-white hover:text-gray-300"
          >
            <FaTimes />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="px-4 py-4">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between px-4 py-3 mt-2 text-gray-300 rounded hover:bg-gray-800 hover:text-white transition-colors"
            >
              <div className="flex items-center">
                <span className="mr-3">{item.icon}</span>
                <span>{item.title}</span>
              </div>
              {item.badge && (
                <span className="px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className={`lg:ml-64 transition-margin duration-300 ease-in-out ${
        isSidebarOpen ? 'ml-64' : 'ml-0'
      }`}>
        {/* Top Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-gray-600 hover:text-gray-900"
            >
              <FaBars />
            </button>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Welcome, Admin</span>
              <button className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700">
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white shadow-sm mt-8">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="text-center text-sm text-gray-500">
              © 2025 NCSM Admin Panel. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
