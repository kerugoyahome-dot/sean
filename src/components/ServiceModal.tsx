import React, { useState } from 'react';
import { X, MapPin, Calendar, DollarSign } from 'lucide-react';
import { useData } from '../contexts/DataContext';

interface ServiceModalProps {
  serviceId: string;
  serviceName: string;
  onClose: () => void;
}

export default function ServiceModal({ serviceId, serviceName, onClose }: ServiceModalProps) {
  const { addRequest } = useData();
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    pickupLocation: '',
    dropoffLocation: '',
    description: '',
    preferredDateTime: '',
    budget: '',
    promoCode: '',
    acceptTerms: false
  });
  const [submitted, setSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const refNumber = addRequest({
      serviceType: serviceName,
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      customerEmail: formData.customerEmail,
      pickupLocation: formData.pickupLocation,
      dropoffLocation: formData.dropoffLocation || undefined,
      description: formData.description,
      preferredDateTime: formData.preferredDateTime,
      budget: formData.budget ? parseInt(formData.budget) : undefined,
      status: 'pending'
    });
    
    setReferenceNumber(refNumber);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✅</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h2>
          <p className="text-gray-600 mb-4">
            Your service request has been received. Your reference number is:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <span className="text-xl font-bold text-red-600">{referenceNumber}</span>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            You'll receive a confirmation via SMS/WhatsApp shortly. Track your request status in the "My Requests" section.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Book {serviceName}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Customer Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                name="customerName"
                required
                value={formData.customerName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
              <input
                type="tel"
                name="customerPhone"
                required
                value={formData.customerPhone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="0712345678"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
            <input
              type="email"
              name="customerEmail"
              required
              value={formData.customerEmail}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="your.email@example.com"
            />
          </div>

          {/* Location Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                Pickup Location *
              </label>
              <input
                type="text"
                name="pickupLocation"
                required
                value={formData.pickupLocation}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter pickup address"
              />
            </div>
            {(serviceId === 'taxi' || serviceId === 'delivery') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Drop-off Location
                </label>
                <input
                  type="text"
                  name="dropoffLocation"
                  value={formData.dropoffLocation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter drop-off address"
                />
              </div>
            )}
          </div>

          {/* Service Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Service Description *</label>
            <textarea
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Please provide detailed instructions for your service request..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Preferred Date & Time *
              </label>
              <input
                type="datetime-local"
                name="preferredDateTime"
                required
                value={formData.preferredDateTime}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <DollarSign className="w-4 h-4 mr-1" />
                Budget (KES)
              </label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Optional budget limit"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Promo Code</label>
            <input
              type="text"
              name="promoCode"
              value={formData.promoCode}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Enter promo code if any"
            />
          </div>

          {/* Terms */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              name="acceptTerms"
              required
              checked={formData.acceptTerms}
              onChange={handleChange}
              className="mt-1 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <label className="text-sm text-gray-700">
              I accept the terms and conditions and privacy policy. I understand that service charges will be communicated before confirmation. *
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}