import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthService, Patient, Doctor } from '@/lib/auth';

interface AuthContextType {
  user: Patient | Doctor | null;
  login: (user: Patient | Doctor) => void;
  logout: () => void;
  updateUser: (updates: Partial<Patient | Doctor>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Patient | Doctor | null>(null);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const login = (userData: Patient | Doctor) => {
    AuthService.setCurrentUser(userData);
    setUser(userData);
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  const updateUser = (updates: Partial<Patient | Doctor>) => {
    if (user) {
      const updatedUser = { ...user, ...updates } as Patient | Doctor;
      AuthService.setCurrentUser(updatedUser);
      setUser(updatedUser);
      
      // Also update in users storage
      if (user.type === 'patient') {
        AuthService.updatePatient(user.id, updates as Partial<Patient>);
      }
    }
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};