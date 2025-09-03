// Socket.IO route temporarily disabled for initial deployment
// Will be re-enabled when real-time functionality is needed

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'Socket.IO functionality temporarily disabled' })
}

// Socket.IO server will be implemented later when needed
// export { io }
