'use client'

import { motion } from 'framer-motion'
import Navigation from '../../components/layout/Navigation'

const mediaGallery = [
  { id: 1, title: 'NCSM Tournament Action', type: 'photo', url: 'https://ik.imagekit.io/foliceasummit/mysncsm/496844567_1269835491817365_1481792822351409750_n.jpg?updatedAt=1756754287063', category: 'Tournament' },
  { id: 2, title: 'Sports Competition', type: 'photo', url: 'https://ik.imagekit.io/foliceasummit/mysncsm/496803515_1269921561808758_7339364751935250824_n.jpg?updatedAt=1756652252442', category: 'Competition' },
  { id: 3, title: 'Athletic Events', type: 'photo', url: 'https://ik.imagekit.io/foliceasummit/mysncsm/496768014_1269921891808725_5906856978432921037_n.jpg?updatedAt=1756754286593', category: 'Athletics' },
  { id: 4, title: 'Team Performance', type: 'photo', url: 'https://ik.imagekit.io/foliceasummit/mysncsm/496709241_1269921885142059_8692249399282192438_n.jpg?updatedAt=1756754277593', category: 'Teams' },
  { id: 5, title: 'Championship Moments', type: 'photo', url: 'https://ik.imagekit.io/foliceasummit/mysncsm/481089621_3368977803232427_8925673469741527384_n.jpg?updatedAt=1756754277811', category: 'Championship' },
  { id: 6, title: 'Tournament Highlights', type: 'photo', url: 'https://ik.imagekit.io/foliceasummit/mysncsm/495807510_1269721765162071_2070315643414321067_n.jpg?updatedAt=1756754277360', category: 'Highlights' },
  { id: 7, title: 'Sports Excellence', type: 'photo', url: 'https://ik.imagekit.io/foliceasummit/mysncsm/495245223_1269721668495414_1410248435149635373_n.jpg?updatedAt=1756652243749', category: 'Excellence' },
  { id: 8, title: 'NCSM Web Coverage', type: 'photo', url: 'https://ik.imagekit.io/foliceasummit/mysncsm/web.jpg?updatedAt=1756650605675', category: 'Media' }
]

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="pt-16 lg:pt-20">
        <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
          <div className="absolute inset-0">
            <motion.div className="absolute top-10 right-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} />
            <motion.div className="absolute bottom-10 left-10 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl" animate={{ scale: [1, 1.2, 1], rotate: [360, 180, 0] }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }} />
          </div>
          <div className="container-custom relative z-10">
            <motion.div className="text-center text-white" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Media <span className="text-gradient bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">Gallery</span></h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">Explore memorable moments from the National County Sports Meet.</p>
            </motion.div>
          </div>
        </section>
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mediaGallery.map((item, index) => (
                <motion.div key={item.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 group" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }}>
                  <div className="relative overflow-hidden">
                    <img src={item.url} alt={item.title} className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 w-full">
                        <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full mb-2">{item.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-500 capitalize">{item.type}</p>
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

