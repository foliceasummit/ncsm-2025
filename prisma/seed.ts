import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database with demo users...')

  // Create counties first
  const counties = await Promise.all([
    prisma.county.upsert({
      where: { name: 'Montserrado' },
      update: {},
      create: { name: 'Montserrado', group: 'A' },
    }),
    prisma.county.upsert({
      where: { name: 'Nimba' },
      update: {},
      create: { name: 'Nimba', group: 'B' },
    }),
    prisma.county.upsert({
      where: { name: 'Bong' },
      update: {},
      create: { name: 'Bong', group: 'A' },
    }),
    prisma.county.upsert({
      where: { name: 'Lofa' },
      update: {},
      create: { name: 'Lofa', group: 'B' },
    }),
    prisma.county.upsert({
      where: { name: 'Grand Bassa' },
      update: {},
      create: { name: 'Grand Bassa', group: 'C' },
    }),
    prisma.county.upsert({
      where: { name: 'Margibi' },
      update: {},
      create: { name: 'Margibi', group: 'C' },
    }),
    prisma.county.upsert({
      where: { name: 'Bomi' },
      update: {},
      create: { name: 'Bomi', group: 'D' },
    }),
    prisma.county.upsert({
      where: { name: 'Grand Cape Mount' },
      update: {},
      create: { name: 'Grand Cape Mount', group: 'D' },
    }),
    prisma.county.upsert({
      where: { name: 'River Cess' },
      update: {},
      create: { name: 'River Cess', group: 'B' },
    }),
    prisma.county.upsert({
      where: { name: 'Sinoe' },
      update: {},
      create: { name: 'Sinoe', group: 'C' },
    }),
    prisma.county.upsert({
      where: { name: 'Grand Gedeh' },
      update: {},
      create: { name: 'Grand Gedeh', group: 'D' },
    }),
    prisma.county.upsert({
      where: { name: 'River Gee' },
      update: {},
      create: { name: 'River Gee', group: 'A' },
    }),
    prisma.county.upsert({
      where: { name: 'Maryland' },
      update: {},
      create: { name: 'Maryland', group: 'B' },
    }),
    prisma.county.upsert({
      where: { name: 'Gbarpolu' },
      update: {},
      create: { name: 'Gbarpolu', group: 'A' },
    }),
  ])

  console.log('✅ Counties created successfully!')

  // Create demo users with different roles
  const demoUsers = [
    // Match Official
    {
      email: 'official@ncsm.lr',
      password: 'password123',
      role: 'MATCH_OFFICIAL' as const,
      firstName: 'Match',
      lastName: 'Official',
      countyId: null,
    },
    // Journalist
    {
      email: 'journalist@ncsm.lr',
      password: 'password123',
      role: 'JOURNALIST' as const,
      firstName: 'Sports',
      lastName: 'Journalist',
      countyId: null,
    },
    // Basketball Federation
    {
      email: 'basketball@federation.lr',
      password: 'password123',
      role: 'FEDERATION' as const,
      firstName: 'Basketball',
      lastName: 'Federation',
      countyId: null,
    },
    // LFA (Football)
    {
      email: 'lfa@federation.lr',
      password: 'password123',
      role: 'FEDERATION' as const,
      firstName: 'Liberia',
      lastName: 'Football Association',
      countyId: null,
    },
    // Kickball Federation
    {
      email: 'kickball@federation.lr',
      password: 'password123',
      role: 'FEDERATION' as const,
      firstName: 'Kickball',
      lastName: 'Federation',
      countyId: null,
    },
    // Volleyball Federation
    {
      email: 'volleyball@federation.lr',
      password: 'password123',
      role: 'FEDERATION' as const,
      firstName: 'Volleyball',
      lastName: 'Federation',
      countyId: null,
    },
    // MYS Staff
    {
      email: 'mys@ncsm.lr',
      password: 'password123',
      role: 'MYS_STAFF' as const,
      firstName: 'MYS',
      lastName: 'Staff',
      countyId: null,
    },
    // Finance Officer
    {
      email: 'finance@ncsm.lr',
      password: 'password123',
      role: 'FINANCE_OFFICER' as const,
      firstName: 'Finance',
      lastName: 'Officer',
      countyId: null,
    },
    // Admin
    {
      email: 'admin@ncsm.lr',
      password: 'password123',
      role: 'GENERAL_ADMIN' as const,
      firstName: 'System',
      lastName: 'Administrator',
      countyId: null,
    },
  ]

  // Create county officials
  const countyUsers = [
    { email: 'montserrado@ncsm.lr', password: 'Montserrado2025!', county: 'Montserrado' },
    { email: 'bong@ncsm.lr', password: 'Bong2025!', county: 'Bong' },
    { email: 'nimba@ncsm.lr', password: 'Nimba2025!', county: 'Nimba' },
    { email: 'lofa@ncsm.lr', password: 'Lofa2025!', county: 'Lofa' },
    { email: 'grand_bassa@ncsm.lr', password: 'GrandBassa2025!', county: 'Grand Bassa' },
    { email: 'margibi@ncsm.lr', password: 'Margibi2025!', county: 'Margibi' },
    { email: 'bomi@ncsm.lr', password: 'Bomi2025!', county: 'Bomi' },
    { email: 'grand_cape_mount@ncsm.lr', password: 'GrandCapeMount2025!', county: 'Grand Cape Mount' },
    { email: 'gbarpolu@ncsm.lr', password: 'Gbarpolu2025!', county: 'Gbarpolu' },
    { email: 'river_cess@ncsm.lr', password: 'RiverCess2025!', county: 'River Cess' },
    { email: 'sinoe@ncsm.lr', password: 'Sinoe2025!', county: 'Sinoe' },
    { email: 'grand_gedeh@ncsm.lr', password: 'GrandGedeh2025!', county: 'Grand Gedeh' },
    { email: 'river_gee@ncsm.lr', password: 'RiverGee2025!', county: 'River Gee' },
    { email: 'maryland@ncsm.lr', password: 'Maryland2025!', county: 'Maryland' },
  ]

  // Create demo users
  for (const userData of demoUsers) {
    const hashedPassword = await bcrypt.hash(userData.password, 12)
    await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        email: userData.email,
        password: hashedPassword,
        role: userData.role,
        firstName: userData.firstName,
        lastName: userData.lastName,
        countyId: userData.countyId,
      },
    })
    console.log(`✅ Created user: ${userData.email}`)
  }

  // Create county officials
  for (const countyUser of countyUsers) {
    const hashedPassword = await bcrypt.hash(countyUser.password, 12)
    const county = counties.find(c => c.name === countyUser.county)
    
    if (county) {
      await prisma.user.upsert({
        where: { email: countyUser.email },
        update: {},
        create: {
          email: countyUser.email,
          password: hashedPassword,
          role: 'COUNTY_OFFICIAL',
          firstName: countyUser.county,
          lastName: 'Official',
          countyId: county.id,
        },
      })
      console.log(`✅ Created county official: ${countyUser.email}`)
    }
  }

  console.log('✅ All demo users created successfully!')
  console.log('📋 Demo Credentials Summary:')
  console.log('Match Official: official@ncsm.lr / password123')
  console.log('Journalist: journalist@ncsm.lr / password123')
  console.log('Basketball Federation: basketball@federation.lr / password123')
  console.log('LFA (Football): lfa@federation.lr / password123')
  console.log('Kickball Federation: kickball@federation.lr / password123')
  console.log('Volleyball Federation: volleyball@federation.lr / password123')
  console.log('MYS Staff: mys@ncsm.lr / password123')
  console.log('Finance Officer: finance@ncsm.lr / password123')
  console.log('Admin: admin@ncsm.lr / password123')
  console.log('County Officials: Use county-specific emails with their passwords')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
