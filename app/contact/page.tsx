'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import Navigation from '../components/layout/Navigation'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      <Navigation />
      <main className="pt-16 lg:pt-20">
        {/* Hero Section - Reduced Height */}
        <section className="py-12 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 relative overflow-hidden">
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
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Contact{' '}
                <span className="text-gradient bg-gradient-to-r from-primary-300 to-secondary-300 bg-clip-text text-transparent">
                  Us
                </span>
              </motion.h1>

              <motion.p 
                className="text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Get in touch with the National County Sports Meet 2025 organizing committee
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Send us a Message</h2>
                
                <div className="space-y-6">
                  {/* Main Office */}
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Main Office</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <MapPin className="w-5 h-5 text-red-600 mr-3 mt-1" />
                        <div>
                          <p className="font-medium text-gray-900">Ministry of Youth & Sports</p>
                          <p className="text-gray-600">Samuel K Doe Sports Complex, Paynesville City, Liberia</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-red-600 mr-3" />
                        <span className="text-gray-700">+231 776 038 583</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-red-600 mr-3" />
                        <span className="text-gray-700">info@ncm2025.lr</span>
                      </div>
                      <div className="flex items-start">
                        <Clock className="w-5 h-5 text-red-600 mr-3 mt-1" />
                        <div>
                          <p className="text-gray-700">Monday - Friday: 8:00 AM - 5:00 PM</p>
                          <p className="text-gray-700">Saturday: 9:00 AM - 2:00 PM</p>
                          <p className="text-gray-700">Sunday: Closed</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Google Map */}
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Find Us</h3>
                                         <p className="text-gray-600 mb-4">
                       Visit the Ministry of Youth & Sports at Samuel K. Doe Sports Complex in Paynesville City, Liberia
                     </p>
                    
                                         <div className="h-48 w-full">
                       <iframe
                         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.6006399488076!2d-10.800745984928863!3d6.300391495490863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xf0b3b3b3b3b3b3b%3A0xb3b3b3b3b3b3b3b!2sMonrovia%2C%20Liberia!5e0!3m2!1sen!2sus!4v1640995200000"
                         aria-label="Map showing location of Ministry of Youth & Sports"
                         className="w-full h-full rounded-lg border-0"
                         allowFullScreen
                         title="Ministry of Youth & Sports Location"
                       ></iframe>
                     </div>
                  </div>

                  {/* Media Accreditation */}
                  <div className="bg-gradient-to-r from-red-600 to-blue-600 rounded-lg p-6 text-white">
                    <h3 className="text-lg font-semibold mb-4">Media Accreditation</h3>
                    <p className="mb-4">
                      Journalists and media personnel can apply for tournament accreditation through our online form.
                    </p>
                    <a
                      href="https://forms.gle/DkWExB2hQchXemFf7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-white text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                    >
                      Apply for Media Accreditation
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="tickets">Ticket Information</option>
                        <option value="media">Media Accreditation</option>
                        <option value="registration">Player Registration</option>
                        <option value="venue">Venue Information</option>
                        <option value="sponsorship">Sponsorship Opportunities</option>
                        <option value="technical">Technical Support</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                        placeholder="Enter your message here..."
                      />
                    </div>

                                         <button
                       type="submit"
                       className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center"
                     >
                       <Send className="w-5 h-5 mr-2" />
                       Send Message
                     </button>
                   </form>

                   {/* Quick Links - Right under Send Message */}
                   <div className="mt-8 grid md:grid-cols-3 gap-6">
                     <div className="bg-gray-50 rounded-lg p-4 text-center">
                       <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                         <Phone className="w-5 h-5 text-red-600" />
                       </div>
                       <h3 className="text-sm font-semibold text-gray-900 mb-1">Emergency Hotline</h3>
                       <p className="text-xs text-gray-600 mb-2">24/7 support during tournament</p>
                       <a href="tel:+231999888777" className="text-red-600 font-medium hover:text-red-700 text-sm">
                         +231 776 038 583
                       </a>
                     </div>

                     <div className="bg-gray-50 rounded-lg p-4 text-center">
                       <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                         <Mail className="w-5 h-5 text-blue-600" />
                       </div>
                       <h3 className="text-sm font-semibold text-gray-900 mb-1">Press Inquiries</h3>
                       <p className="text-xs text-gray-600 mb-2">Media and press relations</p>
                       <a href="mailto:press@ncm2025.lr" className="text-blue-600 font-medium hover:text-blue-700 text-sm">
                         publicaffairs@ncsmlr.com
                       </a>
                     </div>

                     <div className="bg-gray-50 rounded-lg p-4 text-center">
                       <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                         <ExternalLink className="w-5 h-5 text-green-600" />
                       </div>
                       <h3 className="text-sm font-semibold text-gray-900 mb-1">Social Media</h3>
                       <p className="text-xs text-gray-600 mb-2">Follow us for updates</p>
                       <div className="flex justify-center space-x-2">
                         <a href="#" className="text-green-600 hover:text-green-700 text-sm">Facebook</a>
                         <a href="#" className="text-green-600 hover:text-green-700 text-sm">Twitter</a>
                         <a href="#" className="text-green-600 hover:text-green-700 text-sm">Instagram</a>
                       </div>
                     </div>
                   </div>
                 </div>
               </motion.div>
             </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <p className="text-lg text-gray-600">
                  Find answers to common questions about the National County Sports Meet
                </p>
              </div>

              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                     {/* Left Column - First 3 questions */}
                   <div className="space-y-6">
                     {[
                       {
                         question: 'When is the National County Sports Meet held?',
                         answer: 'The National County Sports Meet is typically held annually, usually in the months of September to October. The exact dates are announced several months in advance.'
                       },
                       {
                         question: 'How can I purchase tickets for the matches?',
                         answer: 'Tickets can be purchased online through our official website, at authorized ticket outlets, or at the stadium on match day (subject to availability).'
                       },
                       {
                         question: 'Which counties participate in the tournament?',
                         answer: 'All 15 counties of Liberia participate in the National County Sports Meet, including Montserrado, Bong, Nimba, Grand Bassa, Lofa, and others.'
                       }
                     ].map((faq, index) => (
                       <motion.div
                         key={index}
                         className="card cursor-pointer hover:shadow-lg transition-shadow"
                         initial={{ opacity: 0, y: 20 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.6, delay: index * 0.1 }}
                         viewport={{ once: true }}
                         onClick={() => setOpenFaq(openFaq === index ? null : index)}
                       >
                         <div className="flex items-center justify-between">
                           <h3 className="text-lg font-bold text-gray-900">{faq.question}</h3>
                           {openFaq === index ? (
                             <ChevronUp className="w-5 h-5 text-gray-500" />
                           ) : (
                             <ChevronDown className="w-5 h-5 text-gray-500" />
                           )}
                         </div>
                         {openFaq === index && (
                           <motion.p 
                             className="text-gray-600 leading-relaxed mt-3 pt-3 border-t border-gray-200"
                             initial={{ opacity: 0, height: 0 }}
                             animate={{ opacity: 1, height: 'auto' }}
                             transition={{ duration: 0.3 }}
                           >
                             {faq.answer}
                           </motion.p>
                         )}
                       </motion.div>
                     ))}
                   </div>

                                     {/* Right Column - Last 3 questions */}
                   <div className="space-y-6">
                     {[
                       {
                         question: 'What sports are included in the tournament?',
                         answer: 'The tournament includes football, kickball, female soccer, volleyball, basketball, and athletics events.'
                       },
                       {
                         question: 'How can media personnel get accreditation?',
                         answer: 'Media personnel can apply for accreditation through our media accreditation form on the website. Applications are reviewed and approved based on media guidelines.'
                       },
                       {
                         question: 'What are the tournament venues?',
                         answer: 'Matches are held at various venues including the SKD Sports Complex, Antoinette Tubman Stadium, and other designated sports facilities across Monrovia and surrounding areas.'
                       }
                     ].map((faq, index) => (
                       <motion.div
                         key={index + 3}
                         className="card cursor-pointer hover:shadow-lg transition-shadow"
                         initial={{ opacity: 0, y: 20 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.6, delay: (index + 3) * 0.1 }}
                         viewport={{ once: true }}
                         onClick={() => setOpenFaq(openFaq === index + 3 ? null : index + 3)}
                       >
                         <div className="flex items-center justify-between">
                           <h3 className="text-lg font-bold text-gray-900">{faq.question}</h3>
                           {openFaq === index + 3 ? (
                             <ChevronUp className="w-5 h-5 text-gray-500" />
                           ) : (
                             <ChevronDown className="w-5 h-5 text-gray-500" />
                           )}
                         </div>
                         {openFaq === index + 3 && (
                           <motion.p 
                             className="text-gray-600 leading-relaxed mt-3 pt-3 border-t border-gray-200"
                             initial={{ opacity: 0, height: 0 }}
                             animate={{ opacity: 1, height: 'auto' }}
                             transition={{ duration: 0.3 }}
                           >
                             {faq.answer}
                           </motion.p>
                         )}
                       </motion.div>
                     ))}
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}
