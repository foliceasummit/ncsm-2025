'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  Trophy, 
  Users, 
  Heart, 
  Target, 
  Award, 
  Globe, 
  Calendar,
  MapPin,
  Star,
  Shield,
  Flag,
  Users2,
  Radio,
  Eye,
  History,
  Medal,
  ArrowRight,
  Play,
  ChevronRight
} from 'lucide-react';

const AboutUs = () => {
  const champions = [
    { year: "1956", county: "Maryland County" },
    { year: "1969", county: "Grand Cape Mount County" },
    { year: "1974", county: "Grand Kru County" },
    { year: "1977", county: "Grand Kru County" },
    { year: "1978", county: "Nimba County" },
    { year: "1979", county: "Nimba County" },
    { year: "1985", county: "Grand Kru County" },
    { year: "1987", county: "Grand Kru County" },
    { year: "1989", county: "Grand Gedeh County" },
    { year: "1990", county: "Grand Bassa County" },
    { year: "2004", county: "Gbarpolu County" },
    { year: "2007", county: "Rivercess County" },
    { year: "2008", county: "Bong County" },
    { year: "2009", county: "Bomi County" },
    { year: "2010", county: "Nimba County" },
    { year: "2011", county: "Nimba County" },
    { year: "2012", county: "Margibi County" },
    { year: "2013", county: "Grand Cape Mount County" },
    { year: "2014", county: "Grand Bassa County" },
    { year: "2015", county: "Cancelled (Ebola epidemic)" },
    { year: "2016", county: "Grand Bassa County" },
    { year: "2017", county: "Maryland County" },
    { year: "2018", county: "Montserrado County" },
    { year: "2019", county: "Bomi County" },
    { year: "2020", county: "Grand Kru County" },
    { year: "2021", county: "Lofa County" },
    { year: "2022", county: "Nimba County" },
    { year: "2023", county: "Nimba County" },
    { year: "2024", county: "River Gee County" },
    { year: "2025", county: "Lofa County" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center text-white"
          >
            
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
            >
              About NCSM
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed"
            >
              Discover the story behind Liberia's biggest sporting festival and our mission to unite the nation through sports excellence.
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Overview Section */}
      <section className="py-16 bg-white relative">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Overview</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              The Liberian National County Sports Meet (NCSM) is Liberia's premier knockout county football tournament, 
              inaugurated in 1956. It is an annual sporting festival organized by the Ministry of Youth and Sports (MYS) 
              in collaboration with the Ministry of Internal Affairs (MIA).
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-6">A Legacy of Unity</h3>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                The event is primarily a platform for national unity and reconciliation, bringing together communities 
                from all 15 counties. The NCSM is the most-watched football tournament in Liberia, with over 
                1.5 million fans following matches via radio, online platforms, and stadium attendance.
              </p>
              <div className="space-y-6">
                {[
                  { icon: Radio, text: "1.5+ million fans following via radio" },
                  { icon: Eye, text: "Massive online and stadium attendance" },
                  { icon: Heart, text: "Uniting all 15 counties through sports" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center group"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors">
                      <item.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-gray-700 text-lg">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-6">Founded in 1956</h3>
                  <p className="text-blue-100 mb-8 text-lg leading-relaxed">
                    Established by former President William V.S. Tubman, the NCSM has been a cornerstone of 
                    Liberian sports culture for over 65 years, promoting unity and excellence across the nation.
                  </p>
                  <div className="space-y-4">
                    {[
                      { icon: History, text: "65+ years of tradition" },
                      { icon: Flag, text: "All 15 counties participate" },
                      { icon: Trophy, text: "Premier football tournament" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center">
                        <item.icon className="w-6 h-6 mr-4 text-blue-200" />
                        <span className="text-lg">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 relative">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              <div className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-100 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-purple-100 rounded-full translate-y-8 -translate-x-8"></div>
                
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                    <Star className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Founder</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                    <strong>William V.S. Tubman</strong>, former President of Liberia, established the National County 
                    Sports Meet in 1956 as a platform for national unity and reconciliation. His vision continues 
                    to inspire generations of Liberians through sports excellence.
                  </p>
                  <div className="space-y-4">
                    {[
                      { icon: Star, text: "Established NCSM in 1956" },
                      { icon: Heart, text: "Vision for national unity" },
                      { icon: Target, text: "Legacy of sports excellence" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center">
                        <item.icon className="w-5 h-5 text-blue-600 mr-4" />
                        <span className="text-gray-700 text-lg">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative order-1 lg:order-2"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl transform rotate-3 scale-105 opacity-20"></div>
                <div className="relative h-[600px] bg-gray-100 rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://ik.imagekit.io/foliceasummit/mysncsm/William%20V.S.%20Tubman.jpg?updatedAt=1756759918586"
                    alt="William V.S. Tubman - Founder of NCSM"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Competition Format Section */}
      <section className="py-12 bg-white">
        <div className="container-custom">
                     <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             viewport={{ once: true }}
             className="text-center mb-8"
           >

             <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Competition Format</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-green-600 to-blue-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Understanding how the tournament structure works
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-10 h-10" />,
                title: "Group Stage",
                description: "The tournament begins with 15 county teams divided into four groups (three groups of 4 teams, one group of 3). Each team plays all other teams in its group; the top team and runner-up advance to the next round.",
                color: "blue"
              },
              {
                icon: <Trophy className="w-10 h-10" />,
                title: "Quarterfinals & Beyond",
                description: "The draw is entirely random, without association protection. Teams compete in knockout format until the final champion is determined.",
                color: "purple"
              },
              {
                icon: <Calendar className="w-10 h-10" />,
                title: "Duration",
                description: "Typically completed within a month unless exceptional circumstances occur. The tournament brings intense competition and excitement across Liberia.",
                color: "green"
              }
            ].map((format, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl transform rotate-1 scale-105 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                                 <div className="relative bg-white rounded-3xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                  <div className={`text-${format.color}-600 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {format.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{format.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{format.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Champions Section */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container-custom">
                     <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             viewport={{ once: true }}
             className="text-center mb-8"
           >

             <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">List of Champions</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-yellow-600 to-orange-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Celebrating the counties that have lifted the prestigious NCSM trophy
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto custom-scrollbar">
                  {champions.map((champion, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-100 hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <div className="text-xl font-bold text-blue-600 mb-1">{champion.year}</div>
                      <div className="text-sm text-gray-700 font-medium">{champion.county}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl transform -rotate-3 scale-105 opacity-20"></div>
                <div className="relative h-[500px] bg-gray-100 rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://ik.imagekit.io/foliceasummit/mysncsm/images%20(2).jpg?updatedAt=1756760302505"
                    alt="NCSM Trophies"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Historical Highlights Section */}
      <section className="py-12 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-custom relative z-10">
                     <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             viewport={{ once: true }}
             className="text-center mb-8"
           >

             <h2 className="text-2xl md:text-3xl font-bold mb-3">Historical Highlights</h2>
            <div className="w-20 h-1 bg-white mx-auto mb-4"></div>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Notable achievements and memorable moments in NCSM history
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Trophy className="w-10 h-10" />,
                title: "Nimba County",
                description: "Most titles (6) and most finals appearances",
                stat: "6 Titles"
              },
              {
                icon: <Medal className="w-10 h-10" />,
                title: "Grand Kru County",
                description: "5 titles, undefeated in finals",
                stat: "5 Titles"
              },
              {
                icon: <Award className="w-10 h-10" />,
                title: "Montserrado County",
                description: "Most final losses (5)",
                stat: "5 Finals"
              },
              {
                icon: <Star className="w-10 h-10" />,
                title: "Sasstown Territory",
                description: "1970 champions with legendary players",
                stat: "1970"
              }
            ].map((highlight, index) => (
                             <motion.div
                 key={index}
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.6, delay: index * 0.1 }}
                 viewport={{ once: true }}
                 className="group relative"
               >
                                  <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 transform group-hover:scale-105">
                   <div className="text-blue-200 mb-4 group-hover:scale-110 transition-transform duration-300">
                     {highlight.icon}
                   </div>
                   <h3 className="text-lg font-bold mb-2">{highlight.title}</h3>
                   <p className="text-blue-100 text-sm">{highlight.description}</p>
                 </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-12 bg-white">
        <div className="container-custom">
                     <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             viewport={{ once: true }}
             className="text-center mb-8"
           >

             <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Impact & Audience</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-orange-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The NCSM's profound impact on Liberian society and sports culture
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Radio className="w-10 h-10" />,
                title: "Massive Reach",
                description: "Millions of Liberians tune in via radio, online sources, and live stadium attendance.",
                color: "red"
              },
              {
                icon: <Trophy className="w-10 h-10" />,
                title: "Major Sponsorship",
                description: "The event attracts major sponsors, including deals such as the $80,000 ArcelorMittal sponsorship for 2023/24.",
                color: "purple"
              },
              {
                icon: <Calendar className="w-10 h-10" />,
                title: "Annual Tradition",
                description: "Continues to be Liberia's biggest sporting festival, promoting healthy competition, national pride, and unity.",
                color: "blue"
              }
            ].map((impact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                                 <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                  <div className={`text-${impact.color}-600 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {impact.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{impact.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{impact.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-8 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container-custom relative z-10">
                     <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             viewport={{ once: true }}
             className="text-center mb-8"
           >

             <h2 className="text-2xl md:text-3xl font-bold mb-3">NCSM by the Numbers</h2>
            <div className="w-20 h-1 bg-white mx-auto mb-4"></div>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Impressive statistics that showcase the scale and impact of our tournament
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "15", label: "Counties", icon: <Flag className="w-10 h-10" /> },
              { number: "1.5M+", label: "Fans", icon: <Users className="w-10 h-10" /> },
              { number: "65+", label: "Years", icon: <Trophy className="w-10 h-10" /> },
              { number: "34", label: "Days Duration", icon: <Calendar className="w-10 h-10" /> }
            ].map((stat, index) => (
                             <motion.div
                 key={index}
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.6, delay: index * 0.1 }}
                 viewport={{ once: true }}
                 className="text-center group"
               >
                                  <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 transform group-hover:scale-105">
                   <div className="text-blue-200 mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                     {stat.icon}
                   </div>
                   <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                   <div className="text-blue-100 font-medium text-base">{stat.label}</div>
                 </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >

                         <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to Experience NCSM 2025?</h2>
            <div className="w-20 h-1 bg-white mx-auto mb-4"></div>
            <p className="text-lg text-blue-200 mb-6 max-w-2xl mx-auto leading-relaxed">
              Join us for the most exciting sporting event in Liberia's history. 
              Get your tickets, support your county, and be part of something extraordinary.
            </p>
                         <div className="flex flex-col sm:flex-row gap-6 justify-center">
               <a href="/tickets" className="bg-white text-blue-900 hover:bg-blue-50 font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center">
                 Get Tickets
                 <ArrowRight className="w-5 h-5 ml-2" />
               </a>
               <a href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                 Contact
                 <ChevronRight className="w-5 h-5 ml-2" />
               </a>
             </div>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2563eb;
        }
      `}</style>
    </div>
  );
};

export default AboutUs;
