import React, { useState } from 'react';

interface ArticleImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  fallback?: string;
}

export const ArticleImage: React.FC<ArticleImageProps> = ({
  src,
  alt,
  className = "",
  fallback = "https://logos-world.net/wp-content/uploads/2020/06/Manchester-United-Logo.png"
}) => {
  const [imgSrc, setImgSrc] = useState(src || fallback);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (imgSrc !== fallback) {
      setImgSrc(fallback);
      setHasError(false);
    } else {
      setHasError(true);
    }
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  return (
    <div className={`relative overflow-hidden bg-[#111] ${className}`}>
      {/* Loading placeholder */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#C8102E] to-[#FFD700] animate-pulse">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1A1A1A] text-[#666]">
          <svg className="w-12 h-12 mb-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
          </svg>
          <span className="text-xs">Image unavailable</span>
        </div>
      )}

      {/* Main image */}
      {!hasError && (
        <img
          src={imgSrc}
          alt={alt}
          onError={handleError}
          onLoad={handleLoad}
          className={`w-full h-full object-cover transition-all duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100 hover:scale-105'
          }`}
          loading="lazy"
        />
      )}
    </div>
  );
};