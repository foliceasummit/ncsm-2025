'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlayIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

const highlights = [
  {
    id: 1,
    type: 'video',
    title: 'Opening Ceremony Highlights',
    description: 'Watch the spectacular opening ceremony of the 2024 National County Sports Meet',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: '/images/highlight-1.jpg'
  },
  {
    id: 2,
    type: 'video',
    title: 'Best Goals of the Tournament',
    description: 'Compilation of the most spectacular goals scored during the competition',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: '/images/highlight-2.jpg'
  },
  {
    id: 3,
    type: 'image',
    title: 'Championship Moment',
    description: 'The winning team celebrates their victory',
    image: '/images/highlight-3.jpg'
  },
  {
    id: 4,
    type: 'image',
    title: 'Athletics Excellence',
    description: 'Record-breaking performances in track and field events',
    image: '/images/highlight-4.jpg'
  },
  {
    id: 5,
    type: 'video',
    title: 'Closing Ceremony',
    description: 'The grand finale of the National County Sports Meet',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: '/images/highlight-5.jpg'
  }
]

export default function HighlightsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % highlights.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + highlights.length) % highlights.length)
  }

  const openVideo = (url: string) => {
    setSelectedVideo(url)
  }

  const closeVideo = () => {
    setSelectedVideo(null)
  }

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 right-1/4 w-80 h-80 bg-primary-200 rounded-full blur-3xl opacity-20"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 90, 180]
          }}
          transition={{ 
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary-200 rounded-full blur-3xl opacity-15"
          animate={{ 
            scale: [1.3, 1, 1.3],
            x: [0, 30, 0]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 mb-8"
          >
            <span className="text-sm font-semibold text-primary-700">
              🎬 Tournament Highlights
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Relive the{' '}
            <span className="text-gradient">Greatest Moments</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the most exciting moments from the National County Sports Meet
          </p>
        </motion.div>

        <div className="relative">
          {/* Main Highlight Display */}
          <motion.div 
            className="relative h-96 md:h-[600px] rounded-3xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="relative h-full"
              >
            {highlights[currentIndex].type === 'video' ? (
              <div className="relative h-full">
                <img
                  src={highlights[currentIndex].thumbnail}
                  alt={highlights[currentIndex].title}
                  className="w-full h-full object-cover"
                />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-center justify-center">
                      <motion.button
                    onClick={() => openVideo(highlights[currentIndex].url!)}
                        className="bg-white/90 hover:bg-white rounded-full p-6 transition-all duration-300 transform hover:scale-110 shadow-2xl"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                  >
                        <PlayIcon className="w-16 h-16 text-primary-600" />
                      </motion.button>
                </div>
              </div>
            ) : (
              <img
                src={highlights[currentIndex].image}
                alt={highlights[currentIndex].title}
                className="w-full h-full object-cover"
              />
            )}
            
            {/* Overlay with title and description */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8">
                  <motion.h3 
                    className="text-white text-2xl md:text-3xl font-bold mb-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                {highlights[currentIndex].title}
                  </motion.h3>
                  <motion.p 
                    className="text-white text-lg opacity-90 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                {highlights[currentIndex].description}
                  </motion.p>
            </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Navigation Buttons */}
          <motion.button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-4 shadow-xl transition-all duration-300 backdrop-blur-md border border-white/20"
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeftIcon className="w-8 h-8 text-gray-700" />
          </motion.button>
          <motion.button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-4 shadow-xl transition-all duration-300 backdrop-blur-md border border-white/20"
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRightIcon className="w-8 h-8 text-gray-700" />
          </motion.button>

          {/* Thumbnail Navigation */}
          <motion.div 
            className="flex justify-center mt-8 space-x-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {highlights.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-primary-600 to-secondary-600 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </motion.div>
        </div>

        {/* Video Modal */}
        <AnimatePresence>
        {selectedVideo && (
            <motion.div 
              className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="relative w-full max-w-5xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.button
                onClick={closeVideo}
                  className="absolute -top-12 right-0 text-white text-3xl hover:text-gray-300 transition-colors duration-200 bg-white/10 rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-md"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
              >
                ×
                </motion.button>
                <div className="relative pt-[56.25%] rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  src={selectedVideo.replace('watch?v=', 'embed/')}
                    className="absolute top-0 left-0 w-full h-full"
                  allowFullScreen
                />
              </div>
              </motion.div>
            </motion.div>
        )}
        </AnimatePresence>
      </div>
    </section>
  )
}
