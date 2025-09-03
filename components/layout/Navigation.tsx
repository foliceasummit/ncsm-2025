'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bars3Icon, 
  XMarkIcon, 
  UserIcon, 
  TrophyIcon,
  CalendarIcon,
  NewspaperIcon,
  UsersIcon,
  ChartBarIcon,
  TicketIcon,
  CameraIcon,
  PhoneIcon,
  HomeIcon,
  FlagIcon,
  StarIcon
} from '@heroicons/react/24/outline'

function NavigationContent() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Home', href: '/Home'},
    { name: 'About Us', href: '/about'},
    { name: 'Counties', href: '/counties'},
    { name: 'Results', href: '/results'},
    { name: 'Standings', href: '/standings'},
    { name: 'News', href: '/blog',},
    { name: 'Tickets', href: '/tickets'},
    { name: 'Contact', href: '/contact'},
  ]

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="ml-4">
                <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-24 h-4 bg-gray-200 rounded animate-pulse mt-2"></div>
              </div>
            </div>
            <div className="w-20 h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20' 
          : 'bg-white/60 backdrop-blur-sm'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <motion.div 
                className="w-12 h-12 relative overflow-hidden rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110"
                whileHover={{ rotate: 5 }}
              >
                <Image
                  src="https://ik.imagekit.io/foliceasummit/mysncsm/cm.png?updatedAt=1756427570941"
                  alt="NCSM Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
              <div className="ml-4">
                <div className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                  NCSM
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Sports Meet 2025
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-8">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-semibold transition-all duration-300 relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                </Link>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Link
                href="/login"
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Login
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="xl:hidden flex items-center">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-600 focus:outline-none focus:text-primary-600 p-2 rounded-lg hover:bg-white/50 transition-all duration-300"
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="xl:hidden bg-white/95 backdrop-blur-md border-t border-white/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-primary-600 block px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 hover:bg-white/50"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div 
                className="border-t border-gray-200 pt-4 mt-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: navigation.length * 0.1 }}
              >
                <Link
                  href="/login"
                  className="bg-primary-600 hover:bg-primary-700 text-white block text-center px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default function Navigation() {
  return <NavigationContent />
}
