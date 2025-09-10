import React, { useState } from 'react';
import { Send, Users, MessageCircle, Phone, Mail } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { useData } from '../../contexts/DataContext';

export default function Messaging() {
  const { employees, requests } = useData();
  const [messageText, setMessageText] = useState('');
  const [recipients, setRecipients] = useState('all');
  const [messageType, setMessageType] = useState('sms');
  const [sent, setSent] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock sending message
    setSent(true);
    setMessageText('');
    setTimeout(() => setSent(false), 3000);
  };

  // Message templates
  const templates = [
    {
      title: 'Request Assigned',
      content: 'Hi [NAME], you have been assigned a new service request #[REF]. Please check your dashboard for details.'
    },
    {
      title: 'Request Completed',
      content: 'Hi [NAME], your service request #[REF] has been completed successfully. Thank you for choosing QuickLink Services!'
    },
    {
      title: 'Status Update',
      content: 'Hi [NAME], your request #[REF] status has been updated to [STATUS]. You can track progress in your dashboard.'
    },
    {
      title: 'Team Announcement',
      content: 'Team update: [MESSAGE]. Please acknowledge receipt. Thank you!'
    }
  ];

  const recipientOptions = [
    { value: 'all', label: 'All Team Members' },
    { value: 'riders', label: 'Riders Only' },
    { value: 'dispatchers', label: 'Dispatchers Only' },
    { value: 'providers', label: 'Service Providers Only' },
    { value: 'customers', label: 'Recent Customers' }
  ];

  const getRecipientCount = (type: string) => {
    switch (type) {
      case 'all': return employees.filter(emp => emp.status === 'active').length;
      case 'riders': return employees.filter(emp => emp.role === 'rider' && emp.status === 'active').length;
      case 'dispatchers': return employees.filter(emp => emp.role === 'dispatcher' && emp.status === 'active').length;
      case 'providers': return employees.filter(emp => emp.role === 'provider' && emp.status === 'active').length;
      case 'customers': return requests.length;
      default: return 0;
    }
  };

  const recentMessages = [
    {
      id: '1',
      recipient: 'Michael Driver',
      type: 'SMS',
      message: 'You have been assigned request #QL001',
      timestamp: '2 hours ago',
      status: 'delivered'
    },
    {
      id: '2',
      recipient: 'All Team Members',
      type: 'WhatsApp',
      message: 'Team meeting scheduled for tomorrow 2PM',
      timestamp: '5 hours ago',
      status: 'delivered'
    },
    {
      id: '3',
      recipient: 'Jane Smith',
      type: 'Email',
      message: 'Your request #QL002 has been completed',
      timestamp: '1 day ago',
      status: 'delivered'
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messaging & Notifications</h1>
          <p className="text-gray-600">Send messages to team members and customers</p>
        </div>

        {sent && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-700">Message sent successfully to {getRecipientCount(recipients)} recipients!</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Message Composer */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Compose Message</h3>
              
              <form onSubmit={handleSendMessage} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
                    <select
                      value={recipients}
                      onChange={(e) => setRecipients(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      {recipientOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label} ({getRecipientCount(option.value)})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message Type</label>
                    <select
                      value={messageType}
                      onChange={(e) => setMessageType(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="sms">SMS</option>
                      <option value="whatsapp">WhatsApp</option>
                      <option value="email">Email</option>
                      <option value="push">Push Notification</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Type your message here..."
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    {messageText.length}/160 characters
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Will be sent to {getRecipientCount(recipients)} recipient(s)
                  </div>
                  <button
                    type="submit"
                    className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Message Templates */}
            <div className="bg-white rounded-xl shadow-md p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Message Templates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map((template, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-red-300 cursor-pointer">
                    <h4 className="font-medium text-gray-900 mb-2">{template.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{template.content}</p>
                    <button
                      onClick={() => setMessageText(template.content)}
                      className="text-red-600 text-sm hover:text-red-700"
                    >
                      Use Template
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Communication Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600">SMS Sent Today</span>
                  </div>
                  <span className="font-semibold text-gray-900">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">WhatsApp Messages</span>
                  </div>
                  <span className="font-semibold text-gray-900">18</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-purple-500" />
                    <span className="text-sm text-gray-600">Emails Sent</span>
                  </div>
                  <span className="font-semibold text-gray-900">12</span>
                </div>
              </div>
            </div>

            {/* Contact Numbers */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Numbers</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Primary</span>
                  <span className="font-medium text-gray-900">0111679286</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Secondary</span>
                  <span className="font-medium text-gray-900">0717562660</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Support Email</span>
                  <span className="font-medium text-gray-900 text-xs">info@quicklinkservices.com</span>
                </div>
              </div>
            </div>

            {/* WhatsApp Quick Links */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">WhatsApp Quick Links</h3>
              <div className="space-y-3">
                <a 
                  href="https://wa.me/254111679286" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-2 rounded-lg transition-colors"
                >
                  WhatsApp: 0111679286
                </a>
                <a 
                  href="https://wa.me/254717562660" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-2 rounded-lg transition-colors"
                >
                  WhatsApp: 0717562660
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Messages</h3>
          <div className="space-y-4">
            {recentMessages.map((msg) => (
              <div key={msg.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    msg.type === 'SMS' ? 'bg-blue-100 text-blue-600' :
                    msg.type === 'WhatsApp' ? 'bg-green-100 text-green-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {msg.type === 'SMS' ? <Phone className="w-5 h-5" /> :
                     msg.type === 'WhatsApp' ? <MessageCircle className="w-5 h-5" /> :
                     <Mail className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{msg.recipient}</p>
                    <p className="text-sm text-gray-600">{msg.message}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{msg.timestamp}</p>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    msg.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {msg.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}