'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState, mockUsers } from '../lib/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });
  const [mounted, setMounted] = useState(false);

  // Debug: Log mock users on component mount
  useEffect(() => {
    console.log('AuthProvider mounted, mock users:', mockUsers.length);
    console.log('Sample mock user:', mockUsers[0]);
  }, []);

  useEffect(() => {
    setMounted(true);
    // Check for stored user session only after mounting
    const storedUser = localStorage.getItem('ncsm_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false
        });
      } catch (error) {
        localStorage.removeItem('ncsm_user');
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false
        });
      }
    } else {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple test - allow any login for now
    console.log('Login attempt:', { email, password });
    
    // Create a test user for any email
    const testUser = {
      id: 'test-user',
      email: email,
      name: 'Test User',
      role: 'COUNTY_OFFICIAL' as const,
      permissions: ['view_county_info', 'manage_county_players', 'update_county_content'],
      countyId: 'test-county',
      createdAt: new Date()
    };

    // Accept any password for testing
    setAuthState({
      user: testUser,
      isAuthenticated: true,
      isLoading: false
    });
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('ncsm_user', JSON.stringify(testUser));
    }
    
    console.log('Login successful with test user');
    return true;
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
    if (mounted) {
      localStorage.removeItem('ncsm_user');
    }
  };

  const hasPermission = (permission: string): boolean => {
    if (!authState.user) return false;
    if (authState.user.permissions.includes('*')) return true;
    return authState.user.permissions.includes(permission);
  };

  const value: AuthContextType = {
    ...authState,
    login,
    logout,
    hasPermission
  };

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <AuthContext.Provider value={{
        user: null,
        isAuthenticated: false,
        isLoading: true,
        login: async () => false,
        logout: () => {},
        hasPermission: () => false
      }}>
        {children}
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
