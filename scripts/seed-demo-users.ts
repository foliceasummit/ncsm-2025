import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// Demo users data
const demoUsers = [
  // Match Official
  {
    email: 'official@ncsmlr.com',
    password: 'password123',
    role: 'MATCH_OFFICIAL',
    firstName: 'Match',
    lastName: 'Official',
    countyId: null
  },
  
  // Journalist
  {
    email: 'journalist@ncsmlr.com',
    password: 'password123',
    role: 'JOURNALIST',
    firstName: 'Sports',
    lastName: 'Journalist',
    countyId: null
  },
  
  // Basketball Federation
  {
    email: 'basketball@ncsmlr.com',
    password: 'password123',
    role: 'BASKETBALL_FEDERATION',
    firstName: 'Basketball',
    lastName: 'Federation',
    countyId: null
  },
  
  // LFA (Football)
  {
    email: 'lfa@ncsmlr.com',
    password: 'password123',
    role: 'LFA_OFFICIAL',
    firstName: 'LFA',
    lastName: 'Official',
    countyId: null
  },
  
  // Kickball Federation
  {
    email: 'kickball@ncsmlr.com',
    password: 'password123',
    role: 'KICKBALL_FEDERATION',
    firstName: 'Kickball',
    lastName: 'Federation',
    countyId: null
  },
  
  // Volleyball Federation
  {
    email: 'volleyball@ncsmlr.com',
    password: 'password123',
    role: 'VOLLEYBALL_FEDERATION',
    firstName: 'Volleyball',
    lastName: 'Federation',
    countyId: null
  },
  
  // MYS Staff
  {
    email: 'mys@ncsmlr.com',
    password: 'password123',
    role: 'MYS_STAFF',
    firstName: 'MYS',
    lastName: 'Staff',
    countyId: null
  },
  
  // Finance Officer
  {
    email: 'finance@ncsmlr.com',
    password: 'password123',
    role: 'FINANCE_OFFICER',
    firstName: 'Finance',
    lastName: 'Officer',
    countyId: null
  },
  
  // Admin
  {
    email: 'admin@ncsmlr.com',
    password: 'password123',
    role: 'GENERAL_ADMIN',
    firstName: 'System',
    lastName: 'Admin',
    countyId: null
  },
  
  // County Officials
  {
    email: 'montserrado@ncsmlr.com',
    password: 'Montserrado2025!',
    role: 'COUNTY_OFFICIAL',
    firstName: 'Montserrado',
    lastName: 'Official',
    countyId: 'montserrado'
  },
  {
    email: 'bong@ncsmlr.com',
    password: 'Bong2025!',
    role: 'COUNTY_OFFICIAL',
    firstName: 'Bong',
    lastName: 'Official',
    countyId: 'bong'
  },
  {
    email: 'nimba@ncsmlr.com',
    password: 'Nimba2025!',
    role: 'COUNTY_OFFICIAL',
    firstName: 'Nimba',
    lastName: 'Official',
    countyId: 'nimba'
  },
  {
    email: 'lofa@ncsmlr.com',
    password: 'Lofa2025!',
    role: 'COUNTY_OFFICIAL',
    firstName: 'Lofa',
    lastName: 'Official',
    countyId: 'lofa'
  },
  {
    email: 'grand_bassa@ncsmlr.com',
    password: 'GrandBassa2025!',
    role: 'COUNTY_OFFICIAL',
    firstName: 'Grand Bassa',
    lastName: 'Official',
    countyId: 'grand_bassa'
  },
  {
    email: 'margibi@ncsmlr.com',
    password: 'Margibi2025!',
    role: 'COUNTY_OFFICIAL',
    firstName: 'Margibi',
    lastName: 'Official',
    countyId: 'margibi'
  },
  {
    email: 'bomi@ncsmlr.com',
    password: 'Bomi2025!',
    role: 'COUNTY_OFFICIAL',
    firstName: 'Bomi',
    lastName: 'Official',
    countyId: 'bomi'
  },
  {
    email: 'grand_cape_mount@ncsmlr.com',
    password: 'GrandCapeMount2025!',
    role: 'COUNTY_OFFICIAL',
    firstName: 'Grand Cape Mount',
    lastName: 'Official',
    countyId: 'grand_cape_mount'
  },
  {
    email: 'gbarpolu@ncsmlr.com',
    password: 'Gbarpolu2025!',
    role: 'COUNTY_OFFICIAL',
    firstName: 'Gbarpolu',
    lastName: 'Official',
    countyId: 'gbarpolu'
  },
  {
    email: 'river_cess@ncsmlr.com',
    password: 'RiverCess2025!',
    role: 'COUNTY_OFFICIAL',
    firstName: 'River Cess',
    lastName: 'Official',
    countyId: 'river_cess'
  },
  {
    email: 'sinoe@ncsmlr.com',
    password: 'Sinoe2025!',
    role: 'COUNTY_OFFICIAL',
    firstName: 'Sinoe',
    lastName: 'Official',
    countyId: 'sinoe'
  },
  {
    email: 'grand_gedeh@ncsmlr.com',
    password: 'GrandGedeh2025!',
    role: 'COUNTY_OFFICIAL',
    firstName: 'Grand Gedeh',
    lastName: 'Official',
    countyId: 'grand_gedeh'
  },
  {
    email: 'river_gee@ncsmlr.com',
    password: 'RiverGee2025!',
    role: 'COUNTY_OFFICIAL',
    firstName: 'River Gee',
    lastName: 'Official',
    countyId: 'river_gee'
  },
  {
    email: 'maryland@ncsmlr.com',
    password: 'Maryland2025!',
    role: 'COUNTY_OFFICIAL',
    firstName: 'Maryland',
    lastName: 'Official',
    countyId: 'maryland'
  }
]

