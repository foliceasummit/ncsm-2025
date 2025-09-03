'use client'

import { motion } from 'framer-motion'
import Navigation from '../components/layout/Navigation'

const blogPosts = [
  {
    id: 1,
    title: 'County Registration Opens for 2024 Season',
    excerpt: 'All 15 counties can now register their players and officials for the upcoming National County Sports Meet. The registration process will be open until August 15th.',
    image: 'https://ik.imagekit.io/foliceasummit/mysncsm/APM-Terminals.jpg.gif?updatedAt=1756427571024',
    category: 'Sports News',
    date: '2024-08-01',
    author: 'NCSM Media Team'
  },
  {
    id: 2,
    title: 'New Venues Announced for 2024 Tournament',
    excerpt: 'The National County Sports Meet organizing committee has announced the official venues for the 2024 tournament, including upgrades to existing facilities.',
    image: 'https://ik.imagekit.io/foliceasummit/mysncsm/images-1.jpg?updatedAt=1756427575553',
    category: 'Tournament Updates',
    date: '2024-07-28',
    author: 'NCSM Media Team'
  },
  {
    id: 3,
    title: 'Montserrado County Wins 2023 Championship',
    excerpt: 'Montserrado County has been crowned champions of the 2023 National County Sports Meet after an impressive performance across all sports disciplines.',
    image: 'https://ik.imagekit.io/foliceasummit/mysncsm/495822530_1269835475150700_6768048624691836323_n.jpg?updatedAt=1756754277667',
    category: 'Results',
    date: '2024-07-25',
    author: 'NCSM Media Team'
  },
  {
    id: 4,
    title: 'Youth Development Program Launched',
    excerpt: 'A new youth development program has been launched to identify and nurture young sporting talent across Liberia\'s 15 counties.',
    image: 'https://ik.imagekit.io/foliceasummit/mysncsm/496033404_1269738428493738_5974493614702706510_n.jpg?updatedAt=1756754278065',
    category: 'Development',
    date: '2024-07-20',
    author: 'NCSM Media Team'
  },
  {
    id: 5,
    title: 'Partnership with International Sports Federation',
    excerpt: 'The National County Sports Meet has announced a new partnership with the International Sports Federation to enhance the tournament\'s global reach.',
    image: 'https://ik.imagekit.io/foliceasummit/mysncsm/495151821_1269738188493762_5609674405781213538_n.jpg?updatedAt=1756754277661',
    category: 'Partnerships',
    date: '2024-07-15',
    author: 'NCSM Media Team'
  },
  {
    id: 6,
    title: 'Volunteer Registration Now Open',
    excerpt: 'We are looking for dedicated volunteers to help make the 2024 National County Sports Meet a success. Various roles are available.',
    image: 'https://ik.imagekit.io/foliceasummit/mysncsm/496694489_1269913548476226_2422094397377560905_n.jpg?updatedAt=1756652252223',
    category: 'Volunteers',
    date: '2024-07-10',
    author: 'NCSM Media Team'
  }
]

const mediaGallery = [
  {
    id: 1,
    title: 'NCSM Tournament Action',
    type: 'photo',
    url: 'https://ik.imagekit.io/foliceasummit/mysncsm/496844567_1269835491817365_1481792822351409750_n.jpg?updatedAt=1756754287063',
    category: 'Tournament'
  },
  {
    id: 2,
    title: 'Sports Competition',
    type: 'photo',
    url: 'https://ik.imagekit.io/foliceasummit/mysncsm/496803515_1269921561808758_7339364751935250824_n.jpg?updatedAt=1756652252442',
    category: 'Competition'
  },
  {
    id: 3,
    title: 'Athletic Events',
    type: 'photo',
    url: 'https://ik.imagekit.io/foliceasummit/mysncsm/496768014_1269921891808725_5906856978432921037_n.jpg?updatedAt=1756754286593',
    category: 'Athletics'
  },
  {
    id: 4,
    title: 'Team Performance',
    type: 'photo',
    url: 'https://ik.imagekit.io/foliceasummit/mysncsm/496709241_1269921885142059_8692249399282192438_n.jpg?updatedAt=1756754277593',
    category: 'Teams'
  },
  {
    id: 5,
    title: 'Championship Moments',
    type: 'photo',
    url: 'https://ik.imagekit.io/foliceasummit/mysncsm/481089621_3368977803232427_8925673469741527384_n.jpg?updatedAt=1756754277811',
    category: 'Championship'
  },
  {
    id: 6,
    title: 'Tournament Highlights',
    type: 'photo',
    url: 'https://ik.imagekit.io/foliceasummit/mysncsm/495807510_1269721765162071_2070315643414321067_n.jpg?updatedAt=1756754277360',
    category: 'Highlights'
  },
  {
    id: 7,
    title: 'Sports Excellence',
    type: 'photo',
    url: 'https://ik.imagekit.io/foliceasummit/mysncsm/495245223_1269721668495414_1410248435149635373_n.jpg?updatedAt=1756652243749',
    category: 'Excellence'
  },
  {
    id: 8,
    title: 'NCSM Web Coverage',
    type: 'photo',
    url: 'https://ik.imagekit.io/foliceasummit/mysncsm/web.jpg?updatedAt=1756650605675',
    category: 'Media'
  }
]

