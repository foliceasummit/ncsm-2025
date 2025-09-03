# NCSM 2025 - National County Sports Meet

A comprehensive web application for managing the National County Sports Meet 2025 in Liberia. Built with Next.js 15, React, and TypeScript.

## 🚀 Features

### 🏆 Sports Management
- **Multi-Sport Support**: Football, Basketball, Volleyball, Athletics, Kickball, Female Soccer
- **County-Based Organization**: 15 counties participating
- **Match Scheduling & Results**: Comprehensive fixture management
- **Standings & Rankings**: Real-time tournament tables

### 👥 User Management
- **Role-Based Access Control**: Admin, County Officials, Federation Officials, Match Officials
- **Player Registration**: Complete player profiles with document verification
- **Official Management**: Referee and official registration system
- **County Credentials**: Secure login for county representatives

### 📊 Administrative Tools
- **Dashboard Analytics**: Comprehensive overview for all user types
- **Document Approval System**: Photo, birth certificate, and medical certificate verification
- **Match Reports**: Detailed match documentation
- **Blog Management**: News and updates system

### 🎫 Public Features
- **Ticket Sales**: Multiple ticket categories with secure payment
- **News & Updates**: Blog system for tournament information
- **Results & Fixtures**: Public access to match information
- **County Profiles**: Detailed information about participating counties

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Forms**: React Hook Form, Zod validation
- **Icons**: Lucide React, Heroicons
- **Notifications**: React Hot Toast
- **State Management**: React Context API

## 📁 Project Structure

```
ncsmlr/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard pages
│   ├── api/               # API routes
│   ├── dashboard/         # Role-specific dashboards
│   ├── login/             # Authentication pages
│   ├── register/          # Registration forms
│   └── ...                # Public pages
├── components/            # Reusable components
│   ├── home/             # Homepage components
│   ├── layout/           # Layout components
│   └── ui/               # UI components
├── contexts/              # React contexts
├── data/                  # Mock data and configurations
├── prisma/                # Database schema (commented out)
└── public/                # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/foliceasummit/ncsm-2025.git
   cd ncsmlr
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Demo Credentials

### Admin Access
- **Email**: `admin@ncsm.gov.lr`
- **Password**: `admin123`

### County Officials
- **Montserrado**: `montserrado@county.lr` / `county123`
- **Nimba**: `nimba@county.lr` / `county123`
- **Bong**: `bong@county.lr` / `county123`
- **Lofa**: `lofa@county.lr` / `county123`
- **Grand Bassa**: `grandbassa@county.lr` / `county123`

### Federation Officials
- **LFA**: `lfa@federation.lr` / `federation123`
- **Basketball**: `basketball@federation.lr` / `federation123`
- **Volleyball**: `volleyball@federation.lr` / `federation123`
- **Kickball**: `kickball@federation.lr` / `federation123`

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js and deploy
3. Environment variables can be set in Vercel dashboard

### Manual Deployment
```bash
npm run build
npm start
```

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Tailwind CSS for styling

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile devices
- All modern browsers

## 🔒 Security Features

- Role-based access control
- Secure authentication
- Input validation with Zod
- XSS protection
- CSRF protection

## 🚧 Current Status

- ✅ **Build**: Successfully building without errors
- ✅ **TypeScript**: All type errors resolved
- ✅ **Components**: All components rendering correctly
- ✅ **API Routes**: Mock API endpoints working
- 🔄 **Database**: Prisma integration planned for future
- 🔄 **Real-time**: Socket.IO integration planned for future

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Basic application structure
- ✅ User authentication
- ✅ Role-based dashboards
- ✅ Player registration system

### Phase 2 (Planned)
- 🔄 Database integration with Prisma
- 🔄 Real-time updates with Socket.IO
- 🔄 Advanced analytics
- 🔄 Mobile app

### Phase 3 (Future)
- 🔄 AI-powered insights
- 🔄 Advanced reporting
- 🔄 Integration with external systems
- 🔄 Multi-language support

---

**Built with ❤️ for the National County Sports Meet 2025**
