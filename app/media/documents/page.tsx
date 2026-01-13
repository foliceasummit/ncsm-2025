'use client'

import { motion } from 'framer-motion'
import Navigation from '../../components/layout/Navigation'

export default function DocumentsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="pt-16 lg:pt-20">
        <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
          <div className="absolute inset-0">
            <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 10, repeat: Infinity }} />
          </div>
          <div className="container-custom relative z-10">
            <motion.div className="text-center text-white" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Important <span className="text-gradient bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">Documents</span></h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">Access official rules, schedules, and forms for NCSM.</p>
            </motion.div>
          </div>
        </section>
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { name: 'Tournament Rules', icon: '📋', color: 'from-blue-500 to-blue-600' },
                { name: 'Registration Forms', icon: '📝', color: 'from-green-500 to-green-600' },
                { name: 'Match Schedules', icon: '📅', color: 'from-purple-500 to-purple-600' },
                { name: 'Technical Guidelines', icon: '⚙️', color: 'from-orange-500 to-orange-600' }
              ].map((category, index) => (
                <motion.div key={category.name} className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }}>
                  <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl shadow-md`}>{category.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-600">Essential documents for participants and officials</p>
                </motion.div>
              ))}
            </div>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-slate-800 to-blue-900">
                <h3 className="text-xl font-bold text-white">Available Downloads</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {[
                  { title: 'NCSM 2025 Tournament Rules', desc: 'Complete tournament rules and regulations', size: '2.3 MB', date: 'Jan 15, 2025', iconColor: 'text-blue-600', bgColor: 'bg-blue-100', btnColor: 'from-blue-500 to-blue-600' },
                  { title: 'Match Schedule & Fixtures', desc: 'Complete tournament schedule', size: '3.1 MB', date: 'Jan 20, 2025', iconColor: 'text-orange-600', bgColor: 'bg-orange-100', btnColor: 'from-orange-500 to-orange-600' },
                  { title: 'Technical Guidelines', desc: 'Specifications and guidelines for all disciplines', size: '4.2 MB', date: 'Jan 18, 2025', iconColor: 'text-indigo-600', bgColor: 'bg-indigo-100', btnColor: 'from-indigo-500 to-indigo-600' },
                  { title: 'County Information Pack', desc: 'Information for county officials and coordinators', size: '5.7 MB', date: 'Jan 22, 2025', iconColor: 'text-red-600', bgColor: 'bg-red-100', btnColor: 'from-red-500 to-red-600' }
                ].map((doc, idx) => (
                  <div key={idx} className="p-6 hover:bg-gray-50 transition-colors duration-200 group">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 ${doc.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <svg className={`w-6 h-6 ${doc.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{doc.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{doc.desc}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span className="flex items-center"><span className="mr-1">📄</span> PDF • {doc.size}</span>
                            <span className="flex items-center"><span className="mr-1">📅</span> Updated: {doc.date}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const content = `${doc.title}\n\n${doc.desc}\nUpdated: ${doc.date}\nSize: ${doc.size}`;
                          const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `${doc.title.replace(/\\s+/g, '_').toLowerCase()}.txt`;
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                          URL.revokeObjectURL(url);
                        }}
                        className={`bg-gradient-to-r ${doc.btnColor} hover:opacity-90 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 w-full md:w-auto justify-center shadow-md`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
