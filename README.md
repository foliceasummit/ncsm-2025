# National County Sports Meet (NCSM)

Official website for the National County Sports Meet - Liberia's premier sporting event that brings together athletes from all 15 counties in a celebration of unity, talent, and national pride.

## 🏆 About

The National County Sports Meet is Liberia's premier sporting event that showcases the best of Liberian sports across multiple disciplines including football, kickball, female soccer, volleyball, basketball, and athletics.

## 🚀 Features

- **User Authentication** - Role-based access control with different user types
- **Player Registration** - Complete player registration system with photo uploads
- **Official Registration** - Match official registration and management
- **Match Management** - Fixtures, live scores, and real-time updates
- **Blog System** - Rich text editor for content creation and management
- **Admin Dashboard** - Comprehensive administrative interface
- **Real-time Updates** - WebSocket integration for live notifications
- **Email Notifications** - Automated approval/rejection emails
- **File Upload System** - Photo uploads for players, officials, and blog posts

## 👥 User Roles

- **General Admin** - Full system access and management
- **LFA Official** - Match and official management
- **MYS Staff** - Administrative oversight
- **Journalist** - Blog creation and content management
- **County Official** - Player and official registration

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Custom session-based auth with HTTP-only cookies
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion
- **Real-time**: Socket.IO
- **Email**: Nodemailer
- **File Upload**: Custom upload API with validation
- **Rich Text**: React Quill

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ncsmlr
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Update the `.env.local` file with your database and email credentials.

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   npm run db:seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Default Login Credentials

- **Admin**: `admin@ncsm.gov.lr` / `password123`
- **LFA Official**: `lfa@ncsm.gov.lr` / `password123`
- **MYS Staff**: `mys@ncsm.gov.lr` / `password123`
- **Journalist**: `journalist@ncsm.gov.lr` / `password123`
- **County Official**: `county@montserrado.gov.lr` / `password123`

## 📁 Project Structure

```
ncsmlr/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── admin/             # Admin pages
│   ├── register/          # Registration pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── layout/           # Layout components
│   ├── home/             # Homepage components
│   ├── admin/            # Admin components
│   └── providers/        # Context providers
├── prisma/               # Database schema and migrations
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   - Push your code to GitHub
   - Connect your repository to Vercel
   - Add environment variables in Vercel dashboard

2. **Deploy**
   ```bash
   vercel --prod
   ```

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push database schema
- `npm run db:seed` - Seed database with initial data
- `npm run db:studio` - Open Prisma Studio

## 📝 Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."

# Authentication
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Email (Nodemailer)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
SMTP_FROM="noreply@ncsm.gov.lr"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@ncsm.gov.lr or create an issue in the repository.

---

**Built with ❤️ for the National County Sports Meet**
