"use client"

import React, { useState } from 'react'
import { Search, ChevronDown, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
}

const faqData: FAQItem[] = [
  // General Questions
  {
    id: '1',
    question: 'What is Flyverr?',
    answer: 'Flyverr is a comprehensive drone marketplace and community platform that connects drone enthusiasts, professionals, and businesses. We offer drone sales, services, training, and a community for sharing knowledge and experiences.',
    category: 'General'
  },
  {
    id: '2',
    question: 'How do I create an account?',
    answer: 'Creating an account is simple! Click the "Sign Up" button in the navigation, fill in your details including email and password, and verify your email address. You can also sign up using your Google or Facebook account for faster access.',
    category: 'General'
  },
  {
    id: '3',
    question: 'Is Flyverr available worldwide?',
    answer: 'Currently, Flyverr is available in most countries. However, some regions may have restrictions on drone operations. Please check your local drone regulations before making purchases or using our services.',
    category: 'General'
  },

  // Drone Operations
  {
    id: '4',
    question: 'Do I need a license to fly a drone?',
    answer: 'Drone licensing requirements vary by country and drone weight. In most countries, drones under 250g don&apos;t require a license for recreational use, but commercial operations typically require certification. Check your local aviation authority for specific requirements.',
    category: 'Operations'
  },
  {
    id: '5',
    question: 'What are the basic safety rules for flying drones?',
    answer: 'Always fly in open areas away from people and buildings, maintain visual line of sight, respect privacy, avoid flying near airports or restricted areas, and check weather conditions. Never fly under the influence of alcohol or drugs.',
    category: 'Operations'
  },
  {
    id: '6',
    question: 'How far can I fly my drone?',
    answer: 'The maximum range depends on your drone model and local regulations. Most consumer drones have a range of 1-7 kilometers, but you must always maintain visual line of sight. Commercial drones may have longer ranges with proper equipment.',
    category: 'Operations'
  },

  // Marketplace
  {
    id: '7',
    question: 'How do I sell my drone on Flyverr?',
    answer: 'To sell your drone, create a seller account, verify your identity, and list your product with detailed descriptions, photos, and pricing. Our team will review your listing before it goes live. You&apos;ll earn royalties on successful sales.',
    category: 'Marketplace'
  },
  {
    id: '8',
    question: 'What are the fees for selling on Flyverr?',
    answer: 'Flyverr charges a 10% commission on successful sales, which covers platform maintenance, payment processing, and customer support. There are no upfront fees to list your products.',
    category: 'Marketplace'
  },
  {
    id: '9',
    question: 'How do I know if a seller is trustworthy?',
    answer: 'All sellers on Flyverr are verified and rated by the community. Check seller ratings, reviews, and verification badges. We also offer buyer protection and secure payment processing for added security.',
    category: 'Marketplace'
  },

  // Technical Support
  {
    id: '10',
    question: 'My drone won&apos;t connect to the controller. What should I do?',
    answer: 'First, ensure both devices are fully charged and within range. Try rebooting both the drone and controller. Check for firmware updates and ensure you&apos;re following the correct pairing procedure for your specific model.',
    category: 'Technical'
  },
  {
    id: '11',
    question: 'How do I update my drone&apos;s firmware?',
    answer: 'Download the official app for your drone model, connect your drone to your device via USB or WiFi, and follow the in-app instructions. Always ensure your drone is fully charged before updating firmware.',
    category: 'Technical'
  },
  {
    id: '12',
    question: 'What should I do if my drone crashes?',
    answer: 'First, ensure everyone is safe. Document the crash site and damage. Check if your drone has warranty coverage or insurance. For minor repairs, you can purchase repair kits from our marketplace. For major damage, contact the manufacturer.',
    category: 'Technical'
  },

  // Photography & Videography
  {
    id: '13',
    question: 'What camera settings work best for aerial photography?',
    answer: 'Use manual mode when possible, set ISO to 100-400 for best quality, use ND filters in bright conditions, and shoot in RAW format for better post-processing. For video, use 24fps for cinematic look or 30fps for smooth motion.',
    category: 'Photography'
  },
  {
    id: '14',
    question: 'How do I get smooth drone footage?',
    answer: 'Use slow, gentle movements on the controls, enable cinematic mode if available, use ND filters to reduce shutter speed, and practice flying in open areas. Consider using a gimbal for stabilization.',
    category: 'Photography'
  },
  {
    id: '15',
    question: 'What are the best times to shoot aerial photos?',
    answer: 'Golden hour (sunrise/sunset) provides the best lighting. Avoid shooting at noon when shadows are harsh. Overcast days can work well for even lighting. Check weather conditions and avoid strong winds.',
    category: 'Photography'
  },

  // Legal & Regulations
  {
    id: '16',
    question: 'Can I fly my drone in national parks?',
    answer: 'Most national parks have strict drone restrictions. Always check with the specific park before flying. Many parks require special permits for commercial photography. Respect wildlife and other visitors.',
    category: 'Legal'
  },
  {
    id: '17',
    question: 'What are the privacy laws regarding drone photography?',
    answer: 'Privacy laws vary by location. Generally, you cannot photograph people in private spaces without consent. Avoid flying over private property without permission. Commercial use may require model releases.',
    category: 'Legal'
  },
  {
    id: '18',
    question: 'Do I need insurance for my drone?',
    answer: 'While not always legally required, drone insurance is highly recommended. It covers damage to your drone, liability for property damage or injury, and legal expenses. Many homeowners policies don&apos;t cover drones.',
    category: 'Legal'
  },

  // Training & Education
  {
    id: '19',
    question: 'How long does it take to learn to fly a drone?',
    answer: 'Basic flight skills can be learned in a few hours, but mastering advanced maneuvers takes weeks or months of practice. Start with a beginner-friendly drone and practice in open areas. Consider taking a training course.',
    category: 'Training'
  },
  {
    id: '20',
    question: 'Are there online courses for drone piloting?',
    answer: 'Yes! Flyverr offers comprehensive online courses covering basic flight, advanced maneuvers, photography techniques, and commercial operations. We also partner with certified training providers for in-person instruction.',
    category: 'Training'
  }
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  // Filter FAQ items based on search
  const filteredFAQs = faqData.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesSearch
  })

  const toggleItem = (id: string) => {
    setExpandedItem(prev => prev === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-flyverr-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20">
        {/* Page Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 xl:mb-20 animate-fade-in">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 bg-flyverr-primary/10 rounded-full mb-4 sm:mb-6 transition-all duration-500 hover:bg-flyverr-primary/20">
            <HelpCircle className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12 text-flyverr-primary transition-transform duration-300" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-flyverr-text mb-3 sm:mb-4 transition-all duration-500 leading-tight">
            FAQ Center
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-600 max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto leading-relaxed transition-all duration-500 px-4">
            Find answers to common questions about drones, our marketplace, and everything Flyverr
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 animate-slide-up">
          <div className="relative max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5 transition-colors duration-300" />
            <Input
              type="text"
              placeholder="Search questions or answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 sm:pl-12 h-12 sm:h-14 text-sm sm:text-base md:text-lg border-2 border-gray-200 focus:border-flyverr-primary rounded-lg sm:rounded-xl shadow-sm transition-all duration-300 hover:shadow-md focus:shadow-lg"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <div className="text-xs sm:text-sm md:text-base text-gray-600 transition-all duration-300">
            <span className="font-medium">{filteredFAQs.length}</span> question{filteredFAQs.length !== 1 ? 's' : ''} found
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
          {filteredFAQs.map((item, index) => {
            const isExpanded = expandedItem === item.id
            
            return (
              <Card 
                key={item.id} 
                className={`transition-all duration-500 ease-in-out hover:shadow-lg border-2 rounded-lg sm:rounded-xl hover:rounded-xl sm:hover:rounded-2xl ${
                  isExpanded 
                    ? 'border-flyverr-primary/30 shadow-lg bg-flyverr-primary/5' 
                    : 'border-gray-200 hover:border-flyverr-primary/50'
                }`}
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                <CardContent className="p-0">
                  <div 
                    className="p-4 sm:p-5 md:p-6 cursor-pointer transition-all duration-300 hover:bg-gray-50/50 rounded-lg sm:rounded-xl"
                    onClick={() => toggleItem(item.id)}
                  >
                    <div className="flex items-start justify-between gap-3 sm:gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900 leading-relaxed pr-2 sm:pr-4 md:pr-8 transition-colors duration-300 hover:text-flyverr-primary">
                          {item.question}
                        </h3>
                      </div>
                      <div className="flex-shrink-0">
                        <div className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all duration-500 ease-in-out transform ${
                          isExpanded 
                            ? 'bg-flyverr-primary/10 text-flyverr-primary rotate-180' 
                            : 'bg-gray-100 text-gray-500 hover:bg-flyverr-primary/10'
                        }`}>
                          <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 transition-transform duration-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 border-t border-gray-100">
                      <div className="pt-3 sm:pt-4">
                        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed transition-all duration-300">
                        {item.answer}
                      </p>
                      </div>
                    </div>
                    </div>
                  </CardContent>
              </Card>
            )
          })}
        </div>

        {/* No Results */}
        {filteredFAQs.length === 0 && (
          <div className="text-center py-12 sm:py-16 md:py-20 lg:py-24 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gray-100 rounded-full mb-4 sm:mb-6 transition-all duration-500">
              <HelpCircle className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-gray-400 transition-transform duration-300" />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-2 sm:mb-3 transition-all duration-300">
              No questions found
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-xs sm:max-w-sm md:max-w-md mx-auto transition-all duration-300 px-4">
              Try adjusting your search terms to find what you&apos;re looking for.
            </p>
          </div>
        )}

        {/* Contact Support */}
        <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24 xl:mt-32 animate-slide-up">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 shadow-xl transition-all duration-500 hover:shadow-2xl rounded-lg sm:rounded-xl hover:rounded-xl sm:hover:rounded-2xl">
            <CardContent className="py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 bg-white/20 rounded-full mb-4 sm:mb-6 transition-all duration-500 hover:bg-white/30">
                <HelpCircle className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12 text-white transition-transform duration-300" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-2 sm:mb-3 lg:mb-4 transition-all duration-300">
                Still have questions?
              </h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 lg:mb-10 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto transition-all duration-300">
                Can&apos;t find what you&apos;re looking for? Our support team is here to help you 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-semibold transition-all duration-300 hover:shadow-lg">
                  Contact Support
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base transition-all duration-300 hover:shadow-lg">
                  Live Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  )
} 