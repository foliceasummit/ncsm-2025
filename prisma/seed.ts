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
    prisma.user.upsert({
      where: { email: 'lfa@ncsm.gov.lr' },
      update: {},
      create: {
        email: 'lfa@ncsm.gov.lr',
        password: hashedPassword,
        role: 'LFA_OFFICIAL',
        firstName: 'LFA',
        lastName: 'Official',
      },
    }),
    prisma.user.upsert({
      where: { email: 'mys@ncsm.gov.lr' },
      update: {},
      create: {
        email: 'mys@ncsm.gov.lr',
        password: hashedPassword,
        role: 'MYS_STAFF',
        firstName: 'MYS',
        lastName: 'Staff',
      },
    }),
    prisma.user.upsert({
      where: { email: 'journalist@ncsm.gov.lr' },
      update: {},
      create: {
        email: 'journalist@ncsm.gov.lr',
        password: hashedPassword,
        role: 'JOURNALIST',
        firstName: 'Sports',
        lastName: 'Journalist',
      },
    }),
    prisma.user.upsert({
      where: { email: 'county@montserrado.gov.lr' },
      update: {},
      create: {
        email: 'county@montserrado.gov.lr',
        password: hashedPassword,
        role: 'COUNTY_OFFICIAL',
        firstName: 'Montserrado',
        lastName: 'Official',
      },
    }),
  ])

  // Create players
  const players = await Promise.all([
    prisma.player.create({
      data: {
        firstName: 'John',
        lastName: 'Doe',
        middleName: 'Michael',
        dateOfBirth: new Date('1995-03-15'),
        nationality: 'Liberian',
        discipline: 'FOOTBALL',
        level: 'Professional',
        year: 2024,
        group: 'A',
        countyId: counties[0].id, // Montserrado
        userId: users[4].id, // County official
        status: 'APPROVED',
        photo: '/uploads/players/john-doe.jpg',
      },
    }),
    prisma.player.create({
      data: {
        firstName: 'Sarah',
        lastName: 'Johnson',
        dateOfBirth: new Date('1998-07-22'),
        nationality: 'Liberian',
        discipline: 'VOLLEYBALL',
        level: 'Amateur',
        year: 2024,
        group: 'B',
        countyId: counties[1].id, // Nimba
        userId: users[4].id,
        status: 'APPROVED',
        photo: '/uploads/players/sarah-johnson.jpg',
      },
    }),
    prisma.player.create({
      data: {
        firstName: 'Michael',
        lastName: 'Brown',
        middleName: 'David',
        dateOfBirth: new Date('1993-11-08'),
        nationality: 'Liberian',
        discipline: 'BASKETBALL',
        level: 'Professional',
        year: 2024,
        group: 'A',
        countyId: counties[2].id, // Bong
        userId: users[4].id,
        status: 'PENDING',
        photo: '/uploads/players/michael-brown.jpg',
      },
    }),
  ])

  // Create officials
  const officials = await Promise.all([
    prisma.official.create({
      data: {
        firstName: 'Robert',
        lastName: 'Wilson',
        middleName: 'James',
        dateOfBirth: new Date('1985-06-12'),
        nationality: 'Liberian',
        discipline: 'FOOTBALL',
        position: 'Referee',
        currentCounty: 'Montserrado',
        year: 2024,
        group: 'A',
        userId: users[4].id,
        status: 'APPROVED',
        photo: '/uploads/officials/robert-wilson.jpg',
      },
    }),
    prisma.official.create({
      data: {
        firstName: 'Mary',
        lastName: 'Thompson',
        dateOfBirth: new Date('1990-03-25'),
        nationality: 'Liberian',
        discipline: 'VOLLEYBALL',
        position: 'Line Judge',
        currentCounty: 'Nimba',
        year: 2024,
        group: 'B',
        userId: users[4].id,
        status: 'APPROVED',
        photo: '/uploads/officials/mary-thompson.jpg',
      },
    }),
    prisma.official.create({
      data: {
        firstName: 'David',
        lastName: 'Anderson',
        middleName: 'Michael',
        dateOfBirth: new Date('1988-09-18'),
        nationality: 'Liberian',
        discipline: 'BASKETBALL',
        position: 'Referee',
        currentCounty: 'Bong',
        year: 2024,
        group: 'A',
        userId: users[4].id,
        status: 'PENDING',
        photo: '/uploads/officials/david-anderson.jpg',
      },
    }),
  ])

  // Create matches
  const matches = await Promise.all([
    prisma.match.create({
      data: {
        homeTeamId: counties[0].id, // Montserrado
        awayTeamId: counties[1].id, // Nimba
        date: new Date('2024-01-20T14:00:00Z'),
        venue: 'Antoinette Tubman Stadium',
        discipline: 'FOOTBALL',
        group: 'A',
        status: 'SCHEDULED',
        matchOfficialId: officials[0].id,
      },
    }),
    prisma.match.create({
      data: {
        homeTeamId: counties[2].id, // Bong
        awayTeamId: counties[3].id, // Lofa
        date: new Date('2024-01-20T16:00:00Z'),
        venue: 'Antoinette Tubman Stadium',
        discipline: 'FOOTBALL',
        group: 'A',
        status: 'COMPLETED',
        homeScore: 2,
        awayScore: 1,
        matchOfficialId: officials[1].id,
      },
    }),
    prisma.match.create({
      data: {
        homeTeamId: counties[4].id, // Grand Bassa
        awayTeamId: counties[5].id, // Margibi
        date: new Date('2024-01-21T14:00:00Z'),
        venue: 'SKD Sports Complex',
        discipline: 'VOLLEYBALL',
        group: 'B',
        status: 'IN_PROGRESS',
        matchOfficialId: officials[2].id,
      },
    }),
  ])

  // Create blog posts
  const blogPosts = await Promise.all([
    prisma.blogPost.create({
      data: {
        title: 'Montserrado County Dominates Opening Day',
        content: `
          <h2>Montserrado County showed exceptional form on the opening day of the National County Sports Meet</h2>
          <p>Montserrado County secured victories in football, volleyball, and athletics, demonstrating their strong preparation and determination to win the championship this year.</p>
          <p>The football team defeated Nimba County 3-1 in a thrilling match that saw excellent teamwork and individual brilliance from striker John Doe, who scored two goals.</p>
          <p>In volleyball, the team maintained their dominance with a straight-sets victory, while the athletics team set new records in several events.</p>
          <p>Coach Robert Wilson praised his team's performance: "We've been preparing for this for months, and it's great to see our hard work paying off. But we know the competition is tough, and we need to maintain this level throughout the tournament."</p>
        `,
        image: '/uploads/blog/montserrado-dominates.jpg',
        authorId: users[3].id, // Journalist
        published: true,
      },
    }),
    prisma.blogPost.create({
      data: {
        title: 'New Records Set in Athletics Competition',
        content: `
          <h2>Several new records were established during the athletics competition</h2>
          <p>Athletes from Nimba County led the charge, breaking three national records in track and field events.</p>
          <p>Sarah Johnson set a new record in the 100m sprint with a time of 11.2 seconds, while Michael Brown broke the long jump record with a distance of 7.8 meters.</p>
          <p>The competition has been fierce, with athletes from all counties showing exceptional talent and determination.</p>
          <p>These record-breaking performances highlight the high level of competition at this year's National County Sports Meet.</p>
        `,
        image: '/uploads/blog/athletics-records.jpg',
        authorId: users[3].id,
        published: true,
      },
    }),
    prisma.blogPost.create({
      data: {
        title: 'Volleyball Finals: A Thrilling Showdown',
        content: `
          <h2>The volleyball finals between Bong and Grand Bassa counties provided spectators with an unforgettable display of skill and determination</h2>
          <p>In a match that went to five sets, both teams showed incredible resilience and teamwork.</p>
          <p>The final set was particularly intense, with the score tied at 14-14 before Bong County secured the victory with two consecutive points.</p>
          <p>This victory marks Bong County's first volleyball championship in five years, and the team's captain expressed his joy: "This is a dream come true for our team and our county."</p>
        `,
        image: '/uploads/blog/volleyball-finals.jpg',
        authorId: users[3].id,
        published: false, // Draft
      },
    }),
  ])

  console.log('✅ Database seeded successfully!')
  console.log(`Created ${counties.length} counties`)
  console.log(`Created ${users.length} users`)
  console.log(`Created ${players.length} players`)
  console.log(`Created ${officials.length} officials`)
  console.log(`Created ${matches.length} matches`)
  console.log(`Created ${blogPosts.length} blog posts`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
