'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, MapPin, CreditCard, Mail, Phone, User, Ticket, CheckCircle, XCircle } from 'lucide-react'
import Navigation from '../components/layout/Navigation'
import Footer from '../components/layout/Footer'

const upcomingMatches = [
  {
    id: 1,
    date: '2025-01-15',
    games: [
      {
        id: 1,
        time: '14:00',
        home: 'Montserrado',
        away: 'Bong',
        venue: 'Antoinette Tubman Stadium',
        gameCategory: 'Football',
        available: true,
        category: 'Group Stage'
      },
      {
        id: 2,
        time: '16:30',
        home: 'Nimba',
        away: 'Lofa',
        venue: 'Samuel Kanyon Doe Sports Complex',
        gameCategory: 'Basketball',
        available: true,
        category: 'Group Stage'
      }
    ]
  },
  {
    id: 2,
    date: '2025-01-16',
    games: [
      {
        id: 3,
        time: '14:00',
        home: 'Grand Gedeh',
        away: 'Sinoe',
        venue: 'Antoinette Tubman Stadium',
        gameCategory: 'Volleyball',
        available: true,
        category: 'Group Stage'
      },
      {
        id: 4,
        time: '16:30',
        home: 'Margibi',
        away: 'River Cess',
        venue: 'Antoinette Tubman Stadium',
        gameCategory: 'Kickball',
        available: true,
        category: 'Group Stage'
      }
    ]
  }
]

const ticketCategories = [
  {
    id: 'vip',
    name: 'VIP',
    price: 0,
    currency: 'USD',
    features: ['Premium seating', 'Meet & greet with players', 'Exclusive parking', 'Complimentary access'],
    color: 'from-yellow-400 to-orange-500',
    available: false,
    note: 'Complimentary - Not for sale'
  },
  {
    id: 'around_vip',
    name: 'Around VIP',
    price: 30,
    currency: 'USD',
    features: ['Premium seating near VIP area', 'Covered seating', 'Excellent view'],
    color: 'from-purple-400 to-pink-500',
    available: true
  },
  {
    id: 'stadium_wing',
    name: 'Stadium Wing',
    price: 15,
    currency: 'USD',
    features: ['Comfortable seating in stadium wings', 'Covered area', 'Good view of the field'],
    color: 'from-blue-400 to-indigo-500',
    available: true
  },
  {
    id: 'around_field',
    name: 'Around the Field',
    price: 500,
    currency: 'LRD',
    features: ['General admission around the field', 'Access to all facilities', 'Food vendors available', 'Gate 5-15 access'],
    color: 'from-green-400 to-blue-500',
    available: true
  }
]

