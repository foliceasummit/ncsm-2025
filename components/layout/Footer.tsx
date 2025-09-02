'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { 
  FacebookIcon, 
  TwitterIcon, 
  InstagramIcon, 
  YoutubeIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon
} from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Floating Background Elements */}
      <motion.div
        className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0]
        }}
        transition={{ 
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="container-custom relative z-10">
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 relative overflow-hidden rounded-full shadow-lg mr-4">
                  <Image
                    src="https://ik.imagekit.io/foliceasummit/mysncsm/cm.png?updatedAt=1756427570941"
                    alt="NCSM Logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">NCSM</h3>
                  <p className="text-gray-400 text-sm">Sports Meet 2025</p>
              </div>
            </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                The National County Sports Meet is Liberia's premier sporting event, 
                bringing together all 15 counties in celebration of athletic excellence, 
                unity, and community spirit.
              </p>
              
              {/* Social Media Links */}
            <div className="flex space-x-4">
                {[
                  { icon: FacebookIcon, href: 'https://www.facebook.com/moysliberia', label: 'Facebook' },
                  { icon: TwitterIcon, href: '#', label: 'Twitter' },
                  { icon: InstagramIcon, href: '#', label: 'Instagram' },
                  { icon: YoutubeIcon, href: '#', label: 'YouTube' }
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-primary-600 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
            </div>
            </motion.div>

          {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'Counties', href: '/counties' },
                  { name: 'Results', href: '/results' },
                  { name: 'Standings', href: '/standings' },
                  { name: 'News', href: '/blog' },
                  { name: 'Tickets', href: '/tickets' }
                ].map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      {link.name}
                </Link>
                  </motion.li>
                ))}
            </ul>
            </motion.div>

          {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-white mb-6">Contact Info</h4>
              <ul className="space-y-4">
                {[
                  { icon: MapPinIcon, text: 'Ministry of Youth & Sports, Paynesville City, Liberia' },
                  { icon: PhoneIcon, text: '+231 776 038 583' },
                  { icon: MailIcon, text: 'info@ncsmlr.com' }
                ].map((contact, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <contact.icon className="w-5 h-5 text-primary-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-400 text-sm leading-relaxed">{contact.text}</span>
                  </motion.li>
                ))}
            </ul>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-white mb-6">Stay Updated</h4>
              <p className="text-gray-400 mb-4 text-sm">
                Subscribe to our newsletter for the latest updates and news.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-r-lg transition-colors duration-300">
                  Subscribe
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-white/10 py-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
                     <div className="flex flex-col md:flex-row justify-between items-center">
             <p className="text-gray-400 text-sm">
               © 2025 National County Sports Meet. All rights reserved.
             </p>
             <p className="text-gray-400 text-xs mt-2 md:mt-0">
               Organized by the Ministry of Youth & Sports, Republic of Liberia
          </p>
        </div>
        </motion.div>
      </div>
    </footer>
  )
}
