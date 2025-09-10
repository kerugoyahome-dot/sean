import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { Users, Package, Clock, CheckCircle, TrendingUp, AlertCircle, UserCheck, MessageSquare } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { useData } from '../../contexts/DataContext';

const COLORS = ['#8B0000', '#DC2626', '#EF4444', '#F87171', '#FCA5A5'];

export default function AdminDashboard() {
  const { requests, employees } = useData();

  // Calculate statistics
  const stats = {
    totalRequests: requests.length,
    pendingRequests: requests.filter(r => r.status === 'pending').length,
    completedRequests: requests.filter(r => r.status === 'completed').length,
    activeEmployees: employees.filter(e => e.status === 'active').length,
    inProgressRequests: requests.filter(r => r.status === 'in-progress').length,
  };

  // Status distribution data
  const statusData = [
    { name: 'Pending', value: requests.filter(r => r.status === 'pending').length },
    { name: 'In Review', value: requests.filter(r => r.status === 'in-review').length },
    { name: 'Assigned', value: requests.filter(r => r.status === 'assigned').length },
    { name: 'In Progress', value: requests.filter(r => r.status === 'in-progress').length },
    { name: 'Completed', value: requests.filter(r => r.status === 'completed').length },
  ].filter(item => item.value > 0);

  // Service type distribution
  const serviceData = requests.reduce((acc: any[], request) => {
    const existing = acc.find(item => item.service === request.serviceType);
    if (existing) {
      existing.count++;
    } else {
      acc.push({ service: request.serviceType, count: 1 });
    }
    return acc;
  }, []);

  // Recent requests
  const recentRequests = [...requests]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome to QUICKLINK SERVICES Admin Portal</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalRequests}</p>
              </div>
              <Package className="w-12 h-12 text-blue-500" />
            </div>
            <div className="mt-4 text-sm text-gray-500">
              All time service requests
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pendingRequests}</p>
              </div>
              <Clock className="w-12 h-12 text-yellow-500" />
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Awaiting assignment
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-3xl font-bold text-orange-600">{stats.inProgressRequests}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-orange-500" />
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Currently being handled
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Staff</p>
                <p className="text-3xl font-bold text-green-600">{stats.activeEmployees}</p>
              </div>
              <UserCheck className="w-12 h-12 text-green-500" />
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Available employees
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Request Status Distribution */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Popular Services */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Services</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={serviceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="service" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8B0000" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Requests */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Requests</h3>
            <div className="space-y-4">
              {recentRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">#{request.referenceNumber}</p>
                    <p className="text-sm text-gray-600">{request.serviceType}</p>
                    <p className="text-sm text-gray-500">{request.customerName}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      request.status === 'completed' ? 'bg-green-100 text-green-800' :
                      request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      request.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {request.status}
                    </span>
                  </div>
                </div>
              ))}
              {recentRequests.length === 0 && (
                <p className="text-gray-500 text-center py-4">No recent requests</p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-red-50 hover:bg-red-100 rounded-lg transition-colors text-left">
                <Package className="w-8 h-8 text-red-600 mb-2" />
                <p className="font-medium text-gray-900">New Request</p>
                <p className="text-sm text-gray-600">Create manual request</p>
              </button>
              
              <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left">
                <Users className="w-8 h-8 text-blue-600 mb-2" />
                <p className="font-medium text-gray-900">Add Employee</p>
                <p className="text-sm text-gray-600">Manage team members</p>
              </button>
              
              <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left">
                <MessageSquare className="w-8 h-8 text-green-600 mb-2" />
                <p className="font-medium text-gray-900">Send Message</p>
                <p className="text-sm text-gray-600">Broadcast to team</p>
              </button>
              
              <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left">
                <AlertCircle className="w-8 h-8 text-purple-600 mb-2" />
                <p className="font-medium text-gray-900">View Reports</p>
                <p className="text-sm text-gray-600">Analytics & insights</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}