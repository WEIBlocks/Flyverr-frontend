"use client"

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeft, Star, Heart, Share2, ChevronLeft, ChevronRight, Image as ImageIcon, Shield, TrendingUp, Users, Calendar, Download, Eye, ShoppingCart, Crown, Flame, Zap, Gift } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Types
interface Product {
  id: string
  title: string
  description: string
  longDescription: string
  images: string[]
  creator: {
    name: string
    avatar: string
    rating: number
    products: number
    followers: number
  }
  price: number
  resaleStage: 'newboom' | 'blossom' | 'evergreen' | 'exit'
  remainingLicenses: number
  totalLicenses: number
  category: string
  rating: number
  reviews: number
  isSponsored?: boolean
  isTrending?: boolean
  isRecommended?: boolean
  isMostProfitable?: boolean
  isInfluencerFave?: boolean
  isHotDeal?: boolean
  features: string[]
  requirements: string[]
  fileSize: string
  lastUpdated: string
  tags: string[]
}

interface Review {
  id: string
  user: string
  avatar: string
  rating: number
  date: string
  comment: string
  helpful: number
}

// Mock data
const mockProduct: Product = {
    id: '1',
  title: 'Complete Web Development Masterclass',
  description: 'Learn full-stack web development from scratch. Includes React, Node.js, and database design.',
  longDescription: `This comprehensive masterclass covers everything you need to become a full-stack web developer. From HTML/CSS fundamentals to advanced React patterns, Node.js backend development, and database design.

What you'll learn:
• Modern JavaScript (ES6+) and TypeScript
• React.js with Hooks and Context API
• Node.js and Express.js backend development
• Database design with MongoDB and PostgreSQL
• RESTful API development
• Authentication and authorization
• Deployment and DevOps basics
• Real-world project building

Perfect for beginners and intermediate developers looking to advance their skills.`,
    images: [
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop'
  ],
  creator: {
    name: 'CodeMaster Pro',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    rating: 4.8,
    products: 15,
    followers: 2500
  },
  price: 299.99,
  resaleStage: 'newboom',
  remainingLicenses: 50,
  totalLicenses: 100,
  category: 'Courses',
  rating: 4.8,
  reviews: 127,
    isSponsored: true,
    isTrending: true,
    features: [
    '25+ hours of video content',
    'Lifetime access to updates',
    'Certificate of completion',
    'Source code included',
    'Community support',
    'Mobile-friendly learning'
  ],
  requirements: [
    'Basic computer knowledge',
    'No programming experience required',
    'Windows, Mac, or Linux computer',
    'Internet connection'
  ],
  fileSize: '2.5 GB',
  lastUpdated: '2024-01-15',
  tags: ['Web Development', 'React', 'Node.js', 'JavaScript', 'Full Stack']
}

const mockReviews: Review[] = [
  {
    id: '1',
    user: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
    rating: 5,
    date: '2024-01-10',
    comment: 'Amazing course! The instructor explains complex concepts in a very clear way. I went from knowing nothing about web development to building my first full-stack application.',
    helpful: 24
  },
  {
    id: '2',
    user: 'Mike Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
    rating: 4,
    date: '2024-01-08',
    comment: 'Great content and well-structured. The practical projects really help reinforce the learning. Would recommend to anyone starting their web development journey.',
    helpful: 18
  },
  {
    id: '3',
    user: 'Emily Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
    rating: 5,
    date: '2024-01-05',
    comment: 'Excellent course! The instructor is very knowledgeable and the community support is fantastic. Already started working on my portfolio.',
    helpful: 31
  }
]

