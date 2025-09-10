import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'dispatcher' | 'rider' | 'provider';
  lastLogin?: Date;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock admin account
const ADMIN_ACCOUNT = {
  email: 'admin@quicklinkservices.com',
  password: 'Admin@2025!',
  user: {
    id: '1',
    email: 'admin@quicklinkservices.com',
    name: 'System Administrator',
    role: 'admin' as const
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('quicklink_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication
    if (email === ADMIN_ACCOUNT.email && password === ADMIN_ACCOUNT.password) {
      const userData = { ...ADMIN_ACCOUNT.user, lastLogin: new Date() };
      setUser(userData);
      localStorage.setItem('quicklink_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('quicklink_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}