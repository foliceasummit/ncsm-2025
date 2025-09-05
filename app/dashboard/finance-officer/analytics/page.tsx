'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { FaChartLine, FaChartPie, FaChartBar } from 'react-icons/fa'

// Dynamically import charts to avoid SSR issues
const LineChart = dynamic(() => import('react-chartjs-2').then(mod => mod.Line), { ssr: false })
const PieChart = dynamic(() => import('react-chartjs-2').then(mod => mod.Pie), { ssr: false })
const BarChart = dynamic(() => import('react-chartjs-2').then(mod => mod.Bar), { ssr: false })

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
)

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('week')

  // Sample data - replace with actual API data
  const salesTrendData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Ticket Sales',
        data: [150, 230, 180, 290, 320, 450, 380],
        fill: false,
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.1,
      },
      {
        label: 'Revenue',
        data: [1500, 2300, 1800, 2900, 3200, 4500, 3800],
        fill: false,
        borderColor: 'rgb(34, 197, 94)',
        tension: 0.1,
      },
    ],
  }

  const ticketTypeData = {
    labels: ['VIP', 'Stadium Wing', 'Regular'],
    datasets: [
      {
        data: [300, 500, 1200],
        backgroundColor: [
          'rgb(59, 130, 246)',
          'rgb(34, 197, 94)',
          'rgb(249, 115, 22)',
        ],
      },
    ],
  }

  const revenueByCountyData = {
    labels: [
      'Montserrado',
      'Nimba',
      'Bong',
      'Grand Bassa',
      'Maryland',
      'Lofa',
    ],
    datasets: [
      {
        label: 'Revenue by County',
        data: [45000, 32000, 28000, 21000, 18000, 15000],
        backgroundColor: 'rgb(59, 130, 246)',
      },
    ],
  }

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Analytics Overview</h2>
          <select
            className="border rounded-lg px-4 py-2"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            aria-label="Select time range"
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      {/* Sales Trend Chart */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-4">
          <FaChartLine className="text-blue-500 mr-2" />
          <h2 className="text-lg font-semibold">Sales Trend</h2>
        </div>
        <div className="h-[400px]">
          <LineChart
            data={salesTrendData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>

      {/* Two Column Layout for Pie and Bar Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ticket Type Distribution */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <FaChartPie className="text-green-500 mr-2" />
            <h2 className="text-lg font-semibold">Ticket Type Distribution</h2>
          </div>
          <div className="h-[300px]">
            <PieChart
              data={ticketTypeData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>

        {/* Revenue by County */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <FaChartBar className="text-orange-500 mr-2" />
            <h2 className="text-lg font-semibold">Revenue by County</h2>
          </div>
          <div className="h-[300px]">
            <BarChart
              data={revenueByCountyData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Key Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800">Average Daily Sales</h3>
            <p className="text-2xl font-bold text-blue-900">285</p>
            <p className="text-sm text-blue-600">+12% vs last week</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-green-800">Most Popular Type</h3>
            <p className="text-2xl font-bold text-green-900">Regular</p>
            <p className="text-sm text-green-600">60% of total sales</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-orange-800">Top Revenue County</h3>
            <p className="text-2xl font-bold text-orange-900">Montserrado</p>
            <p className="text-sm text-orange-600">$45,000 total revenue</p>
          </div>
        </div>
      </div>
    </div>
  )
}
