'use client'

import { motion } from 'framer-motion'
import Navigation from '../../components/layout/Navigation'

export default function OrganizingCommitteePage() {
  const sections = [
    {
      title: 'LOC/ SECRETARIAT COMMITTEE',
      members: [
        'Navarro M. Saykie, Sr - Chairman (NOC)',
        'Joe Nagbe - National Coordinator (LOC)',
        'Kesselee Kanneh - Head of Secretariat',
        'Mustapha Tiajini - Recorder',
        'Helena Wah - Member',
        'Josephine Coleman - Member'
      ]
    },
    {
      title: 'TECHNICAL AND COMPETITION COMMITTEE',
      members: [
        'Mr. J. Bryant Mcgill - Chairperson',
        'Wortor Anderson - Co-Chair',
        'Patrick Konuwa - Member',
        'Jacob Toe - Member',
        'Haysay M. Duworko - Member',
        'Aloysius Nimely - Member',
        'D. Gotolo Johnson - Member',
        'Kerkula Smythe - Member',
        'Cyrus Vaye - Member',
        'Teah Blay - Member',
        'Johnson Fridaye - Member',
        'LKF and LFA - Member',
        'James B. Toe - Ex. Officer'
      ]
    },
    {
      title: 'TECHNICAL WORKING GROUP',
      members: [
        'Tamba Foley - President Liberia National Old-timers',
        'Abraham Sarnon - Co-chair',
        'Henry Brown - Member',
        'Gborbor T. Gbleinwon - Member',
        'Oliver Markor - Member',
        'Tony Bracewel - Member'
      ]
    },
    {
      title: 'FINANCE COMMITTEE',
      members: [
        'Audrian Smith Forbes - Chairperson',
        'Hon. Famatta Bracewell - Co-Chairman',
        'Edna B. Nah - Secretary',
        'Audit Section - Member',
        'Budget Section - Member',
        'Miatta Zinnah - Member',
        'Joetta Bedell - Member',
        'Andy Quamie - Ex-official'
      ]
    },
    {
      title: 'PROTEST AND GRIEVANCE COMMITTEE',
      members: [
        'Neto Leighe - Chairperson',
        'Cllr: Samuel Pearson - Co-chairperson',
        'Kickball & Football Federations - Member',
        'Jlateh Sayor - Member',
        'Sidikie M. Bility - Member',
        'Kesselle Kanneh - Member'
      ]
    },
    {
      title: 'APPEAL COMMITTEE',
      members: [
        'Mustapha Rji - Co-chair',
        'Izetta Wesley - Member',
        'Sarfuah Mai Gray - Member',
        'J. Cole Bangalu - Member',
        'Hon. D. Zeogar Wilson - Ex-official'
      ]
    },
    {
      title: 'PROCUREMENT COMMITTEE',
      members: [
        'Procurement Section - Chairman',
        'Navarro Sackie Sr. - Co-Chair',
        'Joe Nagbe - Secretary',
        'Andy Quamie - Ex-official'
      ]
    },
    {
      title: 'INFORMATION TECHNOLOGY AND DATA MANAGEMENT',
      members: [
        'F. Tito Jackson - Chairman',
        'W. Praise Bloyuefloh - Co-Chairman',
        'Jeremiah Smith - Member',
        'Richard S. Benson - Member',
        'Lombeh N. Kamanda - Member'
      ]
    },
    {
      title: 'SECURITY COMMITTEE',
      members: [
        'Defense Ministry - Chairperson',
        'Liberia National Fire Service - Co-chair',
        'EPS - Member',
        'Master Pewu Russian Team - Member',
        'Liberia Scout Association - Member',
        'Pawalla Giant - Member',
        'Francis Boakai - Member'
      ]
    },
    {
      title: 'PUBLICITY COMMITTEE',
      members: [
        'Public Affair MYS - Chairperson',
        'Liberia Broadcasting Corporation - Co-Chairperson',
        'SWAL - Secretary',
        'Community Radio - Member',
        'Information Ministry - Ex-officio'
      ]
    },
    {
      title: 'MONITORING AND EVALUATION COMMITTEE',
      members: [
        'Samuel Jallah',
        'Bankole Babakunde',
        'Moses Gaypia',
        'Francis Agbon taen'
      ]
    },
    {
      title: 'SOCIAL RESPONSIBILITY AND WELFARE COMMITTEE',
      members: [
        'Madame Clar Marie Weah, First Lady - Chairperson',
        'Willliametta E. Saydee, Tarr - Gender Minister, Co-Chair',
        'Nyemale Pearson - Managing Director LPRC, Member',
        'Cecelia Cuffy Brown - DMDA NPA, Member',
        'Audrian Smith Forbes - DMA MoYS, Member',
        'Isatu Bah Kanneh - DMA Immigration, Member',
        'Andy Quamie - Ex official'
      ]
    },
    {
      title: 'MEDICAL COMMITTEE',
      members: [
        'Dr. Clarence Yaskey - Chairman',
        'Liberia National Red Cross - Member',
        'Ministry of Health - Member',
        'Liberia Sports Medicine Assoc. - Member',
        'Patrick Konuwa - Member'
      ]
    },
    {
      title: 'SUPPORT STAFF',
      members: [
        'Krubo W. Kokulo - Co. Chair',
        'Prince Dahn - Secretary',
        'Christiana Gray - Member',
        'Wellington Kerdoe - Expeditor',
        'Sonie D. Collins - Member',
        'Christine F. Mason - Member'
      ]
    },
    {
      title: 'TICKET COMMITTEE',
      members: [
        'Hon. Fametta Bracewell - Chairperson',
        'Assistant Minister for Sports - Co-Chairperson',
        'J. Bryant Mcgill - Secretary',
        'Edna S. Nah - Member',
        'Lorenzo Sumo - Member',
        'Internal audit - Member',
        'Yatu Cooper - Member',
        'Jennefer Brown - Member',
        'Hon. Andy Quamie - Ex-officio'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-primary">
      <Navigation />
      <main className="pt-16 lg:pt-20">
        <section className="py-12 bg-gradient-to-br from-red-900 via-white/10 to-blue-900">
          <div className="container-custom">
            <div className="text-center text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">NCSM Organizing Committee</h1>
              <p className="text-lg text-gray-200">Committee members and positions</p>
            </div>
          </div>
        </section>
        <section className="py-12 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sections.map((section, idx) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-md border border-gray-100 p-6"
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-3">{section.title}</h2>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    {section.members.map((m) => (
                      <li key={m} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-gradient-to-r from-red-500 to-blue-600 rounded-full mt-2 mr-3" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
