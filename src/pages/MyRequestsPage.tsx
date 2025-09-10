import React, { useState } from 'react';
import { Clock, MapPin, User, Phone, Calendar, Package, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useData, ServiceRequest } from '../contexts/DataContext';

const statusConfig = {
  pending: { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Pending' },
  'in-review': { icon: AlertCircle, color: 'text-blue-600', bg: 'bg-blue-100', label: 'In Review' },
  assigned: { icon: User, color: 'text-purple-600', bg: 'bg-purple-100', label: 'Assigned' },
  'in-progress': { icon: Package, color: 'text-orange-600', bg: 'bg-orange-100', label: 'In Progress' },
  completed: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', label: 'Completed' },
  cancelled: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100', label: 'Cancelled' }
};

export default function MyRequestsPage() {
  const { requests, employees } = useData();
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);

  const getEmployeeName = (employeeId?: string) => {
    if (!employeeId) return 'Not assigned';
    const employee = employees.find(emp => emp.id === employeeId);
    return employee ? employee.name : 'Unknown';
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Service Requests</h1>
          <p className="text-xl text-gray-600">Track the status of your service requests</p>
        </div>

        {requests.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-500 mb-2">No requests found</h3>
            <p className="text-gray-400">You haven't made any service requests yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((request) => {
              const statusInfo = statusConfig[request.status];
              const StatusIcon = statusInfo.icon;

              return (
                <div
                  key={request.id}
                  onClick={() => setSelectedRequest(request)}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`${statusInfo.bg} ${statusInfo.color} px-3 py-1 rounded-full flex items-center space-x-2`}>
                        <StatusIcon className="w-4 h-4" />
                        <span className="text-sm font-medium">{statusInfo.label}</span>
                      </div>
                      <div className="text-sm text-gray-500">#{request.referenceNumber}</div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{request.serviceType}</h3>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span className="truncate">{request.pickupLocation}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(new Date(request.preferredDateTime))}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{getEmployeeName(request.assignedTo)}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-600 line-clamp-2">{request.description}</p>
                    </div>

                    <div className="mt-4 text-xs text-gray-500">
                      Created: {formatDate(request.createdAt)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Request Detail Modal */}
        {selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Request Details</h2>
                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    ×
                  </button>
                </div>
                <div className="mt-2 flex items-center space-x-4">
                  <span className="text-gray-600">#{selectedRequest.referenceNumber}</span>
                  <div className={`${statusConfig[selectedRequest.status].bg} ${statusConfig[selectedRequest.status].color} px-3 py-1 rounded-full flex items-center space-x-2`}>
                    <span className="text-sm font-medium">{statusConfig[selectedRequest.status].label}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Service Type</label>
                      <p className="text-gray-900">{selectedRequest.serviceType}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Preferred Date & Time</label>
                      <p className="text-gray-900">{formatDate(new Date(selectedRequest.preferredDateTime))}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Location Details</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Pickup Location</label>
                      <p className="text-gray-900">{selectedRequest.pickupLocation}</p>
                    </div>
                    {selectedRequest.dropoffLocation && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Drop-off Location</label>
                        <p className="text-gray-900">{selectedRequest.dropoffLocation}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-700">{selectedRequest.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Customer Name</label>
                      <p className="text-gray-900">{selectedRequest.customerName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Phone</label>
                      <p className="text-gray-900">{selectedRequest.customerPhone}</p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-gray-500">Email</label>
                      <p className="text-gray-900">{selectedRequest.customerEmail}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Assignment</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Assigned To</label>
                      <p className="text-gray-900">{getEmployeeName(selectedRequest.assignedTo)}</p>
                    </div>
                    {selectedRequest.budget && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Budget</label>
                        <p className="text-gray-900">KES {selectedRequest.budget.toLocaleString()}</p>
                      </div>
                    )}
                  </div>
                </div>

                {selectedRequest.notes && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Notes</h3>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedRequest.notes}</p>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Timeline</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>Created: {formatDate(selectedRequest.createdAt)}</div>
                    <div>Last Updated: {formatDate(selectedRequest.updatedAt)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}