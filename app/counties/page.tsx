'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Navigation from '../components/layout/Navigation'

const counties = [
     {
     id: 1,
     name: 'Montserrado',
     group: 'A',
     flag: 'https://ik.imagekit.io/foliceasummit/mysncsm/Counties%20Flag/Montserrado_County.png?updatedAt=1756427586924',
     superintendent: 'Hon. Whroway Bryant',
     parentCounty: 'None (original)',
     ncsmRecord: 'Montserrado has won the NCSM multiple times, including 2007, 2011, 2017, and 2022.',
     history: 'Montserrado County is the smallest but most populous county of Liberia. It has a land area of 1,912 square kilometers and a population of 1,144,806 (2008 census). The county was founded in 1822, and its capital is Monrovia. Montserrado is divided into four districts.',
     ncsmHistory: 'Montserrado has won the NCSM championship 8 times, with their most recent victory in 2022. The county is known for its strong football and athletics programs.',
     achievements: ['8-time NCSM Champions', 'Strong Football Program', 'Athletics Excellence']
   },
  {
    id: 2,
    name: 'Bong',
    group: 'B',
    flag: 'https://ik.imagekit.io/foliceasummit/mysncsm/Counties%20Flag/Bong_County.png?updatedAt=1756427581521',
    superintendent: 'Hawa Loleyah Norris',
    parentCounty: 'Montserrado',
    ncsmRecord: 'Bong has a proud sports tradition, with consistent semifinal appearances.',
    history: 'Bong County is centrally located in Liberia. It has a land area of 8,772 square kilometers and a population of 328,919 (2008 census). The county was founded in 1964, and its capital is Gbarnga. Bong is divided into 12 districts.',
    ncsmHistory: 'Bong County has been a consistent performer in NCSM, winning 3 championships and finishing in the top 5 for the past decade. They excel in volleyball and basketball.',
    achievements: ['3-time NCSM Champions', 'Volleyball Champions', 'Basketball Excellence']
  },
     {
     id: 3,
     name: 'Nimba',
     group: 'A',
     flag: 'https://ik.imagekit.io/foliceasummit/mysncsm/Counties%20Flag/Nimba.png?updatedAt=1756427586970',
     superintendent: 'Mah Meapeh Kou Gono',
     parentCounty: 'Montserrado',
     ncsmRecord: 'Nimba has won the NCSM several times, including 2010, 2014, and 2021.',
     history: 'Nimba County is one of Liberia\'s largest and most competitive counties. It has a surface area of 11,551 square kilometers and a population of 462,026 (2008 census). The county was founded in 1964, and its capital is Sanniquellie. Nimba is divided into 17 districts.',
     ncsmHistory: 'Nimba County has won 5 NCSM championships and is particularly strong in football and kickball. The county has produced many national team players.',
     achievements: ['5-time NCSM Champions', 'Football Powerhouse', 'Kickball Champions']
   },
  {
    id: 4,
    name: 'Grand Bassa',
    group: 'C',
    flag: 'https://ik.imagekit.io/foliceasummit/mysncsm/Counties%20Flag/Grand_Bassa.png?updatedAt=1756427581433',
    superintendent: 'Karyou Johnson',
    parentCounty: 'Montserrado',
    ncsmRecord: 'Grand Bassa won the NCSM in 2005 and remains a competitive football county.',
    history: 'Grand Bassa County is situated along the central coast of Liberia. It has a land area of 7,936 square kilometers and a population of 224,839 (2008 census). Founded in 1833, the county\'s capital is Buchanan. Grand Bassa is divided into eight districts.',
    ncsmHistory: 'Grand Bassa has won 4 NCSM championships and is known for its strong female soccer program and athletics team.',
    achievements: ['4-time NCSM Champions', 'Female Soccer Champions', 'Athletics Excellence']
  },
     {
     id: 5,
     name: 'Lofa',
     group: 'B',
     flag: 'https://ik.imagekit.io/foliceasummit/mysncsm/Counties%20Flag/Lofa_County.png?updatedAt=1756427585768',
     superintendent: 'J Lavala Massaquoi',
     parentCounty: 'None (original)',
     ncsmRecord: 'Lofa won the NCSM in 2013 and is known for passionate fan support.',
     history: 'Lofa County is located in the northernmost region of Liberia. It covers 9,982 square kilometers and has a population of 270,114 (2008 census). The county was founded in 1964, and its capital is Voinjama. Lofa is divided into six districts.',
     ncsmHistory: 'Lofa County has won 2 NCSM championships and is particularly strong in basketball and volleyball. The county emphasizes youth sports development.',
     achievements: ['2-time NCSM Champions', 'Basketball Champions', 'Youth Development']
   },
  {
    id: 6,
    name: 'Grand Cape Mount',
    group: 'C',
    flag: 'https://ik.imagekit.io/foliceasummit/mysncsm/Counties%20Flag/Grand_Cape_Mount_County..png?updatedAt=1756427582121',
    superintendent: 'Foley Kiatamba',
    parentCounty: 'Montserrado',
    ncsmRecord: 'Grand Cape Mount is best remembered for its spirited performances in early editions of the NCSM.',
    history: 'Grand Cape Mount is located in the western region of Liberia. It covers 5,162 square kilometers with a population of 129,055 (2008 census). The county was founded in 1856, and its capital is Robertsport. It is divided into five districts.',
    ncsmHistory: 'Grand Cape Mount has shown consistent improvement in recent NCSM competitions.',
    achievements: ['Rising Football Program', 'Community Sports Development']
  },
  {
    id: 7,
    name: 'Bomi',
    group: 'D',
    flag: 'https://ik.imagekit.io/foliceasummit/mysncsm/Counties%20Flag/Bomi.png?updatedAt=1756427580872',
    superintendent: 'Madam Miatta Dorley',
    parentCounty: 'Montserrado',
    ncsmRecord: 'Bomi has won the NCSM twice (2009, 2019) and is known for strong knockout performances.',
    history: 'Bomi is one of the fifteen counties of Liberia. The county is located in the northwestern part of the country. Bomi County has a surface area of 1,942 square kilometers and a population of 82,036 according to 2008 population data. The county was founded in 1984, and its capital is Tubmanburg. Bomi is divided into four districts.',
    ncsmHistory: 'Bomi County has been developing its sports infrastructure and youth programs.',
    achievements: ['Youth Development Focus', 'Community Engagement']
  },
     {
     id: 8,
     name: 'Margibi',
     group: 'A',
     flag: 'https://ik.imagekit.io/foliceasummit/mysncsm/Counties%20Flag/margibi.png?updatedAt=1756427585894',
     superintendent: 'O. Jay Morris',
     parentCounty: 'Montserrado',
     ncsmRecord: 'Margibi won the 2012 edition of the NCSM and remains a powerhouse.',
     history: 'Margibi County is located in central Liberia. It has a surface area of 2,866 square kilometers and a population of 209,923 (2008 census). The county was founded in 1984, and its capital is Kakata. Margibi is divided into four districts.',
     ncsmHistory: 'Margibi has been a consistent participant in NCSM with growing sports programs.',
     achievements: ['Growing Sports Programs', 'Industrial Heritage']
   },
     {
     id: 9,
     name: 'River Cess',
     group: 'D',
     flag: 'https://ik.imagekit.io/foliceasummit/mysncsm/Counties%20Flag/Rivercess_County.png?updatedAt=1756427587968',
     superintendent: 'J. Bismark Karbiah',
     parentCounty: 'Grand Bassa',
     ncsmRecord: 'Rivercess is remembered for its strong showings in group stages.',
     history: 'Rivercess County is located in central Liberia along the Atlantic coast. It has a land area of 5,594 square kilometers and a population of 71,509 (2008 census). The county was founded in 1984, and its capital is Cestos City. Rivercess is divided into two districts.',
     ncsmHistory: 'River Cess has been building its sports infrastructure and community programs.',
     achievements: ['Agricultural Heritage', 'Community Development']
   },
     {
     id: 10,
     name: 'Grand Gedeh',
     group: 'C',
     flag: 'https://ik.imagekit.io/foliceasummit/mysncsm/Counties%20Flag/Grand_Gedeh_County.png?updatedAt=1756427582316',
     superintendent: 'Alex C. Grant',
     parentCounty: 'Sinoe',
     ncsmRecord: 'Grand Gedeh reached the finals in 2006 and is noted for producing talented midfielders.',
     history: 'Grand Gedeh County is located in the southeastern region of Liberia. It has a surface area of 10,484 square kilometers and a population of 126,146 (2008 census). Founded in 1964, its capital is Zwedru. Grand Gedeh is divided into three districts.',
     ncsmHistory: 'Grand Gedeh has shown strong community spirit in sports competitions.',
     achievements: ['Cultural Heritage', 'Community Spirit']
   },
     {
     id: 11,
     name: 'Sinoe',
     group: 'B',
     flag: 'https://ik.imagekit.io/foliceasummit/mysncsm/Counties%20Flag/Sinoe_County.png?updatedAt=1756427587986',
     superintendent: 'Alexander Nah',
     parentCounty: 'Grand Bassa',
     ncsmRecord: 'Sinoe reached the finals in 2011 and continues to showcase emerging talent.',
     history: 'Sinoe County is located in southeastern Liberia. It has a land area of 10,137 square kilometers and a population of 102,391 (2008 census). The county was founded in 1838, and its capital is Greenville. Sinoe is divided into 17 districts.',
     ncsmHistory: 'Sinoe has been developing its sports programs and youth engagement.',
     achievements: ['Coastal Heritage', 'Youth Engagement']
   },
     {
     id: 12,
     name: 'Maryland',
     group: 'D',
     flag: 'https://ik.imagekit.io/foliceasummit/mysncsm/Counties%20Flag/Maryland_County.png?updatedAt=1756427587986',
     superintendent: 'Hon. Henry Cole',
     parentCounty: 'Montserrado',
     ncsmRecord: 'Maryland won the NCSM in 2006 and is known for its football tradition.',
     history: 'Maryland County is located in the southeastern corner of Liberia. It has a surface area of 2,297 square kilometers and a population of 135,938 (2008 census). The county was founded in 1857, and its capital is Harper. Maryland is divided into three districts.',
     ncsmHistory: 'Maryland has a strong tradition of academic and sports excellence.',
     achievements: ['Educational Excellence', 'Cultural Diversity']
   },
  {
    id: 13,
    name: 'Grand Kru',
    group: 'A',
    flag: 'https://ik.imagekit.io/foliceasummit/mysncsm/Counties%20Flag/Grand_Kru_County.png?updatedAt=1756427582433',
    superintendent: 'Hon. Rosalind Sneh',
    parentCounty: 'Maryland',
    ncsmRecord: 'Grand Kru is known for determination and has developed strong youth players.',
    history: 'Grand Kru County is situated in southeastern Liberia. It has a land area of 3,895 square kilometers and a population of 57,106 (2008 census). The county was founded in 1984, and its capital is Barclayville. Grand Kru is divided into two districts.',
    ncsmHistory: 'Grand Kru has been building its sports infrastructure and community programs.',
    achievements: ['Coastal Communities', 'Community Programs']
  },
     {
     id: 14,
     name: 'River Gee',
     group: 'B',
     flag: 'https://ik.imagekit.io/foliceasummit/mysncsm/Counties%20Flag/River_Gee_County.png?updatedAt=1756427587799',
     superintendent: 'Mike T. Swengbe',
     parentCounty: 'Grand Gedeh',
     ncsmRecord: 'River Gee is growing in competitiveness, with spirited underdog performances.',
     history: 'River Gee County is located in southeastern Liberia. It covers 5,113 square kilometers and has a population of 66,789 (2008 census). The county was founded in 2000, and its capital is Fish Town. River Gee is divided into 10 districts.',
     ncsmHistory: 'River Gee has been rapidly developing its sports programs and youth engagement.',
     achievements: ['Newest County', 'Rapid Development']
   },
     {
     id: 15,
     name: 'Gbarpolu',
     group: 'C',
     flag: 'https://ik.imagekit.io/foliceasummit/mysncsm/Counties%20Flag/Gbarpolu_County.png?updatedAt=1756427581732',
     superintendent: 'Hon. Sam K. Zinnah',
     parentCounty: 'Lofa',
     ncsmRecord: 'Gbarpolu has shown resilience in group stages, often upsetting bigger counties.',
     history: 'Gbarpolu County is located in northwestern Liberia. It was established in 2001, making it the youngest county in Liberia. The county has a surface area of 9,689 square kilometers and a population of 83,758 (2008 census). Its capital is Bopolu. The county is divided into five districts.',
     ncsmHistory: 'Gbarpolu has been developing its sports infrastructure and community programs.',
     achievements: ['Agricultural Activities', 'Natural Resources']
   }
]

