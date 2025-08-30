'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
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
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tournament Highlights
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Relive the most exciting moments from the National County Sports Meet
          </p>
        </motion.div>

        <div className="relative">
          {/* Main Highlight Display */}
          <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-xl">
            {highlights[currentIndex].type === 'video' ? (
              <div className="relative h-full">
                <img
                  src={highlights[currentIndex].thumbnail}
                  alt={highlights[currentIndex].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <button
                    onClick={() => openVideo(highlights[currentIndex].url!)}
                    className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-4 transition-all duration-200 transform hover:scale-110"
                  >
                    <PlayIcon className="w-12 h-12 text-primary-600" />
                  </button>
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
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <h3 className="text-white text-xl md:text-2xl font-bold mb-2">
                {highlights[currentIndex].title}
              </h3>
              <p className="text-white text-sm md:text-base opacity-90">
                {highlights[currentIndex].description}
              </p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200"
          >
            <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200"
          >
            <ChevronRightIcon className="w-6 h-6 text-gray-700" />
          </button>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center mt-6 space-x-2">
            {highlights.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="relative w-full max-w-4xl">
              <button
                onClick={closeVideo}
                className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300"
              >
                ×
              </button>
              <div className="relative pt-[56.25%]">
                <iframe
                  src={selectedVideo.replace('watch?v=', 'embed/')}
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