// Resale Stage Configuration
const resaleStages = {
  newboom: { name: 'Newboom', color: 'bg-green-500', description: 'Never resold - Original licenses only', earningPotential: 'High' },
  blossom: { name: 'Blossom', color: 'bg-blue-500', description: '1st resale cycle - Growing demand', earningPotential: 'Very High' },
  evergreen: { name: 'Evergreen', color: 'bg-purple-500', description: '2nd resale cycle - Stable value', earningPotential: 'Medium' },
  exit: { name: 'Exit', color: 'bg-orange-500', description: '3rd resale cycle - Final opportunity', earningPotential: 'Low' }
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedTab, setSelectedTab] = useState<'description' | 'reviews' | 'creator'>('description')

  const product = mockProduct // In real app, fetch by ID
  const stage = resaleStages[product.resaleStage]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  const handleBuyToUse = () => {
    // Handle buy to use logic
    console.log('Buy to Use clicked')
  }

  const handleBuyToResell = () => {
    // Handle buy to resell logic
    console.log('Buy to Resell clicked')
  }

  const handleBuyWithInsurance = () => {
    // Handle buy with insurance logic
    console.log('Buy with Insurance clicked')
  }

  return (
    <div className="min-h-screen bg-flyverr-neutral dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-flyverr-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Marketplace
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Images and Info */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden mb-8">
              <div className="relative aspect-video">
                <Image
                src={product.images[currentImageIndex]}
                alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
              />
              
              {/* Image Navigation */}
              {product.images.length > 1 && (
                <>
                  <Button
                    size="sm"
                    variant="ghost"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full w-10 h-10 p-0"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full w-10 h-10 p-0"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                    
                    {/* Image Dots */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {product.images.map((_, index) => (
                        <div
                          key={index}
                          className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                            index === currentImageIndex 
                              ? 'bg-white shadow-lg' 
                              : 'bg-white/60 hover:bg-white/80'
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                </>
              )}
              </div>
            </div>

            {/* Product Info */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {product.title}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    by {product.creator.name}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-2 rounded-full ${isWishlisted ? 'text-red-500' : 'text-gray-400'}`}
                  >
                    <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 rounded-full text-gray-400"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <div className="flex items-center mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
                <Badge className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300">
                  {product.category}
                </Badge>
              </div>

              {/* Special Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {product.isSponsored && (
                  <Badge className="bg-purple-500 text-white">
                    <Crown className="h-3 w-3 mr-1" />
                    Sponsored
                  </Badge>
                )}
                {product.isTrending && (
                  <Badge className="bg-blue-500 text-white">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Trending
                  </Badge>
                )}
                {product.isHotDeal && (
                  <Badge className="bg-red-500 text-white">
                    <Flame className="h-3 w-3 mr-1" />
                    Hot Deal
                  </Badge>
                )}
                {product.isMostProfitable && (
                  <Badge className="bg-green-500 text-white">
                    <Zap className="h-3 w-3 mr-1" />
                    Most Profitable
                  </Badge>
                )}
                {product.isInfluencerFave && (
                  <Badge className="bg-pink-500 text-white">
                    <Users className="h-3 w-3 mr-1" />
                    Influencer's Fave
                  </Badge>
                )}
              </div>

              {/* Resale Stage Info */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={`${stage.color} text-white text-sm`}>
                    Stage {Object.keys(resaleStages).indexOf(product.resaleStage) + 1}: {stage.name}
                  </Badge>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Earning Potential: {stage.earningPotential}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {stage.description}
                </p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Remaining: {product.remainingLicenses} of {product.totalLicenses} licenses
                  </span>
                  <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(product.remainingLicenses / product.totalLicenses) * 100}%` }}
                    ></div>
                  </div>
              </div>
            </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                <div className="flex space-x-8">
                  {[
                    { id: 'description', label: 'Description' },
                    { id: 'reviews', label: `Reviews (${product.reviews})` },
                    { id: 'creator', label: 'Creator' }
                  ].map((tab) => (
                  <button
                      key={tab.id}
                      onClick={() => setSelectedTab(tab.id as any)}
                      className={`pb-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                        selectedTab === tab.id
                          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      {tab.label}
                  </button>
                ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="min-h-[400px]">
                {selectedTab === 'description' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">About this product</h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                        {product.longDescription}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">What you'll get</h4>
                        <ul className="space-y-2">
                          {product.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
          </div>

            <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Requirements</h4>
                        <ul className="space-y-2">
                          {product.requirements.map((req, index) => (
                            <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-gray-600 dark:text-gray-400">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedTab === 'reviews' && (
                  <div className="space-y-6">
                    {mockReviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                        <div className="flex items-start gap-4">
                          <Image
                            src={review.avatar}
                            alt={review.user}
                            width={48}
                            height={48}
                            className="rounded-full"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900 dark:text-white">{review.user}</h4>
                              <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                            </div>
                            <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                          ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                            <div className="mt-3">
                              <Button variant="ghost" size="sm" className="text-gray-500 dark:text-gray-400">
                                Helpful ({review.helpful})
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                )}

                {selectedTab === 'creator' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Image
                        src={product.creator.avatar}
                        alt={product.creator.name}
                        width={80}
                        height={80}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{product.creator.name}</h3>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                            <span className="text-gray-600 dark:text-gray-400">{product.creator.rating}</span>
                          </div>
                          <span className="text-gray-600 dark:text-gray-400">{product.creator.products} products</span>
                          <span className="text-gray-600 dark:text-gray-400">{product.creator.followers} followers</span>
                        </div>
                      </div>
              </div>

                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">About the creator</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {product.creator.name} is a professional web developer and instructor with over 10 years of experience. 
                        They specialize in modern web technologies and have helped thousands of students learn web development.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            </div>

          {/* Right Column - Purchase Options */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    ${product.price}
              </div>

                  {/* License Info */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">Available Licenses</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {product.remainingLicenses} of {product.totalLicenses}
                      </span>
              </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(product.remainingLicenses / product.totalLicenses) * 100}%` }}
                      ></div>
              </div>
            </div>

                  {/* Purchase Buttons */}
                  <div className="space-y-3 mb-6">
                  <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-3 text-lg font-semibold"
                      onClick={handleBuyToUse}
                    >
                      <Download className="h-5 w-5 mr-2" />
                      Buy to Use
                  </Button>
                    
                  <Button
                      variant="outline"
                      className="w-full border-2 border-green-500 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 py-3 text-lg font-semibold"
                      onClick={handleBuyToResell}
                    >
                      <TrendingUp className="h-5 w-5 mr-2" />
                      Buy to Resell
                  </Button>
                    
                    <Button 
                      variant="outline"
                      className="w-full border-2 border-purple-500 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 py-3 text-lg font-semibold"
                      onClick={handleBuyWithInsurance}
                    >
                      <Shield className="h-5 w-5 mr-2" />
                      Buy with Insurance
                </Button>
              </div>

                  {/* Product Details */}
                  <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex justify-between">
                      <span>File Size:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{product.fileSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Updated:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{product.lastUpdated}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Category:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{product.category}</span>
              </div>
            </div>

                  {/* Guarantee */}
                  <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <span className="font-semibold text-green-800 dark:text-green-300">30-Day Money Back Guarantee</span>
              </div>
                    <p className="text-sm text-green-700 dark:text-green-400">
                      Not satisfied? Get a full refund within 30 days of purchase.
                    </p>
                </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 