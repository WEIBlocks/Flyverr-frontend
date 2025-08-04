"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Search, Star, TrendingUp, Flame, Crown, Gift, ShoppingCart, Eye, ChevronLeft, ChevronRight, Loader2, Image as ImageIcon, Filter, Sparkles, Users, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Types
interface Product {
  id: string
  title: string
  description: string
  images: string[]
  creator: string
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
}

interface ImageState {
  loading: boolean
  error: boolean
  loaded: boolean
}

// Mock data for digital products
const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Complete Web Development Masterclass',
    description: 'Learn full-stack web development from scratch. Includes React, Node.js, and database design.',
    images: [
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop'
    ],
    creator: 'CodeMaster Pro',
    price: 299.99,
    resaleStage: 'newboom',
    remainingLicenses: 50,
    totalLicenses: 100,
    category: 'Courses',
    rating: 4.8,
    reviews: 127,
    isSponsored: true,
    isTrending: true
  },
  {
    id: '2',
    title: 'Premium UI/UX Design System',
    description: 'Complete design system with 200+ components, icons, and templates for modern applications.',
    images: [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop'
    ],
    creator: 'DesignStudio',
    price: 149.99,
    resaleStage: 'blossom',
    remainingLicenses: 25,
    totalLicenses: 75,
    category: 'Templates',
    rating: 4.9,
    reviews: 89,
    isMostProfitable: true,
    isHotDeal: true
  },
  {
    id: '3',
    title: 'Digital Marketing Strategy Guide',
    description: 'Comprehensive digital marketing playbook with proven strategies and case studies.',
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
    ],
    creator: 'MarketingGuru',
    price: 199.99,
    resaleStage: 'evergreen',
    remainingLicenses: 15,
    totalLicenses: 60,
    category: 'eBooks',
    rating: 4.7,
    reviews: 156,
    isRecommended: true,
    isInfluencerFave: true
  },
  {
    id: '4',
    title: 'Advanced JavaScript Patterns',
    description: 'Deep dive into JavaScript design patterns, best practices, and advanced concepts.',
    images: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop'
    ],
    creator: 'JSExpert',
    price: 89.99,
    resaleStage: 'exit',
    remainingLicenses: 5,
    totalLicenses: 50,
    category: 'Courses',
    rating: 4.6,
    reviews: 234,
    isTrending: true
  },
  {
    id: '5',
    title: 'Complete E-commerce Template Pack',
    description: 'Ready-to-use e-commerce templates with payment integration and admin dashboard.',
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop'
    ],
    creator: 'TemplateHub',
    price: 399.99,
    resaleStage: 'newboom',
    remainingLicenses: 30,
    totalLicenses: 80,
    category: 'Templates',
    rating: 4.9,
    reviews: 78,
    isSponsored: true,
    isMostProfitable: true
  },
  {
    id: '6',
    title: 'AI and Machine Learning Fundamentals',
    description: 'Comprehensive guide to AI/ML concepts with practical examples and projects.',
    images: [
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop'
    ],
    creator: 'AI Academy',
    price: 249.99,
    resaleStage: 'blossom',
    remainingLicenses: 20,
    totalLicenses: 70,
    category: 'Courses',
    rating: 4.8,
    reviews: 445,
    isRecommended: true,
    isHotDeal: true
  },
  {
    id: '7',
    title: 'Premium Stock Photo Collection',
    description: 'High-quality stock photos for commercial use. 1000+ images across various categories.',
    images: [
      'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&h=300&fit=crop'
    ],
    creator: 'PhotoPro',
    price: 179.99,
    resaleStage: 'evergreen',
    remainingLicenses: 10,
    totalLicenses: 55,
    category: 'Assets',
    rating: 4.7,
    reviews: 67,
    isInfluencerFave: true
  },
  {
    id: '8',
    title: 'Complete Business Plan Template',
    description: 'Professional business plan template with financial models and market analysis tools.',
    images: [
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop'
    ],
    creator: 'BusinessTools',
    price: 129.99,
    resaleStage: 'exit',
    remainingLicenses: 8,
    totalLicenses: 45,
    category: 'Templates',
    rating: 4.5,
    reviews: 123,
    isTrending: true
  }
]

const categories = [
  { id: 'all', name: 'All Products', icon: Sparkles },
  { id: 'sponsored', name: 'Sponsored', icon: Crown },
  { id: 'trending', name: 'Trending', icon: TrendingUp },
  { id: 'recommended', name: 'We Think You\'ll Like', icon: Gift },
  { id: 'most-profitable', name: 'Most Profitable', icon: Zap },
  { id: 'influencer-fave', name: 'Influencer\'s Fave', icon: Users },
  { id: 'hot-deals', name: 'Hot Deals', icon: Flame }
]

