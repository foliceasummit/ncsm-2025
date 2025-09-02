'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only run once when component mounts and auth state is determined
    if (!isLoading) {
      if (!isAuthenticated) {
        router.replace('/login');
        return;
      }

      if (user?.role) {
        // Direct routing to role-specific dashboard - no intermediate loading
        const roleRoutes: { [key: string]: string } = {
          'match_official': '/dashboard/match-official',
          'journalist': '/dashboard/journalist',
          'federation': '/dashboard/federation',
          'mys_staff': '/dashboard/mys-staff',
          'finance_officer': '/dashboard/finance-officer',
          'admin': '/dashboard/admin',
          'county_official': '/dashboard/county-official'
        };

        const targetRoute = roleRoutes[user.role];
        if (targetRoute) {
          router.replace(targetRoute);
        } else {
          router.replace('/login');
        }
      }
    }
  }, [isAuthenticated, isLoading, user?.role, router]);

  // Simple loading state - no animations
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Minimal redirect state - no animations
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
        <p className="text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
};

export default Dashboard;
