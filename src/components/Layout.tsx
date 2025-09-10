import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Shield } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-red-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="bg-white text-red-900 p-2 rounded-lg">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">QUICKLINK SERVICES</h1>
                  <p className="text-sm opacity-90">Your Time, Our Priority</p>
                </div>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === '/' ? 'bg-red-800' : 'hover:bg-red-800'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/my-requests" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === '/my-requests' ? 'bg-red-800' : 'hover:bg-red-800'
                }`}
              >
                My Requests
              </Link>
              <Link 
                to="/contact" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === '/contact' ? 'bg-red-800' : 'hover:bg-red-800'
                }`}
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Sticky Footer */}
      <footer className="bg-black text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">QUICKLINK SERVICES</h3>
              <p className="text-gray-300 mb-4">"Let Us Run the Errands, While You Run the World!"</p>
              <div className="flex space-x-2 text-sm">
                <span className="bg-red-900 px-2 py-1 rounded">Fast & Reliable</span>
                <span className="bg-red-900 px-2 py-1 rounded">Affordable</span>
                <span className="bg-red-900 px-2 py-1 rounded">Trusted</span>
              </div>
            </div>
            <div>
              <h4 className="text-md font-medium mb-4">Contact Information</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <div>
                    <a href="tel:0111679286" className="hover:text-white">0111679286</a>
                    <span className="mx-1">•</span>
                    <a href="tel:0717562660" className="hover:text-white">0717562660</a>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:info@quicklinkservices.com" className="hover:text-white">
                    info@quicklinkservices.com
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Serving: Nairobi & Surrounding Areas</span>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <a 
                  href="https://wa.me/254111679286" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm transition-colors"
                >
                  WhatsApp: 0111679286
                </a>
                <a 
                  href="https://wa.me/254717562660" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm ml-2 transition-colors"
                >
                  WhatsApp: 0717562660
                </a>
              </div>
            </div>
            <div className="flex justify-end">
              <Link 
                to="/admin" 
                className="bg-red-900 hover:bg-red-800 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Admin Portal
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            <p>&copy; 2025 QUICKLINK SERVICES. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}