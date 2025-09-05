'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { 
  FaMoneyBillWave, FaTicketAlt, FaFileExport,
  FaChartLine, FaUndo, FaCheck, FaCog
} from 'react-icons/fa'

// Dynamic import of Chart.js
const Line = dynamic(() => import('react-chartjs-2').then(mod => mod.Line), { ssr: false })

interface TicketCategory {
  id: string
  name: string
  price: number
  available: number
  sold: number
}

interface RefundRequest {
  id: string
  ticketId: string
  customerName: string
  amount: number
  reason: string
  status: 'pending' | 'approved' | 'rejected'
  requestDate: string
}

interface RevenueStats {
  total: number
  today: number
  thisWeek: number
  thisMonth: number
  byCategory: {
    [key: string]: number
  }
}

export default function FinancialControls() {
  const [activeTab, setActiveTab] = useState<'overview' | 'tickets' | 'refunds'>('overview')
  
  const ticketCategories: TicketCategory[] = [
    {
      id: '1',
      name: 'VIP',
      price: 50,
      available: 1000,
      sold: 450
    },
    {
      id: '2',
      name: 'Stadium Wing',
      price: 30,
      available: 5000,
      sold: 2800
    },
    {
      id: '3',
      name: 'Regular',
      price: 20,
      available: 10000,
      sold: 6500
    }
  ]

  const refundRequests: RefundRequest[] = [
    {
      id: '1',
      ticketId: 'T12345',
      customerName: 'John Doe',
      amount: 50,
      reason: 'Unable to attend',
      status: 'pending',
      requestDate: '2025-09-05T10:30:00'
    },
    // Add more refund requests
  ]

  const revenueStats: RevenueStats = {
    total: 285000,
    today: 12500,
    thisWeek: 85000,
    thisMonth: 285000,
    byCategory: {
      VIP: 22500,
      'Stadium Wing': 84000,
      Regular: 130000
    }
  }

  const revenueChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 25000, 22000, 30000, 25000],
        fill: false,
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.1
      }
    ]
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Financial Controls</h1>
        <div className="flex space-x-4">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
            title="Export financial report"
          >
            <FaFileExport />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 border-b">
        <button
          className={`pb-4 px-4 ${
            activeTab === 'overview'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`pb-4 px-4 ${
            activeTab === 'tickets'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('tickets')}
        >
          Ticket Management
        </button>
        <button
          className={`pb-4 px-4 ${
            activeTab === 'refunds'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('refunds')}
        >
          Refund Requests
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Revenue Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
              <p className="mt-2 text-3xl font-bold">${revenueStats.total.toLocaleString()}</p>
              <p className="mt-1 text-sm text-green-600">+15% vs last month</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Today's Revenue</h3>
              <p className="mt-2 text-3xl font-bold">${revenueStats.today.toLocaleString()}</p>
              <p className="mt-1 text-sm text-blue-600">50 transactions</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">This Week</h3>
              <p className="mt-2 text-3xl font-bold">${revenueStats.thisWeek.toLocaleString()}</p>
              <p className="mt-1 text-sm text-green-600">On track for target</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Pending Refunds</h3>
              <p className="mt-2 text-3xl font-bold">
                ${refundRequests.reduce((sum, req) => sum + (req.status === 'pending' ? req.amount : 0), 0).toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-yellow-600">{refundRequests.filter(r => r.status === 'pending').length} requests</p>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Revenue Trend</h2>
            <div className="h-[400px]">
              <Line
                data={revenueChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tickets' && (
        <div className="space-y-6">
          {/* Ticket Categories */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Ticket Categories</h2>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Available
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sold
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {ticketCategories.map((category) => (
                  <tr key={category.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {category.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${category.price}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {category.available.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {category.sold.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${(category.price * category.sold).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit ticket category"
                      >
                        <FaCog />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'refunds' && (
        <div className="space-y-6">
          {/* Refund Requests */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Refund Requests</h2>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ticket ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reason
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {refundRequests.map((request) => (
                  <tr key={request.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {request.customerName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {request.ticketId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${request.amount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {request.reason}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        request.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : request.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <button
                          className="text-green-600 hover:text-green-900"
                          title="Approve refund"
                        >
                          <FaCheck />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          title="Reject refund"
                        >
                          <FaUndo />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
