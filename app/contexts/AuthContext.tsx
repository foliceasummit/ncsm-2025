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
    // Optimized authentication logic
    const user = mockUsers.find(u => u.email === email);
    
    if (!user) {
      return false;
    }

    let isAuthenticated = false;

    // Simplified password checking
    if (user.role === 'county_official') {
      const countyPasswords: { [key: string]: string } = {
        'montserrado@ncsm.lr': 'Montserrado2025!',
        'bong@ncsm.lr': 'Bong2025!',
        'nimba@ncsm.lr': 'Nimba2025!',
        'lofa@ncsm.lr': 'Lofa2025!',
        'grand_bassa@ncsm.lr': 'GrandBassa2025!',
        'margibi@ncsm.lr': 'Margibi2025!',
        'bomi@ncsm.lr': 'Bomi2025!',
        'grand_cape_mount@ncsm.lr': 'GrandCapeMount2025!',
        'gbarpolu@ncsm.lr': 'Gbarpolu2025!',
        'river_cess@ncsm.lr': 'RiverCess2025!',
        'sinoe@ncsm.lr': 'Sinoe2025!',
        'grand_gedeh@ncsm.lr': 'GrandGedeh2025!',
        'river_gee@ncsm.lr': 'RiverGee2025!',
        'maryland@ncsm.lr': 'Maryland2025!'
      };
      isAuthenticated = countyPasswords[email] === password;
    } else {
      isAuthenticated = password === 'password123';
    }

    if (isAuthenticated && mounted) {
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false
      });
      localStorage.setItem('ncsm_user', JSON.stringify(user));
      return true;
    }

    return false;
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
