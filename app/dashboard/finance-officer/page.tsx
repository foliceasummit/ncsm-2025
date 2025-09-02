'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  DollarSign, 
  Ticket, 
  TrendingUp, 
  BarChart3, 
  Download, 
  Filter,
  Calendar,
  Users,
  TrendingDown,
  Eye,
  FileTextIcon,
  PieChart,
  LineChart
} from 'lucide-react';

interface TicketSale {
  id: string;
  matchName: string;
  date: string;
  ticketsSold: number;
  revenue: number;
  status: 'Upcoming' | 'Complete' | 'Cancelled';
  county: string;
  ticketType: 'VIP' | 'Regular' | 'Student' | 'Senior';
  price: number;
}

interface SalesData {
  date: string;
  tickets: number;
  revenue: number;
}

const FinanceOfficerDashboard: React.FC = () => {
  const router = useRouter();
  const [selectedDateRange, setSelectedDateRange] = useState('today');
  const [selectedMatch, setSelectedMatch] = useState('all');
  const [selectedCounty, setSelectedCounty] = useState('all');
  const [selectedTicketType, setSelectedTicketType] = useState('all');

  // Mock data - in real app, this would come from API
  const [ticketSales] = useState<TicketSale[]>([
    {
      id: '1',
      matchName: 'Bong vs. Lofa',
      date: '2025-01-15',
      ticketsSold: 245,
      revenue: 12250,
      status: 'Complete',
      county: 'Bong',
      ticketType: 'VIP',
      price: 50
    },
    {
      id: '2',
      matchName: 'Montserrado vs. Nimba',
      date: '2025-01-16',
      ticketsSold: 189,
      revenue: 9450,
      status: 'Complete',
      county: 'Montserrado',
      ticketType: 'Regular',
      price: 30
    },
    {
      id: '3',
      matchName: 'Grand Bassa vs. Grand Gedeh',
      date: '2025-01-17',
      ticketsSold: 156,
      revenue: 7800,
      status: 'Complete',
      county: 'Grand Bassa',
      ticketType: 'Student',
      price: 20
    },
    {
      id: '4',
      matchName: 'Bomi vs. Maryland',
      date: '2025-01-18',
      ticketsSold: 203,
      revenue: 10150,
      status: 'Complete',
      county: 'Bomi',
      ticketType: 'VIP',
      price: 50
    },
    {
      id: '5',
      matchName: 'Lofa vs. Margibi',
      date: '2025-01-19',
      ticketsSold: 178,
      revenue: 8900,
      status: 'Complete',
      county: 'Lofa',
      ticketType: 'Regular',
      price: 30
    },
    {
      id: '6',
      matchName: 'River Gee vs. Sinoe',
      date: '2025-01-20',
      ticketsSold: 134,
      revenue: 6700,
      status: 'Complete',
      county: 'River Gee',
      ticketType: 'Student',
      price: 20
    },
    {
      id: '7',
      matchName: 'Grand Kru vs. Rivercess',
      date: '2025-01-21',
      ticketsSold: 167,
      revenue: 8350,
      status: 'Complete',
      county: 'Grand Kru',
      ticketType: 'Regular',
      price: 30
    },
    {
      id: '8',
      matchName: 'Gbarpolu vs. Bong',
      date: '2025-01-22',
      ticketsSold: 198,
      revenue: 9900,
      status: 'Complete',
      county: 'Gbarpolu',
      ticketType: 'VIP',
      price: 50
    },
    {
      id: '9',
      matchName: 'Nimba vs. Grand Bassa',
      date: '2025-01-23',
      ticketsSold: 223,
      revenue: 11150,
      status: 'Complete',
      county: 'Nimba',
      ticketType: 'Regular',
      price: 30
    },
    {
      id: '10',
      matchName: 'Maryland vs. Lofa',
      date: '2025-01-24',
      ticketsSold: 145,
      revenue: 7250,
      status: 'Complete',
      county: 'Maryland',
      ticketType: 'Student',
      price: 20
    },
    {
      id: '11',
      matchName: 'Margibi vs. River Gee',
      date: '2025-01-25',
      ticketsSold: 189,
      revenue: 9450,
      status: 'Complete',
      county: 'Margibi',
      ticketType: 'Regular',
      price: 30
    },
    {
      id: '12',
      matchName: 'Sinoe vs. Grand Kru',
      date: '2025-01-26',
      ticketsSold: 167,
      revenue: 8350,
      status: 'Complete',
      county: 'Sinoe',
      ticketType: 'Regular',
      price: 30
    },
    {
      id: '13',
      matchName: 'Rivercess vs. Gbarpolu',
      date: '2025-01-27',
      ticketsSold: 178,
      revenue: 8900,
      status: 'Complete',
      county: 'Rivercess',
      ticketType: 'VIP',
      price: 50
    },
    {
      id: '14',
      matchName: 'Bong vs. Montserrado',
      date: '2025-01-28',
      ticketsSold: 256,
      revenue: 12800,
      status: 'Complete',
      county: 'Bong',
      ticketType: 'VIP',
      price: 50
    },
    {
      id: '15',
      matchName: 'Lofa vs. Bomi',
      date: '2025-01-29',
      ticketsSold: 198,
      revenue: 9900,
      status: 'Complete',
      county: 'Lofa',
      ticketType: 'Regular',
      price: 30
    }
  ]);

  // Mock sales trend data
  const [salesTrend] = useState<SalesData[]>([
    { date: '2025-01-15', tickets: 245, revenue: 12250 },
    { date: '2025-01-16', tickets: 189, revenue: 9450 },
    { date: '2025-01-17', tickets: 156, revenue: 7800 },
    { date: '2025-01-18', tickets: 203, revenue: 10150 },
    { date: '2025-01-19', tickets: 178, revenue: 8900 },
    { date: '2025-01-20', tickets: 134, revenue: 6700 },
    { date: '2025-01-21', tickets: 167, revenue: 8350 },
    { date: '2025-01-22', tickets: 198, revenue: 9900 },
    { date: '2025-01-23', tickets: 223, revenue: 11150 },
    { date: '2025-01-24', tickets: 145, revenue: 7250 },
    { date: '2025-01-25', tickets: 189, revenue: 9450 },
    { date: '2025-01-26', tickets: 167, revenue: 8350 },
    { date: '2025-01-27', tickets: 178, revenue: 8900 },
    { date: '2025-01-28', tickets: 256, revenue: 12800 },
    { date: '2025-01-29', tickets: 198, revenue: 9900 }
  ]);

  // Calculate summary statistics
  const today = new Date().toISOString().split('T')[0];
  const todaySales = ticketSales.filter(sale => sale.date === today);
  const todayRevenue = todaySales.reduce((sum, sale) => sum + sale.revenue, 0);
  const todayTickets = todaySales.reduce((sum, sale) => sum + sale.ticketsSold, 0);

  const thisWeekSales = ticketSales.filter(sale => {
    const saleDate = new Date(sale.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return saleDate >= weekAgo;
  });
  const thisWeekRevenue = thisWeekSales.reduce((sum, sale) => sum + sale.revenue, 0);

  const topSellingMatch = ticketSales.reduce((top, current) => 
    current.ticketsSold > top.ticketsSold ? current : top
  );

  const lowSellingMatch = ticketSales.reduce((low, current) => 
    current.ticketsSold < low.ticketsSold ? current : low
  );

  // Filter data based on selections
  const filteredSales = ticketSales.filter(sale => {
    const matchMatch = selectedMatch === 'all' || sale.matchName.includes(selectedMatch);
    const countyMatch = selectedCounty === 'all' || sale.county === selectedCounty;
    const typeMatch = selectedTicketType === 'all' || sale.ticketType === selectedTicketType;
    return matchMatch && countyMatch && typeMatch;
  });

  // Calculate ticket type distribution
  const ticketTypeData = [
    { type: 'VIP', count: ticketSales.filter(s => s.ticketType === 'VIP').length, color: '#FF6B6B' },
    { type: 'Regular', count: ticketSales.filter(s => s.ticketType === 'Regular').length, color: '#4ECDC4' },
    { type: 'Student', count: ticketSales.filter(s => s.ticketType === 'Student').length, color: '#45B7D1' },
    { type: 'Senior', count: ticketSales.filter(s => s.ticketType === 'Senior').length, color: '#96CEB4' }
  ];

  // Calculate revenue by county
  const revenueByCounty = ticketSales.reduce((acc, sale) => {
    acc[sale.county] = (acc[sale.county] || 0) + sale.revenue;
    return acc;
  }, {} as Record<string, number>);

  const exportToPDF = () => {
    // Mock PDF export functionality
    alert('PDF export functionality would be implemented here');
  };

  const exportToExcel = () => {
    // Mock Excel export functionality
    const csvContent = [
      ['Match Name', 'Date', 'Tickets Sold', 'Revenue', 'Status', 'County', 'Ticket Type'],
      ...filteredSales.map(sale => [
        sale.matchName,
        sale.date,
        sale.ticketsSold.toString(),
        sale.revenue.toString(),
        sale.status,
        sale.county,
        sale.ticketType
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ticket-sales-${selectedDateRange}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Complete': return 'text-green-600 bg-green-100';
      case 'Upcoming': return 'text-blue-600 bg-blue-100';
      case 'Cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Finance Dashboard</h1>
              <p className="text-gray-600 mt-2">Ticket sales overview and financial reporting</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Role: Finance Officer</span>
              <button
                onClick={() => router.push('/')}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </div>

        {/* 1. Ticket Sales Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Ticket className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Tickets Today</p>
                <p className="text-2xl font-bold text-gray-900">{todayTickets}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Today's Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(todayRevenue)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Week's Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(thisWeekRevenue)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-orange-500">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Top Selling Match</p>
                <p className="text-lg font-bold text-gray-900">{topSellingMatch.matchName}</p>
                <p className="text-sm text-gray-500">{topSellingMatch.ticketsSold} tickets</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Match-wise Breakdown Table */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Match-wise Breakdown</h2>
            <div className="flex items-center space-x-4">
              <select
                value={selectedMatch}
                onChange={(e) => setSelectedMatch(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Matches</option>
                <option value="Bong">Bong</option>
                <option value="Lofa">Lofa</option>
                <option value="Montserrado">Montserrado</option>
                <option value="Nimba">Nimba</option>
              </select>
              <select
                value={selectedCounty}
                onChange={(e) => setSelectedCounty(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Counties</option>
                <option value="Bong">Bong</option>
                <option value="Lofa">Lofa</option>
                <option value="Montserrado">Montserrado</option>
                <option value="Nimba">Nimba</option>
                <option value="Grand Bassa">Grand Bassa</option>
                <option value="Grand Gedeh">Grand Gedeh</option>
                <option value="Bomi">Bomi</option>
                <option value="Maryland">Maryland</option>
                <option value="Margibi">Margibi</option>
                <option value="River Gee">River Gee</option>
                <option value="Sinoe">Sinoe</option>
                <option value="Grand Kru">Grand Kru</option>
                <option value="Rivercess">Rivercess</option>
                <option value="Gbarpolu">Gbarpolu</option>
              </select>
              <select
                value={selectedTicketType}
                onChange={(e) => setSelectedTicketType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                <option value="VIP">VIP</option>
                <option value="Regular">Regular</option>
                <option value="Student">Student</option>
                <option value="Senior">Senior</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Match</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tickets Sold</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">County</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket Type</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{sale.matchName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{sale.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{sale.ticketsSold}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(sale.revenue)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(sale.status)}`}>
                        {sale.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{sale.county}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{sale.ticketType}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sales Trend Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Sales Trend (Last 14 Days)</h3>
              <LineChart className="w-6 h-6 text-blue-600" />
            </div>
            <div className="h-64 flex items-end justify-between space-x-2">
              {salesTrend.map((data, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className="w-8 bg-blue-500 rounded-t"
                    style={{ height: `${(data.revenue / 13000) * 200}px` }}
                  ></div>
                  <div className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-left">
                    {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">Revenue trend over time</p>
            </div>
          </div>

          {/* Ticket Type Distribution */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Ticket Type Distribution</h3>
              <PieChart className="w-6 h-6 text-green-600" />
            </div>
            <div className="space-y-4">
              {ticketTypeData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-3"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm font-medium text-gray-900">{item.type}</span>
                  </div>
                  <span className="text-sm text-gray-600">{item.count} sales</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">Distribution of ticket types sold</p>
            </div>
          </div>
        </div>

        {/* Revenue by County */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue by County</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(revenueByCounty).map(([county, revenue]) => (
              <div key={county} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-lg font-semibold text-gray-900">{county}</div>
                <div className="text-sm text-green-600 font-medium">{formatCurrency(revenue)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Reports & Export */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Reports & Export</h3>
            <div className="flex items-center space-x-4">
              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
              <button
                onClick={exportToPDF}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <FileTextIcon className="w-4 h-4" />
                Export PDF
              </button>
              <button
                onClick={exportToExcel}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export Excel
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{filteredSales.length}</div>
              <div className="text-sm text-blue-800">Total Matches</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(filteredSales.reduce((sum, sale) => sum + sale.revenue, 0))}
              </div>
              <div className="text-sm text-green-800">Total Revenue</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {filteredSales.reduce((sum, sale) => sum + sale.ticketsSold, 0)}
              </div>
              <div className="text-sm text-purple-800">Total Tickets</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceOfficerDashboard;