export default function TicketsPage() {
  const [selectedMatch, setSelectedMatch] = useState<any>(null)
  const [selectedCategory, setSelectedCategory] = useState<any>(null)
  const [showPurchaseForm, setShowPurchaseForm] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [purchaseSuccess, setPurchaseSuccess] = useState(false)
  const [purchasedTicket, setPurchasedTicket] = useState<any>(null)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    quantity: 1,
    selectedTicketCategory: '',
    paymentMethod: 'credit_card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    mobileMoneyNumber: ''
  })
  const [formErrors, setFormErrors] = useState<any>({})

  const handleBuyTickets = (match: any, category: any) => {
    setSelectedMatch(match)
    setSelectedCategory(category)
    setShowPurchaseForm(true)
  }

  const validateForm = () => {
    const errors: any = {}
    
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required'
    if (!formData.email.trim()) errors.email = 'Email is required'
    if (!formData.phone.trim()) errors.phone = 'Phone number is required'
    if (formData.quantity < 1) errors.quantity = 'Quantity must be at least 1'
    if (!formData.selectedTicketCategory) errors.selectedTicketCategory = 'Please select a ticket category'
    
    if (formData.paymentMethod === 'credit_card') {
      if (!formData.cardNumber.trim()) errors.cardNumber = 'Card number is required'
      if (!formData.expiryDate.trim()) errors.expiryDate = 'Expiry date is required'
      if (!formData.cvv.trim()) errors.cvv = 'CVV is required'
      if (!formData.cardholderName.trim()) errors.cardholderName = 'Cardholder name is required'
    } else if (formData.paymentMethod === 'orange_money' || formData.paymentMethod === 'mtn_money') {
      if (!formData.mobileMoneyNumber.trim()) errors.mobileMoneyNumber = 'Mobile money number is required'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const processPayment = async () => {
    if (!validateForm()) return

    setIsProcessing(true)
    
    try {
      const selectedCategoryData = ticketCategories.find(cat => cat.id === formData.selectedTicketCategory)
      
      const response = await fetch('/api/tickets/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          matchId: selectedMatch?.id,
          category: selectedCategoryData?.name || formData.selectedTicketCategory,
          price: selectedCategoryData?.price || 0,
          currency: selectedCategoryData?.currency || 'LRD',
          quantity: formData.quantity,
          paymentMethod: formData.paymentMethod,
          purchaserName: formData.fullName,
          purchaserEmail: formData.email,
          purchaserPhone: formData.phone,
          mobileMoneyNumber: formData.mobileMoneyNumber
        })
      })

      const result = await response.json()
      
      if (result.success) {
        setPurchasedTicket(result.ticket)
        setPurchaseSuccess(true)
      } else {
        alert('Payment failed: ' + result.error)
      }
    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment processing failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const formatPrice = (price: number, currency: string = 'LRD') => {
    if (price === 0) return 'Complimentary'
    if (currency === 'USD') return `$${price} USD`
    return `LD ${price.toLocaleString()}`
  }

  return (
    <div className="min-h-screen bg-gradient-primary">
      <Navigation />
      <main className="pt-16 lg:pt-20">
        {/* Hero Section - Reduced Height */}
        <section className="py-12 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 relative overflow-hidden">
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"
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
          </div>
          
          <div className="container-custom relative z-10">
            <motion.div
              className="text-center text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.h1 
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Buy{' '}
                <span className="text-gradient bg-gradient-to-r from-primary-300 to-secondary-300 bg-clip-text text-transparent">
                  Tickets
                </span>
              </motion.h1>

              <motion.p 
                className="text-lg text-gray-200 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Secure your seats for the most exciting matches in the National County Sports Meet 2025
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Ticket Categories */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ticket Categories</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Choose the perfect ticket category for your NCSM experience
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {ticketCategories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    className="card-hover relative overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${category.color}`}></div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h3>
                      <div className="text-3xl font-bold text-primary-600 mb-6">{formatPrice(category.price, category.currency)}</div>
                      
                      <ul className="space-y-3 mb-6">
                        {category.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      {category.available ? (
                        <button 
                          className="w-full btn-primary"
                          onClick={() => {
                            setSelectedCategory(category)
                            setShowPurchaseForm(true)
                          }}
                        >
                          Buy {category.name} Tickets
                        </button>
                      ) : (
                        <div className="w-full px-4 py-2 bg-gray-200 text-gray-600 rounded-lg text-center font-medium">
                          {category.note || 'Not Available'}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Market Ticket Pricing */}
              <motion.div
                className="mt-12 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-orange-900 mb-2">Market Ticket Pricing</h3>
                  <p className="text-orange-700">Alternative pricing available through authorized vendors</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg p-4 border border-orange-200">
                    <h4 className="font-semibold text-orange-900 mb-2">Around VIP</h4>
                    <div className="text-2xl font-bold text-orange-600">$50 USD</div>
                    <p className="text-sm text-orange-700 mt-1">Premium market rate</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-orange-200">
                    <h4 className="font-semibold text-orange-900 mb-2">Stadium Wing</h4>
                    <div className="text-2xl font-bold text-orange-600">Variable</div>
                    <p className="text-sm text-orange-700 mt-1">Based on market type</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-orange-200">
                    <h4 className="font-semibold text-orange-900 mb-2">Around the Field</h4>
                    <div className="text-2xl font-bold text-orange-600">Variable</div>
                    <p className="text-sm text-orange-700 mt-1">Based on market type</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Upcoming Matches */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Upcoming Matches</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Book your tickets for the most anticipated matches
                </p>
              </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {upcomingMatches.map((matchDay, index) => (
                  <motion.div
                    key={matchDay.id}
                    className="card-hover"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="p-6">
                      <div className="text-center mb-6">
                        <div className="flex items-center justify-center text-lg font-bold text-primary-600 mb-2">
                          <Calendar className="w-5 h-5 mr-2" />
                          {new Date(matchDay.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        {matchDay.games.map((game, gameIndex) => (
                          <div key={game.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                            <div className="flex justify-between items-center mb-3">
                              <div className="flex items-center text-sm text-gray-500">
                                <Clock className="w-4 h-4 mr-1" />
                                {game.time}
                              </div>
                              <div className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full">
                                {game.gameCategory}
                              </div>
                            </div>
                            
                            <div className="text-center mb-3">
                              <div className="text-lg font-semibold text-gray-900 mb-1">{game.home}</div>
                              <div className="text-xl font-bold text-primary-600">VS</div>
                              <div className="text-lg font-semibold text-gray-900 mt-1">{game.away}</div>
                            </div>
                            
                            <div className="text-center mb-4">
                              <div className="flex items-center justify-center text-sm text-gray-500 mb-1">
                                <MapPin className="w-4 h-4 mr-1" />
                                {game.venue}
                              </div>
                              <div className="text-sm font-semibold text-gray-700">{game.category}</div>
                            </div>
                            
                            <div className="flex justify-center">
                              <button 
                                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                                  game.available 
                                    ? 'bg-primary-600 text-white hover:bg-primary-700' 
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                                disabled={!game.available}
                                onClick={() => game.available && setShowPurchaseForm(true)}
                              >
                                {game.available ? 'Buy Now' : 'Coming Soon'}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Purchase Form Modal */}
        <AnimatePresence>
          {showPurchaseForm && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                {!purchaseSuccess ? (
                  <div className="p-8">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Purchase Tickets</h2>
                      <button
                        onClick={() => setShowPurchaseForm(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <XCircle className="w-6 h-6" />
                      </button>
                    </div>

                    {selectedMatch && selectedCategory && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Selected Match</h3>
                        <div className="text-sm text-gray-600">
                          <div>{selectedMatch.home} vs {selectedMatch.away}</div>
                          <div>{new Date(selectedMatch.date).toLocaleDateString()} at {selectedMatch.time}</div>
                          <div>{selectedMatch.venue}</div>
                          <div className="font-semibold mt-2">Category: {selectedCategory.name} - {formatPrice(selectedCategory.price)}</div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <User className="w-5 h-5 mr-2" />
                          Personal Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                            <input
                              type="text"
                              value={formData.fullName}
                              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                                formErrors.fullName ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="Enter your full name"
                            />
                            {formErrors.fullName && <p className="text-red-500 text-sm mt-1">{formErrors.fullName}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                                formErrors.email ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="Enter your email"
                            />
                            {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                                formErrors.phone ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="Enter your phone number"
                            />
                            {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity *</label>
                            <input
                              type="number"
                              min="1"
                              max="10"
                              value={formData.quantity}
                              onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value)})}
                              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                                formErrors.quantity ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            {formErrors.quantity && <p className="text-red-500 text-sm mt-1">{formErrors.quantity}</p>}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <CreditCard className="w-5 h-5 mr-2" />
                          Payment Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Card Number *</label>
                            <input
                              type="text"
                              placeholder="1234 5678 9012 3456"
                              value={formData.cardNumber}
                              onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                                formErrors.cardNumber ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            {formErrors.cardNumber && <p className="text-red-500 text-sm mt-1">{formErrors.cardNumber}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              value={formData.expiryDate}
                              onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                                formErrors.expiryDate ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            {formErrors.expiryDate && <p className="text-red-500 text-sm mt-1">{formErrors.expiryDate}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
                            <input
                              type="text"
                              placeholder="123"
                              value={formData.cvv}
                              onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                                formErrors.cvv ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            {formErrors.cvv && <p className="text-red-500 text-sm mt-1">{formErrors.cvv}</p>}
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name *</label>
                            <input
                              type="text"
                              value={formData.cardholderName}
                              onChange={(e) => setFormData({...formData, cardholderName: e.target.value})}
                              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                                formErrors.cardholderName ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="Enter cardholder name"
                            />
                            {formErrors.cardholderName && <p className="text-red-500 text-sm mt-1">{formErrors.cardholderName}</p>}
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Ticket Price:</span>
                            <span>{formatPrice(selectedCategory?.price || 0)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Quantity:</span>
                            <span>{formData.quantity}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Service Fee:</span>
                            <span>LD 100</span>
                          </div>
                          <div className="border-t pt-2 flex justify-between font-semibold">
                            <span>Total:</span>
                            <span>{formatPrice((selectedCategory?.price || 0) * formData.quantity + 100)}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={processPayment}
                        disabled={isProcessing}
                        className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        {isProcessing ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Processing Payment...
                          </>
                                                  ) : (
                            `Pay ${formatPrice((selectedCategory?.price || 0) * formData.quantity + 100)}`
                          )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <div className="mb-6">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
                      <p className="text-gray-600">Your tickets have been purchased successfully.</p>
                    </div>

                                         {purchasedTicket && (
                       <div className="bg-gray-50 rounded-lg p-6 mb-6">
                         <h3 className="font-semibold text-gray-900 mb-4">Ticket Details</h3>
                         <div className="space-y-2 text-sm">
                           <div><strong>Ticket ID:</strong> {purchasedTicket.id}</div>
                           <div><strong>Match:</strong> {selectedMatch?.home} vs {selectedMatch?.away}</div>
                           <div><strong>Date:</strong> {selectedMatch?.date && new Date(selectedMatch.date).toLocaleDateString()}</div>
                           <div><strong>Time:</strong> {selectedMatch?.time}</div>
                           <div><strong>Venue:</strong> {selectedMatch?.venue}</div>
                           <div><strong>Category:</strong> {purchasedTicket.category}</div>
                           <div><strong>Quantity:</strong> {purchasedTicket.quantity}</div>
                           <div><strong>QR Code:</strong> {purchasedTicket.qrCode}</div>
                         </div>
                       </div>
                     )}

                    <div className="space-y-3">
                                             <p className="text-sm text-gray-600">
                         A confirmation email has been sent to <strong>{formData.email}</strong>.
                       </p>
                      <p className="text-sm text-gray-600">
                        Please show your QR code at the venue entrance on match day.
                      </p>
                      <button
                                                 onClick={() => {
                           setShowPurchaseForm(false)
                           setPurchaseSuccess(false)
                           setPurchasedTicket(null)
                           setFormData({
                             fullName: '',
                             email: '',
                             phone: '',
                             quantity: 1,
                             selectedTicketCategory: '',
                             paymentMethod: '',
                             cardNumber: '',
                             expiryDate: '',
                             cvv: '',
                             cardholderName: '',
                             mobileMoneyNumber: ''
                           })
                         }}
                        className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ticket Information */}
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
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ticket Information</h2>
                <p className="text-lg text-gray-600">
                  Everything you need to know about purchasing and using your NCSM tickets
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Ticket Categories & Pricing</h3>
                                     <ul className="space-y-3 text-gray-600">
                     <li className="flex items-start">
                       <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                       <strong>VIP:</strong> Complimentary - Not for sale (Premium seating)
                     </li>
                     <li className="flex items-start">
                       <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                       <strong>Around VIP:</strong> $30 USD (Premium seating near VIP area)
                     </li>
                     <li className="flex items-start">
                       <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                       <strong>Stadium Wing:</strong> $15 USD (Comfortable seating in stadium wings)
                     </li>
                     <li className="flex items-start">
                       <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                       <strong>Around the Field:</strong> LD 500 (General admission, Gates 5-15)
                     </li>
                   </ul>
                </div>

                <div className="card">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Important Notes</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      Tickets are non-refundable and non-transferable
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      Gates open 2 hours before match time
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      Children under 5 enter free with adult ticket
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      Digital tickets with QR codes will be sent via email
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      VIP tickets are complimentary and not available for purchase
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

