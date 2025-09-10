import React, { useState } from 'react';
import { Save, Shield, Bell, MapPin, CreditCard, Users, Clock } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';

export default function Settings() {
  const [settings, setSettings] = useState({
    companyName: 'QUICKLINK SERVICES',
    tagline: 'Your Time, Our Priority',
    primaryPhone: '0111679286',
    secondaryPhone: '0717562660',
    email: 'info@quicklinkservices.com',
    serviceArea: 'Nairobi & Surrounding Areas',
    workingHours: {
      weekdays: '6:00 AM - 10:00 PM',
      saturday: '7:00 AM - 9:00 PM',
      sunday: '8:00 AM - 8:00 PM'
    },
    notifications: {
      smsEnabled: true,
      whatsappEnabled: true,
      emailEnabled: true,
      pushEnabled: true
    },
    pricing: {
      taxiBaseRate: 200,
      groceryFee: 150,
      deliveryFee: 100,
      laundryPickup: 100
    }
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock saving settings
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleInputChange = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const handleDirectChange = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
            <p className="text-gray-600">Configure system preferences and business settings</p>
          </div>
          <button
            onClick={handleSave}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save All Changes</span>
          </button>
        </div>

        {saved && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-700">Settings saved successfully!</p>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Company Information */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Shield className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900">Company Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                <input
                  type="text"
                  value={settings.companyName}
                  onChange={(e) => handleDirectChange('companyName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) => handleDirectChange('tagline', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Phone</label>
                <input
                  type="tel"
                  value={settings.primaryPhone}
                  onChange={(e) => handleDirectChange('primaryPhone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Phone</label>
                <input
                  type="tel"
                  value={settings.secondaryPhone}
                  onChange={(e) => handleDirectChange('secondaryPhone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleDirectChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service Area</label>
                <input
                  type="text"
                  value={settings.serviceArea}
                  onChange={(e) => handleDirectChange('serviceArea', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Clock className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Working Hours</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monday - Friday</label>
                <input
                  type="text"
                  value={settings.workingHours.weekdays}
                  onChange={(e) => handleInputChange('workingHours', 'weekdays', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Saturday</label>
                <input
                  type="text"
                  value={settings.workingHours.saturday}
                  onChange={(e) => handleInputChange('workingHours', 'saturday', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sunday</label>
                <input
                  type="text"
                  value={settings.workingHours.sunday}
                  onChange={(e) => handleInputChange('workingHours', 'sunday', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Bell className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">SMS Notifications</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.smsEnabled}
                      onChange={(e) => handleInputChange('notifications', 'smsEnabled', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">WhatsApp Notifications</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.whatsappEnabled}
                      onChange={(e) => handleInputChange('notifications', 'whatsappEnabled', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Email Notifications</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.emailEnabled}
                      onChange={(e) => handleInputChange('notifications', 'emailEnabled', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Push Notifications</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.pushEnabled}
                      onChange={(e) => handleInputChange('notifications', 'pushEnabled', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Configuration */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center space-x-2 mb-6">
              <CreditCard className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Service Pricing (KES)</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Taxi Base Rate</label>
                <input
                  type="number"
                  value={settings.pricing.taxiBaseRate}
                  onChange={(e) => handleInputChange('pricing', 'taxiBaseRate', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Grocery Shopping Fee</label>
                <input
                  type="number"
                  value={settings.pricing.groceryFee}
                  onChange={(e) => handleInputChange('pricing', 'groceryFee', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Fee</label>
                <input
                  type="number"
                  value={settings.pricing.deliveryFee}
                  onChange={(e) => handleInputChange('pricing', 'deliveryFee', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Laundry Pickup Fee</label>
                <input
                  type="number"
                  value={settings.pricing.laundryPickup}
                  onChange={(e) => handleInputChange('pricing', 'laundryPickup', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Shield className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
            </div>
            
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">Session Management</h4>
                <p className="text-sm text-yellow-700 mb-3">Admin sessions automatically expire after 30 minutes of inactivity for security.</p>
                <div className="flex space-x-3">
                  <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors text-sm">
                    Force Logout All Sessions
                  </button>
                  <button className="border border-yellow-600 text-yellow-600 px-4 py-2 rounded-lg hover:bg-yellow-50 transition-colors text-sm">
                    View Active Sessions
                  </button>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">Password Policy</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>• Minimum 8 characters</p>
                  <p>• Must contain uppercase and lowercase letters</p>
                  <p>• Must contain at least one number</p>
                  <p>• Must contain at least one special character</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}