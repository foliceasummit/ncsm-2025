'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NoHydrationWrapper from './components/NoHydrationWrapper';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ArrowRight, Star, Users2, Trophy, Globe, Target, Award } from 'lucide-react';


const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [partnersSlide, setPartnersSlide] = useState(0);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isClient, setIsClient] = useState(false);

  const heroImages = [
    {
      url: 'https://ik.imagekit.io/foliceasummit/mysncsm/496784845_1269835095150738_841464044665993514_n.jpg?updatedAt=1756652252548',
      title: 'NCSM Event 1',
      description: 'National County Sports Meet 2025'
    },
    {
      url: 'https://ik.imagekit.io/foliceasummit/mysncsm/496844567_1269835491817365_1481792822351409750_n.jpg?updatedAt=1756652252908',
      title: 'NCSM Event 2',
      description: 'National County Sports Meet 2025'
    },
    {
      url: 'https://ik.imagekit.io/foliceasummit/mysncsm/496694489_1269913548476226_2422094397377560905_n.jpg?updatedAt=1756652252223',
      title: 'NCSM Event 3',
      description: 'National County Sports Meet 2025'
    }
  ];

  // Client-side detection
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Countdown timer logic
  useEffect(() => {
    if (!isClient) return;
    
    const targetDate = new Date('2025-12-15T00:00:00').getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        setCountdown({ days, hours, minutes, seconds });
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isClient]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  // NCSM Features
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Unite All 15 Counties",
      description: "Bring together all 15 counties of Liberia in a celebration of unity and sportsmanship."
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Showcase Athletic Excellence",
      description: "Display the best sporting talent from across Liberia in multiple disciplines."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Promote National Unity",
      description: "Foster stronger bonds between counties through friendly competition and cultural exchange."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Discover New Talent",
      description: "Identify and nurture emerging athletes who represent Liberia's sporting future."
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Cultural Celebration",
      description: "Celebrate Liberia's rich cultural diversity through sports and community engagement."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "International Recognition",
      description: "Put Liberia on the global sports map with world-class athletic competitions."
    }
  ];

  const sports = [
    {
      name: "Football",
      image: "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      description: "The most popular sport in Liberia"
    },
    {
      name: "Basketball",
      image: "https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      description: "Fast-paced action and teamwork"
    },
    {
      name: "Athletics",
      image: "https://images.pexels.com/photos/1618269/pexels-photo-1618269.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      description: "Track and field excellence"
    }
  ];

  const partners = [
    { name: 'Government of Liberia', logo: 'https://ik.imagekit.io/foliceasummit/mysncsm/Seal%20of%20Liberia.png?updatedAt=1756427577634', url: 'https://liberia.gov.lr/' },
    { name: 'Ministry of Internal Affairs', logo: 'https://ik.imagekit.io/foliceasummit/mysncsm/MIA%20Logo.png?updatedAt=1756427576208', url: 'https://liberia.gov.lr/' },
    { name: 'Liberia Football Association (LFA)', logo: 'https://ik.imagekit.io/foliceasummit/mysncsm/images.png?updatedAt=1756653282045', url: 'https://liberia.gov.lr/' },
    { name: 'Liberia Kickball Association', logo: 'https://ik.imagekit.io/foliceasummit/mysncsm/images.png?updatedAt=1756653282045', url: 'https://liberia.gov.lr/' },
    { name: 'Liberia Basketball Association', logo: 'https://ik.imagekit.io/foliceasummit/mysncsm/images.png?updatedAt=1756653282045', url: 'https://liberia.gov.lr/' },
    { name: 'Liberia Volleyball Association', logo: 'https://ik.imagekit.io/foliceasummit/mysncsm/images.png?updatedAt=1756653282045', url: 'https://liberia.gov.lr/' },
  ];

  const sponsors = [
    { name: 'Orange Liberia', logo: 'https://ik.imagekit.io/foliceasummit/mysncsm/orange%20logo.png?updatedAt=1756650605644', url: 'https://orange.com' },
    { name: 'Doxxbet', logo: 'https://ik.imagekit.io/foliceasummit/mysncsm/Doxxbet%20logo.jpg?updatedAt=1756650605168', url: 'https://doxxbet.com' },
    { name: 'APM Terminals', logo: 'https://ik.imagekit.io/foliceasummit/mysncsm/APM%20logo.png?updatedAt=1756650604903', url: 'https://apmterminals.com' },
    { name: 'ArcelorMittal', logo: 'https://ik.imagekit.io/foliceasummit/mysncsm/Logo-ArcelorMittal-PNG.png?updatedAt=1756427575203', url: 'https://arcelormittal.com' },
  ];

  return (
    <NoHydrationWrapper>
      <div suppressHydrationWarning={true}>
      <div className="h-20" />
      <div className="w-full h-[2px] bg-gradient-to-r from-primary-600 via-gray-200 to-secondary-600" />
      <section className="relative">
        <div className="relative w-full h-[60vh] overflow-hidden">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            >
              <Image src={image.url} alt={image.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/30" />
            </div>
          ))}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white px-4">
            <div className="text-center mb-4 sm:mb-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-2">
                National County Sports Meet 2025
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/90 font-medium">
                The Pride of Our Counties, The Spirit of Liberia
              </p>
            </div>
            {isClient && (
              <div className="mb-4 sm:mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 md:p-6 max-w-2xl mx-auto border border-white/20">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-5">Kickoff Countdown</h3>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center group">
                      <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 group-hover:text-yellow-300 group-hover:scale-110 transition-all duration-300">{countdown.days}</div>
                      <div className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">DAYS</div>
                    </div>
                    <div className="text-center group">
                      <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 group-hover:text-yellow-300 group-hover:scale-110 transition-all duration-300">{countdown.hours.toString().padStart(2, '0')}</div>
                      <div className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">HOURS</div>
                    </div>
                    <div className="text-center group">
                      <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 group-hover:text-yellow-300 group-hover:scale-110 transition-all duration-300">{countdown.minutes.toString().padStart(2, '0')}</div>
                      <div className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">MINUTES</div>
                    </div>
                    <div className="text-center group">
                      <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 group-hover:text-yellow-300 group-hover:scale-110 transition-all duration-300">{countdown.seconds.toString().padStart(2, '0')}</div>
                      <div className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">SECONDS</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed mb-4 sm:mb-6">
              Don't miss Liberia's biggest sporting festival – where passion, pride, and county spirit come alive!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/counties"
                className="bg-red-600 hover:bg-red-700 text-white px-7 py-3 rounded-lg text-base font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Explore Counties
              </Link>
              <Link
                href="/results"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white px-7 py-3 rounded-lg text-base font-semibold transition-all duration-300 transform hover:scale-105"
              >
                View Results
              </Link>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-6 flex justify-center gap-2">
            {heroImages.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setCurrentSlide(i)}
                className={`w-2.5 h-2.5 rounded-full ${i === currentSlide ? 'bg-white' : 'bg-white/50'}`}
              />
            ))}
          </div>
          <button
            aria-label="Previous slide"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-md"
          >
            ‹
          </button>
          <button
            aria-label="Next slide"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-md"
          >
            ›
          </button>
        </div>
      </section>

             {/* Event Details Section */}
       <section className="py-4 sm:py-6 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-6"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
              Event Details
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center"
            >
              <Calendar className="w-6 h-6 mx-auto mb-2 text-white/90" />
              <h3 className="text-base sm:text-lg font-semibold mb-1">Date & Time</h3>
              <p className="text-xs sm:text-sm text-white/90">Dec. 15 , 2025 - Jan. 17, 2026</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center"
            >
              <MapPin className="w-6 h-6 mx-auto mb-2 text-white/90" />
              <h3 className="text-base sm:text-lg font-semibold mb-1">Venue</h3>
              <p className="text-xs sm:text-sm text-white/90">SKD Sports Complex, Paynesville City</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center"
            >
              <Users className="w-6 h-6 mx-auto mb-2 text-white/90" />
              <h3 className="text-base sm:text-lg font-semibold mb-1">Participants</h3>
              <p className="text-xs sm:text-sm text-white/90">All 15 Counties of Liberia</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About NCSM Section */}
      <section className="section-padding bg-white pt-10 sm:pt-14">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Welcome to the National County Sports Meet
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              The National County Sports Meet is Liberia's premier sporting event that brings together all 15 counties in a celebration of athletic excellence, unity, and community spirit.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-red-50 to-blue-50 rounded-2xl p-6 md:p-8 mb-10 border border-blue-100"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
              "Celebrating Talent, Inspiring Unity"
            </h3>
            <p className="text-base text-gray-700 text-center max-w-3xl mx-auto">
              Showcasing Liberia's finest athletes and rich cultural traditions.
            </p>
          </motion.div>

          <div className="text-center">
            <Link href="/about" className="btn-primary text-base px-7 py-3">
              Learn More About NCSM
            </Link>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-8 sm:py-10 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-6 sm:mb-8"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Our Mission
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              To unite Liberia through sports excellence and foster national pride across all 15 counties.
            </p>
          </motion.div>

                       <div className="max-w-6xl mx-auto">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               {/* Left Column - First 3 items */}
               <div className="space-y-3">
                 {features.slice(0, 3).map((feature, index) => (
                   <motion.div
                     key={index}
                     initial={{ opacity: 0, x: -20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.6, delay: index * 0.1 }}
                     viewport={{ once: true }}
                     className="flex items-start space-x-4 bg-white rounded-lg p-4 shadow-md"
                   >
                     <div className="flex-shrink-0 text-primary-600 mt-1">
                       {feature.icon}
                     </div>
                     <div>
                       <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                         {feature.title}
                       </h3>
                       <p className="text-gray-600 text-xs sm:text-sm">
                         {feature.description}
                       </p>
                     </div>
                   </motion.div>
                 ))}
               </div>
               
               {/* Right Column - Last 3 items */}
               <div className="space-y-3">
                 {features.slice(3, 6).map((feature, index) => (
                   <motion.div
                     key={index + 3}
                     initial={{ opacity: 0, x: 20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.6, delay: (index + 3) * 0.1 }}
                     viewport={{ once: true }}
                     className="flex items-start space-x-4 bg-white rounded-lg p-4 shadow-md"
                   >
                     <div className="flex-shrink-0 text-primary-600 mt-1">
                       {feature.icon}
                     </div>
                     <div>
                       <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                         {feature.title}
                       </h3>
                       <p className="text-gray-600 text-xs sm:text-sm">
                         {feature.description}
                       </p>
                     </div>
                   </motion.div>
                 ))}
               </div>
             </div>
           </div>
         </div>
       </section>

      

             {/* Become a Sponsor Section */}
       <section className="py-4 sm:py-6 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Become a Sponsor
            </h2>
            <p className="text-lg max-w-3xl mx-auto">
              Support Liberia's premier sporting event and gain valuable exposure to our network of athletes, officials, and sports enthusiasts.
            </p>
          </motion.div>

                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Users2 className="w-12 h-12 mx-auto mb-3 text-white/80" />
              <h3 className="text-xl font-semibold mb-2">National Reach</h3>
              <p className="text-white/80 text-sm">Connect with all 15 counties and their communities across Liberia</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Trophy className="w-12 h-12 mx-auto mb-3 text-white/80" />
              <h3 className="text-xl font-semibold mb-2">Sports Excellence</h3>
              <p className="text-white/80 text-sm">Associate your brand with Liberia's highest level of athletic competition</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Globe className="w-12 h-12 mx-auto mb-3 text-white/80" />
              <h3 className="text-xl font-semibold mb-2">National Unity</h3>
              <p className="text-white/80 text-sm">Support initiatives that bring together all counties in unity and celebration</p>
            </motion.div>
          </div>

                     <div className="text-center">
             <Link href="/contact" className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-2 px-4 rounded-lg text-sm transition-all duration-300 transform hover:scale-105">
               Sponsorship Opportunities
             </Link>
           </div>
        </div>
      </section>

      {/* Latest News preview */}
      <section className="py-10 bg-white">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Latest News</h2>
            <p className="text-gray-600">Read updates from the tournament</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{
              id:1,
              title:'County Registration Opens',
              image:'https://ik.imagekit.io/foliceasummit/mysncsm/APM-Terminals.jpg.gif?updatedAt=1756427571024',
              date:'2024-08-01'
            },{
              id:2,
              title:'New Venues Announced',
              image:'https://ik.imagekit.io/foliceasummit/mysncsm/images-1.jpg?updatedAt=1756427575553',
              date:'2024-07-28'
            },{
              id:3,
              title:'Montserrado Wins 2023',
              image:'https://ik.imagekit.io/foliceasummit/mysncsm/495822530_1269835475150700_6768048624691836323_n.jpg?updatedAt=1756754277667',
              date:'2024-07-25'
            }].map((post, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-transform hover:-translate-y-1 border border-gray-100"
              >
                <img src={post.image} alt={post.title} className="w-full h-40 object-cover" />
                <div className="p-5">
                  <span className="text-xs text-gray-500">{new Date(post.date).toLocaleDateString()}</span>
                  <h3 className="text-lg font-bold text-gray-900 mt-2">{post.title}</h3>
                  <Link href={`/blog?post=${post.id}`} className="text-blue-600 hover:text-blue-700 font-semibold text-sm mt-3 inline-block">View more</Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Partners & Sponsors Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Valued Sponsors
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              We are grateful for the support of our sponsors who made this event possible.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {sponsors.map((sponsor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-xl text-center card-hover border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <div className="h-32 mb-6 flex items-center justify-center">
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="max-h-28 max-w-full object-contain filter drop-shadow-lg hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const nextSibling = target.nextSibling as HTMLElement;
                        if (nextSibling) {
                          nextSibling.style.display = 'block';
                        }
                      }}
                    />
                    <div className="hidden text-primary-600 font-semibold text-xl">
                      {sponsor.name}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {sponsor.name}
                  </h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 mx-auto rounded-full mb-4"></div>
                  <Link 
                    href={sponsor.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-block bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-2 rounded-full font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Visit Website
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Our Partners Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our Partners
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Driving the success of the National County Sports Meet.
              </p>

              <div className="relative w-full overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
                
                <motion.div
                  className="flex gap-8 py-8"
                  animate={{
                    x: [0, -1920], // Approximate width to scroll
                  }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 30,
                      ease: "linear",
                    },
                  }}
                  style={{ width: "fit-content" }}
                >
                  {[...partners, ...partners, ...partners].map((partner, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-6 shadow-md border border-gray-100 w-64 flex-shrink-0 flex flex-col items-center justify-center h-48 hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="h-24 mb-4 flex items-center justify-center w-full">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const nextSibling = target.nextSibling as HTMLElement;
                            if (nextSibling) {
                              nextSibling.style.display = 'block';
                            }
                          }}
                        />
                        <div className="hidden text-primary-600 font-semibold text-center text-sm">
                          {partner.name}
                        </div>
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 text-center line-clamp-2">
                        {partner.name}
                      </h3>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      

             {/* Tournament at a Glance Section */}
       <section className="py-6 sm:py-8 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
         <div className="container-custom text-center">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             viewport={{ once: true }}
           >
             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
               Tournament at a Glance
             </h2>
             <p className="text-base sm:text-lg text-white/90 mb-6 max-w-3xl mx-auto">
               Preliminary rounds in counties • Finals at Samuel K. Doe Sports Complex, Paynesville City
             </p>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.1 }}
                 viewport={{ once: true }}
                 className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
               >
                 <h3 className="text-lg sm:text-xl font-bold text-white mb-1">Dec. 15, 25 - Jan. 17, 26</h3>
                 <p className="text-white/80 text-sm">Tournament Duration</p>
               </motion.div>
               
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.2 }}
                 viewport={{ once: true }}
                 className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
               >
                 <h3 className="text-lg sm:text-xl font-bold text-white mb-1">Multiple Venues</h3>
                 <p className="text-white/80 text-sm">Across Liberia</p>
               </motion.div>
               
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.3 }}
                 viewport={{ once: true }}
                 className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
               >
                 <h3 className="text-lg sm:text-xl font-bold text-white mb-1">3,000+ Athletes</h3>
                 <p className="text-white/80 text-sm">From 15 Counties</p>
               </motion.div>
             </div>
           </motion.div>
         </div>
       </section>

      </div>
    </NoHydrationWrapper>
  );
};

export default HomePage;
