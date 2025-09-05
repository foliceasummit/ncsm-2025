# 🎯 NCSM 2025 Demo Credentials

This document contains all the demo user credentials for testing the National County Sports Meet 2025 system. Each user has been set up with proper role-based access control to ensure they can only access their appropriate dashboard.

## 🔐 Authentication System

- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with JWT sessions
- **Password Hashing**: bcrypt with salt rounds of 12
- **Role-Based Access**: Middleware protection for dashboard routes

## 👥 Demo Users by Role

### 🏟️ Match Officials
**Role**: `MATCH_OFFICIAL`  
**Dashboard**: `/dashboard/match-official`  
**Permissions**: Submit game reports, player inspection, view match schedule

| Email | Password |
|-------|----------|
| `official@ncsmlr.com` | `password123` |

### 📰 Journalists
**Role**: `JOURNALIST`  
**Dashboard**: `/dashboard/journalist`  
**Permissions**: Post stories, upload media, publish results

| Email | Password |
|-------|----------|
| `journalist@ncsmlr.com` | `password123` |

### 🏀 Basketball Federation
**Role**: `BASKETBALL_FEDERATION`  
**Dashboard**: `/dashboard/basketball`  
**Permissions**: View players, add comments, submit observations

| Email | Password |
|-------|----------|
| `basketball@ncsmlr.com` | `password123` |

### ⚽ LFA (Liberia Football Association)
**Role**: `LFA_OFFICIAL`  
**Dashboard**: `/dashboard/lfa`  
**Permissions**: View players, add comments, submit observations

| Email | Password |
|-------|----------|
| `lfa@ncsmlr.com` | `password123` |

### 🦵 Kickball Federation
**Role**: `KICKBALL_FEDERATION`  
**Dashboard**: `/dashboard/kickball`  
**Permissions**: View players, add comments, submit observations

| Email | Password |
|-------|----------|
| `kickball@ncsmlr.com` | `password123` |

### 🏐 Volleyball Federation
**Role**: `VOLLEYBALL_FEDERATION`  
**Dashboard**: `/dashboard/volleyball`  
**Permissions**: View players, add comments, submit observations

| Email | Password |
|-------|----------|
| `volleyball@ncsmlr.com` | `password123` |

### 🏛️ MYS Staff
**Role**: `MYS_STAFF`  
**Dashboard**: `/dashboard/mys-staff`  
**Permissions**: Review players, register players, edit content, publish results

| Email | Password |
|-------|----------|
| `mys@ncsmlr.com` | `password123` |

### 💰 Finance Officer
**Role**: `FINANCE_OFFICER`  
**Dashboard**: `/dashboard/finance-officer`  
**Permissions**: View ticket sales, export reports, view revenue

| Email | Password |
|-------|----------|
| `finance@ncsmlr.com` | `password123` |

### 👑 System Admin
**Role**: `GENERAL_ADMIN`  
**Dashboard**: `/dashboard/admin`  
**Permissions**: All permissions (full system access)

| Email | Password |
|-------|----------|
| `admin@ncsmlr.com` | `password123` |

### 🏘️ County Officials
**Role**: `COUNTY_OFFICIAL`  
**Dashboard**: `/dashboard/county-official`  
**Permissions**: View county info, manage county players, update county content

| County | Email | Password |
|--------|-------|----------|
| Montserrado | `montserrado@ncsmlr.com` | `Montserrado2025!` |
| Bong | `bong@ncsmlr.com` | `Bong2025!` |
| Nimba | `nimba@ncsmlr.com` | `Nimba2025!` |
| Lofa | `lofa@ncsmlr.com` | `Lofa2025!` |
| Grand Bassa | `grand_bassa@ncsmlr.com` | `GrandBassa2025!` |
| Margibi | `margibi@ncsmlr.com` | `Margibi2025!` |
| Bomi | `bomi@ncsmlr.com` | `Bomi2025!` |
| Grand Cape Mount | `grand_cape_mount@ncsmlr.com` | `GrandCapeMount2025!` |
| Gbarpolu | `gbarpolu@ncsmlr.com` | `Gbarpolu2025!` |
| River Cess | `river_cess@ncsmlr.com` | `RiverCess2025!` |
| Sinoe | `sinoe@ncsmlr.com` | `Sinoe2025!` |
| Grand Gedeh | `grand_gedeh@ncsmlr.com` | `GrandGedeh2025!` |
| River Gee | `river_gee@ncsmlr.com` | `RiverGee2025!` |
| Maryland | `maryland@ncsmlr.com` | `Maryland2025!` |

## 🛡️ Security Features

### Role-Based Access Control
- Each user can only access their designated dashboard
- Middleware protection prevents unauthorized access
- Automatic redirection to appropriate dashboard after login

### Password Security
- All passwords are hashed using bcrypt with 12 salt rounds
- County officials have unique passwords per county
- Other users use the standard `password123` for demo purposes

### Session Management
- JWT-based sessions with NextAuth.js
- Secure HTTP-only cookies
- Automatic session expiration

## 🧪 Testing Instructions

### 1. Login Testing
1. Go to `/login`
2. Enter any of the demo credentials above
3. Verify you're redirected to the correct dashboard
4. Test logout functionality

### 2. Access Control Testing
1. Login as one user type
2. Try to manually navigate to another user's dashboard URL
3. Verify you're redirected back to your own dashboard or login

### 3. Dashboard Functionality
1. Test each dashboard's specific features
2. Verify permissions are working correctly
3. Check that users can only see/modify data they're authorized for

## 🔧 Database Management

### Seeding Demo Users
To recreate all demo users, run:
```bash
npm run db:seed-demo
```

### Database Schema
The User model includes:
- `id`: Unique identifier
- `email`: Login email (unique)
- `password`: Hashed password
- `firstName`: User's first name
- `lastName`: User's last name
- `role`: User role (enum)
- `countyId`: Associated county (for county officials)
- `createdAt`: Account creation timestamp
- `updatedAt`: Last update timestamp

## 📝 Notes

- All demo users are created with realistic data
- County officials are linked to their respective counties
- Federation users can verify players in their specific sports
- Admin user has full system access for testing
- All passwords meet security requirements

## 🚀 Production Considerations

For production deployment:
1. Change all demo passwords
2. Implement proper password policies
3. Add two-factor authentication
4. Set up proper session management
5. Implement audit logging
6. Add rate limiting for login attempts

---

**Last Updated**: January 2025  
**System Version**: NCSM 2025 v1.0