async function seedDemoUsers() {
  console.log('🌱 Starting to seed demo users...')
  
  try {
    // First, let's ensure we have the counties in the database
    const counties = [
      { id: 'montserrado', name: 'Montserrado', group: 'A' },
      { id: 'bong', name: 'Bong', group: 'A' },
      { id: 'nimba', name: 'Nimba', group: 'A' },
      { id: 'lofa', name: 'Lofa', group: 'B' },
      { id: 'grand_bassa', name: 'Grand Bassa', group: 'B' },
      { id: 'margibi', name: 'Margibi', group: 'B' },
      { id: 'bomi', name: 'Bomi', group: 'C' },
      { id: 'grand_cape_mount', name: 'Grand Cape Mount', group: 'C' },
      { id: 'gbarpolu', name: 'Gbarpolu', group: 'C' },
      { id: 'river_cess', name: 'River Cess', group: 'D' },
      { id: 'sinoe', name: 'Sinoe', group: 'D' },
      { id: 'grand_gedeh', name: 'Grand Gedeh', group: 'D' },
      { id: 'river_gee', name: 'River Gee', group: 'D' },
      { id: 'maryland', name: 'Maryland', group: 'D' }
    ]

    // Create counties if they don't exist
    for (const county of counties) {
      await prisma.county.upsert({
        where: { id: county.id },
        update: county,
        create: county
      })
    }
    console.log('✅ Counties created/updated')

    // Create demo users
    for (const userData of demoUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 12)
      
      await prisma.user.upsert({
        where: { email: userData.email },
        update: {
          password: hashedPassword,
          role: userData.role as any,
          firstName: userData.firstName,
          lastName: userData.lastName,
          countyId: userData.countyId
        },
        create: {
          email: userData.email,
          password: hashedPassword,
          role: userData.role as any,
          firstName: userData.firstName,
          lastName: userData.lastName,
          countyId: userData.countyId
        }
      })
      
      console.log(`✅ Created/updated user: ${userData.email} (${userData.role})`)
    }

    console.log('🎉 Demo users seeded successfully!')
    console.log('\n📋 Demo Credentials Summary:')
    console.log('================================')
    
    // Group users by role for better display
    const groupedUsers = demoUsers.reduce((acc, user) => {
      if (!acc[user.role]) acc[user.role] = []
      acc[user.role].push(user)
      return acc
    }, {} as Record<string, typeof demoUsers>)

    Object.entries(groupedUsers).forEach(([role, users]) => {
      console.log(`\n${role}:`)
      users.forEach(user => {
        console.log(`  • ${user.email} / ${user.password}`)
      })
    })

  } catch (error) {
    console.error('❌ Error seeding demo users:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seed function
seedDemoUsers()
  .catch((error) => {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  })
