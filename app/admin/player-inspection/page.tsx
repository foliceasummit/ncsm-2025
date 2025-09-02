'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const PlayerInspectionPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Player Inspection</h1>
          <p className="text-gray-600 mb-6">Pre-match player verification system</p>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900">John Doe - #10 - Forward</h3>
              <p className="text-sm text-gray-600">County: Bong</p>
              <div className="mt-2 flex space-x-2">
                <button className="bg-green-600 text-white px-3 py-1 rounded text-sm">Approve</button>
                <button className="bg-red-600 text-white px-3 py-1 rounded text-sm">Reject</button>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900">Jane Smith - #5 - Defender</h3>
              <p className="text-sm text-gray-600">County: Bong</p>
              <div className="mt-2 flex space-x-2">
                <button className="bg-green-600 text-white px-3 py-1 rounded text-sm">Approve</button>
                <button className="bg-red-600 text-white px-3 py-1 rounded text-sm">Reject</button>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <button 
              onClick={() => router.push('/dashboard/match-official')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerInspectionPage;
