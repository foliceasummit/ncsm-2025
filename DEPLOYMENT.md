# Deployment Guide for NCSM Application

## Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Vercel account

## Environment Variables

Make sure to set these environment variables in your Vercel project:

```bash
# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# Next.js
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="your-secret-key"

# Email (optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

## Build Configuration

The application has been configured to handle Prisma properly during build:

1. **Prisma Client Singleton**: Uses a singleton pattern to prevent multiple client instances
2. **Build Scripts**: Updated package.json to generate Prisma client before building
3. **Vercel Config**: Proper build commands and function timeouts

## Deployment Steps

1. **Push to GitHub**: Ensure all changes are committed and pushed
2. **Connect to Vercel**: Import your GitHub repository
3. **Set Environment Variables**: Add all required environment variables
4. **Deploy**: Vercel will automatically run the build process

## Build Process

The build process now:
1. Installs dependencies
2. Generates Prisma client
3. Builds Next.js application
4. Deploys to Vercel

## Troubleshooting

### Prisma Build Errors
If you encounter Prisma build errors:
1. Ensure `DATABASE_URL` is set in Vercel
2. Check that Prisma client is generated before build
3. Verify all API routes use the Prisma singleton

### Database Connection Issues
- Ensure your PostgreSQL database is accessible from Vercel
- Check firewall and network settings
- Verify database credentials

## Local Development

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Run development server
npm run dev

# Build for production
npm run build
```

## API Routes

All API routes now use the Prisma singleton from `@/lib/prisma` to prevent build-time connection issues.
