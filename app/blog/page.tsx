'use client'

import { motion } from 'framer-motion'
import Navigation from '../components/layout/Navigation'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'

const blogPosts = [
  {
    id: 1,
    title: 'County Registration Opens for 2024 Season',
    excerpt: 'All 15 counties can now register their players and officials for the upcoming National County Sports Meet. The registration process will be open until August 15th.',
    image: 'https://ik.imagekit.io/foliceasummit/mysncsm/APM-Terminals.jpg.gif?updatedAt=1756427571024',
    category: 'Sports News',
    date: '2024-08-01',
    author: 'NCSM Media Team',
    content: 'All 15 counties can now register their players and officials for the upcoming National County Sports Meet. Registration remains open until August 15th. Teams are encouraged to complete the process early to avoid last-minute delays. Required documents include player identification, county affiliation confirmation, and medical clearance. Visit the official portal for step-by-step guidance.'
  },
  {
    id: 2,
    title: 'New Venues Announced for 2024 Tournament',
    excerpt: 'The National County Sports Meet organizing committee has announced the official venues for the 2024 tournament, including upgrades to existing facilities.',
    image: 'https://ik.imagekit.io/foliceasummit/mysncsm/images-1.jpg?updatedAt=1756427575553',
    category: 'Tournament Updates',
    date: '2024-07-28',
    author: 'NCSM Media Team',
    content: 'The organizing committee has confirmed official venues for the 2024 tournament with upgrades to seating, lighting, and turf. County stadiums across Liberia will host group stage matches, while the finals return to SKD Sports Complex. Further improvements focus on accessibility and safety for fans and athletes.'
  },
  {
    id: 3,
    title: 'Montserrado County Wins 2023 Championship',
    excerpt: 'Montserrado County has been crowned champions of the 2023 National County Sports Meet after an impressive performance across all sports disciplines.',
    image: 'https://ik.imagekit.io/foliceasummit/mysncsm/495822530_1269835475150700_6768048624691836323_n.jpg?updatedAt=1756754277667',
    category: 'Results',
    date: '2024-07-25',
    author: 'NCSM Media Team',
    content: 'Montserrado County secured the 2023 championship with dominant performances in football and kickball. The team displayed exceptional discipline and teamwork throughout the tournament. Celebrations were held across the county, honoring players, coaching staff, and supporters.'
  },
  {
    id: 4,
    title: 'Youth Development Program Launched',
    excerpt: 'A new youth development program has been launched to identify and nurture young sporting talent across Liberia\'s 15 counties.',
    image: 'https://ik.imagekit.io/foliceasummit/mysncsm/496033404_1269738428493738_5974493614702706510_n.jpg?updatedAt=1756754278065',
    category: 'Development',
    date: '2024-07-20',
    author: 'NCSM Media Team',
    content: 'The youth development initiative aims to identify emerging talent across Liberia, offering training camps and mentorship programs. County coordinators will collaborate with local schools and clubs to recruit promising athletes and provide pathways to elite competition.'
  },
  {
    id: 5,
    title: 'Partnership with International Sports Federation',
    excerpt: 'The National County Sports Meet has announced a new partnership with the International Sports Federation to enhance the tournament\'s global reach.',
    image: 'https://ik.imagekit.io/foliceasummit/mysncsm/495151821_1269738188493762_5609674405781213538_n.jpg?updatedAt=1756754277661',
    category: 'Partnerships',
    date: '2024-07-15',
    author: 'NCSM Media Team',
    content: 'A new partnership with the International Sports Federation will provide technical support, officiating workshops, and visibility for NCSM beyond Liberia. The collaboration strengthens the tournament\'s standards and presents opportunities for international friendlies.'
  },
  {
    id: 6,
    title: 'Volunteer Registration Now Open',
    excerpt: 'We are looking for dedicated volunteers to help make the 2024 National County Sports Meet a success. Various roles are available.',
    image: 'https://ik.imagekit.io/foliceasummit/mysncsm/496694489_1269913548476226_2422094397377560905_n.jpg?updatedAt=1756652252223',
    category: 'Volunteers',
    date: '2024-07-10',
    author: 'NCSM Media Team',
    content: 'Volunteer registration is open for roles in operations, media, hospitality, and logistics. Volunteers receive training and certificates of participation. Interested individuals can apply online and will be contacted by county coordinators.'
  }
]

 
 
export default function BlogPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const selectedId = searchParams.get('post')
  const selectedPost = selectedId ? blogPosts.find(p => String(p.id) === selectedId) : undefined
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
                        <Link href={`/blog?post=${post.id}`} className="text-blue-600 hover:text-blue-700 font-semibold transition-colors flex items-center gap-1">
                          Read More
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
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
      {selectedPost && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full mx-4 overflow-hidden">
            <div className="relative h-56 bg-gray-100">
              <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
              <button
                onClick={() => router.push('/blog')}
                className="absolute top-3 right-3 bg-black/40 text-white rounded-md px-3 py-1"
              >
                Close
              </button>
            </div>
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-2">{new Date(selectedPost.date).toLocaleDateString()}</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{selectedPost.title}</h2>
              <p className="text-gray-700 mb-4">{selectedPost.content}</p>
              <div className="text-sm text-gray-500">By {selectedPost.author}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
