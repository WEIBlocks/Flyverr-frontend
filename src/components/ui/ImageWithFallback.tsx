"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Image as ImageIcon } from "lucide-react"

interface ImageWithFallbackProps {
  src: string | null | undefined
  alt: string
  width?: number
  height?: number
  className?: string
  fallbackIcon?: React.ReactNode
  fallbackClassName?: string
  priority?: boolean
  quality?: number
  fill?: boolean
  sizes?: string
}

export default function ImageWithFallback({
  src,
  alt,
  width = 48,
  height = 48,
  className = "",
  fallbackIcon,
  fallbackClassName = "",
  priority = false,
  quality = 75,
  fill = false,
  sizes,
}: ImageWithFallbackProps) {
  const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>('loading')

  // Default fallback icon if none provided
  const defaultFallbackIcon = fallbackIcon || (
    <ImageIcon className="w-6 h-6 text-white" />
  )

  // If no src, show fallback immediately
  if (!src) {
    return (
      <div 
        className={`bg-gradient-to-br from-flyverr-primary to-flyverr-secondary flex items-center justify-center rounded-lg ${fallbackClassName || className}`}
        style={!fill ? { width: `${width}px`, height: `${height}px` } : {}}
      >
        {defaultFallbackIcon}
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`} style={!fill ? { width: `${width}px`, height: `${height}px` } : {}}>
      {/* Loading Skeleton */}
      {imageState === 'loading' && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
          <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
        </div>
      )}

      {/* Error Fallback */}
      {imageState === 'error' && (
        <div className="absolute inset-0 bg-gradient-to-br from-flyverr-primary to-flyverr-secondary flex items-center justify-center">
          {defaultFallbackIcon}
        </div>
      )}

      {/* Actual Image */}
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={`transition-opacity duration-200 ${
          imageState === 'loaded' ? 'opacity-100' : 'opacity-0'
        } ${fill ? 'object-cover' : ''}`}
        priority={priority}
        quality={quality}
        fill={fill}
        sizes={sizes}
        onLoad={() => setImageState('loaded')}
        onError={() => setImageState('error')}
      />
    </div>
  )
}
