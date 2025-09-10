import React, { createContext, useContext, useState } from 'react';

export interface ServiceRequest {
  id: string;
  serviceType: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  pickupLocation: string;
  dropoffLocation?: string;
  description: string;
  preferredDateTime: string;
  budget?: number;
  status: 'pending' | 'in-review' | 'assigned' | 'in-progress' | 'completed' | 'cancelled';
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
  referenceNumber: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'dispatcher' | 'rider' | 'provider';
  status: 'active' | 'inactive';
  joinDate: Date;
  completedJobs: number;
  rating: number;
}

interface DataContextType {
  requests: ServiceRequest[];
  employees: Employee[];
  addRequest: (request: Omit<ServiceRequest, 'id' | 'createdAt' | 'updatedAt' | 'referenceNumber'>) => string;
  updateRequestStatus: (id: string, status: ServiceRequest['status'], notes?: string) => void;
  assignRequest: (id: string, employeeId: string) => void;
  addEmployee: (employee: Omit<Employee, 'id' | 'joinDate' | 'completedJobs' | 'rating'>) => void;
  updateEmployee: (id: string, updates: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Mock data
const mockRequests: ServiceRequest[] = [
  {
    id: '1',
    serviceType: 'Taxi Rides',
    customerName: 'John Doe',
    customerPhone: '0712345678',
    customerEmail: 'john@example.com',
    pickupLocation: 'CBD, Nairobi',
    dropoffLocation: 'Westlands, Nairobi',
    description: 'Airport pickup needed',
    preferredDateTime: '2025-01-20T10:00',
    status: 'in-progress',
    assignedTo: '2',
    createdAt: new Date('2025-01-19'),
    updatedAt: new Date('2025-01-19'),
    referenceNumber: 'QL001'
  },
  {
    id: '2',
    serviceType: 'Grocery Shopping',
    customerName: 'Jane Smith',
    customerPhone: '0723456789',
    customerEmail: 'jane@example.com',
    pickupLocation: 'Tuskys Supermarket',
    description: 'Weekly grocery shopping',
    preferredDateTime: '2025-01-20T14:00',
    budget: 5000,
    status: 'pending',
    createdAt: new Date('2025-01-19'),
    updatedAt: new Date('2025-01-19'),
    referenceNumber: 'QL002'
  }
];

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@quicklinkservices.com',
    phone: '0111679286',
    role: 'admin',
    status: 'active',
    joinDate: new Date('2024-01-01'),
    completedJobs: 0,
    rating: 5.0
  },
  {
    id: '2',
    name: 'Michael Driver',
    email: 'michael@quicklinkservices.com',
    phone: '0734567890',
    role: 'rider',
    status: 'active',
    joinDate: new Date('2024-06-01'),
    completedJobs: 245,
    rating: 4.8
  },
  {
    id: '3',
    name: 'Sarah Dispatcher',
    email: 'sarah@quicklinkservices.com',
    phone: '0745678901',
    role: 'dispatcher',
    status: 'active',
    joinDate: new Date('2024-03-15'),
    completedJobs: 0,
    rating: 4.9
  }
];

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [requests, setRequests] = useState<ServiceRequest[]>(mockRequests);
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);

  const addRequest = (requestData: Omit<ServiceRequest, 'id' | 'createdAt' | 'updatedAt' | 'referenceNumber'>) => {
    const id = Date.now().toString();
    const referenceNumber = `QL${String(requests.length + 1).padStart(3, '0')}`;
    const newRequest: ServiceRequest = {
      ...requestData,
      id,
      referenceNumber,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setRequests(prev => [...prev, newRequest]);
    return referenceNumber;
  };

  const updateRequestStatus = (id: string, status: ServiceRequest['status'], notes?: string) => {
    setRequests(prev => prev.map(req => 
      req.id === id 
        ? { ...req, status, updatedAt: new Date(), notes: notes || req.notes }
        : req
    ));
  };

  const assignRequest = (id: string, employeeId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === id 
        ? { ...req, assignedTo: employeeId, status: 'assigned', updatedAt: new Date() }
        : req
    ));
  };

  const addEmployee = (employeeData: Omit<Employee, 'id' | 'joinDate' | 'completedJobs' | 'rating'>) => {
    const id = Date.now().toString();
    const newEmployee: Employee = {
      ...employeeData,
      id,
      joinDate: new Date(),
      completedJobs: 0,
      rating: 5.0
    };
    setEmployees(prev => [...prev, newEmployee]);
  };

  const updateEmployee = (id: string, updates: Partial<Employee>) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === id ? { ...emp, ...updates } : emp
    ));
  };

  const deleteEmployee = (id: string) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  return (
    <DataContext.Provider value={{
      requests,
      employees,
      addRequest,
      updateRequestStatus,
      assignRequest,
      addEmployee,
      updateEmployee,
      deleteEmployee
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}