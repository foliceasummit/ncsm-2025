'use client'

import { motion } from 'framer-motion'
import Navigation from '../components/layout/Navigation'

export default function MediaAccreditationPage() {
  return (
    <div className="min-h-screen bg-gradient-primary">
      <Navigation />
      <main className="pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 relative overflow-hidden">
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-20 right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"
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
          </div>
          
          <div className="container-custom relative z-10">
            <motion.div
              className="text-center text-white"
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
                className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
              >
                <span className="text-sm font-semibold text-white/90">
                  📰 Media Accreditation
                </span>
              </motion.div>

              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Media{' '}
                <span className="text-gradient bg-gradient-to-r from-primary-300 to-secondary-300 bg-clip-text text-transparent">
                  Accreditation
                </span>
              </motion.h1>

              <motion.p 
                className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                Apply for media accreditation to cover the National County Sports Meet and get exclusive access to press areas, interviews, and official events
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Application Form */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Application Form</h2>
                <p className="text-lg text-gray-600">
                  Complete the form below to apply for media accreditation
                </p>
              </div>

              <div className="card">
                <form className="space-y-8">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="label">First Name *</label>
                        <input type="text" className="input-field" required />
                      </div>
                      <div>
                        <label className="label">Last Name *</label>
                        <input type="text" className="input-field" required />
                      </div>
                      <div>
                        <label className="label">Email Address *</label>
                        <input type="email" className="input-field" required />
                      </div>
                      <div>
                        <label className="label">Phone Number *</label>
                        <input type="tel" className="input-field" required />
                      </div>
                    </div>
                  </div>

                  {/* Media Organization */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Media Organization</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="label">Media Organization *</label>
                        <input type="text" className="input-field" required />
                      </div>
                      <div>
                        <label className="label">Position/Role *</label>
                        <input type="text" className="input-field" required />
                      </div>
                      <div>
                        <label className="label">Media Type *</label>
                        <select className="input-field" required>
                          <option value="">Select Media Type</option>
                          <option value="print">Print Media</option>
                          <option value="broadcast">Broadcast Media</option>
                          <option value="digital">Digital Media</option>
                          <option value="photography">Photography</option>
                          <option value="social">Social Media</option>
                        </select>
                      </div>
                      <div>
                        <label className="label">Website/Platform</label>
                        <input type="url" className="input-field" />
                      </div>
                    </div>
                  </div>

                  {/* Coverage Details */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Coverage Details</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="label">What type of coverage do you plan? *</label>
                        <textarea className="input-field" rows={4} required></textarea>
                      </div>
                      <div>
                        <label className="label">Which events do you plan to cover? *</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          {['Opening Ceremony', 'Football Matches', 'Athletics', 'Basketball', 'Volleyball', 'Kickball', 'Closing Ceremony', 'Press Conferences'].map((event) => (
                            <label key={event} className="flex items-center">
                              <input type="checkbox" className="mr-3" />
                              <span className="text-gray-700">{event}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Equipment */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Equipment & Requirements</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="label">What equipment will you bring? *</label>
                        <textarea className="input-field" rows={3} required></textarea>
                      </div>
                      <div>
                        <label className="label">Do you require special access? (e.g., field access, press box)</label>
                        <textarea className="input-field" rows={3}></textarea>
                      </div>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div>
                    <div className="flex items-start">
                      <input type="checkbox" className="mr-3 mt-1" required />
                      <div className="text-sm text-gray-600">
                        I agree to abide by the NCSM media guidelines and terms of accreditation. I understand that accreditation is subject to approval and may be revoked for violations of media policies.
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="text-center">
                    <button type="submit" className="btn-primary text-lg px-12 py-4">
                      Submit Application
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Media Guidelines */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Media Guidelines</h2>
                <p className="text-lg text-gray-600">
                  Important information for accredited media personnel
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Press Areas',
                    description: 'Designated press areas will be available at all venues. Please respect the boundaries and follow security instructions.',
                    icon: '📰'
                  },
                  {
                    title: 'Interviews',
                    description: 'Pre-arranged interviews with players and officials can be scheduled through the media coordinator.',
                    icon: '🎤'
                  },
                  {
                    title: 'Photography',
                    description: 'Photography is allowed in designated areas. Flash photography is prohibited during matches.',
                    icon: '📸'
                  },
                  {
                    title: 'Social Media',
                    description: 'Live updates and social media coverage are encouraged. Use official hashtags #NCSM2024.',
                    icon: '📱'
                  },
                  {
                    title: 'Press Conferences',
                    description: 'Regular press conferences will be held. Check the media schedule for times and locations.',
                    icon: '🎥'
                  },
                  {
                    title: 'Contact',
                    description: 'For media inquiries, contact the media coordinator at media@ncsm.gov.lr or call +231 XXX XXX XXX.',
                    icon: '📞'
                  }
                ].map((guideline, index) => (
                  <motion.div
                    key={index}
                    className="card-hover text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-4xl mb-4">{guideline.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{guideline.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{guideline.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