const countyGroups = {
  'A': ['Montserrado', 'Nimba', 'Margibi', 'Grand Kru'],
  'B': ['Bong', 'Lofa', 'Sinoe', 'River Gee'],
  'C': ['Grand Bassa', 'Grand Cape Mount', 'Grand Gedeh', 'Gbarpolu'],
  'D': ['Bomi', 'River Cess', 'Maryland']
}

export default function CountiesPage() {
  const [selectedGroup, setSelectedGroup] = useState('A')
  
  const filteredCounties = counties.filter(county => county.group === selectedGroup)

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
             <motion.div
               className="absolute bottom-20 left-20 w-48 h-48 bg-white/3 rounded-full blur-2xl"
               animate={{ 
                 scale: [1, 1.3, 1],
                 rotate: [360, 0, 360]
               }}
               transition={{ 
                 duration: 25,
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
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Meet Our{' '}
                <span className="text-gradient bg-gradient-to-r from-primary-300 to-secondary-300 bg-clip-text text-transparent">
                  Counties
                </span>
              </motion.h1>

              <motion.p 
                className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                Discover the rich history, culture, and sporting excellence of Liberia's 15 counties participating in the National County Sports Meet
              </motion.p>
            </motion.div>
          </div>
        </section>

                 {/* Group Selection */}
         <section className="py-12 bg-gradient-to-br from-gray-50 to-white">
           <div className="container-custom">
             <motion.div
               className="text-center mb-12"
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
               viewport={{ once: true }}
             >
               <h2 className="text-3xl font-bold text-gray-900 mb-6">Select Group to View Counties</h2>
               <div className="flex flex-wrap justify-center gap-6">
                 {['A', 'B', 'C', 'D'].map((group) => (
                   <motion.button
                     key={group}
                     onClick={() => setSelectedGroup(group)}
                     className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg ${
                       selectedGroup === group
                         ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-xl'
                         : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-primary-300'
                     }`}
                     whileHover={{ y: -2 }}
                     whileTap={{ scale: 0.95 }}
                   >
                     Group {group}
                   </motion.button>
                 ))}
               </div>
             </motion.div>
           </div>
         </section>

                 {/* Counties Grid */}
         <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
           <div className="container-custom">
             <motion.div
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               viewport={{ once: true }}
             >
               {filteredCounties.map((county, index) => (
                 <motion.div
                   key={county.id}
                   className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.6, delay: index * 0.1 }}
                   viewport={{ once: true }}
                   whileHover={{ y: -8 }}
                 >
                   {/* County Flag */}
                   <div className="relative h-56 bg-gradient-to-br from-primary-100 to-secondary-100 overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-secondary-600/20"></div>
                     <div className="relative h-full flex items-center justify-center p-6">
                       <div className="relative w-56 h-40 bg-white rounded-xl shadow-2xl overflow-hidden border-4 border-white transform transition-transform duration-300 hover:scale-105">
                         <Image
                           src={county.flag}
                           alt={`${county.name} County Flag`}
                           fill
                           className="object-cover"
                           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                           onError={(e) => {
                             const target = e.target as HTMLImageElement;
                             target.style.display = 'none';
                             const parent = target.parentElement;
                             if (parent) {
                               parent.innerHTML = '<div class="flex items-center justify-center h-full text-4xl">🏁</div>';
                             }
                           }}
                         />
                       </div>
                     </div>
                     {/* Flag Pole Effect */}
                     <div className="absolute left-6 top-0 bottom-0 w-1.5 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full"></div>
                   </div>

                                     {/* County Info */}
                   <div className="p-8">
                     <div className="flex items-center justify-between mb-4">
                       <h3 className="text-2xl font-bold text-gray-900">{county.name}</h3>
                       <span className={`px-4 py-2 rounded-full text-sm font-semibold shadow-md ${
                         county.group === 'A' ? 'bg-gradient-to-r from-red-100 to-red-200 text-red-700 border border-red-300' :
                         county.group === 'B' ? 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border border-blue-300' :
                         county.group === 'C' ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-700 border border-green-300' :
                         'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 border border-purple-300'
                       }`}>
                         Group {county.group}
                       </span>
                     </div>
                     <p className="text-primary-600 font-semibold mb-6 text-lg">Superintendent: {county.superintendent}</p>
                     
                     <div className="space-y-6">
                       <div className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border border-gray-100">
                         <h4 className="font-bold text-gray-900 mb-3 text-lg">Brief History</h4>
                         <p className="text-gray-700 text-sm leading-relaxed text-justify">{county.history}</p>
                       </div>
                       
                       <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-4 rounded-xl border border-primary-100">
                         <h4 className="font-bold text-gray-900 mb-3 text-lg">NCSM Record</h4>
                         <p className="text-gray-700 text-sm leading-relaxed text-justify">{county.ncsmRecord}</p>
                       </div>
                     </div>
                   </div>
                </motion.div>
              ))}
            </motion.div>

                         {/* Group Overview */}
             <motion.div
               className="mt-20"
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.8 }}
               viewport={{ once: true }}
             >
               <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">Group Overview</h3>
               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                 {Object.entries(countyGroups).map(([group, groupCounties]) => (
                   <motion.div 
                     key={group} 
                     className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                     whileHover={{ y: -5 }}
                   >
                     <h3 className={`text-2xl font-bold mb-6 ${
                       group === 'A' ? 'text-red-600' :
                       group === 'B' ? 'text-blue-600' :
                       group === 'C' ? 'text-green-600' :
                       'text-purple-600'
                     }`}>
                       Group {group}
                     </h3>
                     <ul className="space-y-3">
                       {groupCounties.map((county, index) => (
                         <motion.li 
                           key={index} 
                           className="flex items-center text-gray-700 font-medium"
                           initial={{ opacity: 0, x: -10 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           transition={{ duration: 0.3, delay: index * 0.1 }}
                           viewport={{ once: true }}
                         >
                           <div className={`w-3 h-3 rounded-full mr-4 shadow-sm ${
                             group === 'A' ? 'bg-red-500' :
                             group === 'B' ? 'bg-blue-500' :
                             group === 'C' ? 'bg-green-500' :
                             'bg-purple-500'
                           }`}></div>
                           {county}
                         </motion.li>
                       ))}
                     </ul>
                   </motion.div>
                 ))}
               </div>
             </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}
