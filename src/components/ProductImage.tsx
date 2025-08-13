import React, { useState } from "react";
import { ImageIcon } from "lucide-react";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({ src, alt, className = "" }) => {
  const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [imageSrc, setImageSrc] = useState(src);

  const handleImageLoad = () => {
    setImageState('loaded');
  };

  const handleImageError = () => {
    setImageState('error');
    setImageSrc('/api/placeholder/150/150'); // Fallback to placeholder API or default image
  };

  // Default placeholder image (you can replace this with your own default image)
  const defaultImage = (
    <div className={`${className} bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-600`}>
      <ImageIcon className="w-6 h-6 text-gray-400 dark:text-gray-500" />
    </div>
  );

  if (imageState === 'error') {
    return defaultImage;
  }

  return (
    <>
      {imageState === 'loading' && (
        <div className={`${className} bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center`}>
          <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-600 border-t-flyverr-primary rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src={imageSrc}
        alt={alt}
        className={`${className} ${imageState === 'loading' ? 'hidden' : 'block'}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </>
  );
};
