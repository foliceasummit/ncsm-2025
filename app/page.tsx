'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ArrowRight, Star, Users2, Trophy, Globe, Target, Award } from 'lucide-react';
import Navigation from './components/layout/Navigation';


const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
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
  ];

  const sponsors = [
    { name: 'Orange Liberia', logo: 'https://ik.imagekit.io/foliceasummit/mysncsm/orange%20logo.png?updatedAt=1756650605644', url: 'https://orange.com' },
    { name: 'Doxxbet', logo: 'https://ik.imagekit.io/foliceasummit/mysncsm/Doxxbet%20logo.jpg?updatedAt=1756650605168', url: 'https://doxxbet.com' },
    { name: 'APM Terminals', logo: 'https://ik.imagekit.io/foliceasummit/mysncsm/APM%20logo.png?updatedAt=1756650604903', url: 'https://apmterminals.com' },
    { name: 'ArcelorMittal', logo: 'https://ik.imagekit.io/foliceasummit/mysncsm/Logo-ArcelorMittal-PNG.png?updatedAt=1756427575203', url: 'https://arcelormittal.com' },
  ];

  return (
    <div suppressHydrationWarning={true}>
      <Navigation />
      
      {/* Hero Section with Slider */}
      <section className="relative min-h-screen">
        {/* Hero Slider */}
        <div className="relative h-screen">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 bg-gradient-to-br from-primary-600 to-secondary-600 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-contain md:object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
            </div>
          ))}
          
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl z-20"
          >
            <ArrowRight className="h-6 w-6 rotate-180" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl z-20"
          >
            <ArrowRight className="h-6 w-6" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-primary-400' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* Hero Content Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col justify-center pt-32 pb-8">
          <div className="container-custom text-center text-white flex-1 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto px-4"
            >


                             {/* Title Above Countdown */}
               <div className="mb-6 sm:mb-8">
                 <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3">
                   National County Sports Meet 2025
                 </h1>
                 <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-medium">
                   The Pride of Our Counties, The Spirit of Liberia
                 </p>
               </div>

               {/* Countdown */}
               {isClient && (
                 <div className="mb-6 sm:mb-8">
                   <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 max-w-2xl mx-auto border border-white/20 hover:bg-white/20 hover:backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-white/40">
                     <h3 className="text-lg md:text-2xl font-bold text-white mb-4 md:mb-6 hover:text-yellow-300 transition-colors duration-300">Kickoff Countdown</h3>
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

               {/* Subtitle Under Countdown */}
               <div className="mb-6 sm:mb-8">
                 <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                   Don't miss Liberia's biggest sporting festival – where passion, pride, and county spirit come alive!
                 </p>
               </div>

              

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/counties"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Explore Counties
                </Link>
                <Link
                  href="/results"
                  className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  View Results
                </Link>
              </div>
            </motion.div>
          </div>
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
      <section className="section-padding bg-white pt-16 sm:pt-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Welcome to the National County Sports Meet
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              The National County Sports Meet is Liberia's premier sporting event that brings together all 15 counties in a celebration of athletic excellence, unity, and community spirit.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary-600/10 to-secondary-600/10 rounded-2xl p-8 md:p-12 mb-16"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              "Celebrating Talent, Inspiring Unity"
            </h3>
            <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
              Showcasing Liberia's finest athletes and rich cultural traditions.
            </p>
          </motion.div>

          <div className="text-center">
            <Link href="/about" className="btn-primary text-lg px-8 py-4">
              Learn More About NCSM
            </Link>
          </div>
        </div>
      </section>

             {/* Our Mission Section */}
       <section className="py-8 sm:py-12 bg-gray-50">
         <div className="container-custom">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             viewport={{ once: true }}
             className="text-center mb-8 sm:mb-12"
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
              Our Partners
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Driving the success of the National County Sports Meet.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-xl text-center card-hover border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <div className="h-32 mb-6 flex items-center justify-center">
                  <img
                    src={partner.logo}
                    alt={partner.name}
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
                    {partner.name}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {partner.name}
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 mx-auto rounded-full"></div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Valued Sponsors
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              We are grateful for the support of our sponsors who made this event possible.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
          </motion.div>
        </div>
      </section>

      {/* Video Highlights Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Video Highlights
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Relive the most exciting moments from past competitions
            </p>
          </motion.div>
          
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                 {[
                           {
                             id: 'P44Y3TwN374',
                             title: 'Grand Bassa Vs Grand Gedeh',
                             thumbnail: 'https://img.youtube.com/vi/P44Y3TwN374/hqdefault.jpg',
                             url: 'https://youtu.be/P44Y3TwN374'
                           },
                           {
                             id: 'WCsK9ZFxzno',
                             title: 'National County Sports Meet 2024: Football Final: River Gee vs Lofa',
                             thumbnail: 'https://img.youtube.com/vi/WCsK9ZFxzno/hqdefault.jpg',
                             url: 'https://youtu.be/WCsK9ZFxzno'
                           },
                           {
                             id: '14PtN9HKPDk',
                             title: 'National County Sports Meet 2025: Football Grand Final: Grand Gedeh VS Lofa County',
                             thumbnail: 'https://img.youtube.com/vi/14PtN9HKPDk/hqdefault.jpg',
                             url: 'https://youtu.be/14PtN9HKPDk'
                           },
                           {
                             id: 'jFDIJX-wdwI',
                             title: '2025 NATIONAL COUNTY MEET FINAL (LOFA VS GRAND GEDEH)',
                             thumbnail: 'https://img.youtube.com/vi/jFDIJX-wdwI/hqdefault.jpg',
                             url: 'https://youtu.be/jFDIJX-wdwI'
                           },
                           {
                             id: 'M60SidbSB2Q',
                             title: 'Liberia National County Sports Meet 2024-2025 ( Lofa vs G. Gedeh ) highlight',
                             thumbnail: 'https://img.youtube.com/vi/M60SidbSB2Q/hqdefault.jpg',
                             url: 'https://youtu.be/M60SidbSB2Q'
                           },
                           {
                             id: 'KQGXlh0B2ws',
                             title: 'NCSM 2024 Closing Ceremony - Awards & Celebrations final 2024-2025',
                             thumbnail: 'https://img.youtube.com/vi/KQGXlh0B2ws/hqdefault.jpg',
                             url: 'https://youtu.be/KQGXlh0B2ws'
                           }
                         ].map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                                 <div className="relative overflow-hidden rounded-lg shadow-md">
                   <img
                     src={video.thumbnail}
                     alt={video.title}
                     className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                     onError={(e) => {
                       const target = e.target as HTMLImageElement;
                       // Fallback to a default sports image if thumbnail fails to load
                       target.src = 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=1';
                     }}
                   />
                                     <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-colors duration-300 flex items-center justify-center">
                     <a
                       href={video.url}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full transition-colors"
                     >
                       <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M8 5v14l11-7z"/>
                       </svg>
                     </a>
                   </div>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {video.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-between items-center mb-12"
          >
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest News</h2>
              <p className="text-xl text-gray-600">
                Stay updated with the latest from NCSM
              </p>
    </div>
            <Link
              href="/blog"
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              View All News
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "MYS Unveils 2025-2026 National County Sports Meet Group Stage Fixtures",
                excerpt: "The Ministry of Youth and Sports has officially announced the complete group stage fixtures for the upcoming National County Sports Meet...",
                image: "https://ik.imagekit.io/foliceasummit/mysncsm/496757105_1269921848475396_2079520982404392725_n.jpg?updatedAt=1756754286394",
                url: "https://knewsonline.com/MYS-Unveils-2025-2026-National-County-Sports-Meet-Group-Stage-Fixtures",
                category: "Official Announcement"
              },
              {
                title: "Liberia: Bong County Sports Steering Committee Eyes Stadium Expansion and Turf Installation",
                excerpt: "Despite financial hurdles, the Bong County Sports Steering Committee is determined to expand their stadium and install modern turf...",
                image: "https://ik.imagekit.io/foliceasummit/mysncsm/Mr.%20Paul%20sackie.jpg?updatedAt=1756755016334",
                url: "https://frontpageafricaonline.com/sports/liberia-bong-county-sports-steering-committee-eyes-stadium-expansion-and-turf-installation-despite-financial-hurdles/",
                category: "Infrastructure"
              },
              {
                title: "APM Terminals Liberia Renews Sponsorship for 2024-2025 National County Sports Meet",
                excerpt: "APM Terminals Liberia has announced the renewal of their sponsorship for the National County Sports Meet, continuing their support...",
                image: "https://ik.imagekit.io/foliceasummit/mysncsm/images.jpg?updatedAt=1756650605776",
                url: "https://www.thenewdawnliberia.com/apm-terminals-liberia-renews-sponsorship-for-2024-2025-national-county-sports-meet/",
                category: "Sponsorship"
              }
            ].map((article, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative w-full h-48 bg-gray-200">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = `
                        <div class="flex items-center justify-center w-full h-full bg-gray-300">
                          <div class="text-gray-500 text-center">
                            <svg class="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                            </svg>
                            <p class="text-sm">Image not available</p>
                          </div>
                        </div>
                      `;
                    }}
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-primary-600 mb-2">{article.category}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {article.excerpt}
                  </p>
                  <Link
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
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
  );
};

export default HomePage;
