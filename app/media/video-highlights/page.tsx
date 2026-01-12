'use client'

import { motion } from 'framer-motion'
import Navigation from '../../components/layout/Navigation'
import VideoThumbnail from '../../components/VideoThumbnail'

const videoHighlights = [
  { id: 'v1', title: 'Grand Final: Montserrado vs Nimba', duration: '12:45', thumbnail: 'https://ik.imagekit.io/foliceasummit/mysncsm/496844567_1269835491817365_1481792822351409750_n.jpg?updatedAt=1756754287063', views: '15K', date: '2 Days ago', category: 'Football', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { id: 'v2', title: 'Top 10 Goals of the Season', duration: '08:30', thumbnail: 'https://ik.imagekit.io/foliceasummit/mysncsm/496803515_1269921561808758_7339364751935250824_n.jpg?updatedAt=1756652252442', views: '22K', date: '1 Week ago', category: 'Highlights', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { id: 'v3', title: 'Opening Ceremony Spectacular', duration: '25:10', thumbnail: 'https://ik.imagekit.io/foliceasummit/mysncsm/495807510_1269721765162071_2070315643414321067_n.jpg?updatedAt=1756754277360', views: '8.5K', date: '2 Weeks ago', category: 'Event', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { id: 'v4', title: 'Basketball Semi-Final Thriller', duration: '15:20', thumbnail: 'https://ik.imagekit.io/foliceasummit/mysncsm/495245223_1269721668495414_1410248435149635373_n.jpg?updatedAt=1756652243749', views: '10K', date: '3 Weeks ago', category: 'Basketball', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { id: 'v5', title: 'Kickball Championship Match', duration: '18:05', thumbnail: 'https://ik.imagekit.io/foliceasummit/mysncsm/496709241_1269921885142059_8692249399282192438_n.jpg?updatedAt=1756754277593', views: '5K', date: '1 Month ago', category: 'Kickball', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { id: 'v6', title: 'Fan Reactions & Celebrations', duration: '05:45', thumbnail: 'https://ik.imagekit.io/foliceasummit/mysncsm/496768014_1269921891808725_5906856978432921037_n.jpg?updatedAt=1756754286593', views: '12K', date: '1 Month ago', category: 'Fan Zone', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }
]

export default function VideoHighlightsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="pt-16 lg:pt-20">
        <section className="py-20 bg-gradient-to-br from-red-900 via-red-800 to-orange-900 relative overflow-hidden">
          <div className="absolute inset-0">
            <motion.div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 15, repeat: Infinity }} />
          </div>
          <div className="container-custom relative z-10">
            <motion.div className="text-center text-white" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Video <span className="text-gradient bg-gradient-to-r from-orange-300 to-yellow-300 bg-clip-text text-transparent">Highlights</span></h1>
              <p className="text-lg md:text-xl text-red-100 max-w-2xl mx-auto">Watch match replays, goals, and exclusive moments on YouTube.</p>
            </motion.div>
          </div>
        </section>
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videoHighlights.map((video, index) => (
                <motion.div key={video.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }}>
                  <VideoThumbnail id={video.id} title={video.title} thumbnail={video.thumbnail} url={video.url} />
                  <div className="px-1 mt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full uppercase tracking-wide">{video.category}</span>
                      <span className="text-xs text-gray-500">{video.date}</span>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">{video.views} views • {video.duration}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