export default function BlogPage() {
    return (
    <div className="min-h-screen bg-gradient-primary">
        <Navigation />
      <main className="pt-16 lg:pt-20">
        {/* Hero Section - Modern Design */}
        <section className="py-12 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
          {/* Modern Background Elements */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-10 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div
              className="absolute bottom-10 left-10 w-24 h-24 bg-indigo-500/20 rounded-full blur-xl"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [360, 180, 0]
              }}
              transition={{ 
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
          </div>
          
          <div className="container-custom relative z-10">
            <motion.div
              className="text-center text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.h1 
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Blog &{' '}
                <span className="text-gradient bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">
                  News
                </span>
              </motion.h1>

              <motion.p 
                className="text-lg text-gray-300 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Stay updated with the latest news, blog posts, and media coverage from the National County Sports Meet
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Latest News - Modern Design */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest News</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Get the latest updates and announcements from the National County Sports Meet
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover transform transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-semibold rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">By {post.author}</span>
                        <button className="text-blue-600 hover:text-blue-700 font-semibold transition-colors flex items-center gap-1">
                          Read More 
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Media Gallery - Modern Design */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Media Gallery</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Browse through photos and videos from past National County Sports Meet events
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mediaGallery.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 w-full">
                          <div className="flex items-center justify-between">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              item.type === 'video' 
                                ? 'bg-red-500 text-white' 
                                : 'bg-blue-500 text-white'
                            }`}>
                              {item.type === 'video' ? 'Video' : 'Photo'}
                            </span>
                            {item.type === 'video' && (
                              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Document Downloads Section */}
        <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
          <div className="container-custom">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Important Documents
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Download official NCSM documents, forms, rules, and schedules. All documents are updated regularly to ensure accuracy.
              </p>
            </motion.div>

            {/* Document Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { name: 'Tournament Rules', icon: '📋', color: 'from-blue-500 to-blue-600' },
                { name: 'Registration Forms', icon: '📝', color: 'from-green-500 to-green-600' },
                { name: 'Match Schedules', icon: '📅', color: 'from-purple-500 to-purple-600' },
                { name: 'Technical Guidelines', icon: '⚙️', color: 'from-orange-500 to-orange-600' }
              ].map((category, index) => (
                <motion.div
                  key={category.name}
                  className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl`}>
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-600">Essential documents for participants and officials</p>
                </motion.div>
              ))}
            </div>

            {/* Document List */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-primary-600 to-secondary-600">
                <h3 className="text-xl font-bold text-white">Available Downloads</h3>
              </div>
              
              <div className="divide-y divide-gray-200">
                {/* Tournament Rules */}
                <div className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">NCSM 2025 Tournament Rules</h4>
                        <p className="text-sm text-gray-600">Complete tournament rules and regulations for all sports disciplines</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>📄 PDF • 2.3 MB</span>
                          <span>📅 Updated: Jan 15, 2025</span>
                        </div>
                      </div>
                    </div>
                    <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Download</span>
                    </button>
                  </div>
                </div>



                {/* Match Schedule */}
                <div className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">Match Schedule & Fixtures</h4>
                        <p className="text-sm text-gray-600">Complete tournament schedule with dates, times, and venues</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>📄 PDF • 3.1 MB</span>
                          <span>📅 Updated: Jan 20, 2025</span>
                        </div>
                      </div>
                    </div>
                    <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Download</span>
                    </button>
                  </div>
                </div>

                {/* Technical Guidelines */}
                <div className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">Technical Guidelines</h4>
                        <p className="text-sm text-gray-600">Technical specifications and guidelines for all sports disciplines</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>📄 PDF • 4.2 MB</span>
                          <span>📅 Updated: Jan 18, 2025</span>
                        </div>
                      </div>
                    </div>
                    <button className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Download</span>
                    </button>
                  </div>
                </div>

                {/* County Information Pack */}
                <div className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">County Information Pack</h4>
                        <p className="text-sm text-gray-600">Complete information pack for county officials and coordinators</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>📄 PDF • 5.7 MB</span>
                          <span>📅 Updated: Jan 22, 2025</span>
                        </div>
                      </div>
                    </div>
                    <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 max-w-2xl mx-auto">
                <h4 className="text-lg font-semibold text-blue-900 mb-3">Need Help?</h4>
                <p className="text-blue-700 mb-4">
                  If you have trouble downloading any documents or need additional information, please contact our support team.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Contact Support</span>
                  </button>
                  <button className="bg-white hover:bg-gray-50 text-blue-600 px-6 py-2 rounded-lg font-medium border border-blue-200 transition-colors duration-200 flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>FAQ</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Newsletter Signup - Modern Design */}
        <section className="py-12 bg-gradient-to-r from-slate-800 to-blue-900 relative overflow-hidden">
          {/* Modern Background Elements */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-400/20 rounded-full blur-lg"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute top-1/3 right-1/4 w-12 h-12 bg-indigo-400/20 rounded-full blur-md"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          
          <div className="container-custom relative z-10">
            <motion.div
              className="text-center text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Stay Updated</h2>
              <p className="text-lg text-gray-300 mb-6 max-w-xl mx-auto">
                Subscribe to our newsletter to receive the latest news and updates about the National County Sports Meet
              </p>
              
              <div className="max-w-md mx-auto">
                <div className="flex bg-white/10 backdrop-blur-sm rounded-xl p-1 border border-white/20">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-transparent text-white placeholder-gray-300 focus:outline-none rounded-l-lg"
                  />
                  <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-r-lg font-semibold transition-all duration-300 transform hover:scale-105">
                    Subscribe
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}
