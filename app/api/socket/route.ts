import { NextRequest, NextResponse } from 'next/server'
import { Server as SocketIOServer } from 'socket.io'

let io: SocketIOServer | null = null

export async function GET(request: NextRequest) {
  if (!io) {
    // Initialize Socket.IO server
    io = new SocketIOServer(3001, {
      cors: {
        origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        methods: ["GET", "POST"]
      }
    })

    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id)

      // Join match room for live updates
      socket.on('join-match', (matchId: string) => {
        socket.join(`match-${matchId}`)
        console.log(`Client ${socket.id} joined match ${matchId}`)
      })

      // Leave match room
      socket.on('leave-match', (matchId: string) => {
        socket.leave(`match-${matchId}`)
        console.log(`Client ${socket.id} left match ${matchId}`)
      })

      // Handle score updates
      socket.on('update-score', (data: { matchId: string, homeScore: number, awayScore: number }) => {
        io?.to(`match-${data.matchId}`).emit('score-updated', data)
        console.log(`Score updated for match ${data.matchId}: ${data.homeScore}-${data.awayScore}`)
      })

      // Handle match status updates
      socket.on('update-match-status', (data: { matchId: string, status: string }) => {
        io?.to(`match-${data.matchId}`).emit('match-status-updated', data)
        console.log(`Match status updated for match ${data.matchId}: ${data.status}`)
      })

      // Handle player approval notifications
      socket.on('player-approved', (data: { playerId: string, playerName: string }) => {
        io?.emit('player-approval-updated', data)
        console.log(`Player approved: ${data.playerName}`)
      })

      // Handle official approval notifications
      socket.on('official-approved', (data: { officialId: string, officialName: string }) => {
        io?.emit('official-approval-updated', data)
        console.log(`Official approved: ${data.officialName}`)
      })

      // Handle new blog post notifications
      socket.on('new-blog-post', (data: { postId: string, title: string }) => {
        io?.emit('blog-post-created', data)
        console.log(`New blog post: ${data.title}`)
      })

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id)
      })
    })

    console.log('Socket.IO server started on port 3001')
  }

  return NextResponse.json({ message: 'Socket.IO server is running' })
}

// Export the io instance for use in other parts of the application
export { io }
