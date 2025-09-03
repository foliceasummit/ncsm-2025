# Demo Users Setup Guide

## Problem
The demo credentials are not working because the users don't exist in your database yet.

## Solution
You need to seed your database with the demo users. Here are the steps:

## Step 1: Set Environment Variables
Make sure you have your `DATABASE_URL` set in your Vercel environment variables.

## Step 2: Run Database Migration
Once your database is connected, run:
```bash
npx prisma db push
```

## Step 3: Seed the Database
Run the seed script to create all demo users:
```bash
npm run db:seed
```

## Demo Credentials That Will Be Created

### Federation & Staff Users
- **Match Official**: `official@ncsm.lr` / `password123`
- **Journalist**: `journalist@ncsm.lr` / `password123`
- **Basketball Federation**: `basketball@federation.lr` / `password123`
- **LFA (Football)**: `lfa@federation.lr` / `password123`
- **Kickball Federation**: `kickball@federation.lr` / `password123`
- **Volleyball Federation**: `volleyball@federation.lr` / `password123`
- **MYS Staff**: `mys@ncsm.lr` / `password123`
- **Finance Officer**: `finance@ncsm.lr` / `password123`
- **Admin**: `admin@ncsm.lr` / `password123`

### County Officials
- **Montserrado**: `montserrado@ncsm.lr` / `Montserrado2025!`
- **Bong**: `bong@ncsm.lr` / `Bong2025!`
- **Nimba**: `nimba@ncsm.lr` / `Nimba2025!`
- **Lofa**: `lofa@ncsm.lr` / `Lofa2025!`
- **Grand Bassa**: `grand_bassa@ncsm.lr` / `GrandBassa2025!`
- **Margibi**: `margibi@ncsm.lr` / `Margibi2025!`
- **Bomi**: `bomi@ncsm.lr` / `Bomi2025!`
- **Grand Cape Mount**: `grand_cape_mount@ncsm.lr` / `GrandCapeMount2025!`
- **Gbarpolu**: `gbarpolu@ncsm.lr` / `Gbarpolu2025!`
- **River Cess**: `river_cess@ncsm.lr` / `RiverCess2025!`
- **Sinoe**: `sinoe@ncsm.lr` / `Sinoe2025!`
- **Grand Gedeh**: `grand_gedeh@ncsm.lr` / `GrandGedeh2025!`
- **River Gee**: `river_gee@ncsm.lr` / `RiverGee2025!`
- **Maryland**: `maryland@ncsm.lr` / `Maryland2025!`

## What the Seed Script Does
1. Creates all 15 counties with proper groups
2. Creates federation and staff users with `password123`
3. Creates county officials with their specific passwords
4. Sets proper user roles and county associations

## After Seeding
Once you run the seed script, all demo credentials will work properly and users will be able to log in to their respective dashboards.

## Troubleshooting
If you get errors during seeding:
1. Check that your `DATABASE_URL` is correct
2. Ensure your database is accessible
3. Verify that Prisma client is generated (`npx prisma generate`)
4. Check the console output for specific error messages

## For Local Development
If you want to test locally:
1. Set up a local PostgreSQL database
2. Create a `.env.local` file with your `DATABASE_URL`
3. Run the seed script locally
4. Test the login functionality