// Resale Stage Configuration
const resaleStages = {
  newboom: { name: 'Newboom', color: 'bg-flyverr-secondary', description: 'Never resold' },
  blossom: { name: 'Blossom', color: 'bg-flyverr-primary', description: '1st resale cycle' },
  evergreen: { name: 'Evergreen', color: 'bg-flyverr-accent', description: '2nd resale cycle' },
  exit: { name: 'Exit', color: 'bg-orange-500', description: '3rd resale cycle' }
}

// Skeleton Loading Component
const ProductCardSkeleton = () => (
  <Card className="border-0 bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow-md">
    <div className="relative bg-gray-200 dark:bg-gray-700 animate-pulse">
      <div className="w-full h-32 sm:h-40 md:h-48 lg:h-52 xl:h-56 bg-gray-300 dark:bg-gray-600"></div>
    </div>
    <CardContent className="p-4">
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
        <div className="flex justify-between items-center">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
        </div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
      </div>
    </CardContent>
  </Card>
)

export default function MarketplacePage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [imageIndices, setImageIndices] = useState<{ [key: string]: number }>({})
  const [imageStates, setImageStates] = useState<{ [key: string]: ImageState }>({})
  const [isLoading, setIsLoading] = useState(true)
  const productsPerPage = 8

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Filter products based on search and category
  useEffect(() => {
    let filtered = products

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      switch (selectedCategory) {
        case 'sponsored':
          filtered = filtered.filter(product => product.isSponsored)
          break
        case 'trending':
          filtered = filtered.filter(product => product.isTrending)
          break
        case 'recommended':
          filtered = filtered.filter(product => product.isRecommended)
          break
        case 'most-profitable':
          filtered = filtered.filter(product => product.isMostProfitable)
          break
        case 'influencer-fave':
          filtered = filtered.filter(product => product.isInfluencerFave)
          break
        case 'hot-deals':
          filtered = filtered.filter(product => product.isHotDeal)
          break
      }
    }

    setFilteredProducts(filtered)
    setCurrentPage(1) // Reset to first page when filtering
  }, [searchTerm, selectedCategory, products])

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  const handleCardClick = (productId: string) => {
    router.push(`/marketplace/${productId}`)
  }

  const nextImage = (productId: string, totalImages: number) => {
    setImageIndices(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) + 1) % totalImages
    }))
  }

  const prevImage = (productId: string, totalImages: number) => {
    setImageIndices(prev => ({
      ...prev,
      [productId]: prev[productId] === 0 ? totalImages - 1 : (prev[productId] || 0) - 1
    }))
  }

  const handleImageLoad = (productId: string) => {
    setImageStates(prev => ({
      ...prev,
      [productId]: { loading: false, error: false, loaded: true }
    }))
  }

  const handleImageError = (productId: string) => {
    setImageStates(prev => ({
      ...prev,
      [productId]: { loading: false, error: true, loaded: false }
    }))
  }

  return (
    <div className="min-h-screen bg-flyverr-neutral dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-flyverr-text dark:text-white mb-2 sm:mb-3">
            Digital Marketplace
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 dark:text-gray-300">
            Discover limited digital products that appreciate in value
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4 sm:h-5 sm:w-5" />
            <Input
              type="text"
                placeholder="Search digital products, creators, or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 sm:pl-12 h-10 sm:h-12 md:h-14 text-sm sm:text-base md:text-lg border-2 border-gray-200 dark:border-gray-700 focus:border-flyverr-primary dark:focus:border-flyverr-primary rounded-lg sm:rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            
            {/* Filter Button */}
            <Button
              variant="outline"
              className="h-10 sm:h-12 md:h-14 px-4 sm:px-6 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-flyverr-primary dark:hover:border-flyverr-primary hover:bg-flyverr-primary/5 rounded-lg sm:rounded-xl"
            >
              <Filter className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <span className="hidden sm:inline">Filters</span>
            </Button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
            {categories.map((category) => {
              const Icon = category.icon
              return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryClick(category.id)}
                  className={`px-3 sm:px-4 md:px-6 py-1 sm:py-2 text-xs sm:text-sm md:text-base rounded-full flex items-center gap-2 ${
                  selectedCategory === category.id 
                      ? 'bg-flyverr-primary text-white hover:bg-flyverr-primary/90' 
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-flyverr-primary/5 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600 hover:border-flyverr-primary dark:hover:border-flyverr-primary'
                }`}
              >
                  <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                {category.name}
              </Button>
              )
            })}
          </div>
        </div>

        {/* Results Count */}
        <div className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 md:mb-8">
          Showing {filteredProducts.length} of {products.length} digital products
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          {isLoading ? (
            // Show skeleton loading
            Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          ) : (
            currentProducts.map((product) => {
            const currentImageIndex = imageIndices[product.id] || 0
              const currentImage = product.images && product.images.length > 0 
                ? product.images[currentImageIndex] 
                : null
              const imageState = imageStates[product.id] || { loading: true, error: false, loaded: false }
              const stage = resaleStages[product.resaleStage]
            
                         return (
               <Card 
                 key={product.id} 
                  className="group hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-gray-800 overflow-hidden cursor-pointer rounded-lg shadow-md"
                 onClick={() => handleCardClick(product.id)}
               >
                  <div className="relative bg-gray-100 dark:bg-gray-700">
                    {/* Image Container */}
                    <div className="relative w-full h-32 sm:h-40 md:h-48 lg:h-52 xl:h-56 overflow-hidden">
                      {/* Error State */}
                      {imageState.error && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-700">
                          <ImageIcon className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400 dark:text-gray-500 mb-2" />
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Image unavailable</p>
                        </div>
                      )}
                      
                      {/* Next.js Optimized Image */}
                      {!imageState.error && currentImage && (
                        <Image
                    src={currentImage}
                    alt={product.title}
                          fill
                          className="object-cover transition-all duration-300 group-hover:scale-110"
                          onLoad={() => handleImageLoad(product.id)}
                          onError={() => handleImageError(product.id)}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                          priority={false}
                        />
                      )}
                    </div>
                  
                  {/* Image Navigation */}
                    {product.images && product.images.length > 1 && !imageState.error && currentImage && (
                    <>
                      <Button
                        size="sm"
                        variant="ghost"
                          className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full w-7 h-7 sm:w-8 sm:h-8 p-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation()
                          prevImage(product.id, product.images.length)
                        }}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                          className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full w-7 h-7 sm:w-8 sm:h-8 p-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation()
                          nextImage(product.id, product.images.length)
                        }}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      
                      {/* Image Dots */}
                        <div className="absolute bottom-2 sm:bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5">
                        {product.images.map((_, index) => (
                          <div
                            key={index}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              index === currentImageIndex 
                                  ? 'bg-white shadow-lg' 
                                  : 'bg-white/60 hover:bg-white/80'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                  
                    {/* Resale Stage Badge */}
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                    <Badge 
                        className={`${stage.color} text-white text-xs px-2 py-1`}
                    >
                        Stage {Object.keys(resaleStages).indexOf(product.resaleStage) + 1}: {stage.name}
                    </Badge>
                  </div>

                  {/* Special Badges */}
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex flex-col gap-1.5">
                    {product.isSponsored && (
                      <Badge className="bg-flyverr-accent text-flyverr-text text-xs px-2 py-1">
                        <Crown className="h-3 w-3 mr-1" />
                          <span className="hidden sm:inline">Sponsored</span>
                          <span className="sm:hidden">SP</span>
                      </Badge>
                    )}
                    {product.isHotDeal && (
                      <Badge className="bg-red-500 text-white text-xs px-2 py-1">
                        <Flame className="h-3 w-3 mr-1" />
                          <span className="hidden sm:inline">Hot Deal</span>
                          <span className="sm:hidden">HD</span>
                      </Badge>
                    )}
                    {product.isTrending && (
                      <Badge className="bg-flyverr-secondary text-flyverr-text text-xs px-2 py-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                          <span className="hidden sm:inline">Trending</span>
                          <span className="sm:hidden">TR</span>
                      </Badge>
                    )}
                  </div>
                </div>
                
                <CardContent className="p-4">
                    {/* Title and Creator */}
                  <div className="mb-3">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base md:text-lg lg:text-xl mb-1 line-clamp-2 group-hover:text-flyverr-primary transition-colors duration-300">
                      {product.title}
                    </h3>
                      <p className="text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400 mb-2">by {product.creator}</p>
                  </div>
                  
                    {/* Rating */}
                    <div className="flex items-center mb-3">
                      <div className="flex items-center mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 sm:h-4 sm:w-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    {/* Remaining Licenses */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center text-xs sm:text-sm md:text-base">
                        <span className="text-gray-600 dark:text-gray-400">Remaining:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {product.remainingLicenses} of {product.totalLicenses}
                      </span>
                  </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                        <div 
                          className="bg-flyverr-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(product.remainingLicenses / product.totalLicenses) * 100}%` }}
                        ></div>
                    </div>
                  </div>

                  {/* Price and Action */}
                   <div className="flex flex-col space-y-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                     <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 dark:text-white">
                      ${product.price}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
            })
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 sm:gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-lg border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-flyverr-primary hover:bg-flyverr-primary/5"
            >
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Prev</span>
            </Button>
            
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i + 1}
                variant={currentPage === i + 1 ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(i + 1)}
                className={`w-9 h-9 sm:w-10 sm:h-10 text-xs sm:text-sm rounded-lg ${
                  currentPage === i + 1 
                    ? 'bg-flyverr-primary hover:bg-flyverr-primary/90' 
                    : 'hover:border-flyverr-primary hover:bg-flyverr-primary/5'
                }`}
              >
                {i + 1}
              </Button>
            ))}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-lg border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-flyverr-primary hover:bg-flyverr-primary/5"
            >
              <span className="hidden sm:inline">Next</span>
              <span className="sm:hidden">Next</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
} 