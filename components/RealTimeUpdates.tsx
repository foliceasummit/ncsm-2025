// RealTimeUpdates component temporarily disabled for initial deployment
// Will be re-enabled when Socket.IO functionality is implemented

'use client'

import { 
  BellIcon
} from '@heroicons/react/24/outline'

export default function RealTimeUpdates() {
  // Component temporarily disabled
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-full p-3 shadow-lg">
        <BellIcon className="w-6 h-6 text-gray-400" />
      </div>
    </div>
  )
}

// Full functionality will be restored when Socket.IO is implemented
