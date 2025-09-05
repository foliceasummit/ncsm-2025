'use client'

import { useState } from 'react'
import { FaFilePdf, FaFileExcel, FaCalendar, FaFilter, FaDownload } from 'react-icons/fa'

interface FilterState {
  dateRange: {
    from: string
    to: string
  }
  match: string
  county: string
  ticketType: string
}

export default function ReportsAndExport() {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: {
      from: '',
      to: ''
    },
    match: '',
    county: '',
    ticketType: ''
  })

  const [previewData, setPreviewData] = useState<any[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateReport = () => {
    setIsGenerating(true)
    // Simulate API call
    setTimeout(() => {
      setPreviewData([
        {
          date: '2025-09-05',
          match: 'Montserrado vs Nimba',
          ticketType: 'VIP',
          quantity: 50,
          revenue: 2500
        },
        // Add more sample data
      ])
      setIsGenerating(false)
    }, 1000)
  }

  const handleExport = (format: 'pdf' | 'excel') => {
    // Implement export functionality
    console.log(`Exporting as ${format}...`)
  }

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-4">
          <FaFilter className="text-gray-500 mr-2" />
          <h2 className="text-lg font-semibold">Report Filters</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From Date
            </label>
            <input
              type="date"
              className="w-full border rounded-lg p-2"
              value={filters.dateRange.from}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                dateRange: { ...prev.dateRange, from: e.target.value }
              }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To Date
            </label>
            <input
              type="date"
              className="w-full border rounded-lg p-2"
              value={filters.dateRange.to}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                dateRange: { ...prev.dateRange, to: e.target.value }
              }))}
            />
          </div>

          {/* Match Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Match
            </label>
            <select
              className="w-full border rounded-lg p-2"
              value={filters.match}
              onChange={(e) => setFilters(prev => ({ ...prev, match: e.target.value }))}
              aria-label="Select match"
            >
              <option value="">All Matches</option>
              <option value="1">Montserrado vs Nimba</option>
              <option value="2">Bong vs Lofa</option>
              {/* Add more matches */}
            </select>
          </div>

          {/* County Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              County
            </label>
            <select
              className="w-full border rounded-lg p-2"
              value={filters.county}
              onChange={(e) => setFilters(prev => ({ ...prev, county: e.target.value }))}
              aria-label="Select county"
            >
              <option value="">All Counties</option>
              <option value="montserrado">Montserrado</option>
              <option value="nimba">Nimba</option>
              {/* Add more counties */}
            </select>
          </div>

          {/* Ticket Type */}
          <div className="md:col-span-2 lg:col-span-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ticket Type
            </label>
            <select
              className="w-full border rounded-lg p-2"
              value={filters.ticketType}
              onChange={(e) => setFilters(prev => ({ ...prev, ticketType: e.target.value }))}
              aria-label="Select ticket type"
            >
              <option value="">All Types</option>
              <option value="vip">VIP</option>
              <option value="regular">Regular</option>
              <option value="stadium">Stadium Wing</option>
            </select>
          </div>
        </div>

        {/* Generate Button */}
        <div className="mt-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center w-full md:w-auto"
            onClick={handleGenerateReport}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>Generating...</>
            ) : (
              <>
                <FaFilter className="mr-2" />
                Generate Report
              </>
            )}
          </button>
        </div>
      </div>

      {/* Preview Section */}
      {previewData.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Report Preview</h2>
            <div className="flex space-x-4">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center"
                onClick={() => handleExport('pdf')}
              >
                <FaFilePdf className="mr-2" />
                Export PDF
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
                onClick={() => handleExport('excel')}
              >
                <FaFileExcel className="mr-2" />
                Export Excel
              </button>
            </div>
          </div>

          {/* Preview Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Match
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ticket Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {previewData.map((row, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(row.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {row.match}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.ticketType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {row.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${row.revenue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Report Templates */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
            <FaCalendar className="text-blue-500" />
            <span>Daily Summary</span>
          </button>
          <button className="p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
            <FaCalendar className="text-green-500" />
            <span>Weekly Report</span>
          </button>
          <button className="p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
            <FaDownload className="text-purple-500" />
            <span>Revenue Analysis</span>
          </button>
        </div>
      </div>
    </div>
  )
}
