// Prisma seed file temporarily disabled for initial deployment
// Will be re-enabled when Prisma is set up

/*
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create counties
  const counties = await Promise.all([
    prisma.county.upsert({
      where: { name: 'Montserrado' },
      update: {},
      create: { name: 'Montserrado' },
    }),
    prisma.county.upsert({
      where: { name: 'Nimba' },
      update: {},
      create: { name: 'Nimba' },
    }),
    prisma.county.upsert({
      where: { name: 'Bong' },
      update: {},
      create: { name: 'Bong' },
    }),
    prisma.county.upsert({
      where: { name: 'Lofa' },
      update: {},
      create: { name: 'Lofa' },
    }),
    prisma.county.upsert({
      where: { name: 'Grand Bassa' },
      update: {},
      create: { name: 'Grand Bassa' },
    }),
    prisma.county.upsert({
      where: { name: 'Margibi' },
      update: {},
      create: { name: 'Margibi' },
    }),
    prisma.county.upsert({
      where: { name: 'Bomi' },
      update: {},
      create: { name: 'Bomi' },
    }),
    prisma.county.upsert({
      where: { name: 'Grand Cape Mount' },
      update: {},
      create: { name: 'Grand Cape Mount' },
    }),
    prisma.county.upsert({
      where: { name: 'River Cess' },
      update: {},
      create: { name: 'River Cess' },
    }),
    prisma.county.upsert({
      where: { name: 'Sinoe' },
      update: {},
      create: { name: 'Sinoe' },
    }),
    prisma.county.upsert({
      where: { name: 'Grand Gedeh' },
      update: {},
      create: { name: 'Grand Gedeh' },
    }),
    prisma.county.upsert({
      where: { name: 'River Gee' },
      update: {},
      create: { name: 'River Gee' },
    }),
    prisma.county.upsert({
      where: { name: 'Maryland' },
      update: {},
      create: { name: 'Maryland' },
    }),
    prisma.county.upsert({
      where: { name: 'Grand Kru' },
      update: {},
      create: { name: 'Grand Kru' },
    }),
    prisma.county.upsert({
      where: { name: 'Gbarpolu' },
      update: {},
      create: { name: 'Gbarpolu' },
    }),
  ])

  // Create users with different roles
  const hashedPassword = await bcrypt.hash('password123', 12)

  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'admin@ncsm.gov.lr' },
      update: {},
      create: {
        email: 'admin@ncsm.gov.lr',
        password: hashedPassword,
        role: 'GENERAL_ADMIN',
        firstName: 'Admin',
        lastName: 'User',
      },
    }),
  ])

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
*/
