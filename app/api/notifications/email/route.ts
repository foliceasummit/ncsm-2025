import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Email configuration
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { to, subject, content, type } = body

    if (!to || !subject || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email template based on type
    let emailContent = ''
    switch (type) {
      case 'player_approved':
        emailContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1f2937;">Player Registration Approved</h2>
            <p>Dear ${to},</p>
            <p>Your player registration has been approved! You can now participate in the National County Sports Meet.</p>
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              ${content}
            </div>
            <p>If you have any questions, please contact the tournament organizers.</p>
            <p>Best regards,<br>NCSM Team</p>
          </div>
        `
        break
      case 'player_rejected':
        emailContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1f2937;">Player Registration Update</h2>
            <p>Dear ${to},</p>
            <p>Your player registration requires attention. Please review the details below:</p>
            <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ef4444;">
              ${content}
            </div>
            <p>Please contact the tournament organizers for more information.</p>
            <p>Best regards,<br>NCSM Team</p>
          </div>
        `
        break
      case 'official_approved':
        emailContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1f2937;">Official Registration Approved</h2>
            <p>Dear ${to},</p>
            <p>Your official registration has been approved! You can now officiate matches in the National County Sports Meet.</p>
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              ${content}
            </div>
            <p>You will receive your match assignments shortly.</p>
            <p>Best regards,<br>NCSM Team</p>
          </div>
        `
        break
      case 'official_rejected':
        emailContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1f2937;">Official Registration Update</h2>
            <p>Dear ${to},</p>
            <p>Your official registration requires attention. Please review the details below:</p>
            <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ef4444;">
              ${content}
            </div>
            <p>Please contact the tournament organizers for more information.</p>
            <p>Best regards,<br>NCSM Team</p>
          </div>
        `
        break
      default:
        emailContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1f2937;">NCSM Notification</h2>
            <p>Dear ${to},</p>
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              ${content}
            </div>
            <p>Best regards,<br>NCSM Team</p>
          </div>
        `
    }

    // Send email
    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@ncsm.gov.lr',
      to: to,
      subject: subject,
      html: emailContent,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully'
    })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
