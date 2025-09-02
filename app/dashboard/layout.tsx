import React from 'react'
import DashboardHydrationFix from '../components/DashboardHydrationFix'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardHydrationFix>
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    </DashboardHydrationFix>
  )
}
