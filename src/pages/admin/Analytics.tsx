import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Users, Package, Clock, CheckCircle, Star, Calendar } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { useData } from '../../contexts/DataContext';

const COLORS = ['#8B0000', '#DC2626', '#EF4444', '#F87171', '#FCA5A5', '#FED7D7'];

export default function Analytics() {
  const { requests, employees } = useData();

  // Calculate key metrics
  const totalRequests = requests.length;
  const completedRequests = requests.filter(r => r.status === 'completed').length;
  const pendingRequests = requests.filter(r => r.status === 'pending').length;
  const inProgressRequests = requests.filter(r => r.status === 'in-progress').length;
  const completionRate = totalRequests > 0 ? (completedRequests / totalRequests * 100).toFixed(1) : 0;
  const activeEmployees = employees.filter(e => e.status === 'active').length;

  // Service distribution
  const serviceDistribution = requests.reduce((acc: any[], request) => {
    const existing = acc.find(item => item.name === request.serviceType);
    if (existing) {
      existing.value++;
    } else {
      acc.push({ name: request.serviceType, value: 1 });
    }
    return acc;
  }, []);

  // Status distribution
  const statusDistribution = [
    { name: 'Pending', value: requests.filter(r => r.status === 'pending').length, color: '#F59E0B' },
    { name: 'In Review', value: requests.filter(r => r.status === 'in-review').length, color: '#3B82F6' },
    { name: 'Assigned', value: requests.filter(r => r.status === 'assigned').length, color: '#8B5CF6' },
    { name: 'In Progress', value: requests.filter(r => r.status === 'in-progress').length, color: '#F97316' },
    { name: 'Completed', value: requests.filter(r => r.status === 'completed').length, color: '#10B981' },
    { name: 'Cancelled', value: requests.filter(r => r.status === 'cancelled').length, color: '#EF4444' },
  ].filter(item => item.value > 0);

  // Employee performance
  const employeePerformance = employees
    .filter(emp => emp.role !== 'admin')
    .map(emp => ({
      name: emp.name,
      completedJobs: emp.completedJobs,
      rating: emp.rating,
      role: emp.role
    }))
    .sort((a, b) => b.completedJobs - a.completedJobs);

  // Daily requests (mock data for last 7 days)
  const dailyData = [
    { date: '2025-01-13', requests: 12, completed: 10 },
    { date: '2025-01-14', requests: 15, completed: 12 },
    { date: '2025-01-15', requests: 8, completed: 7 },
    { date: '2025-01-16', requests: 18, completed: 15 },
    { date: '2025-01-17', requests: 22, completed: 19 },
    { date: '2025-01-18', requests: 16, completed: 14 },
    { date: '2025-01-19', requests: 20, completed: 17 },
  ];

  const averageRating = employees.length > 0 
    ? (employees.reduce((sum, emp) => sum + emp.rating, 0) / employees.length).toFixed(1)
    : 0;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600">Monitor performance and track key metrics</p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-3xl font-bold text-green-600">{completionRate}%</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600">+2.5%</span>
              <span className="text-gray-500 ml-1">from last week</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <p className="text-3xl font-bold text-yellow-600">{averageRating}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600">+0.2</span>
              <span className="text-gray-500 ml-1">from last month</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Requests</p>
                <p className="text-3xl font-bold text-orange-600">{inProgressRequests}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              <span className="text-red-600">-3</span>
              <span className="text-gray-500 ml-1">from yesterday</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Team Members</p>
                <p className="text-3xl font-bold text-blue-600">{activeEmployees}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-500">All active employees</span>
            </div>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Request Trends */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Trends (Last 7 Days)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
                <YAxis />
                <Tooltip labelFormatter={(date) => new Date(date).toLocaleDateString()} />
                <Area type="monotone" dataKey="requests" stackId="1" stroke="#8B0000" fill="#8B0000" fillOpacity={0.3} />
                <Area type="monotone" dataKey="completed" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Status Distribution */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Service Popularity */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Popularity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={serviceDistribution} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={120} fontSize={12} />
                <Tooltip />
                <Bar dataKey="value" fill="#8B0000" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Employee Performance */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Employees</h3>
            <div className="space-y-4">
              {employeePerformance.slice(0, 5).map((emp, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                      {emp.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{emp.name}</p>
                      <p className="text-sm text-gray-500 capitalize">{emp.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{emp.completedJobs} jobs</p>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{emp.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
            <h4 className="text-lg font-semibold mb-2">Monthly Summary</h4>
            <p className="text-3xl font-bold mb-1">{totalRequests}</p>
            <p className="text-blue-100">Total requests this month</p>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
            <h4 className="text-lg font-semibold mb-2">Success Rate</h4>
            <p className="text-3xl font-bold mb-1">{completionRate}%</p>
            <p className="text-green-100">Requests completed successfully</p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl">
            <h4 className="text-lg font-semibold mb-2">Response Time</h4>
            <p className="text-3xl font-bold mb-1">2.3h</p>
            <p className="text-purple-100">Average response time</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}