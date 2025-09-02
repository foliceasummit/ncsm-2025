'use client'

import { motion } from 'framer-motion'

export default function WelcomeSection() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-30"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-secondary-100 rounded-full blur-3xl opacity-20"
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, 50, 0]
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
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 mb-8"
          >
            <span className="text-sm font-semibold text-primary-700">
              🎯 About Our Championship
            </span>
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Welcome to the{' '}
            <span className="text-gradient">National County Sports Meet</span>
          </motion.h2>

          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-12 items-center mb-12"
            >
              <div className="space-y-6">
                <p className="text-xl text-gray-600 leading-relaxed">
              The National County Sports Meet is Liberia's premier sporting event that brings together 
              athletes from all 15 counties in a celebration of unity, talent, and national pride. 
              This annual event showcases the best of Liberian sports across multiple disciplines 
              including football, kickball, female soccer, volleyball, basketball, and athletics.
            </p>
                <p className="text-xl text-gray-600 leading-relaxed">
              Our mission is to promote sports development, foster county unity, and provide a platform 
                  for young athletes to showcase their talents on a national stage.
                </p>
              </div>
              <div className="space-y-6">
                <p className="text-xl text-gray-600 leading-relaxed">
                  Through this event, we strengthen the bonds between counties while celebrating the rich sporting culture 
                  that defines our nation. Join us in this celebration of sports excellence and county pride.
                </p>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Whether you're a player, official, supporter, or spectator, there's a place for everyone in the 
              National County Sports Meet family.
            </p>
          </div>
            </motion.div>

            {/* Feature Cards */}
            <motion.div
              className="grid md:grid-cols-3 gap-8 mt-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              {[
                {
                  icon: '🏆',
                  title: 'Excellence',
                  description: 'Promoting the highest standards of sportsmanship and athletic achievement'
                },
                {
                  icon: '🤝',
                  title: 'Unity',
                  description: 'Bringing together diverse counties in a spirit of national solidarity'
                },
                {
                  icon: '🌟',
                  title: 'Opportunity',
                  description: 'Creating pathways for young athletes to showcase their talents'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="card-hover text-center p-8"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
        </div>
        </motion.div>
      </div>
    </section>
  )
}
