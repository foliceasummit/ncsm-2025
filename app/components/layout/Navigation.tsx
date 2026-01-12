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
  StarIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'

function NavigationContent() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [mediaDropdownOpen, setMediaDropdownOpen] = useState(false)
  const [matchCenterDropdownOpen, setMatchCenterDropdownOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Home', href: '/'},
    { name: 'About Us', href: '/about'},
    { name: 'Counties', href: '/counties'},
    { 
      name: 'Match Center', 
      href: '#',
      dropdown: [
        { name: 'Fixtures', href: '/fixtures' },
        { name: 'Results', href: '/results' },
        { name: 'Table Standings', href: '/standings' },
        { name: 'Tickets', href: '/tickets' }
      ]
    },
    { 
      name: 'Media', 
      href: '#',
      dropdown: [
        { name: 'News', href: '/blog' },
        { name: 'Video Highlights', href: '/media/video-highlights' },
        { name: 'Gallery', href: '/media/gallery' },
        { name: 'Important Documents', href: '/media/documents' }
      ]
    },
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
              <div className="w-12 h-12 relative overflow-hidden rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                <Image
                  src="https://ik.imagekit.io/foliceasummit/mysncsm/cm.png?updatedAt=1756427570941"
                  alt="NCSM Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="ml-4">
                <div className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                  NCSM
                </div>
                <div className="text-sm text-gray-600 group-hover:text-primary-500 transition-colors duration-300">
                  National County Sports Meet
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
                className="relative"
                onMouseEnter={() => {
                  if (item.dropdown) {
                    if (item.name === 'Media') setMediaDropdownOpen(true)
                    if (item.name === 'Match Center') setMatchCenterDropdownOpen(true)
                  }
                }}
                onMouseLeave={() => {
                  if (item.name === 'Media') setMediaDropdownOpen(false)
                  if (item.name === 'Match Center') setMatchCenterDropdownOpen(false)
                }}
              >
                {item.dropdown ? (
                  <div className="relative">
                    <button
                      className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-semibold transition-all duration-300 relative group flex items-center"
                    >
                      {item.name}
                      <ChevronDownIcon className="ml-1 h-4 w-4" />
                      <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                    </button>
                    <AnimatePresence>
                      {(item.name === 'Media' && mediaDropdownOpen) || (item.name === 'Match Center' && matchCenterDropdownOpen) ? (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50"
                        >
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-semibold transition-all duration-300 relative group"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                  </Link>
                )}
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
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => {
                          if (item.name === 'Media') setMediaDropdownOpen(!mediaDropdownOpen)
                          if (item.name === 'Match Center') setMatchCenterDropdownOpen(!matchCenterDropdownOpen)
                        }}
                        className="text-gray-700 hover:text-primary-600 w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 hover:bg-white/50"
                      >
                        {item.name}
                        <ChevronDownIcon className={`h-5 w-5 transition-transform ${(item.name === 'Media' && mediaDropdownOpen) || (item.name === 'Match Center' && matchCenterDropdownOpen) ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {((item.name === 'Media' && mediaDropdownOpen) || (item.name === 'Match Center' && matchCenterDropdownOpen)) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="pl-4 mt-2 space-y-1"
                          >
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="text-gray-600 hover:text-primary-600 block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/50"
                                onClick={() => setIsOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-gray-700 hover:text-primary-600 block px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 hover:bg-white/50"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
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

export default NavigationContent
