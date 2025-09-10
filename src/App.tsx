import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import MyRequestsPage from './pages/MyRequestsPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import RequestsManagement from './pages/admin/RequestsManagement';
import EmployeesManagement from './pages/admin/EmployeesManagement';
import Analytics from './pages/admin/Analytics';
import Settings from './pages/admin/Settings';
import Messaging from './pages/admin/Messaging';

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user || user.role !== 'admin') return <Navigate to="/admin/login" />;
  
  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<Layout><HomePage /></Layout>} />
              <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
              <Route path="/my-requests" element={<Layout><MyRequestsPage /></Layout>} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/admin/requests" element={<AdminRoute><RequestsManagement /></AdminRoute>} />
              <Route path="/admin/employees" element={<AdminRoute><EmployeesManagement /></AdminRoute>} />
              <Route path="/admin/analytics" element={<AdminRoute><Analytics /></AdminRoute>} />
              <Route path="/admin/messaging" element={<AdminRoute><Messaging /></AdminRoute>} />
              <Route path="/admin/settings" element={<AdminRoute><Settings /></AdminRoute>} />
            </Routes>
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;