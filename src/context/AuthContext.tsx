import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

interface AuthContextType {
  isAuthenticated: boolean;
  remainingTime: number;
  emailVerified: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateRemainingTime: (time: number) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token: string) => {
    try {
      const response = await api.get('/api/auth/me');
      setRemainingTime(response.data.remaining_time);
      setEmailVerified(response.data.email_verified || false);
      setIsAuthenticated(true);
    } catch (err) {
      localStorage.removeItem('authToken');
      setIsAuthenticated(false);
    }
  };

  const login = async (email: string, password: string) => {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    const response = await api.post('/api/auth/login', formData.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    localStorage.setItem('authToken', response.data.access_token);
    setRemainingTime(response.data.user.remaining_time);
    setEmailVerified(response.data.user.email_verified || false);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setRemainingTime(0);
    setEmailVerified(false);
  };

  const updateRemainingTime = (time: number) => {
    setRemainingTime(time);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      remainingTime,
      emailVerified,
      login,
      logout,
      updateRemainingTime
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};