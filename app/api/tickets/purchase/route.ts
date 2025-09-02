import { NextRequest, NextResponse } from 'next/server'

interface TicketPurchase {
  matchId: number
  category: string
  price: number
  quantity: number
  purchaserName: string
  purchaserEmail: string
  purchaserPhone: string
}

interface Ticket {
  id: string
  matchId: number
  category: string
  price: number
  quantity: number
  purchaserName: string
  purchaserEmail: string
  purchaserPhone: string
  qrCode: string
  purchaseDate: string
  status: 'confirmed' | 'pending' | 'cancelled'
}

function generateQRCode(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 15)
  return `NCSM-${timestamp}-${random}`
}

function generateTicketId(): string {
  return `TKT-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
}

export async function POST(request: NextRequest) {
  try {
    const body: TicketPurchase = await request.json()
    
    // Validate required fields
    if (!body.matchId || !body.category || !body.price || !body.quantity || 
        !body.purchaserName || !body.purchaserEmail || !body.purchaserPhone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Generate ticket
    const ticket: Ticket = {
      id: generateTicketId(),
      matchId: body.matchId,
      category: body.category,
      price: body.price,
      quantity: body.quantity,
      purchaserName: body.purchaserName,
      purchaserEmail: body.purchaserEmail,
      purchaserPhone: body.purchaserPhone,
      qrCode: generateQRCode(),
      purchaseDate: new Date().toISOString(),
      status: 'confirmed'
    }

    // In a real application, you would:
    // 1. Process payment through a payment gateway (Stripe, PayPal, etc.)
    // 2. Store ticket in database
    // 3. Send confirmation email with QR code
    // 4. Generate PDF ticket for download

    // Simulate email sending
    console.log(`Sending ticket confirmation to ${body.purchaserEmail}`)
    console.log(`QR Code: ${ticket.qrCode}`)

    return NextResponse.json({
      success: true,
      ticket,
      message: 'Ticket purchased successfully'
    })

  } catch (error) {
    console.error('Ticket purchase error:', error)
    return NextResponse.json(
      { error: 'Failed to process ticket purchase' },
      { status: 500 }
    )
  }
}
